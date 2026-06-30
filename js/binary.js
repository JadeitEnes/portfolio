(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'binary-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  const FONT_SIZE   = 12;
  const COL_SPACING = 40;
  const DROP_SPEED  = 1.5;
  const TRAIL_LEN   = 6;
  const HEAD_ALPHA  = 0.35;
  const FPS_CAP     = 20;

  let cols = [];
  let lastTs = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildCols();
  }

  function buildCols() {
    const count = Math.floor(canvas.width / COL_SPACING);
    cols = Array.from({ length: count }, (_, i) => ({
      x:     i * COL_SPACING + COL_SPACING / 2,
      y:     -(Math.random() * window.innerHeight),
      chars: Array.from({ length: TRAIL_LEN }, rndBit),
    }));
  }

  function rndBit() { return Math.random() > 0.5 ? '1' : '0'; }

  function frame(ts) {
    requestAnimationFrame(frame);
    if (ts - lastTs < 1000 / FPS_CAP) return;
    lastTs = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font      = `${FONT_SIZE}px 'DM Mono', monospace`;
    ctx.textAlign = 'center';

    for (const col of cols) {
      for (let t = 0; t < TRAIL_LEN; t++) {
        const py = col.y - t * FONT_SIZE;
        if (py < 0 || py > canvas.height) continue;
        const alpha = HEAD_ALPHA * (1 - t / TRAIL_LEN);
        ctx.fillStyle = `rgba(46,224,200,${alpha.toFixed(3)})`;
        ctx.fillText(col.chars[t], col.x, py);
      }

      col.y += DROP_SPEED;

      if (Math.random() < 0.04) {
        col.chars[Math.floor(Math.random() * TRAIL_LEN)] = rndBit();
      }

      if (col.y - TRAIL_LEN * FONT_SIZE > canvas.height) {
        col.y     = -(TRAIL_LEN * FONT_SIZE + Math.random() * canvas.height * 0.6);
        col.chars = col.chars.map(rndBit);
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
