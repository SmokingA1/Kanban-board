'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
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
        grd.addColorStop(0, 'rgba(163,184,138,0.9)');
        grd.addColorStop(1, 'rgba(163,184,138,0)');
        
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
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas 
        id="particles" 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0.5, zIndex: 1 }}
      />
      
      <div 
        className="fixed inset-0" 
        style={{ 
          background: 'linear-gradient(to bottom right, #344E41, #3A5A40, #588157)',
          zIndex: 0 
        }} 
      />

      <div className="relative" style={{ zIndex: 10 }}>
        <header className="absolute top-0 right-0 p-6 flex gap-3">
          <Link 
            href="/auth/login"
            className="px-6 py-2.5 backdrop-blur-md text-white rounded-lg font-medium transition-all border-2"
            style={{ 
              backgroundColor: 'rgba(218, 215, 205, 0.1)',
              borderColor: 'rgba(218, 215, 205, 0.3)'
            }}
          >
            Login
          </Link>
          <Link 
            href="/auth/register"
            className="px-6 py-2.5 text-white rounded-lg font-medium transition-all shadow-lg"
            style={{ 
              backgroundColor: '#588157',
            }}
          >
            Sign Up
          </Link>
        </header>

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Kanban Board
            </h1>
            <p 
              className="text-xl md:text-2xl mb-12 leading-relaxed"
              style={{ color: '#DAD7CD' }}
            >
              Manage your team tasks efficiently.<br />
              Create boards, invite members, track progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}