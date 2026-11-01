/* ultrawater.ou — ULTRAWATER Corporation, an alternate-2002 industrial design company */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-ultrawater{background:#eaf4fb linear-gradient(180deg,#ffffff 0,#dcecf8 420px,#cfe4f4 100%);font:11px/1.5 Verdana,Tahoma,Geneva,sans-serif;color:#13324f}',
    '.gn-ultrawater a{color:#0a58b0}.gn-ultrawater a:visited{color:#3a4f9a}',
    '.gn-ultrawater .uw-wrap{max-width:780px;margin:0 auto;background:rgba(255,255,255,.55);box-shadow:0 0 0 1px #b8d4ea,0 4px 18px rgba(30,80,140,.15)}',
    '.gn-ultrawater .uw-top{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 14px;background:linear-gradient(180deg,#fdfefe,#d4dde6 48%,#b9c6d3 52%,#e4ebf1);border-bottom:1px solid #8aa0b6;flex-wrap:wrap}',
    '.gn-ultrawater .uw-logo{font:italic 900 26px/1 "Arial Black",Arial,sans-serif;letter-spacing:-1px;background:linear-gradient(180deg,#5ab8ff,#0a4fa8 60%,#06306a);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;text-decoration:none;filter:drop-shadow(1px 1px 0 #fff)}',
    '.gn-ultrawater .uw-logo small{display:block;font:bold 8px/1.6 Verdana,sans-serif;letter-spacing:3px;-webkit-text-fill-color:#4a6a8a;font-style:normal}',
    '.gn-ultrawater .uw-util{font-size:10px;color:#4a6a8a}.gn-ultrawater .uw-util a{color:#2a5a8a;text-decoration:none}',
    '.gn-ultrawater .uw-nav{display:flex;flex-wrap:wrap;gap:3px;padding:5px 8px;background:linear-gradient(180deg,#9fd0f4,#3f8fd0 50%,#2a78bf 51%,#5aaae6);border-bottom:1px solid #1a4f88}',
    '.gn-ultrawater .uw-nav a{font:bold 10px Verdana,sans-serif;color:#fff;text-decoration:none;padding:3px 9px;border-radius:9px;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,.08) 50%,rgba(0,40,90,.12) 51%,rgba(255,255,255,.25));box-shadow:inset 0 0 0 1px rgba(255,255,255,.5),0 1px 0 rgba(0,30,70,.4);text-shadow:0 1px 0 rgba(0,40,90,.6)}',
    '.gn-ultrawater .uw-nav a.on,.gn-ultrawater .uw-nav a:hover{background:linear-gradient(180deg,#fff,#cfeaff 50%,#a8d8ff 51%,#e8f6ff);color:#0a3f7a;text-shadow:none}',
    '.gn-ultrawater .uw-body{display:flex;gap:14px;padding:14px;flex-wrap:wrap}',
    '.gn-ultrawater .uw-main{flex:1 1 420px;min-width:0}.gn-ultrawater .uw-side{flex:0 1 200px;min-width:180px}',
    '.gn-ultrawater h1{font:bold 18px Arial,sans-serif;color:#0a3f7a;margin:0 0 6px;letter-spacing:-.3px}',
    '.gn-ultrawater h2{font:bold 13px Arial,sans-serif;color:#0a58b0;margin:14px 0 4px;padding-bottom:2px;border-bottom:1px dotted #8ab8dc}',
    '.gn-ultrawater p{margin:0 0 8px}',
    '.gn-ultrawater .uw-hero{position:relative;border:1px solid #6a9ac8;overflow:hidden;background:#0a1a3a;aspect-ratio:3/2;max-height:360px;width:100%}',
    '.gn-ultrawater .uw-hero img,.gn-ultrawater .uw-hero canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.gn-ultrawater .uw-skip{position:absolute;right:8px;bottom:6px;font:bold 10px Verdana;color:#cfe8ff;text-decoration:none;background:rgba(0,20,60,.5);padding:2px 6px;border:1px solid rgba(160,210,255,.5)}',
    '.gn-ultrawater .uw-claim{position:absolute;left:12px;bottom:10px;color:#fff;font:bold 13px Arial;text-shadow:0 1px 3px #000;letter-spacing:2px}',
    '.gn-ultrawater .uw-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-top:10px}',
    '.gn-ultrawater .uw-tile{display:block;text-decoration:none;color:#13324f;background:linear-gradient(180deg,#fff,#e2f0fb);border:1px solid #9cc2e2;padding:5px;box-shadow:inset 0 1px #fff}',
    '.gn-ultrawater .uw-tile:hover{border-color:#2a78bf;box-shadow:0 0 0 2px #bfe2ff}',
    '.gn-ultrawater .uw-tile img{display:block;width:100%;aspect-ratio:3/2;object-fit:cover;border:1px solid #c8dcec;background:#fff}',
    '.gn-ultrawater .uw-tile b{display:block;color:#0a58b0;font:bold 11px Arial;margin-top:4px}',
    '.gn-ultrawater .uw-box{border:1px solid #9cc2e2;background:linear-gradient(180deg,#f8fcff,#e4f1fb);margin-bottom:10px}',
    '.gn-ultrawater .uw-box h3{margin:0;padding:3px 7px;font:bold 10px Verdana;color:#fff;letter-spacing:1px;background:linear-gradient(180deg,#6ab4ee,#2a78bf);border-bottom:1px solid #1a5a9a}',
    '.gn-ultrawater .uw-box .in{padding:6px 7px;font-size:10px}',
    '.gn-ultrawater .uw-news p{margin:0 0 7px}.gn-ultrawater .uw-date{color:#7a90a8;font-size:9px;display:block}',
    '.gn-ultrawater .uw-fig{margin:8px 0;border:1px solid #9cc2e2;background:#fff;padding:4px}.gn-ultrawater .uw-fig img{display:block;width:100%}',
    '.gn-ultrawater .uw-fig figcaption{font-size:9px;color:#4a6a8a;padding:3px 2px 0}',
    '.gn-ultrawater .uw-two{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.gn-ultrawater table.uw-spec{border-collapse:collapse;width:100%;font-size:10px;margin:6px 0}',
    '.gn-ultrawater .uw-spec th,.gn-ultrawater .uw-spec td{border:1px solid #b8d4ea;padding:3px 6px;text-align:left;vertical-align:top}',
    '.gn-ultrawater .uw-spec th{background:#dceefb;color:#0a3f7a;width:38%}',
    '.gn-ultrawater .uw-note{font-size:9px;color:#5a7290;border-left:3px solid #8ac4f0;padding:3px 7px;background:#f2f9ff;margin:8px 0}',
    '.gn-ultrawater .uw-foot{padding:10px 14px;font-size:9px;color:#5a7290;border-top:1px solid #b8d4ea;background:linear-gradient(180deg,#eef6fc,#d8e8f4);text-align:center}',
    '.gn-ultrawater .uw-ad{display:block;text-decoration:none;border:1px solid #333;background:#000;color:#8fd;font:10px "Courier New",monospace;padding:6px;margin-bottom:10px}',
    '.gn-ultrawater .uw-ad b{color:#fff;font:bold 11px Verdana}',
    /* exploded diagram */
    '.gn-ultrawater .uw-xplode{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}',
    '.gn-ultrawater .uw-xplode svg{flex:0 0 220px;max-width:100%;background:radial-gradient(circle at 50% 40%,#fff,#dfeefa);border:1px solid #9cc2e2}',
    '.gn-ultrawater .uw-xplode svg [data-part]{cursor:pointer}.gn-ultrawater .uw-xplode svg [data-part]:hover *,.gn-ultrawater .uw-xplode svg [data-part].on *{stroke:#ff7a00;stroke-width:2}',
    '.gn-ultrawater .uw-xinfo{flex:1 1 200px;min-height:150px;border:1px solid #9cc2e2;background:#fff;padding:8px}',
    '.gn-ultrawater .uw-xinfo h4{margin:0 0 4px;font:bold 12px Arial;color:#0a3f7a}',
    '.gn-ultrawater .uw-xlist{display:flex;flex-wrap:wrap;gap:3px;margin-top:6px}.gn-ultrawater .uw-xlist button{font:9px Verdana;padding:1px 5px;border:1px solid #8ab8dc;background:#eef7ff;cursor:pointer;color:#0a3f7a}',
    '.gn-ultrawater .uw-xlist button.on{background:#2a78bf;color:#fff}',
    /* terminal */
    '.gn-ultrawater .uw-term{border:2px solid #6a8aa8;background:linear-gradient(180deg,#d8e2ea,#aebdcb);padding:8px;border-radius:6px;box-shadow:inset 0 1px #fff}',
    '.gn-ultrawater .uw-term-in{display:flex;gap:8px;flex-wrap:wrap}',
    '.gn-ultrawater .uw-ctl{flex:1 1 200px;min-width:0}.gn-ultrawater .uw-scr{flex:0 1 260px;min-width:220px}',
    '.gn-ultrawater .uw-sys{display:flex;flex-direction:column;gap:3px}.gn-ultrawater .uw-sys label{display:flex;gap:6px;align-items:center;padding:3px 5px;background:#eef3f7;border:1px solid #9aaabb;cursor:pointer;font-size:10px}',
    '.gn-ultrawater .uw-sys label.on{background:#fff;border-color:#2a78bf;box-shadow:0 0 0 1px #8ac4f0}',
    '.gn-ultrawater .uw-lcd{background:#0a1a10;color:#7dff9a;font:11px/1.5 "Courier New",monospace;padding:6px 8px;border:2px inset #6a7a6a;margin-top:6px;white-space:pre}',
    '.gn-ultrawater .uw-btns{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}',
    '.gn-ultrawater .uw-btns button{font:bold 10px Verdana;padding:5px 10px;border-radius:10px;border:1px solid #1a4f88;color:#fff;cursor:pointer;background:linear-gradient(180deg,#8fd0ff,#2a78bf 50%,#1a62a8 51%,#4aa0e6);text-shadow:0 1px 0 #0a3060}',
    '.gn-ultrawater .uw-btns button.stop{background:linear-gradient(180deg,#ffb0a0,#d03a20 50%,#b02a10 51%,#e86040);border-color:#7a1a08}',
    '.gn-ultrawater .uw-btns button.alt{background:linear-gradient(180deg,#fff,#d8e2ea 50%,#c4d2de 51%,#eef3f7);color:#13324f;text-shadow:none;border-color:#6a8aa8}',
    '.gn-ultrawater .uw-btns button[aria-pressed=true]{box-shadow:inset 0 2px 4px rgba(0,0,0,.4)}',
    '.gn-ultrawater .uw-scr canvas{display:block;width:100%;aspect-ratio:4/5;background:#0b1e33;border:2px inset #6a7a8a}',
    '.gn-ultrawater .uw-flow{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:10px}.gn-ultrawater .uw-flow input{flex:1}',
    '.gn-ultrawater .uw-log{max-height:110px;overflow:auto;font:10px "Courier New",monospace;background:#fff;border:1px solid #9aaabb;padding:4px;margin-top:6px}',
    '@media (max-width:520px){.gn-ultrawater .uw-two{grid-template-columns:1fr}.gn-ultrawater .uw-logo{font-size:21px}}'
  ].join('\n');

  var NAV = [['', 'Home'], ['individual', 'Individual'], ['home', 'Home Systems'], ['civic', 'Civic'], ['atmosphere', 'Atmosphere'], ['synthetic-nature', 'Synthetic Nature'], ['research', 'Research'], ['terminal', 'Terminal'], ['corporate', 'Corporate']];
  function frame(ctx, key, main, side) {
    return '<div class="uw-wrap"><div class="uw-top"><a href="#" data-go="ultrawater.ou" class="uw-logo">ULTRAWATER<small>WATER AS INFRASTRUCTURE</small></a>' +
      '<div class="uw-util">' + ctx.link('ultrawater.ou/corporate', 'Investors') + ' | ' + ctx.link('ultrawater.ou/corporate', 'Careers') + ' | ' + ctx.link('ultrawater.ou/research', 'R&amp;D') + ' | Global: <b>EN</b></div></div>' +
      '<div class="uw-nav">' + NAV.map(function (n) { return '<a href="#" data-go="ultrawater.ou' + (n[0] ? '/' + n[0] : '') + '"' + (n[0] === key ? ' class="on"' : '') + '>' + n[1] + '</a>'; }).join('') + '</div>' +
      '<div class="uw-body"><div class="uw-main">' + main + '</div><div class="uw-side">' + (side || sideDefault(ctx)) + '</div></div>' +
      '<div class="uw-foot">© 2002 ULTRAWATER Corporation. All rights reserved. ULTRAWATER, MONA, CIVIC-1 and ATMOS are trademarks of ULTRAWATER Corporation.<br>' +
      'All products and systems shown are speculative design concepts. They are not offered for sale and have not been certified for use in any market.<br>Best viewed at 1024×768 with Gami Net 1.0 or later.</div></div>';
  }
  function sideDefault(ctx) {
    return '<div class="uw-box"><h3>NEWS</h3><div class="in uw-news">' +
      '<p><span class="uw-date">OCT 29, 2002</span>ULTRAWATER selected for alpine hydration infrastructure by the National Marmot Front. ' + ctx.link('marmotnationalism.ou/bulletins', 'Read the bulletin »') + '</p>' +
      '<p><span class="uw-date">OCT 14, 2002</span>CIVIC-1 field units are now visible on the FountainCam Network. ' + ctx.link('fountaincam.ou', 'Watch »') + '</p>' +
      '<p><span class="uw-date">SEP 30, 2002</span>Kelp Composite Program reaches its fourth frame generation. ' + ctx.link('ultrawater.ou/research', 'R&amp;D »') + '</p></div></div>' +
      '<a href="#" data-go="ultrawater.ou/terminal" class="uw-ad"><b>TRY THE TERMINAL</b><br>&gt; select system<br>&gt; set flow<br>&gt; fill_</a>' +
      '<div class="uw-box"><h3>DIVISIONS</h3><div class="in">' + NAV.slice(1, 6).map(function (n) { return '▸ ' + ctx.link('ultrawater.ou/' + n[0], n[1]); }).join('<br>') + '</div></div>';
  }
  function fig(ctx, img, cap) { return '<figure class="uw-fig"><img src="' + ctx.img(img) + '" alt="' + ctx.esc(cap) + '" loading="lazy"><figcaption>' + cap + '</figcaption></figure>'; }

  /* ---- home, with a "flash intro" ripple over the hero */
  function home(ctx) {
    var main = '<div class="uw-hero"><img src="' + ctx.img('uw-hero.jpg') + '" alt="ULTRAWATER"><canvas width="360" height="240"></canvas><span class="uw-claim">WATER, DESIGNED.</span><a href="#" class="uw-skip">SKIP INTRO &raquo;</a></div>' +
      '<h1>Water is infrastructure.</h1>' +
      '<p>ULTRAWATER designs the objects, systems and environments through which people meet water: the vessel in your bag, the fountain in the concourse, the mist in the atrium, the waterfall that should not exist indoors but does. We believe water should be <b>visible</b>: you should always be able to see how much you have, where it comes from, and where it goes.</p>' +
      '<p>Our work is organized into five divisions. Each one treats water at a different scale.</p>' +
      '<div class="uw-tiles">' +
      [['individual', 'uw-bottles.jpg', 'Individual', 'Modular vessels'], ['home', 'uw-case.jpg', 'Home Systems', 'Pitchers, filtration, the Case'], ['civic', 'uw-fountain1.jpg', 'Civic', 'Fountains and refill terminals'], ['atmosphere', 'uw-lake.jpg', 'Atmosphere', 'Mist, condensation, humidity'], ['synthetic-nature', 'uw-hero.jpg', 'Synthetic Nature', 'Fabricated natural atmospheres']].map(function (t) {
        return '<a href="#" data-go="ultrawater.ou/' + t[0] + '" class="uw-tile"><img src="' + ctx.img(t[1]) + '" alt="" loading="lazy"><b>' + t[2] + '</b>' + t[3] + '</a>';
      }).join('') + '</div>' +
      '<div class="uw-note">ULTRAWATER systems shown on this site are speculative design concepts developed by our studios. They are presented for discussion and are not available for purchase.</div>';
    ctx.html(frame(ctx, '', main));
    var cv = ctx.root.querySelector('.uw-hero canvas'), x = cv.getContext('2d'), W = cv.width, H = cv.height, skip = ctx.root.querySelector('.uw-skip');
    var seen = false; try { seen = sessionStorage.getItem('ou98_gn_uw_intro') === '1'; } catch (e) {}
    var t0 = performance.now(), dur = seen ? 0 : 4200, drops = [];
    function end() { cv.style.transition = 'opacity .6s'; cv.style.opacity = '0'; skip.style.display = 'none'; try { sessionStorage.setItem('ou98_gn_uw_intro', '1'); } catch (e) {} }
    skip.addEventListener('click', function (e) { e.preventDefault(); dur = 0; end(); });
    if (!dur) { cv.style.opacity = '0'; skip.style.display = 'none'; }
    ctx.frame(function (now) {
      var t = (now - t0) / 1000;
      if (dur && now - t0 > dur && cv.style.opacity !== '0') end();
      if (cv.style.opacity === '0') return;
      if (Math.random() < 0.08) drops.push({ x: Math.random() * W, y: Math.random() * H, t: t });
      var a = Math.min(1, t / 0.6);
      x.fillStyle = 'rgba(4,16,40,' + (0.85 - 0.6 * Math.min(1, t / 3)) + ')'; x.fillRect(0, 0, W, H);
      drops = drops.filter(function (d) { return t - d.t < 2.2; });
      drops.forEach(function (d) { var k = (t - d.t) / 2.2; x.strokeStyle = 'rgba(180,225,255,' + (0.6 * (1 - k)) + ')'; x.lineWidth = 1.2; x.beginPath(); x.ellipse(d.x, d.y, 4 + k * 60, (4 + k * 60) * 0.35, 0, 0, Math.PI * 2); x.stroke(); });
      x.globalAlpha = a; x.fillStyle = '#e8f6ff'; x.font = 'italic 900 34px "Arial Black", Arial'; x.textAlign = 'center';
      x.fillText('ULTRAWATER', W / 2, H / 2 + 4 - Math.max(0, 1 - t) * 20);
      x.font = 'bold 9px Verdana'; x.fillStyle = '#9fd4ff'; x.fillText(t > 1.5 ? 'V E S S E L   ·   C I V I C   ·   A T M O S P H E R E' : '', W / 2, H / 2 + 26);
      x.globalAlpha = 1;
    });
    ctx.title('ULTRAWATER — Water as Infrastructure');
  }

  /* ---- Individual: MONA + exploded diagram */
  var PARTS = [
    ['cap', 'Threaded Cap', 'Polypropylene closure with a molded carry loop. Unscrews a quarter turn. Replaceable.', 'PP-7, recycled', 'Replace every 12 months'],
    ['collar', 'Neck Collar', 'Locks the cap thread to the frame and seats the window seal. The collar is the only part that carries load from the carry loop.', 'Kelp-fiber composite', 'Lifetime part'],
    ['upper', 'Upper Frame Ring', 'Kelp-fiber composite ring that holds the top of the window panels and gives the shoulder its shape.', 'Kelp-fiber composite (Gen 4)', 'Lifetime part'],
    ['window', 'Bio-Resin Windows', 'Four transparent bio-resin panels. You can always see how much water is left. That is the point of the vessel.', 'Transparent bio-resin', 'Replace if scratched'],
    ['vessel', 'Inner Vessel', 'The water-contact liner. Slides out of the frame for cleaning or replacement.', 'Food-contact bio-resin', 'Replace every 24 months'],
    ['label', 'Print Band', 'A wraparound printed band (the world map and lake). Carries the MONA name and the fill scale.', 'Printed recycled film', 'Swap freely'],
    ['lower', 'Lower Frame Ring', 'Mirrors the upper ring. Absorbs drops: the frame flexes so the windows don’t.', 'Kelp-fiber composite (Gen 4)', 'Lifetime part'],
    ['base', 'Base Pad', 'Soft foot that keeps the vessel quiet on hard surfaces. Presses in, pulls out.', 'Natural rubber', 'Replace when worn']
  ];
  function diagram() {
    var y = { cap: 18, collar: 58, upper: 92, window: 150, vessel: 150, label: 206, lower: 252, base: 288 };
    return '<svg viewBox="0 0 220 320" role="img" aria-label="Exploded MONA vessel">' +
      '<g data-part="cap"><rect x="80" y="8" width="60" height="22" rx="4" fill="#f4f8fb" stroke="#4a6a8a"/><path d="M140 14 h18 a8 8 0 0 1 0 16 h-18" fill="none" stroke="#4a6a8a" stroke-width="5"/><line x1="86" y1="14" x2="134" y2="14" stroke="#c8d4de"/></g>' +
      '<g data-part="collar"><rect x="72" y="50" width="76" height="14" rx="3" fill="#b9a27a" stroke="#4a6a8a"/><line x1="78" y1="57" x2="142" y2="57" stroke="#8a7550" stroke-dasharray="3 2"/></g>' +
      '<g data-part="upper"><path d="M58 86 Q110 72 162 86 L162 98 Q110 88 58 98 Z" fill="#a8916a" stroke="#4a6a8a"/></g>' +
      '<g data-part="window"><rect x="40" y="112" width="34" height="78" rx="4" fill="rgba(160,210,255,.45)" stroke="#4a6a8a"/><rect x="146" y="112" width="34" height="78" rx="4" fill="rgba(160,210,255,.45)" stroke="#4a6a8a"/></g>' +
      '<g data-part="vessel"><rect x="82" y="110" width="56" height="84" rx="10" fill="rgba(220,240,255,.8)" stroke="#4a6a8a"/><rect x="86" y="150" width="48" height="40" rx="7" fill="rgba(60,150,230,.55)" stroke="none"/></g>' +
      '<g data-part="label"><rect x="60" y="200" width="100" height="14" fill="#3a5a9a" stroke="#4a6a8a"/><text x="110" y="211" font-size="8" font-family="Arial Black,Arial" fill="#fff" text-anchor="middle" font-style="italic">ULTRAWATER</text></g>' +
      '<g data-part="lower"><path d="M58 244 Q110 258 162 244 L162 256 Q110 268 58 256 Z" fill="#a8916a" stroke="#4a6a8a"/></g>' +
      '<g data-part="base"><ellipse cx="110" cy="292" rx="46" ry="8" fill="#5a4a3a" stroke="#4a6a8a"/></g>' +
      '<g stroke="#9ab4cc" stroke-dasharray="2 3"><line x1="110" y1="30" x2="110" y2="50"/><line x1="110" y1="64" x2="110" y2="80"/><line x1="110" y1="98" x2="110" y2="110"/><line x1="110" y1="194" x2="110" y2="200"/><line x1="110" y1="214" x2="110" y2="246"/><line x1="110" y1="262" x2="110" y2="284"/></g>' +
      '</svg>';
  }
  function individual(ctx) {
    var main = '<h1>MONA Modular Vessel</h1>' +
      '<p>MONA is a reusable water vessel built like a small piece of architecture. A frame carries the load, windows show the water, and every part that wears out can be replaced on its own. Nothing about MONA is meant to be thrown away whole.</p>' +
      '<div class="uw-two">' + fig(ctx, 'uw-bottles.jpg', 'MONA 500, front and rear. The rear band carries the fill scale.') + fig(ctx, 'uw-pour.jpg', 'Pour test, MONA 500. Shoulder geometry keeps the stream laminar.') + '</div>' +
      '<h2>Kelp-fiber composite frame</h2><p>The frame rings are pressed from a composite of kelp fiber and binder developed in our Kelp Composite Program. The material is stiff where the vessel needs it and forgiving where it gets dropped.</p>' +
      '<h2>Transparent bio-resin windows</h2><p>Four bio-resin panels sit between the rings. They are deliberately large: we want the water level to be the first thing you notice.</p>' +
      '<h2>Exploded view</h2><p>Click any component to inspect it.</p>' +
      '<div class="uw-xplode">' + diagram() + '<div class="uw-xinfo"><h4>Select a component</h4><p>MONA has eight separable parts. Five are designed to last the life of the vessel.</p><div class="uw-xlist">' + PARTS.map(function (p) { return '<button type="button" data-p="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div></div></div>' +
      '<h2>Specifications</h2><table class="uw-spec"><tr><th>Model</th><td>MONA 500 / MONA 1200 (concept)</td></tr><tr><th>Capacity</th><td>500 mL / 1.2 L</td></tr><tr><th>Frame</th><td>Kelp-fiber composite, Gen 4</td></tr><tr><th>Windows</th><td>Transparent bio-resin, 4 panels</td></tr><tr><th>Replaceable parts</th><td>Cap, windows, inner vessel, print band, base pad</td></tr><tr><th>Status</th><td>Speculative concept. Not for sale.</td></tr></table>' +
      fig(ctx, 'uw-bottles6.jpg', 'Six-up render sheet. Label variants A–F.') + fig(ctx, 'uw-label.jpg', 'Print band, flat. The lake image wraps the full circumference.');
    ctx.html(frame(ctx, 'individual', main));
    var info = ctx.root.querySelector('.uw-xinfo');
    function pick(id) {
      var p = PARTS.filter(function (q) { return q[0] === id; })[0]; if (!p) return;
      ctx.root.querySelectorAll('[data-part]').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-part') === id); });
      info.innerHTML = '<h4>' + p[1] + '</h4><p>' + p[2] + '</p><table class="uw-spec"><tr><th>Material</th><td>' + p[3] + '</td></tr><tr><th>Service</th><td>' + p[4] + '</td></tr></table><div class="uw-xlist">' + PARTS.map(function (q) { return '<button type="button" data-p="' + q[0] + '"' + (q[0] === id ? ' class="on"' : '') + '>' + q[1] + '</button>'; }).join('') + '</div>';
      ctx.status('MONA component: ' + p[1]);
    }
    ctx.root.querySelector('.uw-xplode').addEventListener('click', function (e) {
      var g = e.target.closest('[data-part]'), b = e.target.closest('button[data-p]');
      if (g) pick(g.getAttribute('data-part')); else if (b) pick(b.dataset.p);
    });
    ctx.title('ULTRAWATER Individual — MONA Modular Vessel');
  }
  function homeSys(ctx) {
    var main = '<h1>Home Systems</h1><p>Water in the home should be a system, not a pile of bottles. ULTRAWATER Home Systems connect the tap, the filter, the pitcher and the vessel so that the same water moves through the same parts every day.</p>' +
      fig(ctx, 'uw-case.jpg', 'The ULTRAWATER Case. Holds a household rotation of MONA vessels in a translucent shell that stacks in a refrigerator door.') +
      '<h2>Pitcher 2.0</h2><p>A two-litre pitcher with a top-loading filter cartridge and a full-height window. Like MONA, its frame and liner separate for cleaning.</p>' +
      '<h2>Filtration</h2><p>Cartridges are sealed units that report their remaining life on a printed scale. Swap at the scale, not by the calendar.</p>' +
      '<h2>Kitchen &amp; bath hardware</h2><p>Integrated fill points, a counter-mounted chiller and a bath-side refill tap are in development. None are available yet.</p>' +
      '<table class="uw-spec"><tr><th>Pitcher 2.0</th><td>2.0 L, bio-resin window, replaceable liner</td></tr><tr><th>Cartridge</th><td>Sealed, printed life scale</td></tr><tr><th>Case</th><td>Translucent shell, stacking</td></tr><tr><th>Status</th><td>Speculative concept</td></tr></table>';
    ctx.html(frame(ctx, 'home', main)); ctx.title('ULTRAWATER Home Systems');
  }
  function civic(ctx) {
    var main = '<h1>Civic Systems</h1><p>The public fountain is one of the last free things in a city. ULTRAWATER Civic designs drinking fountains, refill terminals and campus hydration networks that are easy to clean, hard to break, and pleasant to stand next to.</p>' +
      fig(ctx, 'uw-fountains.jpg', 'CIVIC-1 “Globe” terminal, four views. The globe spout is the only moving part a visitor touches.') +
      '<h2>CIVIC-1 “Globe” terminal</h2><p>A molded white shell with a rotating globe spout, two push controls and a bottle-fill bay. The basin is shaped so water never stands. A service hatch at the rear gives access to the valve block and filter.</p>' +
      '<table class="uw-spec"><tr><th>Controls</th><td>Drink / Fill, push-type, low force</td></tr><tr><th>Spout</th><td>Globe, rotating, replaceable</td></tr><tr><th>Basin</th><td>Self-draining</td></tr><tr><th>Service</th><td>Rear hatch, valve block, cartridge</td></tr><tr><th>Status</th><td>Speculative concept</td></tr></table>' +
      fig(ctx, 'uw-parking.jpg', 'Field study: CIVIC-1 placed in a parking structure stairwell. We test where nobody is looking.') +
      '<p>Some field studies are visible on the ' + ctx.link('fountaincam.ou', 'FountainCam Network') + ', an independent service that monitors decorative and civic water features.</p>' +
      '<h2>Refill terminals &amp; campus networks</h2><p>Wall-mounted refill points for offices, schools and transit, linked into a single maintenance schedule. Vending infrastructure accepts MONA vessels for refills.</p>';
    ctx.html(frame(ctx, 'civic', main)); ctx.title('ULTRAWATER Civic Systems');
  }
  function atmosphere(ctx) {
    var main = '<h1>Atmosphere</h1><div class="uw-hero" style="aspect-ratio:16/7"><img src="' + ctx.img('uw-lake.jpg') + '" alt=""><canvas width="320" height="140"></canvas><span class="uw-claim">WATER YOU BREATHE</span></div>' +
      '<p>Most of the water in a building is invisible. It is in the air. ULTRAWATER Atmosphere works with mist, condensation and humidity: the water you feel on your skin before you ever drink any.</p>' +
      '<h2>ATMOS mist systems</h2><p>Fine-mist lines for courtyards, platforms and atria. They cool by evaporation and make light visible. ATMOS cartridges are refilled from the same civic supply as our fountains.</p>' +
      '<h2>Condensation capture</h2><p>Cold surfaces in plant rooms and on facades collect water that is usually wasted. We route it back into irrigation and fog installations.</p>' +
      '<h2>Humidity as comfort</h2><p>Dry air is a design failure. Our humidity controllers hold rooms in a narrow band and show you the reading.</p>';
    ctx.html(frame(ctx, 'atmosphere', main));
    var cv = ctx.root.querySelector('canvas'), x = cv.getContext('2d'), parts = [];
    for (var i = 0; i < 90; i++) parts.push({ x: Math.random() * 320, y: Math.random() * 140, r: 10 + Math.random() * 30, v: 0.1 + Math.random() * 0.3 });
    ctx.frame(function () {
      x.clearRect(0, 0, 320, 140);
      parts.forEach(function (p) { p.x += p.v; if (p.x - p.r > 320) p.x = -p.r; var g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, 'rgba(230,245,255,.18)'); g.addColorStop(1, 'rgba(230,245,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill(); });
    });
    ctx.title('ULTRAWATER Atmosphere');
  }
  function synthetic(ctx) {
    var main = '<h1>Synthetic Nature</h1><p>Indoor waterfalls. Fog that rolls across a food court at noon. A stream through a hotel lobby that begins in a wall and ends in a floor drain. Synthetic Nature builds natural atmospheres where nature could never be.</p>' +
      fig(ctx, 'uw-promo.jpg', 'Presentation board, Synthetic Nature division. The lake is real. The rest is product.') +
      '<h2>Interior water environments</h2><p>Recirculating streams, reflecting pools and water walls, engineered so that the sound is designed as carefully as the image. We publish target decibel levels for every installation.</p>' +
      '<h2>Fog installations</h2><p>High-pressure fog for atria, gardens and stages. Fog is timed to occupancy, so it appears when people do.</p>' +
      '<h2>Artificial waterfalls</h2><p>From one storey to four. Our falls run on a closed loop with a visible return channel, because hiding the plumbing is a lie.</p>' +
      '<p>Watch working water features on the ' + ctx.link('fountaincam.ou/feed/watercourt', 'FountainCam watercourt feed') + '.</p>';
    ctx.html(frame(ctx, 'synthetic-nature', main)); ctx.title('ULTRAWATER Synthetic Nature');
  }
  function research(ctx) {
    var main = '<h1>Research &amp; Development</h1><p>ULTRAWATER R&amp;D runs four standing programs. Each publishes internal memos; selected summaries appear below.</p>' +
      '<h2>Kelp Composite Program (KCP)</h2><p>Develops the kelp-fiber composite used in MONA frame rings. Current work: the fourth frame generation, which raises stiffness without adding thickness, and press tooling that leaves the fiber pattern visible on purpose.</p>' +
      '<h2>Bio-Resin Optics (BRO)</h2><p>Transparent bio-resins for windows and liners. Targets: clarity after 1,000 wash cycles, scratch resistance, and a faint blue edge tint so the window reads as water even when empty.</p>' +
      '<h2>Visible Hydration</h2><p>Studies how people judge how much water they have. Finding: people drink more from vessels whose level they can see from across a room.</p>' +
      '<h2>Civic Flow Studies</h2><p>Measures how public fountains are actually used, by time of day and by season. Field units are sometimes observed through independent services such as ' + ctx.link('fountaincam.ou', 'FountainCam') + '.</p>' +
      '<h2>Recent memos</h2><table class="uw-spec"><tr><th>KCP-M-0412</th><td>Gen 4 frame ring: drop results, 1.5 m onto concrete</td></tr><tr><th>BRO-M-0219</th><td>Edge tint and perceived fullness</td></tr><tr><th>VH-M-0087</th><td>Across-the-room legibility of fill scales</td></tr><tr><th>CFS-M-0133</th><td>Concourse fountain use, weekday vs. weekend</td></tr></table>' +
      fig(ctx, 'uw-bottles-dark.jpg', 'Studio photography, MONA 500, black field.');
    ctx.html(frame(ctx, 'research', main)); ctx.title('ULTRAWATER Research & Development');
  }
  function corporate(ctx) {
    var main = '<h1>Corporate Information</h1>' +
      '<h2>About ULTRAWATER</h2><p>ULTRAWATER is an industrial design corporation organized around a single material. We design vessels, civic systems, atmospheres and synthetic environments, and we develop the materials they are made of.</p>' +
      '<h2>Principles</h2><ol><li>Water should be visible.</li><li>Every part that wears out should be replaceable on its own.</li><li>Public water should be pleasant, not merely available.</li><li>Do not hide the plumbing.</li></ol>' +
      '<h2>Divisions</h2><table class="uw-spec">' + NAV.slice(1, 6).map(function (n) { return '<tr><th>' + n[1] + '</th><td>' + ctx.link('ultrawater.ou/' + n[0], 'ultrawater.ou/' + n[0]) + '</td></tr>'; }).join('') + '</table>' +
      '<h2>Investors</h2><p>ULTRAWATER Corporation is privately held. There is no public offering.</p>' +
      '<h2>Careers</h2><p>There are no open positions at this time. Thank you for your interest in water.</p>' +
      '<h2>Correspondence</h2><p>ULTRAWATER does not publish a postal address or telephone number on Gami Net.</p>';
    ctx.html(frame(ctx, 'corporate', main)); ctx.title('ULTRAWATER Corporate Information');
  }

  /* ---- Virtual Hydration Terminal */
  var SYSTEMS = [
    { id: 'mona', name: 'MONA Vessel 500', cap: 500, max: 2.0, kind: 'bottle' },
    { id: 'pitcher', name: 'HOME Pitcher 2.0', cap: 2000, max: 4.0, kind: 'pitcher' },
    { id: 'civic', name: 'CIVIC-1 Bottle Fill', cap: 1000, max: 6.0, kind: 'civic' },
    { id: 'atmos', name: 'ATMOS Mist Cartridge', cap: 300, max: 1.0, kind: 'cart' }
  ];
  var SPEED = 3;
  function terminal(ctx) {
    var main = '<h1>Virtual Hydration Terminal</h1><p>Choose a system, set the flow and fill. The terminal stops automatically at capacity. Press <b>INSPECT</b> to see inside the system.</p>' +
      '<div class="uw-term"><div class="uw-term-in"><div class="uw-ctl"><div class="uw-sys">' + SYSTEMS.map(function (s, i) { return '<label' + (i === 0 ? ' class="on"' : '') + '><input type="radio" name="uwsys" value="' + s.id + '"' + (i === 0 ? ' checked' : '') + '> <b>' + s.name + '</b> <span style="margin-left:auto">' + (s.cap >= 1000 ? s.cap / 1000 + ' L' : s.cap + ' mL') + '</span></label>'; }).join('') + '</div>' +
      '<div class="uw-flow"><span>FLOW</span><input type="range" class="uw-rate" min="0.1" max="2" step="0.1" value="1.2" aria-label="Flow rate"><b class="uw-rv">1.2 L/min</b></div>' +
      '<div class="uw-btns"><button type="button" class="uw-fill" aria-pressed="false">FILL</button><button type="button" class="stop uw-stop">STOP</button><button type="button" class="alt uw-drain">DRAIN</button><button type="button" class="alt uw-insp" aria-pressed="false">INSPECT</button></div>' +
      '<div class="uw-lcd"></div><div class="uw-log" aria-live="polite"></div></div>' +
      '<div class="uw-scr"><canvas width="260" height="325"></canvas></div></div></div>' +
      '<div class="uw-note">The terminal is a simulation running in your browser at 3\u00D7 speed. Filter life is remembered on this computer.</div>';
    ctx.html(frame(ctx, 'terminal', main));
    var R = ctx.root, cv = R.querySelector('canvas'), x = cv.getContext('2d'), lcd = R.querySelector('.uw-lcd'), log = R.querySelector('.uw-log');
    var rate = R.querySelector('.uw-rate'), rv = R.querySelector('.uw-rv'), fillB = R.querySelector('.uw-fill'), insp = R.querySelector('.uw-insp');
    var filters = ctx.store.get('filters', {}), sys = SYSTEMS[0], vol = 0, filling = false, draining = false, inspect = false, startT = 0, startV = 0, msg = 'READY', last = performance.now();
    function setSys(id) {
      sys = SYSTEMS.filter(function (s) { return s.id === id; })[0]; vol = 0; filling = draining = false; fillB.setAttribute('aria-pressed', 'false');
      rate.max = sys.max; if (+rate.value > sys.max) rate.value = sys.max; rv.textContent = (+rate.value).toFixed(1) + ' L/min'; msg = 'SYSTEM ' + sys.id.toUpperCase() + ' SELECTED';
      R.querySelectorAll('.uw-sys label').forEach(function (l) { l.classList.toggle('on', l.querySelector('input').value === id); });
    }
    function addLog(t) { var d = new Date(), p = function (n) { return ('0' + n).slice(-2); }; var line = document.createElement('div'); line.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '  ' + t; log.insertBefore(line, log.firstChild); }
    R.querySelector('.uw-sys').addEventListener('change', function (e) { if (e.target.name === 'uwsys') setSys(e.target.value); });
    rate.addEventListener('input', function () { rv.textContent = (+rate.value).toFixed(1) + ' L/min'; });
    fillB.addEventListener('click', function () {
      if (vol >= sys.cap - 0.5) { msg = 'VESSEL FULL — DRAIN FIRST'; return; }
      filling = !filling; draining = false; fillB.setAttribute('aria-pressed', String(filling));
      if (filling) { startT = performance.now(); startV = vol; msg = 'FILLING'; } else { stopped('PAUSED'); }
    });
    function stopped(why) {
      filling = false; fillB.setAttribute('aria-pressed', 'false');
      var got = vol - startV;
      if (got > 1) addLog(sys.name + ': ' + Math.round(got) + ' mL in ' + ((performance.now() - startT) / 1000 * SPEED).toFixed(1) + ' s' + (why === 'AUTO-STOP' ? ' (auto-stop)' : ''));
      msg = why; startV = vol;
    }
    R.querySelector('.uw-stop').addEventListener('click', function () { if (filling) stopped('STOPPED'); draining = false; });
    R.querySelector('.uw-drain').addEventListener('click', function () { if (filling) stopped('STOPPED'); draining = vol > 0; msg = draining ? 'DRAINING' : 'EMPTY'; });
    insp.addEventListener('click', function () { inspect = !inspect; insp.setAttribute('aria-pressed', String(inspect)); });
    var wave = 0, drops = [];
    ctx.frame(function (now) {
      var dt = Math.min(0.1, (now - last) / 1000); last = now; wave += dt * 3;
      var flow = +rate.value;   /* L/min */
      if (filling) {
        vol += flow * 1000 / 60 * dt * SPEED;
        var used = (filters[sys.id] || 0) + flow * 1000 / 60 * dt * SPEED; filters[sys.id] = used;
        if (vol >= sys.cap) { vol = sys.cap; stopped('AUTO-STOP'); ctx.store.set('filters', filters); }
      } else if (draining) { vol -= 2500 / 60 * dt * SPEED; if (vol <= 0) { vol = 0; draining = false; msg = 'EMPTY'; } }
      if (!filling && Math.floor(now / 2000) !== Math.floor((now - dt * 1000) / 2000)) ctx.store.set('filters', filters);
      var life = Math.max(0, 100 - (filters[sys.id] || 0) / (sys.cap * 40) * 100);
      var pct = vol / sys.cap * 100, left = filling && flow > 0 ? (sys.cap - vol) / (flow * 1000 / 60) : 0; /* real-time seconds at this flow */
      var pressure = filling ? (1.8 + flow * 0.42 + Math.sin(now / 300) * 0.03) : 3.2;
      lcd.textContent = 'SYSTEM  ' + sys.name.toUpperCase() + '\n' +
        'VOLUME  ' + (Math.round(vol) + ' / ' + sys.cap + ' mL').padEnd(18) + '\n' +
        'FILL    ' + bar(pct) + ' ' + pct.toFixed(0) + '%\n' +
        'FLOW    ' + (filling ? flow.toFixed(1) : '0.0') + ' L/min   T-FULL ' + (filling ? left.toFixed(1) + 's' : '--') + '\n' +
        'LINE    ' + pressure.toFixed(2) + ' bar   TEMP ' + (11.4 + Math.sin(now / 5000) * 0.2).toFixed(1) + '°C\n' +
        'FILTER  ' + life.toFixed(0) + '% LIFE\n' +
        '> ' + msg + (Math.floor(now / 500) % 2 ? '_' : ' ');
      draw(x, cv.width, cv.height, sys, pct / 100, filling ? flow / sys.max : 0, inspect, wave, drops, dt);
    });
    function bar(p) { var n = Math.round(p / 10); return '[' + '#'.repeat(n) + '.'.repeat(10 - n) + ']'; }
    ctx.onLeave(function () { ctx.store.set('filters', filters); });
    ctx.title('ULTRAWATER Virtual Hydration Terminal');
  }
  function draw(x, W, H, sys, f, flowK, inspect, wave, drops, dt) {
    x.clearRect(0, 0, W, H);
    var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#13304f'); g.addColorStop(1, '#06121f'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.strokeStyle = 'rgba(120,180,240,.12)'; for (var i = 0; i < W; i += 13) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for (var j = 0; j < H; j += 13) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
    /* vessel geometry per system */
    var v = sys.kind === 'pitcher' ? { x: 60, y: 110, w: 140, h: 180, r: 14 } : sys.kind === 'cart' ? { x: 95, y: 150, w: 70, h: 140, r: 10 } : sys.kind === 'civic' ? { x: 90, y: 140, w: 80, h: 150, r: 18 } : { x: 80, y: 120, w: 100, h: 170, r: 22 };
    /* nozzle */
    var nx = W / 2;
    x.fillStyle = '#c8d4de'; x.fillRect(nx - 30, 30, 60, 26); x.fillStyle = '#9aaabb'; x.fillRect(nx - 8, 56, 16, 18);
    if (sys.kind === 'civic') { x.fillStyle = '#eef3f7'; x.beginPath(); x.arc(nx, 44, 16, 0, 7); x.fill(); x.strokeStyle = '#4a6a8a'; x.stroke(); }
    x.fillStyle = '#7dff9a'; x.font = 'bold 9px Courier New'; x.textAlign = 'center'; x.fillText(sys.id.toUpperCase(), nx, 47);
    /* stream */
    var surf = v.y + v.h - 6 - (v.h - 16) * f;
    if (flowK > 0) {
      var sw = 2 + flowK * 8; x.fillStyle = 'rgba(120,200,255,.75)'; x.fillRect(nx - sw / 2, 74, sw, Math.max(0, surf - 74));
      if (Math.random() < flowK) drops.push({ x: nx + (Math.random() - 0.5) * 20, y: surf, vx: (Math.random() - 0.5) * 40, vy: -40 - Math.random() * 60 });
    }
    for (var k = drops.length - 1; k >= 0; k--) { var d = drops[k]; d.vy += 220 * dt; d.x += d.vx * dt; d.y += d.vy * dt; if (d.y > surf + 2) drops.splice(k, 1); else { x.fillStyle = 'rgba(180,230,255,.8)'; x.fillRect(d.x, d.y, 2, 2); } }
    /* vessel */
    x.save(); rr(x, v.x, v.y, v.w, v.h, v.r); x.clip();
    x.fillStyle = 'rgba(200,230,255,.06)'; x.fillRect(v.x, v.y, v.w, v.h);
    var wg = x.createLinearGradient(0, surf, 0, v.y + v.h); wg.addColorStop(0, 'rgba(90,180,255,.85)'); wg.addColorStop(1, 'rgba(20,80,180,.9)'); x.fillStyle = wg;
    x.beginPath(); x.moveTo(v.x, v.y + v.h);
    for (var px = v.x; px <= v.x + v.w; px += 4) x.lineTo(px, surf + Math.sin(px / 9 + wave) * (1 + flowK * 3));
    x.lineTo(v.x + v.w, v.y + v.h); x.closePath(); x.fill();
    x.restore();
    rr(x, v.x, v.y, v.w, v.h, v.r); x.lineWidth = 2; x.strokeStyle = 'rgba(200,235,255,.8)'; x.stroke();
    /* scale */
    x.fillStyle = 'rgba(200,235,255,.7)'; x.font = '8px Courier New'; x.textAlign = 'left';
    for (var s = 0; s <= 4; s++) { var yy = v.y + v.h - 6 - (v.h - 16) * s / 4; x.fillRect(v.x + v.w + 3, yy, 6, 1); x.fillText(Math.round(sys.cap * s / 4) + '', v.x + v.w + 11, yy + 3); }
    if (inspect) {
      x.strokeStyle = '#ff9a3a'; x.fillStyle = '#ffcf9a'; x.lineWidth = 1; x.font = '9px Verdana'; x.textAlign = 'left';
      [['VALVE BLOCK', nx + 30, 42], ['FLOW SENSOR', nx + 8, 66], ['FILTER CART.', nx - 30, 36], ['LEVEL PROBE', v.x + v.w - 6, v.y + 20]].forEach(function (l, i) {
        var lx = i % 2 ? 182 : 8, ly = 90 + i * 14; x.beginPath(); x.moveTo(l[1], l[2]); x.lineTo(lx + (i % 2 ? 0 : 66), ly - 3); x.stroke(); x.fillText(l[0], lx, ly);
      });
      x.setLineDash([3, 3]); x.strokeRect(v.x + v.w - 12, v.y + 10, 6, v.h - 20); x.setLineDash([]);
    }
  }
  function rr(x, X, Y, W, H, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + W, Y, X + W, Y + H, r); x.arcTo(X + W, Y + H, X, Y + H, r); x.arcTo(X, Y + H, X, Y, r); x.arcTo(X, Y, X + W, Y, r); x.closePath(); }

  GN.site('ultrawater.ou', {
    name: 'ultrawater', title: 'ULTRAWATER', css: CSS,
    icon: function (c) { var g = c.createLinearGradient(0, 0, 0, 16); g.addColorStop(0, '#8fd0ff'); g.addColorStop(1, '#0a4fa8'); c.fillStyle = g; c.beginPath(); c.moveTo(8, 1); c.quadraticCurveTo(15, 10, 8, 15); c.quadraticCurveTo(1, 10, 8, 1); c.fill(); c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(6, 7, 2, 3); },
    render: function (ctx) {
      var p = ctx.path;
      if (p === '/') return home(ctx);
      if (p === '/individual' || p === '/products') return individual(ctx);
      if (p === '/home') return homeSys(ctx);
      if (p === '/civic') return civic(ctx);
      if (p === '/atmosphere') return atmosphere(ctx);
      if (p === '/synthetic-nature') return synthetic(ctx);
      if (p === '/research') return research(ctx);
      if (p === '/terminal') return terminal(ctx);
      if (p === '/corporate') return corporate(ctx);
      ctx.notFound();
    }
  });
})();
