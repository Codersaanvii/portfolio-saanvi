"use client"

import { useEffect, useRef } from 'react'

// All 3 brand colors — cycled in order so every color always appears
const COLORS = ['#E8694A', '#C3DFF0', '#2D7A6E']

// 12 distinct template shapes in a ~200×180 local space.
// Diverse: loops, waves, figure-8, M/W, spirals, zigzag, teardrops, curls.
const PATH_TEMPLATES = [
  // Looping oval
  "M 0,60 C 20,-20 160,-20 180,60 C 200,140 130,160 90,100 C 50,40 120,20 150,80",
  // Sine wave
  "M 0,50 C 40,0 80,100 120,50 C 160,0 200,80 240,50 C 280,20 320,70 360,50",
  // Figure-8
  "M 90,100 C 130,60 200,60 200,100 C 200,140 130,140 90,100 C 50,60 -10,60 0,100 C 10,140 50,140 90,100",
  // M-shape bounce
  "M 0,100 C 20,40 40,80 60,40 C 80,0 100,60 120,40 C 140,20 160,80 180,40 C 200,0 220,80 240,100",
  // Outward spiral
  "M 100,100 C 120,80 160,80 160,100 C 160,130 120,140 80,120 C 40,100 30,60 60,40 C 90,20 150,30 170,70",
  // Tight curl
  "M 0,80 C 30,20 100,10 120,60 C 140,110 80,130 60,80 C 40,30 100,20 130,70",
  // Zigzag
  "M 0,90 L 50,10 L 100,90 L 150,10 L 200,90 L 250,10 L 300,90",
  // Open lasso loop
  "M 10,100 C 10,20 180,20 180,100 C 180,180 100,190 80,130 C 60,70 160,60 170,120",
  // S-curve script
  "M 0,30 C 40,-10 120,20 100,70 C 80,120 0,130 20,160 C 40,190 120,180 160,140",
  // Teardrop
  "M 80,0 C 160,0 200,60 180,110 C 160,160 80,180 40,130 C 0,80 20,0 80,0",
  // Bouncy squiggle
  "M 0,60 C 30,20 60,100 90,60 C 120,20 150,90 180,60 C 210,30 240,80 270,60",
  // Lollipop loop
  "M 20,140 C 20,60 140,20 160,80 C 180,140 100,160 70,110 C 40,60 120,40 150,90",
]

interface Scribble {
  templateIndex: number
  color: string
  progress: number
  opacity: number
  phase: 'drawing' | 'holding' | 'fading'
  holdTimer: number
  speed: number
  strokeWidth: number
  cx: number        // normalized 0-1 canvas position
  cy: number
  scale: number
  rotation: number
}

// Track spawned regions so new scribbles spread out
let colorCounter = 0

