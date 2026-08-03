"use client";

import { useEffect, useRef } from "react";

// This is a 1:1 port of the particle-line background from the original
// script.js. It draws moving dots and connects nearby ones with faint
// purple lines -- purely decorative, sits behind everything else.
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const MAX_DIST = 130;
    let width, height, points, frameId;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initPoints() {
      points = [];
      const count = Math.floor((width * height) / 14000);
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.8,
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.25 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(192,132,252,0.55)";
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      frameId = requestAnimationFrame(tick);
    }

    resize();
    initPoints();
    tick();

    const handleResize = () => {
      resize();
      initPoints();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
