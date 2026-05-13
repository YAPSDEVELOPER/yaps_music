/* ============================================================
   DASHBOARD.JS  – Charts & Dynamic Content
   ============================================================ */

/* ---- Colour helpers ---- */
const PURPLE = '#7c3aed';
const CYAN   = '#06b6d4';
const PINK   = '#ec4899';
const GREEN  = '#10b981';
const ACCENT = '#00f5d4';

/* ============================================================
   AREA CHART  (pure Canvas – no library needed)
   ============================================================ */
(function buildAreaChart() {
  const canvas = document.getElementById('areaChart');
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const container = canvas.parentElement;

  function resize() {
    canvas.style.width  = '100%';
    canvas.style.height = '200px';
    canvas.width  = container.clientWidth * dpr;
    canvas.height = 200 * dpr;
    draw();
  }

  const dataA = [28, 22, 38, 45, 30, 42, 22, 35, 48, 38, 25, 40, 30, 18, 35, 42, 28, 38, 45, 30, 36, 42, 28, 25];
  const dataB = [18, 30, 22, 35, 45, 28, 38, 42, 28, 45, 35, 22, 40, 32, 25, 38, 44, 30, 20, 42, 28, 36, 40, 32];

  /* Tooltip callouts from original design */
  const callouts = [
    { idx: 6,  label: 'TITLE A', ds: 0 },
    { idx: 12, label: 'TITLE B', ds: 1 },
    { idx: 18, label: 'TITLE C', ds: 0 },
  ];

  function draw() {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.scale(dpr, dpr);
    const w = W / dpr;
    const h = H / dpr;

    const pad = { top: 20, right: 20, bottom: 10, left: 40 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top  - pad.bottom;
    const maxVal = 55;

    function xPos(i) { return pad.left + (i / (dataA.length - 1)) * chartW; }
    function yPos(v) { return pad.top  + chartH - (v / maxVal) * chartH; }

    /* --- Y-axis grid lines --- */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    [0, 10, 20, 30, 40, 50].forEach(v => {
      const y = yPos(v);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.strokeStyle = 'rgba(255,255,255,.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = 'rgba(148,163,184,.5)';
      ctx.font = `${10 * dpr}px "Exo 2", sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(v, pad.left - 6, y + 4);
    });

    /* --- Draw a filled area --- */
    function drawArea(data, colorTop, colorBot) {
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
      grad.addColorStop(0,   colorTop + 'cc');
      grad.addColorStop(.6,  colorTop + '44');
      grad.addColorStop(1,   colorTop + '00');

      ctx.beginPath();
      ctx.moveTo(xPos(0), yPos(data[0]));
      for (let i = 1; i < data.length; i++) {
        const xc = (xPos(i - 1) + xPos(i)) / 2;
        const yc = (yPos(data[i - 1]) + yPos(data[i])) / 2;
        ctx.quadraticCurveTo(xPos(i - 1), yPos(data[i - 1]), xc, yc);
      }
      ctx.lineTo(xPos(data.length - 1), yPos(data[data.length - 1]));
      ctx.lineTo(xPos(data.length - 1), pad.top + chartH);
      ctx.lineTo(xPos(0), pad.top + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      /* stroke */
      ctx.beginPath();
      ctx.moveTo(xPos(0), yPos(data[0]));
      for (let i = 1; i < data.length; i++) {
        const xc = (xPos(i - 1) + xPos(i)) / 2;
        const yc = (yPos(data[i - 1]) + yPos(data[i])) / 2;
        ctx.quadraticCurveTo(xPos(i - 1), yPos(data[i - 1]), xc, yc);
      }
      ctx.lineTo(xPos(data.length - 1), yPos(data[data.length - 1]));
      ctx.strokeStyle = colorTop;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    drawArea(dataA, PURPLE, 'transparent');
    drawArea(dataB, CYAN,   'transparent');

    /* --- Callout bubbles --- */
    callouts.forEach(c => {
      const ds   = c.ds === 0 ? dataA : dataB;
      const x    = xPos(c.idx);
      const y    = yPos(ds[c.idx]);
      const col  = c.ds === 0 ? PURPLE : CYAN;

      /* vertical dashed line */
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, pad.top + chartH);
      ctx.strokeStyle = col + '80';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      /* dot */
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      /* pill */
      const label   = c.label;
      const fontSize = 9;
      ctx.font = `bold ${fontSize}px "Rajdhani", sans-serif`;
      const tw  = ctx.measureText(label).width;
      const bw  = tw + 12;
      const bh  = 16;
      const bx  = x - bw / 2;
      const by  = y - bh - 8;

      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 4);
      ctx.fillStyle = col;
      ctx.fill();

      /* small triangle */
      ctx.beginPath();
      ctx.moveTo(x - 4, by + bh);
      ctx.lineTo(x + 4, by + bh);
      ctx.lineTo(x, by + bh + 5);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, by + bh - 4);
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  /* populate badges */
  const badges = ['TITLE A', 'TITLE B', 'TITLE C', 'TITLE D', 'TITLE E', 'TITLE F'];
  const badgeWrap = document.getElementById('chartBadges');
  badges.forEach(b => {
    const el = document.createElement('span');
    el.className = 'badge';
    el.textContent = b;
    badgeWrap.appendChild(el);
  });
})();

/* ============================================================
   BAR CHART  (pure Canvas)
   ============================================================ */
(function buildBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;

  const dpr       = window.devicePixelRatio || 1;
  const container = canvas.parentElement;
  const data      = [30, 55, 40, 70, 45, 60, 35, 80, 50, 65, 42, 72];

  function resize() {
    canvas.style.width  = '100%';
    canvas.style.height = '120px';
    canvas.width  = container.clientWidth * dpr;
    canvas.height = 120 * dpr;
    draw();
  }

  function draw() {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const w       = W / dpr;
    const h       = H / dpr;
    const maxVal  = 100;
    const barGap  = 4;
    const barW    = (w - barGap * (data.length + 1)) / data.length;
    const topPad  = 8;
    const botPad  = 8;
    const chartH  = h - topPad - botPad;

    data.forEach((val, i) => {
      const bh   = (val / maxVal) * chartH;
      const bx   = (barGap + barW) * i + barGap;
      const by   = topPad + (chartH - bh);

      const grad = ctx.createLinearGradient(0, by, 0, by + bh);
      grad.addColorStop(0,   CYAN   + 'ff');
      grad.addColorStop(.5,  PURPLE + 'cc');
      grad.addColorStop(1,   PURPLE + '44');

      ctx.beginPath();
      const r = Math.min(3, barW / 2);
      ctx.roundRect(bx * dpr, by * dpr, barW * dpr, bh * dpr, r * dpr);
      ctx.fillStyle = grad;
      ctx.shadowColor = CYAN;
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();
})();

/* ============================================================
   PROGRESS LIST
   ============================================================ */
(function buildProgressList() {
  const wrap = document.getElementById('progressList');
  if (!wrap) return;

  const days = [
    { label: 'Monday',    pct: 72, color: `linear-gradient(90deg, ${PURPLE}, ${CYAN})` },
    { label: 'Tuesday',   pct: 55, color: `linear-gradient(90deg, ${CYAN}, ${GREEN})` },
    { label: 'Wednesday', pct: 88, color: `linear-gradient(90deg, ${PURPLE}, ${PINK})` },
    { label: 'Thursday',  pct: 40, color: `linear-gradient(90deg, ${CYAN}, ${PURPLE})` },
    { label: 'Friday',    pct: 65, color: `linear-gradient(90deg, ${GREEN}, ${CYAN})` },
  ];

  days.forEach(d => {
    const circ = `${d.pct}%`;
    wrap.innerHTML += `
      <div class="prog-row">
        <div class="prog-label">
          <span>${d.label}</span>
          <span>${d.pct}%</span>
        </div>
        <div class="prog-track">
          <div class="prog-fill" style="--pct:${circ}; background:${d.color}; width:${circ};"></div>
        </div>
      </div>`;
  });
})();

/* ============================================================
   DONUT LIST
   ============================================================ */
(function buildDonutList() {
  const wrap = document.getElementById('donutList');
  if (!wrap) return;

  const items = [
    { pct: 75, color: CYAN,   label: 'Commodo consequat', val: '$ 98.365' },
    { pct: 62, color: PURPLE, label: 'Commodo consequat', val: '$ 65.235' },
    { pct: 43, color: GREEN,  label: 'Commodo consequat', val: '$ 25.687' },
  ];

  const R   = 19;  // radius
  const C   = 2 * Math.PI * R; // circumference

  items.forEach(item => {
    const offset = C - (item.pct / 100) * C;
    const valColor = item.color;

    const div = document.createElement('div');
    div.className = 'donut-row';
    div.innerHTML = `
      <div class="donut-ring">
        <svg viewBox="0 0 48 48">
          <circle class="bg-ring" cx="24" cy="24" r="${R}"/>
          <circle class="fg-ring"
            cx="24" cy="24" r="${R}"
            stroke="${item.color}"
            stroke-dasharray="${C}"
            stroke-dashoffset="${C}"
            style="stroke-dashoffset:${offset}; filter:drop-shadow(0 0 4px ${item.color})"/>
        </svg>
        <span class="donut-pct">${item.pct}%</span>
      </div>
      <div class="donut-info">
        <p class="donut-meta">${item.label}</p>
        <p class="donut-val" style="color:${valColor}">${item.val}</p>
      </div>`;
    wrap.appendChild(div);
  });
})();

/* ============================================================
   Number counter animation on scroll
   ============================================================ */
(function countAnimations() {
  const els = document.querySelectorAll('.stat-val');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const raw = el.getAttribute('data-target');
      if (!raw) return;
      const end  = parseFloat(raw);
      const isFloat = String(raw).includes('.');
      let start = 0;
      const dur  = 1400;
      const step = ts => {
        if (!start) start = ts;
        const p    = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cur  = ease * end;
        const small = el.querySelector('small');
        el.childNodes[0].nodeValue = isFloat
          ? cur.toFixed(3).replace('.', '.')
          : Math.round(cur).toLocaleString() + ' ';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: .3 });

  els.forEach(el => {
    el.setAttribute('data-target', el.textContent.replace(/[^0-9.]/g, ''));
    io.observe(el);
  });
})();
