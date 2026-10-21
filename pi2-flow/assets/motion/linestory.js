// Animated training curves: the runs draw side by side, update by update, with a phase caption above the plot.
// Markup: .linestory[data-xlabel][data-ylabel][data-ymin][data-ymax][data-ystep][data-xticks] containing
// .linestory-phase[data-at][data-text] elements and a <script type="application/json"> with
// {"series": [{"name", "style", "x": [...], "raw": [...], "sx": [...], "smooth": [...]}]}.
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const W = 1000, H = 470, L = 78, R = 92, T = 96, B = 62;
  const DRAW = 6000;
  const clamp = (u) => Math.min(1, Math.max(0, u));

  for (const root of document.querySelectorAll('.linestory')) {
    const data = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    const phases = [...root.querySelectorAll('.linestory-phase')].map((e) => ({at: +e.dataset.at, text: e.dataset.text}));
    const ymin = +root.dataset.ymin, ymax = +root.dataset.ymax, ystep = +root.dataset.ystep;
    const xticks = root.dataset.xticks.split(',').map(Number);
    const xmax = Math.max(...data.series.flatMap((s) => s.x));
    const PW = W - L - R, PH = H - T - B;
    const x = (v) => L + PW * v / xmax;
    const y = (v) => T + PH * (1 - (v - ymin) / (ymax - ymin));
    const el = (tag, attrs, parent) => {
      const e = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
      if (parent) parent.append(e);
      return e;
    };
    root.classList.add('is-live');

    const svg = el('svg', {viewBox: `0 0 ${W} ${H}`, role: 'img', class: 'linestory-svg',
      'aria-label': data.series.map((s) => `${s.name}: final loss ${s.smooth[s.smooth.length - 1].toFixed(1)}`).join('; ')});
    for (let v = ymin; v <= ymax + 1e-9; v += ystep) {
      el('line', {x1: L, x2: W - R, y1: y(v), y2: y(v), class: 'ls-grid'}, svg);
      el('text', {x: L - 10, y: y(v) + 5, 'text-anchor': 'end', class: 'ls-tick'}, svg).textContent = v;
    }
    for (const v of xticks) {
      el('text', {x: x(v), y: T + PH + 24, 'text-anchor': 'middle', class: 'ls-tick'}, svg).textContent = v;
    }
    el('line', {x1: L, x2: W - R, y1: T + PH, y2: T + PH, class: 'ls-axis-line'}, svg);
    el('text', {x: L + PW / 2, y: H - 6, 'text-anchor': 'middle', class: 'ls-axis'}, svg).textContent = root.dataset.xlabel;
    el('text', {x: 20, y: T + PH / 2, 'text-anchor': 'middle', class: 'ls-axis', transform: `rotate(-90 20 ${T + PH / 2})`}, svg)
      .textContent = root.dataset.ylabel;
    const phaseText = el('text', {x: W / 2, y: 34, 'text-anchor': 'middle', class: 'ls-phase'}, svg);
    let lx = L;
    for (const s of data.series) {
      el('line', {x1: lx, x2: lx + 22, y1: 63, y2: 63, class: `ls-line ls-${s.style}`}, svg);
      el('text', {x: lx + 30, y: 68, class: 'ls-legend'}, svg).textContent = s.name;
      lx += 30 + s.name.length * 7.8 + 34;
    }
    const cursor = el('line', {y1: T, y2: T + PH, class: 'ls-cursor'}, svg);
    const runs = data.series.map((s) => ({
      s,
      raw: el('polyline', {class: `ls-raw ls-${s.style}`}, svg),
      line: el('polyline', {class: `ls-line ls-${s.style}`}, svg),
      head: el('circle', {r: 5.5, class: `ls-head ls-${s.style}`}, svg),
      label: el('text', {class: `ls-val ls-${s.style}-t`}, svg),
    }));

    const upto = (xs, ys, xc) => {
      const pts = [];
      for (let i = 0; i < xs.length && xs[i] <= xc; i++) pts.push([xs[i], ys[i]]);
      const i = pts.length;
      if (i > 0 && i < xs.length) {
        const u = (xc - xs[i - 1]) / (xs[i] - xs[i - 1]);
        pts.push([xc, ys[i - 1] + (ys[i] - ys[i - 1]) * u]);
      }
      return pts;
    };
    const fmtPts = (pts) => pts.map(([a, b]) => `${x(a).toFixed(1)},${y(b).toFixed(1)}`).join(' ');

    function draw(ms) {
      const xc = clamp(ms / DRAW) * xmax;
      phaseText.textContent = phases.reduce((a, p) => (xc >= p.at ? p.text : a), phases[0].text);
      cursor.setAttribute('x1', x(xc));
      cursor.setAttribute('x2', x(xc));
      cursor.setAttribute('opacity', xc > 0 && xc < xmax ? 1 : 0);
      for (const r of runs) {
        r.raw.setAttribute('points', fmtPts(upto(r.s.x, r.s.raw, xc)));
        const pts = upto(r.s.sx, r.s.smooth, xc);
        r.line.setAttribute('points', fmtPts(pts));
        const last = pts[pts.length - 1];
        const on = pts.length > 0;
        r.head.setAttribute('opacity', on ? 1 : 0);
        r.label.setAttribute('opacity', on ? 1 : 0);
        if (!on) continue;
        r.head.setAttribute('cx', x(last[0]));
        r.head.setAttribute('cy', y(last[1]));
        r.label.setAttribute('x', x(last[0]) + 12);
        r.label.setAttribute('y', y(last[1]) + 5);
        r.label.textContent = last[1].toFixed(1);
      }
    }

    let start = 0, raf = 0, played = false;
    const frame = (now) => {
      const ms = now - start;
      draw(ms);
      if (ms < DRAW) raf = requestAnimationFrame(frame);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      played = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return draw(DRAW);
      start = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const replay = document.createElement('button');
    replay.type = 'button';
    replay.className = 'barstory-replay';
    replay.textContent = 'Replay';
    replay.addEventListener('click', play);
    root.prepend(svg);
    svg.after(replay);
    draw(0);
    const check = () => {
      if (played) return;
      const r = root.getBoundingClientRect();
      const seen = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      if (r.height > 0 && seen >= Math.min(r.height, innerHeight) * 0.5) {
        play();
        io.disconnect();
        removeEventListener('scroll', check);
      }
    };
    const io = new IntersectionObserver(check, {threshold: [0, 0.25, 0.5, 0.75, 1]});
    io.observe(root);
    addEventListener('scroll', check, {passive: true});
    addEventListener('load', check);
    requestAnimationFrame(check);
  }
})();