export default function ScribbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number | undefined>(undefined)
  const scribblesRef = useRef<Scribble[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ----- Resize -----
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // ----- Pre-sample all path templates into point arrays -----
    const samplePath = (d: string, samples: number): [number, number][] => {
      const svgNS = 'http://www.w3.org/2000/svg'
      const svg   = document.createElementNS(svgNS, 'svg')
      const path  = document.createElementNS(svgNS, 'path')
      path.setAttribute('d', d)
      svg.appendChild(path)
      svg.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;'
      document.body.appendChild(svg)
      const len = path.getTotalLength()
      const pts: [number, number][] = []
      for (let i = 0; i <= samples; i++) {
        const p = path.getPointAtLength((i / samples) * len)
        pts.push([p.x, p.y])
      }
      document.body.removeChild(svg)
      return pts
    }
    const sampledTemplates = PATH_TEMPLATES.map(d => samplePath(d, 100))

    // ----- Spawn helpers -----
    // Divide canvas into a 3×2 grid; pick least-recently-used cell
    const recentCells = new Set<number>()

    const spawnScribble = (): Scribble => {
      // Pick a cell that hasn't been used recently
      const cols = 3, rows = 2
      const totalCells = cols * rows
      let cell = Math.floor(Math.random() * totalCells)
      for (let attempt = 0; attempt < totalCells; attempt++) {
        if (!recentCells.has(cell)) break
        cell = (cell + 1) % totalCells
      }
      recentCells.add(cell)
      if (recentCells.size > 4) recentCells.delete([...recentCells][0])

      const col = cell % cols
      const row = Math.floor(cell / cols)
      // Position within cell with some margin
      const cx = (col + 0.15 + Math.random() * 0.7) / cols
      const cy = (row + 0.15 + Math.random() * 0.7) / rows

      // Cycle colors so all 3 always appear
      const color = COLORS[colorCounter % COLORS.length]
      colorCounter++

      return {
        templateIndex: Math.floor(Math.random() * PATH_TEMPLATES.length),
        color,
        progress: 0,
        opacity: 0,
        phase: 'drawing',
        holdTimer: 0,
        speed: 0.008 + Math.random() * 0.008,
        strokeWidth: 12 + Math.random() * 14,
        cx,
        cy,
        scale: 0.55 + Math.random() * 0.75,
        rotation: (Math.random() - 0.5) * 0.6, // ±~17 deg
      }
    }

    // ----- Crayon draw -----
    // Real crayon feel: multiple passes, per-point jitter, varying width/alpha
    const drawCrayon = (
      ctx: CanvasRenderingContext2D,
      pts: [number, number][],
      progress: number,
      color: string,
      opacity: number,
      strokeWidth: number,
      cx: number,
      cy: number,
      scale: number,
      rotation: number,
      w: number,
      h: number
    ) => {
      const count = Math.floor(pts.length * progress)
      if (count < 2) return

      ctx.save()
      ctx.translate(cx * w, cy * h)
      ctx.rotate(rotation)
      ctx.scale(scale, scale)
      // Center the template viewport (roughly 180×130)
      ctx.translate(-90, -65)

      const PASSES = 6
      for (let pass = 0; pass < PASSES; pass++) {
        // Each pass: different width, alpha, and noise level
        const passW     = strokeWidth * (0.45 + Math.random() * 0.7)
        const passAlpha = opacity * (0.45 + Math.random() * 0.45)
        const noiseAmp  = strokeWidth * 0.18 * (1 + pass * 0.1)

        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.globalAlpha = passAlpha
        ctx.lineWidth   = passW
        ctx.lineCap     = 'round'
        ctx.lineJoin    = 'round'

        for (let i = 0; i < count; i++) {
          const nx = pts[i][0] + (Math.random() - 0.5) * noiseAmp
          const ny = pts[i][1] + (Math.random() - 0.5) * noiseAmp
          if (i === 0) ctx.moveTo(nx, ny)
          else ctx.lineTo(nx, ny)
        }
        ctx.stroke()
      }

      ctx.restore()
    }

    // ----- Seed initial staggered scribbles -----
    scribblesRef.current = [
      { ...spawnScribble(), progress: 0.4, opacity: 0.6, phase: 'drawing' },
      { ...spawnScribble(), progress: 0.7, opacity: 0.75, phase: 'holding', holdTimer: 40 },
      { ...spawnScribble(), progress: 0.2, opacity: 0.3, phase: 'drawing' },
      { ...spawnScribble(), progress: 0.9, opacity: 0.8, phase: 'holding', holdTimer: 20 },
    ]

    // ----- Animation loop -----
    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      scribblesRef.current = scribblesRef.current.map(s => {
        let { progress, opacity, phase, holdTimer, speed } = s

        if (phase === 'drawing') {
          progress += speed
          opacity = Math.min(0.95, opacity + 0.06)
          if (progress >= 1) {
            progress = 1
            phase = 'holding'
            holdTimer = 90 + Math.floor(Math.random() * 80)
          }
        } else if (phase === 'holding') {
          holdTimer--
          if (holdTimer <= 0) phase = 'fading'
        } else {
          opacity = Math.max(0, opacity - 0.012)
        }

        const pts = sampledTemplates[s.templateIndex]
        drawCrayon(ctx, pts, progress, s.color, opacity, s.strokeWidth, s.cx, s.cy, s.scale, s.rotation, w, h)

        return { ...s, progress, opacity, phase, holdTimer }
      })

      // Remove fully faded; keep 4-5 active
      scribblesRef.current = scribblesRef.current.filter(s => s.opacity > 0.01)
      while (scribblesRef.current.length < 5) {
        scribblesRef.current.push(spawnScribble())
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,   // bold enough to be clearly visible
      }}
    />
  )
}
