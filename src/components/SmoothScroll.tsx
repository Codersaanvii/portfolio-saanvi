"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1, // Decrease scroll weight (higher value = lighter/faster response, lower value = heavier/smoother)
      wheelMultiplier: 1, // How much the mouse wheel scrolls
      smoothWheel: true,
    });

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Make GSAP ticker drive Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Prevent GSAP from putting ticker to sleep (helps avoid lag)
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
