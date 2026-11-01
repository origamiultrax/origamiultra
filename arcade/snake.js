/* ==========================================================================
   PROBOSCIS.EXE — the snake game, starring a proboscis monkey (Origami Ultra, original art)
   Bananas, ULTRAWATER bottles, REWIND cassettes and FAST-FORWARD tapes.
   ========================================================================== */
(function () {
  'use strict';
  var U = window.ULTRA98; if (!U) return;
  var COLS = 24, ROWS = 18;
  var SPEEDS = { slow: 6, normal: 8.5, fast: 11.5, insane: 15 };
  var DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  var OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };
  var FALLBACK_TRACKS = [{ title: 'title flight', file: 'title-flight.mp3' }, { title: 'APOLLO', file: 'apollo.mp3' }, { title: 'Wunk', file: 'wunk.mp3' }];

  var store = U.load('snake', { opts: { speed: 'normal', walls: 'solid', music: 'title-flight.mp3', sound: true, dpad: true }, scores: [], lastName: '' });
  function persist() { U.save('snake', store); }

  /* body sprites, generated */
  U.addSprite('snO', U.disc(16, 6.5, 'k'));
  U.addSprite('snF', U.disc(16, 5.5, 'r', 0, null, 2.7, 'o'));
  (function () {    /* fur texture variant + a bigger 20px head that looks where it's going */
    var f = U.disc(16, 5.5, 'r', 0, null, 2.7, 'o').map(function (r) { return r.split(''); });
    [[9, 8], [10, 9], [8, 9], [6, 11], [7, 12], [10, 12]].forEach(function (p) { if (f[p[1]][p[0]] === 'r') f[p[1]][p[0]] = 'R'; });
    U.addSprite('snF2', f.map(function (r) { return r.join(''); }));
    var base = U.rows('face_smile');
    function look(dx, dy) {
      var g = base.map(function (r) { return r.split(''); });
      [[6, 6], [7, 6], [6, 7], [7, 7], [12, 6], [13, 6], [12, 7], [13, 7]].forEach(function (p) { g[p[1]][p[0]] = 'w'; });
      var ly = dy < 0 ? 6 : 7, lx = dx < 0 ? 6 : 7, rx = dx > 0 ? 13 : 12;
      if (dx === 0) { lx = 7; rx = 12; }
      g[ly][lx] = 'e'; g[ly][rx] = 'e';
      return g;
    }
    function out(g) { return g.map(function (r) { return r.join(''); }); }
    U.addSprite('mk_r', out(look(1, 0))); U.addSprite('mk_l', out(look(-1, 0)));
    U.addSprite('mk_u', out(look(0, -1))); U.addSprite('mk_d', out(look(0, 1)));
    var eat = look(0, 1);
    [[6, 15], [13, 15]].forEach(function (p) { eat[p[1]][p[0]] = 'c'; });
    for (var x = 7; x <= 12; x++) { eat[16][x] = 'k'; eat[15][x] = x === 7 || x === 12 ? 'k' : 'm'; }
    U.addSprite('mk_eat', out(eat));
  })();
  U.addSprite('snTO', U.disc(16, 5.1, 'k'));
  U.addSprite('snTF', U.disc(16, 4.1, 'g', 0, null, 2.1, 'c'));
  U.addSprite('snPO', U.disc(16, 3.8, 'k'));
  U.addSprite('snPF', U.disc(16, 2.8, 'c'));

  /* level layouts (24 x 18). Row 9, columns 1-12 always stay clear for the start. */
  function L(fn) { var s = []; fn(function (x0, x1, y0, y1) { for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) s.push(x + ',' + y); }); return s; }
  var LAYOUTS = [
    { name: 'THE CLEARING', cells: [] },
    { name: 'MANGROVE CORNERS', cells: L(function (r) { r(2, 6, 2, 2); r(2, 2, 3, 5); r(17, 21, 2, 2); r(21, 21, 3, 5); r(2, 6, 15, 15); r(2, 2, 12, 14); r(17, 21, 15, 15); r(21, 21, 12, 14); }) },
    { name: 'TWO RIVERS', cells: L(function (r) { r(6, 17, 5, 5); r(6, 17, 13, 13); }) },
    { name: 'THE PEN', cells: L(function (r) { r(4, 9, 3, 3); r(14, 19, 3, 3); r(4, 9, 14, 14); r(14, 19, 14, 14); r(4, 4, 4, 6); r(4, 4, 12, 13); r(19, 19, 4, 6); r(19, 19, 12, 13); }) },
    { name: 'PILLARS', cells: L(function (r) { r(7, 7, 1, 6); r(7, 7, 12, 16); r(16, 16, 1, 6); r(16, 16, 12, 16); r(11, 12, 4, 5); r(11, 12, 13, 14); }) },
    { name: 'THE MAZE', cells: L(function (r) { r(3, 9, 4, 4); r(14, 20, 4, 4); r(3, 9, 14, 14); r(14, 20, 14, 14); r(12, 12, 1, 6); r(12, 12, 12, 16); r(16, 17, 8, 10); }) }
  ];

  U.register({
    id: 'proboscis', title: 'PROBOSCIS.EXE', label: 'PROBOSCIS\u200B.EXE', menuLabel: '&PROBOSCIS.EXE', icon: 'icon_snake', small: 'head_d',
    create: function (win) { new Snake(win); }
  });

  function tracks() { return (window.OUPlayer && window.OUPlayer.tracks && window.OUPlayer.tracks.length) ? window.OUPlayer.tracks : FALLBACK_TRACKS; }

  function Snake(win) {
    var self = this;
    this.win = win; win.game = this; this.mode = 'attract'; this.pops = []; this.history = [];
    win.el.classList.add('sn-win');
    var bar = win.menu([
      { label: '&Game', items: [
        { label: '&New Game', key: 'F2', act: function () { self.newGame(); } },
        { label: function () { return self.mode === 'paused' ? '&Resume' : '&Pause'; }, key: 'Space', dis: function () { return self.mode !== 'play' && self.mode !== 'paused'; }, act: function () { self.togglePause(); } },
        '-',
        { label: '&High Scores…', act: function () { self.scoresDialog(); } },
        '-',
        { label: 'E&xit', act: function () { win.close(); } }
      ] },
      { label: '&Options', items: [
        { label: '&Speed', sub: function () { return ['slow', 'normal', 'fast', 'insane'].map(function (s) {
          return { label: s.charAt(0).toUpperCase() + s.slice(1), chk: store.opts.speed === s, act: function () { store.opts.speed = s; persist(); } };
        }); } },
        { label: '&Walls', sub: function () { return [
          { label: '&Solid walls', chk: store.opts.walls === 'solid', act: function () { store.opts.walls = 'solid'; persist(); self.draw(); } },
          { label: '&Wrap around', chk: store.opts.walls === 'wrap', act: function () { store.opts.walls = 'wrap'; persist(); self.draw(); } }
        ]; } },
        '-',
        { label: '&Music', sub: function () {
          var list = [{ label: '&Off', chk: store.opts.music === 'off', act: function () { store.opts.music = 'off'; persist(); self.musicStop(); } }, '-'];
          tracks().forEach(function (t) {
            list.push({ label: t.title, chk: store.opts.music === t.file, act: function () { store.opts.music = t.file; persist(); if (self.mode === 'play') self.musicPlay(true); } });
          });
          return list;
        } },
        { label: 'Sound &effects', chk: function () { return store.opts.sound; }, act: function () { store.opts.sound = !store.opts.sound; persist(); } },
        { label: '&Touch controls', chk: function () { return store.opts.dpad; }, act: function () { store.opts.dpad = !store.opts.dpad; persist(); self.layout(); } }
      ] },
      { label: '&Help', items: [
        { label: '&How to Play', act: function () { self.help(); } },
        '-',
        { label: '&About PROBOSCIS.EXE…', act: function () { self.about(); } }
      ] }
    ]);
    bar.addEventListener('pointerdown', function () { if (self.mode === 'play') self.pause(); });
    win.body.innerHTML =
      '<div class="sn-wrap"><div class="sn-board"><canvas class="sn-cv" aria-label="PROBOSCIS.EXE game board"></canvas></div>' +
      '<div class="sn-pad" aria-hidden="true">' +
        '<button type="button" class="u98-btn" data-d="up">▲</button>' +
        '<button type="button" class="u98-btn" data-d="left">◀</button><button type="button" class="u98-btn sn-pp" data-d="pause">❚❚</button><button type="button" class="u98-btn" data-d="right">▶</button>' +
        '<button type="button" class="u98-btn" data-d="down">▼</button></div></div>';
    this.cv = win.body.querySelector('.sn-cv'); this.ctx = this.cv.getContext('2d');
    this.pad = win.body.querySelector('.sn-pad');
    this.st = win.status([{ text: 'Score: 0' }, { text: 'Level 1', w: 66 }, { text: '◀◀ x0', w: 58 }, { text: 'Length 4', w: 74 }]);
    this.bindInput();
    win.on('key', function (e) { return self.key(e); });
    win.on('resize', function () { self.layout(); });
    win.on('blur', function () { if (self.mode === 'play') self.pause(); });
    win.on('min', function () { if (self.mode === 'play') self.pause(); self.musicStop(); });
    win.on('hidden', function () { if (self.mode === 'play') self.pause(); });
    win.on('close', function () { self.closed = true; cancelAnimationFrame(self.raf); self.musicStop(); if (self.audio) { self.audio.src = ''; } });
    win.on('mute', function (m) { if (self.audio) self.audio.muted = m; });
    /* default window size: board at a comfortable cell size */
    var s = win.deskSize(), cell = Math.max(14, Math.min(26, Math.floor((s.h - 104) / ROWS)));
    if (!U.isSmall()) { win.el.style.width = (COLS * cell + 16) + 'px'; win.el.style.height = (ROWS * cell + 74) + 'px'; }
    if (document.fonts && document.fonts.load) {
      Promise.all(['24px VT323', '24px "TS Block Bold"', '12px "Press Start 2P"'].map(function (f) { return document.fonts.load(f).catch(function () {}); })).then(function () { self.draw(); });
    }
    this.demoReset();
    this.last = performance.now();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }
  var P = Snake.prototype;
  P.snd = function (n) { if (store.opts.sound) U.sfx(n); };

  /* ---------- layout ---------- */
  P.layout = function () {
    var body = this.win.body, showPad = U.touch && store.opts.dpad;
    this.pad.style.display = showPad ? '' : 'none';
    var padH = showPad ? this.pad.offsetHeight + 8 : 0;
    var aw = body.clientWidth - 8, ah = body.clientHeight - 8 - padH;
    var cell = Math.max(8, Math.floor(Math.min(aw / COLS, ah / ROWS)));
    this.cell = cell;
    var d = U.dpr();
    this.cv.width = Math.round(COLS * cell * d); this.cv.height = Math.round(ROWS * cell * d);
    this.cv.style.width = COLS * cell + 'px'; this.cv.style.height = ROWS * cell + 'px';
    this.k = cell * d / 16;
    this.bg = null;
    this.draw();
  };

  /* ---------- game state ---------- */
  P.blank = function (level) {
    var lay = LAYOUTS[(level - 1) % LAYOUTS.length];
    return {
      snake: [[6, 9], [5, 9], [4, 9], [3, 9]], dir: 'right', grow: 0, level: level, blocks: lay.cells, layName: lay.name,
      banana: null, bottle: null, cassette: null, ff: null, eaten: 0, levelEaten: 0, score: 0, rewinds: 0, ffUntil: 0, time: 0
    };
  };
  P.newGame = function () {
    U.audioUnlock();
    this.s = this.blank(1);
    this.queue = []; this.history = []; this.pops = []; this.acc = 0;
    this.spawn('banana');
    this.card('LEVEL 1', this.s.layName);
    this.musicPlay(true);
    this.updateStatus();
  };
  P.card = function (title, sub) {
    this.mode = 'card'; this.cardInfo = { title: title, sub: sub, t: performance.now() };
    this.queue = [];
  };
  P.occupied = function (s, x, y, skipItems) {
    var key = x + ',' + y;
    if (s.blocks.indexOf(key) >= 0) return true;
    for (var i = 0; i < s.snake.length; i++) if (s.snake[i][0] === x && s.snake[i][1] === y) return true;
    if (!skipItems) for (var n of ['banana', 'bottle', 'cassette', 'ff']) if (s[n] && s[n].x === x && s[n].y === y) return true;
    return false;
  };
  P.spawn = function (kind, life) {
    var s = this.s, h = s.snake[0], tries = 0, x, y;
    do {
      x = Math.floor(Math.random() * COLS); y = Math.floor(Math.random() * ROWS); tries++;
    } while ((this.occupied(s, x, y) || (Math.abs(x - h[0]) + Math.abs(y - h[1]) < 3)) && tries < 400);
    if (tries >= 400) return;
    s[kind] = { x: x, y: y, until: life ? s.time + life : 0, born: s.time };
  };
  P.speed = function () {
    var base = SPEEDS[store.opts.speed] || SPEEDS.normal;
    var v = base + Math.min(5, (this.s.level - 1) * 0.6);
    if (this.s.ffUntil > this.s.time) v *= 1.45;
    return v;
  };
  P.snap = function () {
    var s = this.s;
    return JSON.parse(JSON.stringify({ snake: s.snake, dir: s.dir, grow: s.grow, banana: s.banana, bottle: s.bottle, cassette: s.cassette, ff: s.ff, eaten: s.eaten, levelEaten: s.levelEaten, score: s.score, ffUntil: s.ffUntil, time: s.time }));
  };

  /* one step of the game */
  P.tick = function () {
    var s = this.s;
    this.history.push({ t: s.time, s: this.snap() });
    while (this.history.length && this.history[0].t < s.time - 4500) this.history.shift();
    while (this.queue.length) {
      var q = this.queue.shift();
      if (q !== OPP[s.dir] && q !== s.dir) { s.dir = q; break; }
    }
    var d = DIRS[s.dir], h = s.snake[0], nx = h[0] + d[0], ny = h[1] + d[1];
    if (store.opts.walls === 'wrap') { nx = (nx + COLS) % COLS; ny = (ny + ROWS) % ROWS; }
    else if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) return this.crash();
    if (s.blocks.indexOf(nx + ',' + ny) >= 0) return this.crash();
    var growing = s.grow > 0;
    for (var i = 0; i < s.snake.length - (growing ? 0 : 1); i++) if (s.snake[i][0] === nx && s.snake[i][1] === ny) return this.crash();
    s.snake.unshift([nx, ny]);
    if (s.grow > 0) s.grow--; else s.snake.pop();
    var ffMul = s.ffUntil > s.time ? 2 : 1;
    if (s.banana && s.banana.x === nx && s.banana.y === ny) {
      var pts = 10 * s.level * ffMul;
      s.score += pts; s.grow += 1; s.eaten++; s.levelEaten++; this.ate = performance.now();
      this.pop(nx, ny, '+' + pts, '#ffe14d');
      this.snd('eat');
      s.banana = null;
      if (s.levelEaten >= 8) { this.levelUp(); return; }
      this.spawn('banana');
      if (s.eaten % 4 === 0 && !s.bottle) this.spawn('bottle', 7000);
      if (!s.cassette && s.rewinds < 3 && Math.random() < 0.14) this.spawn('cassette', 8000);
      if (!s.ff && s.ffUntil <= s.time && Math.random() < 0.09) this.spawn('ff', 8000);
    }
    if (s.bottle && s.bottle.x === nx && s.bottle.y === ny) {
      var bp = 50 * s.level * ffMul;
      s.score += bp; s.grow += 2; s.bottle = null; this.ate = performance.now();
      this.pop(nx, ny, '+' + bp, '#7fd4ff'); this.snd('bottle');
    }
    if (s.cassette && s.cassette.x === nx && s.cassette.y === ny) {
      s.rewinds = Math.min(3, s.rewinds + 1); s.cassette = null;
      this.pop(nx, ny, '◀◀ +1', '#ffffff'); this.snd('cassette');
    }
    if (s.ff && s.ff.x === nx && s.ff.y === ny) {
      s.ffUntil = s.time + 6000; s.ff = null;
      this.pop(nx, ny, '▶▶ x2', '#ffe14d'); this.snd('ff'); this.musicRate();
    }
    this.updateStatus();
  };
  P.pop = function (x, y, text, color) { this.pops.push({ x: x, y: y, text: text, color: color, t: performance.now() }); };
  P.levelUp = function () {
    var s = this.s, next = this.blank(s.level + 1);
    next.score = s.score; next.eaten = s.eaten; next.rewinds = s.rewinds; next.time = s.time;
    this.s = next; this.history = [];
    this.spawn('banana');
    this.snd('level');
    this.card('LEVEL ' + next.level, next.layName);
    this.musicRate();
    this.updateStatus();
  };
  P.crash = function () {
    var s = this.s;
    if (s.rewinds > 0 && this.history.length) {
      s.rewinds--;
      var target = this.history[0];
      for (var i = this.history.length - 1; i >= 0; i--) if (this.history[i].t <= s.time - 3000) { target = this.history[i]; break; }
      var idx = this.history.indexOf(target);
      this.rew = { frames: this.history.slice(idx).reverse(), t: performance.now(), target: target };
      this.mode = 'rewind'; this.queue = [];
      this.snd('rewind');
      if (this.audio && !this.audio.paused) { try { this.audio.currentTime = Math.max(0, this.audio.currentTime - 3); } catch (e) {} }
      this.updateStatus();
      return;
    }
    this.mode = 'dying'; this.dieT = performance.now();
    this.snd('crash'); this.musicStop(true);
  };
  P.finishRewind = function () {
    var t = this.rew.target.s, s = this.s;
    Object.keys(t).forEach(function (k) { s[k] = t[k]; });
    this.history = this.history.filter(function (h) { return h.t <= t.time; });
    this.rew = null;
    this.mode = 'ready'; this.readyT = performance.now(); this.acc = 0;
    this.updateStatus();
  };
  P.togglePause = function () { if (this.mode === 'play') this.pause(); else if (this.mode === 'paused') this.resume(); };
  P.pause = function () { if (this.mode !== 'play') return; this.mode = 'paused'; this.musicStop(true); this.draw(); };
  P.resume = function () { if (this.mode !== 'paused') return; this.mode = 'ready'; this.readyT = performance.now(); this.musicPlay(); };

  /* ---------- game over ---------- */
  P.gameOver = function () {
    var s = this.s, self = this;
    this.mode = 'over';
    var qualifies = s.score > 0 && (store.scores.length < 10 || s.score > store.scores[store.scores.length - 1].s);
    var p = qualifies
      ? U.prompt({ title: 'PROBOSCIS.EXE', icon: 'info', text: 'NEW HIGH SCORE: ' + s.score + '. Enter your name for the hall of fame:', value: store.lastName || '', max: 16, noCancel: true }, this.win).then(function (name) {
          name = (name || '').trim() || 'MONKEY';
          store.lastName = name;
          var entry = { n: name, s: s.score, l: s.level, d: Date.now() };
          store.scores.push(entry); store.scores.sort(function (a, b) { return b.s - a.s; }); store.scores = store.scores.slice(0, 10); persist();
          self.lastEntry = entry.d;
        })
      : Promise.resolve();
    p.then(function () {
      var mm = Math.floor(s.time / 60000), ss = Math.floor(s.time / 1000) % 60;
      var hex = function (n, w) { return ('00000000' + n.toString(16).toUpperCase()).slice(-(w || 8)); };
      return U.dialog({
        title: 'PROBOSCIS.EXE', icon: 'error',
        html: 'This program has performed an illegal operation and will be shut down.<br><br>If the problem persists, eat fewer bananas.',
        details: 'PROBOSCIS caused an invalid page fault in\nmodule MONKEY.DLL at 0137:BF8A' + hex(s.score, 4) + '.\nRegisters:\nSCORE=' + hex(s.score) + ' LEVEL=' + hex(s.level) +
          '\nLENGTH=' + hex(s.snake.length) + ' BANANAS=' + hex(s.eaten) + '\nTIME=' + (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss + '  REWINDS LEFT=' + s.rewinds +
          '\nBytes at CS:EIP:\n42 41 4e 41 4e 41 21 21 20 4f 55 20 39 38',
        buttons: [{ label: '&Play Again', value: 'again', def: true }, { label: '&Close', value: 'close' }, { label: '&Details >>', details: true }],
        cancelValue: 'close'
      }, self.win);
    }).then(function (v) {
      if (self.closed) return;
      if (v === 'again') self.newGame(); else self.demoReset();
    });
  };

  /* ---------- attract mode: the monkey plays itself ---------- */
  P.demoReset = function () {
    this.mode = 'attract';
    this.s = this.blank(1); this.s.blocks = []; this.queue = []; this.acc = 0;
    this.spawn('banana');
    this.updateStatus(true);
  };
  P.demoThink = function () {
    var s = this.s, h = s.snake[0], self = this;
    var blocked = {}; s.snake.slice(0, -1).forEach(function (p) { blocked[p[0] + ',' + p[1]] = 1; });
    var start = h[0] + ',' + h[1], goal = s.banana ? s.banana.x + ',' + s.banana.y : null;
    var prev = {}; prev[start] = null; var qq = [h], found = null;
    while (qq.length && goal) {
      var c = qq.shift();
      if (c[0] + ',' + c[1] === goal) { found = c; break; }
      for (var dn in DIRS) {
        var nx = c[0] + DIRS[dn][0], ny = c[1] + DIRS[dn][1], kk = nx + ',' + ny;
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || blocked[kk] || kk in prev) continue;
        prev[kk] = { from: c, dir: dn }; qq.push([nx, ny]);
      }
    }
    var dir = null;
    if (found) { var cur = found[0] + ',' + found[1]; while (prev[cur] && prev[cur].from[0] + ',' + prev[cur].from[1] !== start) { var f = prev[cur].from; cur = f[0] + ',' + f[1]; } dir = prev[cur] && prev[cur].dir; }
    if (!dir || dir === OPP[s.dir]) {
      for (var dn2 in DIRS) { var ax = h[0] + DIRS[dn2][0], ay = h[1] + DIRS[dn2][1]; if (dn2 !== OPP[s.dir] && ax >= 0 && ay >= 0 && ax < COLS && ay < ROWS && !blocked[ax + ',' + ay]) { dir = dn2; break; } }
    }
    if (dir) this.queue = [dir];
  };

  /* ---------- main loop ---------- */
  P.loop = function () {
    if (this.closed) return;
    var now = performance.now();   /* not the rAF stamp: events in this frame can be newer than it */
    this.raf = requestAnimationFrame(this.loop);
    var dt = Math.min(100, now - this.last); this.last = now;
    if (this.win.minimized) return;
    var m = this.mode;
    if (m === 'play') {
      this.s.time += dt;
      ['bottle', 'cassette', 'ff'].forEach(function (k) { var it = this.s[k]; if (it && it.until && this.s.time > it.until) this.s[k] = null; }, this);
      if (this.wasFF && this.s.ffUntil <= this.s.time) this.musicRate();
      this.wasFF = this.s.ffUntil > this.s.time;
      this.acc += dt;
      var step = 1000 / this.speed();
      while (this.acc >= step && this.mode === 'play') { this.acc -= step; this.tick(); }
    } else if (m === 'attract') {
      this.acc += dt;
      while (this.acc >= 120) {
        this.acc -= 120; this.demoThink();
        var before = this.s.score; this.s.rewinds = 0;
        this.demoStep();
        if (this.s.snake.length > 40) this.demoReset();
      }
    } else if (m === 'card') {
      if (now - this.cardInfo.t > 1700) { this.mode = 'ready'; this.readyT = now; }
    } else if (m === 'ready') {
      if (now - this.readyT > 900) { this.mode = 'play'; this.acc = 0; }
    } else if (m === 'rewind') {
      if (now - this.rew.t > 900) this.finishRewind();
    } else if (m === 'dying') {
      if (now - this.dieT > 1100) this.gameOver();
    }
    this.draw(now);
  };
  P.demoStep = function () {
    var s = this.s;
    if (this.queue.length) { var q = this.queue.shift(); if (q !== OPP[s.dir]) s.dir = q; }
    var d = DIRS[s.dir], h = s.snake[0], nx = h[0] + d[0], ny = h[1] + d[1];
    var hit = nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || s.snake.slice(0, -1).some(function (p) { return p[0] === nx && p[1] === ny; });
    if (hit) { this.demoReset(); return; }
    s.snake.unshift([nx, ny]);
    if (s.grow > 0) s.grow--; else s.snake.pop();
    if (s.banana && s.banana.x === nx && s.banana.y === ny) { s.grow++; s.banana = null; this.ate = performance.now(); this.spawn('banana'); }
  };

  /* ---------- input ---------- */
  P.turn = function (d) {
    if (this.mode === 'attract' || this.mode === 'over' && !document.querySelector('.u98-modal')) { this.newGame(); return; }
    if (this.mode === 'paused') { this.resume(); }
    if (this.mode !== 'play' && this.mode !== 'ready' && this.mode !== 'card') return;
    var last = this.queue.length ? this.queue[this.queue.length - 1] : this.s.dir;
    if (d === last || d === OPP[last] || this.queue.length >= 3) return;
    this.queue.push(d);
  };
  P.key = function (e) {
    var k = e.key, map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' };
    if (map[k]) { U.audioUnlock(); this.turn(map[k]); return true; }
    if (k === ' ' || k === 'p' || k === 'P') {
      if (this.mode === 'attract') this.newGame(); else this.togglePause();
      return true;
    }
    if (k === 'Escape') { if (this.mode === 'play') this.pause(); return true; }
    if (k === 'Enter') { if (this.mode === 'attract') this.newGame(); else if (this.mode === 'paused') this.resume(); return true; }
    if (k === 'F2') { this.newGame(); return true; }
    return false;
  };
  P.bindInput = function () {
    var self = this, cv = this.cv, sw = null;
    cv.addEventListener('pointerdown', function (e) {
      U.audioUnlock();
      sw = { x: e.clientX, y: e.clientY, moved: false };
      try { cv.setPointerCapture(e.pointerId); } catch (er) {}
    });
    cv.addEventListener('pointermove', function (e) {
      if (!sw) return;
      var dx = e.clientX - sw.x, dy = e.clientY - sw.y, th = Math.max(16, self.cell * 0.9);
      if (Math.max(Math.abs(dx), Math.abs(dy)) < th) return;
      sw.moved = true;
      self.turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
      sw.x = e.clientX; sw.y = e.clientY;
    });
    cv.addEventListener('pointerup', function () {
      if (sw && !sw.moved) {
        if (self.mode === 'attract') self.newGame();
        else if (self.mode === 'paused') self.resume();
        else if (self.mode === 'over' && !document.querySelector('.u98-modal')) self.newGame();
      }
      sw = null;
    });
    cv.addEventListener('pointercancel', function () { sw = null; });
    this.pad.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('pointerdown', function (e) {
        e.preventDefault(); U.audioUnlock();
        var d = b.dataset.d;
        if (d === 'pause') { if (self.mode === 'attract' || self.mode === 'over') self.newGame(); else self.togglePause(); }
        else self.turn(d);
      });
    });
  };

  /* ---------- music: your beats, sped up like a tape as you level ---------- */
  P.musicPlay = function (restart) {
    if (store.opts.music === 'off') { this.musicStop(); return; }
    if (!this.audio) {
      var a = this.audio = new Audio();
      a.loop = true; a.preload = 'auto'; a.volume = 0.55;
      a.preservesPitch = false; a.mozPreservesPitch = false; a.webkitPreservesPitch = false;
    }
    var src = 'audio/' + store.opts.music;
    if (this.audio.getAttribute('src') !== src) { this.audio.setAttribute('src', src); }
    else if (restart) { try { this.audio.currentTime = 0; } catch (e) {} }
    clearInterval(this.tapeStop);
    this.audio.muted = U.muted;
    U.pauseRadio();
    this.musicRate();
    var p = this.audio.play(); if (p && p.catch) p.catch(function () {});
  };
  P.musicRate = function () {
    if (!this.audio || !this.s) return;
    var r = 1 + Math.min(0.2, (this.s.level - 1) * 0.03) + (this.s.ffUntil > this.s.time ? 0.12 : 0);
    try { this.audio.playbackRate = r; } catch (e) {}
  };
  P.musicStop = function (tape) {
    var a = this.audio; if (!a || a.paused) return;
    clearInterval(this.tapeStop);
    if (!tape) { a.pause(); return; }
    var r = a.playbackRate, self = this;
    this.tapeStop = setInterval(function () {           /* tape-stop: the pitch drops as it slows */
      r -= 0.09;
      if (r <= 0.45) { clearInterval(self.tapeStop); a.pause(); self.musicRate(); return; }
      try { a.playbackRate = r; } catch (e) {}
    }, 30);
  };

  /* ---------- status bar ---------- */
  P.updateStatus = function (demo) {
    var s = this.s;
    this.st[0].textContent = demo ? (U.touch ? 'Tap to play' : 'Press Enter or click to play') : 'Score: ' + s.score;
    this.st[1].textContent = 'Level ' + s.level;
    this.st[2].textContent = '◀◀ x' + s.rewinds;
    this.st[3].textContent = 'Length ' + s.snake.length;
  };

  /* ---------- drawing ---------- */
  P.buildBg = function () {
    var c = document.createElement('canvas'); c.width = this.cv.width; c.height = this.cv.height;
    var x = c.getContext('2d'), k = this.k, seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var j = 0; j < ROWS; j++) for (var i = 0; i < COLS; i++) {
      var X = Math.round(i * 16 * k), Y = Math.round(j * 16 * k), X2 = Math.round((i + 1) * 16 * k), Y2 = Math.round((j + 1) * 16 * k);
      x.fillStyle = (i + j) % 2 ? '#2b6a2c' : '#307531'; x.fillRect(X, Y, X2 - X, Y2 - Y);
      if (rnd() < 0.35) {          /* grass tufts + fallen leaves */
        var gx = Math.floor(rnd() * 12) + 2, gy = Math.floor(rnd() * 12) + 2, col = rnd() < 0.5 ? '#3f8d3a' : '#235723';
        x.fillStyle = col;
        x.fillRect(Math.round((i * 16 + gx) * k), Math.round((j * 16 + gy) * k), Math.max(1, Math.round(k)), Math.max(1, Math.round(2 * k)));
        x.fillRect(Math.round((i * 16 + gx + 2) * k), Math.round((j * 16 + gy - 1) * k), Math.max(1, Math.round(k)), Math.max(1, Math.round(3 * k)));
      }
      if (rnd() < 0.05) { x.fillStyle = '#8a6a2a'; x.fillRect(Math.round((i * 16 + 6) * k), Math.round((j * 16 + 9) * k), Math.round(3 * k), Math.round(2 * k)); }
    }
    this.bg = c;
  };
  function rectU(x, k, ux, uy, uw, uh, col) {
    var X = Math.round(ux * k), Y = Math.round(uy * k);
    x.fillStyle = col; x.fillRect(X, Y, Math.round((ux + uw) * k) - X, Math.round((uy + uh) * k) - Y);
  }
  P.drawSnake = function (x, s, now, dead) {
    var k = this.k, sn = s.snake, n = sn.length;
    var flash = dead && Math.floor((now - this.dieT) / 120) % 2 === 1;
    if (flash) return this.drawHead(x, s, now, dead);
    var kind = function (i) { return i >= n - 1 ? 'tip' : i >= n - 2 ? 'tail' : 'body'; };
    var adj = function (a, b) { return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1; };
    /* pass 1: outlines; pass 2: fur */
    for (var pass = 0; pass < 2; pass++) {
      for (var i = n - 1; i >= 1; i--) {
        var a = sn[i], b = sn[i - 1], ka = kind(i);
        var thin = ka !== 'body';
        if (adj(a, b)) {
          var horiz = a[1] === b[1], x0 = Math.min(a[0], b[0]) * 16 + 8, y0 = Math.min(a[1], b[1]) * 16 + 8;
          var o = thin ? (pass ? 4 : 3) : (pass ? 2 : 1), wdt = 16 - 2 * o;
          var col = pass ? (thin ? PAL('g') : PAL('r')) : PAL('k');
          if (horiz) rectU(x, k, x0, a[1] * 16 + o, 16, wdt, col); else rectU(x, k, a[0] * 16 + o, y0, wdt, 16, col);
          if (pass && !thin) { if (horiz) rectU(x, k, x0 + 1, a[1] * 16 + 3, 14, 1, PAL('o')); else rectU(x, k, a[0] * 16 + 3, y0 + 1, 1, 14, PAL('o')); }
        }
        var spr = ka === 'tip' ? (pass ? 'snPF' : 'snPO') : ka === 'tail' ? (pass ? 'snTF' : 'snTO') : (pass ? (i % 3 === 0 ? 'snF2' : 'snF') : 'snO');
        x.drawImage(U.spr(spr, k), Math.round(a[0] * 16 * k), Math.round(a[1] * 16 * k));
      }
      if (n > 1) {   /* neck link */
        var h = sn[0], nb = sn[1];
        if (adj(h, nb)) {
          var hz = h[1] === nb[1], hx0 = Math.min(h[0], nb[0]) * 16 + 8, hy0 = Math.min(h[1], nb[1]) * 16 + 8, oo = pass ? 2 : 1;
          if (hz) rectU(x, k, hx0, h[1] * 16 + oo, 16, 16 - 2 * oo, pass ? PAL('r') : PAL('k')); else rectU(x, k, h[0] * 16 + oo, hy0, 16 - 2 * oo, 16, pass ? PAL('r') : PAL('k'));
        }
      }
    }
    this.drawHead(x, s, now, dead);
  };
  function PAL(c) { return U.art.pal[c]; }
  P.drawHead = function (x, s, now, dead) {
    var h = s.snake[0], k = this.k, name = 'mk_' + ({ up: 'u', down: 'd', left: 'l', right: 'r' })[s.dir];
    if (dead) name = 'face_dead';
    else if (this.ate && now - this.ate < 160) name = 'mk_eat';
    else {
      var d = DIRS[s.dir], nx = h[0] + d[0], ny = h[1] + d[1];
      ['banana', 'bottle'].forEach(function (it) { if (s[it] && s[it].x === nx && s[it].y === ny) name = 'mk_eat'; });
    }
    x.drawImage(U.spr(name, k), Math.round((h[0] * 16 - 2) * k), Math.round((h[1] * 16 - 2) * k));   /* 20px head overhangs its cell */
  };
  P.osd = function (x, text, ux, uy, size, align, color) {
    var k = this.k, px = Math.round(size * k);
    x.font = px + 'px VT323, monospace'; x.textAlign = align || 'left'; x.textBaseline = 'top';
    var room = (COLS * 16 - 16) * k, tw = x.measureText(text).width;   /* never spill off the board */
    if (tw > room) { px = Math.floor(px * room / tw); x.font = px + 'px VT323, monospace'; }
    x.fillStyle = 'rgba(0,0,0,.75)'; x.fillText(text, Math.round(ux * k) + Math.max(1, Math.round(k)), Math.round(uy * k) + Math.max(1, Math.round(k)));
    x.fillStyle = color || '#fff'; x.fillText(text, Math.round(ux * k), Math.round(uy * k));
  };
  P.draw = function (now) {
    now = now || performance.now();
    if (!this.cell || !this.s) return;
    var x = this.ctx, k = this.k, s = this.s, W = this.cv.width, H = this.cv.height, self = this;
    if (!this.bg) this.buildBg();
    var showS = s;
    if (this.mode === 'rewind' && this.rew) {
      var f = this.rew.frames, pr = Math.min(1, (now - this.rew.t) / 900);
      var snap = f[Math.max(0, Math.min(f.length - 1, Math.floor(pr * f.length)))].s;
      showS = Object.assign({}, s, snap);
    }
    x.drawImage(this.bg, 0, 0);
    if (store.opts.walls === 'solid' && this.mode !== 'attract') {
      x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = Math.max(1, Math.round(k)); x.strokeRect(x.lineWidth / 2, x.lineWidth / 2, W - x.lineWidth, H - x.lineWidth);
    }
    showS.blocks.forEach(function (c) { var p = c.split(','); x.drawImage(U.spr('log', k), Math.round(p[0] * 16 * k), Math.round(p[1] * 16 * k)); });
    var bob = Math.floor(now / 260) % 2;
    ['banana', 'bottle', 'cassette', 'ff'].forEach(function (it) {
      var o = showS[it]; if (!o) return;
      if (o.until && o.until - s.time < 2000 && Math.floor(now / 140) % 2) return;     /* blink before it vanishes */
      x.drawImage(U.spr(it, k), Math.round(o.x * 16 * k), Math.round((o.y * 16 - (it === 'banana' ? bob : 0)) * k));
    });
    this.drawSnake(x, showS, now, this.mode === 'dying');
    /* score pops */
    this.pops = this.pops.filter(function (p) {
      var a = (now - p.t) / 700; if (a >= 1) return false;
      x.globalAlpha = 1 - a * a;
      self.osd(x, p.text, p.x * 16 + 8, p.y * 16 - 6 - a * 14, 13, 'center', p.color);
      x.globalAlpha = 1; return true;
    });
    var m = this.mode;
    /* VHS on-screen display */
    if (m !== 'attract') {
      var t = Math.floor(s.time / 1000);
      this.osd(x, 'SP ' + Math.floor(t / 3600) + ':' + ('0' + Math.floor(t / 60) % 60).slice(-2) + ':' + ('0' + t % 60).slice(-2), COLS * 16 - 6, 4, 15, 'right');
    }
    if (m === 'play' && s.ffUntil > s.time) {
      this.osd(x, '▶▶ FF x2', 6, 4, 15, 'left', '#ffe14d');
      x.fillStyle = 'rgba(255,255,255,.07)';
      for (var l = 0; l < 3; l++) { var yy = ((now / 3 + l * 97) % (ROWS * 16)); rectU(x, k, 0, yy, COLS * 16, 1, 'rgba(255,255,255,.12)'); }
    }
    if (m === 'play' && now - (this.readyT || 0) < 2200 && s.ffUntil <= s.time) this.osd(x, 'PLAY ▶', 6, 4, 15);
    if (m === 'ready') this.osd(x, 'PLAY ▶', 6, 4, 15);
    if (m === 'paused') {
      x.fillStyle = 'rgba(0,0,30,.45)'; x.fillRect(0, 0, W, H);
      if (Math.floor(now / 500) % 2 === 0) this.osd(x, '❚❚ PAUSE', 6, 4, 15);
      this.osd(x, 'PAUSED', COLS * 8, ROWS * 8 - 12, 26, 'center');
      this.osd(x, U.touch ? 'tap to resume' : 'press SPACE to resume', COLS * 8, ROWS * 8 + 12, 13, 'center', '#c8ffc0');
    }
    if (m === 'rewind') {
      for (var b = 0; b < 6; b++) {           /* tracking noise */
        var by = Math.random() * ROWS * 16, bh = 1 + Math.random() * 3, sh = (Math.random() - 0.5) * 18;
        var Y0 = Math.round(by * k), Hh = Math.max(1, Math.round(bh * k));
        try { x.drawImage(this.cv, 0, Y0, W, Hh, Math.round(sh * k), Y0, W, Hh); } catch (e) {}
        rectU(x, k, 0, by, COLS * 16, 0.6, 'rgba(255,255,255,.5)');
      }
      this.osd(x, '◀◀ REW', 6, 4, 15);
    }
    if (m === 'card') {
      x.fillStyle = 'rgba(0,0,0,.55)'; x.fillRect(0, Math.round((ROWS * 8 - 30) * k), W, Math.round(60 * k));
      this.osd(x, this.cardInfo.title, COLS * 8, ROWS * 8 - 24, 30, 'center', '#ffe14d');
      this.osd(x, this.cardInfo.sub, COLS * 8, ROWS * 8 + 6, 14, 'center', '#c8ffc0');
    }
    if (m === 'attract') this.drawTitle(x, now);
  };
  P.drawTitle = function (x, now) {
    var k = this.k, W = this.cv.width, cx = COLS * 8;
    x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(0, Math.round(52 * k), W, Math.round(150 * k));
    var TITLE = 'PROBOSCIS.EXE', px = Math.round(34 * k);
    x.font = px + 'px "TS Block Bold", "Press Start 2P", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'top';
    var room = (COLS * 16 - 28) * k, tw = x.measureText(TITLE).width;   /* shrink to fit the board */
    if (tw > room) { px = Math.floor(px * room / tw); x.font = px + 'px "TS Block Bold", "Press Start 2P", sans-serif'; }
    var ty = Math.round(66 * k + (34 * k - px) / 2);
    x.lineJoin = 'round'; x.lineWidth = Math.max(2, Math.round(4 * k));
    x.strokeStyle = '#000'; x.strokeText(TITLE, Math.round(cx * k), ty);
    var g = x.createLinearGradient(0, ty, 0, ty + px);
    g.addColorStop(0, '#fff6a0'); g.addColorStop(0.5, '#ffd000'); g.addColorStop(1, '#ff7a00');
    x.fillStyle = g; x.fillText(TITLE, Math.round(cx * k), ty);
    this.osd(x, 'the snake game, starring a proboscis monkey', cx, 106, 15, 'center', '#c8ffc0');
    var best = store.scores[0];
    this.osd(x, 'HI-SCORE ' + (best ? best.s + '  ' + best.n.toUpperCase() : '0'), cx, 128, 14, 'center', '#ffe14d');
    if (Math.floor(now / 520) % 2 === 0) this.osd(x, U.touch ? 'TAP TO PLAY' : 'PRESS ENTER TO PLAY', cx, 152, 17, 'center');
    this.osd(x, U.touch ? 'swipe or use the pad to steer' : 'ARROWS / WASD to steer  ·  SPACE to pause', cx, 178, 12, 'center', '#a8d8a0');
  };

  /* ---------- dialogs ---------- */
  P.scoresDialog = function () {
    var self = this, rows = store.scores.map(function (e, i) {
      return '<tr' + (e.d === self.lastEntry ? ' class="me"' : '') + '><td class="n">' + (i + 1) + '.</td><td>' + U.esc(e.n) + '</td><td class="n">' + e.s + '</td><td class="n">LV ' + e.l + '</td></tr>';
    }).join('') || '<tr><td>No scores yet. Go eat some bananas.</td></tr>';
    U.dialog({ title: 'PROBOSCIS.EXE High Scores', wide: 300, html: '<table class="u98-table">' + rows + '</table>', buttons: [{ label: '&Reset Scores', value: 'reset' }, { label: 'OK', def: true, value: 'ok' }] }, this.win)
      .then(function (v) { if (v === 'reset') { store.scores = []; persist(); self.scoresDialog(); } });
  };
  P.help = function () {
    U.dialog({
      title: 'PROBOSCIS.EXE Help', wide: 390,
      html: '<div class="u98-help u98-sunken"><h4>The object</h4><p>Steer the proboscis monkey around the jungle. Every banana makes him longer. Don’t hit the walls, the logs, or yourself.</p>' +
        '<h4>Pickups</h4><ul><li><b>Banana</b>: points, +1 length.</li><li><b>ULTRAWATER</b>: big points, +2 length. It doesn’t stay long.</li>' +
        '<li><b>Cassette</b>: a REWIND. If you crash, the tape rewinds 3 seconds and you keep playing (hold up to 3).</li><li><b>Fast-forward</b>: 6 seconds of double speed and double points.</li></ul>' +
        '<h4>Levels</h4><p>Eat 8 bananas to clear a level. Each one has a new layout and plays a little faster, and so does the music.</p>' +
        '<h4>Controls</h4><ul><li>Arrow keys or WASD to steer. Space or P to pause. F2 for a new game.</li><li>On a phone: swipe on the board, or use the pad.</li></ul></div>',
      buttons: [{ label: 'OK', def: true }]
    }, this.win);
  };
  P.about = function () {
    U.dialog({
      title: 'About PROBOSCIS.EXE', icon: 'info',
      html: '<b>PROBOSCIS.EXE</b><br>Version 1.0 (ULTRA 98)<br>The snake game, starring a proboscis monkey.<br>Music by Origami Ultra.<br>Copyright © 1998–' + new Date().getFullYear() + ' Origami Ultra<br><br>No snakes were harmed.',
      buttons: [{ label: 'OK', def: true }]
    }, this.win);
  };
})();
