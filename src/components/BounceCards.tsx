import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

interface BounceCardsProps {
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.05,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-10px, 20px)",
    "rotate(-5deg) translate(15px, -10px)",
    "rotate(8deg) translate(20px, 10px)",
    "rotate(-12deg) translate(-15px, -15px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".card");
    if (cards) {
      gsap.fromTo(
        cards,
        { scale: 0, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: animationDelay,
          stagger: animationStagger,
          ease: easeType,
        }
      );
    }
  }, [animationDelay, animationStagger, easeType]);

  return (
    <div
      className="bounce-cards-container"
      ref={containerRef}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {images.map((item, idx) => (
        <div
          key={idx}
          className={`card card-${idx}`}
          style={{
            position: "absolute",
            transform: transformStyles[idx] || "none",
          }}
        >
          <div className="card-content">
            <p>{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
