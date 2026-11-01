/* ============================================================
   GAMI PAINT — GAMIPNT.EXE  (Funtazia · ULTRA 98)
   A late-90s paint program with Origami Ultra colours + stamps.
   Drawings can be saved to My Images and hung in Exit Simulations.
   ============================================================ */
(function () {
  'use strict';
  var U = window.ULTRA98; if (!U) return;
  var GP_ICONS = {"stamp": ["................", ".......00.......", "......0550......", "......0560......", ".....055550.....", ".....056550.....", "....05555650....", "....05655550....", "...0555556550...", "...0565555550...", "..055555565550..", ".00000000000000.", ".0777777777770..", "..0000000000....", "................", "................"], "select": ["................", "................", ".ee.ee.ee.ee.ee.", "................", ".e............e.", ".e............e.", "................", ".e............e.", ".e............e.", "................", ".e............e.", ".e............e.", "................", ".ee.ee.ee.ee.ee.", "................", "................"], "eraser": ["................", "................", ".......eeeeeee..", "......emmmmmme..", ".....emmmmmmee..", "....emmmmmmewe..", "...emmmmmmewwe..", "..eeeeeeeewwe...", "..ewwwwwwewe....", "..ewwwwwwee.....", "..ewwwwwwe......", "..eeeeeeee......", "................", "................", "................", "................"], "fill": ["................", "......ee........", ".....e..e.......", ".....e..ee......", "....eeeeqqe.....", "...eqqqqqqqe....", "..eqqqqqqqqqe...", ".eqqqqqqqqqqqe..", "..eqqqqqqqqqeUU.", "...eqqqqqqqeUUU.", "....eqqqqqe.UUU.", ".....eqqqe..UUU.", "......eqe....U..", ".......e........", "................", "................"], "pick": ["................", "............ee..", "...........eeee.", "..........eeeee.", ".........eeeeee.", "........eqeeee..", ".......eqqe.....", "......eqqqe.....", ".....eqqqe......", "....eqqqe.......", "...eqqqe........", "..eqqqe.........", "..eqqe..........", ".ee.e...........", ".e..............", "................"], "zoom": ["................", "....eeee........", "...ewwwwe.......", "..ewwwwwwe......", "..ewwwwwwe......", "..ewwwwwwe......", "..ewwwwwwe......", "...ewwwwe.......", "....eeeeee......", "........eee.....", ".........eee....", "..........eee...", "...........eee..", "............ee..", "................", "................"], "pencil": ["................", "...........ee...", "..........eqqe..", ".........eqqqe..", "........eyyye...", ".......eyyye....", "......eyyye.....", ".....eyyye......", "....eyyye.......", "...ejyye........", "...ejje.........", "..ejje..........", "..eee...........", "..e.............", "................", "................"], "brush": ["................", ".............ee.", "............eje.", "...........ejje.", "..........ejje..", ".........ejje...", "........ejje....", ".......eqqe.....", "......eqqe......", ".....eUUe.......", "....eUUUe.......", "...eUUUe........", "...eUUe.........", "..eUe...........", "..ee............", "................"], "air": ["................", "..e.e...........", ".e.e.e..........", "..e.e.ee........", ".e.e.eqqe.......", "......eqqee.....", ".......eQQQe....", "......eqqqqqe...", ".....eqqqqqqqe..", ".....eqqqqqqqe..", ".....eqqqqqqqe..", ".....eqqqqqqqe..", ".....eqqqqqqqe..", "......eeeeeee...", "................", "................"], "text": ["................", "................", ".......ee.......", ".......ee.......", "......eeee......", "......e.ee......", ".....ee..ee.....", ".....ee..ee.....", "....eeeeeeee....", "....ee....ee....", "...ee......ee...", "..eeee....eeee..", "................", "................", "................", "................"], "line": ["................", "................", ".............e..", "............e...", "...........e....", "..........e.....", ".........e......", "........e.......", ".......e........", "......e.........", ".....e..........", "....e...........", "...e............", "..e.............", "................", "................"], "curve": ["................", "................", "..........ee....", ".........e..e...", "........e....e..", ".......e........", ".......e........", "......e.........", "......e.........", ".....e..........", "....e...........", "...e............", "..e.............", "................", "................", "................"], "rect": ["................", "................", "................", ".eeeeeeeeeeeeee.", ".e............e.", ".e............e.", ".e............e.", ".e............e.", ".e............e.", ".e............e.", ".e............e.", ".eeeeeeeeeeeeee.", "................", "................", "................", "................"], "poly": ["................", "................", "....eeeee.......", "....e....e......", "...e......e.....", "...e.......eeeee", "..e............e", "..e...........e.", ".e...........e..", ".e..........e...", ".eeeeeeeeeeee...", "................", "................", "................", "................", "................"], "ellipse": ["................", "................", "................", ".....eeeeee.....", "...ee......ee...", "..e..........e..", ".e............e.", ".e............e.", ".e............e.", "..e..........e..", "...ee......ee...", ".....eeeeee.....", "................", "................", "................", "................"], "rrect": ["................", "................", "................", "...eeeeeeeeee...", "..e..........e..", ".e............e.", ".e............e.", ".e............e.", ".e............e.", ".e............e.", "..e..........e..", "...eeeeeeeeee...", "................", "................", "................", "................"], "app": ["................................", "................................", "................................", ".....kkkkkkkkkkkkkkkkkkkkkkkk...", ".....kwwwwwwwwwwwwwwwwwwwwwwk...", ".....kwwwwwwwwwwwwwwwwwwwwwwk...", ".....kwwwwwwwwwwwwwwwwwwwwwwkHh.", ".....kwwwwwwwwwUUUUwwwwwwwwwHh..", ".....kwwwwwwwwUwwwwUwwwwwwwHh...", ".....kwwwwwwwUwwwwwwUwwwwwHhk...", ".....kwwwwwUUwwwwxxxwUUUUHhwk...", ".....kwwwwUwwwwwwxxxwwwwHhwwk...", ".....kwwwwwwwwwwxwwwwwwHhwwwk...", ".....kwwwwwwwwwxxwwwwwHhwwwwk...", ".....kwwxwwwwwwxwwwwwHhwwwwwk...", ".....kwwxxwwwwxwwwwwHhwwwwwwk...", ".....kwwwxwwwwxwwwwHh7wwwwwwk...", ".....kwwwwxxxxwwwwHh7777wwwwk...", ".....kwwwwxxxxwwwqq77777wwwwk...", ".....kwwwww6wwwwqq7777777wwwk...", ".....kwww66666wqqww77777wwwwk...", "....HHHHHHw6wweewww77777wwwwk...", "...HjjjyyjHw6eewwwwwwwwwwwwwk...", "..HjxxjyyjjHeewwwwwwwwwwwwwwk...", ".HjjxxjjjjUUHkkkkkkkkkkkkkkkk...", ".Hjjjj..jjUUHQQQQQQQQQQQQQQQQQQ.", ".Hjjjj..jjjjHQQQQQQQQQQQQQQQQQ..", ".HjjLLjjjjjjH...................", "..HjLLjj55jH....................", "...Hjjjj55H.....................", "....HHHHHH......................", "................................"], "app_s": ["................", "..kkkkkkkkkkkkk.", "..kwwwwwwwwwwwk.", "..kwxxwwwwwhHwk.", "..kwwxxwwwhHwwk.", "..kwUUxwwhHwwwk.", "..kwwwwwqqwwwwk.", "..kww6wqqwwwwwk.", "..kw666eww77wwk.", "..kww6ewww77wwk.", "..kkkkkkkkkkkkk.", ".jjjj...........", "jxjyjj..........", "jjUjLj..........", ".jjjjj..........", "................"]};
  Object.keys(GP_ICONS).forEach(function (k) {
    if (k === 'app') U.addSprite('icon_gamipaint', GP_ICONS[k]);
    else if (k === 'app_s') U.addSprite('icon_gamipaint_s', GP_ICONS[k]);
    else U.addSprite('gp_' + k, GP_ICONS[k]);
  });

  var TOOLS = [
    ['stamp', 'Stamp', 'Stamps a picture: the wizard, the monkey, the logo and more.'],
    ['select', 'Select', 'Selects a rectangular part of the picture to move, copy, or edit.'],
    ['eraser', 'Eraser/Color Eraser', 'Erases a portion of the picture, using the selected eraser shape.'],
    ['fill', 'Fill With Color', 'Fills an area with the current drawing color.'],
    ['pick', 'Pick Color', 'Picks up a color from the picture for drawing.'],
    ['zoom', 'Magnifier', 'Changes the magnification.'],
    ['pencil', 'Pencil', 'Draws a free-form line one pixel wide.'],
    ['brush', 'Brush', 'Draws using a brush with the selected shape and size.'],
    ['air', 'Airbrush', 'Draws using an airbrush of the selected size.'],
    ['text', 'Text', 'Inserts text into the picture.'],
    ['line', 'Line', 'Draws a straight line with the selected line width.'],
    ['curve', 'Curve', 'Draws a curved line with the selected line width.'],
    ['rect', 'Rectangle', 'Draws a rectangle with the selected fill style.'],
    ['poly', 'Polygon', 'Draws a polygon with the selected fill style.'],
    ['ellipse', 'Ellipse', 'Draws an ellipse with the selected fill style.'],
    ['rrect', 'Rounded Rectangle', 'Draws a rounded rectangle with the selected fill style.']
  ];
  var IDLE_HINT = 'For Help, click Help Topics on the Help Menu.';
  var PALETTE = [
    '#000000', '#808080', '#7a2a2a', '#8a7a2a', '#1a6a2a', '#0a7a7a', '#1a2a7a', '#5a2a8a', '#26245e', '#4d3b36', '#cf6a28', '#e8692b', '#ff3a3a', '#ff5a7a',
    '#ffffff', '#c0c0c0', '#39ff14', '#ffe14d', '#f2e35e', '#63cfc2', '#7fd4ff', '#2f7fd8', '#dcbde8', '#8e72c8', '#ff9a4a', '#ffd086', '#a9c9e8', '#9fe0c8'
  ];
  var ZOOMS = [1, 2, 6, 8];
  var BRUSH = [];   /* 12 brush tips: round, square, slash, backslash x 3 sizes */
  ['round', 'square', 'slash', 'back'].forEach(function (s) { [8, 5, 2].forEach(function (z) { BRUSH.push({ shape: s, size: z }); }); });
  var LINES = [1, 2, 3, 4, 5], ERASERS = [4, 6, 8, 10], AIRS = [4, 8, 12];
  var STAMPS = [['wizard', 'The wizard'], ['monkey', 'The monkey'], ['logo', 'Origami Ultra logo'], ['banana', 'Banana'], ['bottle', 'ULTRAWATER'], ['cassette', 'Cassette'], ['star', 'Star'], ['mine', 'No sign']];
  var STAMP_SIZES = [32, 64, 128];
  var FONTS = [['Arial', 'Arial, Helvetica, sans-serif'], ['Georgia', 'Georgia, "Times New Roman", serif'], ['VT323', 'VT323, monospace'], ['TS Block', '"TS Block Bold", "Press Start 2P", sans-serif'], ['Courier', '"Courier New", monospace'], ['Comic', '"Comic Sans MS", "Comic Sans", cursive']];
  var FONT_SIZES = [10, 12, 16, 20, 28, 36, 48, 72];

  var store = U.load('gamipaint', { prim: '#000000', sec: '#ffffff', tool: 'pencil', brush: 4, line: 0, eraser: 1, air: 1, fill: 0, zoom: 0, stamp: 0, stampSize: 1, font: 0, fontSize: 4, bold: false, clearSel: false });
  function persist() { U.save('gamipaint', store); }

  function canvas(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function rgb(c) { var a = parseInt(c.slice(1), 16); return [a >> 16, (a >> 8) & 255, a & 255]; }
  function hex(r, g, b) { return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function bres(x0, y0, x1, y1, fn) {
    var dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy;
    for (var n = 0; n < 20000; n++) { fn(x0, y0); if (x0 === x1 && y0 === y1) break; var e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } }
  }

  /* ---------- stamp art ---------- */
  var logoImg = null;
  function stampCanvas(kind) {
    var c = canvas(256, 256), x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    if (kind === 'wizard') {
      var w = canvas(256, 384);
      if (U.art.drawWizard) U.art.drawWizard(w.getContext('2d'), 'idle');
      x.drawImage(w, 0, 0, 256, 384, 43, 0, 171, 256);
    } else if (kind === 'monkey') x.drawImage(U.spr('face_smile', 12), 8, 8, 240, 240);
    else if (kind === 'logo') { if (logoImg && logoImg.complete && logoImg.naturalWidth) { x.imageSmoothingEnabled = true; x.drawImage(logoImg, 0, 0, 256, 256); } }
    else if (kind === 'star') {
      x.beginPath();
      for (var i = 0; i < 10; i++) { var a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 50 : 116; x.lineTo(128 + Math.cos(a) * r, 136 + Math.sin(a) * r); }
      x.closePath(); x.fillStyle = '#63cfc2'; x.fill(); x.lineWidth = 12; x.strokeStyle = '#2b2229'; x.lineJoin = 'round'; x.stroke();
    } else {
      var name = kind, rows = U.rows(name), k = Math.floor(240 / Math.max(rows[0].length, rows.length));
      var s = U.spr(name, k); x.drawImage(s, (256 - s.width) / 2, (256 - s.height) / 2);
    }
    return c;
  }
  var stampCache = {};
  function stamp(kind) { if (kind === 'logo' && !(logoImg && logoImg.naturalWidth)) return stampCanvas(kind); return stampCache[kind] || (stampCache[kind] = stampCanvas(kind)); }

  /* ---------- the program ---------- */
  function Paint(win) {
    var self = this;
    this.win = win; win.game = this;
    win.el.classList.add('gp-win');
    this.name = 'untitled';
    if (!logoImg) { logoImg = new Image(); logoImg.src = 'favicon-192.png'; }
    win.menu([
      { label: '&File', items: [
        { label: '&New', key: 'Ctrl+N', act: function () { self.newPic(); } },
        { label: '&Open…', key: 'Ctrl+O', act: function () { self.open(); } },
        { label: '&Save', key: 'Ctrl+S', act: function () { self.save(); } },
        { label: 'Save to &My Images', act: function () { self.saveToImages(); } },
        '-',
        { label: 'Set As &Wallpaper (Tiled)', act: function () { self.wallpaper('tile'); } },
        { label: 'Set As Wa&llpaper (Centered)', act: function () { self.wallpaper('center'); } },
        { label: 'Restore &Default Wallpaper', act: function () { self.wallpaper(null); } },
        '-',
        { label: 'E&xit', act: function () { win.close(); } }
      ] },
      { label: '&Edit', items: [
        { label: '&Undo', key: 'Ctrl+Z', dis: function () { return !self.undos.length; }, act: function () { self.undo(); } },
        { label: '&Repeat', key: 'Ctrl+Y', dis: function () { return !self.redos.length; }, act: function () { self.redo(); } },
        '-',
        { label: 'Cu&t', key: 'Ctrl+X', dis: function () { return !self.sel; }, act: function () { self.cut(); } },
        { label: '&Copy', key: 'Ctrl+C', dis: function () { return !self.sel; }, act: function () { self.copy(); } },
        { label: '&Paste', key: 'Ctrl+V', dis: function () { return !self.clip; }, act: function () { self.paste(self.clip); } },
        { label: 'C&lear Selection', key: 'Del', dis: function () { return !self.sel; }, act: function () { self.deleteSel(); } },
        { label: 'Select &All', key: 'Ctrl+A', act: function () { self.selectAll(); } }
      ] },
      { label: '&View', items: [
        { label: '&Zoom', sub: function () { return ZOOMS.map(function (z, i) { return { label: z === 1 ? '&Normal Size' : z + '×', chk: store.zoom === i, act: function () { self.setZoom(i); } }; }); } }
      ] },
      { label: '&Image', items: [
        { label: '&Flip/Rotate…', key: 'Ctrl+R', act: function () { self.flipDialog(); } },
        { label: '&Invert Colors', key: 'Ctrl+I', act: function () { self.invert(); } },
        { label: '&Attributes…', key: 'Ctrl+E', act: function () { self.attributes(); } },
        { label: '&Clear Image', key: 'Ctrl+Shft+N', act: function () { self.clearImage(); } },
        '-',
        { label: '&Draw Opaque', chk: function () { return !store.clearSel; }, act: function () { store.clearSel = !store.clearSel; persist(); self.drawOpts(); self.redrawFloat(); } }
      ] },
      { label: '&Colors', items: [
        { label: '&Edit Colors…', act: function () { self.editColor('prim'); } },
        { label: 'S&wap Colors', act: function () { self.swapColors(); } }
      ] },
      { label: '&Help', items: [
        { label: '&Help Topics', act: function () { self.help(); } },
        '-',
        { label: '&About GAMI PAINT', act: function () { self.about(); } }
      ] }
    ]);
    var tb = TOOLS.map(function (t) { return '<button type="button" class="gp-tool" data-t="' + t[0] + '" title="' + t[1] + '"></button>'; }).join('');
    var pal = PALETTE.map(function (c) { return '<button type="button" class="gp-sw" data-c="' + c + '" style="background:' + c + '" aria-label="' + c + '"></button>'; }).join('');
    win.body.innerHTML =
      '<div class="gp"><div class="gp-main">' +
        '<div class="gp-tools"><div class="gp-tgrid">' + tb + '</div><div class="gp-opts u98-sunken"></div></div>' +
        '<div class="gp-area"><div class="gp-stage"><canvas class="gp-doc"></canvas><canvas class="gp-ov"></canvas><div class="gp-sel"></div>' +
        '<textarea class="gp-text" spellcheck="false"></textarea></div></div>' +
        '<div class="gp-fonts u98-raised"><div class="gp-ft u98-title"><span class="t">Fonts</span></div><div class="gp-fb"><select class="gp-ff"></select><select class="gp-fs"></select><button type="button" class="u98-btn gp-fbold"><b>B</b></button></div></div>' +
      '</div><div class="gp-colors"><div class="gp-cur u98-sunken"><i class="s"></i><i class="p"></i></div><div class="gp-pal">' + pal + '</div><button type="button" class="u98-btn gp-swap" title="Swap colors">⇄</button></div></div>' +
      '<input type="file" accept="image/*" class="gp-file" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none">';
    var b = win.body;
    this.area = b.querySelector('.gp-area'); this.stage = b.querySelector('.gp-stage');
    this.cv = b.querySelector('.gp-doc'); this.ov = b.querySelector('.gp-ov'); this.selEl = b.querySelector('.gp-sel');
    this.textEl = b.querySelector('.gp-text'); this.fontsEl = b.querySelector('.gp-fonts');
    this.X = this.cv.getContext('2d', { willReadFrequently: true }); this.O = this.ov.getContext('2d');
    this.optsEl = b.querySelector('.gp-opts'); this.fileEl = b.querySelector('.gp-file');
    b.querySelectorAll('.gp-tool').forEach(function (bt) { bt.appendChild(U.iconEl('gp_' + bt.dataset.t, 16)); });
    this.st = win.status([{ text: IDLE_HINT }, { text: '', w: 86 }, { text: '', w: 86 }]);
    this.undos = []; this.redos = [];
    /* size: the window's working area on phones, the classic default elsewhere */
    var W = 512, H = 384;
    if (U.isSmall()) { var s = win.deskSize(); W = clamp(Math.floor(s.w - 90), 160, 1024); H = clamp(Math.floor(s.h - 170), 160, 1024); }
    else { var ds = win.deskSize(); win.el.style.width = Math.min(ds.w - 16, 660) + 'px'; win.el.style.height = Math.min(ds.h - 16, 500) + 'px'; }
    var saved = null; try { saved = localStorage.getItem('ou98_gamipaint_doc'); } catch (e) {}
    this.resizeDoc(W, H, true);
    this.fillAll('#ffffff');
    if (saved) { var im = new Image(); im.onload = function () { self.resizeDoc(im.width, im.height, true); self.fillAll('#ffffff'); self.X.drawImage(im, 0, 0); self.dirty = false; }; im.src = saved; }
    this.setZoom(store.zoom, true);
    this.bind();
    this.setTool(store.tool);
    this.drawColors();
    this.buildFonts();
    win.on('key', function (e) { return self.key(e); });
    win.on('close', function () { self.autosave(true); document.removeEventListener('paste', self.onPaste); clearInterval(self.airT); });
    win.on('blur', function () { self.commitText(); });
    this.onPaste = function (e) { if (U.active !== win || document.querySelector('.u98-modal')) return; self.pasteEvent(e); };
    document.addEventListener('paste', this.onPaste);
  }
  var P = Paint.prototype;

  /* ---------- document ---------- */
  P.resizeDoc = function (W, H, blank) {
    var old = blank ? null : this.X.getImageData(0, 0, this.W, this.H);
    this.W = W; this.H = H;
    [this.cv, this.ov].forEach(function (c) { c.width = W; c.height = H; });
    this.X.imageSmoothingEnabled = false;
    if (!blank) { this.X.fillStyle = store.sec; this.X.fillRect(0, 0, W, H); this.X.putImageData(old, 0, 0); }
    this.tmp = canvas(W, H);
    this.layout();
    this.stats();
  };
  P.fillAll = function (c) { this.X.fillStyle = c; this.X.fillRect(0, 0, this.W, this.H); };
  P.layout = function () {
    var z = ZOOMS[store.zoom], w = this.W * z + 'px', h = this.H * z + 'px';
    this.stage.style.width = w; this.stage.style.height = h;
    [this.cv, this.ov].forEach(function (c) { c.style.width = w; c.style.height = h; });
    this.placeSel();
  };
  P.setZoom = function (i, quiet) { this.commitText(); store.zoom = clamp(i, 0, ZOOMS.length - 1); persist(); this.layout(); if (!quiet) this.drawOpts(); };
  P.stats = function (p) { this.st[1].textContent = p ? p.x + ',' + p.y : ''; this.st[2].textContent = this.sel ? this.sel.w + '×' + this.sel.h : this.W + '×' + this.H; };
  P.push = function () {
    this.undos.push({ w: this.W, h: this.H, d: this.X.getImageData(0, 0, this.W, this.H) });
    if (this.undos.length > 24) this.undos.shift();
    this.redos = []; this.dirty = true; this.autosave();
  };
  P.restore = function (s) { if (s.w !== this.W || s.h !== this.H) this.resizeDoc(s.w, s.h, true); this.X.putImageData(s.d, 0, 0); };
  P.undo = function () { this.commitText(); this.dropSel(); if (!this.undos.length) return; this.redos.push({ w: this.W, h: this.H, d: this.X.getImageData(0, 0, this.W, this.H) }); this.restore(this.undos.pop()); this.autosave(); };
  P.redo = function () { if (!this.redos.length) return; this.undos.push({ w: this.W, h: this.H, d: this.X.getImageData(0, 0, this.W, this.H) }); this.restore(this.redos.pop()); this.autosave(); };
  P.autosave = function (now) {
    var self = this; clearTimeout(this.saveT);
    function go() { try { localStorage.setItem('ou98_gamipaint_doc', self.cv.toDataURL('image/png')); } catch (e) {} }
    if (now) go(); else this.saveT = setTimeout(go, 1200);
  };

  /* ---------- aliased drawing: draw smooth, then snap every pixel to on/off like 1998 ---------- */
  P.aliased = function (ctx, color, draw, bbox) {
    var t = this.tmp, c = t.getContext('2d'), W = this.W, H = this.H;
    var x0 = 0, y0 = 0, x1 = W, y1 = H;
    if (bbox) { x0 = clamp(Math.floor(bbox[0]) - 2, 0, W); y0 = clamp(Math.floor(bbox[1]) - 2, 0, H); x1 = clamp(Math.ceil(bbox[2]) + 3, 0, W); y1 = clamp(Math.ceil(bbox[3]) + 3, 0, H); }
    if (x1 <= x0 || y1 <= y0) return;
    c.clearRect(x0, y0, x1 - x0, y1 - y0);
    c.save(); c.fillStyle = c.strokeStyle = color; c.lineJoin = 'miter'; c.lineCap = 'square'; draw(c); c.restore();
    var id = c.getImageData(x0, y0, x1 - x0, y1 - y0), d = id.data, k = rgb(color);
    for (var i = 0; i < d.length; i += 4) { if (d[i + 3] >= 110) { d[i] = k[0]; d[i + 1] = k[1]; d[i + 2] = k[2]; d[i + 3] = 255; } else d[i + 3] = 0; }
    c.putImageData(id, x0, y0);
    ctx.drawImage(t, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0);
  };
  P.dot = function (ctx, x, y, color) { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); };
  var maskCache = {};
  function brushMask(b, color) {
    var key = b.shape + b.size + color; if (maskCache[key]) return maskCache[key];
    var s = b.size, c = canvas(s, s), x = c.getContext('2d'); x.fillStyle = color;
    for (var j = 0; j < s; j++) for (var i = 0; i < s; i++) {
      var on = b.shape === 'square' ? true : b.shape === 'round' ? (Math.pow(i - (s - 1) / 2, 2) + Math.pow(j - (s - 1) / 2, 2) <= Math.pow(s / 2, 2) + 0.3) : b.shape === 'slash' ? (i + j === s - 1) : (i === j);
      if (on) x.fillRect(i, j, 1, 1);
    }
    return (maskCache[key] = c);
  }
  /* shape outline / fill per the fill-style option */
  P.shape = function (ctx, kind, a, bpt, fg, bg, preview) {
    var x0 = Math.min(a.x, bpt.x), y0 = Math.min(a.y, bpt.y), x1 = Math.max(a.x, bpt.x), y1 = Math.max(a.y, bpt.y);
    var lw = LINES[store.line], st = store.fill, w = x1 - x0, h = y1 - y0, self = this;
    function path(c, inset) {
      var i = inset || 0, X0 = x0 + i, Y0 = y0 + i, X1 = x1 + 1 - i, Y1 = y1 + 1 - i;
      c.beginPath();
      if (kind === 'rect') c.rect(X0, Y0, X1 - X0, Y1 - Y0);
      else if (kind === 'ellipse') c.ellipse((X0 + X1) / 2, (Y0 + Y1) / 2, Math.max(0.5, (X1 - X0) / 2), Math.max(0.5, (Y1 - Y0) / 2), 0, 0, Math.PI * 2);
      else { var r = Math.min(10, (X1 - X0) / 2, (Y1 - Y0) / 2); c.moveTo(X0 + r, Y0); c.arcTo(X1, Y0, X1, Y1, r); c.arcTo(X1, Y1, X0, Y1, r); c.arcTo(X0, Y1, X0, Y0, r); c.arcTo(X0, Y0, X1, Y0, r); c.closePath(); }
    }
    var bb = [x0 - lw, y0 - lw, x1 + lw + 1, y1 + lw + 1];
    if (st === 1) this.aliased(ctx, bg, function (c) { path(c, lw); c.fill(); }, bb);
    if (st === 2) this.aliased(ctx, fg, function (c) { path(c); c.fill(); }, bb);
    if (st !== 2) {
      if (kind === 'rect') { ctx.fillStyle = fg; ctx.fillRect(x0, y0, w + 1, lw); ctx.fillRect(x0, y1 - lw + 1, w + 1, lw); ctx.fillRect(x0, y0, lw, h + 1); ctx.fillRect(x1 - lw + 1, y0, lw, h + 1); }
      else this.aliased(ctx, fg, function (c) { c.lineWidth = lw; path(c, lw / 2); c.stroke(); }, bb);
    }
  };
  P.flood = function (x, y, color) {
    var W = this.W, H = this.H, id = this.X.getImageData(0, 0, W, H), d = new Uint32Array(id.data.buffer), k = rgb(color);
    var target = d[y * W + x], rep = (255 << 24) | (k[2] << 16) | (k[1] << 8) | k[0];
    if (target === rep) return;
    var stack = [x, y];
    while (stack.length) {
      var py = stack.pop(), px = stack.pop(), i = py * W + px;
      while (px >= 0 && d[i] === target) { px--; i--; }
      px++; i++;
      var up = false, dn = false;
      while (px < W && d[i] === target) {
        d[i] = rep;
        if (py > 0) { if (d[i - W] === target) { if (!up) { stack.push(px, py - 1); up = true; } } else up = false; }
        if (py < H - 1) { if (d[i + W] === target) { if (!dn) { stack.push(px, py + 1); dn = true; } } else dn = false; }
        px++; i++;
      }
    }
    this.X.putImageData(id, 0, 0);
  };

  /* ---------- input ---------- */
  P.pt = function (e) { var r = this.cv.getBoundingClientRect(), z = ZOOMS[store.zoom]; return { x: Math.floor((e.clientX - r.left) / z), y: Math.floor((e.clientY - r.top) / z) }; };
  P.bind = function () {
    var self = this, area = this.area;
    area.addEventListener('pointerdown', function (e) {
      if (e.target === self.textEl) return;
      if (e.button !== 0 && e.button !== 2) return;
      if (e.pointerType === 'touch' && !e.target.closest('.gp-stage')) return;   /* drag the grey area to scroll */
      if (e.target === area && (e.offsetX > area.clientWidth || e.offsetY > area.clientHeight)) return;   /* scrollbars */
      e.preventDefault(); U.audioUnlock && U.audioUnlock();
      if (self.drag) return;
      try { area.setPointerCapture(e.pointerId); } catch (er) {}
      self.drag = { id: e.pointerId, btn: e.button, shift: e.shiftKey };
      self.down(self.pt(e), e);
    });
    area.addEventListener('pointermove', function (e) {
      var p = self.pt(e); self.stats(p);
      if (self.drag && self.drag.id === e.pointerId) { self.drag.shift = e.shiftKey; self.move(p, e); }
      else if (!self.drag) self.hover(p, e);
    });
    function up(e) { if (!self.drag || self.drag.id !== e.pointerId) return; var p = self.pt(e); self.drag.shift = e.shiftKey; self.up(p, e); self.drag = null; }
    area.addEventListener('pointerup', up); area.addEventListener('pointercancel', up);
    area.addEventListener('pointerleave', function () { if (!self.drag) { self.clearOv(); self.stats(); } });
    area.addEventListener('dblclick', function (e) { if (store.tool === 'poly' && self.poly) self.finishPoly(); });
    this.win.body.querySelectorAll('.gp-tool').forEach(function (bt) {
      bt.addEventListener('click', function () { self.setTool(bt.dataset.t); });
      bt.addEventListener('mouseenter', function () { self.st[0].textContent = TOOLS.filter(function (t) { return t[0] === bt.dataset.t; })[0][2]; });
      bt.addEventListener('mouseleave', function () { self.st[0].textContent = IDLE_HINT; });
    });
    this.win.body.querySelectorAll('.gp-sw').forEach(function (sw) {
      var lp = null;
      sw.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (e.button === 2) { self.setColor('sec', sw.dataset.c); return; }
        if (e.pointerType === 'touch') lp = setTimeout(function () { lp = 'done'; self.setColor('sec', sw.dataset.c); }, 450);
      });
      sw.addEventListener('pointerup', function (e) { if (e.button === 2) return; if (lp === 'done') { lp = null; return; } clearTimeout(lp); lp = null; self.setColor('prim', sw.dataset.c); });
      sw.addEventListener('dblclick', function () { self.editColor('prim', sw); });
    });
    this.win.body.querySelector('.gp-swap').addEventListener('click', function () { self.swapColors(); });
    this.win.body.querySelector('.gp-cur').addEventListener('click', function () { self.swapColors(); });
    this.fileEl.addEventListener('change', function () { var f = self.fileEl.files && self.fileEl.files[0]; self.fileEl.value = ''; if (f) self.loadFile(f); });
    this.textEl.addEventListener('input', function () { self.fitText(); });
    this.textEl.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); self.cancelText(); } });
  };
  P.colors = function () { var r = this.drag && this.drag.btn === 2; return { fg: r ? store.sec : store.prim, bg: r ? store.prim : store.sec }; };
  P.clearOv = function () { this.O.clearRect(0, 0, this.W, this.H); if (this.float) this.drawFloat(); };

  P.setTool = function (t) {
    this.commitText(); this.cancelShape();
    if (t !== 'select') this.dropSel();
    if (t === 'pick' && store.tool !== 'pick') this.prevTool = store.tool;
    store.tool = t; persist();
    this.win.body.querySelectorAll('.gp-tool').forEach(function (b) { b.classList.toggle('down', b.dataset.t === t); });
    this.area.dataset.tool = t;
    this.fontsEl.classList.toggle('on', t === 'text');
    this.drawOpts(); this.clearOv();
  };
  P.down = function (p, e) {
    var t = store.tool, c = this.colors(), self = this;
    this.start = p; this.last = p;
    if (t === 'pencil') { this.push(); this.dot(this.X, p.x, p.y, c.fg); }
    else if (t === 'brush') { this.push(); this.brushAt(p, p, c.fg); }
    else if (t === 'eraser') { this.push(); this.eraseAt(p, p); }
    else if (t === 'air') { this.push(); this.airP = p; clearInterval(this.airT); this.spray(c.fg); this.airT = setInterval(function () { self.spray(c.fg); }, 30); }
    else if (t === 'fill') { if (p.x >= 0 && p.y >= 0 && p.x < this.W && p.y < this.H) { this.push(); this.flood(p.x, p.y, c.fg); } }
    else if (t === 'pick') {
      if (p.x >= 0 && p.y >= 0 && p.x < this.W && p.y < this.H) { var d = this.X.getImageData(p.x, p.y, 1, 1).data; this.setColor(this.drag.btn === 2 ? 'sec' : 'prim', hex(d[0], d[1], d[2])); }
    }
    else if (t === 'zoom') {
      var z0 = store.zoom, z1 = clamp(z0 + (this.drag.btn === 2 ? -1 : 1), 0, ZOOMS.length - 1);
      this.zoomAt(z1, p);
    }
    else if (t === 'stamp') { this.push(); this.stampAt(p, this.X); }
    else if (t === 'select') {
      if (this.sel && this.inSel(p)) { if (!this.float) this.liftSel(); this.moving = { dx: p.x - this.sel.x, dy: p.y - this.sel.y }; }
      else { this.dropSel(); this.selStart = p; }
    }
    else if (t === 'text') {
      if (this.textOn) { this.commitText(); this.textJustDone = true; return; }
      this.textJustDone = false; this.selStart = p;
    }
    else if (t === 'curve') { if (!this.curve) this.curve = { a: p, b: p, c1: null, c2: null, stage: 0 }; this.curveDrag(p); }
    else if (t === 'poly') { if (!this.poly) this.poly = { pts: [p, p] }; else { this.poly.pts.push(p); } this.previewPoly(); }
  };
  P.move = function (p) {
    var t = store.tool, c = this.colors(), last = this.last, self = this;
    if (t === 'pencil') { bres(last.x, last.y, p.x, p.y, function (x, y) { self.dot(self.X, x, y, c.fg); }); }
    else if (t === 'brush') this.brushAt(last, p, c.fg);
    else if (t === 'eraser') this.eraseAt(last, p);
    else if (t === 'air') this.airP = p;
    else if (t === 'line') { this.O.clearRect(0, 0, this.W, this.H); this.lineTo(this.O, this.start, this.snap(this.start, p), c.fg); }
    else if (t === 'rect' || t === 'ellipse' || t === 'rrect') { this.O.clearRect(0, 0, this.W, this.H); this.shape(this.O, t, this.start, this.square(this.start, p), c.fg, c.bg, true); }
    else if (t === 'select') {
      if (this.moving) { this.sel.x = p.x - this.moving.dx; this.sel.y = p.y - this.moving.dy; this.placeSel(); this.clearOv(); }
      else if (this.selStart) { this.sel = this.rectFrom(this.selStart, p); this.placeSel(); }
    }
    else if (t === 'text' && this.selStart && !this.textJustDone) { this.textBox = this.rectFrom(this.selStart, p); this.placeSel(this.textBox); }
    else if (t === 'curve') this.curveDrag(p);
    else if (t === 'poly' && this.poly) { this.poly.pts[this.poly.pts.length - 1] = this.drag.shift ? this.snap(this.poly.pts[this.poly.pts.length - 2], p) : p; this.previewPoly(); }
    else if (t === 'stamp') { /* one stamp per click */ }
    this.last = p;
  };
  P.up = function (p) {
    var t = store.tool, c = this.colors();
    if (t === 'air') { clearInterval(this.airT); }
    else if (t === 'line') { this.O.clearRect(0, 0, this.W, this.H); this.push(); this.lineTo(this.X, this.start, this.snap(this.start, p), c.fg); }
    else if (t === 'rect' || t === 'ellipse' || t === 'rrect') { this.O.clearRect(0, 0, this.W, this.H); this.push(); this.shape(this.X, t, this.start, this.square(this.start, p), c.fg, c.bg); }
    else if (t === 'pick') { if (this.prevTool) this.setTool(this.prevTool); }
    else if (t === 'select') {
      if (this.moving) { this.moving = null; }
      else if (this.selStart) { this.selStart = null; if (this.sel && (this.sel.w < 2 || this.sel.h < 2)) this.dropSel(); }
    }
    else if (t === 'text' && this.selStart && !this.textJustDone) {
      var box = this.textBox && this.textBox.w > 8 ? this.textBox : { x: this.selStart.x, y: this.selStart.y, w: Math.max(120, Math.min(260, this.W - this.selStart.x)), h: 0 };
      this.selStart = null; this.textBox = null; this.openText(box);
    }
    else if (t === 'curve') this.curveUp(p);
    else if (t === 'poly' && this.poly) {
      var pts = this.poly.pts, f = pts[0], l = pts[pts.length - 1];
      if (pts.length > 3 && Math.abs(f.x - l.x) <= 3 && Math.abs(f.y - l.y) <= 3) { pts[pts.length - 1] = f; this.finishPoly(); }
    }
    this.stats(p);
    this.autosave();
  };
  P.hover = function (p) {
    if (store.tool === 'stamp' && !U.touch) { this.O.clearRect(0, 0, this.W, this.H); this.O.globalAlpha = 0.55; this.stampAt(p, this.O); this.O.globalAlpha = 1; }
  };
  P.snap = function (a, p) {
    if (!this.drag || !this.drag.shift) return p;
    var dx = p.x - a.x, dy = p.y - a.y, ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * Math.PI / 4, len = Math.max(Math.abs(dx), Math.abs(dy));
    return { x: a.x + Math.round(Math.cos(ang) * len * (Math.abs(Math.cos(ang)) > 0.1 && Math.abs(Math.sin(ang)) > 0.1 ? 1 : 1)), y: a.y + Math.round(Math.sin(ang) * len) };
  };
  P.square = function (a, p) { if (!this.drag || !this.drag.shift) return p; var s = Math.max(Math.abs(p.x - a.x), Math.abs(p.y - a.y)); return { x: a.x + s * (p.x < a.x ? -1 : 1), y: a.y + s * (p.y < a.y ? -1 : 1) }; };
  P.rectFrom = function (a, p) {
    var x0 = clamp(Math.min(a.x, p.x), 0, this.W), y0 = clamp(Math.min(a.y, p.y), 0, this.H), x1 = clamp(Math.max(a.x, p.x) + 1, 0, this.W), y1 = clamp(Math.max(a.y, p.y) + 1, 0, this.H);
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  };

  /* ---------- tools ---------- */
  P.brushAt = function (a, b, color) {
    var br = BRUSH[store.brush], m = brushMask(br, color), o = Math.floor(br.size / 2), X = this.X;
    bres(a.x, a.y, b.x, b.y, function (x, y) { X.drawImage(m, x - o, y - o); });
  };
  P.eraseAt = function (a, b) {
    var s = ERASERS[store.eraser], o = Math.floor(s / 2), X = this.X, self = this;
    var colorErase = this.drag && this.drag.btn === 2, pr = rgb(store.prim), sc = rgb(store.sec);
    bres(a.x, a.y, b.x, b.y, function (x, y) {
      if (!colorErase) { X.fillStyle = store.sec; X.fillRect(x - o, y - o, s, s); return; }
      var x0 = clamp(x - o, 0, self.W), y0 = clamp(y - o, 0, self.H), w = clamp(x - o + s, 0, self.W) - x0, h = clamp(y - o + s, 0, self.H) - y0; if (w <= 0 || h <= 0) return;
      var id = X.getImageData(x0, y0, w, h), d = id.data;
      for (var i = 0; i < d.length; i += 4) if (d[i] === pr[0] && d[i + 1] === pr[1] && d[i + 2] === pr[2]) { d[i] = sc[0]; d[i + 1] = sc[1]; d[i + 2] = sc[2]; }
      X.putImageData(id, x0, y0);
    });
  };
  P.spray = function (color) {
    var r = AIRS[store.air], n = r * 2, p = this.airP, X = this.X; X.fillStyle = color;
    for (var i = 0; i < n; i++) { var a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * r; X.fillRect(Math.round(p.x + Math.cos(a) * d), Math.round(p.y + Math.sin(a) * d), 1, 1); }
    this.dirty = true;
  };
  P.lineTo = function (ctx, a, b, color) {
    var lw = LINES[store.line];
    if (lw === 1) { bres(a.x, a.y, b.x, b.y, function (x, y) { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); }); return; }
    var o = Math.floor(lw / 2);
    bres(a.x, a.y, b.x, b.y, function (x, y) { ctx.fillStyle = color; ctx.fillRect(x - o, y - o, lw, lw); });
  };
  P.stampAt = function (p, ctx) {
    var s = STAMP_SIZES[store.stampSize], img = stamp(STAMPS[store.stamp][0]);
    ctx.imageSmoothingEnabled = STAMPS[store.stamp][0] === 'logo' || STAMPS[store.stamp][0] === 'wizard' || STAMPS[store.stamp][0] === 'star';
    ctx.drawImage(img, Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s);
    ctx.imageSmoothingEnabled = false;
  };
  P.zoomAt = function (zi, p) {
    var z0 = ZOOMS[store.zoom], z1 = ZOOMS[zi], area = this.area;
    var vx = p.x * z0 - area.scrollLeft, vy = p.y * z0 - area.scrollTop;
    this.setZoom(zi);
    area.scrollLeft = p.x * z1 - area.clientWidth / 2; area.scrollTop = p.y * z1 - area.clientHeight / 2;
  };
  /* curve: drag the line, then bend it twice */
  P.curveDrag = function (p) {
    var cv = this.curve; if (!cv) return;
    if (cv.stage === 0) cv.b = p; else if (cv.stage === 1) cv.c1 = cv.c2 = p; else cv.c2 = p;
    this.O.clearRect(0, 0, this.W, this.H); this.drawCurve(this.O, this.colors().fg);
  };
  P.curveUp = function (p) {
    var cv = this.curve; if (!cv) return;
    cv.stage++;
    if (cv.stage === 1 && cv.a.x === cv.b.x && cv.a.y === cv.b.y) { this.curve = null; return; }
    if (cv.stage >= 3) { this.O.clearRect(0, 0, this.W, this.H); this.push(); this.drawCurve(this.X, this.colors().fg); this.curve = null; }
  };
  P.drawCurve = function (ctx, color) {
    var cv = this.curve, lw = LINES[store.line], c1 = cv.c1 || cv.a, c2 = cv.c2 || cv.b;
    var bb = [Math.min(cv.a.x, cv.b.x, c1.x, c2.x), Math.min(cv.a.y, cv.b.y, c1.y, c2.y), Math.max(cv.a.x, cv.b.x, c1.x, c2.x), Math.max(cv.a.y, cv.b.y, c1.y, c2.y)];
    this.aliased(ctx, color, function (c) { c.lineWidth = Math.max(1.2, lw); c.lineCap = 'round'; c.beginPath(); c.moveTo(cv.a.x + 0.5, cv.a.y + 0.5); c.bezierCurveTo(c1.x + 0.5, c1.y + 0.5, c2.x + 0.5, c2.y + 0.5, cv.b.x + 0.5, cv.b.y + 0.5); c.stroke(); }, [bb[0] - lw, bb[1] - lw, bb[2] + lw, bb[3] + lw]);
  };
  P.previewPoly = function () {
    var pts = this.poly.pts, c = this.colors(), self = this;
    this.O.clearRect(0, 0, this.W, this.H);
    for (var i = 1; i < pts.length; i++) this.lineTo(this.O, pts[i - 1], pts[i], c.fg);
  };
  P.finishPoly = function () {
    var pts = this.poly.pts.slice(), c = { fg: store.prim, bg: store.sec }, lw = LINES[store.line], st = store.fill, self = this;
    while (pts.length > 2 && pts[pts.length - 1].x === pts[pts.length - 2].x && pts[pts.length - 1].y === pts[pts.length - 2].y) pts.pop();
    this.poly = null; this.O.clearRect(0, 0, this.W, this.H);
    if (pts.length < 2) return;
    this.push();
    var xs = pts.map(function (q) { return q.x; }), ys = pts.map(function (q) { return q.y; }), bb = [Math.min.apply(0, xs) - lw, Math.min.apply(0, ys) - lw, Math.max.apply(0, xs) + lw, Math.max.apply(0, ys) + lw];
    function path(cx) { cx.beginPath(); cx.moveTo(pts[0].x + 0.5, pts[0].y + 0.5); for (var i = 1; i < pts.length; i++) cx.lineTo(pts[i].x + 0.5, pts[i].y + 0.5); cx.closePath(); }
    if (st > 0) this.aliased(this.X, st === 1 ? c.bg : c.fg, function (cx) { path(cx); cx.fill(); }, bb);
    if (st !== 2) { for (var i = 0; i < pts.length; i++) this.lineTo(this.X, pts[i], pts[(i + 1) % pts.length], c.fg); }
  };
  P.cancelShape = function () { this.curve = null; this.poly = null; clearInterval(this.airT); this.O && this.O.clearRect(0, 0, this.W, this.H); };

  /* ---------- selection ---------- */
  P.inSel = function (p) { var s = this.sel; return s && p.x >= s.x && p.y >= s.y && p.x < s.x + s.w && p.y < s.y + s.h; };
  P.placeSel = function (box) {
    var s = box || this.sel, el = this.selEl, z = ZOOMS[store.zoom];
    if (!s) { el.style.display = 'none'; return; }
    el.style.display = 'block'; el.style.left = s.x * z + 'px'; el.style.top = s.y * z + 'px'; el.style.width = s.w * z + 'px'; el.style.height = s.h * z + 'px';
    el.classList.toggle('text', !!box);
    this.stats();
  };
  P.liftSel = function () {
    var s = this.sel; this.push();
    var f = canvas(s.w, s.h); f.getContext('2d').drawImage(this.cv, s.x, s.y, s.w, s.h, 0, 0, s.w, s.h);
    this.float = f; this.X.fillStyle = store.sec; this.X.fillRect(s.x, s.y, s.w, s.h);
    this.redrawFloat();
  };
  P.floatView = function () {
    if (!store.clearSel) return this.float;
    var f = this.float, c = canvas(f.width, f.height), x = c.getContext('2d'); x.drawImage(f, 0, 0);
    var id = x.getImageData(0, 0, c.width, c.height), d = id.data, k = rgb(store.sec);
    for (var i = 0; i < d.length; i += 4) if (d[i] === k[0] && d[i + 1] === k[1] && d[i + 2] === k[2]) d[i + 3] = 0;
    x.putImageData(id, 0, 0); return c;
  };
  P.redrawFloat = function () { if (this.float) { this.floatV = this.floatView(); this.clearOv(); } };
  P.drawFloat = function () { if (this.float && this.sel) this.O.drawImage(this.floatV || this.float, this.sel.x, this.sel.y); };
  P.dropSel = function () {
    if (this.float && this.sel) { this.X.drawImage(this.floatV || this.float, this.sel.x, this.sel.y); this.dirty = true; this.autosave(); }
    this.float = null; this.floatV = null; this.sel = null; this.moving = null; this.selStart = null;
    if (this.O) this.O.clearRect(0, 0, this.W, this.H);
    this.placeSel();
  };
  P.selectAll = function () { this.setTool('select'); this.sel = { x: 0, y: 0, w: this.W, h: this.H }; this.placeSel(); };
  P.selCanvas = function () {
    var s = this.sel; if (!s) return null;
    if (this.float) return this.floatView();
    var c = canvas(s.w, s.h); c.getContext('2d').drawImage(this.cv, s.x, s.y, s.w, s.h, 0, 0, s.w, s.h); return c;
  };
  P.copy = function () {
    var c = this.selCanvas(); if (!c) return; this.clip = c;
    try { c.toBlob(function (bl) { if (bl && navigator.clipboard && window.ClipboardItem) navigator.clipboard.write([new ClipboardItem({ 'image/png': bl })]).catch(function () {}); }); } catch (e) {}
  };
  P.cut = function () { this.copy(); this.deleteSel(); };
  P.deleteSel = function () {
    var s = this.sel; if (!s) return;
    if (!this.float) { this.push(); this.X.fillStyle = store.sec; this.X.fillRect(s.x, s.y, s.w, s.h); }
    this.float = null; this.floatV = null; this.dropSel();
  };
  P.paste = function (img) {
    if (!img) return;
    this.setTool('select'); this.dropSel();
    var w = img.width, h = img.height;
    if (w > this.W || h > this.H) {   /* grow the picture to fit, like Paint asks */
      this.push(); this.resizeDoc(Math.max(this.W, Math.min(1600, w)), Math.max(this.H, Math.min(1600, h)));
    } else this.push();
    var f = canvas(w, h); f.getContext('2d').drawImage(img, 0, 0);
    var z = ZOOMS[store.zoom], x = clamp(Math.floor(this.area.scrollLeft / z), 0, Math.max(0, this.W - w)), y = clamp(Math.floor(this.area.scrollTop / z), 0, Math.max(0, this.H - h));
    this.sel = { x: x, y: y, w: w, h: h }; this.float = f; this.redrawFloat(); this.placeSel();
  };
  P.pasteEvent = function (e) {
    var self = this, items = (e.clipboardData && e.clipboardData.items) || [];
    for (var i = 0; i < items.length; i++) if (/^image\//.test(items[i].type)) {
      var f = items[i].getAsFile(); if (!f) continue;
      e.preventDefault();
      var im = new Image(); im.onload = function () { self.paste(im); URL.revokeObjectURL(im.src); }; im.src = URL.createObjectURL(f);
      return;
    }
    if (this.clip) { e.preventDefault(); this.paste(this.clip); }
  };

  /* ---------- text ---------- */
  P.buildFonts = function () {
    var self = this, ff = this.win.body.querySelector('.gp-ff'), fs = this.win.body.querySelector('.gp-fs'), fb = this.win.body.querySelector('.gp-fbold');
    ff.innerHTML = FONTS.map(function (f, i) { return '<option value="' + i + '"' + (i === store.font ? ' selected' : '') + '>' + f[0] + '</option>'; }).join('');
    fs.innerHTML = FONT_SIZES.map(function (s, i) { return '<option value="' + i + '"' + (i === store.fontSize ? ' selected' : '') + '>' + s + '</option>'; }).join('');
    fb.classList.toggle('down', !!store.bold);
    ff.addEventListener('change', function () { store.font = +ff.value; persist(); self.styleText(); });
    fs.addEventListener('change', function () { store.fontSize = +fs.value; persist(); self.styleText(); });
    fb.addEventListener('click', function () { store.bold = !store.bold; persist(); fb.classList.toggle('down', store.bold); self.styleText(); });
  };
  P.fontCss = function (scale) { return (store.bold ? 'bold ' : '') + FONT_SIZES[store.fontSize] * (scale || 1) + 'px ' + FONTS[store.font][1]; };
  P.openText = function (box) {
    var z = ZOOMS[store.zoom], t = this.textEl;
    this.textOn = box; t.value = ''; t.style.display = 'block';
    t.style.left = box.x * z + 'px'; t.style.top = box.y * z + 'px'; t.style.width = Math.max(40, box.w) * z + 'px';
    this.styleText(); this.placeSel(box);
    setTimeout(function () { try { t.focus({ preventScroll: true }); } catch (e) {} }, 20);
  };
  P.styleText = function () {
    var t = this.textEl, z = ZOOMS[store.zoom];
    t.style.font = this.fontCss(z); t.style.lineHeight = '1.2'; t.style.color = store.prim;
    this.fitText();
  };
  P.fitText = function () {
    if (!this.textOn) return;
    var t = this.textEl, z = ZOOMS[store.zoom]; t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight, FONT_SIZES[store.fontSize] * 1.3 * z) + 'px';
    this.placeSel({ x: this.textOn.x, y: this.textOn.y, w: Math.max(40, this.textOn.w), h: Math.ceil(t.offsetHeight / z) });
  };
  P.commitText = function () {
    if (!this.textOn) return;
    var box = this.textOn, txt = this.textEl.value, self = this;
    this.cancelText();
    if (!txt.trim()) return;
    this.push();
    var size = FONT_SIZES[store.fontSize], lh = size * 1.2, font = this.fontCss(1), maxW = Math.max(40, box.w);
    /* wrap like the box did */
    var lines = [], m = this.tmp.getContext('2d'); m.font = font;
    txt.split('\n').forEach(function (para) {
      var words = para.split(' '), line = '';
      words.forEach(function (w) { var test = line ? line + ' ' + w : w; if (m.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test; });
      lines.push(line);
    });
    this.aliased(this.X, store.prim, function (c) { c.font = font; c.textBaseline = 'top'; lines.forEach(function (l, i) { c.fillText(l, box.x + 2, box.y + 2 + i * lh + size * 0.08); }); }, [box.x, box.y, box.x + maxW + size, box.y + lines.length * lh + size]);
  };
  P.cancelText = function () { this.textOn = null; this.textEl.style.display = 'none'; this.textEl.blur(); this.placeSel(); };

  /* ---------- options box (under the tools) ---------- */
  P.drawOpts = function () {
    var t = store.tool, el = this.optsEl, self = this, html = '';
    function opt(key, i, inner, cls) { return '<button type="button" class="gp-o' + (cls ? ' ' + cls : '') + (store[key] === i ? ' on' : '') + '" data-k="' + key + '" data-i="' + i + '">' + inner + '</button>'; }
    if (t === 'brush') html = BRUSH.map(function (b, i) { return opt('brush', i, '<canvas data-brush="' + i + '"></canvas>', 'b'); }).join('');
    else if (t === 'eraser') html = ERASERS.map(function (s, i) { return opt('eraser', i, '<i style="width:' + s + 'px;height:' + s + 'px"></i>', 'row'); }).join('');
    else if (t === 'air') html = AIRS.map(function (s, i) { return opt('air', i, '<canvas data-air="' + i + '"></canvas>', 'row'); }).join('');
    else if (t === 'line' || t === 'curve') html = LINES.map(function (s, i) { return opt('line', i, '<i class="ln" style="height:' + s + 'px"></i>', 'row'); }).join('');
    else if (t === 'rect' || t === 'poly' || t === 'ellipse' || t === 'rrect') html = [0, 1, 2].map(function (i) { return opt('fill', i, '<i class="fs fs' + i + '"></i>', 'row'); }).join('');
    else if (t === 'zoom') html = ZOOMS.map(function (z, i) { return opt('zoom', i, z + '×', 'row txt'); }).join('');
    else if (t === 'select') html = [false, true].map(function (v, i) { return '<button type="button" class="gp-o row sel' + (store.clearSel === v ? ' on' : '') + '" data-k="clearSel" data-i="' + i + '" title="' + (v ? 'Transparent' : 'Opaque') + '"><i class="op' + i + '"></i></button>'; }).join('');
    else if (t === 'stamp') html = STAMPS.map(function (s, i) { return opt('stamp', i, '<canvas data-stamp="' + i + '" title="' + s[1] + '"></canvas>', 'st'); }).join('') + '<div class="gp-ssz">' + STAMP_SIZES.map(function (s, i) { return opt('stampSize', i, ['S', 'M', 'L'][i], 'sz'); }).join('') + '</div>';
    el.innerHTML = html; el.className = 'gp-opts u98-sunken t-' + t + (html ? '' : ' empty');
    el.querySelectorAll('canvas[data-brush]').forEach(function (c) { var b = BRUSH[+c.dataset.brush]; c.width = c.height = 10; c.getContext('2d').drawImage(brushMask(b, '#000000'), Math.floor((10 - b.size) / 2), Math.floor((10 - b.size) / 2)); });
    el.querySelectorAll('canvas[data-air]').forEach(function (c) { var r = AIRS[+c.dataset.air]; c.width = c.height = 26; var x = c.getContext('2d'); x.fillStyle = '#000'; for (var i = 0; i < r * 6; i++) { var a = Math.random() * 6.28, d = Math.sqrt(Math.random()) * r; x.fillRect(13 + Math.cos(a) * d, 13 + Math.sin(a) * d, 1, 1); } });
    el.querySelectorAll('canvas[data-stamp]').forEach(function (c) { c.width = c.height = 40; var x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.drawImage(stamp(STAMPS[+c.dataset.stamp][0]), 0, 0, 40, 40); });
    el.querySelectorAll('.gp-o').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k, i = +b.dataset.i;
        if (k === 'clearSel') { store.clearSel = !!i; persist(); self.redrawFloat(); }
        else if (k === 'zoom') { self.setZoom(i); return; }
        else store[k] = i;
        persist(); self.drawOpts();
      });
    });
  };

  /* ---------- colours ---------- */
  P.drawColors = function () {
    var cur = this.win.body.querySelector('.gp-cur');
    cur.querySelector('.p').style.background = store.prim; cur.querySelector('.s').style.background = store.sec;
    if (this.textOn) this.textEl.style.color = store.prim;
  };
  P.setColor = function (which, c) { store[which] = c; persist(); this.drawColors(); if (which === 'sec') this.redrawFloat(); };
  P.swapColors = function () { var t = store.prim; store.prim = store.sec; store.sec = t; persist(); this.drawColors(); };
  P.editColor = function (which, sw) {
    var self = this, cur = store[which];
    U.dialog({ title: 'Edit Colors', wide: 260,
      html: 'Pick a color:<div style="margin-top:8px;display:flex;gap:8px;align-items:center"><input type="color" class="gp-cpick" value="' + cur + '" style="width:64px;height:40px;border:0;padding:0;background:none"><span class="gp-chex">' + cur + '</span></div>',
      onOpen: function (d) { var i = d.querySelector('.gp-cpick'); i.addEventListener('input', function () { d.querySelector('.gp-chex').textContent = i.value; }); },
      buttons: [{ label: 'OK', value: 'ok', def: true }, { label: 'Cancel', value: null }], collect: function (d) { return d.querySelector('.gp-cpick').value; }
    }, this.win).then(function (v) {
      if (!v || self.closed) return;
      if (sw) { sw.dataset.c = v; sw.style.background = v; }
      self.setColor(which, v);
    });
  };

  /* ---------- keyboard ---------- */
  P.key = function (e) {
    if (e.target === this.textEl) return false;
    var k = e.key.toLowerCase(), mod = e.ctrlKey || e.metaKey;
    if (mod && k === 'z') { this.undo(); return true; }
    if (mod && k === 'y') { this.redo(); return true; }
    if (mod && k === 'a') { this.selectAll(); return true; }
    if (mod && k === 'c') { this.copy(); return true; }
    if (mod && k === 'x') { this.cut(); return true; }
    if (mod && k === 'v') return false;   /* let the paste event bring in images from your clipboard */
    if (mod && e.shiftKey && k === 'n') { this.clearImage(); return true; }
    if (mod && k === 'n') { this.newPic(); return true; }
    if (mod && k === 'o') { this.open(); return true; }
    if (mod && k === 's') { this.save(); return true; }
    if (mod && k === 'i') { this.invert(); return true; }
    if (mod && k === 'e') { this.attributes(); return true; }
    if (mod && k === 'r') { this.flipDialog(); return true; }
    if (k === 'delete' || k === 'backspace') { if (this.sel) { this.deleteSel(); return true; } return false; }
    if (k === 'escape') { if (this.poly || this.curve) { this.cancelShape(); return true; } if (this.sel) { this.dropSel(); return true; } return false; }
    if (k === 'enter' && this.poly) { this.finishPoly(); return true; }
    return false;
  };

  /* ---------- image menu ---------- */
  P.whole = function (fn) {   /* run fn on the selection if there is one, else the whole picture */
    this.commitText();
    if (this.sel) { if (!this.float) this.liftSel(); this.float = fn(this.float); this.sel.w = this.float.width; this.sel.h = this.float.height; this.redrawFloat(); this.placeSel(); return; }
    this.push(); var c = canvas(this.W, this.H); c.getContext('2d').drawImage(this.cv, 0, 0); var out = fn(c);
    if (out.width !== this.W || out.height !== this.H) this.resizeDoc(out.width, out.height, true);
    this.X.clearRect(0, 0, this.W, this.H); this.X.drawImage(out, 0, 0); this.autosave();
  };
  function transform(src, kind) {
    var w = src.width, h = src.height, rot = kind === 'r90' || kind === 'r270', c = canvas(rot ? h : w, rot ? w : h), x = c.getContext('2d');
    if (kind === 'fh') { x.translate(w, 0); x.scale(-1, 1); }
    else if (kind === 'fv') { x.translate(0, h); x.scale(1, -1); }
    else if (kind === 'r90') { x.translate(h, 0); x.rotate(Math.PI / 2); }
    else if (kind === 'r180') { x.translate(w, h); x.rotate(Math.PI); }
    else if (kind === 'r270') { x.translate(0, w); x.rotate(-Math.PI / 2); }
    x.drawImage(src, 0, 0); return c;
  }
  P.flipDialog = function () {
    var self = this;
    U.dialog({ title: 'Flip and Rotate', wide: 260,
      html: '<fieldset class="gp-fset"><legend>Flip or rotate</legend>' +
        '<label><input type="radio" name="fr" value="fh" checked> Flip horizontal</label><label><input type="radio" name="fr" value="fv"> Flip vertical</label>' +
        '<label><input type="radio" name="fr" value="r90"> Rotate by 90°</label><label><input type="radio" name="fr" value="r180"> Rotate by 180°</label><label><input type="radio" name="fr" value="r270"> Rotate by 270°</label></fieldset>',
      buttons: [{ label: 'OK', value: 'ok', def: true }, { label: 'Cancel', value: null }], collect: function (d) { return d.querySelector('input[name=fr]:checked').value; }
    }, this.win).then(function (v) { if (!v || self.closed) return; self.whole(function (c) { return transform(c, v); }); });
  };
  P.invert = function () {
    this.whole(function (c) { var x = c.getContext('2d'), id = x.getImageData(0, 0, c.width, c.height), d = id.data; for (var i = 0; i < d.length; i += 4) { d[i] = 255 - d[i]; d[i + 1] = 255 - d[i + 1]; d[i + 2] = 255 - d[i + 2]; } x.putImageData(id, 0, 0); return c; });
  };
  P.attributes = function () {
    var self = this;
    U.dialog({ title: 'Attributes', wide: 260,
      html: '<div class="gp-attr"><label>Width <input class="u98-input" name="w" value="' + this.W + '" inputmode="numeric"></label><label>Height <input class="u98-input" name="h" value="' + this.H + '" inputmode="numeric"></label><span>pixels</span></div>',
      buttons: [{ label: 'OK', value: 'ok', def: true }, { label: 'Cancel', value: null }],
      validate: function (d) { var w = +d.querySelector('[name=w]').value, h = +d.querySelector('[name=h]').value; if (!(w >= 1 && w <= 1600 && h >= 1 && h <= 1600)) { U.sfx('error'); return false; } },
      collect: function (d) { return { w: Math.round(+d.querySelector('[name=w]').value), h: Math.round(+d.querySelector('[name=h]').value) }; }
    }, this.win).then(function (v) { if (!v || self.closed) return; self.dropSel(); self.push(); self.resizeDoc(v.w, v.h); self.autosave(); });
  };
  P.clearImage = function () { this.commitText(); this.dropSel(); this.push(); this.fillAll(store.sec); };

  /* ---------- files ---------- */
  P.newPic = function () {
    var self = this;
    function fresh() { self.commitText(); self.dropSel(); self.undos = []; self.redos = []; self.fillAll('#ffffff'); self.name = 'untitled'; self.win.setTitle('untitled - GAMI PAINT'); self.dirty = false; self.autosave(true); }
    if (!this.dirty) return fresh();
    U.dialog({ title: 'GAMI PAINT', icon: 'warn', text: 'Save changes to ' + this.name + '?', buttons: [{ label: '&Yes', value: 'yes', def: true }, { label: '&No', value: 'no' }, { label: 'Cancel', value: null }] }, this.win)
      .then(function (v) { if (!v || self.closed) return; if (v === 'yes') self.save(); fresh(); });
  };
  P.open = function () { try { this.fileEl.click(); } catch (e) {} };
  P.loadFile = function (f) {
    var self = this;
    if (!/^image\//.test(f.type)) { U.dialog({ title: 'GAMI PAINT', icon: 'error', text: 'GAMI PAINT can’t read this file. Try a PNG, JPG or GIF.', buttons: [{ label: 'OK', def: true }] }, this.win); return; }
    var url = URL.createObjectURL(f), im = new Image();
    im.onload = function () {
      var s = Math.min(1, 1600 / Math.max(im.width, im.height)), w = Math.max(1, Math.round(im.width * s)), h = Math.max(1, Math.round(im.height * s));
      self.commitText(); self.dropSel(); self.push(); self.resizeDoc(w, h, true); self.fillAll('#ffffff'); self.X.imageSmoothingEnabled = true; self.X.drawImage(im, 0, 0, w, h); self.X.imageSmoothingEnabled = false;
      self.name = f.name.replace(/\.[^.]+$/, '') || 'untitled'; self.win.setTitle(self.name + ' - GAMI PAINT'); URL.revokeObjectURL(url); self.autosave();
    };
    im.onerror = function () { URL.revokeObjectURL(url); };
    im.src = url;
  };
  P.flat = function () { this.commitText(); this.dropSel(); return this.cv; };
  P.save = function () {
    var c = this.flat(), name = (this.name || 'untitled') + '.png', self = this;
    c.toBlob(function (bl) {
      if (!bl) return;
      var a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
      self.dirty = false;
    }, 'image/png');
  };
  P.saveToImages = function () {
    var c = this.flat(), url = c.toDataURL('image/png'), self = this, key = 'P:' + Date.now();
    if (url.length > 2500000) url = c.toDataURL('image/jpeg', 0.9);
    var db = U.esDB;
    if (!db) { U.dialog({ title: 'GAMI PAINT', icon: 'error', text: 'My Images isn’t available here.', buttons: [{ label: 'OK', def: true }] }, this.win); return; }
    db.set(key, url).then(function () {
      U.sfx('ding');
      U.dialog({ title: 'GAMI PAINT', icon: 'info', html: 'Saved to <b>My Images</b>.<br><br>Open <b>Exit Simulations</b> and hang it in any empty frame. Your drawings also show up on the TVs and in the galleries.', buttons: [{ label: 'OK', def: true }], sound: false }, self.win);
      if (U.onImagesChanged) U.onImagesChanged();
    });
  };
  P.wallpaper = function (mode) {
    var wp = null;
    if (mode) { var c = this.flat(), url = c.toDataURL('image/png'); if (url.length > 1800000) url = c.toDataURL('image/jpeg', 0.88); wp = { url: url, mode: mode }; }
    applyWallpaper(wp);
    try { if (wp) localStorage.setItem('ou98_wallpaper', JSON.stringify(wp)); else localStorage.removeItem('ou98_wallpaper'); } catch (e) {}
  };
  function applyWallpaper(wp) {
    var wall = document.querySelector('.u98-wall'), desk = document.querySelector('.u98-desk'); if (!wall || !desk) return;
    desk.classList.remove('gp-wp-tile', 'gp-wp-center');
    if (!wp) { wall.style.backgroundImage = 'url(favicon-192.png)'; return; }
    wall.style.backgroundImage = 'url(' + wp.url + ')';
    desk.classList.add(wp.mode === 'tile' ? 'gp-wp-tile' : 'gp-wp-center');
  }
  document.addEventListener('DOMContentLoaded', function () {
    var wp = null; try { wp = JSON.parse(localStorage.getItem('ou98_wallpaper')); } catch (e) {}
    if (wp && wp.url) applyWallpaper(wp);
  });

  P.help = function () {
    U.dialog({ title: 'GAMI PAINT Help', wide: 400,
      html: '<div class="u98-help u98-sunken"><h4>Drawing</h4><p>Pick a tool on the left and a color at the bottom. Left button draws in the first color, right button in the second. On a phone, hold a color to make it the second color, or tap the color box to swap.</p>' +
        '<h4>Stamps</h4><p>The first tool stamps the wizard, the monkey, the Origami Ultra logo, a banana, ULTRAWATER, a cassette, a star or a no sign. Choose the size under the tools.</p>' +
        '<h4>Shapes</h4><p>Hold Shift for straight lines, squares and circles. For the Curve, drag a line, then click twice to bend it. For the Polygon, click each corner and double-click to finish.</p>' +
        '<h4>Your drawings</h4><p><b>File › Save</b> downloads a PNG. <b>Save to My Images</b> sends it to Exit Simulations, where you can hang it in any empty frame. <b>Set As Wallpaper</b> puts it on this desktop.</p>' +
        '<h4>Keys</h4><ul><li>Ctrl+Z undo, Ctrl+Y redo, Ctrl+A select all, Ctrl+C/X/V copy, cut, paste, Delete clears the selection.</li><li>You can paste images straight from your clipboard.</li></ul></div>',
      buttons: [{ label: 'OK', def: true }] }, this.win);
  };
  P.about = function () {
    U.dialog({ title: 'About GAMI PAINT', icon: 'info', html: '<b>GAMI PAINT</b><br>GAMIPNT.EXE · Version 1.0 (ULTRA 98)<br>Copyright © 1998–' + new Date().getFullYear() + ' Origami Ultra<br><br>This product is licensed to:<br><b>YOU</b>', buttons: [{ label: 'OK', def: true }] }, this.win);
  };

  U.register({
    id: 'paint', title: 'untitled - GAMI PAINT', label: 'GAMI PAINT', menuLabel: '&GAMI PAINT', exe: 'GAMIPNT.EXE',
    icon: 'icon_gamipaint', small: 'icon_gamipaint_s',
    create: function (win) { new Paint(win); }
  });
})();
