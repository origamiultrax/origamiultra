/* ============================================================
   EXIT SIMULATIONS — EXITSIM.EXE  (Funtazia · ULTRA 98)
   Eight simulated worlds, one per song on SUN'S GETTING LOW.
   A wizard follows you. Your own images open sealed wings.
   Original procedural art; three.js r128 is loaded on demand.
   ============================================================ */
(function () {
  'use strict';
  var U = window.ULTRA98; if (!U) return;

  var THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  var ALBUM = 'audio/albums/suns-getting-low-og/';
  var CELL = 4, WALL_H = 3.2, T = 0.26, EYE = 1.55, RAD = 0.42;
  var THREE;

  /* ---------------------------------------------------------------- levels */
  var LEVELS = [
    { title: 'ENTRANCE', file: '01-entrance.mp3', theme: 'meadow', w: 6, h: 6, wings: 1, rooms: 1, loops: 0.06, seed: 1101,
      lines: ['welcome in. the sun is getting low.', 'every simulation has an exit.', 'see an empty frame? give it something to remember.', 'the walls were painted by someone who missed outside.'] },
    { title: 'OPERATING HOURS', file: '02-operating-hours.mp3', theme: 'museum', w: 7, h: 7, wings: 1, rooms: 2, loops: 0.08, seed: 2207,
      lines: ['we close at dusk. we always close at dusk.', 'the exhibits are looking back at you.', 'please do not touch the artifacts. they bruise.', 'last admission was a long time ago.'] },
    { title: 'EMPLOYEES ONLY', file: '03-employees-only.mp3', theme: 'corridor', w: 8, h: 8, wings: 2, rooms: 1, loops: 0.07, seed: 3313,
      lines: ['you’re not supposed to be back here.', 'badge, please. ...kidding.', 'the laundry room hums in a minor key.', 'every door says something it doesn’t mean.'] },
    { title: 'TRUST YOUR TELEVISION', file: '04-trust-your-television.mp3', theme: 'atrium', w: 8, h: 8, wings: 2, rooms: 3, loops: 0.08, seed: 4421,
      lines: ['the screens know your face.', 'trust your television.', 'channel two is the sky. channel three is you.', 'the stars up there are on a loop.'] },
    { title: 'CONTINENTAL BREAKFAST', file: '05-continental-breakfast.mp3', theme: 'pavilion', w: 9, h: 9, wings: 2, rooms: 2, loops: 0.08, seed: 5531,
      lines: ['breakfast is served until it isn’t.', 'the water remembers the cliffs.', 'take a bowl. they’re all gold anyway.', 'this view comes with the room.'] },
    { title: 'REFRESHMENTS', file: '06-refreshments.mp3', theme: 'terrace', w: 9, h: 9, wings: 2, rooms: 3, loops: 0.09, seed: 6637,
      lines: ['drink something. you’ve been walking for years.', 'the marble is purple because it’s tired.', 'the sea is just a very large refreshment.', 'flowers here bloom on a timer.'] },
    { title: 'TONIGHT’S SCHEDULE', file: '07-tonights-schedule.mp3', theme: 'gallery', w: 10, h: 10, wings: 2, rooms: 3, loops: 0.08, seed: 7741,
      lines: ['tonight: you, a gallery, and an exit.', 'the paintings change when you’re not looking.', 'the fountain is the only one awake.', 'the staircase goes up to the next simulation.'] },
    { title: 'EXIT', file: '08-exit.mp3', theme: 'sunset', w: 10, h: 10, wings: 2, rooms: 2, loops: 0.07, seed: 8849,
      lines: ['this is the last one.', 'the sun’s getting low.', 'you remember all of this, right?', 'when you find the exit, i’ll show you the wall.'] }
  ];
  var ARCHIVE = { title: 'THE ARCHIVE', file: '01-entrance.mp3', theme: 'archive', w: 5, h: 4, wings: 0, rooms: 0, loops: 0, seed: 9901, archive: true,
    lines: ['everything you gave the simulation is kept here.', 'this is where the images go.', 'you can stay as long as you like.'] };
  var TOTAL_SHARDS = LEVELS.reduce(function (a, l) { return a + l.wings; }, 0);
  var HINT_LINES = ['this way.', 'follow me.', 'it’s not far.', 'over here.'];
  var FRAME_LINES = ['that frame is hungry.', 'it wants a picture of yours.', 'go on. feed it.'];
  var HUNG_LINES = ['oh. that’s a nice one.', 'the wall remembers that now.', 'look, a door.'];
  var SHARD_LINES = ['a sun shard. keep it warm.', 'that’s a piece of the sunset.', 'shiny.'];

  var store = U.load('exitsim', { unlocked: 1, level: 1, cleared: {}, shards: {}, hung: {}, archive: false,
    opts: { music: true, chunky: true, invert: false, talk: true } });
  function persist() { U.save('exitsim', store); }
  function shardCount() { return Object.keys(store.shards).filter(function (k) { return store.shards[k]; }).length; }

  /* ---------------------------------------------------------------- your images (IndexedDB, local only) */
  var DB = (function () {
    var mem = {}, dbp = null;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise(function (res) {
        try {
          var rq = indexedDB.open('exitsim', 1);
          rq.onupgradeneeded = function () { rq.result.createObjectStore('img'); };
          rq.onsuccess = function () { res(rq.result); };
          rq.onerror = function () { res(null); };
        } catch (e) { res(null); }
      });
      return dbp;
    }
    function tx(mode, fn) {
      return open().then(function (db) {
        if (!db) return fn(null);
        return new Promise(function (res) {
          try { var t = db.transaction('img', mode), st = t.objectStore('img'); fn(st, res); t.onerror = function () { res(null); }; }
          catch (e) { res(fn(null)); }
        });
      });
    }
    return {
      get: function (k) { return tx('readonly', function (st, res) { if (!st) return mem[k] || null; var r = st.get(k); r.onsuccess = function () { res(r.result || mem[k] || null); }; }); },
      set: function (k, v) { mem[k] = v; return tx('readwrite', function (st, res) { if (!st) return true; st.put(v, k).onsuccess = function () { res(true); }; }); },
      all: function () {
        return tx('readonly', function (st, res) {
          if (!st) return Object.keys(mem).map(function (k) { return { k: k, v: mem[k] }; });
          var out = [], r = st.openCursor();
          r.onsuccess = function () { var c = r.result; if (c) { out.push({ k: c.key, v: c.value }); c.continue(); } else res(out); };
        });
      },
      clear: function () { mem = {}; return tx('readwrite', function (st, res) { if (!st) return true; st.clear().onsuccess = function () { res(true); }; }); }
    };
  })();

  /* ---------------------------------------------------------------- helpers */
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function hex(c) { return '#' + ('000000' + (c >>> 0).toString(16)).slice(-6); }
  function mix(c1, c2, t) {
    var a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16);
    var r = Math.round(lerp(a >> 16, b >> 16, t)), g = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, t)), bl = Math.round(lerp(a & 255, b & 255, t));
    return hex((r << 16) | (g << 8) | bl);
  }
  function rgb(c) { var a = parseInt(c.slice(1), 16); return [a >> 16, (a >> 8) & 255, a & 255]; }
  function canvas(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  /* tileable value noise */
  function noise2(seed, S) {
    var r = rng(seed), g = new Float32Array(S * S); for (var i = 0; i < g.length; i++) g[i] = r();
    function v(a, b) { return g[(((b % S) + S) % S) * S + (((a % S) + S) % S)]; }
    return function (x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      var u = xf * xf * (3 - 2 * xf), w = yf * yf * (3 - 2 * yf);
      return lerp(lerp(v(xi, yi), v(xi + 1, yi), u), lerp(v(xi, yi + 1), v(xi + 1, yi + 1), u), w);
    };
  }
  function fbm(n, x, y, oct) { var s = 0, a = 0.5, f = 1, t = 0; for (var o = 0; o < oct; o++) { s += n(x * f, y * f) * a; t += a; a *= 0.5; f *= 2; } return s / t; }
  /* per-pixel painter: fn(x,y) -> [r,g,b] */
  function pixels(w, h, fn) {
    var c = canvas(w, h), x = c.getContext('2d'), id = x.createImageData(w, h), d = id.data, p = 0;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) { var o = fn(i, j); d[p++] = o[0]; d[p++] = o[1]; d[p++] = o[2]; d[p++] = 255; }
    x.putImageData(id, 0, 0); return c;
  }
  function grain(c, amt, seed) {
    var x = c.getContext('2d'), id = x.getImageData(0, 0, c.width, c.height), d = id.data, r = rng(seed || 7);
    for (var i = 0; i < d.length; i += 4) { var v = (r() - 0.5) * amt; d[i] += v; d[i + 1] += v; d[i + 2] += v; }
    x.putImageData(id, 0, 0); return c;
  }
  /* draw a shape at x and its horizontal wrap copies so textures tile */
  function wrapX(W, x, fn) { fn(x); fn(x - W); fn(x + W); }

  /* ---------------------------------------------------------------- procedural textures */
  var TX = {};
  function tex(key, make, rep) {
    if (TX[key]) return TX[key];
    var c = make(), t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
    if (rep) t.repeat.set(rep[0], rep[1]);
    t.encoding = THREE.sRGBEncoding;
    return (TX[key] = t);
  }
  function disposeTextures() { Object.keys(TX).forEach(function (k) { TX[k].dispose(); }); TX = {}; }

  var P = {};   /* painters, each returns a canvas */
  P.checker = function (a, b, n, sz, seed) {
    var c = canvas(sz, sz), x = c.getContext('2d'), s = sz / n;
    for (var j = 0; j < n; j++) for (var i = 0; i < n; i++) { x.fillStyle = (i + j) % 2 ? b : a; x.fillRect(i * s, j * s, s, s); }
    x.strokeStyle = 'rgba(0,0,0,.18)'; x.lineWidth = 1;
    for (var k = 0; k <= n; k++) { x.beginPath(); x.moveTo(k * s, 0); x.lineTo(k * s, sz); x.moveTo(0, k * s); x.lineTo(sz, k * s); x.stroke(); }
    return grain(c, 14, seed);
  };
  P.marble = function (base, vein, crack, seed, sz) {
    sz = sz || 512;
    var n1 = noise2(seed, 8), n2 = noise2(seed + 9, 6), A = rgb(base), B = rgb(vein), C = rgb(crack || '#000000');
    return pixels(sz, sz, function (i, j) {
      var u = i / sz * 8, v = j / sz * 8;
      var t = fbm(n1, u, v, 4), m = 0.5 + 0.5 * Math.sin((u + v) * 0.785 * 2 + t * 9);
      var k = fbm(n2, u * 0.75, v * 0.75, 3) * 7, f = Math.abs((k - Math.floor(k)) - 0.5);
      var r = lerp(A[0], B[0], m * m), g = lerp(A[1], B[1], m * m), b = lerp(A[2], B[2], m * m);
      if (crack && f < 0.05) { var s = 1 - f / 0.05; r = lerp(r, C[0], s); g = lerp(g, C[1], s); b = lerp(b, C[2], s); }
      return [r, g, b];
    });
  };
  P.stucco = function (base, seed, amt) {
    var n = noise2(seed, 16), A = rgb(base), am = amt || 22;
    return pixels(256, 256, function (i, j) { var t = fbm(n, i / 16, j / 16, 4) - 0.5; return [A[0] + t * am, A[1] + t * am, A[2] + t * am * 0.9]; });
  };
  P.carpet = function (base, seed) {
    var n = noise2(seed, 32), A = rgb(base), r = rng(seed);
    return pixels(256, 256, function (i, j) { var t = fbm(n, i / 8, j / 8, 3) - 0.5, s = (r() - 0.5) * 26; return [A[0] + t * 40 + s, A[1] + t * 30 + s, A[2] + t * 22 + s]; });
  };
  P.grass = function (seed) {
    var n = noise2(seed, 16), m = noise2(seed + 3, 8), r = rng(seed);
    return pixels(512, 512, function (i, j) {
      var t = fbm(n, i / 32, j / 32, 4), d = fbm(m, i / 64, j / 64, 3), s = (r() - 0.5) * 34;
      var gr = [78 + t * 60 + s, 118 + t * 70 + s, 52 + t * 30 + s * 0.5];
      if (d > 0.64) { var k = clamp((d - 0.64) * 6, 0, 0.85); gr = [lerp(gr[0], 132 + s, k), lerp(gr[1], 112 + s, k), lerp(gr[2], 78 + s, k)]; }
      return gr;
    });
  };
  P.grid = function (bg, line, seed) {
    var c = canvas(256, 256), x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 256, 256); g.addColorStop(0, bg); g.addColorStop(1, mix(bg, '#000000', 0.25));
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    x.fillStyle = line; x.fillRect(0, 0, 256, 5); x.fillRect(0, 0, 5, 256);
    return grain(c, 10, seed);
  };
  P.water = function (seed) {
    var c = canvas(512, 512), x = c.getContext('2d'), r = rng(seed);
    var g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#3c7fd0'); g.addColorStop(1, '#2a5fae');
    x.fillStyle = g; x.fillRect(0, 0, 512, 512);
    for (var i = 0; i < 900; i++) { x.fillStyle = 'rgba(' + (200 + r() * 55 | 0) + ',' + (230 + r() * 25 | 0) + ',255,' + (0.15 + r() * 0.45).toFixed(2) + ')'; x.fillRect(r() * 512, r() * 512, 4 + r() * 22, 1 + r() * 1.5); }
    return c;
  };
  P.cliff = function (seed) {
    var n = noise2(seed, 32), r = rng(seed);
    var cols = []; for (var i = 0; i < 512; i++) cols.push(r());
    return pixels(512, 256, function (i, j) {
      var t = fbm(n, i / 6, j / 40, 3), stripe = cols[i] * 0.35 + t * 0.65, v = 150 + stripe * 105;
      if (j > 200) { var k = (j - 200) / 56; return [lerp(v, 70, k), lerp(v, 120, k), lerp(v, 60, k)]; }
      return [v, v * 0.98, v * 0.95];
    });
  };
  P.stars = function (seed, top, bottom) {
    var c = canvas(512, 512), x = c.getContext('2d'), r = rng(seed);
    var g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, top || '#0a0c24'); g.addColorStop(1, bottom || '#1c2150');
    x.fillStyle = g; x.fillRect(0, 0, 512, 512);
    for (var i = 0; i < 700; i++) { var s = r() < 0.92 ? 1 : 2 + r() * 1.5; x.fillStyle = 'rgba(255,255,255,' + (0.4 + r() * 0.6).toFixed(2) + ')'; x.fillRect(r() * 512, r() * 512, s, s); }
    return c;
  };
  /* sky with clouds, tileable */
  P.clouds = function (seed, sky, sky2, cloud, shade, count, sz) {
    sz = sz || 512;
    var q = sz / 4, s = canvas(q, q), x = s.getContext('2d'), r = rng(seed);   /* paint small, scale up = soft painted clouds */
    var g = x.createLinearGradient(0, 0, q, q); g.addColorStop(0, sky); g.addColorStop(1, sky2); x.fillStyle = g; x.fillRect(0, 0, q, q);
    for (var i = 0; i < (count || 26); i++) {
      var cx = r() * q, cy = r() * q, w = 6 + r() * 20, n = 5 + Math.floor(r() * 6);
      for (var k = 0; k < n; k++) {
        var ox = (r() - 0.5) * w * 1.8, oy = (r() - 0.5) * w * 0.35, rr = w * (0.3 + r() * 0.35);
        [[0, 0], [q, 0], [-q, 0], [0, q], [0, -q]].forEach(function (o) {
          var X = cx + ox + o[0], Y = cy + oy + o[1];
          var gg = x.createRadialGradient(X - rr * 0.2, Y - rr * 0.35, rr * 0.05, X, Y, rr);
          gg.addColorStop(0, cloud); gg.addColorStop(0.55, hexA(mix(cloud, shade, 0.4), 0.85)); gg.addColorStop(1, hexA(shade, 0));
          x.fillStyle = gg; x.beginPath(); x.ellipse(X, Y, rr * 1.4, rr * 0.8, 0, 0, Math.PI * 2); x.fill();
        });
      }
    }
    var c = canvas(sz, sz), y = c.getContext('2d');
    y.imageSmoothingEnabled = true; y.imageSmoothingQuality = 'high';
    /* draw 3x3 so the soft edges wrap */
    for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) y.drawImage(s, a * sz, b * sz, sz, sz);
    return grain(c, 6, seed);
  };
  /* tileable painted landscape panorama for walls (W x H), style: day or sunset */
  P.landscape = function (seed, mode) {
    var W = 1024, H = 384, c = canvas(W, H), x = c.getContext('2d'), r = rng(seed);
    var sunset = mode === 'sunset';
    var horizon = H * 0.56;
    var g = x.createLinearGradient(0, 0, 0, horizon);
    if (sunset) { g.addColorStop(0, '#3b2a6e'); g.addColorStop(0.45, '#c25a7a'); g.addColorStop(0.8, '#ff9a4a'); g.addColorStop(1, '#ffd27a'); }
    else { g.addColorStop(0, '#5f97d6'); g.addColorStop(0.7, '#a9c9e8'); g.addColorStop(1, '#dfe9ef'); }
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    if (sunset) {   /* the sun, getting low */
      var sx = W * 0.35, sy = horizon - 18, sg = x.createRadialGradient(sx, sy, 4, sx, sy, 160);
      sg.addColorStop(0, 'rgba(255,250,210,1)'); sg.addColorStop(0.12, 'rgba(255,220,130,.95)'); sg.addColorStop(0.4, 'rgba(255,140,80,.35)'); sg.addColorStop(1, 'rgba(255,120,80,0)');
      wrapX(W, sx, function (X) { x.fillStyle = sg; x.save(); x.translate(X - sx, 0); x.fillRect(sx - 170, sy - 170, 340, 340); x.restore(); });
      x.fillStyle = '#fff6d8'; wrapX(W, sx, function (X) { x.beginPath(); x.arc(X, sy, 26, 0, Math.PI * 2); x.fill(); });
    }
    /* clouds */
    for (var i = 0; i < 16; i++) {
      var cx = r() * W, cy = 20 + r() * horizon * 0.6, w = 40 + r() * 90;
      for (var k = 0; k < 6; k++) {
        var ox = (r() - 0.5) * w * 1.5, oy = (r() - 0.5) * w * 0.3, rr = w * (0.22 + r() * 0.25);
        wrapX(W, cx + ox, function (X) {
          var gg = x.createRadialGradient(X, cy + oy - rr * 0.3, rr * 0.1, X, cy + oy, rr);
          gg.addColorStop(0, sunset ? 'rgba(255,214,190,.95)' : 'rgba(255,255,255,.95)'); gg.addColorStop(0.7, sunset ? 'rgba(220,130,150,.5)' : 'rgba(225,232,240,.6)'); gg.addColorStop(1, 'rgba(255,255,255,0)');
          x.fillStyle = gg; x.beginPath(); x.arc(X, cy + oy, rr, 0, Math.PI * 2); x.fill();
        });
      }
    }
    /* far mountains */
    function ridge(baseY, amp, col, rough, peakAt) {
      x.fillStyle = col; x.beginPath(); x.moveTo(0, H);
      var n = noise2(Math.floor(r() * 1e6), 16);
      for (var X = 0; X <= W; X += 4) {
        var t = fbm(n, X / W * 16, 0.5, 4), y = baseY - t * amp;
        if (peakAt !== undefined) { var d = Math.min(Math.abs(X - peakAt), W - Math.abs(X - peakAt)); y -= Math.max(0, 1 - d / 90) * amp * 1.4; }
        x.lineTo(X, y + (rough ? (r() - 0.5) * rough : 0));
      }
      x.lineTo(W, H); x.closePath(); x.fill();
    }
    ridge(horizon + 6, 110, sunset ? '#7a5a8e' : '#8aa1b9', 3, W * 0.62);
    ridge(horizon + 18, 60, sunset ? '#6a4d72' : '#7f9a8a', 2);
    /* rolling hills */
    var hills = sunset ? ['#8a6a3a', '#7a5c30', '#6b4f28'] : ['#9bb460', '#7ea24c', '#6a913f'];
    for (var hI = 0; hI < 3; hI++) {
      var n2 = noise2(Math.floor(r() * 1e6), 8), base = horizon + 26 + hI * 34;
      x.fillStyle = hills[hI]; x.beginPath(); x.moveTo(0, H);
      for (var X2 = 0; X2 <= W; X2 += 4) x.lineTo(X2, base - fbm(n2, X2 / W * 8, 0.3, 3) * 40);
      x.lineTo(W, H); x.closePath(); x.fill();
    }
    /* trees: trunk + clustered canopy, lit from the sun side */
    function tree(tx, ty, s) {
      wrapX(W, tx, function (X) {
        x.strokeStyle = sunset ? '#3a2618' : '#4a3a24'; x.lineWidth = 3 * s; x.beginPath(); x.moveTo(X, ty); x.lineTo(X + (r() - 0.5) * 4, ty - 46 * s); x.stroke();
        for (var b = 0; b < 9; b++) {
          var bx = X + (r() - 0.5) * 34 * s, by = ty - 46 * s - r() * 40 * s, br = (9 + r() * 10) * s;
          var gg = x.createRadialGradient(bx - br * 0.3, by - br * 0.4, br * 0.1, bx, by, br);
          if (sunset) { gg.addColorStop(0, '#c9883a'); gg.addColorStop(1, '#3d3a1c'); } else { gg.addColorStop(0, '#9ccc5c'); gg.addColorStop(1, '#2f5a22'); }
          x.fillStyle = gg; x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.fill();
        }
      });
    }
    for (var t = 0; t < 7; t++) tree(r() * W, horizon + 70 + r() * 40, 0.7 + r() * 0.4);
    for (var t2 = 0; t2 < 3; t2++) tree(r() * W, H - 30 - r() * 20, 1.5 + r() * 0.5);
    /* grass strokes */
    for (var s = 0; s < 1600; s++) {
      var gx = r() * W, gy = horizon + 60 + r() * (H - horizon - 60);
      x.strokeStyle = sunset ? 'rgba(' + (120 + r() * 80 | 0) + ',' + (80 + r() * 50 | 0) + ',40,.55)' : 'rgba(' + (60 + r() * 70 | 0) + ',' + (110 + r() * 70 | 0) + ',40,.5)';
      x.lineWidth = 1; x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + (r() - 0.5) * 4, gy - 4 - r() * 8); x.stroke();
    }
    /* soft contact shadow at the base of the wall */
    var sh = x.createLinearGradient(0, H - 40, 0, H); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.28)');
    x.fillStyle = sh; x.fillRect(0, H - 40, W, 40);
    return grain(c, 10, seed);
  };
  /* plain wall with soft gradient + base shadow */
  P.wall = function (top, bottom, seed, amt) {
    var s = P.stucco(top, seed, amt || 14), c = canvas(256, 256), x = c.getContext('2d');
    x.drawImage(s, 0, 0);
    var g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.75, hexA(bottom, 0.25)); g.addColorStop(1, hexA(bottom, 0.55));
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    return c;
  };
  function hexA(c, a) { var v = rgb(c); return 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ',' + a + ')'; }
  /* a "silicon dreams" painting: gradient world + glossy object */
  P.painting = function (seed) {
    var r = rng(seed), c = canvas(256, 192), x = c.getContext('2d'), kind = Math.floor(r() * 5);
    var skies = [['#1c2b6e', '#7ab8ff'], ['#2a0f3e', '#ff7ab0'], ['#06302c', '#6af2d8'], ['#3b1a08', '#ffb347'], ['#0b0b1a', '#5a6bff']];
    var s = skies[Math.floor(r() * skies.length)];
    var g = x.createLinearGradient(0, 0, 0, 192); g.addColorStop(0, s[0]); g.addColorStop(1, s[1]); x.fillStyle = g; x.fillRect(0, 0, 256, 192);
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, 128, 256, 64);
    for (var i = 0; i < 9; i++) { x.strokeStyle = 'rgba(255,255,255,' + (0.2 + i * 0.05) + ')'; x.beginPath(); x.moveTo(0, 128 + i * i * 0.9); x.lineTo(256, 128 + i * i * 0.9); x.stroke(); }
    var cx = 70 + r() * 116, cy = 70 + r() * 30;
    if (kind === 0) { var sg = x.createRadialGradient(cx - 14, cy - 16, 4, cx, cy, 44); sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.3, '#8affc8'); sg.addColorStop(1, '#0a5a3a'); x.fillStyle = sg; x.beginPath(); x.arc(cx, cy, 44, 0, Math.PI * 2); x.fill(); }
    else if (kind === 1) { x.fillStyle = 'rgba(255,255,255,.85)'; x.beginPath(); x.moveTo(cx, cy - 50); x.lineTo(cx + 46, cy + 40); x.lineTo(cx - 46, cy + 40); x.closePath(); x.fill(); x.fillStyle = 'rgba(120,160,255,.6)'; x.beginPath(); x.moveTo(cx, cy - 30); x.lineTo(cx + 28, cy + 30); x.lineTo(cx - 28, cy + 30); x.closePath(); x.fill(); }
    else if (kind === 2) { x.fillStyle = '#e8f6ff'; x.beginPath(); x.moveTo(cx, cy - 46); x.lineTo(cx + 34, cy - 8); x.lineTo(cx, cy + 46); x.lineTo(cx - 34, cy - 8); x.closePath(); x.fill(); x.strokeStyle = '#7ab0ff'; x.lineWidth = 2; x.stroke(); x.beginPath(); x.moveTo(cx - 34, cy - 8); x.lineTo(cx + 34, cy - 8); x.moveTo(cx, cy - 46); x.lineTo(cx, cy + 46); x.stroke(); }
    else if (kind === 3) { for (var k = 0; k < 4; k++) { var bg = x.createRadialGradient(cx - 40 + k * 26, cy + 10 - k * 8, 2, cx - 40 + k * 26, cy + 14 - k * 8, 18); bg.addColorStop(0, '#fff'); bg.addColorStop(1, ['#ff5a7a', '#ffd700', '#7fd4ff', '#b38aff'][k]); x.fillStyle = bg; x.beginPath(); x.arc(cx - 40 + k * 26, cy + 14 - k * 8, 18, 0, Math.PI * 2); x.fill(); } }
    else { x.strokeStyle = '#ffffff'; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy + 30, 40, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.fillStyle = '#9fd8ff'; x.beginPath(); x.ellipse(cx + 18, cy - 4, 22, 9, -0.5, 0, Math.PI * 2); x.fill(); }
    return grain(c, 12, seed);
  };
  P.sign = function (text, bg, fg, w, h, font) {
    var c = canvas(w || 512, h || 128), x = c.getContext('2d'); w = c.width; h = c.height;
    var g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, bg); g.addColorStop(1, mix(bg, '#000000', 0.35)); x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 4; x.strokeRect(6, 6, w - 12, h - 12);
    x.font = (font || ('bold ' + Math.round(h * 0.5) + 'px Georgia, "Times New Roman", serif')); x.textAlign = 'center'; x.textBaseline = 'middle';
    var tg = x.createLinearGradient(0, h * 0.25, 0, h * 0.75); tg.addColorStop(0, '#fff3c0'); tg.addColorStop(0.5, fg); tg.addColorStop(1, mix(fg, '#000000', 0.35));
    x.fillStyle = 'rgba(0,0,0,.5)'; x.fillText(text, w / 2 + 3, h / 2 + 4); x.fillStyle = tg; x.fillText(text, w / 2, h / 2 + 1);
    return c;
  };
  P.veil = function () {
    var c = canvas(256, 256), x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 256, 256); g.addColorStop(0, 'rgba(180,220,255,.55)'); g.addColorStop(0.5, 'rgba(255,190,255,.45)'); g.addColorStop(1, 'rgba(190,255,230,.55)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 2;
    for (var i = -256; i < 512; i += 18) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 256, 256); x.stroke(); }
    return c;
  };
  P.doorGlow = function () {   /* light pouring through the exit */
    var c = canvas(128, 192), x = c.getContext('2d');
    var g = x.createRadialGradient(64, 110, 6, 64, 110, 130); g.addColorStop(0, '#ffffff'); g.addColorStop(0.35, '#fff3c8'); g.addColorStop(0.75, '#ffc66a'); g.addColorStop(1, '#ff8a3a');
    x.fillStyle = g; x.fillRect(0, 0, 128, 192);
    for (var i = 0; i < 12; i++) { x.fillStyle = 'rgba(255,255,255,' + (0.05 + (i % 3) * 0.04) + ')'; x.fillRect(0, i * 16, 128, 6); }
    return c;
  };
  P.emptyCanvas = function () {
    var c = canvas(256, 192), x = c.getContext('2d');
    var g = x.createRadialGradient(128, 96, 10, 128, 96, 150); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#cfe4ff'); x.fillStyle = g; x.fillRect(0, 0, 256, 192);
    x.strokeStyle = 'rgba(80,110,200,.5)'; x.setLineDash([10, 8]); x.lineWidth = 4; x.strokeRect(18, 18, 220, 156); x.setLineDash([]);
    x.fillStyle = '#4a5aa8'; x.font = 'bold 22px Georgia, serif'; x.textAlign = 'center'; x.fillText('YOUR IMAGE', 128, 92); x.font = '15px Georgia, serif'; x.fillText('belongs here', 128, 118);
    return c;
  };
  P.sunset = function () {   /* sky dome for open-air worlds */
    var c = canvas(1024, 512), x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#241a52'); g.addColorStop(0.45, '#9a4a86'); g.addColorStop(0.62, '#ff8a52'); g.addColorStop(0.72, '#ffd086'); g.addColorStop(1, '#ffe6b0');
    x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
    return c;
  };

  /* ---------------------------------------------------------------- the wizard */
  function drawWizard(c, pose) {
    var INK = '#2b2229', SUIT = '#dcbde8', SUIT_SH = '#c4a0d6', STAR = '#63cfc2', SKIN = '#f2e35e', SKIN_SH = '#dcc94a', HAIR = '#e8692b', BOOT = '#4d3b36', BOOT_HI = '#6a544d';
    c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
    function shape(fill, lw, path) { c.beginPath(); path(); c.fillStyle = fill; c.fill(); c.lineWidth = lw || 5; c.strokeStyle = INK; c.stroke(); }
    function star(x, y, r, rot) {
      c.beginPath();
      for (var i = 0; i < 10; i++) { var a = rot + i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
      c.closePath(); c.fillStyle = STAR; c.fill(); c.lineWidth = 2.2; c.strokeStyle = INK; c.stroke();
    }
    var walk = pose === 'walk1' ? 1 : pose === 'walk2' ? -1 : 0;
    c.translate(0, pose === 'idle2' ? 3 : 0);
    var bl = walk * 12;
    shape(SUIT_SH, 5, function () { c.moveTo(138, 262); c.quadraticCurveTo(150 - bl * 0.3, 300, 150 - bl, 330); c.lineTo(176 - bl, 330); c.quadraticCurveTo(178, 296, 170, 258); c.closePath(); });
    shape(BOOT, 5, function () { c.moveTo(148 - bl, 326); c.lineTo(180 - bl, 326); c.quadraticCurveTo(186 - bl, 350, 182 - bl, 362); c.lineTo(128 - bl, 364); c.quadraticCurveTo(118 - bl, 352, 134 - bl, 344); c.quadraticCurveTo(146 - bl, 340, 148 - bl, 326); c.closePath(); });
    shape(SUIT_SH, 5, function () { c.moveTo(160, 172); c.quadraticCurveTo(186, 205, 178 + walk * 6, 236); c.lineTo(160 + walk * 6, 236); c.quadraticCurveTo(160, 210, 146, 190); c.closePath(); });
    shape(SKIN_SH, 4, function () { c.ellipse(170 + walk * 6, 243, 12, 10, 0.3, 0, Math.PI * 2); });
    shape(SUIT, 5.5, function () { c.moveTo(118, 150); c.bezierCurveTo(92, 168, 88, 230, 104, 268); c.bezierCurveTo(118, 290, 168, 292, 182, 266); c.bezierCurveTo(194, 236, 186, 176, 160, 150); c.closePath(); });
    star(130, 196, 15, 0.2); star(166, 236, 13, -0.3); star(112, 252, 11, 0.5); star(160, 188, 8, 0.1);
    var fl = -walk * 12;
    shape(SUIT, 5, function () { c.moveTo(108, 262); c.quadraticCurveTo(104 - fl * 0.3, 300, 106 - fl, 330); c.lineTo(134 - fl, 330); c.quadraticCurveTo(138, 296, 142, 266); c.closePath(); });
    star(122 - fl * 0.6, 302, 9, 0.4);
    shape(BOOT, 5, function () { c.moveTo(104 - fl, 326); c.lineTo(138 - fl, 326); c.quadraticCurveTo(144 - fl, 352, 140 - fl, 366); c.lineTo(80 - fl, 368); c.quadraticCurveTo(68 - fl, 356, 86 - fl, 346); c.quadraticCurveTo(102 - fl, 342, 104 - fl, 326); c.closePath(); });
    c.beginPath(); c.moveTo(92 - fl, 352); c.quadraticCurveTo(108 - fl, 348, 120 - fl, 350); c.lineWidth = 3; c.strokeStyle = BOOT_HI; c.stroke();
    /* face in profile */
    shape(SKIN, 5, function () { c.moveTo(126, 92); c.bezierCurveTo(98, 92, 84, 110, 86, 126); c.lineTo(76, 136); c.quadraticCurveTo(74, 142, 84, 144); c.bezierCurveTo(86, 156, 98, 166, 118, 166); c.lineTo(140, 150); c.closePath(); });
    c.beginPath(); c.ellipse(104, 124, 7, 5, 0, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 2.5; c.strokeStyle = INK; c.stroke();
    c.beginPath(); c.arc(101, 125, 2.6, 0, Math.PI * 2); c.fillStyle = INK; c.fill();
    c.beginPath(); c.moveTo(96, 121); c.quadraticCurveTo(104, 116, 112, 121); c.lineWidth = 3; c.stroke();
    c.beginPath(); c.moveTo(94, 152); c.quadraticCurveTo(100, 154, 106, 151); c.lineWidth = 2.5; c.stroke();
    /* orange hair: fringe + sideburn peeking out of the hood */
    shape(HAIR, 4, function () { c.moveTo(130, 92); c.quadraticCurveTo(106, 90, 98, 108); c.quadraticCurveTo(110, 102, 114, 110); c.quadraticCurveTo(118, 100, 124, 106); c.quadraticCurveTo(126, 124, 120, 140); c.quadraticCurveTo(132, 132, 134, 112); c.closePath(); });
    /* hood + pointy hat */
    shape(SUIT, 5.5, function () { c.moveTo(122, 98); c.bezierCurveTo(122, 70, 134, 52, 150, 40); c.bezierCurveTo(160, 30, 170, 14, 172, 4); c.bezierCurveTo(178, 30, 182, 58, 178, 80); c.bezierCurveTo(186, 104, 182, 140, 160, 158); c.bezierCurveTo(146, 168, 128, 166, 136, 150); c.bezierCurveTo(146, 134, 142, 112, 122, 98); c.closePath(); });
    star(160, 72, 13, -0.2); star(164, 122, 11, 0.3); star(170, 30, 7, 0.1);
    if (pose === 'point') {
      shape(SUIT, 5, function () { c.moveTo(124, 170); c.quadraticCurveTo(90, 176, 52, 172); c.lineTo(54, 192); c.quadraticCurveTo(96, 196, 132, 194); c.closePath(); });
      star(98, 183, 8, 0.2);
      shape(SKIN, 4, function () { c.ellipse(44, 182, 13, 11, 0, 0, Math.PI * 2); });
      shape(SKIN, 3.5, function () { c.moveTo(36, 176); c.lineTo(18, 172); c.lineTo(20, 182); c.lineTo(36, 186); c.closePath(); });
    } else {
      var sw = walk * -8;
      shape(SUIT, 5, function () { c.moveTo(122, 168); c.quadraticCurveTo(100, 196, 98 + sw, 232); c.lineTo(120 + sw, 236); c.quadraticCurveTo(124, 206, 140, 186); c.closePath(); });
      star(116 + sw * 0.5, 208, 7, 0.6);
      shape(SKIN, 4, function () { c.ellipse(108 + sw, 244, 13, 11, -0.2, 0, Math.PI * 2); });
    }
    c.restore();
  }
  function wizardCanvas(pose, flip) {
    var cv = canvas(256, 384), x = cv.getContext('2d');
    if (flip) { x.translate(256, 0); x.scale(-1, 1); }
    drawWizard(x, pose);
    x.setTransform(1, 0, 0, 1, 0, 0);
    var n = canvas(256, 384), nx = n.getContext('2d'), id = nx.createImageData(256, 384), d = id.data, r = rng(5);
    for (var i = 0; i < d.length; i += 4) { var v = r() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 24; }
    nx.putImageData(id, 0, 0); x.globalCompositeOperation = 'source-atop'; x.drawImage(n, 0, 0);
    return cv;
  }
  /* the ending: he climbs over the wall (after the drawing) */
  function drawWallScene(c, W, H, t) {
    c.fillStyle = '#26245e'; c.fillRect(0, 0, W, H);
    var r = rng(3);
    for (var i = 0; i < 60; i++) { c.fillStyle = 'rgba(255,255,255,' + (0.3 + r() * 0.6) + ')'; c.fillRect(r() * W, r() * H * 0.55, 2, 2); }
    /* wall rising to the right */
    var slope = 0.22, top = function (x) { return H * 0.58 - (x - W * 0.5) * slope; };
    c.save(); c.beginPath(); c.moveTo(0, top(0)); c.lineTo(W, top(W)); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.clip();
    var bw = W / 9, bh = bw * 0.42;
    for (var row = -2; row < 30; row++) for (var col = -1; col < 11; col++) {
      var x0 = col * bw + (row % 2 ? bw / 2 : 0), y0 = top(x0) + row * bh;
      c.fillStyle = ['#a59a92', '#958a83', '#b0a59c', '#8f857e'][(row * 3 + col * 7 + 40) % 4];
      c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + bw, y0 - bw * slope); c.lineTo(x0 + bw, y0 - bw * slope + bh); c.lineTo(x0, y0 + bh); c.closePath(); c.fill();
      c.strokeStyle = '#2b2229'; c.lineWidth = 2.5; c.stroke();
    }
    c.restore();
    c.strokeStyle = '#2b2229'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, top(0)); c.lineTo(W, top(W)); c.stroke();
    /* the wizard crawling over, rising with t */
    var k = Math.min(1, t), px = W * (0.3 + 0.25 * k), py = top(px) - 6;
    c.save(); c.translate(px, py); c.rotate(-Math.atan(slope)); var s = W / 700; c.scale(s, s);
    c.lineJoin = 'round'; c.lineCap = 'round';
    function sh(fill, path) { c.beginPath(); path(); c.fillStyle = fill; c.fill(); c.lineWidth = 5; c.strokeStyle = '#2b2229'; c.stroke(); }
    sh('#dcbde8', function () { c.moveTo(-40, 0); c.bezierCurveTo(-30, -70, 110, -80, 170, -30); c.bezierCurveTo(190, -10, 150, 10, 120, 0); c.closePath(); });
    sh('#dcbde8', function () { c.moveTo(150, -20); c.bezierCurveTo(190, 0, 210, 40, 200, 70); c.lineTo(175, 70); c.bezierCurveTo(180, 40, 160, 10, 140, 0); c.closePath(); });
    sh('#4d3b36', function () { c.moveTo(172, 66); c.lineTo(206, 66); c.quadraticCurveTo(214, 96, 204, 104); c.lineTo(170, 100); c.closePath(); });
    sh('#4d3b36', function () { c.moveTo(120, -6); c.lineTo(150, 4); c.quadraticCurveTo(150, 36, 140, 40); c.lineTo(112, 34); c.closePath(); });
    sh('#f2e35e', function () { c.ellipse(-40, -28, 30, 26, 0, 0, Math.PI * 2); });
    sh('#e8692b', function () { c.moveTo(-26, -52); c.quadraticCurveTo(-10, -44, -14, -24); c.quadraticCurveTo(-24, -36, -34, -30); c.closePath(); });
    sh('#dcbde8', function () { c.moveTo(-60, -40); c.bezierCurveTo(-60, -80, -30, -100, -10, -150); c.bezierCurveTo(10, -110, 20, -70, -6, -40); c.bezierCurveTo(-20, -30, -40, -36, -60, -40); c.closePath(); });
    [[40, -40, 14], [100, -40, 12], [-14, -90, 10], [180, 30, 9]].forEach(function (s2) {
      c.beginPath(); for (var i2 = 0; i2 < 10; i2++) { var a = i2 * Math.PI / 5 - Math.PI / 2, rr = i2 % 2 ? s2[2] * 0.45 : s2[2]; c.lineTo(s2[0] + Math.cos(a) * rr, s2[1] + Math.sin(a) * rr); }
      c.closePath(); c.fillStyle = '#63cfc2'; c.fill(); c.lineWidth = 2.2; c.stroke();
    });
    c.beginPath(); c.moveTo(-58, -30); c.lineTo(-46, -30); c.lineWidth = 3; c.stroke();
    c.restore();
  }

  /* ---------------------------------------------------------------- maze generation */
  var DIRS = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];   /* N E S W */
  function makeMaze(L) {
    var W = L.w, H = L.h, r = rng(L.seed);
    var hW = new Uint8Array((H + 1) * W).fill(1), vW = new Uint8Array(H * (W + 1)).fill(1);   /* hW[y*W+x]: wall north of (x,y); vW[y*(W+1)+x]: wall west of (x,y) */
    function wall(x, y, d, set) {
      var idx, arr;
      if (d === 0) { arr = hW; idx = y * W + x; } else if (d === 2) { arr = hW; idx = (y + 1) * W + x; }
      else if (d === 3) { arr = vW; idx = y * (W + 1) + x; } else { arr = vW; idx = y * (W + 1) + x + 1; }
      if (set !== undefined) arr[idx] = set; return arr[idx];
    }
    function inb(x, y) { return x >= 0 && y >= 0 && x < W && y < H; }
    var M = { W: W, H: H, hW: hW, vW: vW, wall: wall, inb: inb };
    if (L.archive) {   /* one open hall */
      for (var ay = 0; ay < H; ay++) for (var ax = 0; ax < W; ax++) for (var ad = 1; ad <= 2; ad++) { var nx0 = ax + DIRS[ad].x, ny0 = ay + DIRS[ad].y; if (inb(nx0, ny0)) wall(ax, ay, ad, 0); }
      M.start = { x: 0, y: H - 1 }; M.exit = null; M.wings = []; M.rooms = [{ x: 0, y: 0, w: W, h: H }]; M.wingOf = new Int8Array(W * H).fill(-1); M.main = [];
      return M;
    }
    /* perfect maze (recursive backtracker) */
    var seen = new Uint8Array(W * H), stack = [{ x: 0, y: H - 1 }]; seen[(H - 1) * W] = 1;
    while (stack.length) {
      var c = stack[stack.length - 1], opts = [];
      for (var d = 0; d < 4; d++) { var nx = c.x + DIRS[d].x, ny = c.y + DIRS[d].y; if (inb(nx, ny) && !seen[ny * W + nx]) opts.push(d); }
      if (!opts.length) { stack.pop(); continue; }
      var dd = opts[Math.floor(r() * opts.length)];
      wall(c.x, c.y, dd, 0); var n2 = { x: c.x + DIRS[dd].x, y: c.y + DIRS[dd].y }; seen[n2.y * W + n2.x] = 1; stack.push(n2);
    }
    function open(x, y, d) { var nx = x + DIRS[d].x, ny = y + DIRS[d].y; return inb(nx, ny) && !wall(x, y, d); }
    function bfs(sx, sy, block) {
      var dist = new Int16Array(W * H).fill(-1), par = new Int32Array(W * H).fill(-1), q = [sy * W + sx]; dist[q[0]] = 0;
      for (var qi = 0; qi < q.length; qi++) {
        var i = q[qi], x = i % W, y = (i / W) | 0;
        for (var d = 0; d < 4; d++) if (open(x, y, d)) { var j = (y + DIRS[d].y) * W + x + DIRS[d].x; if (dist[j] < 0 && !(block && block(j))) { dist[j] = dist[i] + 1; par[j] = i; q.push(j); } }
      }
      return { dist: dist, par: par };
    }
    M.open = open; M.bfs = bfs;
    var b0 = bfs(0, H - 1), far = 0;
    for (var i = 0; i < W * H; i++) if (b0.dist[i] > b0.dist[far]) far = i;
    var exit = { x: far % W, y: (far / W) | 0 }, main = [], onMain = new Uint8Array(W * H);
    for (var p = far; p >= 0; p = b0.par[p]) { main.unshift(p); onMain[p] = 1; }
    /* wings: side branches off the main path, sealed until you hang an image */
    var wingOf = new Int8Array(W * H).fill(-1), cands = [];
    main.forEach(function (ci, k) {
      if (k < 2 || k > main.length - 2) return;
      var x = ci % W, y = (ci / W) | 0;
      for (var d = 0; d < 4; d++) if (open(x, y, d)) {
        var root = (y + DIRS[d].y) * W + x + DIRS[d].x; if (onMain[root]) continue;
        var cells = [root], depth = {}; depth[root] = 1;
        for (var q = 0; q < cells.length; q++) {
          var cc = cells[q], cx = cc % W, cy = (cc / W) | 0;
          for (var e = 0; e < 4; e++) if (open(cx, cy, e)) { var nn = (cy + DIRS[e].y) * W + cx + DIRS[e].x; if (nn !== ci && depth[nn] === undefined && !onMain[nn]) { depth[nn] = depth[cc] + 1; cells.push(nn); } }
        }
        if (cells.length >= 2 && cells.length <= 10) {
          var deep = root; cells.forEach(function (z) { if (depth[z] > depth[deep]) deep = z; });
          cands.push({ k: k, from: ci, dir: d, root: root, cells: cells, deep: deep });
        }
      }
    });
    var wings = [];
    if (cands.length && L.wings) {
      for (var wI = 0; wI < L.wings; wI++) {
        var target = (wI + 1) / (L.wings + 1) * main.length, best = null;
        cands.forEach(function (cd) { if (cd.used || cd.cells.some(function (z) { return wingOf[z] >= 0; })) return; if (!best || Math.abs(cd.k - target) < Math.abs(best.k - target)) best = cd; });
        if (!best) break;
        best.used = true; best.cells.forEach(function (z) { wingOf[z] = wings.length; }); wings.push(best);
      }
    }
    /* rooms + loops, never touching wings or the exit */
    var protect = function (i) { return wingOf[i] >= 0 || i === far; };
    var rooms = [];
    for (var rI = 0, tries = 0; rI < L.rooms && tries < 200; tries++) {
      var rw = 2 + (r() < 0.4 ? 1 : 0), rh = 2, rx = Math.floor(r() * (W - rw + 1)), ry = Math.floor(r() * (H - rh + 1)), okR = true;
      for (var yy = ry; yy < ry + rh; yy++) for (var xx = rx; xx < rx + rw; xx++) if (protect(yy * W + xx) || (xx === 0 && yy === H - 1)) okR = false;
      rooms.forEach(function (o) { if (rx < o.x + o.w + 1 && rx + rw + 1 > o.x && ry < o.y + o.h + 1 && ry + rh + 1 > o.y) okR = false; });
      if (!okR) continue;
      for (var y2 = ry; y2 < ry + rh; y2++) for (var x2 = rx; x2 < rx + rw; x2++) { if (x2 < rx + rw - 1) wall(x2, y2, 1, 0); if (y2 < ry + rh - 1) wall(x2, y2, 2, 0); }
      rooms.push({ x: rx, y: ry, w: rw, h: rh }); rI++;
    }
    var nLoops = Math.round(W * H * L.loops);
    for (var lI = 0, t2 = 0; lI < nLoops && t2 < 500; t2++) {
      var lx = Math.floor(r() * W), ly = Math.floor(r() * H), ld = 1 + Math.floor(r() * 2), mx = lx + DIRS[ld].x, my = ly + DIRS[ld].y;
      if (!inb(mx, my) || !wall(lx, ly, ld) || protect(ly * W + lx) || protect(my * W + mx)) continue;
      wall(lx, ly, ld, 0); lI++;
    }
    M.start = { x: 0, y: H - 1 }; M.exit = exit; M.exitI = far; M.main = main; M.wings = wings; M.wingOf = wingOf; M.rooms = rooms;
    /* direction the start cell opens to */
    for (var sd = 0; sd < 4; sd++) if (open(0, H - 1, sd)) { M.startDir = sd; break; }
    return M;
  }

  /* ---------------------------------------------------------------- geometry builder */
  function GB() { this.p = []; this.n = []; this.u = []; }
  GB.prototype.quad = function (a, b, c, d, n, uv) {   /* a b c d counter-clockwise seen from the front */
    var P2 = this.p, N = this.n, UV = this.u;
    [a, b, c, a, c, d].forEach(function (v) { P2.push(v[0], v[1], v[2]); N.push(n[0], n[1], n[2]); });
    [uv[0], uv[1], uv[2], uv[0], uv[2], uv[3]].forEach(function (t) { UV.push(t[0], t[1]); });
  };
  GB.prototype.geo = function () {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.computeBoundingSphere();
    return g;
  };

  /* ---------------------------------------------------------------- worlds */
  function lambert(map, o) { o = o || {}; o.map = map; return new THREE.MeshLambertMaterial(o); }
  function phong(color, o) { o = o || {}; o.color = color; if (o.shininess === undefined) o.shininess = 70; if (!o.specular) o.specular = 0x777777; return new THREE.MeshPhongMaterial(o); }

  var THEMES = {
    meadow: function (S) {
      return {
        bg: '#bcd6ee', fog: ['#c8dcef', 10, 40], hemi: ['#ffffff', '#6a8a4a', 1.0], sun: ['#fff4dc', 0.55],
        wall: lambert(tex('land', function () { return P.landscape(11, 'day'); })), wallU: 16,
        cap: lambert(tex('cap-m', function () { return P.stucco('#8a8c7a', 3, 14); })),
        floor: lambert(tex('grass', function () { return P.grass(5); }, [S.W * 1.2, S.H * 1.2])),
        ceil: lambert(tex('sky', function () { return P.clouds(9, '#6fa4dc', '#8db9e6', '#ffffff', '#b6c6d8', 22); }, [S.W / 2, S.H / 2]), { side: THREE.DoubleSide }),
        posts: 'wall'
      };
    },
    museum: function (S) {
      return {
        bg: '#dfe9e6', fog: ['#e4ece9', 12, 44], hemi: ['#ffffff', '#8ab0a4', 0.78], sun: ['#fffaf0', 0.42],
        wall: lambert(tex('mw', function () { return P.wall('#f2f1ec', '#8fa8a0', 21, 12); })), wallU: 4,
        cap: lambert(tex('mw', null)),
        floor: phong(0x8fd8bc, { transparent: true, opacity: 0.66, shininess: 90 }), gloss: true,
        ceil: lambert(tex('mc', function () { return P.stucco('#f6f6f4', 22, 8); }, [S.W, S.H])),
        posts: 'column', column: phong(0xf2f2ee, { shininess: 30 })
      };
    },
    corridor: function (S) {
      return {
        bg: '#5a2e14', fog: ['#6b3a1c', 6, 26], hemi: ['#ffe2b8', '#7a3a18', 1.0], sun: ['#ffcf9a', 0.35],
        wall: lambert(tex('cw', function () { return P.wall('#e2aa66', '#6a3412', 31, 34); })), wallU: 4,
        cap: lambert(tex('cw', null)),
        floor: lambert(tex('carpet', function () { return P.carpet('#8a4424', 33); }, [S.W * 2, S.H * 2])),
        ceil: lambert(tex('cc', function () { return P.stucco('#d48c4c', 34, 22); }, [S.W, S.H])),
        posts: 'wall', lights: true
      };
    },
    atrium: function (S) {
      return {
        bg: '#0d1030', fog: ['#161a40', 9, 36], hemi: ['#e0e2ff', '#3a3a5a', 1.0], sun: ['#ffffff', 0.5],
        wall: lambert(tex('aw', function () { return P.wall('#eceaf6', '#4a4a7a', 41, 10); })), wallU: 4,
        cap: lambert(tex('aw', null)),
        floor: phong(0xffffff, { map: tex('grid', function () { return P.grid('#34343e', '#f4f4ff', 42); }, [S.W * 2, S.H * 2]), transparent: true, opacity: 0.7, shininess: 100 }), gloss: true,
        ceil: lambert(tex('stars', function () { return P.stars(43); }, [S.W / 2, S.H / 2]), { side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: tex('stars', null), emissiveIntensity: 0.9 }),
        posts: 'wall', beams: true
      };
    },
    pavilion: function (S) {
      return {
        bg: '#8aa6e0', fog: ['#9fb8e6', 18, 80], hemi: ['#ffffff', '#5a6a9a', 1.0], sun: ['#fff6e0', 0.6],
        wall: lambert(tex('pw', function () { return P.marble('#c9cfe0', '#8a93b8', '#4a4e6e', 51, 384); })), wallU: 3, wallH: 1.05,
        cap: phong(0x8aa49a, { shininess: 50 }),
        floor: phong(0xffffff, { map: tex('check', function () { return P.checker('#f4f4f4', '#151a3a', 4, 256, 52); }, [S.W * 2, S.H * 2]), transparent: true, opacity: 0.72, shininess: 110 }), gloss: true,
        ceil: null, sea: true, cliffs: true,
        posts: 'column', column: phong(0x8a90b8, { map: tex('pm', function () { return P.marble('#9a9cc8', '#5a5c8e', '#2e2f4e', 53, 256); }), shininess: 60 }), roofs: true
      };
    },
    terrace: function (S) {
      return {
        bg: '#8a7ac8', fog: ['#9a86c0', 16, 70], hemi: ['#fff6c8', '#5a3a8a', 1.0], sun: ['#fff0c8', 0.6],
        wall: lambert(tex('tw', function () { return P.marble('#8e72c8', '#e6dcf4', '#140a22', 61, 512); })), wallU: 4,
        cap: lambert(tex('tw', null)),
        floor: phong(0xffffff, { map: tex('tf', function () { return P.marble('#f2e6f4', '#d6b6e6', '#2a1a2a', 62, 512); }, [S.W, S.H]), transparent: true, opacity: 0.8, shininess: 60 }), gloss: true,
        ceil: null, sky: tex('tsky', function () { return P.clouds(63, '#7a6ad0', '#9a7ad8', '#f6ec9a', '#c8a0d8', 30); }), sea: true,
        posts: 'column', column: phong(0xb8a2e0, { map: tex('tw', null), shininess: 40 })
      };
    },
    gallery: function (S) {
      return {
        bg: '#1a1a24', fog: ['#22222c', 10, 38], hemi: ['#fff0dc', '#3a3a48', 0.85], sun: ['#ffe8c8', 0.4],
        wall: lambert(tex('gw', function () { return P.wall('#e8e6e2', '#8a8a94', 71, 10); })), wallU: 4,
        cap: lambert(tex('gw', null)),
        floor: phong(0xffffff, { map: tex('gcheck', function () { return P.checker('#bfc0c6', '#5e6068', 4, 256, 72); }, [S.W * 2, S.H * 2]), transparent: true, opacity: 0.68, shininess: 110 }), gloss: true,
        ceil: lambert(tex('gc', function () { return P.stucco('#ecebe8', 73, 8); }, [S.W, S.H])), vaults: true,
        posts: 'column', column: phong(0xf0eee8, { map: tex('gm', function () { return P.marble('#f2f0ea', '#c9c6be', null, 74, 256); }), shininess: 50 })
      };
    },
    sunset: function (S) {
      return {
        bg: '#ff9a5a', fog: ['#e88a6a', 14, 60], hemi: ['#ffd8b0', '#5a2a4a', 1.0], sun: ['#ffb070', 0.75],
        wall: lambert(tex('sl', function () { return P.landscape(81, 'sunset'); })), wallU: 16,
        cap: lambert(tex('scap', function () { return P.stucco('#5a3048', 82, 12); })),
        floor: phong(0x5a2a2a, { map: tex('sf', function () { return P.checker('#7a3a2e', '#2a1418', 2, 256, 83); }, [S.W, S.H]), transparent: true, opacity: 0.66, shininess: 120 }), gloss: true,
        ceil: null, skySunset: true,
        posts: 'wall'
      };
    },
    archive: function (S) {
      var t = THEMES.gallery(S); t.bg = '#2a2030'; t.fog = ['#2a2030', 14, 50]; return t;
    }
  };

  /* build the scene for a level */
  function buildWorld(G, L, M) {
    var S = { W: M.W, H: M.H }, th = THEMES[L.theme](S), scene = new THREE.Scene(), mirror = new THREE.Group(), world = new THREE.Group();
    var r = rng(L.seed + 77);
    scene.background = new THREE.Color(th.bg);
    scene.fog = new THREE.Fog(th.fog[0], th.fog[1], th.fog[2]);
    scene.add(new THREE.HemisphereLight(th.hemi[0], th.hemi[1], th.hemi[2]));
    var sun = new THREE.DirectionalLight(th.sun[0], th.sun[1]); sun.position.set(0.4, 1, 0.25); scene.add(sun);
    scene.add(world);
    if (th.gloss) { mirror.scale.y = -1; scene.add(mirror); }
    var colliders = [], props = [], anim = [];
    G.colliders = colliders; G.anim = anim;
    var WH = th.wallH || WALL_H;
    function add(obj, noMirror) { world.add(obj); if (th.gloss && !noMirror) { var m = obj.clone(); mirror.add(m); obj.userData.mirror = m; } return obj; }
    function mesh(geo, mat) { return new THREE.Mesh(geo, mat); }
    function cellC(x, y) { return { x: (x + 0.5) * CELL, z: (y + 0.5) * CELL }; }
    G.cellC = cellC;

    /* faces: per cell side, so wing faces can wear your image later */
    var gbMain = new GB(), gbCap = new GB(), gbWing = M.wings.map(function () { return new GB(); }), faces = [];
    function addFace(x, y, d, outsideCell) {
      /* face of the wall on side d of cell (x,y), facing into the cell */
      var c = cellC(x, y), half = CELL / 2 - T / 2, L0 = CELL / 2 - T / 2;
      var nx = -DIRS[d].x, nz = -DIRS[d].y, fx = c.x + DIRS[d].x * half, fz = c.z + DIRS[d].y * half;
      var rx = nz, rz = -nx;   /* the viewer's right when facing the wall */
      var lb = [fx - rx * L0, 0, fz - rz * L0], rb = [fx + rx * L0, 0, fz + rz * L0], rt = [rb[0], WH, rb[2]], lt = [lb[0], WH, lb[2]];
      var wi = M.wingOf ? M.wingOf[y * M.W + x] : -1, U0, U1, V = WH / WALL_H;
      if (wi >= 0 && !outsideCell) { U0 = 0; U1 = 1; }
      else { U0 = (lb[0] * rx + lb[2] * rz) / th.wallU; U1 = U0 + 2 * L0 / th.wallU; }
      var gb = (wi >= 0 && !outsideCell) ? gbWing[wi] : gbMain;
      gb.quad(lb, rb, rt, lt, [nx, 0, nz], [[U0, 0], [U1, 0], [U1, V], [U0, V]]);
      faces.push({ x: x, y: y, d: d, cx: fx + nx * 0.01, cz: fz + nz * 0.01, nx: nx, nz: nz, tx: rx, tz: rz, wing: wi });
    }
    function capBox(x0, z0, x1, z1, h) {
      gbCap.quad([x0, h, z1], [x1, h, z1], [x1, h, z0], [x0, h, z0], [0, 1, 0], [[0, 0], [1, 0], [1, 1], [0, 1]]);
    }
    /* wall segments: faces on both sides + caps + collider */
    for (var y = 0; y <= M.H; y++) for (var x = 0; x < M.W; x++) {   /* horizontal (north) walls */
      if (!M.hW[y * M.W + x]) continue;
      var z = y * CELL, x0 = x * CELL + T / 2, x1 = (x + 1) * CELL - T / 2;
      if (y < M.H) addFace(x, y, 0); if (y > 0) addFace(x, y - 1, 2);
      capBox(x0, z - T / 2, x1, z + T / 2, WH);
      colliders.push({ x0: x0 - T / 2, z0: z - T / 2, x1: x1 + T / 2, z1: z + T / 2 });
    }
    for (var y3 = 0; y3 < M.H; y3++) for (var x3 = 0; x3 <= M.W; x3++) {   /* vertical (west) walls */
      if (!M.vW[y3 * (M.W + 1) + x3]) continue;
      var xz = x3 * CELL, z0 = y3 * CELL + T / 2, z1 = (y3 + 1) * CELL - T / 2;
      if (x3 < M.W) addFace(x3, y3, 3); if (x3 > 0) addFace(x3 - 1, y3, 1);
      capBox(xz - T / 2, z0, xz + T / 2, z1, WH);
      colliders.push({ x0: xz - T / 2, z0: z0 - T / 2, x1: xz + T / 2, z1: z1 + T / 2 });
    }
    /* outer faces of the boundary (seen from outside in open-air worlds) */
    if (!th.ceil) {
      var outer = new GB();
      var Wd = M.W * CELL, Hd = M.H * CELL, e = T / 2;
      [[[-e, 0, -e], [Wd + e, 0, -e], [0, 0, -1]], [[Wd + e, 0, Hd + e], [-e, 0, Hd + e], [0, 0, 1]], [[-e, 0, Hd + e], [-e, 0, -e], [-1, 0, 0]], [[Wd + e, 0, -e], [Wd + e, 0, Hd + e], [1, 0, 0]]].forEach(function (s) {
        var a = s[0], b = s[1], len = Math.hypot(b[0] - a[0], b[2] - a[2]) / th.wallU;
        outer.quad(b, a, [a[0], WH, a[2]], [b[0], WH, b[2]], s[2], [[len, 0], [0, 0], [0, WH / WALL_H], [len, WH / WALL_H]]);
      });
      add(mesh(outer.geo(), th.wall));
    }
    /* corner posts at every grid vertex that touches a wall */
    var postMat = th.posts === 'column' ? th.column : th.cap;
    var colGeo = th.posts === 'column' ? new THREE.CylinderGeometry(0.3, 0.34, WH, 14) : new THREE.BoxGeometry(T, WH, T);
    var baseGeo = th.posts === 'column' ? new THREE.BoxGeometry(0.8, 0.22, 0.8) : null;
    for (var py = 0; py <= M.H; py++) for (var px = 0; px <= M.W; px++) {
      var touches = (px < M.W && M.hW[py * M.W + px]) || (px > 0 && M.hW[py * M.W + px - 1]) || (py < M.H && M.vW[py * (M.W + 1) + px]) || (py > 0 && M.vW[(py - 1) * (M.W + 1) + px]);
      if (!touches) continue;
      var pm = mesh(colGeo, postMat); pm.position.set(px * CELL, WH / 2, py * CELL); add(pm);
      if (baseGeo) { var bm = mesh(baseGeo, postMat); bm.position.set(px * CELL, 0.11, py * CELL); add(bm); var bt = mesh(baseGeo, postMat); bt.position.set(px * CELL, WH - 0.11, py * CELL); add(bt); }
      var cr = th.posts === 'column' ? 0.4 : T / 2 + 0.02;
      colliders.push({ x0: px * CELL - cr, z0: py * CELL - cr, x1: px * CELL + cr, z1: py * CELL + cr });
    }
    add(mesh(gbMain.geo(), th.wall));
    add(mesh(gbCap.geo(), th.cap));
    G.wingMeshes = gbWing.map(function (gb) { var g = gb.geo(); if (!g) return null; var m = mesh(g, th.wall); add(m); return m; });

    /* floor */
    var ext = th.ceil ? 0 : th.sea ? 2 : 60, fw = M.W * CELL + ext * 2, fh = M.H * CELL + ext * 2;
    var floorMat = th.floor;
    if (!th.ceil && floorMat.map) { /* keep the pattern scale on the extended floor */ floorMat.map.repeat.set(fw / (CELL / 2), fh / (CELL / 2)); }
    var floor = mesh(new THREE.PlaneGeometry(fw, fh), floorMat); floor.rotation.x = -Math.PI / 2; floor.position.set(M.W * CELL / 2, 0, M.H * CELL / 2);
    world.add(floor);
    /* sea beyond the terrace */
    if (th.sea) {
      var sea = mesh(new THREE.PlaneGeometry(400, 400), lambert(tex('water', function () { return P.water(91); }, [40, 40]), { transparent: true, opacity: 0.9 }));
      sea.rotation.x = -Math.PI / 2; sea.position.set(M.W * CELL / 2, -0.6, M.H * CELL / 2); world.add(sea);
      var rimMat = th.column || th.cap, RW = M.W * CELL + 4, RH = M.H * CELL + 4, cxm = M.W * CELL / 2, czm = M.H * CELL / 2;   /* stone edge of the terrace */
      [[RW + 0.8, 0.4, cxm, czm - RH / 2], [RW + 0.8, 0.4, cxm, czm + RH / 2], [0.4, RH, cxm - RW / 2, czm], [0.4, RH, cxm + RW / 2, czm]].forEach(function (b) {
        var rm = mesh(new THREE.BoxGeometry(b[0], 2.2, b[1]), rimMat); rm.position.set(b[2], -1.05, b[3]); world.add(rm);
      });
      anim.push(function (t) { sea.material.map.offset.set(t * 0.004, t * 0.002); });
    }
    if (th.cliffs) {   /* stratified cliffs standing in the sea */
      var cliffMat = lambert(tex('cliff', function () { return P.cliff(92); }));
      for (var ci = 0; ci < 7; ci++) {
        var ang = ci / 7 * Math.PI * 2 + 0.3, dist = 80 + r() * 50, grp = new THREE.Group();
        for (var cj = 0; cj < 6; cj++) {
          var cw = 5 + r() * 9, chh = 14 + r() * 26, cd = 6 + r() * 8;
          var cm = mesh(new THREE.BoxGeometry(cw, chh, cd), cliffMat); cm.position.set((cj - 2.5) * 7 + (r() - 0.5) * 3, chh / 2 - 1.5, (r() - 0.5) * 6); grp.add(cm);
        }
        grp.position.set(M.W * CELL / 2 + Math.cos(ang) * dist, 0, M.H * CELL / 2 + Math.sin(ang) * dist); grp.rotation.y = -ang + Math.PI / 2; world.add(grp);
      }
    }
    /* ceiling / roof / sky */
    if (th.ceil) {
      var ceil = mesh(new THREE.PlaneGeometry(M.W * CELL, M.H * CELL), th.ceil); ceil.rotation.x = Math.PI / 2; ceil.position.set(M.W * CELL / 2, WH, M.H * CELL / 2); add(ceil);
      if (th.beams) {
        var beamMat = phong(0xdcdce8, { shininess: 40 });
        for (var bx = 0; bx <= M.W; bx++) { var bmz = mesh(new THREE.BoxGeometry(0.18, 0.22, M.H * CELL), beamMat); bmz.position.set(bx * CELL, WH - 0.11, M.H * CELL / 2); add(bmz); }
        for (var bz = 0; bz <= M.H; bz++) { var bmx = mesh(new THREE.BoxGeometry(M.W * CELL, 0.22, 0.18), beamMat); bmx.position.set(M.W * CELL / 2, WH - 0.11, bz * CELL); add(bmx); }
      }
      if (th.lights) {
        var lmat = new THREE.MeshBasicMaterial({ color: 0xfff6e0 });
        for (var ly = 0; ly < M.H; ly++) for (var lx = 0; lx < M.W; lx++) if ((lx + ly) % 2 === 0) { var lp = mesh(new THREE.PlaneGeometry(1.4, 0.5), lmat); lp.rotation.x = Math.PI / 2; var lc = cellC(lx, ly); lp.position.set(lc.x, WH - 0.01, lc.z); add(lp); }
      }
      if (th.vaults) {
        var vmat = th.ceil, vgeo = new THREE.SphereGeometry(CELL * 0.72, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.32);
        for (var vy = 0; vy < M.H; vy++) for (var vx = 0; vx < M.W; vx++) { var vc = cellC(vx, vy), vm = mesh(vgeo, new THREE.MeshLambertMaterial({ color: 0xf2f0ec, side: THREE.BackSide })); vm.position.set(vc.x, WH - CELL * 0.72 * Math.cos(Math.PI * 0.32), vc.z); add(vm); }
      }
    } else {
      /* sky dome */
      var skyMat;
      if (th.skySunset) skyMat = new THREE.MeshBasicMaterial({ map: tex('sunsky', P.sunset), side: THREE.BackSide, fog: false });
      else if (th.sky) { th.sky.repeat.set(6, 3); skyMat = new THREE.MeshBasicMaterial({ map: th.sky, side: THREE.BackSide, fog: false }); }
      else skyMat = new THREE.MeshBasicMaterial({ map: tex('daysky', function () { return P.clouds(93, '#6a8ee0', '#9ab6ee', '#ffffff', '#c0cce8', 30); }, [6, 3]), side: THREE.BackSide, fog: false });
      var sky = mesh(new THREE.SphereGeometry(300, 32, 16), skyMat); sky.position.set(M.W * CELL / 2, 0, M.H * CELL / 2); world.add(sky);
      if (th.skySunset) {
        var sunDisc = mesh(new THREE.CircleGeometry(16, 32), new THREE.MeshBasicMaterial({ color: 0xfff2c8, fog: false }));
        sunDisc.position.set(M.W * CELL / 2 - 200, 26, M.H * CELL / 2 - 120); sunDisc.lookAt(M.W * CELL / 2, 20, M.H * CELL / 2); world.add(sunDisc);
        var glow = mesh(new THREE.CircleGeometry(60, 32), new THREE.MeshBasicMaterial({ color: 0xffb070, transparent: true, opacity: 0.25, fog: false, depthWrite: false }));
        glow.position.copy(sunDisc.position).multiplyScalar(1.001); glow.lookAt(M.W * CELL / 2, 20, M.H * CELL / 2); world.add(glow);
      }
      if (th.roofs) {   /* green roof slabs with checker undersides over the rooms (pavilion) */
        var roofTop = phong(0x6a9a8a, { shininess: 50 }), roofUnder = lambert(tex('rc', function () { return P.checker('#f2f2f2', '#202020', 8, 256, 94); }));
        M.rooms.forEach(function (rm) {
          var rx0 = rm.x * CELL, rz0 = rm.y * CELL, rwid = rm.w * CELL, rdep = rm.h * CELL;
          var slab = mesh(new THREE.BoxGeometry(rwid + 0.6, 0.4, rdep + 0.6), [roofTop, roofTop, roofTop, roofUnder, roofTop, roofTop]);
          slab.position.set(rx0 + rwid / 2, 3.4, rz0 + rdep / 2); add(slab);
          [[rx0, rz0], [rx0 + rwid, rz0], [rx0, rz0 + rdep], [rx0 + rwid, rz0 + rdep]].forEach(function (pp) { var cm2 = mesh(new THREE.CylinderGeometry(0.28, 0.32, 3.4, 14), th.column); cm2.position.set(pp[0], 1.7, pp[1]); add(cm2); });
        });
      }
    }
    G.scene = scene; G.world = world; G.mirror = mirror; G.theme = th; G.faces = faces; G.props = props; G.addObj = add; G.rng = r; G.WH = WH;
    return scene;
  }

  /* props: things that sit in rooms and on walls */
  function decorate(G, L, M) {
    var th = G.theme, add = G.addObj, r = G.rng, cellC = G.cellC, colliders = G.colliders, anim = G.anim;
    var used = {};   /* faces already holding something */
    function faceKey(f) { return f.x + ',' + f.y + ',' + f.d; }
    function plane(w, h, mat) { return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); }
    function onFace(f, obj, y, along) { obj.position.set(f.cx + f.tx * (along || 0), y, f.cz + f.tz * (along || 0)); obj.lookAt(f.cx + f.nx * 5 + f.tx * (along || 0), y, f.cz + f.nz * 5 + f.tz * (along || 0)); return obj; }
    function frameAround(f, w, h, y, mat, along) {
      var g = new THREE.Group(), fm = phong(0xc8a040, { shininess: 90, specular: 0xffe6a0 }), b = 0.09;
      [[0, h / 2 + b / 2, w + b * 2, b], [0, -h / 2 - b / 2, w + b * 2, b], [-w / 2 - b / 2, 0, b, h], [w / 2 + b / 2, 0, b, h]].forEach(function (s) {
        var m = new THREE.Mesh(new THREE.BoxGeometry(s[2], s[3], 0.06), fm); m.position.set(s[0], s[1], 0.02); g.add(m);
      });
      var pic = plane(w, h, mat); pic.position.z = 0.012; g.add(pic); g.userData.pic = pic;
      onFace(f, g, y, along); return g;
    }
    function wallFaces(filter) { return G.faces.filter(function (f) { return f.wing < 0 && !used[faceKey(f)] && (!filter || filter(f)); }); }
    function inRoom(x, y) { return M.rooms.some(function (rm) { return x >= rm.x && x < rm.x + rm.w && y >= rm.y && y < rm.y + rm.h; }); }
    function circle(x, z, rr) { colliders.push({ x0: x - rr, z0: z - rr, x1: x + rr, z1: z + rr }); }
    G.myImages = G.myImages || [];
    function userTex(i) { var im = G.myImages[i % G.myImages.length]; return im ? im.tex : null; }

    /* ---- exit portal */
    if (M.exit) {
      var ef = G.faces.filter(function (f) { return f.x === M.exit.x && f.y === M.exit.y; });
      var face = ef[0];
      if (face) {
        used[faceKey(face)] = true;
        var door = new THREE.Group();
        var glow = plane(1.7, 2.5, new THREE.MeshBasicMaterial({ map: tex('doorglow', P.doorGlow), color: 0xffffff })); glow.position.set(0, 1.25, 0.03); door.add(glow);
        var jm = phong(0xeeeeee, { shininess: 80 });
        [[-0.95, 1.3, 0.2, 2.7], [0.95, 1.3, 0.2, 2.7], [0, 2.65, 2.1, 0.2]].forEach(function (s) { var m = new THREE.Mesh(new THREE.BoxGeometry(s[2], s[3], 0.2), jm); m.position.set(s[0], s[1], 0.1); door.add(m); });
        var sign = plane(1.2, 0.42, new THREE.MeshBasicMaterial({ map: tex('exitsign', function () { return P.sign('EXIT', '#b80d0d', '#ff3a3a', 384, 134, 'bold 92px Arial Black, Arial, sans-serif'); }) }));
        sign.position.set(0, 2.98, 0.08); door.add(sign);
        onFace(face, door, 0); add(door);
        G.exitPos = { x: face.cx + face.nx * 0.2, z: face.cz + face.nz * 0.2, nx: face.nx, nz: face.nz };
        anim.push(function (t) { var v = 0.9 + Math.sin(t * 3) * 0.1; glow.material.color.setRGB(v, v, v); });
      }
    }
    /* ---- wings: frame next to the door + veil in the doorway + sun shard at the far end */
    G.wings = M.wings.map(function (wg, wi) {
      var fromX = wg.from % M.W, fromY = (wg.from / M.W) | 0, id = 'L' + G.levelIndex + 'W' + wi;
      /* the doorway between from-cell and wing root */
      var c0 = cellC(fromX, fromY), d = wg.dir, gx = c0.x + DIRS[d].x * CELL / 2, gz = c0.z + DIRS[d].y * CELL / 2;
      var veilMat = new THREE.MeshBasicMaterial({ map: tex('veil', P.veil), transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false });
      var veil = plane(CELL - T, G.WH, veilMat); veil.position.set(gx, G.WH / 2, gz); if (DIRS[d].x) veil.rotation.y = Math.PI / 2; add(veil, true);
      var vcol = DIRS[d].x ? { x0: gx - 0.1, z0: gz - CELL / 2, x1: gx + 0.1, z1: gz + CELL / 2 } : { x0: gx - CELL / 2, z0: gz - 0.1, x1: gx + CELL / 2, z1: gz + 0.1 };
      colliders.push(vcol);
      anim.push(function (t) { veilMat.map.offset.x = t * 0.05; });
      /* frame: on a wall of the from-cell, else on an easel */
      var cand = G.faces.filter(function (f) { return f.x === fromX && f.y === fromY && !used[faceKey(f)] && f.wing < 0; });
      cand.sort(function (a, b) { return Math.abs(a.d - d) % 2 - Math.abs(b.d - d) % 2; });
      var ff = cand[0], fr, fpos;
      var emptyMat = new THREE.MeshBasicMaterial({ map: tex('empty', P.emptyCanvas) });
      if (G.WH < 2) ff = null;   /* low balustrades: use an easel */
      if (ff) { used[faceKey(ff)] = true; fr = frameAround(ff, 1.5, 1.12, 1.6, emptyMat); add(fr, true); fpos = { x: ff.cx + ff.nx * 0.5, z: ff.cz + ff.nz * 0.5, fx: ff.cx, fz: ff.cz, nx: ff.nx, nz: ff.nz }; }
      else {
        var ec = cellC(fromX, fromY), off = 1.15, ex = ec.x - DIRS[d].y * off, ez = ec.z + DIRS[d].x * off;
        var fake = { cx: ex, cz: ez, nx: DIRS[d].y, nz: -DIRS[d].x, tx: 0, tz: 0 };
        fr = frameAround(fake, 1.5, 1.12, 1.6, emptyMat); add(fr, true);
        var easel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.6, 0.12), phong(0x6a4a2a)); easel.position.set(ex, 0.8, ez); add(easel);
        circle(ex, ez, 0.3); fpos = { x: ex + fake.nx * 0.6, z: ez + fake.nz * 0.6, fx: ex, fz: ez, nx: fake.nx, nz: fake.nz };
      }
      var pulse = function (t) { if (!wobj.open) emptyMat.color.setHSL(0.6, 0.6, 0.85 + Math.sin(t * 4) * 0.12); };
      anim.push(pulse);
      /* shard */
      var dx = wg.deep % M.W, dy = (wg.deep / M.W) | 0, dc = cellC(dx, dy);
      var shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), phong(0xffb030, { emissive: 0xff7a10, emissiveIntensity: 0.95, shininess: 120, specular: 0xfff0c0, flatShading: true }));
      shard.position.set(dc.x, 1.3, dc.z); add(shard, true);
      var halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex('halo', function () { var c = canvas(128, 128), x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, 'rgba(255,220,140,.9)'); g.addColorStop(1, 'rgba(255,140,40,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return c; }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.scale.set(1.6, 1.6, 1); halo.position.copy(shard.position); add(halo, true);
      anim.push(function (t) { shard.rotation.y = t * 1.6; shard.position.y = 1.3 + Math.sin(t * 2) * 0.12; halo.position.y = shard.position.y; });
      var got = !!store.shards[id];
      shard.visible = halo.visible = !got;
      var wobj = { id: id, index: wi, veil: veil, veilMat: veilMat, collider: vcol, frame: fr, pos: fpos, shard: shard, halo: halo, shardAt: { x: dc.x, z: dc.z }, got: got, open: false, cells: wg.cells, door: { x: gx, z: gz } };
      return wobj;
    });

    /* ---- theme dressing */
    var t = L.theme;
    var paintings = [];
    if (t === 'museum' || t === 'gallery' || t === 'archive') {
      var spot = t === 'gallery' || t === 'archive';
      var halo2 = tex('spot', function () { var c = canvas(256, 256), x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, 'rgba(255,248,230,.95)'); g.addColorStop(0.55, 'rgba(255,244,220,.5)'); g.addColorStop(1, 'rgba(255,240,220,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); return c; });
      var list = wallFaces(), n = t === 'archive' ? list.length : Math.round(list.length * (t === 'gallery' ? 0.45 : 0.3));
      list.sort(function () { return r() - 0.5; });
      for (var i = 0; i < n && i < list.length; i++) {
        var f = list[i]; used[faceKey(f)] = true;
        var ut = (t === 'gallery' || t === 'archive') ? userTex(i) : null;
        var mat = new THREE.MeshBasicMaterial({ map: ut || tex('paint' + (i % 9), function () { return P.painting(L.seed + i % 9); }) });
        if (spot) { var hs = plane(2.6, 2.4, new THREE.MeshBasicMaterial({ map: halo2, transparent: true, depthWrite: false })); onFace(f, hs, 1.7); hs.position.x += f.nx * 0.005; hs.position.z += f.nz * 0.005; add(hs, true); }
        var fr2 = frameAround(f, 1.3, 0.98, 1.65, mat); add(fr2); paintings.push(fr2);
      }
      if (t === 'museum') {   /* plinths with artifacts + opening-hours plaque */
        M.rooms.forEach(function (rm, k) {
          var cx = (rm.x + rm.w / 2) * CELL, cz = (rm.y + rm.h / 2) * CELL;
          var pl = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.9), phong(0xf4f4f2, { shininess: 20 })); pl.position.set(cx, 0.5, cz); add(pl); circle(cx, cz, 0.6);
          var pts = []; for (var s = 0; s <= 10; s++) { var v = s / 10; pts.push(new THREE.Vector2(0.18 + Math.sin(v * Math.PI) * 0.22 + (v > 0.85 ? 0.06 : 0), v * 0.9)); }
          var vase = new THREE.Mesh(new THREE.LatheGeometry(pts, 20), phong([0x7a4a2a, 0x2a6a8a, 0x9a8a5a][k % 3], { shininess: 90 })); vase.position.set(cx, 1.0, cz); add(vase);
          anim.push(function (tt) { vase.rotation.y = tt * 0.3; });
        });
        var pf = wallFaces()[0];
        if (pf) { used[faceKey(pf)] = true; var sg = plane(1.6, 0.6, new THREE.MeshBasicMaterial({ map: tex('hours', function () { return P.sign('OPEN 9 — DUSK', '#1a2a3a', '#ffd88a', 512, 160, 'bold 58px Georgia, serif'); }) })); onFace(pf, sg, 2.3); add(sg); }
      }
      if (t === 'gallery' || t === 'archive') {
        M.rooms.forEach(function (rm, k) {
          var cx = (rm.x + rm.w / 2) * CELL, cz = (rm.y + rm.h / 2) * CELL;
          if (k === 0) fountain(cx, cz); else if (k === 1) spiral(cx, cz);
        });
        if (t === 'gallery') { var sf = wallFaces()[0]; if (sf) { used[faceKey(sf)] = true; var sch = plane(1.8, 0.7, new THREE.MeshBasicMaterial({ map: tex('sched', function () { return P.sign('TONIGHT', '#141a30', '#ffd36a', 512, 180, 'bold 84px Georgia, serif'); }) })); onFace(sf, sch, 2.4); add(sch); } }
      }
    }
    if (t === 'corridor') {
      var words = ['EMPLOYEES ONLY', 'LAUNDRY', 'RECORDS', 'ASTRONOMY', 'ENVIRONMENT', 'LOST & FOUND', 'ICE MACHINE', 'NO GUESTS'];
      var sfaces = wallFaces(); sfaces.sort(function () { return r() - 0.5; });
      for (var s2 = 0; s2 < Math.min(sfaces.length, Math.round(sfaces.length * 0.22)); s2++) {
        var f2 = sfaces[s2]; used[faceKey(f2)] = true; var wd = words[s2 % words.length];
        var sgn = plane(2.2, 0.55, new THREE.MeshBasicMaterial({ map: tex('sg' + wd, function () { return P.sign(wd, '#16204a', '#e8c070', 640, 160, 'bold 68px Georgia, serif'); }) }));
        onFace(f2, sgn, 2.72); add(sgn);
      }
      M.rooms.forEach(function (rm) { var cx = (rm.x + 0.3) * CELL, cz = (rm.y + 0.3) * CELL; pottedPlant(cx, cz); });
      for (var pp = 0; pp < 5; pp++) { var px2 = Math.floor(r() * M.W), py2 = Math.floor(r() * M.H); if (M.wingOf[py2 * M.W + px2] >= 0) continue; var c2 = cellC(px2, py2); pottedPlant(c2.x + 1.2, c2.z + 1.2); }
    }
    if (t === 'atrium') {
      var screens = [];
      M.rooms.forEach(function (rm, k) {
        var cx = (rm.x + rm.w / 2) * CELL, cz = (rm.y + rm.h / 2) * CELL;
        pedestal(cx - 1.2, cz, ['sphere', 'cone', 'cube'][k % 3], k + 1);
        tv(cx + 1.3, cz + 0.4, k);
      });
      var tf = wallFaces(); tf.sort(function () { return r() - 0.5; });
      for (var q = 0; q < Math.min(6, tf.length); q++) { var f3 = tf[q]; used[faceKey(f3)] = true; var big = frameAround(f3, 2.2, 1.4, 1.75, screenMat(q)); add(big); }
    }
    if (t === 'pavilion') {
      M.rooms.forEach(function (rm, k) {
        var cx = (rm.x + rm.w / 2) * CELL, cz = (rm.y + rm.h / 2) * CELL;
        table(cx, cz); diamond(cx, cz);
        pottedPlant((rm.x + 0.25) * CELL, (rm.y + 0.25) * CELL, true);
      });
    }
    if (t === 'terrace') {
      M.rooms.forEach(function (rm, k) {
        var cx = (rm.x + rm.w / 2) * CELL, cz = (rm.y + rm.h / 2) * CELL;
        if (k % 2 === 0) { mound(cx, cz); tree(cx, cz); } else fountain(cx, cz);
      });
      for (var fl = 0; fl < 10; fl++) { var fx = Math.floor(r() * M.W), fy = Math.floor(r() * M.H); if (M.wingOf[fy * M.W + fx] >= 0) continue; var fc = cellC(fx, fy); flowers(fc.x + (r() - 0.5) * 2, fc.z + (r() - 0.5) * 2, 0.6); }
    }
    if (t === 'meadow') {
      for (var b2 = 0; b2 < M.W * M.H * 0.5; b2++) { var bx = Math.floor(r() * M.W), by = Math.floor(r() * M.H); var bc = cellC(bx, by); bush(bc.x + (r() - 0.5) * 2.6, bc.z + (r() - 0.5) * 2.6); }
      M.rooms.forEach(function (rm) { tree((rm.x + rm.w / 2) * CELL, (rm.y + rm.h / 2) * CELL); });
    }
    if (t === 'sunset') {
      /* your images line the walls near the exit; red EXIT signs everywhere point nowhere */
      var nf = wallFaces(); nf.sort(function () { return r() - 0.5; });
      for (var e2 = 0; e2 < Math.min(nf.length, 10); e2++) {
        var f4 = nf[e2]; used[faceKey(f4)] = true;
        if (e2 % 2 === 0) { var es = plane(1.0, 0.36, new THREE.MeshBasicMaterial({ map: tex('exitsign', function () { return P.sign('EXIT', '#b80d0d', '#ff3a3a', 384, 134, 'bold 92px Arial Black, Arial, sans-serif'); }) })); onFace(f4, es, 2.75); add(es); }
        else { var im2 = userTex(e2); var fr3 = frameAround(f4, 1.3, 0.98, 1.6, new THREE.MeshBasicMaterial({ map: im2 || tex('paint' + e2, function () { return P.painting(L.seed + e2); }) })); add(fr3); }
      }
      M.rooms.forEach(function (rm) { tree((rm.x + rm.w / 2) * CELL, (rm.y + rm.h / 2) * CELL, true); });
    }

    /* ---- prop makers */
    function fountain(x, z) {
      var basin = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 0.45, 28), phong(0xe8e6e0, { shininess: 40 })); basin.position.set(x, 0.22, z); add(basin);
      var water = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.05, 28), phong(0x6ae0f0, { emissive: 0x1a6a7a, transparent: true, opacity: 0.85, shininess: 120 })); water.position.set(x, 0.42, z); add(water, true);
      var n = 120, pos = new Float32Array(n * 3), geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      var pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xdff8ff, size: 0.07, transparent: true, opacity: 0.85 })); add(pts, true);
      var seeds = []; for (var i = 0; i < n; i++) seeds.push([r() * Math.PI * 2, r(), 0.5 + r() * 0.5]);
      anim.push(function (tt) {
        for (var i = 0; i < n; i++) { var s = seeds[i], ph = (tt * 0.6 + s[1]) % 1, rr = ph * 0.9 * s[2]; pos[i * 3] = x + Math.cos(s[0]) * rr; pos[i * 3 + 1] = 0.45 + Math.sin(ph * Math.PI) * 1.5 * s[2]; pos[i * 3 + 2] = z + Math.sin(s[0]) * rr; }
        geo.attributes.position.needsUpdate = true;
      });
      circle(x, z, 1.4);
    }
    function spiral(x, z) {
      var m = phong(0xf4f4f4, { shininess: 60 }), rail = phong(0x7a4a2a, { shininess: 80 });
      for (var i = 0; i < 22; i++) { var a = i * 0.42, st = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.38), m); st.position.set(x + Math.cos(a) * 0.62, 0.15 + i * 0.14, z + Math.sin(a) * 0.62); st.rotation.y = -a; add(st); }
      var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), rail); pole.position.set(x, 1.6, z); add(pole);
      circle(x, z, 1.3);
    }
    function pottedPlant(x, z, gold) {
      var pot = new THREE.Mesh(gold ? new THREE.BoxGeometry(0.6, 0.6, 0.6) : new THREE.CylinderGeometry(0.3, 0.24, 0.5, 12), gold ? phong(0xffffff, { map: tex('gp', function () { return P.checker('#e0b040', '#6a4a10', 4, 128, 95); }), shininess: 90 }) : phong(0x4a2a1a, { shininess: 20 }));
      pot.position.set(x, gold ? 0.3 : 0.25, z); add(pot);
      var leafM = phong(0x3a9a4a, { side: THREE.DoubleSide, shininess: 30 });
      for (var i = 0; i < 7; i++) { var lf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.9 + r() * 0.5, 4), leafM); var a = i / 7 * Math.PI * 2; lf.position.set(x + Math.cos(a) * 0.12, 0.9, z + Math.sin(a) * 0.12); lf.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); add(lf); }
      if (!gold) for (var k = 0; k < 4; k++) { var fl2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 0), phong(0xd070e0, { emissive: 0x401040 })); fl2.position.set(x + (r() - 0.5) * 0.5, 1.2 + r() * 0.4, z + (r() - 0.5) * 0.5); add(fl2); }
      circle(x, z, 0.4);
    }
    function pedestal(x, z, kind, num) {
      var pd = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.7), phong(0xdcdaf0, { shininess: 50 })); pd.position.set(x, 0.55, z); add(pd);
      var top = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.08, 0.86), phong(0x2a2a3a)); top.position.set(x, 1.12, z); add(top);
      var numS = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: tex('num' + num, function () { var c = canvas(128, 128), xx = c.getContext('2d'); xx.font = 'bold 110px Georgia, serif'; xx.textAlign = 'center'; xx.textBaseline = 'middle'; xx.fillStyle = '#3aa0b0'; xx.fillText(String(num), 64, 70); return c; }), transparent: true }));
      numS.position.set(x, 0.75, z + 0.352); add(numS);
      var geo = kind === 'sphere' ? new THREE.SphereGeometry(0.42, 24, 16) : kind === 'cone' ? new THREE.ConeGeometry(0.3, 0.6, 24) : new THREE.BoxGeometry(0.5, 0.5, 0.5);
      var col = kind === 'sphere' ? 0x3adc6a : kind === 'cone' ? 0xe02020 : 0x6a5ad8;
      var obj = new THREE.Mesh(geo, phong(col, { shininess: 120, specular: 0xffffff, transparent: kind === 'sphere', opacity: 0.8 }));
      obj.position.set(x, 1.7, z); add(obj);
      anim.push(function (tt) { obj.rotation.y = tt * 0.8; obj.position.y = 1.7 + Math.sin(tt * 1.5 + num) * 0.1; });
      circle(x, z, 0.5);
    }
    function screenMat(i) {
      var c = canvas(160, 120), x = c.getContext('2d'), tx = new THREE.CanvasTexture(c); tx.encoding = THREE.sRGBEncoding;
      var m = new THREE.MeshBasicMaterial({ map: tx });
      var last = -1;
      anim.push(function (tt) {
        var k = Math.floor(tt * 0.25 + i * 1.7);
        var im = G.myImages.length ? G.myImages[(k + i) % G.myImages.length] : null;
        if (im && im.tex) { if (m.map !== im.tex) m.map = im.tex; return; }
        if (m.map !== tx) m.map = tx;
        if (Math.floor(tt * 12) === last) return; last = Math.floor(tt * 12);
        if (k % 3 === 0) {   /* static */
          var id = x.createImageData(160, 120), d = id.data; for (var p = 0; p < d.length; p += 4) { var v = Math.random() * 255; d[p] = d[p + 1] = d[p + 2] = v; d[p + 3] = 255; } x.putImageData(id, 0, 0);
        } else {   /* test pattern / the painting channel */
          var bars = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
          if (k % 3 === 1) { bars.forEach(function (b, j) { x.fillStyle = b; x.fillRect(j * 160 / 7, 0, 160 / 7 + 1, 90); }); x.fillStyle = '#111'; x.fillRect(0, 90, 160, 30); x.fillStyle = '#fff'; x.font = 'bold 14px Arial'; x.fillText('TRUST YOUR TV', 22, 110); }
          else x.drawImage(P.painting(L.seed + (k % 5)), 0, 0, 160, 120);
        }
        tx.needsUpdate = true;
      });
      return m;
    }
    function tv(x, z, k) {
      var stand = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.6), phong(0x3a3a4a)); stand.position.set(x, 0.4, z); add(stand);
      var body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.8), phong(0x2a2a30, { shininess: 50 })); body.position.set(x, 1.2, z); add(body);
      var scr = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.62), screenMat(k + 3)); scr.position.set(x, 1.22, z + 0.405); add(scr);
      circle(x, z, 0.6);
    }
    function table(x, z) {
      var top = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.08, 24), phong(0x9a9aa8, { map: tex('gm2', function () { return P.marble('#d0d0d8', '#7a7a88', '#3a3a44', 96, 256); }), shininess: 90 })); top.position.set(x, 0.95, z); add(top);
      var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.95, 10), phong(0xd8a830, { shininess: 100, specular: 0xffe8a0 })); leg.position.set(x, 0.47, z); add(leg);
      var bowl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), phong(0xe0b030, { side: THREE.DoubleSide, shininess: 120, specular: 0xfff0b0 })); bowl.position.set(x, 1.28, z); add(bowl);
      circle(x, z, 0.85);
    }
    function diamond(x, z) {
      var d = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), phong(0x6a8ad8, { transparent: true, opacity: 0.75, shininess: 140, specular: 0xffffff, flatShading: true })); d.scale.y = 0.6; d.position.set(x, 2.8, z); add(d);
      anim.push(function (tt) { d.rotation.y = tt * 0.5; });
    }
    function mound(x, z) {
      var m = new THREE.Mesh(new THREE.SphereGeometry(1.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), lambert(tex('grass', function () { return P.grass(5); }))); m.scale.y = 0.3; m.position.set(x, 0, z); add(m);
      flowers(x, z, 1.3); circle(x, z, 1.5);
    }
    function flowers(x, z, rad) {
      var n = 60, pos = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) { var a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad; pos[i * 3] = x + Math.cos(a) * d; pos[i * 3 + 1] = 0.25 + r() * 0.35; pos[i * 3 + 2] = z + Math.sin(a) * d; }
      var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xff4ad0, size: 0.13 })));
      var g2 = g.clone(); add(new THREE.Points(g2, new THREE.PointsMaterial({ color: 0x2a8a3a, size: 0.09 })));
    }
    function tree(x, z, dusk) {
      var trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 2.2, 8), phong(dusk ? 0x3a2418 : 0x6a5038)); trunk.position.set(x, 1.1, z); add(trunk);
      var lm = phong(dusk ? 0x7a5a2a : 0x2f8a3a, { flatShading: true, shininess: 10 });
      for (var i = 0; i < 9; i++) { var b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42 + r() * 0.3, 0), lm); b.position.set(x + (r() - 0.5) * 1.3, 2.2 + r() * 1.0, z + (r() - 0.5) * 1.3); add(b); }
      circle(x, z, 0.35);
    }
    function bush(x, z) {
      var b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3 + r() * 0.2, 0), phong(0x4a8a3a, { flatShading: true, shininess: 5 })); b.position.set(x, 0.2, z); b.scale.y = 0.7; add(b);
    }
  }

  /* ---------------------------------------------------------------- the game */
  function Game(win) {
    var self = this;
    this.win = win; win.game = this;
    win.el.classList.add('es-win');
    var bar = win.menu([
      { label: '&Game', items: [
        { label: '&New Game', act: function () { self.newGame(); } },
        { label: '&Simulations…', act: function () { self.levelSelect(); } },
        { label: '&Restart Simulation', key: 'F2', act: function () { self.load(self.levelIndex); } },
        '-',
        { label: 'E&xit', act: function () { win.close(); } }
      ] },
      { label: '&Images', items: [
        { label: '&Hang an Image Here…', key: 'E', dis: function () { return !self.near || self.near.type !== 'frame'; }, act: function () { self.pickImage(); } },
        { label: '&My Images…', act: function () { self.myImagesDialog(); } }
      ] },
      { label: '&Options', items: [
        { label: '&Music', chk: function () { return store.opts.music; }, act: function () { store.opts.music = !store.opts.music; persist(); if (store.opts.music) self.musicPlay(); else self.musicStop(); } },
        { label: '&Classic Pixels', chk: function () { return store.opts.chunky; }, act: function () { store.opts.chunky = !store.opts.chunky; persist(); self.resize(); } },
        { label: '&Invert Look', chk: function () { return store.opts.invert; }, act: function () { store.opts.invert = !store.opts.invert; persist(); } },
        { label: '&Wizard Talks', chk: function () { return store.opts.talk; }, act: function () { store.opts.talk = !store.opts.talk; persist(); } }
      ] },
      { label: '&Help', items: [
        { label: '&How to Play', act: function () { self.help(); } },
        '-',
        { label: '&About Exit Simulations…', act: function () { self.about(); } }
      ] }
    ]);
    bar.addEventListener('pointerdown', function () { self.keys = {}; });
    win.body.innerHTML =
      '<div class="es-view"><canvas class="es-cv"></canvas>' +
      '<div class="es-hud"><div class="es-say"></div><div class="es-prompt"></div><div class="es-card"></div><div class="es-load"><div class="es-load-box u98-raised"><div class="t">Loading simulation…</div><div class="es-bar u98-sunken"><i></i></div></div></div></div>' +
      '<div class="es-touch"><div class="es-stick"><i></i></div><button type="button" class="u98-btn es-use">USE</button><button type="button" class="u98-btn es-hint" aria-label="Ask the wizard"></button></div>' +
      '<input type="file" accept="image/*" class="es-file" hidden></div>';
    this.view = win.body.querySelector('.es-view');
    if (U.touch) this.view.classList.add('touch');
    this.cv = win.body.querySelector('.es-cv');
    this.say = win.body.querySelector('.es-say');
    this.prompt = win.body.querySelector('.es-prompt');
    this.cardEl = win.body.querySelector('.es-card');
    this.loadEl = win.body.querySelector('.es-load');
    this.file = win.body.querySelector('.es-file');
    this.st = win.status([{ text: 'SIMULATION 01' }, { text: '☼ 0/0', w: 64 }, { text: '▣ 0/0', w: 64 }, { text: '♪', w: 170 }]);
    this.keys = {}; this.look = { yaw: 0, pitch: 0 };
    this.levelIndex = Math.min(store.level, store.unlocked) - 1;
    if (!U.isSmall()) { var s = win.deskSize(); win.el.style.width = Math.min(s.w - 20, 660) + 'px'; win.el.style.height = Math.min(s.h - 20, 520) + 'px'; }
    win.on('key', function (e) { return self.keyDown(e); });
    this.onKeyUp = function (e) { self.keys[e.code] = false; };
    document.addEventListener('keyup', this.onKeyUp);
    win.on('blur', function () { self.keys = {}; });
    win.on('min', function () { self.musicStop(); });
    win.on('restore', function () { self.musicPlay(); });
    win.on('hidden', function () { self.keys = {}; });
    win.on('resize', function () { self.resize(); });
    win.on('mute', function (m) { if (self.audio) self.audio.muted = m; });
    win.on('close', function () { self.destroy(); });
    this.bindInput();
    this.setProgress(0.15);
    loadThree(function (ok) {
      if (self.closed) return;
      if (!ok) {
        self.loadEl.querySelector('.t').textContent = 'Couldn’t load the 3D engine. Check your connection.';
        U.dialog({ title: 'Exit Simulations', icon: 'error', text: 'The simulation engine could not be loaded. Check your internet connection and try again.', buttons: [{ label: 'OK', def: true }] }, win);
        return;
      }
      self.setProgress(0.5);
      try {
        self.renderer = new THREE.WebGLRenderer({ canvas: self.cv, antialias: false, powerPreference: 'high-performance' });
      } catch (e) {
        self.loadEl.querySelector('.t').textContent = 'Your browser can’t run 3D (WebGL is off).';
        return;
      }
      self.renderer.outputEncoding = THREE.sRGBEncoding;
      self.camera = new THREE.PerspectiveCamera(70, 4 / 3, 0.05, 700);
      self.wizTex = {};
      ['idle', 'idle2', 'walk1', 'walk2', 'point'].forEach(function (p) { [false, true].forEach(function (f) { var t = new THREE.CanvasTexture(wizardCanvas(p, f)); t.encoding = THREE.sRGBEncoding; self.wizTex[p + (f ? 'F' : '')] = t; }); });
      self.loadImages().then(function () { if (!self.closed) { self.resize(); self.load(self.levelIndex); self.last = performance.now(); self.loop(); } });
    });
  }
  var G = Game.prototype;

  G.setProgress = function (f) { var i = this.loadEl.querySelector('i'); if (i) i.style.width = Math.round(f * 100) + '%'; };
  G.loadImages = function () {
    var self = this;
    return DB.all().then(function (list) {
      self.myImages = [];
      return Promise.all((list || []).map(function (it) { return self.makeImage(it.k, it.v).then(function (im) { if (im) self.myImages.push(im); }); }));
    });
  };
  G.makeImage = function (key, dataURL) {
    return new Promise(function (res) {
      if (!dataURL) return res(null);
      var img = new Image();
      img.onload = function () { var t = new THREE.Texture(img); t.encoding = THREE.sRGBEncoding; t.needsUpdate = true; res({ key: key, url: dataURL, tex: t, img: img }); };
      img.onerror = function () { res(null); };
      img.src = dataURL;
    });
  };
  G.imageFor = function (key) { return (this.myImages || []).filter(function (m) { return m.key === key; })[0]; };

  /* ---- level loading */
  G.load = function (index) {
    var self = this;
    this.loadEl.style.display = 'flex'; this.setProgress(0.6);
    this.keys = {}; this.won = false; this.ending = null; this.exitPos = null; this.near = null; this.hint = null;
    this.prompt.classList.remove('on'); this.view.querySelector('.es-use').classList.remove('on'); this.say.classList.remove('on');
    if (this.scene) this.disposeScene();
    var L = index === 8 ? ARCHIVE : LEVELS[index];
    this.levelIndex = index; this.L = L;
    if (index < 8) { store.level = index + 1; persist(); }
    setTimeout(function () {
      if (self.closed) return;
      var M = self.M = makeMaze(L);
      self.levelStart = performance.now();
      buildWorld(self, L, M);
      decorate(self, L, M);
      self.wings.forEach(function (w) { var im = self.imageFor(w.id); if (im && store.hung[w.id]) self.openWing(w, im, true); });
      /* player */
      var sc = self.cellC(M.start.x, M.start.y);
      self.pos = { x: sc.x, z: sc.z };
      var sd = M.startDir === undefined ? 0 : M.startDir;
      self.look.yaw = Math.atan2(-DIRS[sd].x, -DIRS[sd].y); self.look.pitch = 0;
      /* wizard */
      var wm = new THREE.SpriteMaterial({ map: self.wizTex.idle, transparent: true, alphaTest: 0.08 });
      self.wiz = new THREE.Sprite(wm); self.wiz.scale.set(1.18, 1.77, 1); self.wiz.center.set(0.5, 0);
      self.wizM = new THREE.Sprite(wm); self.wizM.scale.set(1.18, -1.77, 1); self.wizM.center.set(0.5, 0);
      self.wp = { x: sc.x - DIRS[sd].x * 1.4 + 0.5, z: sc.z - DIRS[sd].y * 1.4 + 0.5, vx: 0, vz: 0, face: false };
      self.scene.add(self.wiz); if (self.theme.gloss) self.scene.add(self.wizM);
      self.trail = [{ x: self.pos.x, z: self.pos.z }];
      self.hint = null; self.lineT = 0; self.sayUntil = 0; self.lineIdx = 0;
      self.loadEl.style.display = 'none';
      self.showCard();
      self.updateStatus();
      self.musicPlay(true);
      setTimeout(function () { self.speak(L.lines[0], 4200); }, 2600);
      self.resize();
    }, 30);
  };
  G.disposeScene = function () {
    this.scene.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) { m.dispose(); }); } });
    disposeTextures();
    this.scene = null;
  };
  G.showCard = function () {
    var L = this.L, n = this.levelIndex < 8 ? ('SIMULATION 0' + (this.levelIndex + 1)) : 'BONUS';
    this.cardEl.innerHTML = '<div class="n">' + n + '</div><div class="h">' + U.esc(L.title) + '</div><div class="s">♪ from SUN’S GETTING LOW</div>';
    var c = this.cardEl; c.classList.remove('go'); void c.offsetWidth; c.classList.add('go');
  };
  G.updateStatus = function () {
    var L = this.L, wings = this.wings || [];
    this.st[0].textContent = this.levelIndex < 8 ? ('SIMULATION 0' + (this.levelIndex + 1) + ' · ' + L.title) : L.title;
    this.st[1].textContent = '☼ ' + shardCount() + '/' + TOTAL_SHARDS;
    this.st[2].textContent = '▣ ' + wings.filter(function (w) { return w.open; }).length + '/' + wings.length;
    this.st[3].textContent = '♪ ' + (this.L.archive ? 'SUN’S GETTING LOW' : L.title.toLowerCase());
  };

  /* ---- music: the level's song */
  G.musicPlay = function (restart) {
    if (!store.opts.music || !this.L) { this.musicStop(); return; }
    if (!this.audio) { this.audio = new Audio(); this.audio.loop = true; this.audio.volume = 0.6; var self = this; this.audio.addEventListener('ended', function () { if (self.L && self.L.archive) self.nextArchiveTrack(); }); }
    var src = ALBUM + (this.L.archive ? LEVELS[this.archiveTrack || 0].file : this.L.file);
    this.audio.loop = !this.L.archive;
    if (this.audio.getAttribute('src') !== src) this.audio.setAttribute('src', src);
    else if (restart) { try { this.audio.currentTime = 0; } catch (e) {} }
    this.audio.muted = U.muted;
    U.pauseRadio();
    var p = this.audio.play(); if (p && p.catch) p.catch(function () {});
  };
  G.nextArchiveTrack = function () { this.archiveTrack = ((this.archiveTrack || 0) + 1) % 8; this.musicPlay(true); };
  G.musicStop = function () { if (this.audio && !this.audio.paused) this.audio.pause(); };

  /* ---- input */
  G.keyDown = function (e) {
    if (!this.scene) return false;
    var k = e.code;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'KeyQ', 'KeyZ'].indexOf(k) >= 0) { this.keys[k] = true; U.audioUnlock(); this.musicKick(); return true; }
    if (k === 'KeyE' || k === 'Space' || k === 'Enter') { this.use(); return true; }
    if (k === 'KeyH') { this.askHint(); return true; }
    if (k === 'F2') { this.load(this.levelIndex); return true; }
    return false;
  };
  G.musicKick = function () { if (store.opts.music && this.audio && this.audio.paused && !this.win.minimized) this.musicPlay(); };
  G.bindInput = function () {
    var self = this, cv = this.cv, drag = null;
    cv.addEventListener('pointerdown', function (e) {
      U.audioUnlock(); self.musicKick();
      drag = { x: e.clientX, y: e.clientY, moved: 0, id: e.pointerId, t: performance.now() };
      try { cv.setPointerCapture(e.pointerId); } catch (er) {}
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      var s = U.touch ? 0.0065 : 0.0045;
      self.look.yaw -= dx * s;
      self.look.pitch = clamp(self.look.pitch - dy * s * (store.opts.invert ? -1 : 1), -0.6, 0.6);
    });
    function up(e) {
      if (!drag || drag.id !== e.pointerId) return;
      if (drag.moved < 8 && performance.now() - drag.t < 400 && self.near) self.use();   /* tap / click to use */
      drag = null;
    }
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', function () { drag = null; });
    /* virtual stick */
    var stick = this.view.querySelector('.es-stick'), knob = stick.querySelector('i'), sp = null;
    this.stick = { x: 0, y: 0 };
    stick.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); U.audioUnlock(); self.musicKick(); sp = { id: e.pointerId }; try { stick.setPointerCapture(e.pointerId); } catch (er) {} move(e); });
    function move(e) {
      if (!sp || sp.id !== e.pointerId) return;
      var r = stick.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, R = r.width / 2;
      var dx = (e.clientX - cx) / R, dy = (e.clientY - cy) / R, l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; }
      self.stick.x = dx; self.stick.y = dy; knob.style.transform = 'translate(' + (dx * R * 0.6) + 'px,' + (dy * R * 0.6) + 'px)';
    }
    stick.addEventListener('pointermove', move);
    function end() { sp = null; self.stick.x = self.stick.y = 0; knob.style.transform = ''; }
    stick.addEventListener('pointerup', end); stick.addEventListener('pointercancel', end);
    var useB = this.view.querySelector('.es-use'), hintB = this.view.querySelector('.es-hint');
    useB.addEventListener('click', function (e) { e.stopPropagation(); self.use(); });
    hintB.appendChild(U.iconEl('icon_wizard', 24));
    hintB.addEventListener('click', function (e) { e.stopPropagation(); self.askHint(); });
    this.file.addEventListener('change', function () { var f = self.file.files && self.file.files[0]; self.file.value = ''; if (f) self.hangFile(f); });
  };

  G.resize = function () {
    if (!this.renderer) return;
    var w = Math.max(80, this.view.clientWidth), h = Math.max(60, this.view.clientHeight);
    var pr = store.opts.chunky ? Math.min(1, 460 / w) : Math.min(U.dpr(), 1.6);
    this.renderer.setPixelRatio(pr); this.renderer.setSize(w, h, false);
    this.cv.style.imageRendering = store.opts.chunky ? 'pixelated' : 'auto';
    var asp = w / h; this.camera.aspect = asp;
    /* keep a usable side view on tall phone screens */
    this.camera.fov = asp >= 1 ? 70 : clamp(2 * Math.atan(Math.tan(37 * Math.PI / 180) / asp) * 180 / Math.PI, 70, 96);
    this.camera.updateProjectionMatrix();
  };

  /* ---- collisions */
  G.collide = function (x, z) {
    var cs = this.colliders, R = RAD;
    for (var it = 0; it < 2; it++) for (var i = 0; i < cs.length; i++) {
      var b = cs[i]; if (b.off) continue;
      var px = clamp(x, b.x0, b.x1), pz = clamp(z, b.z0, b.z1), dx = x - px, dz = z - pz, d2 = dx * dx + dz * dz;
      if (d2 < R * R) {
        if (d2 > 1e-9) { var d = Math.sqrt(d2), k = (R - d) / d; x += dx * k; z += dz * k; }
        else { var l = x - b.x0, rr = b.x1 - x, t = z - b.z0, bb = b.z1 - z, m = Math.min(l, rr, t, bb); if (m === l) x = b.x0 - R; else if (m === rr) x = b.x1 + R; else if (m === t) z = b.z0 - R; else z = b.z1 + R; }
      }
    }
    return { x: x, z: z };
  };

  /* ---- frames: hang your image */
  G.use = function () {
    var n = this.near; if (!n) return;
    if (n.type === 'frame') this.pickImage(n.wing);
  };
  G.pickImage = function () {
    if (!this.near || this.near.type !== 'frame') return;
    this.pending = this.near.wing;
    this.keys = {};
    try { this.file.click(); } catch (e) {}
  };
  G.hangFile = function (f) {
    var self = this, w = this.pending; if (!w) return;
    if (!/^image\//.test(f.type)) { U.dialog({ title: 'Exit Simulations', icon: 'warn', text: 'That file isn’t an image. Try a JPG, PNG, GIF or WebP.', buttons: [{ label: 'OK', def: true }] }, this.win); return; }
    var rd = new FileReader();
    rd.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1024, s = Math.min(1, max / Math.max(img.width, img.height)), c = canvas(Math.max(1, Math.round(img.width * s)), Math.max(1, Math.round(img.height * s)));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        var url; try { url = c.toDataURL('image/jpeg', 0.86); } catch (e) { url = rd.result; }
        DB.set(w.id, url).then(function () {
          self.makeImage(w.id, url).then(function (im) {
            if (!im || self.closed) return;
            self.myImages = self.myImages.filter(function (m) { return m.key !== w.id; }); self.myImages.push(im);
            store.hung[w.id] = true; persist();
            self.openWing(w, im, false);
          });
        });
      };
      img.onerror = function () { U.dialog({ title: 'Exit Simulations', icon: 'error', text: 'The simulation couldn’t read that image.', buttons: [{ label: 'OK', def: true }] }, self.win); };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  };
  /* put the image in the frame, paper the wing with it, and dissolve the veil */
  G.openWing = function (w, im, instant) {
    if (w.open) return;
    w.open = true;
    var fit = coverTex(im, 4 / 3), pic = w.frame.userData.pic;
    pic.material = new THREE.MeshBasicMaterial({ map: fit });
    var wm = this.wingMeshes[w.index];
    if (wm) { var paper = new THREE.MeshLambertMaterial({ map: coverTex(im, (CELL - T) / WALL_H) }); wm.material = paper; if (wm.userData.mirror) wm.userData.mirror.material = paper; }
    w.collider.off = true;
    if (instant) { w.veil.visible = false; }
    else {
      U.sfx('ding'); setTimeout(function () { U.sfx('ff'); }, 250);
      var t0 = performance.now(), v = w.veil, m = w.veilMat;
      this.anim.push(function () { var k = (performance.now() - t0) / 1400; if (k >= 1) { v.visible = false; return; } m.opacity = 0.85 * (1 - k); v.scale.y = 1 + k * 0.4; v.position.y = (this.WH || WALL_H) / 2 + k * 1.2; }.bind(this));
      this.speak(HUNG_LINES[Math.floor(Math.random() * HUNG_LINES.length)], 3000);
    }
    this.updateStatus();
  };
  function coverTex(im, aspect) {
    var iw = im.img.width, ih = im.img.height, ia = iw / ih, t = im.tex.clone(); t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (ia > aspect) { var f = aspect / ia; t.repeat.set(f, 1); t.offset.set((1 - f) / 2, 0); } else { var g = ia / aspect; t.repeat.set(1, g); t.offset.set(0, (1 - g) / 2); }
    return t;
  }

  /* ---- the wizard */
  G.speak = function (text, ms) {
    if (!store.opts.talk || !text) return;
    this.say.textContent = text; this.say.classList.add('on'); this.sayUntil = performance.now() + (ms || 3500);
  };
  G.askHint = function () {
    if (!this.M || !this.M.bfs) return;
    var M = this.M, cx = clamp(Math.floor(this.pos.x / CELL), 0, M.W - 1), cy = clamp(Math.floor(this.pos.z / CELL), 0, M.H - 1);
    var self = this, block = function (j) { var wi = M.wingOf[j]; return wi >= 0 && !(self.wings[wi] && self.wings[wi].open); };
    var b = M.bfs(cx, cy, block), target = null;
    /* nearest unopened frame first, then the exit */
    var best = 1e9;
    this.wings.forEach(function (w) { if (w.open) { if (!w.got) { var sj = Math.floor(w.shardAt.z / CELL) * M.W + Math.floor(w.shardAt.x / CELL); if (b.dist[sj] >= 0 && b.dist[sj] < best) { best = b.dist[sj]; target = sj; } } return; } var fj = Math.floor(w.pos.z / CELL) * M.W + Math.floor(w.pos.x / CELL); if (b.dist[fj] >= 0 && b.dist[fj] < best) { best = b.dist[fj]; target = fj; } });
    if (target === null && M.exitI !== undefined) target = M.exitI;
    if (target === null) { this.speak(this.L.lines[Math.floor(Math.random() * this.L.lines.length)], 3500); return; }
    var path = []; for (var p = target; p >= 0; p = b.par[p]) path.unshift(p);
    var steps = path.slice(0, 4).map(function (j) { return self.cellC(j % M.W, (j / M.W) | 0); });
    if (!steps.length) { this.speak(target === M.exitI ? 'the exit is right here.' : FRAME_LINES[0], 3000); return; }
    this.hint = { steps: steps, until: performance.now() + 9000 };
    this.speak(HINT_LINES[Math.floor(Math.random() * HINT_LINES.length)], 3000);
  };
  G.updateWizard = function (dt, now) {
    var wp = this.wp, target;
    if (this.hint && now < this.hint.until) {
      var st = this.hint.steps, last = st[st.length - 1];
      target = last;
      for (var i = 0; i < st.length; i++) { var d0 = Math.hypot(st[i].x - wp.x, st[i].z - wp.z); if (d0 > 0.4) { target = st[i]; break; } }
      if (Math.hypot(this.pos.x - last.x, this.pos.z - last.z) < 1.4) this.hint = null;
    } else {
      this.hint = null;
      /* follow the breadcrumb trail, staying a couple of steps behind */
      var tr = this.trail, idx = tr.length - 1, acc = 0;
      while (idx > 0 && acc < 2.0) { acc += Math.hypot(tr[idx].x - tr[idx - 1].x, tr[idx].z - tr[idx - 1].z); idx--; }
      target = tr[idx];
      if (Math.hypot(this.pos.x - wp.x, this.pos.z - wp.z) < 1.5) target = { x: wp.x, z: wp.z };
    }
    var dx = target.x - wp.x, dz = target.z - wp.z, dist = Math.hypot(dx, dz), sp = this.hint ? 3.4 : Math.min(4.2, 1.2 + dist * 1.4);
    var mv = Math.min(dist, sp * dt);
    if (dist > 0.01) { wp.x += dx / dist * mv; wp.z += dz / dist * mv; }
    var moving = mv > 0.004;
    /* face the direction of travel on screen */
    var cam = this.camera, rx = Math.cos(this.look.yaw), rz = -Math.sin(this.look.yaw);
    if (moving) wp.face = (dx * rx + dz * rz) > 0;
    else { var tpx = this.pos.x - wp.x, tpz = this.pos.z - wp.z; wp.face = (tpx * rx + tpz * rz) > 0; }
    var pose = this.hint && !moving ? 'point' : moving ? (Math.floor(now / 170) % 2 ? 'walk1' : 'walk2') : (Math.floor(now / 600) % 2 ? 'idle' : 'idle2');
    var key = pose + (wp.face ? 'F' : '');
    if (this.wiz.material.map !== this.wizTex[key]) { this.wiz.material.map = this.wizTex[key]; this.wiz.material.needsUpdate = true; }
    var bob = moving ? 0 : Math.sin(now / 400) * 0.03;
    this.wiz.position.set(wp.x, bob, wp.z);
    this.wizM.position.set(wp.x, -bob, wp.z);
    /* speech bubble follows his head */
    if (this.say.classList.contains('on')) {
      if (now > this.sayUntil) this.say.classList.remove('on');
      else {
        var v = new THREE.Vector3(wp.x, 1.75, wp.z).project(cam);
        var vis = v.z < 1 && Math.hypot(this.pos.x - wp.x, this.pos.z - wp.z) < 14;
        if (!vis) { v.x = 0; v.y = 0.7; }
        this.say.style.left = (clamp(v.x, -0.8, 0.8) * 0.5 + 0.5) * 100 + '%';
        this.say.style.top = (clamp(-v.y, -0.95, 0.6) * 0.5 + 0.5) * 100 + '%';
      }
    }
    /* idle chatter */
    this.lineT += dt;
    if (this.lineT > 26 && store.opts.talk) { this.lineT = 0; this.lineIdx = (this.lineIdx + 1) % this.L.lines.length; this.speak(this.L.lines[this.lineIdx], 4200); }
  };

  /* ---- main loop */
  G.loop = function () {
    var self = this;
    if (this.closed) return;
    this.raf = requestAnimationFrame(function () { self.loop(); });
    if (this.win.minimized || !this.scene) return;
    var now = performance.now(), dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    var t = (now - this.levelStart) / 1000;
    if (!this.ending) this.step(dt, now);
    for (var i = 0; i < this.anim.length; i++) this.anim[i](t);
    var cam = this.camera;
    cam.position.set(this.pos.x, EYE + (this.bobT ? Math.sin(this.bobT) * 0.035 : 0), this.pos.z);
    cam.rotation.set(this.look.pitch, this.look.yaw, 0, 'YXZ');
    this.renderer.render(this.scene, cam);
    if (this.ending) this.drawEnding(now);
  };
  G.step = function (dt, now) {
    var k = this.keys, active = U.active === this.win;
    var fwd = 0, strafe = 0, turn = 0;
    if (active) {
      if (k.ArrowUp || k.KeyW) fwd += 1;
      if (k.ArrowDown || k.KeyS) fwd -= 1;
      if (k.ArrowLeft) turn += 1;
      if (k.ArrowRight) turn -= 1;
      if (k.KeyA) strafe -= 1;
      if (k.KeyD) strafe += 1;
    }
    if (this.stick && (this.stick.x || this.stick.y)) { fwd += -this.stick.y; turn += -this.stick.x * 0.9; }
    var run = k.ShiftLeft || k.ShiftRight ? 1.7 : 1;
    this.look.yaw += turn * 2.3 * dt;
    var sp = 3.3 * run, sy = Math.sin(this.look.yaw), cy = Math.cos(this.look.yaw);
    var vx = (-sy * fwd + cy * strafe) * sp * dt, vz = (-cy * fwd - sy * strafe) * sp * dt;
    if (vx || vz) {
      var p = this.collide(this.pos.x + vx, this.pos.z + vz);
      var moved = Math.hypot(p.x - this.pos.x, p.z - this.pos.z);
      this.pos.x = p.x; this.pos.z = p.z;
      this.bobT = (this.bobT || 0) + moved * 3.2;
      var lt = this.trail[this.trail.length - 1];
      if (Math.hypot(lt.x - p.x, lt.z - p.z) > 0.3) { this.trail.push({ x: p.x, z: p.z }); if (this.trail.length > 80) this.trail.shift(); }
    }
    this.updateWizard(dt, now);
    this.checkNear();
  };
  G.checkNear = function () {
    var self = this, near = null, px = this.pos.x, pz = this.pos.z, fx = -Math.sin(this.look.yaw), fz = -Math.cos(this.look.yaw);
    this.wings.forEach(function (w) {
      if (!w.open) {
        var dx = w.pos.fx - px, dz = w.pos.fz - pz, d = Math.hypot(dx, dz);
        if (d < 2.6 && (dx * fx + dz * fz) / d > 0.35) near = { type: 'frame', wing: w };
        var vd = Math.hypot(w.door.x - px, w.door.z - pz);
        if (!near && vd < 1.6 && !w.saidVeil) { w.saidVeil = true; self.speak('it’s sealed. the frame nearby wants an image.', 3600); }
      }
      if (w.open && !w.got && Math.hypot(w.shardAt.x - px, w.shardAt.z - pz) < 1.0) {
        w.got = true; w.shard.visible = w.halo.visible = false; store.shards[w.id] = true; persist();
        U.sfx('bottle'); self.speak(SHARD_LINES[Math.floor(Math.random() * SHARD_LINES.length)], 2800); self.updateStatus();
      }
    });
    if (this.near !== near && (!near || !this.near || near.wing !== this.near.wing)) {
      this.near = near;
      this.prompt.textContent = near ? (U.touch ? 'Tap USE to hang your image' : '[E] or click — hang one of your images in this frame') : '';
      this.prompt.classList.toggle('on', !!near);
      this.view.querySelector('.es-use').classList.toggle('on', !!near);
      if (near && !near.wing.saidFrame) { near.wing.saidFrame = true; this.speak(FRAME_LINES[Math.floor(Math.random() * FRAME_LINES.length)], 2800); }
    }
    if (this.exitPos && !this.won) {
      var ex = this.exitPos;
      if (Math.hypot(ex.x - px, ex.z - pz) < 1.05) this.complete();
    }
  };

  /* ---- finishing a simulation */
  G.complete = function () {
    var self = this, idx = this.levelIndex, L = this.L;
    this.won = true; this.keys = {}; this.stick && (this.stick.x = this.stick.y = 0);
    store.cleared[idx + 1] = true; store.unlocked = Math.max(store.unlocked, Math.min(8, idx + 2)); persist();
    U.sfx('level');
    var secs = Math.round((performance.now() - this.levelStart) / 1000), mm = Math.floor(secs / 60), ss = ('0' + secs % 60).slice(-2);
    var opened = this.wings.filter(function (w) { return w.open; }).length;
    if (idx === 7) { this.startEnding(); return; }
    U.dialog({
      title: 'Exit Simulations', icon: 'info',
      html: '<b>SIMULATION 0' + (idx + 1) + ' — ' + U.esc(L.title) + '</b> complete.<br><br>Time: ' + mm + ':' + ss + '<br>Wings opened: ' + opened + ' of ' + this.wings.length + '<br>Sun shards: ' + shardCount() + ' of ' + TOTAL_SHARDS,
      buttons: [{ label: '&Next Simulation', value: 'next', def: true }, { label: '&Stay Here', value: 'stay' }], cancelValue: 'stay', sound: false
    }, this.win).then(function (v) {
      if (self.closed) return;
      if (v === 'next') self.load(idx + 1);
      else { self.won = false; self.pos.x -= self.exitPos.nx * -1.6; self.pos.z -= self.exitPos.nz * -1.6; }
    });
  };
  G.startEnding = function () {
    var c = this.endCv || (this.endCv = document.createElement('canvas'));
    c.className = 'es-end'; this.view.appendChild(c);
    this.ending = { t0: performance.now(), all: shardCount() >= TOTAL_SHARDS };
    if (this.ending.all) { store.archive = true; persist(); }
    this.speak('', 1);
  };
  G.drawEnding = function (now) {
    var c = this.endCv, w = this.view.clientWidth, h = this.view.clientHeight, d = U.dpr();
    if (c.width !== Math.round(w * d)) { c.width = Math.round(w * d); c.height = Math.round(h * d); }
    var x = c.getContext('2d'), t = (now - this.ending.t0) / 1000;
    x.setTransform(d, 0, 0, d, 0, 0);
    drawWallScene(x, w, h, Math.min(1, t / 6));
    x.globalAlpha = Math.min(1, t / 1.2); x.fillStyle = '#000'; x.globalAlpha = Math.max(0, 1 - t / 1.2); x.fillRect(0, 0, w, h); x.globalAlpha = 1;
    var lines = this.ending.all ? ['SUN’S GETTING LOW', 'you found every shard.', 'THE ARCHIVE is open — Game › Simulations'] : ['SUN’S GETTING LOW', 'thanks for visiting.', 'find every sun shard to see where he goes.'];
    x.textAlign = 'center';
    x.font = 'bold ' + Math.round(Math.min(w / 14, 40)) + 'px Georgia, serif';
    x.fillStyle = 'rgba(0,0,0,.5)'; x.fillText(lines[0], w / 2 + 2, h * 0.2 + 2);
    var g = x.createLinearGradient(0, h * 0.14, 0, h * 0.22); g.addColorStop(0, '#fff3c0'); g.addColorStop(1, '#ff9a4a'); x.fillStyle = g; x.globalAlpha = clamp((t - 1.5) / 1.5, 0, 1); x.fillText(lines[0], w / 2, h * 0.2);
    x.font = Math.round(Math.min(w / 30, 18)) + 'px Georgia, serif'; x.fillStyle = '#e8e4ff';
    x.globalAlpha = clamp((t - 3.5) / 1.5, 0, 1); x.fillText(lines[1], w / 2, h * 0.27);
    x.globalAlpha = clamp((t - 6) / 1.5, 0, 1); x.fillText(lines[2], w / 2, h * 0.32);
    x.globalAlpha = 1;
    if (t > 8 && !this.ending.asked) {
      this.ending.asked = true; var self = this;
      U.dialog({ title: 'Exit Simulations', icon: 'info', html: 'You exited every simulation.' + (this.ending.all ? '<br><br><b>THE ARCHIVE</b> is now open. It holds every image you gave the simulation.' : ''), buttons: (this.ending.all ? [{ label: 'Open &Archive', value: 'arc', def: true }] : []).concat([{ label: '&Play Again', value: 'again', def: !this.ending.all }, { label: '&Close', value: 'close' }]), cancelValue: 'close', sound: false }, this.win).then(function (v) {
        if (self.closed) return;
        self.endCv.remove(); self.ending = null;
        if (v === 'arc') self.load(8); else if (v === 'again') self.load(0); else { self.won = false; self.pos.x += self.exitPos.nx * 1.6; self.pos.z += self.exitPos.nz * 1.6; }
      });
    }
  };

  /* ---- menus + dialogs */
  G.newGame = function () {
    var self = this;
    U.dialog({ title: 'Exit Simulations', icon: 'question', text: 'Start over from SIMULATION 01? Your sun shards and opened wings will reset. Your images stay saved in this browser.', buttons: [{ label: 'OK', value: 'ok', def: true }, { label: 'Cancel', value: null }] }, this.win).then(function (v) {
      if (v !== 'ok' || self.closed) return;
      store.unlocked = 1; store.level = 1; store.cleared = {}; store.shards = {}; store.hung = {}; persist();
      self.load(0);
    });
  };
  G.levelSelect = function () {
    var self = this, rows = LEVELS.map(function (L, i) {
      var lock = i + 1 > store.unlocked;
      return '<label class="es-row' + (lock ? ' lock' : '') + '"><input type="radio" name="lv" value="' + i + '"' + (lock ? ' disabled' : '') + (i === self.levelIndex ? ' checked' : '') + '> 0' + (i + 1) + ' · ' + U.esc(L.title) + (store.cleared[i + 1] ? ' ✓' : '') + '</label>';
    }).join('') + (store.archive ? '<label class="es-row"><input type="radio" name="lv" value="8"' + (self.levelIndex === 8 ? ' checked' : '') + '> ★ THE ARCHIVE</label>' : '');
    U.dialog({ title: 'Simulations', html: '<div class="es-list">' + rows + '</div>', buttons: [{ label: 'Go', value: 'go', def: true }, { label: 'Cancel', value: null }],
      collect: function (d) { var r = d.querySelector('input[name=lv]:checked'); return r ? +r.value : null; } }, this.win).then(function (v) {
      if (v === null || v === undefined || self.closed) return;
      self.load(v);
    });
  };
  G.myImagesDialog = function () {
    var self = this, n = (this.myImages || []).length;
    var thumbs = (this.myImages || []).slice(0, 12).map(function (m) { return '<img src="' + m.url + '" alt="">'; }).join('');
    U.dialog({ title: 'My Images', icon: 'info', wide: 360,
      html: (n ? 'You’ve given the simulation <b>' + n + '</b> image' + (n === 1 ? '' : 's') + '. They’re stored only in this browser.<div class="es-thumbs">' + thumbs + '</div>' : 'No images yet. Find an empty frame and press E (or tap USE) to hang one of your own.'),
      buttons: (n ? [{ label: '&Forget All', value: 'clear' }] : []).concat([{ label: 'OK', value: 'ok', def: true }]) }, this.win).then(function (v) {
      if (v !== 'clear' || self.closed) return;
      DB.clear().then(function () { self.myImages = []; store.hung = {}; persist(); self.load(self.levelIndex); });
    });
  };
  G.help = function () {
    U.dialog({ title: 'Exit Simulations Help', wide: 400,
      html: '<div class="u98-help u98-sunken"><h4>The object</h4><p>Every world is a simulation with one EXIT. Find it. Each simulation plays a song from <b>Sun’s Getting Low</b>.</p>' +
        '<h4>Your images</h4><p>Empty glowing frames hang beside sealed doorways. Hang one of your own images in a frame and the doorway opens. Inside is a <b>sun shard</b>. Your images also turn up later in the game. They never leave your browser.</p>' +
        '<h4>The wizard</h4><p>He follows you everywhere. Press <b>H</b> (or tap his button) and he’ll lead the way.</p>' +
        '<h4>Controls</h4><ul><li>W / ↑ forward, S / ↓ back, ← → turn, A D sidestep, Shift to run.</li><li>Drag the view to look around. E, Space or click to use a frame.</li><li>On a phone: the stick moves you, drag the view to look, USE hangs an image.</li></ul></div>',
      buttons: [{ label: 'OK', def: true }] }, this.win);
  };
  G.about = function () {
    U.dialog({ title: 'About Exit Simulations', icon: 'info',
      html: '<b>EXIT SIMULATIONS</b><br>EXITSIM.EXE · Version 1.0 (ULTRA 98)<br>Music: <i>Sun’s Getting Low</i> by Origami Ultra<br>Copyright © 1998–' + new Date().getFullYear() + ' Origami Ultra<br><br>No real exits were harmed.',
      buttons: [{ label: 'OK', def: true }] }, this.win);
  };
  G.destroy = function () {
    this.closed = true; cancelAnimationFrame(this.raf);
    document.removeEventListener('keyup', this.onKeyUp);
    if (this.audio) { this.audio.pause(); this.audio.src = ''; }
    if (this.scene) this.disposeScene();
    if (this.renderer) { this.renderer.dispose(); try { this.renderer.forceContextLoss(); } catch (e) {} }
  };

  /* ---------------------------------------------------------------- three.js on demand */
  var threeState = null, threeWait = [];
  function loadThree(cb) {
    if (window.THREE && window.THREE.WebGLRenderer) { THREE = window.THREE; return cb(true); }
    threeWait.push(cb);
    if (threeState === 'loading') return;
    threeState = 'loading';
    var s = document.createElement('script'); s.src = THREE_SRC; s.async = true; s.crossOrigin = 'anonymous';
    s.onload = function () { THREE = window.THREE; threeState = THREE ? 'ok' : null; var w = threeWait; threeWait = []; w.forEach(function (f) { f(!!THREE); }); };
    s.onerror = function () { threeState = null; var w = threeWait; threeWait = []; w.forEach(function (f) { f(false); }); };
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------------- icons + registration */
  U.art.pal['1'] = '#5f97d6'; U.art.pal['2'] = '#a9c9e8'; U.art.pal['3'] = '#151a3a'; U.art.pal['4'] = '#f4f4f4';
  U.art.pal['5'] = '#dcbde8'; U.art.pal['6'] = '#63cfc2'; U.art.pal['7'] = '#f2e35e'; U.art.pal['8'] = '#e8692b'; U.art.pal['9'] = '#4d3b36';
  U.art.pal['0'] = '#2b2229'; U.art.pal['a'] = '#ff9a4a'; U.art.pal['f'] = '#8e72c8';
  U.addSprite('icon_exitsim', [
    '................................',
    '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.',
    '.k1111111111111111111111111111k.',
    '.k1111111111111111111wwwww1111k.',
    '.k11111www1111111111wwwwwww111k.',
    '.k1111wwwww1xxxxxxxxwwwwwwww11k.',
    '.k111wwwwwwwxwwwxwxx1111111111k.',
    '.k1111111111xxxxxxxx1111111111k.',
    '.kf11111111qqqqqqqqqq11111111fk.',
    '.kf11111111qyyyyyyyyq11111111fk.',
    '.kff2222222qyppppppyq2222222ffk.',
    '.kff2222222qyppppppyq2222222ffk.',
    '.kfff222222qyppppppyq222222fffk.',
    '.kfff222222qyppppppyq222222fffk.',
    '.kffff22222qyppppppyq22222ffffk.',
    '.kffff22222qyppppppyq22222ffffk.',
    '.kfffff2222qyppppppyq2222fffffk.',
    '.kfffff2222qyppppppyq2222fffffk.',
    '.k334433443qyppppppyq433443344k.',
    '.k443344334qyppppppyq344334433k.',
    '.k334433443qyppppppyq433443344k.',
    '.k443344334qyppppppyq344334433k.',
    '.k43334443334ypypyp44333444333k.',
    '.k43334443334pypypy44333444333k.',
    '.k34443334443ypypyp33444333444k.',
    '.k34443334443pypypy33444333444k.',
    '.k4433334444333344443333444433k.',
    '.k3344443333444433334444333344k.',
    '.k3344443333444433334444333344k.',
    '.k3344443333444433334444333344k.',
    '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.',
    '................................'
  ]);
  U.addSprite('icon_wizard', [
    '................',
    '..........0.....',
    '.........050....',
    '........05650...',
    '.......055550...',
    '......0555650...',
    '.....08555550...',
    '....07085550....',
    '...07770550.....',
    '....077700......',
    '....05565500....',
    '...0556555650...',
    '...0565556550...',
    '....05555550....',
    '....099..990....',
    '...0999..9990...'
  ]);
  U.register({
    id: 'exitsim', title: 'Exit Simulations', label: 'Exit Simulations', menuLabel: '&Exit Simulations', exe: 'EXITSIM.EXE',
    icon: 'icon_exitsim', small: 'icon_wizard',
    create: function (win) { new Game(win); }
  });
})();
