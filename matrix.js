/* ============================================================
   BOTVERSE — MATRIX.JS
   Matrix rain / data stream background
   ============================================================ */

(function() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;

  const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ⬡◈◉▲∅∞∑∂⚡⚔';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 16);
    drops = new Array(cols).fill(1).map(() => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = 'rgba(1, 4, 9, 0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#00f5ff';
    ctx.font = '12px "Share Tech Mono", monospace';

    for (let i = 0; i < cols; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * 16;
      const y = drops[i] * 16;

      // Vary brightness
      const alpha = Math.random() > 0.9 ? 1 : 0.35;
      ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
      ctx.fillText(char, x, y);

      if (y > H && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 60);
})();
