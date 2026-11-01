/* luckystationary.ou — Lucky Stationary: toys, cards & school supplies. A remembered shop, rebuilt.
   All artwork is drawn in the browser. The monster cards are original designs. */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-luckystationary{background:#fff7b0 url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27%3E%3Crect width=%2740%27 height=%2740%27 fill=%27%23fff7b0%27/%3E%3Cpath d=%27M10 4l1.8 3.8 4 .5-3 2.8.8 4-3.6-2-3.6 2 .8-4-3-2.8 4-.5z%27 fill=%27%23ffe36e%27/%3E%3Ccircle cx=%2730%27 cy=%2728%27 r=%273%27 fill=%27%23ffd0e8%27/%3E%3C/svg%3E");color:#222;font:13px/1.45 "Comic Sans MS","Chalkboard SE","Comic Neue",cursive;padding:6px 3px}',
    '.gn-luckystationary a{color:#0033cc}.gn-luckystationary a:visited{color:#7a1fa0}',
    '.gn-luckystationary .ls-pg{max-width:800px;margin:0 auto;background:#fff;border:4px solid #1f5fae;outline:3px dashed #ff3c8e;outline-offset:2px}',
    '.gn-luckystationary .ls-head{background:linear-gradient(180deg,#2a7ad2,#1a4f9a);padding:8px 12px 6px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-bottom:4px solid #ffd400}',
    '.gn-luckystationary .ls-logo{text-decoration:none;color:#fff;line-height:1}',
    '.gn-luckystationary .ls-logo b{font:900 40px/1 "Arial Black",Arial,sans-serif;letter-spacing:4px;font-style:italic;text-shadow:3px 3px 0 #0d2f63;display:inline-block}',
    '.gn-luckystationary .ls-logo i{font:bold 15px Arial,sans-serif;letter-spacing:2px;font-style:normal;margin-left:4px;vertical-align:6px;color:#e8f2ff}',
    '.gn-luckystationary .ls-logo small{display:block;font:bold 11px Verdana,sans-serif;color:#ffd400;margin-top:3px;letter-spacing:1px}',
    '.gn-luckystationary .ls-burst{margin-left:auto;width:86px;height:86px;flex:0 0 auto}',
    '.gn-luckystationary .ls-marq{background:#ff1f6e;color:#fff;font:bold 12px Verdana,sans-serif;overflow:hidden;white-space:nowrap;border-bottom:2px solid #ffd400}',
    '.gn-luckystationary .ls-marq span{display:inline-block;padding:3px 0 3px 100%;animation:lsMarq 26s linear infinite}@keyframes lsMarq{to{transform:translateX(-100%)}}',
    '.gn-luckystationary .ls-nav{display:flex;flex-wrap:wrap;gap:3px;padding:5px;background:#e9f3ff;border-bottom:2px solid #1f5fae;align-items:center}',
    '.gn-luckystationary .ls-nav a{font:bold 11px Verdana,sans-serif;text-decoration:none;color:#fff;padding:4px 8px;border:2px outset rgba(255,255,255,.6);text-transform:uppercase}',
    '.gn-luckystationary .ls-nav a.on{border-style:inset;text-decoration:underline}',
    '.gn-luckystationary .ls-money{margin-left:auto;font:bold 11px Verdana;background:#fffbe0;border:2px solid #ff8a00;padding:2px 6px;color:#a04000}',
    '.gn-luckystationary .ls-main{padding:10px 12px}',
    '.gn-luckystationary h1{font:900 22px/1.15 "Arial Black",Arial,sans-serif;margin:0 0 6px;color:#ff1f6e;text-shadow:2px 2px 0 #ffd400}',
    '.gn-luckystationary h2{font:bold 16px "Times New Roman",serif;margin:12px 0 5px;color:#1f5fae;border-bottom:2px dotted #ff8a00;text-transform:uppercase}',
    '.gn-luckystationary p{margin:0 0 8px}',
    '.gn-luckystationary .ls-rain{font:900 18px "Arial Black",Arial;letter-spacing:1px}',
    '.gn-luckystationary .ls-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}',
    '.gn-luckystationary .ls-item{border:2px solid #9cc4ee;background:#fff;padding:5px;text-align:center;position:relative;font-size:12px}',
    '.gn-luckystationary .ls-item:nth-child(3n+1){border-color:#ffb3d1}.gn-luckystationary .ls-item:nth-child(3n+2){border-color:#b6e39a}',
    '.gn-luckystationary .ls-item img{width:110px;height:110px;display:block;margin:0 auto 3px;border:1px solid #ddd;image-rendering:auto;cursor:zoom-in}',
    '.gn-luckystationary .ls-item b{display:block;font:bold 12px Verdana,sans-serif;color:#222}',
    '.gn-luckystationary .ls-price{position:absolute;top:4px;right:4px;width:44px;height:44px;border-radius:50%;background:#ff8a00;color:#fff;font:bold 11px/1 Arial;display:flex;align-items:center;justify-content:center;text-align:center;transform:rotate(12deg);box-shadow:1px 1px 0 #a04000;border:2px dashed #fff3c0}',
    '.gn-luckystationary .ls-price.y{background:#ffd400;color:#a04000}.gn-luckystationary .ls-price.p{background:#ff1f6e}',
    '.gn-luckystationary .ls-new{position:absolute;top:4px;left:4px;background:#e00;color:#ff0;font:bold 10px Arial;padding:1px 4px;animation:lsBlink 1s steps(1) infinite}@keyframes lsBlink{50%{opacity:0}}',
    '.gn-luckystationary .ls-btn{font:bold 11px Verdana,sans-serif;background:linear-gradient(180deg,#ffe866,#ffb300);border:2px outset #fff0a0;color:#6a3000;padding:2px 8px;cursor:pointer}.gn-luckystationary .ls-btn:active{border-style:inset}.gn-luckystationary .ls-btn[disabled]{filter:grayscale(1);opacity:.6;cursor:default}',
    '.gn-luckystationary .ls-btn.b{background:linear-gradient(180deg,#7ab8ff,#1f5fae);color:#fff;border-color:#a8d0ff}.gn-luckystationary .ls-btn.p{background:linear-gradient(180deg,#ff7aa8,#e0105a);color:#fff;border-color:#ffb0cc}',
    '.gn-luckystationary .ls-sw{display:flex;justify-content:center;gap:2px;margin:3px 0;flex-wrap:wrap}.gn-luckystationary .ls-sw button{width:13px;height:13px;border:1px solid #333;padding:0;cursor:pointer}.gn-luckystationary .ls-sw button.on{outline:2px solid #000;outline-offset:1px}',
    '.gn-luckystationary .ls-foot{background:#1a4f9a;color:#e8f2ff;font:10px Verdana,sans-serif;padding:8px;text-align:center;border-top:4px solid #ffd400}',
    '.gn-luckystationary .ls-foot a{color:#ffd400}',
    '.gn-luckystationary .ls-badge{display:inline-block;width:88px;height:31px;vertical-align:middle;margin:3px;border:1px solid #000;text-decoration:none;background:linear-gradient(90deg,#000080,#1084d0);color:#fff;font:bold 9px/1.1 Verdana;text-align:left;padding:3px 4px;box-sizing:border-box;position:relative;overflow:hidden}',
    '.gn-luckystationary .ls-badge:after{content:"";position:absolute;top:0;bottom:0;width:20px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);animation:lsShine 2.5s linear infinite}@keyframes lsShine{from{left:-20px}to{left:100px}}',
    '.gn-luckystationary .ls-badge u{text-decoration:none;color:#ffd400}',
    '.gn-luckystationary .ls-count{font:bold 13px "Courier New",monospace;background:#000;color:#0f0;padding:1px 5px;letter-spacing:2px;border:2px inset #888}',
    '.gn-luckystationary .ls-two{display:flex;gap:12px;flex-wrap:wrap}.gn-luckystationary .ls-two>*{flex:1 1 260px;min-width:0}',
    '.gn-luckystationary .ls-box{border:3px double #1f5fae;background:#f2f8ff;padding:6px 8px;margin:0 0 8px}',
    '.gn-luckystationary .ls-box.pink{border-color:#ff1f6e;background:#fff0f6}.gn-luckystationary .ls-box.yel{border-color:#ff8a00;background:#fffbe0}',
    /* the counter */
    '.gn-luckystationary .ls-scene{width:100%;height:auto;display:block;border:3px solid #1f5fae;background:#f4f1ea}',
    '.gn-luckystationary .ls-scene [data-shelf]{cursor:pointer;outline:none}.gn-luckystationary .ls-scene [data-shelf] .hit{fill:transparent;stroke:transparent;stroke-width:3}',
    '.gn-luckystationary .ls-scene [data-shelf]:hover .hit,.gn-luckystationary .ls-scene [data-shelf]:focus .hit{stroke:#ffd400;fill:rgba(255,212,0,.12)}.gn-luckystationary .ls-scene [data-shelf].on .hit{stroke:#ff1f6e;fill:rgba(255,31,110,.08)}',
    '.gn-luckystationary .ls-fan{transform-box:fill-box;transform-origin:center;animation:lsSpin .5s linear infinite}@keyframes lsSpin{to{transform:rotate(360deg)}}',
    '.gn-luckystationary .ls-chime{transform-box:fill-box;transform-origin:top center;animation:lsSway 3s ease-in-out infinite}.gn-luckystationary .ls-chime:nth-child(2n){animation-delay:-1.3s}@keyframes lsSway{50%{transform:rotate(4deg)}}',
    '.gn-luckystationary .ls-shelfv{border:3px solid #ff1f6e;background:#fff;padding:6px 8px;margin-top:8px;min-height:60px}',
    '.gn-luckystationary .ls-shelfv h3{margin:0 0 6px;font:900 15px "Arial Black",Arial;color:#1f5fae}',
    '.gn-luckystationary .ls-row{display:flex;gap:6px;flex-wrap:wrap}',
    '.gn-luckystationary .ls-row button{border:2px solid #9cc4ee;background:#fff;padding:3px;cursor:pointer;font:bold 10px Verdana;width:92px}.gn-luckystationary .ls-row button img{width:80px;height:80px;display:block;margin:0 auto 2px}',
    '.gn-luckystationary .ls-row button:hover,.gn-luckystationary .ls-row button:focus{border-color:#ff1f6e}',
    '.gn-luckystationary .ls-exam{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start;margin-top:8px;border-top:2px dotted #ff8a00;padding-top:8px}',
    '.gn-luckystationary .ls-exam img{width:180px;height:180px;border:2px solid #ccc;background:#fff}',
    '.gn-luckystationary .ls-exam .tx{flex:1 1 200px;position:relative}',
    '.gn-luckystationary .ls-bag li{font:11px Verdana}',
    /* cards */
    '.gn-luckystationary .ls-pack{width:150px;height:220px;margin:6px auto;cursor:pointer;display:block;filter:drop-shadow(3px 4px 0 rgba(0,0,0,.25));transition:transform .2s}.gn-luckystationary .ls-pack:hover{transform:rotate(-3deg) scale(1.03)}',
    '.gn-luckystationary .ls-pack.torn{animation:lsTear .5s forwards}@keyframes lsTear{to{transform:translateY(-30px) rotate(-12deg);opacity:0}}',
    '.gn-luckystationary .ls-table{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;min-height:230px;padding:8px;background:#2a6a3a url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%274%27 height=%274%27%3E%3Crect width=%274%27 height=%274%27 fill=%27%232a6a3a%27/%3E%3Crect width=%271%27 height=%271%27 fill=%27%23306f40%27/%3E%3C/svg%3E");border:6px ridge #8a5a2b}',
    '.gn-luckystationary .ls-card{width:150px;height:212px;perspective:600px;cursor:pointer;flex:0 0 auto;position:relative;background:none;border:0;padding:0}',
    '.gn-luckystationary .ls-card .in{position:absolute;inset:0;transition:transform .5s;transform-style:preserve-3d}.gn-luckystationary .ls-card.up .in{transform:rotateY(180deg)}',
    '.gn-luckystationary .ls-card .f,.gn-luckystationary .ls-card .bk{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:7px}',
    '.gn-luckystationary .ls-card .f{transform:rotateY(180deg)}',
    '.gn-luckystationary .ls-card canvas{width:150px;height:212px;display:block;border-radius:7px}',
    '.gn-luckystationary .ls-card .new{position:absolute;top:-8px;right:-8px;z-index:3;background:#e00;color:#ff0;font:bold 11px Arial;padding:2px 5px;transform:rotate(10deg);border:2px solid #ff0;display:none}.gn-luckystationary .ls-card.up .new{display:block}',
    '.gn-luckystationary .ls-holo{position:absolute;inset:0;border-radius:7px;pointer-events:none;background:linear-gradient(115deg,transparent 20%,rgba(255,0,150,.35) 35%,rgba(0,255,255,.35) 45%,rgba(255,255,0,.35) 55%,transparent 70%);background-size:250% 100%;mix-blend-mode:screen;animation:lsHolo 3s linear infinite;transform:rotateY(180deg);backface-visibility:hidden;-webkit-backface-visibility:hidden}@keyframes lsHolo{from{background-position:120% 0}to{background-position:-120% 0}}',
    '.gn-luckystationary .ls-binder{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:5px;background:#3a2a6a;padding:8px;border:4px solid #1a1040;border-radius:6px}',
    '.gn-luckystationary .ls-slot{aspect-ratio:150/212;background:#2a1f50;border:1px dashed #6a5aa0;border-radius:4px;position:relative;color:#8a7ac0;font:bold 10px Verdana;display:flex;align-items:center;justify-content:center;padding:0;cursor:default}',
    '.gn-luckystationary .ls-slot.own{border:0;cursor:pointer}.gn-luckystationary .ls-slot img{width:100%;height:100%;border-radius:4px;display:block}',
    '.gn-luckystationary .ls-slot i{position:absolute;bottom:2px;right:2px;background:#ffd400;color:#000;font:bold 9px Arial;font-style:normal;padding:0 3px;border-radius:2px}',
    '.gn-luckystationary .ls-prog{height:12px;background:#ddd;border:1px solid #888;margin:4px 0}.gn-luckystationary .ls-prog b{display:block;height:100%;background:linear-gradient(90deg,#ff1f6e,#ffd400)}',
    '.gn-luckystationary .ls-zoom{display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;background:#fffbe0;border:2px solid #ff8a00;padding:8px;margin:8px 0}.gn-luckystationary .ls-zoom canvas{width:225px;height:318px;border-radius:9px}',
    /* memories */
    '.gn-luckystationary.ls-mem{background:#e9e4d6;font:15px/1.7 Georgia,"Times New Roman",serif;color:#4a4a52}',
    '.gn-luckystationary .ls-mempg{max-width:560px;margin:10px auto;padding:20px 22px 26px;background:#f6f2e7;box-shadow:0 1px 6px rgba(0,0,0,.12)}',
    '.gn-luckystationary .ls-mempg h1{font:normal 22px Georgia,serif;color:#5a6a8a;text-shadow:none;letter-spacing:1px}',
    '.gn-luckystationary .ls-line{opacity:0;animation:lsFade 2.4s ease forwards;margin:0 0 14px}@keyframes lsFade{to{opacity:1}}',
    '.gn-luckystationary .ls-polas{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin:18px 0}',
    '.gn-luckystationary .ls-pola{width:130px;background:#fff;padding:7px 7px 24px;box-shadow:0 2px 5px rgba(0,0,0,.18);font:11px Georgia;color:#8a8a92;text-align:center}.gn-luckystationary .ls-pola:nth-child(odd){transform:rotate(-3deg)}.gn-luckystationary .ls-pola:nth-child(even){transform:rotate(2deg)}',
    '.gn-luckystationary .ls-pola div{height:110px;background:linear-gradient(160deg,#c9d3df,#e8dcc4);display:flex;align-items:center;justify-content:center;color:#7a7a82;font-size:10px;margin-bottom:6px}',
    '.gn-luckystationary .ls-receipt{font:12px/1.35 "Courier New",monospace;background:#fffdf6;width:220px;margin:18px auto;padding:10px 12px;box-shadow:0 1px 3px rgba(0,0,0,.15);color:#555;transform:rotate(-1deg);white-space:pre}',
    '@media (max-width:560px){.gn-luckystationary .ls-logo b{font-size:30px}.gn-luckystationary .ls-burst{display:none}.gn-luckystationary .ls-money{margin-left:0}}'
  ].join('\n');

  /* ------------------------------------------------------- product "photos": tiny canvas, shown blurry */
  var PH = {};
  function photo(kind, v) {
    var key = kind + (v || ''); if (PH[key]) return PH[key];
    var c = document.createElement('canvas'); c.width = c.height = 44; var x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 0, 44); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#dcdcdc'); x.fillStyle = g; x.fillRect(0, 0, 44, 44);
    x.fillStyle = 'rgba(0,0,0,.12)'; x.beginPath(); x.ellipse(22, 39, 15, 3, 0, 0, 7); x.fill();
    (DRAW[kind] || DRAW.box)(x, v);
    var d = x.getImageData(0, 0, 44, 44); for (var i = 0; i < d.data.length; i += 4) { var n = (Math.random() - .5) * 14; d.data[i] += n; d.data[i + 1] += n; d.data[i + 2] += n; } x.putImageData(d, 0, 0);
    return (PH[key] = c.toDataURL('image/jpeg', 0.55));
  }
  function rr(x, X, Y, W, H, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + W, Y, X + W, Y + H, r); x.arcTo(X + W, Y + H, X, Y + H, r); x.arcTo(X, Y + H, X, Y, r); x.arcTo(X, Y, X + W, Y, r); x.closePath(); }
  var DRAW = {
    pen: function (x, c) { c = c || '#2a6aff'; x.save(); x.translate(22, 22); x.rotate(-0.7); x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect(-17, -3, 30, 6); x.fillStyle = c; x.fillRect(-15, -1.6, 26, 3.2); x.fillStyle = '#333'; x.fillRect(-19, -3.4, 8, 6.8); x.fillStyle = c; x.fillRect(-19, -3.4, 8, 2); x.fillStyle = '#bbb'; x.beginPath(); x.moveTo(13, -3); x.lineTo(18, 0); x.lineTo(13, 3); x.fill(); x.fillStyle = '#111'; x.fillRect(-21, -1, 3, 2); x.restore(); },
    eraser: function (x, c) { c = c || '#ff8ab0'; rr(x, 9, 15, 26, 16, 4); x.fillStyle = c; x.fill(); x.fillStyle = 'rgba(255,255,255,.6)'; rr(x, 11, 17, 22, 5, 2); x.fill(); x.fillStyle = '#e02040'; x.beginPath(); x.arc(18, 25, 3, 0, 7); x.fill(); x.fillStyle = '#3a9a3a'; x.fillRect(17, 21, 2, 2); x.fillStyle = '#ffd400'; x.beginPath(); x.arc(27, 25, 3, 0, 7); x.fill(); },
    notebook: function (x) { x.fillStyle = '#e8f0ff'; x.fillRect(11, 6, 24, 32); x.fillStyle = '#2a7ad2'; x.fillRect(11, 6, 24, 12); x.fillStyle = '#fff'; x.fillRect(15, 21, 16, 7); x.strokeStyle = '#aab'; for (var i = 0; i < 3; i++) { x.beginPath(); x.moveTo(16, 23 + i * 2); x.lineTo(30, 23 + i * 2); x.stroke(); } x.fillStyle = '#888'; for (var j = 0; j < 7; j++) x.fillRect(9, 8 + j * 4, 4, 2); x.fillStyle = '#ffd400'; x.font = 'bold 6px Arial'; x.fillText('NOTE', 15, 15); },
    geobox: function (x) { x.fillStyle = '#1f5fae'; rr(x, 6, 12, 32, 20, 2); x.fill(); x.fillStyle = '#ffd400'; x.fillRect(8, 14, 28, 4); x.fillStyle = '#fff'; x.font = 'bold 5px Arial'; x.fillText('GEOMETRY', 9, 17.5); x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(14, 30); x.lineTo(20, 20); x.lineTo(26, 30); x.stroke(); x.beginPath(); x.arc(31, 26, 4, Math.PI, 0); x.stroke(); },
    tiffin: function (x) { for (var i = 0; i < 3; i++) { var y = 12 + i * 8, g = x.createLinearGradient(10, 0, 34, 0); g.addColorStop(0, '#8a8a8a'); g.addColorStop(.4, '#f0f0f0'); g.addColorStop(1, '#7a7a7a'); x.fillStyle = g; x.fillRect(10, y, 24, 7); x.fillStyle = '#666'; x.fillRect(10, y + 6, 24, 1); } x.strokeStyle = '#777'; x.lineWidth = 2; x.beginPath(); x.moveTo(12, 36); x.lineTo(12, 6); x.lineTo(32, 6); x.lineTo(32, 36); x.stroke(); },
    bottle: function (x, c) { c = c || '#ff5aa0'; rr(x, 14, 10, 16, 28, 5); x.fillStyle = c; x.fill(); x.fillStyle = 'rgba(255,255,255,.45)'; x.fillRect(16, 13, 3, 22); x.fillStyle = '#ffd400'; rr(x, 16, 4, 12, 7, 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(22, 26, 4, 0, 7); x.fill(); },
    bag: function (x) { x.fillStyle = '#e02040'; rr(x, 9, 9, 26, 29, 6); x.fill(); x.fillStyle = '#1f5fae'; rr(x, 12, 24, 20, 11, 3); x.fill(); x.strokeStyle = '#333'; x.lineWidth = 2; x.beginPath(); x.arc(22, 10, 5, Math.PI, 0); x.stroke(); x.fillStyle = '#ffd400'; x.beginPath(); x.arc(22, 17, 4, 0, 7); x.fill(); },
    crayons: function (x) { var cs = ['#e02040', '#ff8a00', '#ffd400', '#3a9a3a', '#1f5fae', '#7a1fa0']; cs.forEach(function (c, i) { x.fillStyle = c; x.fillRect(10 + i * 4, 8, 3, 10); x.beginPath(); x.moveTo(10 + i * 4, 8); x.lineTo(11.5 + i * 4, 4); x.lineTo(13 + i * 4, 8); x.fill(); }); x.fillStyle = '#ffd400'; x.fillRect(8, 16, 28, 22); x.fillStyle = '#1f5fae'; x.fillRect(8, 22, 28, 9); x.fillStyle = '#fff'; x.font = 'bold 6px Arial'; x.fillText('COLOURS', 9, 29); },
    sharpener: function (x) { x.fillStyle = '#3ac0e0'; rr(x, 14, 16, 16, 14, 2); x.fill(); x.fillStyle = '#ccc'; x.fillRect(16, 18, 12, 4); x.fillStyle = '#222'; x.beginPath(); x.arc(22, 26, 2.5, 0, 7); x.fill(); },
    pencilbox: function (x) { x.fillStyle = '#7a1fa0'; rr(x, 5, 13, 34, 18, 3); x.fill(); x.fillStyle = '#ffd400'; x.beginPath(); x.arc(14, 22, 5, 0, 7); x.fill(); x.fillStyle = '#ff5aa0'; x.beginPath(); x.moveTo(24, 26); x.lineTo(28, 17); x.lineTo(32, 26); x.fill(); x.fillStyle = '#fff'; x.fillRect(5, 21, 34, 1); },
    top: function (x) { x.fillStyle = '#c86a2a'; x.beginPath(); x.moveTo(10, 16); x.quadraticCurveTo(22, 6, 34, 16); x.lineTo(22, 36); x.fill(); x.strokeStyle = '#ffd400'; x.lineWidth = 2; x.beginPath(); x.moveTo(12, 18); x.lineTo(32, 18); x.stroke(); x.strokeStyle = '#e02040'; x.beginPath(); x.moveTo(15, 23); x.lineTo(29, 23); x.stroke(); x.fillStyle = '#888'; x.fillRect(21, 35, 2, 4); x.fillStyle = '#7a4a1a'; x.fillRect(21, 8, 2, 4); },
    yoyo: function (x) { x.fillStyle = '#e02040'; x.beginPath(); x.arc(22, 24, 12, 0, 7); x.fill(); x.fillStyle = '#ff8ab0'; x.beginPath(); x.arc(22, 24, 6, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(22, 24, 2, 0, 7); x.fill(); x.strokeStyle = '#555'; x.beginPath(); x.moveTo(22, 24); x.lineTo(30, 3); x.stroke(); },
    car: function (x) { x.fillStyle = '#ffd400'; rr(x, 6, 20, 32, 10, 3); x.fill(); x.fillStyle = '#ffd400'; rr(x, 12, 13, 18, 9, 3); x.fill(); x.fillStyle = '#9ad0ff'; x.fillRect(14, 15, 6, 5); x.fillRect(22, 15, 6, 5); x.fillStyle = '#222'; x.beginPath(); x.arc(13, 31, 4, 0, 7); x.arc(31, 31, 4, 0, 7); x.fill(); x.fillStyle = '#e02040'; x.fillRect(6, 24, 32, 2); },
    gun: function (x) { x.fillStyle = '#3ac040'; rr(x, 6, 14, 30, 9, 3); x.fill(); x.fillStyle = '#ff8a00'; rr(x, 22, 20, 8, 14, 2); x.fill(); x.fillStyle = '#3a9ae0'; x.beginPath(); x.arc(14, 12, 5, 0, 7); x.fill(); x.fillStyle = '#ffd400'; x.fillRect(36, 17, 4, 3); },
    balloon: function (x, c) { c = c || '#e02040'; x.fillStyle = c; x.beginPath(); x.ellipse(22, 17, 10, 13, 0, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,255,.5)'; x.beginPath(); x.ellipse(18, 12, 2.5, 4, -.4, 0, 7); x.fill(); x.strokeStyle = '#555'; x.beginPath(); x.moveTo(22, 30); x.quadraticCurveTo(18, 36, 23, 42); x.stroke(); },
    plush: function (x) { x.fillStyle = '#c8905a'; x.beginPath(); x.arc(14, 11, 5, 0, 7); x.arc(30, 11, 5, 0, 7); x.fill(); x.beginPath(); x.arc(22, 18, 10, 0, 7); x.fill(); x.beginPath(); x.ellipse(22, 32, 11, 8, 0, 0, 7); x.fill(); x.fillStyle = '#f0d0a8'; x.beginPath(); x.ellipse(22, 21, 5, 4, 0, 0, 7); x.fill(); x.fillStyle = '#222'; x.fillRect(18, 15, 2, 2); x.fillRect(24, 15, 2, 2); x.fillRect(21, 19, 2, 2); x.fillStyle = '#e02040'; x.fillRect(16, 26, 12, 3); },
    board: function (x) { x.fillStyle = '#1f5fae'; x.fillRect(6, 8, 32, 30); x.fillStyle = '#fff'; x.fillRect(9, 11, 26, 24); var cs = ['#e02040', '#3a9a3a', '#ffd400', '#1f5fae']; for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) { x.fillStyle = cs[i * 2 + j]; x.fillRect(9 + i * 16, 11 + j * 14, 10, 10); } x.fillStyle = '#ff8a00'; x.font = 'bold 5px Arial'; x.fillText('FAMILY', 15, 25); },
    chime: function (x) { x.strokeStyle = '#777'; x.beginPath(); x.moveTo(22, 2); x.lineTo(22, 8); x.stroke(); x.fillStyle = '#7a4a1a'; x.fillRect(12, 8, 20, 3); for (var i = 0; i < 5; i++) { var g = x.createLinearGradient(13 + i * 4, 0, 16 + i * 4, 0); g.addColorStop(0, '#9a8a4a'); g.addColorStop(.5, '#f6eab0'); g.addColorStop(1, '#8a7a3a'); x.fillStyle = g; x.fillRect(13 + i * 4, 13, 2.5, 14 + (i % 3) * 5); } },
    clock: function (x) { x.fillStyle = '#e02040'; x.beginPath(); x.arc(14, 9, 4, 0, 7); x.arc(30, 9, 4, 0, 7); x.fill(); x.fillStyle = '#e02040'; x.beginPath(); x.arc(22, 22, 13, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(22, 22, 10, 0, 7); x.fill(); x.strokeStyle = '#222'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(22, 22); x.lineTo(22, 15); x.moveTo(22, 22); x.lineTo(27, 24); x.stroke(); x.fillStyle = '#222'; x.fillRect(14, 34, 3, 4); x.fillRect(27, 34, 3, 4); },
    mug: function (x) { x.fillStyle = '#fff'; rr(x, 9, 12, 20, 24, 3); x.fill(); x.strokeStyle = '#ccc'; x.stroke(); x.strokeStyle = '#ddd'; x.lineWidth = 3; x.beginPath(); x.arc(30, 24, 5, -1.4, 1.4); x.stroke(); x.fillStyle = '#ff1f6e'; x.beginPath(); x.moveTo(19, 30); x.bezierCurveTo(11, 24, 15, 18, 19, 22); x.bezierCurveTo(23, 18, 27, 24, 19, 30); x.fill(); },
    nazar: function (x) { x.strokeStyle = '#777'; x.beginPath(); x.moveTo(22, 2); x.lineTo(22, 10); x.stroke(); [['#1a3ad0', 12], ['#fff', 8], ['#6ac0ff', 5.5], ['#111', 2.5]].forEach(function (r) { x.fillStyle = r[0]; x.beginPath(); x.arc(22, 22, r[1], 0, 7); x.fill(); }); x.fillStyle = '#1a3ad0'; x.beginPath(); x.arc(22, 39, 3, 0, 7); x.fill(); },
    stickers: function (x) { var g = x.createLinearGradient(6, 6, 38, 38); g.addColorStop(0, '#ffb0e0'); g.addColorStop(.3, '#b0f0ff'); g.addColorStop(.6, '#fff0a0'); g.addColorStop(1, '#d0b0ff'); x.fillStyle = g; x.fillRect(7, 6, 30, 33); [[14, 13, '#ff1f6e'], [28, 14, '#1f5fae'], [15, 28, '#3a9a3a'], [29, 29, '#ff8a00']].forEach(function (s) { x.fillStyle = s[2]; x.beginPath(); for (var k = 0; k < 10; k++) { var a = k * Math.PI / 5 - Math.PI / 2, r = k % 2 ? 2.4 : 5.5; x.lineTo(s[0] + Math.cos(a) * r, s[1] + Math.sin(a) * r); } x.fill(); }); },
    pack: function (x) { var g = x.createLinearGradient(10, 0, 34, 0); g.addColorStop(0, '#c0c0c8'); g.addColorStop(.5, '#ffffff'); g.addColorStop(1, '#a0a0b0'); x.fillStyle = g; x.fillRect(11, 4, 22, 36); x.fillStyle = '#e02040'; x.fillRect(11, 10, 22, 14); x.fillStyle = '#ffd400'; x.font = 'bold 6px Arial'; x.fillText('MONSTER', 12, 16); x.fillText('MASTERS', 12, 22); x.fillStyle = '#1f5fae'; x.beginPath(); x.arc(22, 31, 5, 0, 7); x.fill(); x.fillStyle = '#888'; for (var i = 0; i < 6; i++) { x.fillRect(11 + i * 4, 4, 2, 2); x.fillRect(11 + i * 4, 38, 2, 2); } },
    box: function (x) { x.fillStyle = '#ff8a00'; x.fillRect(10, 12, 24, 24); }
  };
  var ITEMS = {
    gelpen: { n: 'Gel Pens (10 colours)', p: 10, k: 'pen', cat: 'school', d: 'Smooth gel ink. Write on the inside of your wrist to test. Glitter colours on the bottom rack.', c: 'y', nw: 1 },
    eraser: { n: 'Scented Fruit Eraser', p: 5, k: 'eraser', cat: 'school', d: 'Smells like strawberry for about a week. Does not erase very well. Nobody buys it to erase.', c: 'p' },
    notebook: { n: 'Long Notebook, 172 pages', p: 25, k: 'notebook', cat: 'school', d: 'Ruled, with a blue cover and a table of contents nobody fills in.' },
    geobox: { n: 'Geometry Box (tin)', p: 45, k: 'geobox', cat: 'school', d: 'Compass, divider, protractor, two set squares, a 15 cm scale and one stencil. The compass will be used as a weapon.' },
    pencilbox: { n: 'Double-Decker Pencil Box', p: 65, k: 'pencilbox', cat: 'school', d: 'Magnetic flap, two floors, a secret drawer for the sharpener. Makes a satisfying click.', nw: 1 },
    sharpener: { n: 'Sharpener', p: 3, k: 'sharpener', cat: 'school', d: 'One hole. Works for exactly one pencil and then gets lost.' },
    crayons: { n: 'Colour Crayons, 12 shades', p: 20, k: 'crayons', cat: 'school', d: 'Wax crayons in a cardboard box. The white one is always unused.' },
    tiffin: { n: 'Steel Tiffin, 3 tier', p: 120, k: 'tiffin', cat: 'school', d: 'Stainless steel. Rice, dal, sabzi. Ask at home first.' },
    bottle: { n: 'School Water Bottle', p: 60, k: 'bottle', cat: 'school', d: 'Pink or blue, with a strap. The cap doubles as a cup.' },
    bag: { n: 'School Bag with Pockets', p: 350, k: 'bag', cat: 'school', d: 'Hangs from the ceiling. Many pockets, one of which will always have an old eraser in it.' },
    stickers: { n: 'Holographic Stickers', p: 5, k: 'stickers', cat: 'toys', d: 'Stars that shine rainbow when you tilt the sheet. Stick them on your notebook, your bottle, your cousin.', c: 'p', nw: 1 },
    pack: { n: 'MONSTER MASTERS Card Pack', p: 10, k: 'pack', cat: 'toys', d: 'Five cards per pack. Rare ones are shiny. Open them in Rare Finds.', c: 'y', nw: 1 },
    top: { n: 'Wooden Spinning Top', p: 15, k: 'top', cat: 'toys', d: 'Wind the string tight, throw it down hard. Takes practice.' },
    yoyo: { n: 'Yo-Yo', p: 10, k: 'yoyo', cat: 'toys', d: 'Plastic, with a light inside that does not work.' },
    car: { n: 'Pull-Back Toy Car', p: 30, k: 'car', cat: 'toys', d: 'Pull it back, let it go, watch it hit the wall.' },
    gun: { n: 'Water Gun', p: 40, k: 'gun', cat: 'toys', d: 'Holds half a bottle of water. Popular in Holi season.' },
    balloon: { n: 'Balloons (each)', p: 2, k: 'balloon', cat: 'toys', d: 'Red, yellow, blue, green. Hung in a bunch by the door.', c: 'p' },
    plush: { n: 'Soft Toy Bear', p: 150, k: 'plush', cat: 'toys', d: 'Sits on the top shelf watching everyone. Has a red ribbon.' },
    board: { n: 'Family Board Game', p: 80, k: 'board', cat: 'toys', d: 'Four colours, one die, many arguments.' },
    chime: { n: 'Wind Chime', p: 99, k: 'chime', cat: 'gifts', d: 'Five metal tubes. Every time the door opens, all of them ring at once.' },
    nazar: { n: 'Evil Eye Hanging', p: 25, k: 'nazar', cat: 'gifts', d: 'Blue glass eye on a string, for the door or the car mirror.' },
    clock: { n: 'Twin-Bell Alarm Clock', p: 175, k: 'clock', cat: 'gifts', d: 'Very loud. Comes in red, blue and gold.' },
    mug: { n: 'Gift Mug', p: 70, k: 'mug', cat: 'gifts', d: 'White with a red heart. A popular choice for teachers.' }
  };
  var PENS = ['#1a3ad0', '#e02040', '#111111', '#2a9a3a', '#ff5aa0', '#7a1fa0', '#ff8a00', '#2ac0e0', '#c8a020', '#a0a0b0'];
  var SHELVES = {
    chimes: { n: 'Wind Chimes & Hangings', items: ['chime', 'nazar'] },
    toys: { n: 'The Toy Shelf', items: ['car', 'gun', 'top', 'yoyo', 'board', 'plush', 'balloon'] },
    school: { n: 'School Supplies Wall', items: ['notebook', 'crayons', 'geobox', 'pencilbox', 'bottle', 'tiffin', 'bag'] },
    gifts: { n: 'Gifts & Clocks', items: ['clock', 'mug', 'bottle', 'chime'] },
    counter: { n: 'The Glass Counter', items: ['gelpen', 'eraser', 'sharpener', 'stickers', 'pack'] },
    cards: { n: 'The Card Rack', items: ['pack', 'stickers'] }
  };

  /* ------------------------------------------------------- pocket money + bag (local) */
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function wallet(ctx) { var w = ctx.store.get('wallet', null); if (!w || w.day !== today()) { w = { day: today(), amt: 100 }; ctx.store.set('wallet', w); } return w; }
  function spend(ctx, n) { var w = wallet(ctx); if (w.amt < n) return false; w.amt -= n; ctx.store.set('wallet', w); return true; }
  function refreshMoney(ctx) { var el = ctx.root.querySelector('.ls-money'); if (el) el.textContent = 'POCKET MONEY: Rs. ' + wallet(ctx).amt + '/-'; }
  function buy(ctx, id) {
    var it = ITEMS[id]; if (!spend(ctx, it.p)) { ctx.status('Not enough pocket money. It refills tomorrow.'); return 'Not enough pocket money. It refills tomorrow.'; }
    if (id === 'pack') ctx.store.set('packs', ctx.store.get('packs', 0) + 1);
    else { var bag = ctx.store.get('bag', {}); bag[id] = (bag[id] || 0) + 1; ctx.store.set('bag', bag); }
    refreshMoney(ctx); var m = id === 'pack' ? 'One pack added. Open it in Rare Finds.' : it.n + ' is in your bag.'; ctx.status(m); return m;
  }

  /* ------------------------------------------------------- page frame */
  function burst() {
    var pts = ''; for (var i = 0; i < 24; i++) { var a = i * Math.PI / 12, r = i % 2 ? 34 : 43; pts += (43 + Math.cos(a) * r).toFixed(1) + ',' + (43 + Math.sin(a) * r).toFixed(1) + ' '; }
    return '<svg class="ls-burst" viewBox="0 0 86 86" aria-hidden="true"><polygon points="' + pts + '" fill="#ffd400" stroke="#ff1f6e" stroke-width="2"/><text x="43" y="38" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="12" fill="#e00">NEW</text><text x="43" y="52" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="10" fill="#1f5fae">STOCK!!</text></svg>';
  }
  var NAVC = ['#e02040', '#ff8a00', '#2a9a3a', '#1f5fae', '#7a1fa0', '#ff1f6e'];
  function frame(ctx, on, main) {
    var L = [['', 'Shop Home'], ['/toys-cards', 'Toys & Cards'], ['/school-supplies', 'School Supplies'], ['/counter', 'The Display Counter'], ['/memories', 'Memories'], ['/rare-finds', 'Rare Finds']];
    return '<div class="ls-pg"><div class="ls-head"><a href="#" data-go="luckystationary.ou" class="ls-logo"><b>LUCKY</b><i>STATIONARY</i><small>TOYS ★ CARDS ★ SCHOOL SUPPLIES ★ GIFTS</small></a>' + burst() + '</div>' +
      '<div class="ls-marq"><span>★ NEW STOCK ARRIVED!!! ★ GEL PENS 10 COLOURS ★ MONSTER MASTERS CARDS ONLY Rs.10 ★ SCENTED ERASERS ★ WIND CHIMES ★ SCHOOL BAGS ★ BALLOONS ★ GIFT ITEMS ★ BEST PRICES ★ COME INSIDE, FAN IS ON ★</span></div>' +
      '<div class="ls-nav">' + L.map(function (l, i) { return '<a href="#" data-go="luckystationary.ou' + l[0] + '" style="background:' + NAVC[i] + '"' + (on === l[0] ? ' class="on"' : '') + '>' + l[1] + '</a>'; }).join('') + '<span class="ls-money"></span></div>' +
      '<div class="ls-main">' + main + '</div>' +
      '<div class="ls-foot"><a href="#" data-go="directory.ou" class="ls-badge" title="GamiNet Directory member"><u>GamiNet</u><br>DIRECTORY MEMBER</a> <a href="#" data-go="directory.ou/category/culture" class="ls-badge" style="background:linear-gradient(90deg,#a00,#f60)"><u>LISTED</u><br>CULTURE &amp; HISTORY</a><br>' +
      'You are visitor no. <span class="ls-count">' + ('00000' + ctx.store.get('visits', 1)).slice(-5) + '</span> (on this computer)<br>Best viewed at 800×600 ★ Lucky Stationary, Pune ★ Nothing on this website is for sale. Pocket money is pretend.</div></div>';
  }
  function itemCard(ctx, id, extra) {
    var it = ITEMS[id];
    return '<div class="ls-item" data-id="' + id + '">' + (it.nw ? '<span class="ls-new">NEW!!</span>' : '') + '<span class="ls-price ' + (it.c || '') + '">Rs.<br>' + it.p + '/-</span>' +
      '<img src="' + photo(it.k) + '" alt="' + it.n + '" width="110" height="110" data-exam="' + id + '"><b>' + it.n + '</b>' + (extra || '') + '<div style="font-size:11px;color:#555;margin:2px 0 4px">' + it.d + '</div>' +
      '<button type="button" class="ls-btn" data-buy="' + id + '">' + (id === 'pack' ? 'Buy pack' : 'Buy') + '</button></div>';
  }
  function wireBuy(ctx) {
    ctx.root.querySelectorAll('[data-buy]').forEach(function (b) { b.addEventListener('click', function () { var m = buy(ctx, b.dataset.buy); var old = b.textContent; b.textContent = /Not enough/.test(m) ? 'No money!' : 'Got it!'; setTimeout(function () { if (ctx.alive()) b.textContent = old; }, 1200); }); });
    ctx.root.querySelectorAll('[data-exam]').forEach(function (im) { im.addEventListener('click', function () { ctx.go('luckystationary.ou/counter?item=' + im.dataset.exam); }); });
    refreshMoney(ctx);
  }

  /* ------------------------------------------------------- pages */
  function rainbow(t) { var cs = ['#e02040', '#ff8a00', '#d4b000', '#2a9a3a', '#1f5fae', '#7a1fa0']; return t.split('').map(function (ch, i) { return ch === ' ' ? ' ' : '<span style="color:' + cs[i % cs.length] + '">' + ch + '</span>'; }).join(''); }
  function storefront() {
    return '<svg viewBox="0 0 260 170" style="width:100%;max-width:300px;height:auto;border:2px solid #1f5fae" role="img" aria-label="Drawing of the shop front"><rect width="260" height="170" fill="#dde4ea"/><rect x="10" y="12" width="240" height="34" fill="#1f5fae"/><text x="24" y="38" font-family="Arial Black,Arial" font-weight="900" font-style="italic" font-size="24" fill="#fff" letter-spacing="3">LUCKY</text><text x="140" y="36" font-family="Arial" font-weight="bold" font-size="12" fill="#fff">STATIONARY</text>' +
      '<rect x="10" y="46" width="240" height="114" fill="#2a2f3a"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { var cs = ['#ff5aa0', '#3a9ae0', '#ffd400', '#e02040', '#2a9a3a', '#ff8a00']; return '<rect x="' + (14 + i * 39) + '" y="50" width="35" height="30" fill="' + cs[i] + '" opacity=".85"/><rect x="' + (17 + i * 39) + '" y="54" width="29" height="8" fill="#fff" opacity=".7"/>'; }).join('') +
      '<rect x="88" y="84" width="84" height="76" fill="#9ab8c8" opacity=".55" stroke="#1f5fae" stroke-width="3"/><line x1="130" y1="84" x2="130" y2="160" stroke="#1f5fae" stroke-width="3"/>' +
      '<g>' + [0, 1, 2, 3].map(function (r) { return '<rect x="16" y="' + (88 + r * 18) + '" width="66" height="2" fill="#1f5fae"/><rect x="178" y="' + (88 + r * 18) + '" width="66" height="2" fill="#1f5fae"/>' + [0, 1, 2, 3, 4].map(function (k) { var cs = ['#e02040', '#ffd400', '#3a9ae0', '#ff5aa0', '#2a9a3a']; return '<rect x="' + (18 + k * 13) + '" y="' + (78 + r * 18) + '" width="10" height="10" fill="' + cs[(k + r) % 5] + '"/><rect x="' + (180 + k * 13) + '" y="' + (78 + r * 18) + '" width="10" height="10" fill="' + cs[(k + r + 2) % 5] + '"/>'; }).join(''); }).join('') + '</g>' +
      '<g><circle cx="200" cy="130" r="9" fill="#c8905a"/><circle cx="214" cy="134" r="8" fill="#ff8ab0"/><circle cx="190" cy="140" r="8" fill="#fff"/></g><rect y="160" width="260" height="10" fill="#8a8a8a"/></svg>';
  }
  function home(ctx) {
    var main = '<div class="ls-two"><div><h1>WELCOME TO LUCKY STATIONARY!!</h1><p class="ls-rain">' + rainbow('Toys, Cards, School Supplies & Gifts') + '</p>' +
      '<p>Come inside. It is cool in here, the fan is on. Gel pens are at the glass counter, school bags are hanging from the ceiling, and the monster card packs are behind the counter next to the till. Ask if you cannot find something. We have it.</p>' +
      '<p><b>NEW THIS SEASON:</b> MONSTER MASTERS Series 1 cards (5 per pack, shiny rares inside!!), double-decker pencil boxes, holographic stickers.</p>' +
      '<p><a href="#" data-go="luckystationary.ou/counter" class="ls-btn b" style="text-decoration:none;display:inline-block">▶ STEP UP TO THE COUNTER</a> <a href="#" data-go="luckystationary.ou/rare-finds" class="ls-btn p" style="text-decoration:none;display:inline-block">★ OPEN A PACK!!</a></p></div>' +
      '<div style="flex:0 1 300px;text-align:center">' + storefront() + '<div style="font-size:11px;color:#555">OUR SHOP (drawing)</div></div></div>' +
      '<h2>★ New Arrivals ★</h2><div class="ls-grid">' + ['pack', 'pencilbox', 'gelpen', 'stickers'].map(function (id) { return itemCard(ctx, id); }).join('') + '</div>' +
      '<h2>Departments</h2><table style="width:100%;border-collapse:collapse;font-size:12px"><tr>' + [['/toys-cards', 'TOYS & CARDS', 'Card packs, tops, yo-yos, cars, water guns, balloons', '#ffe0ec'], ['/school-supplies', 'SCHOOL SUPPLIES', 'Gel pens, erasers, geometry boxes, notebooks, tiffins, bags', '#e0f0ff'], ['/counter', 'DISPLAY COUNTER', 'Look at the shelves. Pick something up.', '#fffbe0']].map(function (d) { return '<td style="border:2px solid #1f5fae;background:' + d[3] + ';padding:6px;vertical-align:top;width:33%"><a href="#" data-go="luckystationary.ou' + d[0] + '" style="font:900 13px \'Arial Black\',Arial">' + d[1] + '</a><br>' + d[2] + '</td>'; }).join('') + '</tr></table>' +
      '<div class="ls-box yel" style="margin-top:10px"><b>NOTICE:</b> Pocket money (Rs. 100) refills every day. Spend it on anything in the shop. Card packs go to <a href="#" data-go="luckystationary.ou/rare-finds">Rare Finds</a>.</div>';
    ctx.html(frame(ctx, '', main)); wireBuy(ctx);
    ctx.title('LUCKY STATIONARY — Toys, Cards & School Supplies');
  }
  function dept(ctx, cat) {
    var ids = Object.keys(ITEMS).filter(function (k) { return ITEMS[k].cat === cat || (cat === 'toys' && ITEMS[k].cat === 'gifts'); });
    var main = cat === 'toys' ? '<h1>TOYS &amp; CARDS</h1><p>Everything for after school. Card packs are kept behind the counter so they do not walk away. Gifts and wind chimes are at the back near the clocks.</p><div class="ls-box pink"><b>MONSTER MASTERS SERIES 1</b> ★ 30 monsters to collect ★ shiny holo rares ★ Rs. 10 per pack ★ <a href="#" data-go="luckystationary.ou/rare-finds">Go to Rare Finds to open packs</a></div>'
      : '<h1>SCHOOL SUPPLIES</h1><p>Everything on the school list, and several things that are not on it. New gel pen colours every term. Try them on the paper pad at the counter.</p>';
    main += '<div class="ls-grid">' + ids.map(function (id) { return itemCard(ctx, id, id === 'gelpen' ? '<div class="ls-sw">' + PENS.map(function (c, i) { return '<button type="button" aria-label="Pen colour ' + (i + 1) + '" style="background:' + c + '" data-pen="' + c + '"' + (i === 0 ? ' class="on"' : '') + '></button>'; }).join('') + '</div>' : ''); }).join('') + '</div>';
    ctx.html(frame(ctx, cat === 'toys' ? '/toys-cards' : '/school-supplies', main)); wireBuy(ctx);
    ctx.root.querySelectorAll('[data-pen]').forEach(function (b) { b.addEventListener('click', function () { var card = b.closest('.ls-item'); card.querySelector('img').src = photo('pen', b.dataset.pen); card.querySelectorAll('[data-pen]').forEach(function (o) { o.classList.toggle('on', o === b); }); }); });
    ctx.title('Lucky Stationary — ' + (cat === 'toys' ? 'Toys & Cards' : 'School Supplies'));
  }

  function scene() {
    function shelfUnit(x0, w, colors, seed) {
      var s = '<rect x="' + x0 + '" y="100" width="4" height="200" fill="#1f5fae"/><rect x="' + (x0 + w - 4) + '" y="100" width="4" height="200" fill="#1f5fae"/>';
      for (var r = 0; r < 4; r++) { var y = 140 + r * 40; s += '<rect x="' + x0 + '" y="' + y + '" width="' + w + '" height="4" fill="#3a6ab8"/>'; var xx = x0 + 6; var k = seed + r * 3; while (xx < x0 + w - 14) { var bw = 8 + (k * 7) % 12, bh = 14 + (k * 5) % 20; s += '<rect x="' + xx + '" y="' + (y - bh) + '" width="' + bw + '" height="' + bh + '" fill="' + colors[k % colors.length] + '"/>'; if (k % 3 === 0) s += '<rect x="' + (xx + 2) + '" y="' + (y - bh + 3) + '" width="' + (bw - 4) + '" height="4" fill="#fff" opacity=".7"/>'; xx += bw + 2; k++; } }
      return s;
    }
    var chimes = ''; for (var i = 0; i < 7; i++) { var cx = 30 + i * 24; chimes += '<g class="ls-chime"><line x1="' + cx + '" y1="30" x2="' + cx + '" y2="44" stroke="#777"/><rect x="' + (cx - 8) + '" y="44" width="16" height="3" fill="#7a4a1a"/>' + [0, 1, 2, 3].map(function (t) { return '<rect x="' + (cx - 7 + t * 4) + '" y="48" width="2.5" height="' + (14 + ((t + i) % 3) * 6) + '" fill="' + (i % 2 ? '#d8c880' : '#b0b0b8') + '"/>'; }).join('') + '</g>'; }
    var nazars = [190, 205].map(function (x) { return '<g class="ls-chime"><line x1="' + x + '" y1="30" x2="' + x + '" y2="50" stroke="#777"/><circle cx="' + x + '" cy="56" r="6" fill="#1a3ad0"/><circle cx="' + x + '" cy="56" r="4" fill="#fff"/><circle cx="' + x + '" cy="56" r="2.5" fill="#6ac0ff"/><circle cx="' + x + '" cy="56" r="1.2" fill="#111"/></g>'; }).join('');
    var clocks = [440, 470, 500, 530, 560, 590].map(function (x, i) { return '<circle cx="' + x + '" cy="62" r="11" fill="' + ['#7a4a1a', '#fff', '#c8a020', '#fff', '#e02040', '#fff'][i] + '" stroke="#555"/><circle cx="' + x + '" cy="62" r="7" fill="#fff"/><line x1="' + x + '" y1="62" x2="' + x + '" y2="57" stroke="#222"/><line x1="' + x + '" y1="62" x2="' + (x + 4) + '" y2="63" stroke="#222"/>'; }).join('');
    var counterItems = ''; for (var j = 0; j < 22; j++) { var px = 136 + j * 17; counterItems += '<rect x="' + px + '" y="' + (318 + (j % 2) * 6) + '" width="13" height="' + (j % 3 ? 4 : 8) + '" fill="' + PENS[j % PENS.length] + '" transform="rotate(' + ((j % 5) * 8 - 16) + ' ' + px + ' 320)"/>'; }
    return '<svg class="ls-scene" viewBox="0 0 640 360" role="group" aria-label="Inside the shop. Select a shelf.">' +
      '<rect width="640" height="300" fill="#f4f1ea"/><rect y="0" width="640" height="30" fill="#fff"/><rect y="300" width="640" height="60" fill="#e6e6e6"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return '<line x1="' + (i * 90) + '" y1="300" x2="' + (i * 90 - 40) + '" y2="360" stroke="#d0d0d0"/>'; }).join('') + '<line x1="0" y1="330" x2="640" y2="330" stroke="#d6d6d6"/>' +
      '<g transform="translate(320 14)"><circle r="4" fill="#666"/><g class="ls-fan"><rect x="-40" y="-3" width="80" height="6" rx="3" fill="#a8a8a8" opacity=".75"/><rect x="-3" y="-40" width="6" height="80" rx="3" fill="#a8a8a8" opacity=".75" transform="rotate(60)"/><rect x="-3" y="-40" width="6" height="80" rx="3" fill="#a8a8a8" opacity=".75" transform="rotate(-60)"/></g></g>' +
      [120, 520].map(function (x) { return '<rect x="' + (x - 20) + '" y="22" width="40" height="5" fill="#fffbe0" stroke="#ddd"/>'; }).join('') +
      '<g data-shelf="chimes" tabindex="0" role="button" aria-label="Wind chimes and hangings"><rect class="hit" x="16" y="28" width="200" height="66"/>' + chimes + nazars + '</g>' +
      '<g data-shelf="gifts" tabindex="0" role="button" aria-label="Gifts and clocks"><rect class="hit" x="416" y="44" width="208" height="256"/>' + clocks + shelfUnit(420, 200, ['#fff', '#ff5aa0', '#3a9ae0', '#c8a020', '#e02040', '#fff', '#7a1fa0'], 5) + '</g>' +
      '<g data-shelf="toys" tabindex="0" role="button" aria-label="The toy shelf"><rect class="hit" x="16" y="96" width="208" height="204"/>' + shelfUnit(20, 200, ['#e02040', '#ffd400', '#3a9ae0', '#2a9a3a', '#ff8a00', '#ff5aa0'], 1) + '<circle cx="190" cy="118" r="10" fill="#c8905a"/><circle cx="183" cy="110" r="4" fill="#c8905a"/><circle cx="197" cy="110" r="4" fill="#c8905a"/></g>' +
      '<g data-shelf="school" tabindex="0" role="button" aria-label="School supplies wall"><rect class="hit" x="236" y="60" width="168" height="240"/>' + shelfUnit(240, 160, ['#1f5fae', '#e8f0ff', '#ffd400', '#2a7ad2', '#e02040', '#3ac0e0'], 2) +
      '<rect x="253" y="66" width="74" height="14" fill="#1f5fae"/><text x="290" y="76" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="7" fill="#fff">COLOUR CRAYONS</text><line x1="270" y1="30" x2="270" y2="66" stroke="#999"/><line x1="310" y1="30" x2="310" y2="66" stroke="#999"/>' +
      '<rect x="320" y="80" width="70" height="14" fill="#1f5fae"/><text x="355" y="90" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="7" fill="#fff">BAGS &amp; BOTTLES</text><line x1="334" y1="30" x2="334" y2="80" stroke="#999"/><line x1="376" y1="30" x2="376" y2="80" stroke="#999"/>' +
      '<rect x="252" y="32" width="14" height="18" rx="4" fill="#e02040"/><rect x="380" y="34" width="14" height="18" rx="4" fill="#3a9ae0"/></g>' +
      '<g data-shelf="counter" tabindex="0" role="button" aria-label="The glass counter"><rect class="hit" x="116" y="268" width="408" height="84"/><rect x="120" y="272" width="400" height="10" fill="#c8dcea" stroke="#7a9ab0"/><rect x="120" y="282" width="400" height="66" fill="#bcd6e8" opacity=".55" stroke="#1f5fae" stroke-width="2"/>' + counterItems + '<rect x="132" y="296" width="60" height="16" fill="#fff" opacity=".8"/><text x="162" y="307" text-anchor="middle" font-family="Arial" font-size="7" fill="#e02040" font-weight="bold">GEL PENS</text><rect x="210" y="300" width="28" height="12" rx="3" fill="#ff8ab0"/><rect x="244" y="300" width="28" height="12" rx="3" fill="#ffd400"/><line x1="130" y1="286" x2="180" y2="340" stroke="#fff" opacity=".6" stroke-width="3"/></g>' +
      '<g data-shelf="cards" tabindex="0" role="button" aria-label="The card rack"><rect class="hit" x="440" y="196" width="74" height="76"/><rect x="443" y="199" width="68" height="73" fill="#fff" stroke="#e02040" stroke-width="2"/><rect x="474" y="226" width="4" height="46" fill="#777"/>' + [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (k) { return '<rect x="' + (450 + k * 18) + '" y="' + (218 + r * 16) + '" width="14" height="14" fill="' + ['#e02040', '#c0c0c8', '#1f5fae'][(r + k) % 3] + '" stroke="#555" stroke-width=".5"/>'; }).join(''); }).join('') + '<text x="477" y="212" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="9" fill="#e02040">CARDS!!</text></g>' +
      '<g pointer-events="none" font-family="Comic Sans MS,cursive" font-size="9" fill="#555"><text x="16" y="352">click a shelf →</text></g></svg>';
  }
  function counter(ctx) {
    var main = '<h1>THE DISPLAY COUNTER</h1><p>Step up to the counter. The fan is going, the wind chimes ring every time the door opens. Click a shelf to look closer, then pick something up.</p>' + scene() +
      '<div class="ls-shelfv" aria-live="polite"><h3>Select a shelf.</h3><div style="font-size:12px;color:#555">Gel pens, erasers and card packs are in the glass counter. Toys on the left, school supplies in the middle, gifts and clocks on the right. Wind chimes hang from the ceiling.</div></div>' +
      '<div class="ls-two" style="margin-top:8px"><div class="ls-box"><b>YOUR BAG</b><ul class="ls-bag" style="margin:4px 0 0;padding-left:18px"></ul></div><div class="ls-box yel"><b>CHIMES:</b> <button type="button" class="ls-btn ls-ring">Ring the wind chimes</button><div style="font-size:11px;color:#555;margin-top:4px">Sound only plays when you press the button.</div></div></div>';
    ctx.html(frame(ctx, '/counter', main)); refreshMoney(ctx);
    var R = ctx.root, view = R.querySelector('.ls-shelfv');
    function bagList() { var bag = ctx.store.get('bag', {}), ks = Object.keys(bag), packs = ctx.store.get('packs', 0); R.querySelector('.ls-bag').innerHTML = (ks.length || packs ? ks.map(function (k) { return '<li>' + ITEMS[k].n + ' × ' + bag[k] + '</li>'; }).join('') + (packs ? '<li>Unopened card packs × ' + packs + ' (' + GN.link('luckystationary.ou/rare-finds', 'open') + ')</li>' : '') : '<li>Empty. You have Rs. ' + wallet(ctx).amt + ' to spend.</li>'); }
    function examine(id, shelf) {
      var it = ITEMS[id]; if (!it) return;
      var ex = view.querySelector('.ls-exam'); if (!ex) { ex = document.createElement('div'); ex.className = 'ls-exam'; view.appendChild(ex); }
      ex.innerHTML = '<img src="' + photo(it.k) + '" alt="' + it.n + '"><div class="tx"><span class="ls-price ' + (it.c || '') + '" style="position:static;display:inline-flex;transform:rotate(-8deg);margin-bottom:4px">Rs.<br>' + it.p + '/-</span><div style="font:900 16px \'Arial Black\',Arial;color:#1f5fae">' + it.n + '</div><p>' + it.d + '</p>' +
        (id === 'gelpen' ? '<div class="ls-sw" style="justify-content:flex-start">' + PENS.map(function (c, i) { return '<button type="button" aria-label="Pen colour ' + (i + 1) + '" style="background:' + c + '" data-pen="' + c + '"' + (i === 0 ? ' class="on"' : '') + '></button>'; }).join('') + '</div>' : '') +
        '<p><button type="button" class="ls-btn ls-buy1">Buy (Rs. ' + it.p + ')</button> <button type="button" class="ls-btn b ls-back">Put it back</button>' + (id === 'pack' ? ' <a href="#" data-go="luckystationary.ou/rare-finds">Open packs »</a>' : '') + '</p><div class="ls-msg" style="font-size:12px;color:#a04000"></div></div>';
      ex.querySelector('.ls-buy1').addEventListener('click', function () { ex.querySelector('.ls-msg').textContent = buy(ctx, id); bagList(); });
      ex.querySelector('.ls-back').addEventListener('click', function () { ex.remove(); });
      ex.querySelectorAll('[data-pen]').forEach(function (b) { b.addEventListener('click', function () { ex.querySelector('img').src = photo('pen', b.dataset.pen); ex.querySelectorAll('[data-pen]').forEach(function (o) { o.classList.toggle('on', o === b); }); }); });
      ctx.status('Examining: ' + it.n);
    }
    function open(shelf, item) {
      var s = SHELVES[shelf]; if (!s) return;
      R.querySelectorAll('[data-shelf]').forEach(function (g) { g.classList.toggle('on', g.dataset.shelf === shelf); });
      view.innerHTML = '<h3>' + s.n + '</h3><div class="ls-row">' + s.items.map(function (id) { return '<button type="button" data-it="' + id + '"><img src="' + photo(ITEMS[id].k) + '" alt="">' + ITEMS[id].n + '</button>'; }).join('') + '</div>' + (shelf === 'cards' ? '<p style="margin:6px 0 0">' + GN.link('luckystationary.ou/rare-finds', '★ Open your packs in Rare Finds') + '</p>' : '');
      view.querySelectorAll('[data-it]').forEach(function (b) { b.addEventListener('click', function () { examine(b.dataset.it, shelf); }); });
      if (item) examine(item, shelf);
    }
    R.querySelectorAll('[data-shelf]').forEach(function (g) {
      g.addEventListener('click', function () { open(g.dataset.shelf); if (g.dataset.shelf === 'chimes') chime(); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(g.dataset.shelf); } });
    });
    R.querySelector('.ls-ring').addEventListener('click', chime);
    var q = ctx.query.item; if (q && ITEMS[q]) { var sh = Object.keys(SHELVES).filter(function (k) { return SHELVES[k].items.indexOf(q) >= 0; })[0]; open(sh, q); view.scrollIntoView && view.scrollIntoView({ block: 'nearest' }); }
    bagList();
    ctx.title('Lucky Stationary — The Display Counter');
  }
  var AC = null;
  function chime() {
    if (window.ULTRA98 && ULTRA98.muted) return;
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { return; }
    var notes = [1568, 1760, 2093, 2349, 2637], t0 = AC.currentTime;
    for (var i = 0; i < 9; i++) { var t = t0 + i * 0.09 + Math.random() * 0.05, f = notes[Math.floor(Math.random() * notes.length)], o = AC.createOscillator(), o2 = AC.createOscillator(), g = AC.createGain(); o.frequency.value = f; o2.frequency.value = f * 2.76; o.connect(g); o2.connect(g); g.connect(AC.destination); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6); o.start(t); o2.start(t); o.stop(t + 1.7); o2.stop(t + 1.7); }
  }

  function memories(ctx) {
    var lines = ['Every summer, the same shop.', 'You went with your cousin. Your cousin knew where everything was kept.', 'The fan turning overhead. The glass counter. The card packs behind it, next to the till.', 'The cards were not real. Nobody minded. The shiny ones were still shiny.', 'Ten rupees was a lot, and then one year it wasn’t.', 'You do not remember the name of the street. You remember the shelves.', 'Some places stand for a whole stretch of your life without ever being important. This was one of them.'];
    var vis = ctx.store.get('memvisits', 0) + 1; ctx.store.set('memvisits', vis);
    ctx.root.classList.add('ls-mem');
    ctx.onLeave(function () { ctx.root.classList.remove('ls-mem'); });
    var main = '<div class="ls-mempg"><h1>Memories</h1>' + lines.map(function (l, i) { return '<p class="ls-line" style="animation-delay:' + (0.4 + i * 1.6) + 's">' + l + '</p>'; }).join('') +
      '<div class="ls-polas">' + ['the counter', 'a summer', 'the two of you'].map(function (c) { return '<div class="ls-pola"><div>photograph<br>to be added</div>' + c + '</div>'; }).join('') + '</div>' +
      '<div class="ls-receipt">   LUCKY STATIONARY\n --------------------\n 1 MONSTER CARDS  10.00\n 2 ERASER         10.00\n 1 STICKERS        5.00\n --------------------\n TOTAL            25.00\n\n  THANK YOU  VISIT AGAIN</div>' +
      '<p style="font-size:12px;text-align:center;color:#8a8a92;margin-top:20px">' + (vis > 1 ? 'You have been back here ' + (vis - 1) + ' time' + (vis === 2 ? '' : 's') + '.' : '') + ' ' + GN.link('luckystationary.ou', 'Back to the shop') + '</p></div>';
    ctx.html(main);
    ctx.title('Lucky Stationary — Memories');
  }

  /* ------------------------------------------------------- MONSTER MASTERS (original creatures) */
  var TYPES = { Water: ['#3a8ae0', '#bfe0ff', '\u{1F4A7}'], Fire: ['#e0502a', '#ffd2a0', '\u{1F525}'], Grass: ['#3a9a3a', '#c8f0b0', '\u{1F33F}'], Thunder: ['#e0b000', '#fff2a0', '⚡'], Stone: ['#8a7a6a', '#e0d8c8', '◆'], Shadow: ['#5a3a8a', '#d8c8f0', '☾'], Sweet: ['#e0508a', '#ffd0e4', '♥'] };
  var MON = [['Bloopip', 'Water'], ['Embrat', 'Fire'], ['Ferndle', 'Grass'], ['Zappow', 'Thunder'], ['Rockum', 'Stone'], ['Gloomlet', 'Shadow'], ['Jalebee', 'Sweet'], ['Puddlump', 'Water'], ['Cindrook', 'Fire'], ['Sproutle', 'Grass'], ['Voltusk', 'Thunder'], ['Pebblor', 'Stone'], ['Murkmoth', 'Shadow'], ['Laddoon', 'Sweet'],
    ['Tidewhisk', 'Water'], ['Kettleback', 'Fire'], ['Neemlet', 'Grass'], ['Buzzwick', 'Thunder'], ['Gravelgob', 'Stone'], ['Hushowl', 'Shadow'], ['Pedapuff', 'Sweet'], ['Eclipsoo', 'Shadow'], ['Rasmalloo', 'Sweet'],
    ['Monsoonix', 'Water'], ['Diyaflame', 'Fire'], ['Banyanox', 'Grass'], ['Thundraj', 'Thunder'], ['Marmotron', 'Stone'], ['Fountaineer', 'Water'], ['Luckoo', 'Sweet']];
  var FLAV = ['Very strong. Likes rain.', 'Sleeps in pencil boxes.', 'Do not feed after school.', 'Can run fast as bicycle.', 'Lives under the counter.', 'Eats erasers. Strawberry only.', 'Hides in your bag.', 'Becomes shiny when happy.', 'Is friend to all monster.', 'Power is from monsoon.', 'Stands up straight. Whistles at eagles.', 'Watches fountains all day.', 'Brings luck. Maybe.'];
  function rarityOf(i) { return i < 14 ? 'C' : i < 23 ? 'U' : i < 27 ? 'R' : 'H'; }
  var RN = { C: 'COMMON', U: 'UNCOMMON', R: 'RARE', H: 'HOLO RARE' };
  function srand(seed) { var a = seed * 2654435761 >>> 0; return function () { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; }; }
  function drawMon(x, i, S, mis) {
    var r = srand(i * 97 + 13), type = MON[i][1], col = TYPES[type][0], lt = TYPES[type][1];
    if (i === 27) col = '#8a5a2b';
    x.save(); x.translate(S / 2, S / 2); x.scale(S / 100, S / 100); if (mis === 2) x.rotate(Math.PI);
    var body = Math.floor(r() * 4), ears = Math.floor(r() * 5), tail = Math.floor(r() * 5), eyes = Math.floor(r() * 4), pat = Math.floor(r() * 3);
    // tail
    x.fillStyle = col; x.strokeStyle = '#222'; x.lineWidth = 2;
    x.beginPath();
    if (tail === 0) { x.moveTo(18, 20); x.lineTo(34, 12); x.lineTo(28, 4); x.lineTo(42, -4); x.lineTo(30, 18); }
    else if (tail === 1) { x.moveTo(18, 22); x.quadraticCurveTo(44, 20, 40, -6); x.quadraticCurveTo(34, 14, 18, 14); }
    else if (tail === 2) { x.ellipse(30, 14, 12, 6, -0.6, 0, 7); }
    else if (tail === 3) { x.moveTo(16, 22); x.bezierCurveTo(44, 30, 46, 0, 30, 2); x.bezierCurveTo(40, 8, 34, 20, 18, 16); }
    x.fill(); if (tail < 4) x.stroke();
    if (type === 'Fire' && tail < 4) { x.fillStyle = '#ffd400'; x.beginPath(); x.arc(38, -4, 5, 0, 7); x.fill(); }
    // ears
    x.fillStyle = col;
    function ear(sx) { x.save(); x.scale(sx, 1); x.beginPath(); if (ears === 0) { x.moveTo(-12, -22); x.lineTo(-22, -42); x.lineTo(-4, -28); } else if (ears === 1) { x.arc(-16, -26, 8, 0, 7); } else if (ears === 2) { x.moveTo(-10, -24); x.quadraticCurveTo(-26, -38, -14, -46); x.quadraticCurveTo(-12, -34, -4, -26); } else if (ears === 3) { x.moveTo(-8, -26); x.lineTo(-14, -44); x.moveTo(-14, -44); x.arc(-14, -46, 3, 0, 7); } else { x.ellipse(-14, -32, 5, 12, -0.4, 0, 7); } x.fill(); x.stroke(); x.restore(); }
    ear(1); ear(-1);
    // body
    x.fillStyle = col; x.beginPath();
    if (body === 0) x.arc(0, 2, 26, 0, 7); else if (body === 1) x.ellipse(0, 6, 22, 28, 0, 0, 7); else if (body === 2) { x.moveTo(-26, 26); x.quadraticCurveTo(-30, -24, 0, -26); x.quadraticCurveTo(30, -24, 26, 26); x.closePath(); } else x.ellipse(0, 4, 28, 22, 0, 0, 7);
    x.fill(); x.stroke();
    // belly / pattern
    x.fillStyle = lt; x.beginPath(); x.ellipse(0, 12, 13, 12, 0, 0, 7); x.fill();
    if (pat === 1) { x.fillStyle = 'rgba(0,0,0,.18)'; [[-16, -6], [16, -8], [-12, 20], [18, 16]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 3.5, 0, 7); x.fill(); }); }
    if (pat === 2) { x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 3; [-14, -4, 6].forEach(function (y) { x.beginPath(); x.moveTo(-24, y - 10); x.lineTo(-16, y - 8); x.stroke(); x.beginPath(); x.moveTo(24, y - 10); x.lineTo(16, y - 8); x.stroke(); }); x.strokeStyle = '#222'; x.lineWidth = 2; }
    // face
    x.fillStyle = '#fff'; x.strokeStyle = '#222';
    var ey = -8;
    if (eyes === 0) { x.fillStyle = '#111'; x.beginPath(); x.arc(-9, ey, 3, 0, 7); x.arc(9, ey, 3, 0, 7); x.fill(); }
    else if (eyes === 1) { [-10, 10].forEach(function (ex) { x.fillStyle = '#fff'; x.beginPath(); x.arc(ex, ey, 7, 0, 7); x.fill(); x.stroke(); x.fillStyle = '#111'; x.beginPath(); x.arc(ex + 1, ey + 1, 4, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(ex + 2.5, ey - 1, 1.5, 0, 7); x.fill(); }); }
    else if (eyes === 2) { x.beginPath(); x.moveTo(-14, ey); x.quadraticCurveTo(-9, ey + 4, -4, ey); x.moveTo(4, ey); x.quadraticCurveTo(9, ey + 4, 14, ey); x.stroke(); }
    else { [-9, 9].forEach(function (ex, k) { x.fillStyle = '#111'; x.beginPath(); x.arc(ex, ey + 1, 3.5, 0, 7); x.fill(); x.beginPath(); x.moveTo(ex - 6 * (k ? -1 : 1), ey - 7); x.lineTo(ex + 4 * (k ? -1 : 1), ey - 4); x.stroke(); }); }
    x.fillStyle = '#ff8ab0'; x.globalAlpha = .7; x.beginPath(); x.arc(-17, 2, 4, 0, 7); x.arc(17, 2, 4, 0, 7); x.fill(); x.globalAlpha = 1;
    x.beginPath(); if ((i * 7) % 3 === 0) { x.moveTo(-5, 4); x.quadraticCurveTo(0, 9, 5, 4); x.stroke(); } else if ((i * 7) % 3 === 1) { x.fillStyle = '#7a1f1f'; x.ellipse(0, 6, 3, 4, 0, 0, 7); x.fill(); } else { x.moveTo(-6, 4); x.lineTo(6, 4); x.stroke(); x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-4, 4); x.lineTo(-2, 8); x.lineTo(0, 4); x.fill(); }
    if (i === 27) { x.fillStyle = '#f0a830'; x.fillRect(-2.5, 6, 2.2, 5); x.fillRect(0.3, 6, 2.2, 5); x.fillStyle = '#7a1f1f'; x.beginPath(); x.moveTo(-26, -4); x.lineTo(24, 26); x.lineTo(20, 30); x.lineTo(-28, 2); x.fill(); }
    if (i === 28) { x.fillStyle = 'rgba(200,240,255,.9)'; for (var k = 0; k < 7; k++) { x.beginPath(); x.arc(-12 + k * 4, -34 - Math.sin(k / 6 * Math.PI) * 10, 2, 0, 7); x.fill(); } }
    if (i === 29) { x.fillStyle = '#ffd400'; x.strokeStyle = '#a07000'; x.beginPath(); x.arc(0, 26, 7, 0, 7); x.fill(); x.stroke(); x.fillStyle = '#a07000'; x.font = 'bold 8px Arial'; x.textAlign = 'center'; x.fillText('L', 0, 29); }
    x.restore();
  }
  var CARDS = {};
  function cardCanvas(i, mis, big) {
    var key = i + ':' + (mis || 0) + ':' + (big ? 1 : 0); if (CARDS[key]) return CARDS[key];
    var W = 300, H = 424, c = document.createElement('canvas'); c.width = W; c.height = H; var x = c.getContext('2d');
    var m = MON[i], rar = rarityOf(i), type = m[1], col = TYPES[type][0], lt = TYPES[type][1];
    var frameC = { C: '#f6d23a', U: '#c8ccd4', R: '#e8b020', H: '#ffffff' }[rar]; if (mis === 1) frameC = '#3ac040';
    rr(x, 0, 0, W, H, 18); x.fillStyle = frameC; x.fill();
    if (rar === 'H') { var hg = x.createLinearGradient(0, 0, W, H); ['#ff9ad0', '#9ae8ff', '#fff59a', '#c8a0ff', '#9affc0'].forEach(function (cc, k) { hg.addColorStop(k / 4, cc); }); x.fillStyle = hg; rr(x, 0, 0, W, H, 18); x.fill(); }
    rr(x, 12, 12, W - 24, H - 24, 12); x.fillStyle = mis === 1 ? '#222' : col; x.fill();
    // header
    x.fillStyle = 'rgba(255,255,255,.88)'; rr(x, 22, 22, 74, 26, 13); x.fill(); x.fillStyle = '#222'; x.font = 'bold 15px Arial'; x.textBaseline = 'middle'; x.fillText('No. ' + ('0' + (i + 1)).slice(-2), 32, 36);
    x.fillStyle = '#fff'; x.beginPath(); x.arc(W - 40, 36, 15, 0, 7); x.fill(); x.fillStyle = col; x.font = 'bold 16px Arial'; x.textAlign = 'center'; x.fillText(type[0], W - 40, 37); x.textAlign = 'left';
    // art: round sticker window with burst
    var cx = W / 2, cy = 150, R = 92;
    x.save(); x.beginPath(); x.arc(cx, cy, R, 0, 7); x.clip();
    x.fillStyle = lt; x.fillRect(cx - R, cy - R, R * 2, R * 2);
    x.fillStyle = 'rgba(255,255,255,.55)'; for (var k = 0; k < 16; k += 2) { x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, R, k * Math.PI / 8, (k + 1) * Math.PI / 8); x.fill(); }
    x.translate(cx - 80, cy - 80); drawMon(x, i, 160, mis === 2 ? 2 : 0); x.restore();
    x.lineWidth = 6; x.strokeStyle = '#fff'; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke(); x.lineWidth = 2; x.strokeStyle = '#222'; x.beginPath(); x.arc(cx, cy, R + 3, 0, 7); x.stroke();
    // name banner
    var nm = m[0].toUpperCase(); if (mis === 3) nm = nm.replace(/([AEIOU])/, '$1$1').replace(/.$/, '');
    x.fillStyle = '#fff'; rr(x, 30, 252, W - 60, 40, 8); x.fill(); x.strokeStyle = '#222'; x.lineWidth = 2; x.stroke();
    x.font = '900 24px "Arial Black", Arial'; x.textAlign = 'center'; x.lineWidth = 5; x.strokeStyle = '#ffd400'; x.strokeText(nm, cx, 273); x.fillStyle = '#c0102a'; x.fillText(nm, cx, 273);
    // stats
    var r = srand(i * 31 + 7); x.textAlign = 'left'; x.font = 'bold 13px Arial'; x.fillStyle = '#fff';
    ['STRENGTH', 'SPEED', 'LUCK'].forEach(function (s, k) { var v = 1 + Math.floor(r() * 4) + (rar === 'R' ? 1 : 0) + (rar === 'H' ? 1 : 0); v = Math.min(5, v); if (i === 29 && s === 'LUCK') v = 5; var y = 314 + k * 20; x.fillText(s, 34, y); x.fillStyle = '#ffd400'; x.fillText('★'.repeat(v), 132, y); x.fillStyle = 'rgba(255,255,255,.4)'; x.fillText('★'.repeat(5 - v), 132 + x.measureText('★'.repeat(v)).width, y); x.fillStyle = '#fff'; });
    // flavour + footer
    x.font = 'italic 12px "Comic Sans MS", cursive'; x.fillStyle = '#fff'; x.textAlign = 'center';
    var fl = i === 27 ? FLAV[10] : i === 28 ? FLAV[11] : i === 29 ? FLAV[12] : FLAV[i % 10]; x.fillText(mis === 3 ? fl.replace('.', '!!') : fl, cx, 378);
    x.fillStyle = 'rgba(0,0,0,.35)'; rr(x, 22, 390, W - 44, 18, 9); x.fill(); x.fillStyle = '#fff'; x.font = 'bold 10px Arial'; x.fillText('MONSTER MASTERS • SERIES 1 • ' + RN[rar] + (mis ? ' • MISPRINT' : ''), cx, 400);
    var url = c.toDataURL('image/png'); CARDS[key] = { canvas: c, url: url }; return CARDS[key];
  }
  function backCanvas() {
    if (CARDS.back) return CARDS.back;
    var W = 300, H = 424, c = document.createElement('canvas'); c.width = W; c.height = H; var x = c.getContext('2d');
    rr(x, 0, 0, W, H, 18); x.fillStyle = '#1f3a8a'; x.fill(); rr(x, 14, 14, W - 28, H - 28, 12); x.fillStyle = '#2a5ad2'; x.fill();
    x.strokeStyle = 'rgba(255,255,255,.18)'; x.lineWidth = 2; for (var k = -H; k < W; k += 16) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k + H, H); x.stroke(); }
    x.fillStyle = '#ffd400'; x.beginPath(); for (var j = 0; j < 20; j++) { var a = j * Math.PI / 10 - Math.PI / 2, rad = j % 2 ? 50 : 96; x.lineTo(150 + Math.cos(a) * rad, 212 + Math.sin(a) * rad); } x.fill(); x.strokeStyle = '#c0102a'; x.lineWidth = 4; x.stroke();
    x.textAlign = 'center'; x.font = '900 30px "Arial Black", Arial'; x.lineWidth = 6; x.strokeStyle = '#fff'; x.strokeText('MONSTER', 150, 204); x.fillStyle = '#c0102a'; x.fillText('MONSTER', 150, 204); x.font = '900 24px "Arial Black", Arial'; x.strokeText('MASTERS', 150, 236); x.fillStyle = '#1f3a8a'; x.fillText('MASTERS', 150, 236);
    x.fillStyle = '#fff'; x.font = 'bold 12px Arial'; x.fillText('COLLECT ALL 30!!', 150, 390);
    return (CARDS.back = { canvas: c, url: c.toDataURL('image/png') });
  }
  function packSVG() {
    return '<svg class="ls-pack" viewBox="0 0 150 220" role="button" tabindex="0" aria-label="Tear open a card pack"><defs><linearGradient id="lsfoil" x1="0" x2="1"><stop offset="0" stop-color="#9aa0b0"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".55" stop-color="#e8ecf4"/><stop offset="1" stop-color="#8890a0"/></linearGradient></defs>' +
      '<path d="M4 10 L146 10 L146 210 L4 210 Z" fill="url(#lsfoil)" stroke="#555"/>' + Array.apply(null, Array(18)).map(function (_, k) { return '<path d="M' + (4 + k * 8) + ' 4 l4 6 l4 -6" fill="#aab" stroke="#777" stroke-width=".5"/><path d="M' + (4 + k * 8) + ' 216 l4 -6 l4 6" fill="#aab" stroke="#777" stroke-width=".5"/>'; }).join('') +
      '<rect x="4" y="36" width="142" height="80" fill="#c0102a"/><text x="75" y="70" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="22" fill="#ffd400" stroke="#7a0010" stroke-width="1">MONSTER</text><text x="75" y="96" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="18" fill="#fff">MASTERS</text>' +
      '<circle cx="75" cy="150" r="26" fill="#1f5fae"/><text x="75" y="147" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="11" fill="#fff">5 CARDS</text><text x="75" y="160" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="9" fill="#ffd400">SERIES 1</text>' +
      '<text x="75" y="196" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="9" fill="#333">SHINY RARE INSIDE!! ★ Rs.10</text><path d="M4 24 H146" stroke="#c0102a" stroke-dasharray="4 3"/><text x="140" y="31" text-anchor="end" font-family="Arial" font-size="6" fill="#c0102a">TEAR HERE ✂</text></svg>';
  }
  function roll() {
    function pickR(r) { var pool = MON.map(function (_, i) { return i; }).filter(function (i) { return rarityOf(i) === r; }); return pool[Math.floor(Math.random() * pool.length)]; }
    var out = [pickR('C'), pickR('C'), pickR('C'), pickR('U')], z = Math.random();
    out.push(pickR(z < 0.05 ? 'H' : z < 0.22 ? 'R' : 'U'));
    return out.map(function (i) { var mm = Math.random(); return { i: i, mis: mm < 0.03 ? 1 + Math.floor(Math.random() * 3) : 0 }; });
  }
  function rare(ctx) {
    var col = ctx.store.get('col', {}), mis = ctx.store.get('mis', {}), packs = ctx.store.get('packs', 0), opened = ctx.store.get('opened', 0);
    var have = MON.filter(function (_, i) { return col[i]; }).length, dup = MON.reduce(function (a, _, i) { return a + Math.max(0, (col[i] || 0) - 1); }, 0);
    var main = '<h1>RARE FINDS ★ MONSTER MASTERS</h1><p>Series 1 has <b>30 monsters</b>. Every pack has five cards and at least one Uncommon. Shiny Holo Rares are very rare. Misprints happen. Keep those.</p>' +
      '<div class="ls-two"><div style="flex:0 0 190px;text-align:center"><div class="ls-packwrap">' + (packs ? packSVG() : '<div style="width:150px;height:220px;margin:6px auto;border:3px dashed #aaa;display:flex;align-items:center;justify-content:center;color:#888;font-size:12px">No packs.<br>Buy one!</div>') + '</div>' +
      '<div style="font-size:12px">Unopened packs: <b class="ls-npk">' + packs + '</b></div><p style="margin:4px 0"><button type="button" class="ls-btn p ls-buyp">Buy pack (Rs. 10)</button></p><div class="ls-msg" style="font-size:11px;color:#a04000;min-height:14px"></div></div>' +
      '<div><div class="ls-table" aria-live="polite"><div style="color:#cfe8cf;align-self:center;font-size:13px;text-align:center">' + (packs ? 'Click the pack to tear it open.<br>Then click each card to turn it over.' : 'Buy a pack with your pocket money.') + '</div></div></div></div>' +
      '<h2>Your Binder</h2><div style="font-size:12px">' + have + ' / 30 collected ★ packs opened: ' + opened + ' ★ doubles: ' + dup + '</div><div class="ls-prog"><b style="width:' + (have / 30 * 100) + '%"></b></div>' +
      '<div class="ls-binder">' + MON.map(function (m, i) { return col[i] ? '<button type="button" class="ls-slot own" data-card="' + i + '" aria-label="' + m[0] + '"><img alt="" src="' + cardCanvas(i, 0).url + '">' + (col[i] > 1 ? '<i>×' + col[i] + '</i>' : '') + '</button>' : '<div class="ls-slot">' + ('0' + (i + 1)).slice(-2) + '</div>'; }).join('') + '</div>' +
      '<div class="ls-zoomwrap"></div>' +
      '<div class="ls-box yel" style="margin-top:8px"><b>SWAP AT THE COUNTER:</b> trade 3 doubles for 1 card you do not have yet. <button type="button" class="ls-btn ls-swap"' + (dup >= 3 && have < 30 ? '' : ' disabled') + '>Swap 3 doubles</button> <span class="ls-swapmsg" style="font-size:11px"></span>' +
      (Object.keys(mis).length ? '<div style="margin-top:4px;font-size:11px"><b>Misprints found:</b> ' + Object.keys(mis).map(function (k) { return MON[k][0] + ' ×' + mis[k]; }).join(', ') + '</div>' : '') + '</div>' +
      '<p style="font-size:11px;color:#666">MONSTER MASTERS is an original card set made for this website. Your collection is saved on this computer only.</p>';
    ctx.html(frame(ctx, '/rare-finds', main)); refreshMoney(ctx);
    var R = ctx.root, table = R.querySelector('.ls-table'), msg = R.querySelector('.ls-msg');
    R.querySelector('.ls-buyp').addEventListener('click', function () { var m = buy(ctx, 'pack'); msg.textContent = m; if (!/Not enough/.test(m)) rare(ctx); });
    var pk = R.querySelector('.ls-pack');
    function tear() {
      if (!pk || pk.classList.contains('torn')) return;
      var n = ctx.store.get('packs', 0); if (n < 1) return;
      ctx.store.set('packs', n - 1); pk.classList.add('torn'); R.querySelector('.ls-npk').textContent = n - 1;
      var got = roll(), col2 = ctx.store.get('col', {}), mis2 = ctx.store.get('mis', {}), fresh = {};
      got.forEach(function (g) { if (!col2[g.i]) fresh[g.i] = 1; col2[g.i] = (col2[g.i] || 0) + 1; if (g.mis) mis2[g.i] = (mis2[g.i] || 0) + 1; });
      ctx.store.set('col', col2); ctx.store.set('mis', mis2); ctx.store.set('opened', ctx.store.get('opened', 0) + 1);
      var back = backCanvas().url;
      table.innerHTML = got.map(function (g, k) { var cc = cardCanvas(g.i, g.mis); return '<button type="button" class="ls-card" data-k="' + k + '" aria-label="Face-down card ' + (k + 1) + '"><div class="in"><img class="bk" src="' + back + '" alt="" width="150" height="212"><img class="f" src="' + cc.url + '" alt="' + MON[g.i][0] + ', ' + RN[rarityOf(g.i)] + '" width="150" height="212">' + (rarityOf(g.i) === 'H' ? '<span class="ls-holo"></span>' : '') + '</div>' + (fresh[g.i] ? '<span class="new">NEW!</span>' : '') + '</button>'; }).join('') +
        '<div style="width:100%;text-align:center;margin-top:6px"><button type="button" class="ls-btn b ls-done" hidden>Put in binder</button></div>';
      var left = got.length;
      table.querySelectorAll('.ls-card').forEach(function (cd) {
        cd.addEventListener('click', function () {
          if (cd.classList.contains('up')) return; cd.classList.add('up'); left--;
          var g = got[+cd.dataset.k]; cd.setAttribute('aria-label', MON[g.i][0] + ', ' + RN[rarityOf(g.i)]);
          if (rarityOf(g.i) === 'H') ctx.status('★ HOLO RARE! ' + MON[g.i][0] + ' ★'); else if (g.mis) ctx.status('A misprint! ' + MON[g.i][0]);
          if (!left) table.querySelector('.ls-done').hidden = false;
        });
      });
      table.querySelector('.ls-done').addEventListener('click', function () { rare(ctx); });
    }
    if (pk) { pk.addEventListener('click', tear); pk.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tear(); } }); }
    R.querySelectorAll('[data-card]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.card, zw = R.querySelector('.ls-zoomwrap'), cc = cardCanvas(i, 0), rar = rarityOf(i);
        zw.innerHTML = '<div class="ls-zoom"><img src="' + cc.url + '" alt="' + MON[i][0] + '" style="width:225px;height:318px;border-radius:9px"><div><div style="font:900 18px \'Arial Black\',Arial;color:#c0102a">' + MON[i][0] + '</div><div>No. ' + (i + 1) + ' • ' + MON[i][1] + ' type • ' + RN[rar] + '</div><div>You have: <b>' + (col[i] || 0) + '</b></div>' +
          (i === 27 ? '<p>' + GN.link('marmotnationalism.ou', 'Endorsed by the National Marmot Front') + '</p>' : i === 28 ? '<p>' + GN.link('fountaincam.ou', 'Seen on FountainCam') + '</p>' : '') + '<p><button type="button" class="ls-btn b ls-zc">Close</button></p></div></div>';
        zw.querySelector('.ls-zc').addEventListener('click', function () { zw.innerHTML = ''; });
      });
    });
    var sw = R.querySelector('.ls-swap');
    sw.addEventListener('click', function () {
      var c2 = ctx.store.get('col', {}), need = 3;
      var missing = MON.map(function (_, i) { return i; }).filter(function (i) { return !c2[i]; }); if (!missing.length) return;
      MON.forEach(function (_, i) { while (need && (c2[i] || 0) > 1) { c2[i]--; need--; } });
      if (need) return;
      var pick = missing[Math.floor(Math.random() * missing.length)]; c2[pick] = 1; ctx.store.set('col', c2);
      rare(ctx); var sm = ctx.root.querySelector('.ls-swapmsg'); if (sm) sm.textContent = 'Swapped! You got ' + MON[pick][0] + '.';
    });
    ctx.title('Lucky Stationary — Rare Finds');
  }

  GN.site('luckystationary.ou', {
    name: 'luckystationary', title: 'Lucky Stationary', css: CSS,
    icon: function (c) { c.fillStyle = '#1f5fae'; c.fillRect(0, 0, 16, 16); c.fillStyle = '#ffd400'; c.fillRect(0, 13, 16, 3); c.fillStyle = '#fff'; c.font = 'bold italic 11px Arial'; c.textBaseline = 'middle'; c.fillText('L', 4, 7.5); c.fillStyle = '#ff1f6e'; c.beginPath(); c.arc(12, 4, 2, 0, 7); c.fill(); },
    render: function (ctx) {
      var p = ctx.path;
      if (p === '/') ctx.store.set('visits', ctx.store.get('visits', 0) + 1);
      wallet(ctx);
      if (p === '/') return home(ctx);
      if (p === '/toys-cards') return dept(ctx, 'toys');
      if (p === '/school-supplies') return dept(ctx, 'school');
      if (p === '/counter') return counter(ctx);
      if (p === '/memories') return memories(ctx);
      if (p === '/rare-finds') return rare(ctx);
      ctx.notFound();
    }
  });
})();
