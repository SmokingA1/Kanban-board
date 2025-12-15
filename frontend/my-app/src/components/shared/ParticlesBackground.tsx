'use client';

import { useEffect } from 'react';

interface ParticlesBackgroundProps {
  color: string; // rgba цвет для светлячков
  gradient: string; // CSS gradient для фона
}

export default function ParticlesBackground({ color, gradient }: ParticlesBackgroundProps) {
  useEffect(() => {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const COUNT_BASE = 90;

    function resize() {
      if (!ctx) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      const count = Math.floor(COUNT_BASE * (window.innerWidth * window.innerHeight) / (1920*1080));
      particles = new Array(Math.max(40, count)).fill(0).map(() => makeParticle());
    }

    function makeParticle() {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * Math.PI * 2
      };
    }

    function tick() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'lighter';
      
      for (const p of particles) {
        p.x += p.vx + Math.sin(p.a) * 0.08;
        p.y += p.vy + Math.cos(p.a) * 0.08;
        p.a += 0.01;
        
        if (p.x < -50) p.x = window.innerWidth + 50;
        else if (p.x > window.innerWidth + 50) p.x = -50;
        if (p.y < -50) p.y = window.innerHeight + 50;
        else if (p.y > window.innerHeight + 50) p.y = -50;
        
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    resize();
    tick();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return (
    <>
      <canvas 
        id="particles" 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0.5, zIndex: 1 }}
      />
      
      <div 
        className="fixed inset-0" 
        style={{ 
          background: gradient,
          zIndex: 0 
        }} 
      />
    </>
  );
}