/**
 * EVENTORA - Subtle & Translucent Trailing Cursor Effect
 * Lightweight, compact, and ethereal trail that fades smoothly
 * behind the pointer with delicate transparency.
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // Do not run canvas cursor trail on mobile touch screens
  const isMobileOrTouch = (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches) || window.innerWidth <= 768;
  if (isMobileOrTouch) {
    return;
  }

  // Create canvas overlay
  let canvas = document.getElementById('eventoraCursorCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'eventoraCursorCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'height: 100%',
      'max-width: 100%',
      'pointer-events: none',
      'z-index: 2147483647',
      'display: block'
    ].join(';');

    (document.body || document.documentElement).appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = document.documentElement.clientWidth || window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = document.documentElement.clientWidth || window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Mouse tracking state
  const mouse = {
    x: -100,
    y: -100,
    lastX: -100,
    lastY: -100,
    speed: 0,
    isHoveringInteractive: false,
    isActive: false
  };

  // Compact, short trail settings
  const trail = [];
  const maxTrailLength = 9; // Short trail (reduced from 26)
  const maxAge = 7;         // Fast fade-out (reduced from 18)
  const particles = [];

  // Theme color detector
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      primary: isDark ? 'rgba(249, 115, 22, ' : 'rgba(234, 88, 12, ', // Claude warm orange
      secondary: isDark ? 'rgba(251, 146, 60, ' : 'rgba(249, 115, 22, ', // Amber orange accent
      glow: isDark ? 'rgba(249, 115, 22, 0.35)' : 'rgba(234, 88, 12, 0.25)'
    };
  }

  // Pointer move listener
  function onPointerMove(e) {
    if (e.pointerType === 'touch') return;

    mouse.isActive = true;
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    mouse.speed = Math.min(Math.hypot(dx, dy), 35);

    // Push compact trail node with slim size
    trail.push({
      x: mouse.x,
      y: mouse.y,
      age: 0,
      size: mouse.isHoveringInteractive ? 4.5 : Math.min(3.8, 1.8 + mouse.speed * 0.08),
      dx: dx,
      dy: dy
    });

    if (trail.length > maxTrailLength) {
      trail.shift();
    }

    // Rare, delicate micro-particles on fast movements
    if (mouse.speed > 10 && particles.length < 12 && Math.random() > 0.6) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 6,
        y: mouse.y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1 - dx * 0.04,
        vy: (Math.random() - 0.5) * 1 - dy * 0.04,
        size: Math.random() * 1.8 + 0.8,
        life: 0.6,
        decay: Math.random() * 0.05 + 0.04
      });
    }
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('mousemove', onPointerMove, { passive: true });

  // Handle pointer leaving the window
  document.addEventListener('pointerleave', () => {
    mouse.isActive = false;
  });

  // Check hover over clickable elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target && target.closest) {
      mouse.isHoveringInteractive = !!target.closest('a, button, input, select, textarea, .event-card, .category-chip, [role="button"]');
    }
  }, { passive: true });

  // Main Animation Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    const colors = getThemeColors();

    // 1. Draw light, translucent pixel square trail
    if (trail.length > 0) {
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = i / Math.max(1, trail.length - 1);
        const alpha = Math.pow(progress, 1.3) * (mouse.isHoveringInteractive ? 0.35 : 0.22);
        const pixelSize = Math.max(3, Math.round(p.size * progress * 1.6));
        const px = Math.floor(p.x / 3) * 3;
        const py = Math.floor(p.y / 3) * 3;

        ctx.fillStyle = `${colors.primary}${alpha})`;
        ctx.fillRect(px - pixelSize / 2, py - pixelSize / 2, pixelSize, pixelSize);

        if (progress > 0.6) {
          ctx.fillStyle = `${colors.secondary}${alpha * 0.3})`;
          ctx.fillRect(px - (pixelSize + 2) / 2, py - (pixelSize + 2) / 2, pixelSize + 2, pixelSize + 2);
        }
      }

      // Age points and discard old ones rapidly
      for (let i = 0; i < trail.length; i++) {
        trail[i].age += 1;
      }
      while (trail.length > 0 && trail[0].age > maxAge) {
        trail.shift();
      }
    }

    // 2. Render delicate floating pixel dust
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const pSize = Math.max(2, Math.round(p.size));
      ctx.fillStyle = `${colors.secondary}${p.life * 0.35})`;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), pSize, pSize);
    }

    // 3. Render 8-bit pixel target / hover indicator
    if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
      const px = Math.floor(mouse.x);
      const py = Math.floor(mouse.y);
      ctx.save();
      if (mouse.isHoveringInteractive) {
        // 8-bit retro corner brackets
        ctx.fillStyle = `${colors.primary}0.65)`;
        // Top-left
        ctx.fillRect(px - 10, py - 10, 5, 2);
        ctx.fillRect(px - 10, py - 10, 2, 5);
        // Top-right
        ctx.fillRect(px + 6, py - 10, 5, 2);
        ctx.fillRect(px + 9, py - 10, 2, 5);
        // Bottom-left
        ctx.fillRect(px - 10, py + 9, 5, 2);
        ctx.fillRect(px - 10, py + 6, 2, 5);
        // Bottom-right
        ctx.fillRect(px + 6, py + 9, 5, 2);
        ctx.fillRect(px + 9, py + 6, 2, 5);
        // Center pixel dot
        ctx.fillRect(px - 1, py - 1, 3, 3);
      } else {
        // Crisp 4x4 pixel square with slight glow
        ctx.fillStyle = `${colors.primary}0.45)`;
        ctx.fillRect(px - 2, py - 2, 4, 4);
      }
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  // Initialize loop
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      resizeCanvas();
      requestAnimationFrame(render);
    });
  } else {
    requestAnimationFrame(render);
  }
})();
