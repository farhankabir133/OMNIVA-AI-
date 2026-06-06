import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  seed: number;
}

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  // Handle Resize using standard ResizeObserver (Mandatory guidelines)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 300),
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track mouse motions with clean spring inertia
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left - rect.width / 2;
      mouseRef.current.targetY = e.clientY - rect.top - rect.height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize floating background particles
    const pointCount = 60;
    const points: Point[] = [];
    for (let i = 0; i < pointCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 260;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#ec4899' : '#10b981',
        alpha: Math.random() * 0.5 + 0.2,
        seed: Math.random() * 100,
      });
    }

    let animationFrameId: number;
    let rotationAngle = 0;

    // Drawing loops
    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Mouse position inertia tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.save();
      // Translate to center with a subtle perspective parallax translation based on cursor
      ctx.translate(centerX + mouseRef.current.x * 0.15, centerY + mouseRef.current.y * 0.15);

      // Increment rotation angles
      rotationAngle += 0.005;

      // 1. Draw glowing digital grid backdrop bounds
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.03)';
      ctx.lineWidth = 1;
      for (let r = 80; r <= 320; r += 60) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw horizontal and vertical subtle crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.beginPath();
      ctx.moveTo(-350, 0); ctx.lineTo(350, 0);
      ctx.moveTo(0, -350); ctx.lineTo(0, 350);
      ctx.stroke();

      // 2. Plot connected points and background nodes
      points.forEach((pt, i) => {
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap around bounds mathematically
        const dist = Math.sqrt(pt.x * pt.x + pt.y * pt.y);
        if (dist > 360) {
          const angle = Math.random() * Math.PI * 2;
          pt.x = Math.cos(angle) * 50;
          pt.y = Math.sin(angle) * 50;
        }

        // Draw connections between nearby background points
        for (let j = i + 1; j < points.length; j++) {
          const pt2 = points[j];
          const dx = pt.x - pt2.x;
          const dy = pt.y - pt2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - d / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }

        // Floating offset animation
        const pulse = Math.sin(rotationAngle * 2 + pt.seed) * 0.15 + 0.85;
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha * pulse;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 3. Draw OMNIVA Core (Nested Concentric Neon Holograms)
      const coreSize = 75;
      
      // Outer active ring
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, coreSize + Math.sin(rotationAngle * 3) * 4, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed fast ring
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      ctx.save();
      ctx.rotate(rotationAngle * 2);
      ctx.beginPath();
      ctx.arc(0, 0, coreSize - 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

      // Inner glow solid core
      const gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, coreSize - 30);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      gradient.addColorStop(0.2, 'rgba(129, 140, 248, 0.85)');
      gradient.addColorStop(0.6, 'rgba(99, 102, 241, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, coreSize - 20, 0, Math.PI * 2);
      ctx.fill();

      // Glowing center nodes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Orbiting Core Social Streams (Floating Nodes)
      const orbitals = [
        { name: 'SOCIAL AI', color: '#818cf8', angleOffset: 0, radius: 140, size: 10, icon: '📣' },
        { name: 'WEB BUILDER', color: '#ec4899', angleOffset: (Math.PI * 2) / 3, radius: 180, size: 12, icon: '🌐' },
        { name: 'STRATEGY AI', color: '#10b981', angleOffset: ((Math.PI * 2) / 3) * 2, radius: 220, size: 11, icon: '📊' },
      ];

      orbitals.forEach((orb) => {
        const angle = rotationAngle * 0.8 + orb.angleOffset;
        const x = Math.cos(angle) * orb.radius;
        const y = Math.sin(angle) * orb.radius;

        // Orbit path line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, orb.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Connect orbital to OMNIVA Core
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw orbital sphere
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(x, y, orb.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glowing aura around orbital sphere
        const auraGrad = ctx.createRadialGradient(x, y, 1, x, y, orb.size * 2.5);
        auraGrad.addColorStop(0, `${orb.color}44`);
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(x, y, orb.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Text & emoji overlay
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(orb.icon, x, y + 3);

        ctx.fillStyle = 'rgba(156, 163, 175, 0.85)';
        ctx.font = '600 8px system-ui';
        ctx.fillText(orb.name, x, y - orb.size - 6);
      });

      // Data packets traversing the connector filaments
      const packetCount = 3;
      for (let p = 0; p < packetCount; p++) {
        const orbitIndex = p % orbitals.length;
        const orb = orbitals[orbitIndex];
        const angle = rotationAngle * 0.8 + orb.angleOffset;
        // Travel ratio
        const ratio = ((rotationAngle * 1.5 + p * 0.3) % 1.0);
        const px = Math.cos(angle) * orb.radius * ratio;
        const py = Math.sin(angle) * orb.radius * ratio;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow surrounding packet
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      id="omniva-canvas-container"
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      {/* Background neon visual noise highlights */}
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-indigo-600/10 to-pink-600/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block transition-transform duration-700 ease-out"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      />

      {/* Futuristic corner telemetry sights */}
      <div className="absolute top-8 left-8 border-t border-l border-indigo-500/30 w-6 h-6" />
      <div className="absolute top-8 right-8 border-t border-r border-indigo-500/30 w-6 h-6" />
      <div className="absolute bottom-8 left-8 border-b border-l border-indigo-500/30 w-6 h-6" />
      <div className="absolute bottom-8 right-8 border-b border-r border-indigo-500/30 w-6 h-6" />
    </div>
  );
}
