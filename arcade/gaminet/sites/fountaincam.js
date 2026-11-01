/* fountaincam.ou — the FountainCam Network: simulated camera feeds of fountains, circa 2003 */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-fountaincam{background:#1c1c1c url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%274%27 height=%274%27%3E%3Crect width=%274%27 height=%274%27 fill=%27%231c1c1c%27/%3E%3Crect width=%271%27 height=%271%27 fill=%27%23262626%27/%3E%3C/svg%3E");color:#cfcfcf;font:11px/1.45 Verdana,Arial,sans-serif;padding:8px}',
    '.gn-fountaincam a{color:#7fd8ff}.gn-fountaincam a:visited{color:#b49cff}',
    '.gn-fountaincam table.fc-frame{width:100%;max-width:760px;margin:0 auto;border-collapse:collapse;background:#2a2a2a;border:1px solid #555}',
    '.gn-fountaincam .fc-head td{background:linear-gradient(180deg,#3a3a3a,#141414);border-bottom:2px solid #0a7a8a;padding:6px 8px}',
    '.gn-fountaincam .fc-logo{font:bold 22px/1 Arial,sans-serif;color:#e8e8e8;letter-spacing:-1px;text-decoration:none}.gn-fountaincam .fc-logo b{color:#2fd0e0}',
    '.gn-fountaincam .fc-logo small{display:block;font:9px Verdana;color:#8a8a8a;letter-spacing:2px}',
    '.gn-fountaincam .fc-menu{background:#111;border-bottom:1px solid #444;padding:3px 8px;font-size:10px}.gn-fountaincam .fc-menu a{color:#cfcfcf;text-decoration:none;margin-right:12px}.gn-fountaincam .fc-menu a:hover{color:#2fd0e0}',
    '.gn-fountaincam td.fc-c{padding:8px;vertical-align:top}',
    '.gn-fountaincam h1{font:bold 13px Verdana;color:#fff;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px}',
    '.gn-fountaincam h2{font:bold 11px Verdana;color:#2fd0e0;margin:10px 0 4px;text-transform:uppercase;letter-spacing:1px}',
    '.gn-fountaincam table.fc-idx{width:100%;border-collapse:collapse;font-size:10px}',
    '.gn-fountaincam .fc-idx th{background:#0a5a66;color:#fff;text-align:left;padding:3px 5px;border:1px solid #333}',
    '.gn-fountaincam .fc-idx td{padding:3px 5px;border:1px solid #333;background:#232323}.gn-fountaincam .fc-idx tr:hover td{background:#2e3a3c;cursor:pointer}',
    '.gn-fountaincam .fc-led{display:inline-block;width:7px;height:7px;border-radius:50%;background:#2f2;box-shadow:0 0 4px #2f2;margin-right:4px}',
    '.gn-fountaincam .fc-led.deg{background:#fb2;box-shadow:0 0 4px #fb2;animation:fcBlink 1s steps(1) infinite}@keyframes fcBlink{50%{opacity:.2}}',
    '.gn-fountaincam .fc-view{background:#000;border:2px solid #555;border-bottom:0;position:relative}',
    '.gn-fountaincam .fc-view canvas{display:block;width:100%;aspect-ratio:4/3;image-rendering:pixelated;background:#000}',
    '.gn-fountaincam .fc-ctrl{display:flex;flex-wrap:wrap;align-items:center;gap:4px;padding:4px;background:linear-gradient(180deg,#5a5a62,#2a2a30);border:2px solid #555;border-top:1px solid #888}',
    '.gn-fountaincam .fc-ctrl button,.gn-fountaincam .fc-ctrl select{font:bold 10px Verdana;color:#e8e8e8;background:linear-gradient(180deg,#6a6a74,#3a3a42);border:1px solid #1a1a1a;border-radius:3px;padding:3px 7px;cursor:pointer;box-shadow:inset 0 1px rgba(255,255,255,.25)}',
    '.gn-fountaincam .fc-ctrl button[aria-pressed=true]{background:linear-gradient(180deg,#1a8a9a,#0a4a55)}',
    '.gn-fountaincam .fc-ctrl .fc-sp{flex:1}.gn-fountaincam .fc-ctrl input[type=range]{width:70px}',
    '.gn-fountaincam .fc-lcd{font:10px "Courier New",monospace;color:#2fd0e0;background:#000;border:1px inset #444;padding:2px 6px;min-width:120px}',
    '.gn-fountaincam .fc-two{display:flex;gap:10px;flex-wrap:wrap}.gn-fountaincam .fc-two>div{flex:1 1 300px;min-width:0}',
    '.gn-fountaincam .fc-info td{padding:2px 6px;border-bottom:1px dotted #444}.gn-fountaincam .fc-info td:first-child{color:#888;width:90px}',
    '.gn-fountaincam .fc-snaps{display:flex;gap:4px;flex-wrap:wrap}.gn-fountaincam .fc-snaps img{width:80px;height:60px;border:1px solid #555;image-rendering:pixelated}',
    '.gn-fountaincam .fc-ad{display:block;margin:8px 0;border:1px solid #0a7a8a;background:linear-gradient(180deg,#e8f6ff,#9fd0f4);color:#0a3f7a;text-decoration:none;padding:6px 8px;font:bold 11px Arial}',
    '.gn-fountaincam .fc-ad small{display:block;font:9px Verdana;color:#2a5a8a}',
    '.gn-fountaincam .fc-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:6px}',
    '.gn-fountaincam .fc-wall a{display:block;text-decoration:none;color:#cfcfcf;background:#000;border:1px solid #444;font:9px Verdana}',
    '.gn-fountaincam .fc-wall canvas{display:block;width:100%;aspect-ratio:4/3;image-rendering:pixelated}',
    '.gn-fountaincam .fc-wall span{display:block;padding:2px 4px;background:#111}',
    '.gn-fountaincam .fc-foot{text-align:center;font-size:9px;color:#777;padding:8px}',
    '.gn-fountaincam .fc-dis{font-size:9px;color:#999;border:1px solid #444;padding:4px 6px;margin-top:8px;background:#181818}',
    '.gn-fountaincam.fc-big{position:relative;overflow:hidden}',
    '.gn-fountaincam.fc-big .fc-player{position:absolute;z-index:5;left:0;top:0;width:100%;display:flex;flex-direction:column;background:#000}',
    '.gn-fountaincam.fc-big .fc-view{flex:1;min-height:0;border:0}',
    '.gn-fountaincam.fc-big .fc-view canvas{width:100%;height:100%;aspect-ratio:auto;object-fit:contain}'
  ].join('\n');

  var ST = [
    { id: 'plaza-001', code: 'PLZ-001', name: 'PLAZA CAM 001', loc: 'Outdoor plaza basin, overhead mast', res: '320×240', fps: 10, status: 'LIVE', kind: 'plaza' },
    { id: 'north-atrium', code: 'ATR-N', name: 'NORTH ATRIUM FOUNTAIN', loc: 'Two-level atrium, upper railing', res: '320×240', fps: 5, status: 'LIVE', kind: 'atrium' },
    { id: 'lobby-04', code: 'LBY-04', name: 'CORPORATE LOBBY 04', loc: 'Ground-floor lobby, granite water wall', res: '320×240 B/W', fps: 8, status: 'LIVE', kind: 'lobby' },
    { id: 'watercourt', code: 'WTC-1', name: 'MEADOWLANDS WATERCOURT', loc: 'Open watercourt, programmed jets', res: '320×240', fps: 12, status: 'LIVE', kind: 'court' },
    { id: 'reflection-pool', code: 'HTL-RP', name: 'HOTEL REFLECTION POOL', loc: 'Hotel forecourt, night', res: '320×240', fps: 6, status: 'LIVE', kind: 'pool' },
    { id: 'vacant-retail', code: 'VRF-0', name: 'VACANT RETAIL FOUNTAIN', loc: 'Former retail concourse, lower level', res: '160×120', fps: 3, status: 'DEGRADED', kind: 'vacant' }
  ];
  function byId(id) { return ST.filter(function (s) { return s.id === id; })[0]; }

  /* ---- procedural scenes. Each draws one frame into a W x H context at time t (s) */
  function rnd(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  var SCENES = {
    plaza: function (x, W, H, t, S) {
      x.fillStyle = '#8e8a80'; x.fillRect(0, 0, W, H);
      x.strokeStyle = 'rgba(60,55,50,.35)'; x.lineWidth = 1;
      for (var i = 0; i < W; i += W / 12) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); }
      for (var j = 0; j < H; j += H / 9) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
      var cx = W / 2, cy = H / 2, R = H * 0.32;
      x.fillStyle = '#cfcac0'; x.beginPath(); x.arc(cx, cy, R + 8, 0, 7); x.fill();
      var g = x.createRadialGradient(cx, cy, 4, cx, cy, R); g.addColorStop(0, '#5fa8c8'); g.addColorStop(1, '#1f5a7a'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
      x.strokeStyle = 'rgba(220,245,255,.35)';
      for (var k = 0; k < 5; k++) { var rr = ((t * 22 + k * R / 5) % R); x.beginPath(); x.arc(cx, cy, rr, 0, 7); x.stroke(); }
      S.p = S.p || []; for (var n = 0; n < 6; n++) S.p.push({ a: Math.random() * 6.28, r: 0, v: 18 + Math.random() * 26, life: 0 });
      x.fillStyle = 'rgba(240,250,255,.85)';
      S.p = S.p.filter(function (p) { p.r += p.v * 0.1; p.life += 0.1; var px = cx + Math.cos(p.a) * p.r, py = cy + Math.sin(p.a) * p.r; x.fillRect(px, py, 2, 2); return p.r < R * 0.8; });
      x.fillStyle = '#fff'; x.beginPath(); x.arc(cx, cy, 5 + Math.sin(t * 9) * 1.5, 0, 7); x.fill();
      S.people = S.people || []; if (Math.random() < 0.02) S.people.push({ x: -10, y: Math.random() < 0.5 ? H * 0.12 : H * 0.88, v: 8 + Math.random() * 8 });
      S.people = S.people.filter(function (p) { p.x += p.v * 0.1; x.fillStyle = 'rgba(0,0,0,.25)'; x.beginPath(); x.ellipse(p.x + 4, p.y + 3, 6, 3, 0, 0, 7); x.fill(); x.fillStyle = '#3a3a48'; x.beginPath(); x.arc(p.x, p.y, 4, 0, 7); x.fill(); return p.x < W + 10; });
    },
    atrium: function (x, W, H, t, S) {
      var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f4f0e0'); g.addColorStop(0.35, '#c8c2b0'); g.addColorStop(1, '#8a8478'); x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.fillStyle = 'rgba(255,255,240,.9)'; x.fillRect(W * 0.2, 0, W * 0.6, H * 0.08);
      var shops = ['#c84a3a', '#3a6ac8', '#e8b030', '#4a9a5a', '#9a4ac8', '#2a2a2a'];
      for (var f = 0; f < 2; f++) for (var i = 0; i < 6; i++) { var y0 = H * (0.16 + f * 0.24); x.fillStyle = '#e8e2d0'; x.fillRect(i * W / 6 + 3, y0, W / 6 - 6, H * 0.16); x.fillStyle = shops[(i + f * 2) % 6]; x.fillRect(i * W / 6 + 6, y0 + 3, W / 6 - 12, H * 0.035); x.fillStyle = 'rgba(40,40,60,.35)'; x.fillRect(i * W / 6 + 6, y0 + H * 0.06, W / 6 - 12, H * 0.09); }
      x.fillStyle = '#b8b0a0'; x.fillRect(0, H * 0.38, W, 4);
      x.strokeStyle = '#6a6458'; x.lineWidth = 3; x.beginPath(); x.moveTo(W * 0.04, H * 0.92); x.lineTo(W * 0.28, H * 0.4); x.stroke();
      var cx = W / 2, cy = H * 0.78;
      x.fillStyle = '#d8d2c4'; x.beginPath(); x.ellipse(cx, cy, W * 0.3, H * 0.08, 0, 0, 7); x.fill();
      x.fillStyle = '#4a8ab0'; x.beginPath(); x.ellipse(cx, cy - 2, W * 0.27, H * 0.06, 0, 0, 7); x.fill();
      x.fillStyle = '#d8d2c4'; x.fillRect(cx - 6, cy - H * 0.16, 12, H * 0.14); x.beginPath(); x.ellipse(cx, cy - H * 0.16, W * 0.1, H * 0.03, 0, 0, 7); x.fill();
      x.fillStyle = 'rgba(235,248,255,.9)';
      for (var a = 0; a < 10; a++) { var ang = a / 10 * Math.PI * 2; for (var s = 0; s < 1; s += 0.08) { var ph = (s + t * 0.8) % 1, px = cx + Math.cos(ang) * W * 0.24 * (1 - ph * 0.85), py = cy - 4 - Math.sin(ph * Math.PI) * H * 0.18 + Math.sin(ang) * H * 0.04 * (1 - ph); x.fillRect(px, py, 2, 2); } }
      for (var c = 0; c < 30; c++) { var cy2 = cy - H * 0.17 - ((t * 60 + c * 7) % (H * 0.12)); x.fillRect(cx - 1 + Math.sin(c) * 3, cy2, 2, 2); }
      [[W * 0.12, H * 0.86], [W * 0.88, H * 0.86]].forEach(function (p) { x.fillStyle = '#6a4a2a'; x.fillRect(p[0] - 12, p[1] - 6, 24, 14); x.fillStyle = '#2f7a3a'; x.beginPath(); x.arc(p[0], p[1] - 12, 14, 0, 7); x.fill(); });
    },
    lobby: function (x, W, H, t, S) {
      x.fillStyle = '#5a5a5a'; x.fillRect(0, 0, W, H);
      var wx = W * 0.22, ww = W * 0.56, wy = H * 0.08, wh = H * 0.6;
      var r = rnd(4); x.fillStyle = '#3a3a3a'; x.fillRect(wx, wy, ww, wh);
      for (var i = 0; i < 220; i++) { x.fillStyle = 'rgba(255,255,255,' + (r() * 0.12) + ')'; x.fillRect(wx + r() * ww, wy + r() * wh, 2, 2); }
      x.strokeStyle = 'rgba(230,230,230,.45)';
      for (var k = 0; k < 40; k++) { var lx = wx + (k + 0.5) * ww / 40, off = (t * 90 + k * 37) % wh; x.beginPath(); x.moveTo(lx, wy + off); x.lineTo(lx + Math.sin(k + t) * 0.6, wy + Math.min(wh, off + 22)); x.stroke(); }
      x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(wx, wy, ww, wh);
      x.fillStyle = '#7a7a7a'; x.fillRect(wx - 6, wy + wh, ww + 12, 8);
      x.fillStyle = '#9a9a9a'; x.fillRect(0, wy + wh + 8, W, H);
      x.save(); x.globalAlpha = 0.25; x.translate(0, (wy + wh + 8) * 2); x.scale(1, -1); x.fillStyle = '#3a3a3a'; x.fillRect(wx, wy, ww, wh); x.restore();
      x.fillStyle = '#c8c8c8'; x.fillRect(W * 0.42, H * 0.3, W * 0.16, H * 0.07); x.fillStyle = '#333'; x.font = 'bold ' + Math.round(H * 0.04) + 'px Arial'; x.textAlign = 'center'; x.fillText('LOBBY 04', W / 2, H * 0.355);
      S.walk = S.walk || { x: -20, on: false }; if (!S.walk.on && Math.random() < 0.01) S.walk = { x: -20, on: true };
      if (S.walk.on) { S.walk.x += 3; x.fillStyle = '#222'; x.fillRect(S.walk.x, H * 0.62, 10, H * 0.26); x.beginPath(); x.arc(S.walk.x + 5, H * 0.6, 6, 0, 7); x.fill(); if (S.walk.x > W + 20) S.walk.on = false; }
    },
    court: function (x, W, H, t, S) {
      var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a1030'); g.addColorStop(0.45, '#1a2050'); g.addColorStop(1, '#2a2a3a'); x.fillStyle = g; x.fillRect(0, 0, W, H);
      x.fillStyle = '#20263a'; x.fillRect(0, H * 0.25, W, H * 0.18);
      for (var w = 0; w < 14; w++) { x.fillStyle = (w * 7 + Math.floor(t / 5)) % 3 ? 'rgba(255,220,140,.7)' : 'rgba(255,220,140,.15)'; x.fillRect(8 + w * (W - 16) / 14, H * 0.29, (W - 16) / 14 - 6, H * 0.05); }
      x.fillStyle = '#4a4a5a'; x.beginPath(); x.moveTo(0, H * 0.55); x.lineTo(W, H * 0.55); x.lineTo(W, H); x.lineTo(0, H); x.fill();
      x.strokeStyle = 'rgba(0,0,0,.25)'; for (var i = 0; i < 12; i++) { x.beginPath(); x.moveTo(W / 2 + (i - 6) * W * 0.05, H * 0.55); x.lineTo(W / 2 + (i - 6) * W * 0.2, H); x.stroke(); }
      var prog = Math.floor(t / 10) % 3;
      for (var r = 0; r < 3; r++) for (var c = 0; c < 5; c++) {
        var px = W * (0.2 + c * 0.15) + (r - 1) * W * 0.04, py = H * (0.62 + r * 0.12), sc = 0.7 + r * 0.25;
        var hgt = prog === 0 ? (0.5 + 0.5 * Math.sin(t * 2 - c * 0.8)) : prog === 1 ? (0.5 + 0.5 * Math.sin(t * 3 + r * 1.5)) : ((Math.floor(t * 2) + c + r) % 2);
        hgt *= H * 0.32 * sc;
        var col = (c + r + Math.floor(t)) % 2 ? '120,230,255' : '255,140,230';
        var jg = x.createLinearGradient(0, py - hgt, 0, py); jg.addColorStop(0, 'rgba(255,255,255,.1)'); jg.addColorStop(1, 'rgba(' + col + ',.85)');
        x.fillStyle = jg; x.fillRect(px - 2 * sc, py - hgt, 4 * sc, hgt);
        x.fillStyle = 'rgba(' + col + ',.35)'; x.beginPath(); x.ellipse(px, py, 9 * sc, 3 * sc, 0, 0, 7); x.fill();
      }
    },
    pool: function (x, W, H, t, S) {
      x.fillStyle = '#05070f'; x.fillRect(0, 0, W, H);
      x.fillStyle = '#ddd8c0'; x.beginPath(); x.arc(W * 0.82, H * 0.12, 7, 0, 7); x.fill();
      x.fillStyle = '#121626'; x.fillRect(W * 0.1, H * 0.08, W * 0.8, H * 0.36);
      var lights = []; var r = rnd(9);
      for (var i = 0; i < 6; i++) for (var j = 0; j < 4; j++) if (r() > 0.4) lights.push([W * 0.14 + i * W * 0.125, H * 0.11 + j * H * 0.08]);
      lights.forEach(function (l) { x.fillStyle = 'rgba(255,214,140,.85)'; x.fillRect(l[0], l[1], W * 0.06, H * 0.04); });
      x.fillStyle = '#2a2a30'; x.fillRect(0, H * 0.44, W, H * 0.06);
      x.fillStyle = '#060a18'; x.fillRect(W * 0.06, H * 0.5, W * 0.88, H * 0.44);
      lights.forEach(function (l) {
        var ry = H * 0.5 + (H * 0.44 - (l[1] - H * 0.08)) * 0.95;
        for (var s = 0; s < 4; s++) { var wob = Math.sin(t * 1.5 + l[0] * 0.1 + s) * 2; x.fillStyle = 'rgba(255,214,140,' + (0.35 - s * 0.07) + ')'; x.fillRect(l[0] + wob, ry - s * 3, W * 0.06, 2); }
      });
      S.leaf = S.leaf || { x: -10, y: H * 0.7 }; S.leaf.x += 0.4; if (S.leaf.x > W + 10) S.leaf = { x: -10, y: H * (0.55 + Math.random() * 0.35) };
      x.fillStyle = '#5a4020'; x.beginPath(); x.ellipse(S.leaf.x, S.leaf.y + Math.sin(t) * 1.5, 4, 2, t * 0.3, 0, 7); x.fill();
      x.strokeStyle = 'rgba(160,180,220,.12)'; x.beginPath(); x.ellipse(S.leaf.x, S.leaf.y, 8 + (t * 6) % 18, 3 + (t * 2) % 6, 0, 0, 7); x.stroke();
    },
    vacant: function (x, W, H, t, S) {
      var flick = Math.random() < 0.08 ? 0.35 : 1;
      x.fillStyle = 'rgb(' + Math.round(70 * flick) + ',' + Math.round(72 * flick) + ',' + Math.round(66 * flick) + ')'; x.fillRect(0, 0, W, H);
      for (var i = 0; i < 4; i++) { var sx = i * W / 4 + 4; x.fillStyle = 'rgba(30,28,26,' + flick + ')'; x.fillRect(sx, H * 0.12, W / 4 - 8, H * 0.32); x.fillStyle = 'rgba(200,190,160,' + (0.8 * flick) + ')'; x.fillRect(sx + 6, H * 0.22, W / 4 - 20, H * 0.08); x.fillStyle = 'rgba(60,40,30,' + flick + ')'; x.font = 'bold ' + Math.round(H * 0.035) + 'px Arial'; x.textAlign = 'center'; x.fillText('SPACE AVAILABLE', sx + (W / 4 - 8) / 2, H * 0.275); }
      x.fillStyle = 'rgba(110,104,92,' + flick + ')'; x.fillRect(0, H * 0.5, W, H * 0.5);
      var cx = W / 2, cy = H * 0.74;
      x.fillStyle = 'rgba(140,134,120,' + flick + ')'; x.beginPath(); x.ellipse(cx, cy, W * 0.3, H * 0.12, 0, 0, 7); x.fill();
      x.fillStyle = 'rgba(70,66,58,' + flick + ')'; x.beginPath(); x.ellipse(cx, cy, W * 0.27, H * 0.095, 0, 0, 7); x.fill();
      x.fillStyle = 'rgba(70,90,80,' + (0.8 * flick) + ')'; x.beginPath(); x.ellipse(cx + W * 0.06, cy + 4, W * 0.08, H * 0.025, 0, 0, 7); x.fill();
      S.drip = S.drip === undefined ? 0 : S.drip; S.drip += 0.12; if (S.drip > 1.4) S.drip = 0;
      if (S.drip < 1) { x.fillStyle = 'rgba(200,220,220,.8)'; x.fillRect(cx + W * 0.06, H * 0.5 + S.drip * (cy - H * 0.5), 2, 3); }
      else { x.strokeStyle = 'rgba(200,220,220,.5)'; x.beginPath(); x.ellipse(cx + W * 0.06, cy + 4, (S.drip - 1) * 40, (S.drip - 1) * 10, 0, 0, 7); x.stroke(); }
    }
  };
  /* camera artifacts: compression, noise, scanlines, rolling bar */
  function post(x, W, H, st, t, quality) {
    if (st.kind === 'lobby') {
      var im = x.getImageData(0, 0, W, H), d = im.data; for (var i = 0; i < d.length; i += 4) { var v = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11; d[i] = d[i + 1] = d[i + 2] = v; } x.putImageData(im, 0, 0);
    }
    var n = quality === 'LOW' ? 0.16 : quality === 'MED' ? 0.08 : 0.04; if (st.kind === 'vacant') n += 0.12;
    for (var k = 0; k < W * H * n * 0.05; k++) { x.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.22)'; x.fillRect(Math.random() * W, Math.random() * H, 1, 1); }
    x.fillStyle = 'rgba(0,0,0,.12)'; for (var y = 0; y < H; y += 2) x.fillRect(0, y, W, 1);
    if (st.kind === 'vacant' || quality === 'LOW') { var by = ((t * 30) % (H + 40)) - 20; x.fillStyle = 'rgba(255,255,255,.06)'; x.fillRect(0, by, W, 14); }
  }
  function overlay(x, W, H, st, frozen) {
    var d = new Date(), p = function (n) { return ('0' + n).slice(-2); };
    var ts = '2003-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    var fs = Math.max(8, Math.round(H / 22));
    x.font = 'bold ' + fs + 'px "Courier New", monospace'; x.textBaseline = 'top';
    function txt(s, X, Y, al) { x.textAlign = al || 'left'; x.fillStyle = 'rgba(0,0,0,.6)'; x.fillText(s, X + 1, Y + 1); x.fillStyle = '#e8ffe8'; x.fillText(s, X, Y); }
    var full = st.code + ' ' + st.name; if (x.measureText(full + '  ' + ts).width + 8 <= W) { txt(full, 4, 3); txt(ts, W - 4, 3, 'right'); } else { txt(x.measureText(full).width + 8 <= W ? full : st.code, 4, 3); txt(ts, 4, 3 + fs + 1); }
    if (!frozen && Math.floor(Date.now() / 600) % 2) { x.fillStyle = '#f22'; x.beginPath(); x.arc(8, H - fs + 1, fs * 0.32, 0, 7); x.fill(); }
    txt(frozen ? '❚❚ FREEZE' : 'REC', 16, H - fs - 2); txt('FPS ' + ('0' + st.fps).slice(-2), W - 4, H - fs - 2, 'right');
    if (st.kind === 'vacant' && Math.floor(Date.now() / 1700) % 3 === 0) { x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(W * 0.2, H * 0.44, W * 0.6, fs * 1.6); txt('SIGNAL UNSTABLE', W / 2, H * 0.44 + fs * 0.3, 'center'); }
  }
  /* one camera bound to a canvas */
  function Camera(cv, st, opts) {
    this.cv = cv; this.st = st; this.S = {}; this.q = opts.q || 'MED'; this.frozen = false; this.last = 0; this.t0 = performance.now(); this.small = !!opts.small;
    this.buf = document.createElement('canvas');
    this.size();
  }
  Camera.prototype.size = function () {
    var lowres = this.st.kind === 'vacant' || this.q === 'LOW' || this.small;
    var W = lowres ? 160 : this.q === 'HIGH' ? 320 : 240, H = W * 3 / 4;
    this.buf.width = W; this.buf.height = H;
    this.cv.width = this.small ? 160 : 320; this.cv.height = this.cv.width * 3 / 4;
  };
  Camera.prototype.tick = function (now) {
    if (this.frozen || now - this.last < 1000 / this.st.fps) return;
    this.last = now;
    var b = this.buf, x = b.getContext('2d'), t = Math.max(0, now - this.t0) / 1000;
    SCENES[this.st.kind](x, b.width, b.height, t, this.S);
    post(x, b.width, b.height, this.st, t, this.q);
    var c = this.cv.getContext('2d'); c.imageSmoothingEnabled = false;
    c.drawImage(b, 0, 0, this.cv.width, this.cv.height);
    if (this.q === 'LOW') { c.drawImage(this.cv, 0, 0, this.cv.width / 2, this.cv.height / 2); c.drawImage(this.cv, 0, 0, this.cv.width / 2, this.cv.height / 2, 0, 0, this.cv.width, this.cv.height); }
    overlay(c, this.cv.width, this.cv.height, this.st, false);
  };
  Camera.prototype.freeze = function (on) { this.frozen = on; if (on) { var c = this.cv.getContext('2d'); overlay(c, this.cv.width, this.cv.height, this.st, true); } };

  /* fountain ambience, made live (no audio files) */
  function Ambient() { this.on = false; this.vol = 0.5; }
  Ambient.prototype.start = function () {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      var ac = this.ac = new AC(), len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0), last = 0;
      for (var i = 0; i < len; i++) { var w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5 + w * 0.12; }
      var src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      var bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.6;
      var g = this.g = ac.createGain(); g.gain.value = this.vol * 0.6;
      src.connect(bp); bp.connect(g); g.connect(ac.destination); src.start();
      var self = this; this.dripT = setInterval(function () { if (!self.ac) return; var o = ac.createOscillator(), og = ac.createGain(), t = ac.currentTime; o.frequency.setValueAtTime(1400 + Math.random() * 900, t); o.frequency.exponentialRampToValueAtTime(500, t + 0.08); og.gain.setValueAtTime(self.vol * 0.12, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.1); o.connect(og); og.connect(ac.destination); o.start(t); o.stop(t + 0.12); }, 650);
      this.on = true; if (window.ULTRA98 && ULTRA98.muted) g.gain.value = 0; return true;
    } catch (e) { return false; }
  };
  Ambient.prototype.stop = function () { clearInterval(this.dripT); if (this.ac) { try { this.ac.close(); } catch (e) {} } this.ac = null; this.on = false; };
  Ambient.prototype.setVol = function (v) { this.vol = v; if (this.g) this.g.gain.value = v * 0.6; };

  function frame(ctx, inner, wide) {
    return '<table class="fc-frame"><tr class="fc-head"><td><a href="#" data-go="fountaincam.ou" class="fc-logo">Fountain<b>Cam</b><small>NETWORK · 24 HOUR WATER FEATURE MONITORING</small></a></td></tr>' +
      '<tr><td class="fc-menu"><a href="#" data-go="fountaincam.ou">STATIONS</a><a href="#" data-go="fountaincam.ou/wall">WALL VIEW</a><a href="#" data-go="fountaincam.ou/feed/plaza-001">FEATURED FEED</a><a href="#" data-go="fountaincam.ou/about">ABOUT / FAQ</a></td></tr>' +
      '<tr><td class="fc-c">' + inner + '</td></tr></table>' +
      '<div class="fc-foot">FountainCam Network · CamServe 2.1 · ' + GN.link('directory.ou', 'Listed in the GamiNet Directory') + '<br>All FountainCam feeds are simulations generated by the network. No real cameras are connected.</div>';
  }
  function watching(st) { var m = Math.floor(Date.now() / 60000); return (m * 7 + st.code.length * 3) % 9 + (st.status === 'DEGRADED' ? 0 : 1); }

  function home(ctx) {
    var rows = ST.map(function (s) { return '<tr data-go="fountaincam.ou/feed/' + s.id + '"><td><span class="fc-led' + (s.status === 'DEGRADED' ? ' deg' : '') + '"></span>' + s.status + '</td><td><b>' + s.code + '</b></td><td>' + GN.link('fountaincam.ou/feed/' + s.id, s.name) + '</td><td>' + s.loc + '</td><td>' + s.res + '</td><td>' + watching(s) + '</td></tr>'; }).join('');
    ctx.html(frame(ctx, '<div class="fc-two"><div><h1>Station Index</h1><table class="fc-idx"><tr><th>Status</th><th>ID</th><th>Station</th><th>Location</th><th>Res.</th><th>Watching</th></tr>' + rows + '</table>' +
      '<div class="fc-dis">FountainCam stations are simulated. Feed names and locations describe the scene, not a real installation.</div>' +
      '<h2>Why watch a fountain?</h2><p>Because it is always doing something. Leave a feed open while you work. Most of our visitors do.</p>' +
      '<p>For the history of suburban shopping centers and their water features, see the ' + GN.link('route59.ou', 'Route 59 Corridor Archive') + '. For megamalls that changed shape before opening, see ' + GN.link('abandonedfutures.ou/project/meadowlands-xanadu', 'Abandoned Futures') + '.</p></div>' +
      '<div style="flex:0 1 230px"><h1>Featured Feed</h1><a href="#" data-go="fountaincam.ou/feed/plaza-001" class="fc-feat" style="display:block;border:1px solid #555;background:#000"><canvas class="fc-mini" style="display:block;width:100%;aspect-ratio:4/3;image-rendering:pixelated"></canvas></a>' +
      '<a href="#" data-go="ultrawater.ou/civic" class="fc-ad">ULTRAWATER CIVIC SYSTEMS<small>Public fountains and refill terminals. Built to be watched.</small></a>' +
      '<h2>Network Status</h2><table class="fc-info"><tr><td>Stations</td><td>' + ST.length + '</td></tr><tr><td>Live</td><td>' + ST.filter(function (s) { return s.status === 'LIVE'; }).length + '</td></tr><tr><td>Degraded</td><td>1</td></tr><tr><td>Server</td><td>CamServe 2.1</td></tr></table></div></div>'));
    ctx.root.querySelectorAll('.fc-idx tr[data-go]').forEach(function (tr) { tr.addEventListener('click', function (e) { if (!e.target.closest('a')) ctx.go(tr.dataset.go); }); });
    var cam = new Camera(ctx.root.querySelector('.fc-mini'), ST[0], { q: 'MED', small: true });
    ctx.frame(function (now) { cam.tick(now); });
    ctx.title('FountainCam Network — Station Index');
  }
  function wall(ctx) {
    ctx.html(frame(ctx, '<h1>Wall View · all stations</h1><div class="fc-wall">' + ST.map(function (s) { return '<a href="#" data-go="fountaincam.ou/feed/' + s.id + '"><canvas data-s="' + s.id + '"></canvas><span><span class="fc-led' + (s.status === 'DEGRADED' ? ' deg' : '') + '"></span>' + s.name + '</span></a>'; }).join('') + '</div>' +
      '<div class="fc-dis">Wall View runs every station at reduced resolution. Click a monitor to open its feed.</div>'));
    var cams = [].map.call(ctx.root.querySelectorAll('canvas[data-s]'), function (c) { return new Camera(c, byId(c.dataset.s), { q: 'MED', small: true }); });
    ctx.frame(function (now) { cams.forEach(function (c) { c.tick(now); }); });
    ctx.title('FountainCam Network — Wall View');
  }
  function feed(ctx, id) {
    var st = byId(id); if (!st) return ctx.notFound();
    var i = ST.indexOf(st), prev = ST[(i + ST.length - 1) % ST.length], next = ST[(i + 1) % ST.length];
    var q = ctx.store.get('quality', 'MED');
    ctx.html(frame(ctx, '<div class="fc-two"><div style="flex:2 1 340px"><div class="fc-player"><div class="fc-view"><canvas></canvas></div>' +
      '<div class="fc-ctrl"><button type="button" class="fc-play" aria-pressed="false" title="Freeze / resume">❚❚</button>' +
      '<button type="button" data-go="fountaincam.ou/feed/' + prev.id + '" title="Previous station">◀◀</button><button type="button" data-go="fountaincam.ou/feed/' + next.id + '" title="Next station">▶▶</button>' +
      '<select class="fc-q" title="Quality"><option>LOW</option><option>MED</option><option>HIGH</option></select>' +
      '<button type="button" class="fc-snap" title="Save a snapshot">SNAP</button><button type="button" class="fc-big" aria-pressed="false" title="Enlarge">ENLARGE</button>' +
      '<span class="fc-sp"></span><button type="button" class="fc-snd" aria-pressed="false" title="Ambient fountain sound">SOUND</button><input type="range" class="fc-vol" min="0" max="1" step="0.05" value="0.5" aria-label="Volume">' +
      '<span class="fc-lcd">' + st.code + ' · CONNECTED</span></div></div></div>' +
      '<div style="flex:1 1 200px"><h1>' + st.name + '</h1><table class="fc-info"><tr><td>Station ID</td><td>' + st.code + '</td></tr><tr><td>Location</td><td>' + st.loc + '</td></tr><tr><td>Resolution</td><td>' + st.res + '</td></tr><tr><td>Frame rate</td><td>' + st.fps + ' fps</td></tr><tr><td>Status</td><td><span class="fc-led' + (st.status === 'DEGRADED' ? ' deg' : '') + '"></span>' + st.status + '</td></tr><tr><td>Watching</td><td>' + watching(st) + '</td></tr></table>' +
      '<h2>Your Snapshots</h2><div class="fc-snaps"></div><p style="font-size:9px;color:#888">Snapshots are saved to your computer as PNG files. The last few are kept here for this visit.</p>' +
      (st.kind === 'court' || st.kind === 'atrium' ? '<a href="#" data-go="ultrawater.ou/synthetic-nature" class="fc-ad">ULTRAWATER SYNTHETIC NATURE<small>Watercourts, falls and fog, engineered.</small></a>' : '<a href="#" data-go="ultrawater.ou/civic" class="fc-ad">ULTRAWATER CIVIC SYSTEMS<small>Fountains built to be watched.</small></a>') +
      '<h2>Other Stations</h2>' + ST.filter(function (s) { return s !== st; }).map(function (s) { return GN.link('fountaincam.ou/feed/' + s.id, s.name); }).join('<br>') + '</div></div>'));
    var R = ctx.root, cv = R.querySelector('.fc-view canvas'), cam = new Camera(cv, st, { q: q }), qs = R.querySelector('.fc-q'), amb = new Ambient();
    qs.value = q;
    qs.addEventListener('change', function () { cam.q = qs.value; cam.size(); ctx.store.set('quality', qs.value); });
    var play = R.querySelector('.fc-play'), lcd = R.querySelector('.fc-lcd');
    play.addEventListener('click', function () { var on = play.getAttribute('aria-pressed') !== 'true'; play.setAttribute('aria-pressed', String(on)); play.textContent = on ? '▶' : '❚❚'; cam.freeze(on); lcd.textContent = st.code + (on ? ' · FROZEN' : ' · CONNECTED'); });
    var big = R.querySelector('.fc-big');
    var player = R.querySelector('.fc-player');
    function fit() { if (!R.classList.contains('fc-big')) return; var v = ctx.view; v.scrollTop = 0; var h = v.clientHeight; R.style.height = h + 'px'; player.style.height = h + 'px'; }
    function setBig(on) { R.classList.toggle('fc-big', on); big.setAttribute('aria-pressed', String(on)); big.textContent = on ? 'NORMAL' : 'ENLARGE'; if (on) fit(); else { R.style.height = ''; player.style.height = ''; } }
    big.addEventListener('click', function () { setBig(!R.classList.contains('fc-big')); });
    ctx.every(fit, 400);
    R.querySelector('.fc-snap').addEventListener('click', function () {
      var url; try { url = cv.toDataURL('image/png'); } catch (e) { return; }
      var a = document.createElement('a'); a.href = url; a.download = 'fountaincam-' + st.code.toLowerCase() + '-' + Date.now() + '.png'; document.body.appendChild(a); a.click(); a.remove();
      var im = document.createElement('img'); im.src = url; im.alt = st.name + ' snapshot'; var box = R.querySelector('.fc-snaps'); box.insertBefore(im, box.firstChild); while (box.children.length > 6) box.lastChild.remove();
      ctx.status('Snapshot saved: ' + a.download);
    });
    var snd = R.querySelector('.fc-snd'), vol = R.querySelector('.fc-vol');
    snd.addEventListener('click', function () { if (amb.on) { amb.stop(); snd.setAttribute('aria-pressed', 'false'); } else if (amb.start()) snd.setAttribute('aria-pressed', 'true'); });
    vol.addEventListener('input', function () { amb.setVol(+vol.value); });
    ctx.onLeave(function () { amb.stop(); });
    ctx.frame(function (now) { cam.tick(now); });
    ctx.title('FountainCam — ' + st.name);
  }
  function about(ctx) {
    ctx.html(frame(ctx, '<h1>About the FountainCam Network</h1>' +
      '<p>The FountainCam Network provides continuous visual monitoring of decorative and civic water features. We have operated without interruption since the network was established, with the exception of scheduled maintenance and the station at VRF-0.</p>' +
      '<h2>Frequently Asked Questions</h2>' +
      '<p><b>Why fountains?</b><br>Fountains are the only part of a commercial building that is always moving. A fountain in an empty concourse at 4 a.m. is doing exactly what it does at noon.</p>' +
      '<p><b>Are these real cameras?</b><br>No. Every FountainCam feed is generated by the network. Station names describe the scene, not a real place, and no live or private camera is ever shown.</p>' +
      '<p><b>Why is VRF-0 always degraded?</b><br>The concourse it watches has very little power. We have been asked not to discuss it further.</p>' +
      '<p><b>Can I save a picture?</b><br>Yes. Press SNAP on any feed to save the current frame as a PNG.</p>' +
      '<p><b>Is there sound?</b><br>Press SOUND on a feed for an ambient fountain track generated in your browser. It never plays unless you ask.</p>' +
      '<p><b>What music goes with this?</b><br>Mallsoft. Muzak. Anything that sounds like an escalator.</p>'));
    ctx.title('About the FountainCam Network');
  }

  GN.site('fountaincam.ou', {
    name: 'fountaincam', title: 'FountainCam Network', css: CSS,
    icon: function (c) { c.fillStyle = '#111'; c.fillRect(0, 0, 16, 16); c.fillStyle = '#2fd0e0'; c.fillRect(2, 5, 9, 7); c.beginPath(); c.moveTo(11, 7); c.lineTo(15, 5); c.lineTo(15, 12); c.lineTo(11, 10); c.fill(); c.fillStyle = '#f22'; c.fillRect(3, 6, 2, 2); },
    render: function (ctx) {
      var p = ctx.path;
      if (p === '/') return home(ctx);
      if (p === '/wall') return wall(ctx);
      if (p.indexOf('/feed/') === 0) return feed(ctx, p.slice(6));
      if (p === '/about') return about(ctx);
      ctx.notFound();
    }
  });
})();
