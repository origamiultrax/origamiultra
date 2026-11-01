/* ==========================================================================
   ULTRA SWEEPER — Win98 Minesweeper, Origami Ultra edition (original art)
   ========================================================================== */
(function () {
  'use strict';
  var U = window.ULTRA98; if (!U) return;
  var LEVELS = {
    beginner: { r: 9, c: 9, m: 10, name: 'Beginner' },
    intermediate: { r: 16, c: 16, m: 40, name: 'Intermediate' },
    expert: { r: 16, c: 30, m: 99, name: 'Expert' }
  };
  var NUMC = { 1: '#0000ff', 2: '#008000', 3: '#ff0000', 4: '#000080', 5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080', q: '#000000' };

  /* extra sprites: numbers and marks laid out on a 16x16 cell */
  (function () {
    function pad(rows, ox, oy, ch) {
      var out = [];
      for (var y = 0; y < 16; y++) {
        var s = '';
        for (var x = 0; x < 16; x++) {
          var r = rows[y - oy], c = r && r.charAt(x - ox);
          s += c === '#' ? ch : '.';
        }
        out.push(s);
      }
      return out;
    }
    ['1', '2', '3', '4', '5', '6', '7', '8', 'q'].forEach(function (d) { U.addSprite('sw' + d, pad(U.glyph(d), 5, 4, '#')); });
    var xr = [];
    for (var y = 0; y < 16; y++) {
      var s = '';
      for (var x = 0; x < 16; x++) s += (y >= 2 && y <= 13 && (Math.abs(x - y) <= 0.6 || Math.abs(x - (15 - y)) <= 0.6 || Math.abs(x + 1 - y) <= 0.4 || Math.abs(x - (14 - y)) <= 0.4)) ? 'x' : '.';
      xr.push(s);
    }
    U.addSprite('swx', xr);
  })();

  var store = U.load('sweeper', {
    level: 'beginner', custom: { r: 12, c: 12, m: 20 }, marks: true, sound: true,
    best: { beginner: { t: 999, n: 'Anonymous' }, intermediate: { t: 999, n: 'Anonymous' }, expert: { t: 999, n: 'Anonymous' } }
  });
  function persist() { U.save('sweeper', store); }

  U.register({
    id: 'sweeper', title: 'Ultra Sweeper', label: 'Ultra Sweeper', menuLabel: 'Ultra &Sweeper', icon: 'icon_sweeper', small: 'mine',
    resizable: false,
    create: function (win) { new Sweeper(win); }
  });

  function Sweeper(win) {
    var self = this;
    this.win = win; win.game = this;
    win.el.classList.add('sw-win');
    win.body.classList.add('u98-scroll');
    win.menu([
      { label: '&Game', items: [
        { label: '&New', key: 'F2', act: function () { self.newGame(); } },
        '-',
        { label: '&Beginner', chk: function () { return store.level === 'beginner'; }, act: function () { self.setLevel('beginner'); } },
        { label: '&Intermediate', chk: function () { return store.level === 'intermediate'; }, act: function () { self.setLevel('intermediate'); } },
        { label: '&Expert', chk: function () { return store.level === 'expert'; }, act: function () { self.setLevel('expert'); } },
        { label: '&Custom…', chk: function () { return store.level === 'custom'; }, act: function () { self.customDialog(); } },
        '-',
        { label: '&Marks (?)', chk: function () { return store.marks; }, act: function () { store.marks = !store.marks; persist(); } },
        { label: 'S&ound', chk: function () { return store.sound; }, act: function () { store.sound = !store.sound; persist(); } },
        '-',
        { label: 'Best &Times…', act: function () { self.bestTimes(); } },
        '-',
        { label: 'E&xit', act: function () { win.close(); } }
      ] },
      { label: '&Help', items: [
        { label: '&How to Play', act: function () { self.help(); } },
        '-',
        { label: '&About Ultra Sweeper…', act: function () { self.about(); } }
      ] }
    ]);
    var b = win.body;
    b.innerHTML =
      '<div class="sw">' +
        '<div class="sw-top"><canvas class="sw-led sw-mines"></canvas><button type="button" class="sw-face" aria-label="New game"><canvas></canvas></button><canvas class="sw-led sw-time"></canvas></div>' +
        (U.touch ? '<div class="sw-mode"><button type="button" class="u98-btn sw-dig down">DIG</button><button type="button" class="u98-btn sw-flag"></button></div>' : '') +
        '<div class="sw-board"><canvas class="sw-cv" aria-label="Minefield"></canvas></div>' +
      '</div>';
    this.ledM = b.querySelector('.sw-mines'); this.ledT = b.querySelector('.sw-time');
    this.faceBtn = b.querySelector('.sw-face'); this.faceCv = this.faceBtn.querySelector('canvas');
    this.cv = b.querySelector('.sw-cv'); this.ctx = this.cv.getContext('2d');
    this.flagMode = false;
    if (U.touch) {
      var fb = b.querySelector('.sw-flag'), db = b.querySelector('.sw-dig');
      fb.appendChild(U.iconEl('flag', 16)); fb.appendChild(document.createTextNode('FLAG'));
      db.addEventListener('click', function () { self.flagMode = false; db.classList.add('down'); fb.classList.remove('down'); });
      fb.addEventListener('click', function () { self.flagMode = true; fb.classList.add('down'); db.classList.remove('down'); });
    }
    /* face button */
    this.faceBtn.addEventListener('pointerdown', function () { self.faceBtn.classList.add('down'); self.drawFace(); });
    this.faceBtn.addEventListener('pointerleave', function () { self.faceBtn.classList.remove('down'); self.drawFace(); });
    this.faceBtn.addEventListener('pointerup', function () { self.faceBtn.classList.remove('down'); self.newGame(); });
    this.bindBoard();
    win.on('key', function (e) {
      if (e.key === 'F2') { self.newGame(); return true; }
      self.cheatKey(e);
      return false;
    });
    win.on('keyup', function () {});
    win.on('resize', function () { self.layout(); });
    win.on('close', function () { self.stopTimer(); });
    win.on('min', function () { self.stopTimer(); });
    win.on('hidden', function () { self.stopTimer(); });
    win.on('restore', function () { self.resumeTimer(); });
    win.on('shown', function () { if (!win.minimized) self.resumeTimer(); });
    this.newGame();
  }

  var P = Sweeper.prototype;
  P.cfg = function () { return store.level === 'custom' ? store.custom : LEVELS[store.level]; };
  P.snd = function (n) { if (store.sound) U.sfx(n); };
  P.setLevel = function (lv) { store.level = lv; persist(); this.newGame(true); };

  P.newGame = function (relayout) {
    var c = this.cfg();
    this.rows = c.r; this.cols = c.c; this.mines = c.m;
    var n = this.rows * this.cols;
    this.mine = new Uint8Array(n); this.st = new Uint8Array(n); this.adj = new Uint8Array(n);
    var placed = 0;
    while (placed < this.mines) { var i = Math.floor(Math.random() * n); if (!this.mine[i]) { this.mine[i] = 1; placed++; } }
    this.calcAdj();
    this.status = 'ready'; this.flags = 0; this.opened = 0; this.boom = -1; this.time = 0; this.press = [];
    this.face = 'smile';
    this.stopTimer();
    this.layout(relayout !== false);
  };
  P.calcAdj = function () {
    for (var i = 0; i < this.mine.length; i++) {
      var k = 0; this.nb(i, function (j) { k += this.mine[j]; });
      this.adj[i] = k;
    }
  };
  P.nb = function (i, fn) {
    var r = Math.floor(i / this.cols), c = i % this.cols;
    for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      var rr = r + dr, cc = c + dc;
      if (rr >= 0 && rr < this.rows && cc >= 0 && cc < this.cols) fn.call(this, rr * this.cols + cc);
    }
  };

  /* ---------- sizing + drawing ---------- */
  P.layout = function (recenter) {
    var s = this.win.deskSize();
    var max = U.touch ? 34 : 26, min = U.touch ? 22 : 16;
    var cs = Math.floor(Math.min((s.w - 34) / this.cols, (s.h - 150 - (U.touch ? 34 : 0)) / this.rows));
    this.cs = Math.max(min, Math.min(max, cs));
    var f = this.cs / 16; this.f = f;
    var d = U.dpr();
    this.cv.width = Math.round(this.cols * this.cs * d); this.cv.height = Math.round(this.rows * this.cs * d);
    this.cv.style.width = this.cols * this.cs + 'px'; this.cv.style.height = this.rows * this.cs + 'px';
    /* a board wider than the screen (Expert on a phone) scrolls by itself; counters and DIG/FLAG stay put */
    var wide = this.cols * this.cs + 34 > s.w;
    this.win.body.querySelector('.sw').classList.toggle('wide', wide);
    this.win.el.style.width = wide ? s.w + 'px' : '';
    var lw = Math.round(41 * f), lh = Math.round(25 * f);
    [this.ledM, this.ledT].forEach(function (c) { c.width = Math.round(lw * d); c.height = Math.round(lh * d); c.style.width = lw + 'px'; c.style.height = lh + 'px'; });
    var fs = Math.round(26 * f);
    this.faceBtn.style.width = fs + 'px'; this.faceBtn.style.height = fs + 'px';
    this.faceCv.width = Math.round(20 * f * d); this.faceCv.height = Math.round(20 * f * d);
    this.faceCv.style.width = Math.round(20 * f) + 'px'; this.faceCv.style.height = Math.round(20 * f) + 'px';
    this.drawAll();
    this.win.fit(recenter);
  };
  P.drawAll = function () { this.drawBoard(); this.drawLeds(); this.drawFace(); };
  P.drawFace = function () {
    var c = this.faceCv, x = c.getContext('2d'), k = c.width / 20;
    x.clearRect(0, 0, c.width, c.height);
    var f = this.faceBtn.classList.contains('down') ? 'smile' : this.face;
    x.drawImage(U.spr('face_' + f, k), 0, 0);
  };
  var SEG = {   /* seven-segment LED, in a 13x23 digit cell, with hairline gaps like the original */
    a: [[2.5, 1], [10.5, 1], [8.7, 2.8], [4.3, 2.8]], b: [[11.8, 2.3], [11.8, 10.4], [10, 9.6], [10, 4.1]], c: [[11.8, 12.6], [11.8, 20.7], [10, 18.9], [10, 13.4]],
    d: [[2.5, 22], [10.5, 22], [8.7, 20.2], [4.3, 20.2]], e: [[1.2, 12.6], [3, 13.4], [3, 18.9], [1.2, 20.7]], f: [[1.2, 2.3], [3, 4.1], [3, 9.6], [1.2, 10.4]],
    g: [[2.4, 11.5], [4.2, 10.6], [8.8, 10.6], [10.6, 11.5], [8.8, 12.4], [4.2, 12.4]]
  };
  var DIGS = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg', '-': 'g', ' ': '' };
  function led(cv, n) {
    var x = cv.getContext('2d'), k = cv.width / 41;
    x.fillStyle = '#808080'; x.fillRect(0, 0, cv.width, cv.height);
    x.fillStyle = '#fff'; x.fillRect(Math.round(k), Math.round(k), cv.width - Math.round(k), cv.height - Math.round(k));
    x.fillStyle = '#000'; x.fillRect(Math.round(k), Math.round(k), cv.width - 2 * Math.round(k), cv.height - 2 * Math.round(k));
    var s;
    if (n < 0) s = '-' + ('0' + Math.min(99, -n)).slice(-2); else s = ('00' + Math.min(999, n)).slice(-3);
    for (var i = 0; i < 3; i++) {
      var on = DIGS[s.charAt(i)] || '', ox = 1 + i * 13, oy = 1;
      'abcdefg'.split('').forEach(function (sg) {
        x.fillStyle = on.indexOf(sg) >= 0 ? '#ff0000' : '#2e0000';
        x.beginPath();
        SEG[sg].forEach(function (p, j) { var px = (ox + p[0]) * k, py = (oy + p[1] * 0.98) * k; if (j) x.lineTo(px, py); else x.moveTo(px, py); });
        x.closePath(); x.fill();
      });
    }
  }
  P.drawLeds = function () { led(this.ledM, this.mines - this.flags); led(this.ledT, this.time); };
  P.drawBoard = function () {
    for (var i = 0; i < this.mine.length; i++) this.drawCell(i);
  };
  P.drawCell = function (i) {
    var x = this.ctx, d = U.dpr(), k = this.cs * d / 16;
    var r = Math.floor(i / this.cols), c = i % this.cols;
    var X = Math.round(c * this.cs * d), Y = Math.round(r * this.cs * d), X2 = Math.round((c + 1) * this.cs * d), Y2 = Math.round((r + 1) * this.cs * d);
    var W = X2 - X, H = Y2 - Y, u = Math.max(1, Math.round(k)), u2 = Math.max(1, Math.round(2 * k));
    var st = this.st[i], over = this.status === 'lost' || this.status === 'won';
    var pressed = st !== 1 && st !== 2 && this.press.indexOf(i) >= 0;
    var openLook = st === 1 || pressed || (over && this.mine[i] && st !== 2) || (this.status === 'lost' && st === 2 && !this.mine[i]);
    if (openLook) {
      x.fillStyle = (i === this.boom) ? '#ff0000' : '#c0c0c0'; x.fillRect(X, Y, W, H);
      x.fillStyle = '#808080'; x.fillRect(X, Y, W, u); x.fillRect(X, Y, u, H);
      if (st === 1 && !this.mine[i] && this.adj[i]) x.drawImage(U.spr('sw' + this.adj[i], k, { '#': NUMC[this.adj[i]] }, 'n' + this.adj[i]), X, Y);
      if (over && this.mine[i] && st !== 2) x.drawImage(U.spr('mine', k), X, Y);
      if (this.status === 'lost' && st === 2 && !this.mine[i]) { x.drawImage(U.spr('mine', k), X, Y); x.drawImage(U.spr('swx', k), X, Y); }
    } else {
      x.fillStyle = '#c0c0c0'; x.fillRect(X, Y, W, H);
      x.fillStyle = '#ffffff'; x.fillRect(X, Y, W - u, u2); x.fillRect(X, Y, u2, H - u);
      x.fillStyle = '#808080'; x.fillRect(X, Y2 - u2, W, u2); x.fillRect(X2 - u2, Y, u2, H);
      x.fillStyle = '#ffffff'; x.fillRect(X, Y2 - u2, u, u); x.fillRect(X2 - u2, Y, u, u);   /* bevel corners */
      if (st === 2) x.drawImage(U.spr('flag', k), X, Y);
      else if (st === 3) x.drawImage(U.spr('swq', k, { '#': '#000' }, 'q'), X, Y);
    }
  };

  /* ---------- input ---------- */
  P.cellAt = function (e) {
    var r = this.cv.getBoundingClientRect();
    var c = Math.floor((e.clientX - r.left) / this.cs), w = Math.floor((e.clientY - r.top) / this.cs);
    if (c < 0 || w < 0 || c >= this.cols || w >= this.rows) return -1;
    return w * this.cols + c;
  };
  P.setPress = function (cells) {
    var old = this.press; this.press = cells;
    var self = this;
    old.concat(cells).forEach(function (i) { if (i >= 0) self.drawCell(i); });
  };
  P.pressCells = function (i, chord) {
    if (i < 0) return [];
    if (!chord) return [i];
    var out = [i]; this.nb(i, function (j) { out.push(j); }); return out;
  };
  P.bindBoard = function () {
    var self = this, cv = this.cv, mouse = null, touch = null;
    /* mouse: left = dig, right = flag, both / middle = chord (classic) */
    cv.addEventListener('mousedown', function (e) {
      if (self.done()) return;
      e.preventDefault();
      U.audioUnlock();
      var i = self.cellAt(e), btns = e.buttons;
      if (e.button === 2 && !(btns & 1)) { self.toggleFlag(i); mouse = { chordOnly: true }; return; }
      var chord = e.button === 1 || (btns & 3) === 3;
      mouse = { chord: chord };
      self.face = 'ooh'; self.drawFace();
      self.setPress(self.pressCells(i, chord));
    });
    window.addEventListener('mousemove', function (e) {
      if (!mouse || mouse.chordOnly && !(e.buttons & 1)) return;
      if (mouse.chordOnly && (e.buttons & 3) === 3) { mouse = { chord: true }; self.face = 'ooh'; self.drawFace(); }
      if (mouse.chordOnly) return;
      if ((e.buttons & 3) === 3) mouse.chord = true;
      self.setPress(self.pressCells(self.cellAt(e), mouse.chord));
    });
    window.addEventListener('mouseup', function (e) {
      if (!mouse) return;
      var m = mouse; mouse = null;
      if (m.chordOnly) return;
      var i = self.cellAt(e);
      self.setPress([]);
      if (self.status === 'ready' || self.status === 'playing') self.face = 'smile';
      if (i >= 0) {
        if (m.chord || self.st[i] === 1) self.chord(i);
        else self.reveal(i);
      }
      self.drawFace();
    });
    /* touch: tap = dig (or flag in FLAG mode), hold = flag, tap a number = clear around it */
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' || self.done()) return;
      U.audioUnlock();
      var i = self.cellAt(e);
      touch = { i: i, x: e.clientX, y: e.clientY, held: false };
      self.face = 'ooh'; self.drawFace(); self.setPress(self.st[i] === 1 ? [] : [i]);
      touch.timer = setTimeout(function () {
        if (!touch) return;
        touch.held = true; self.setPress([]); self.toggleFlag(i);
        if (navigator.vibrate) navigator.vibrate(18);
      }, 380);
    });
    cv.addEventListener('pointermove', function (e) {
      if (!touch || e.pointerType === 'mouse') return;
      if (Math.abs(e.clientX - touch.x) > 10 || Math.abs(e.clientY - touch.y) > 10) { clearTimeout(touch.timer); touch = null; self.setPress([]); self.face = self.status === 'lost' ? 'dead' : self.status === 'won' ? 'cool' : 'smile'; self.drawFace(); }
    });
    function endTouch(e, cancel) {
      if (!touch || e.pointerType === 'mouse') return;
      clearTimeout(touch.timer);
      var t = touch; touch = null;
      self.setPress([]);
      if (self.status === 'ready' || self.status === 'playing') self.face = 'smile';
      if (!cancel && !t.held && t.i >= 0) {
        if (self.st[t.i] === 1) self.chord(t.i);
        else if (self.flagMode) self.toggleFlag(t.i);
        else self.reveal(t.i);
      }
      self.drawFace();
    }
    cv.addEventListener('pointerup', function (e) { endTouch(e, false); });
    cv.addEventListener('pointercancel', function (e) { endTouch(e, true); });
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    cv.addEventListener('mousemove', function (e) { self.hover = self.cellAt(e); self.cheatShow(e.shiftKey); });
  };
  P.done = function () { return this.status === 'won' || this.status === 'lost'; };

  /* ---------- rules ---------- */
  P.start = function (first) {
    if (this.mine[first]) {           /* first click is always safe: move that mine */
      this.mine[first] = 0;
      for (var j = 0; j < this.mine.length; j++) if (!this.mine[j] && j !== first) { this.mine[j] = 1; break; }
      this.calcAdj();
    }
    this.status = 'playing'; this.time = 1; this.drawLeds(); this.resumeTimer();
  };
  P.resumeTimer = function () {
    var self = this;
    if (this.status !== 'playing' || this.timer) return;
    this.timer = setInterval(function () { if (self.time < 999) { self.time++; led(self.ledT, self.time); } }, 1000);
  };
  P.stopTimer = function () { clearInterval(this.timer); this.timer = null; };
  P.reveal = function (i) {
    if (i < 0 || this.done() || this.st[i] === 1 || this.st[i] === 2) return;
    if (this.status === 'ready') this.start(i);
    if (this.mine[i]) { this.lose(i); return; }
    var stack = [i], changed = 0;
    while (stack.length) {
      var j = stack.pop();
      if (this.st[j] === 1 || this.st[j] === 2) continue;
      if (this.st[j] === 3) this.st[j] = 0;
      this.st[j] = 1; this.opened++; changed++;
      if (this.adj[j] === 0) this.nb(j, function (n) { if (this.st[n] !== 1 && this.st[n] !== 2 && !this.mine[n]) stack.push(n); });
    }
    this.drawBoard();
    if (changed) this.snd('click');
    this.checkWin();
  };
  P.chord = function (i) {
    if (i < 0 || this.st[i] !== 1 || !this.adj[i] || this.done()) return;
    var f = 0; this.nb(i, function (j) { if (this.st[j] === 2) f++; });
    if (f !== this.adj[i]) return;
    var self = this, hit = -1;
    this.nb(i, function (j) { if (self.st[j] !== 2 && self.st[j] !== 1 && self.mine[j] && hit < 0) hit = j; });
    if (hit >= 0) { this.lose(hit); return; }
    this.nb(i, function (j) { if (self.st[j] !== 2 && self.st[j] !== 1) self.reveal(j); });
  };
  P.toggleFlag = function (i) {
    if (i < 0 || this.done() || this.st[i] === 1) return;
    var s = this.st[i];
    if (s === 0) { this.st[i] = 2; this.flags++; this.snd('flag'); }
    else if (s === 2) { this.st[i] = store.marks ? 3 : 0; this.flags--; this.snd('unflag'); }
    else this.st[i] = 0;
    this.drawCell(i); led(this.ledM, this.mines - this.flags);
  };
  P.checkWin = function () {
    if (this.opened !== this.rows * this.cols - this.mines || this.done()) return;
    this.status = 'won'; this.stopTimer();
    for (var i = 0; i < this.mine.length; i++) if (this.mine[i] && this.st[i] !== 2) { this.st[i] = 2; this.flags++; }
    this.face = 'cool'; this.drawAll(); this.snd('win');
    var lv = store.level, self = this;
    if (lv !== 'custom' && this.time < store.best[lv].t) {
      setTimeout(function () {
        U.prompt({ title: 'Congratulations', icon: 'info', text: 'You have the fastest time for ' + LEVELS[lv].name.toLowerCase() + ' level. Please type your name:', value: store.lastName || '', max: 24, noCancel: true }, self.win)
          .then(function (name) {
            name = (name || '').trim() || 'Anonymous';
            store.best[lv] = { t: self.time, n: name }; store.lastName = name; persist();
            self.bestTimes(lv);
          });
      }, 350);
    }
  };
  P.lose = function (i) {
    this.status = 'lost'; this.boom = i; this.stopTimer();
    this.face = 'dead'; this.drawAll(); this.snd('boom');
  };

  /* ---------- dialogs ---------- */
  P.bestTimes = function (hl) {
    var self = this;
    function row(lv) { var b = store.best[lv]; return '<tr' + (hl === lv ? ' class="me"' : '') + '><td>' + LEVELS[lv].name + ':</td><td class="n">' + b.t + ' seconds</td><td>' + U.esc(b.n) + '</td></tr>'; }
    U.dialog({
      title: 'Fastest Mine Sweepers', wide: 300, sound: !hl,
      html: '<table class="u98-table">' + row('beginner') + row('intermediate') + row('expert') + '</table>',
      buttons: [{ label: '&Reset Scores', value: 'reset' }, { label: 'OK', def: true, value: 'ok' }]
    }, this.win).then(function (v) {
      if (v === 'reset') {
        Object.keys(store.best).forEach(function (k) { store.best[k] = { t: 999, n: 'Anonymous' }; }); persist(); self.bestTimes();
      }
    });
  };
  P.customDialog = function () {
    var c = store.custom, self = this;
    U.dialog({
      title: 'Custom Field',
      html: '<div class="u98-field"><label>Height:</label><input class="u98-input" data-k="r" inputmode="numeric" value="' + c.r + '"></div>' +
        '<div class="u98-field"><label>Width:</label><input class="u98-input" data-k="c" inputmode="numeric" value="' + c.c + '"></div>' +
        '<div class="u98-field"><label>Mines:</label><input class="u98-input" data-k="m" inputmode="numeric" value="' + c.m + '"></div>',
      buttons: [{ label: 'OK', def: true, value: 'ok' }, { label: 'Cancel', value: null }],
      collect: function (d) {
        var o = {}; d.querySelectorAll('input').forEach(function (i) { o[i.dataset.k] = parseInt(i.value, 10) || 0; }); return o;
      }
    }, this.win).then(function (o) {
      if (!o) return;
      var r = Math.max(9, Math.min(24, o.r)), cc = Math.max(9, Math.min(30, o.c));
      var m = Math.max(10, Math.min((r - 1) * (cc - 1), o.m));
      store.custom = { r: r, c: cc, m: m }; store.level = 'custom'; persist(); self.newGame(true);
    });
  };
  P.help = function () {
    U.dialog({
      title: 'Ultra Sweeper Help', wide: 380,
      html: '<div class="u98-help u98-sunken"><h4>The object</h4><p>Find every red no-sign mine without stepping on one. Clear the board to win.</p>' +
        '<h4>Mouse</h4><ul><li><b>Left-click</b> a square to uncover it.</li><li><b>Right-click</b> to plant a flag (again for a <b>?</b> mark).</li>' +
        '<li><b>Click a number</b> (or press both buttons) to clear around it once the right number of flags are placed.</li></ul>' +
        '<h4>Touch</h4><ul><li><b>Tap</b> to uncover, <b>hold</b> to flag, or switch to <b>FLAG</b> mode.</li><li><b>Tap a number</b> to clear around it.</li></ul>' +
        '<h4>Numbers</h4><p>A number tells you how many mines touch that square.</p><p>Click the monkey to start over. <b>F2</b> also starts a new game.</p></div>',
      buttons: [{ label: 'OK', def: true }]
    }, this.win);
  };
  P.about = function () {
    U.dialog({
      title: 'About Ultra Sweeper', icon: 'info',
      html: '<b>Ultra Sweeper</b><br>Version 1.0 (ULTRA 98)<br>Copyright © 1998–' + new Date().getFullYear() + ' Origami Ultra<br><br>This product is licensed to:<br><b>YOU</b>',
      buttons: [{ label: 'OK', def: true }]
    }, this.win);
  };

  /* ---------- the classic xyzzy trick, for anyone who remembers ---------- */
  P.cheatKey = function (e) {
    this.typed = ((this.typed || '') + (e.key || '').toLowerCase()).slice(-5);
    if (this.typed === 'xyzzy') { this.cheat = true; U.sfx('ding'); }
  };
  P.cheatShow = function (shift) {
    if (!this.cheat) return;
    var dot = this.dot;
    if (!dot) { dot = this.dot = document.createElement('div'); dot.style.cssText = 'position:absolute;left:0;top:0;width:2px;height:2px;z-index:70;pointer-events:none'; this.win.el.parentNode.appendChild(dot); }
    dot.style.display = shift && this.hover >= 0 ? 'block' : 'none';
    dot.style.background = this.hover >= 0 && this.mine[this.hover] ? '#000' : '#fff';
  };
})();
