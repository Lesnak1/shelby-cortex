'use client';

import React, { useEffect, useRef } from 'react';

export default function FiberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create Nodes
    const nodeCount = Math.min(Math.floor((width * height) / 26000), 70);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorIdx: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        colorIdx: Math.floor(Math.random() * 4),
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colors = isLight
        ? ['#0070f3', '#0284c7', '#7928ca', '#059669']
        : ['#00f2fe', '#4facfe', '#9d4edd', '#00e676'];

      // Render subtle fiber background radial glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        40,
        width / 2,
        height * 0.35,
        width * 0.75
      );
      grad.addColorStop(0, isLight ? 'rgba(0, 112, 243, 0.05)' : 'rgba(0, 242, 254, 0.035)');
      grad.addColorStop(0.5, isLight ? 'rgba(121, 40, 202, 0.03)' : 'rgba(157, 78, 221, 0.018)');
      grad.addColorStop(1, isLight ? 'rgba(244, 247, 251, 0)' : 'rgba(6, 8, 15, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Connect nodes with fiber lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 145) {
            const alpha = (1 - dist / 145) * (isLight ? 0.22 : 0.18);
            ctx.strokeStyle = isLight
              ? `rgba(0, 112, 243, ${alpha})`
              : `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        // Bounce on edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse interaction
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 130) {
          const force = (1 - mDist / 130) * 1.6;
          node.x += (mdx / mDist) * force;
          node.y += (mdy / mDist) * force;
        }

        // Draw node with glow
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.5;
        const nodeColor = colors[node.colorIdx];
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = isLight ? 4 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
