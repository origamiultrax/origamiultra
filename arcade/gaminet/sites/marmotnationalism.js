/* marmotnationalism.ou — Official Website of the National Marmot Front. Satire; entirely fictional. */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-marmotnationalism{background:#dfe6d2 url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2712%27%3E%3Crect width=%2724%27 height=%2712%27 fill=%27%23dfe6d2%27/%3E%3Cpath d=%27M0 12 L6 4 L12 12 M12 12 L18 6 L24 12%27 fill=%27none%27 stroke=%27%23d2dbc3%27/%3E%3C/svg%3E");color:#1e2a1a;font:12px/1.5 Georgia,"Times New Roman",serif;padding:8px 4px}',
    '.gn-marmotnationalism a{color:#1d4f8a}.gn-marmotnationalism a:visited{color:#4a3a7a}',
    '.gn-marmotnationalism .mn-pg{max-width:800px;margin:0 auto;background:#fffdf4;border:2px solid #2f5a2e;box-shadow:0 0 0 3px #d4a72c,0 0 0 4px #2f5a2e}',
    '.gn-marmotnationalism .mn-gov{background:#1c3a1e;color:#e7d9a8;font:10px Arial,sans-serif;letter-spacing:1px;padding:2px 8px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}',
    '.gn-marmotnationalism .mn-gov a,.gn-marmotnationalism .mn-gov a:visited{color:#f3e3a6}',
    '.gn-marmotnationalism .mn-head{display:flex;align-items:center;gap:12px;padding:10px 12px;background:linear-gradient(180deg,#8fc1e3,#cfe6f2 60%,#e9f3df);border-bottom:4px solid #d4a72c;position:relative;overflow:hidden}',
    '.gn-marmotnationalism .mn-head .mn-hph{position:absolute;right:0;top:0;height:100%;width:52%;object-fit:cover;object-position:80% 50%;-webkit-mask-image:linear-gradient(90deg,transparent,#000 50%);mask-image:linear-gradient(90deg,transparent,#000 50%)}',
    '.gn-marmotnationalism .mn-ph{float:right;width:180px;margin:0 0 8px 12px;border:1px solid #9aa58a;background:#fff;padding:3px;font:italic 10px/1.3 Georgia,serif;color:#444}.gn-marmotnationalism .mn-ph img{display:block;width:100%;height:auto}.gn-marmotnationalism .mn-ph figcaption{padding:3px 2px 1px}.gn-marmotnationalism .mn-ph.l{float:left;margin:0 12px 8px 0}.gn-marmotnationalism .mn-ph.s{width:140px}',
    '.gn-marmotnationalism .mn-bul:after,.gn-marmotnationalism .mn-clear{content:"";display:block;clear:both}',
    '.gn-marmotnationalism .mn-gal{display:flex;gap:8px;flex-wrap:wrap}.gn-marmotnationalism .mn-gal .mn-ph{float:none;margin:0;flex:1 1 150px;max-width:200px}',
    '.gn-marmotnationalism .mn-pimg{display:block;width:100%;height:auto;border:1px solid #9aa58a;margin:0 0 6px}',
    '.gn-marmotnationalism .mn-cands{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px}.gn-marmotnationalism .mn-cands label{text-align:center;border:1px solid #b9c4a4;background:#fff;padding:4px;cursor:pointer}.gn-marmotnationalism .mn-cands img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border:1px solid #1c3a1e;margin-bottom:3px}.gn-marmotnationalism .mn-cands label:has(input:checked){outline:3px solid #d4a72c;background:#fff6d0}',
    '.gn-marmotnationalism .mn-picks{display:flex;gap:6px;flex-wrap:wrap}.gn-marmotnationalism .mn-picks label{display:block;text-align:center;font:bold 9px Arial;text-transform:uppercase;cursor:pointer;width:74px;margin:0;letter-spacing:0}.gn-marmotnationalism .mn-picks img{display:block;width:70px;height:70px;object-fit:cover;border:2px solid #9aa58a}.gn-marmotnationalism .mn-picks input{display:block;margin:2px auto 0}.gn-marmotnationalism .mn-picks label:has(input:checked) img{border-color:#d4a72c;outline:2px solid #1c3a1e}',
    '.gn-marmotnationalism .mn-title{position:relative;text-decoration:none;color:#1c3a1e}',
    '.gn-marmotnationalism .mn-title b{display:block;font:bold 26px/1 "Times New Roman",serif;letter-spacing:2px;text-transform:uppercase;text-shadow:1px 1px 0 #fff}',
    '.gn-marmotnationalism .mn-title i{display:block;font:bold 11px Arial,sans-serif;font-style:normal;letter-spacing:3px;color:#7a1f1f;margin-top:4px}',
    '.gn-marmotnationalism .mn-flag{position:relative;flex:0 0 auto;animation:mnWave 3s ease-in-out infinite;transform-origin:left center}@keyframes mnWave{50%{transform:skewY(-2deg) scaleX(.97)}}',
    '.gn-marmotnationalism .mn-hib{background:repeating-linear-gradient(-45deg,#1d4f8a 0 10px,#24599a 10px 20px);color:#fff;text-align:center;font:bold 11px Arial,sans-serif;letter-spacing:1px;padding:4px 6px;border-bottom:1px solid #0f2f5a}',
    '.gn-marmotnationalism table.mn-lay{width:100%;border-collapse:collapse}',
    '.gn-marmotnationalism td.mn-nav{width:150px;vertical-align:top;background:#2f5a2e;padding:8px 6px}',
    '.gn-marmotnationalism .mn-nav a{display:block;margin:0 0 4px;padding:4px 6px;font:bold 11px Arial,sans-serif;color:#1c3a1e;background:linear-gradient(180deg,#f3e3a6,#d4a72c);border:2px outset #f6e7b0;text-decoration:none;text-transform:uppercase;letter-spacing:.5px}',
    '.gn-marmotnationalism .mn-nav a.on,.gn-marmotnationalism .mn-nav a:active{border-style:inset;background:#fff6d0}',
    '.gn-marmotnationalism .mn-nav .mn-box{margin-top:10px;background:#fffdf4;border:1px solid #d4a72c;padding:5px;font:10px/1.4 Arial,sans-serif;color:#1e2a1a}',
    '.gn-marmotnationalism .mn-nav .mn-box h4{margin:0 0 3px;font:bold 9px Arial;letter-spacing:1px;color:#7a1f1f;text-transform:uppercase}',
    '.gn-marmotnationalism .mn-count{font:bold 13px "Courier New",monospace;background:#000;color:#ffd84a;padding:1px 4px;letter-spacing:2px;border:2px inset #777;display:inline-block}',
    '.gn-marmotnationalism td.mn-main{vertical-align:top;padding:12px 16px 16px}',
    '.gn-marmotnationalism h1{font:bold 22px/1.15 "Times New Roman",serif;color:#1c3a1e;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;border-bottom:3px double #d4a72c;padding-bottom:4px}',
    '.gn-marmotnationalism h2{font:bold 14px "Times New Roman",serif;color:#7a1f1f;margin:14px 0 4px;text-transform:uppercase;letter-spacing:1px}',
    '.gn-marmotnationalism p{margin:0 0 8px}',
    '.gn-marmotnationalism .mn-motto{font:bold 13px Arial,sans-serif;letter-spacing:3px;text-align:center;color:#fff;background:#7a1f1f;padding:5px;margin:8px 0;border:2px solid #d4a72c}',
    '.gn-marmotnationalism .mn-posters{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.gn-marmotnationalism .mn-posters svg{flex:1 1 150px;max-width:190px;height:auto;border:3px solid #1c3a1e;background:#fff;box-shadow:3px 3px 0 #9aa58a}',
    '.gn-marmotnationalism .mn-bul{border:1px solid #b9c4a4;background:#f7f8ee;padding:6px 8px;margin:0 0 8px}',
    '.gn-marmotnationalism .mn-bul .no{font:bold 9px Arial;letter-spacing:1px;color:#7a1f1f;text-transform:uppercase}',
    '.gn-marmotnationalism .mn-bul h3{font:bold 13px "Times New Roman",serif;margin:2px 0 3px}',
    '.gn-marmotnationalism .mn-two{display:flex;gap:12px;flex-wrap:wrap}.gn-marmotnationalism .mn-two>*{flex:1 1 240px;min-width:0}',
    '.gn-marmotnationalism .mn-portrait{flex:0 0 200px;max-width:220px;border:6px ridge #b8892a;background:#3a2414;padding:6px;text-align:center;color:#e7d9a8;font:10px Arial}',
    '.gn-marmotnationalism .mn-portrait img{display:block;width:100%;height:auto;border:2px solid #1a0f06}',
    '.gn-marmotnationalism table.mn-t{width:100%;border-collapse:collapse;font:11px Arial,sans-serif;margin:6px 0}',
    '.gn-marmotnationalism .mn-t th{background:#2f5a2e;color:#f3e3a6;text-align:left;padding:3px 6px;border:1px solid #1c3a1e}.gn-marmotnationalism .mn-t td{padding:3px 6px;border:1px solid #b9c4a4;vertical-align:top}',
    '.gn-marmotnationalism .mn-map{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}',
    '.gn-marmotnationalism .mn-map svg{flex:1 1 320px;max-width:440px;height:auto;border:2px solid #1c3a1e;background:#cfe6f2}',
    '.gn-marmotnationalism .mn-map [data-prov]{cursor:pointer;outline:none}.gn-marmotnationalism .mn-map [data-prov] path{stroke:#1c3a1e;stroke-width:1.5;transition:fill .15s}',
    '.gn-marmotnationalism .mn-map [data-prov]:hover path,.gn-marmotnationalism .mn-map [data-prov]:focus path{fill:#f3e3a6}.gn-marmotnationalism .mn-map [data-prov].on path{fill:#d4a72c}',
    '.gn-marmotnationalism .mn-pinfo{flex:1 1 200px;border:1px solid #b9c4a4;background:#f7f8ee;padding:6px 8px;font:11px/1.45 Arial,sans-serif}',
    '.gn-marmotnationalism .mn-pinfo h3{font:bold 15px "Times New Roman",serif;margin:0 0 4px;color:#1c3a1e}',
    '.gn-marmotnationalism .mn-btn{font:bold 11px Arial,sans-serif;background:linear-gradient(180deg,#f3e3a6,#d4a72c);border:2px outset #f6e7b0;color:#1c3a1e;padding:3px 10px;cursor:pointer;text-transform:uppercase}.gn-marmotnationalism .mn-btn:active{border-style:inset}',
    '.gn-marmotnationalism .mn-btn.red{background:linear-gradient(180deg,#c04040,#7a1f1f);color:#fff;border-color:#d06060}',
    '.gn-marmotnationalism fieldset{border:2px groove #d4a72c;margin:0 0 10px;padding:6px 10px;background:#fbfaf0}.gn-marmotnationalism legend{font:bold 12px "Times New Roman",serif;color:#1c3a1e;padding:0 4px}',
    '.gn-marmotnationalism fieldset label{display:block;font:11px Arial,sans-serif;padding:1px 0}',
    '.gn-marmotnationalism .mn-bar{height:12px;background:#e4e8d8;border:1px solid #9aa58a;position:relative}.gn-marmotnationalism .mn-bar i{position:absolute;left:0;top:0;bottom:0;background:#2f5a2e}.gn-marmotnationalism .mn-bar.sim i{background:#1d4f8a}',
    '.gn-marmotnationalism .mn-res td{font:10px Arial}.gn-marmotnationalism .mn-res td:first-child{width:45%}',
    '.gn-marmotnationalism .mn-warn{font:10px Arial;background:#fff3c4;border:1px solid #d4a72c;padding:4px 6px;margin:6px 0}',
    '.gn-marmotnationalism .mn-form label{display:block;font:bold 10px Arial;margin:6px 0 2px;text-transform:uppercase;letter-spacing:1px;color:#1c3a1e}.gn-marmotnationalism .mn-form input[type=text],.gn-marmotnationalism .mn-form select{font:12px Arial;width:100%;max-width:260px;border:2px inset #ccc;padding:2px}',
    '.gn-marmotnationalism .mn-card{width:330px;max-width:100%;border:3px solid #1c3a1e;background:linear-gradient(135deg,#fffbe8,#f3e3a6);font:11px Arial,sans-serif;box-shadow:3px 3px 0 #9aa58a;margin:8px 0}',
    '.gn-marmotnationalism .mn-card .top{background:#2f5a2e;color:#f3e3a6;font:bold 10px Arial;letter-spacing:2px;padding:4px 6px;display:flex;justify-content:space-between}',
    '.gn-marmotnationalism .mn-card .bd{display:flex;gap:8px;padding:8px}.gn-marmotnationalism .mn-card img{flex:0 0 70px;width:70px;height:84px;object-fit:cover;border:1px solid #1c3a1e}',
    '.gn-marmotnationalism .mn-card dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:1px 6px}.gn-marmotnationalism .mn-card dt{font:bold 8px Arial;letter-spacing:1px;color:#7a1f1f;text-transform:uppercase;padding-top:2px}.gn-marmotnationalism .mn-card dd{margin:0;font-weight:bold;overflow-wrap:anywhere}',
    '.gn-marmotnationalism .mn-card .ft{background:#7a1f1f;color:#fff;font:bold 9px Arial;letter-spacing:2px;text-align:center;padding:2px}',
    '.gn-marmotnationalism .mn-foot{background:#1c3a1e;color:#cbbf8f;font:10px Arial,sans-serif;text-align:center;padding:6px 8px}.gn-marmotnationalism .mn-foot a{color:#f3e3a6}',
    '.gn-marmotnationalism .mn-lyr{font-style:italic;column-width:180px;background:#f7f8ee;border:1px solid #b9c4a4;padding:6px 10px}',
    '@media (max-width:560px){.gn-marmotnationalism td.mn-nav{display:block;width:auto}.gn-marmotnationalism td.mn-main{display:block}.gn-marmotnationalism .mn-nav a{display:inline-block}.gn-marmotnationalism .mn-nav .mn-box{display:none}.gn-marmotnationalism .mn-title b{font-size:18px}}'
  ].join('\n');

  /* ---------- photographs (Wikimedia Commons, see /credits) and emblems ---------- */
  var IMG = '';
  function P(n) { return IMG + n; }
  function photo(n, cap, cls) { return '<figure class="mn-ph' + (cls ? ' ' + cls : '') + '"><img src="' + P(n) + '" alt="' + cap.replace(/"/g, '') + '"><figcaption>' + cap + '</figcaption></figure>'; }
  function flag(w) {
    return '<svg class="mn-flag" width="' + w + '" height="' + Math.round(w * 2 / 3) + '" viewBox="0 0 90 60" role="img" aria-label="Flag of the National Marmot Front"><rect width="90" height="20" fill="#8fc1e3"/><rect y="20" width="90" height="20" fill="#fffdf4"/><rect y="40" width="90" height="20" fill="#2f5a2e"/>' +
      '<circle cx="45" cy="30" r="17.5" fill="#d4a72c" stroke="#1c3a1e" stroke-width="1.2"/><image href="' + P('mn-emblem.png') + '" x="30" y="15" width="30" height="30"/><rect width="90" height="60" fill="none" stroke="#1c3a1e"/></svg>';
  }
  function seal(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 120 120" role="img" aria-label="Seal of the National Marmot Front"><defs><path id="mnsealp" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0"/></defs>' +
      '<circle cx="60" cy="60" r="58" fill="#d4a72c" stroke="#1c3a1e" stroke-width="2"/><circle cx="60" cy="60" r="54" fill="none" stroke="#1c3a1e" stroke-width=".6"/>' +
      '<text font-family="Times New Roman" font-size="8.6" font-weight="bold" fill="#1c3a1e"><textPath href="#mnsealp" textLength="290" lengthAdjust="spacingAndGlyphs">NATIONAL MARMOT FRONT • ONE BURROW • ONE PEOPLE • ONE FUTURE •</textPath></text>' +
      '<image href="' + P('mn-emblem.png') + '" x="21" y="21" width="78" height="78"/><circle cx="60" cy="60" r="39" fill="none" stroke="#1c3a1e" stroke-width="1.6"/></svg>';
  }
  function poster(bg, fg, l1, l2, img, l2c) {
    return '<svg viewBox="0 0 120 170" role="img" aria-label="Poster: ' + l1 + ' ' + l2 + '"><rect width="120" height="170" fill="' + bg + '"/><image href="' + P(img) + '" x="0" y="0" width="120" height="122" preserveAspectRatio="xMidYMid slice"/>' +
      '<rect y="122" width="120" height="48" fill="' + fg + '"/><rect y="120" width="120" height="2" fill="' + bg + '"/><text x="60" y="143" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="16" fill="' + bg + '">' + l1 + '</text><text x="60" y="160" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="10.5" fill="' + (l2c || '#fffdf4') + '">' + l2 + '</text></svg>';
  }
  function POSTERS() {
    return poster('#8fc1e3', '#1c3a1e', 'WATCH', 'THE SKY', 'mn-poster-sky.jpg') + poster('#d4a72c', '#7a1f1f', 'GRASS', 'FOR EVERY BURROW', 'mn-poster-grass.jpg') + poster('#2f5a2e', '#d4a72c', 'DIG', 'DEEPER TOGETHER', 'mn-poster-dig.jpg', '#1c3a1e');
  }
  var CREDITS = [
    ['Official portrait of the Chairman; referendum photograph; seal and flag emblem (tinted); “Watch the Sky” poster (tinted)', 'Marmota marmota Tauerntal 20220816 01.jpg', 'Uoaei1', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['The Chairman on the Great Rock', 'Marmota marmota Tauerntal 20220816 02.jpg', 'Uoaei1', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Foreign Relations: reception of a delegation', 'Marmota marmota Tauerntal 20220816 05.jpg', 'Uoaei1', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Old Gustav of Scree Basin (referendum)', 'Marmota marmota Tauerntal 20220816 18.jpg', 'Uoaei1', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Clover Brightfur (referendum); Lower Pasture; “Grass for Every Burrow” poster (tinted)', 'La sentinella della montagna 04.jpg', 'Mairate eleonora', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['A large, dignified rock (referendum); Sunning Rocks Capital District', 'Marmota alpina (Marmota marmota), Tierpark Hellabrunn, Múnich, Alemania, 2012-06-17, DD 01.JPG', 'Diego Delso', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0'],
    ['Upper Meadow; Bulletin No. 117; membership card photograph', 'Alpenmurmeltier, Marmota marmota 11.JPG', 'Böhringer Friedrich', 'CC BY-SA 2.5', 'https://creativecommons.org/licenses/by-sa/2.5'],
    ['Page header; Talus Heights; Bulletin No. 114', 'Alpenmurmeltier Marmota marmota 3.JPG', 'Böhringer Friedrich', 'CC BY-SA 2.5', 'https://creativecommons.org/licenses/by-sa/2.5'],
    ['Scree Basin', 'Alpenmurmeltier Marmota marmota of Rätikon 5.JPG', 'Böhringer Friedrich', 'CC BY-SA 3.0 AT', 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en'],
    ['Bulletin No. 115', 'Marmotte DSCF5679.jpg', 'Musicaline', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Glacier March; Bulletin No. 116', 'Marmotte DSCF0332.jpg', 'Musicaline', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Cable Car Corridor; “Dig Deeper Together” poster (tinted)', 'Marmottes DSCF4990.jpg', 'Musicaline', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0'],
    ['Bulletin No. 113; the Chairman at the Main Burrow', 'Marmota marmota sp. 03.jpg', 'Bernie', 'Public domain', ''],
    ['Bulletin No. 118; the Chairman before hibernation', 'Marmota marmota sp. 04.jpg', 'Bernie', 'Public domain', '']
  ];

  /* ---------- national data ---------- */
  var PROV = [
    { id: 'sunning', ph: 'mn-p-rocks.jpg', name: 'Sunning Rocks Capital District', cap: 'Burrowburg', pop: '4,112 burrows', grass: 'Alpine meadow-grass', note: 'Seat of government. The Great Rock, from which the Chairman addresses the nation each morning, lies at the centre of the district. Basking is permitted on all public rocks between 10:00 and 15:00.', d: 'M150 92 L188 80 L214 104 L196 136 L156 132 Z', lx: 182, ly: 110 },
    { id: 'upper', ph: 'mn-p-meadow.jpg', name: 'Upper Meadow', cap: 'Clovergate', pop: '9,850 burrows', grass: 'Red clover, sweet vernal grass', note: 'The breadbasket of the nation. Upper Meadow produces most of the national grass supply and has the highest burrow density on the plateau.', d: 'M70 50 L150 40 L188 80 L150 92 L96 96 Z', lx: 128, ly: 70 },
    { id: 'scree', ph: 'mn-p-raetikon.jpg', name: 'Scree Basin', cap: 'Loosestone', pop: '2,430 burrows', grass: 'Fescue (sparse)', note: 'Loose ground makes tunnelling difficult. The Ministry of Underground Works maintains a permanent engineering corps here. Residents are noted for their resilience and their complaints.', d: 'M20 110 L70 50 L96 96 L84 150 L30 160 Z', lx: 58, ly: 118 },
    { id: 'talus', ph: 'mn-p-sentry.jpg', name: 'Talus Heights', cap: 'High Sentry', pop: '1,960 burrows', grass: 'Cushion plants, lichen', note: 'The highest inhabited province and home of the Sentry Corps academy. Eagle sightings are most frequent here. All residents are trained in the national whistle.', d: 'M150 40 L232 26 L262 70 L214 104 L188 80 Z', lx: 214, ly: 58 },
    { id: 'glacier', ph: 'mn-p-profile.jpg', name: 'Glacier March', cap: 'Meltwater', pop: '640 burrows', grass: 'Seasonal (snowmelt edges)', note: 'A frontier province on the retreating glacier. Each summer it grows by a few metres of newly exposed ground, which the Front formally annexes by ceremonial whistle.', d: 'M232 26 L300 20 L300 96 L262 70 Z', lx: 276, ly: 52 },
    { id: 'cable', ph: 'mn-p-pair.jpg', name: 'Cable Car Corridor', cap: 'Pylon Nine', pop: '1,205 burrows', grass: 'Ski-run regrowth', note: 'A strip of territory beneath the mountain cable car. Its status is the subject of the current referendum. Residents report that the gondolas pass overhead every eleven minutes.', d: 'M214 104 L262 70 L300 96 L300 140 L250 150 L196 136 Z', lx: 252, ly: 116 },
    { id: 'lower', ph: 'mn-p-clover.jpg', name: 'Lower Pasture (disputed)', cap: 'Contested', pop: 'Under review', grass: 'Cattle pasture', note: 'Claimed by the Front, grazed by cattle and visited by groundhog delegations from the lowlands. The Front regards the cows as cordial neighbours and the groundhogs as a diplomatic question.', d: 'M84 150 L96 96 L150 92 L156 132 L196 136 L250 150 L240 176 L60 176 L30 160 Z', lx: 150, ly: 160 }
  ];
  var QS = [
    { id: 'q1', q: 'Should additional alpine burrows receive national infrastructure funding?', opts: ['Yes', 'No'] },
    { id: 'q2', q: 'Should marmots control all mountain cable cars?', opts: ['Yes', 'No', 'Only the ones going up'] },
    { id: 'q3', q: 'Should the government establish a Ministry of Grass?', opts: ['Yes', 'No', 'It should be a Super-Ministry'] },
    { id: 'q4', q: 'Which marmot should become the next ceremonial chairman?', ph: ['mn-sq-pemba.jpg', 'mn-sq-gustav.jpg', 'mn-sq-clover.jpg', 'mn-sq-rock.jpg'], opts: ['Chairman Pemba Whistlewood (incumbent)', 'Old Gustav of Scree Basin', 'Clover Brightfur', 'A large, dignified rock'] }
  ];

  function hibernating(d) { d = d || new Date(); var m = d.getMonth() + 1, day = d.getDate(); return (m > 10 || (m === 10 && day >= 15)) || (m < 4 || (m === 4 && day < 15)); }
  function thaw() { var d = new Date(), y = d.getFullYear(), t = new Date(y, 3, 15); if (d >= t) t = new Date(y + 1, 3, 15); return Math.ceil((t - d) / 86400000); }
  function alert() {
    var h = Math.floor(Date.now() / 3600000), L = [['GREEN', 'Airspace clear. Basking permitted.', '#2f5a2e'], ['AMBER', 'Eagle reported over Talus Heights. Remain near your burrow.', '#b8892a'], ['GREEN', 'Hikers sighted with sandwiches. Maintain dignity.', '#2f5a2e'], ['BLUE', 'Cloud cover. Sentries may sit.', '#1d4f8a'], ['AMBER', 'Fox activity in Lower Pasture. Whistle discipline in effect.', '#b8892a'], ['GREEN', 'Grass conditions excellent.', '#2f5a2e']];
    if (hibernating()) return ['WHITE', 'National hibernation. The airspace is not being watched.', '#5a6a7a'];
    return L[h % L.length];
  }

  function frame(ctx, on, main) {
    function nv(p, label) { return '<a href="#" data-go="marmotnationalism.ou' + p + '"' + (on === p ? ' class="on"' : '') + '>' + label + '</a>'; }
    var a = alert(), visits = ctx.store.get('visits', 0);
    return '<div class="mn-pg"><div class="mn-gov"><span>OFFICIAL WEBSITE OF THE NATIONAL MARMOT FRONT</span><span>' + GN.link('directory.ou/category/government', 'GamiNet Government Directory') + '</span></div>' +
      '<div class="mn-head"><img class="mn-hph" src="' + P('mn-header.jpg') + '" alt="">' + flag(90) + '<a href="#" data-go="marmotnationalism.ou" class="mn-title"><b>National Marmot Front</b><i>ONE BURROW. ONE PEOPLE. ONE FUTURE.</i></a></div>' +
      (hibernating() ? '<div class="mn-hib">❄ NATIONAL HIBERNATION IN EFFECT ❄ Government business is suspended until the Spring Emergence (' + thaw() + ' days). This website is maintained by the Ministry of Wakefulness.</div>' : '') +
      '<table class="mn-lay"><tr><td class="mn-nav">' + nv('', 'Headquarters') + nv('/chairman', 'The Chairman') + nv('/platform', 'Party Platform') + nv('/territory', 'National Territory') + nv('/bulletins', 'Bulletins') + nv('/symbols', 'National Symbols') + nv('/foreign-relations', 'Foreign Relations') + nv('/referendum', 'Referendum') + nv('/join', 'Join the Movement') +
      '<div class="mn-box"><h4>National Alert Level</h4><b style="color:' + a[2] + '">' + a[0] + '</b><br>' + a[1] + '</div>' +
      '<div class="mn-box"><h4>Spring Emergence</h4>' + (hibernating() ? 'In <b>' + thaw() + '</b> days. Do not disturb.' : 'The nation is awake. Next hibernation from 15 October.') + '</div>' +
      '<div class="mn-box" style="text-align:center"><h4>Official Visitor</h4><span class="mn-count">' + ('000000' + visits).slice(-6) + '</span><br><span style="font-size:9px">on this computer</span></div></td>' +
      '<td class="mn-main">' + main + '</td></tr></table>' +
      '<div class="mn-foot">© National Marmot Front, Ministry of Information and Whistling. All rights reserved, all burrows protected.<br>This is a work of satire about fictional marmots. It depicts no real party, movement, nation or person. Listed in the ' + GN.link('directory.ou', 'GamiNet Directory') + '. ' + GN.link('marmotnationalism.ou/credits', 'Photograph credits') + '.</div></div>';
  }

  /* ---------- audio: whistle + anthem (generated, never automatic) ---------- */
  var AC = null;
  function ac() { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; } catch (e) { return null; } }
  function muted() { return window.ULTRA98 && ULTRA98.muted; }
  function whistle(times) {
    var a = ac(); if (!a || muted()) return false;
    for (var i = 0; i < times; i++) {
      var t = a.currentTime + i * 0.32, o = a.createOscillator(), g = a.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(3100, t); o.frequency.exponentialRampToValueAtTime(2200, t + 0.18);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.25);
    }
    return true;
  }
  var ANTHEM = [[67, 1], [72, 1.5], [72, .5], [74, 1], [76, 1], [72, 2], [76, 1], [77, 1], [79, 2], [79, 1], [77, .5], [76, .5], [74, 1], [72, 1], [74, 3], [0, 1], [67, 1], [72, 1.5], [72, .5], [74, 1], [76, 1], [77, 2], [76, 1], [74, 1], [72, 1], [74, 1], [71, 1], [67, 1], [72, 4]];
  var anthemStop = null;
  function anthem(onEnd) {
    var a = ac(); if (!a || muted()) return false;
    var t = a.currentTime + 0.05, beat = 0.42, nodes = [];
    ANTHEM.forEach(function (n) {
      if (n[0]) { var o = a.createOscillator(), g = a.createGain(), f = 440 * Math.pow(2, (n[0] - 69) / 12); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.03); g.gain.setValueAtTime(0.18, t + n[1] * beat * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] * beat); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + n[1] * beat + 0.02); nodes.push(o); }
      t += n[1] * beat;
    });
    var tm = setTimeout(function () { anthemStop = null; onEnd && onEnd(); }, (t - a.currentTime) * 1000);
    anthemStop = function () { clearTimeout(tm); nodes.forEach(function (o) { try { o.stop(); } catch (e) {} }); anthemStop = null; };
    return true;
  }

  /* ---------- pages ---------- */
  var BULLETINS = [
    { no: 'Bulletin No. 118', date: '15 October', t: 'Proclamation of National Hibernation', b: 'By order of the Chairman, the nation will enter hibernation at dusk. All ministries will close. Citizens are reminded to block burrow entrances with grass and soil in the approved manner. The Ministry of Wakefulness will maintain this website and the Sentry Corps will maintain nothing.', ph: 'mn-p-belly.jpg', cap: 'The Chairman completes final preparations for hibernation.' },
    { no: 'Bulletin No. 117', date: '2 October', t: 'Government Awards Alpine Hydration Contract', b: 'The Ministry of Underground Works has awarded a contract for alpine hydration infrastructure to ULTRAWATER Civic Systems. The programme will install meltwater refill points at the mouths of principal burrows in Upper Meadow and Talus Heights. Details are available from the contractor at ' + '<a href="#" data-go="ultrawater.ou/civic">ultrawater.ou/civic</a>. The Chairman described the agreement as “a historic day for water, and a reasonable day for marmots.”', id: 'hydration', ph: 'mn-p-meadow.jpg', cap: 'Upper Meadow, site of the first refill points.' },
    { no: 'Bulletin No. 116', date: '19 September', t: 'Clarification Regarding the Cable Car', b: 'Reports that the Front has seized the mountain cable car are premature. The Front has observed the cable car. A national referendum on the matter is now open on this website.', ph: 'mn-p-profile.jpg', cap: 'A Front observer observes the cable car.' },
    { no: 'Bulletin No. 115', date: '30 August', t: 'Grass Reserves at Record Level', b: 'The Ministry of Agriculture (Grass Division) reports that national grass reserves are at their highest level since records began. Records began this year.', ph: 'mn-p-carrot.jpg', cap: 'A citizen inspects the national reserves. (Not grass.)' },
    { no: 'Bulletin No. 114', date: '12 August', t: 'Statement on the Eagle Question', b: 'The Front reiterates that it seeks no conflict with the eagles. It asks only that the eagles stop eating marmots. Negotiations have not begun because the eagles have not replied.', ph: 'mn-p-sentry.jpg', cap: 'Sentry duty, Talus Heights.' },
    { no: 'Bulletin No. 113', date: '28 July', t: 'New Burrow Entrances Approved', b: 'Forty-one new burrow entrances have been approved in Scree Basin. Residents are asked to dig them themselves.', ph: 'mn-p-burrow.jpg', cap: 'A new entrance under inspection, Scree Basin.' }
  ];
  function hq(ctx) {
    var main = '<h1>Official Headquarters</h1>' +
      '<div class="mn-two"><div><p><b>Welcome, citizen.</b> You have reached the official website of the National Marmot Front, the sole and legitimate representative of the marmot people of the high plateau, its burrows, its meadows and its rocks.</p>' +
      '<p>The Front stands for burrow sovereignty, protected alpine meadows, a modern underground infrastructure and unlimited access to grass and other suitable food. We are a peaceful movement. Our only weapon is the whistle.</p>' +
      '<p>' + GN.link('marmotnationalism.ou/join', 'Join the movement') + ' · ' + GN.link('marmotnationalism.ou/referendum', 'Vote in the national referendum') + ' · ' + GN.link('marmotnationalism.ou/territory', 'View the national territory') + '</p></div>' +
      '<div style="flex:0 1 160px;text-align:center">' + seal(140) + '</div></div>' +
      '<div class="mn-motto">ONE BURROW. ONE PEOPLE. ONE FUTURE.</div>' +
      '<h2>Message from the Chairman</h2>' + photo('mn-standing.jpg', 'The Chairman addresses the nation from the Great Rock.', 's') + '<p>“Marmots of the plateau. For a thousand summers we have sat upright on our rocks and watched the sky for the nation. Now the nation watches back. This year we have dug more, eaten more and whistled more than in any year in our history. When the snow comes we will sleep, as our ancestors slept, knowing that the burrow is secure. Then, in spring, we will wake, and we will be slightly thinner, and we will begin again.”</p><p style="text-align:right">— ' + GN.link('marmotnationalism.ou/chairman', 'Chairman Pemba Whistlewood') + '</p><div class="mn-clear"></div>' +
      '<h2>Latest Government Bulletins</h2>' + BULLETINS.slice(0, 3).map(function (b) { return '<div class="mn-bul">' + (b.ph ? photo(b.ph, b.cap, 's') : '') + '<div class="no">' + b.no + ' · ' + b.date + '</div><h3>' + b.t + '</h3><div>' + b.b + '</div></div>'; }).join('') + '<p>' + GN.link('marmotnationalism.ou/bulletins', 'All bulletins »') + '</p>' +
      '<h2>Information Campaign</h2><div class="mn-posters">' + POSTERS() + '</div>';
    ctx.html(frame(ctx, '', main));
    ctx.title('National Marmot Front — Official Headquarters');
  }
  function chairman(ctx) {
    var main = '<h1>The Chairman</h1><div class="mn-two"><div class="mn-portrait"><img src="' + P('mn-chairman.jpg') + '" alt="Official portrait of the Chairman" width="480" height="600"><div style="margin-top:5px">OFFICIAL PORTRAIT<br>His Excellency Pemba Whistlewood</div></div>' +
      '<div><h2 style="margin-top:0">His Excellency Pemba Whistlewood</h2><p><i>Chairman of the National Marmot Front, Keeper of the Great Rock, First Sentry of the Plateau.</i></p>' +
      '<table class="mn-t"><tr><th colspan="2">Official Biography</th></tr><tr><td>Born</td><td>Upper Meadow, during an unusually warm spring</td></tr><tr><td>Burrow</td><td>Main Burrow, Sunning Rocks Capital District</td></tr><tr><td>Education</td><td>Sentry Corps Academy, Talus Heights (graduated with whistle)</td></tr><tr><td>Weight</td><td>Varies seasonally (classified)</td></tr><tr><td>Hibernation record</td><td>7 months, 4 days (national record)</td></tr><tr><td>Favourite grass</td><td>Red clover</td></tr></table></div></div>' +
      '<h2>Career</h2><p>Chairman Whistlewood first came to national attention as a junior sentry in Talus Heights, where he whistled continuously for eleven minutes during the Great Eagle Overflight and is credited with clearing an entire hillside. He entered public life soon afterwards and was raised to the chairmanship by acclamation, after the previous chairman failed to emerge one spring.</p>' +
      '<p>His administration is known for the Grass Access Act, the expansion of the underground network in Scree Basin, the alpine hydration programme and the first formal claim to the Cable Car Corridor. His speeches from the Great Rock are delivered each morning at 09:00 in the warm season, weather permitting.</p>' +
      '<h2>Official Photographs</h2><div class="mn-gal">' + photo('mn-p-burrow.jpg', 'At the Main Burrow, Sunning Rocks.') + photo('mn-p-sentry.jpg', 'Sentry Corps service, Talus Heights.') + photo('mn-p-belly.jpg', 'Reviewing the hibernation schedule.') + '</div>' +
      '<h2>Selected Sayings</h2><ul><li>“A marmot who is not digging is a marmot who is thinking about digging.”</li><li>“The sky belongs to the eagles. The ground belongs to us. The cable car is under discussion.”</li><li>“Eat now. Explain later.”</li></ul>' +
      '<p class="mn-warn">The Chairman is a ceremonial office. His successor may be chosen in the ' + GN.link('marmotnationalism.ou/referendum', 'national referendum') + '.</p>';
    ctx.html(frame(ctx, '/chairman', main));
    ctx.title('National Marmot Front — The Chairman');
  }
  function platform(ctx) {
    var A = [['Burrow Sovereignty', 'Every burrow is sovereign territory of the marmot people. No burrow may be filled in, built over or used for storage by any other species.'], ['The Grass Access Act', 'Every citizen shall have unlimited access to grass, herbs, flowers, roots and other suitable food within walking distance of the burrow, without queueing.'], ['Hibernation Rights', 'Every citizen has the right to hibernate undisturbed from mid-October to mid-April. Hikers, ski resorts and avalanche controllers will be asked to keep the noise down.'], ['Underground Infrastructure', 'The Front will connect every province by tunnel within one generation, beginning with the provinces that are easiest to dig.'], ['The National Sentry Network', 'A sentry shall be posted on every prominent rock between dawn and dusk. Sentries are entitled to sit when cloud cover exceeds seventy per cent.'], ['Defence', 'The defence policy of the Front is entirely defensive and consists of whistling and running into holes. The Front has no plans to change this policy.'], ['Water', 'Every burrow shall have access to clean meltwater. See the alpine hydration contract in the ' + GN.link('marmotnationalism.ou/bulletins', 'bulletins') + '.'], ['Tourism', 'Visitors are welcome to photograph marmots from a respectful distance. Offerings of trail mix are appreciated but not required, and are not legally a tax.']];
    var main = '<h1>Party Platform</h1><p>The Platform of the National Marmot Front was adopted by acclamation at the First Congress of the Burrows, held on the Great Rock during the first thaw. It is reaffirmed every spring by whoever wakes up first.</p>' +
      A.map(function (a, i) { return '<h2>Article ' + ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][i] + ' · ' + a[0] + '</h2><p>' + a[1] + '</p>'; }).join('') + '<div class="mn-motto">ONE BURROW. ONE PEOPLE. ONE FUTURE.</div>';
    ctx.html(frame(ctx, '/platform', main));
    ctx.title('National Marmot Front — Party Platform');
  }
  function territory(ctx) {
    var cur = ctx.query.p || 'sunning';
    var svg = '<svg viewBox="0 0 300 180" role="group" aria-label="Map of the national territory"><rect width="300" height="180" fill="#cfe6f2"/>' +
      PROV.map(function (p) { return '<g data-prov="' + p.id + '" tabindex="0" role="button" aria-label="' + p.name + '"><path d="' + p.d + '" fill="' + ({ sunning: '#e9d690', upper: '#a9d08a', scree: '#c8c0a8', talus: '#d8dde0', glacier: '#f2f8fb', cable: '#b9d8a0', lower: '#9cc47a' })[p.id] + '"/></g>'; }).join('') +
      '<g pointer-events="none" font-family="Arial" font-size="7" font-weight="bold" fill="#1c3a1e" text-anchor="middle">' + PROV.map(function (p) { return '<text x="' + p.lx + '" y="' + p.ly + '">' + p.name.split(' ')[0].toUpperCase() + '</text>'; }).join('') + '</g>' +
      '<g pointer-events="none"><path d="M216 112 L300 44" stroke="#333" stroke-width="1" stroke-dasharray="3 2"/><rect x="246" y="78" width="7" height="5" fill="#7a1f1f"/><path d="M178 104 l4 -8 l4 8 z" fill="#7a1f1f"/><text x="182" y="127" font-family="Arial" font-size="5.5" text-anchor="middle" fill="#7a1f1f">★ BURROWBURG</text></g>' +
      '<g transform="translate(16 18)" font-family="Arial" font-size="7" fill="#1c3a1e"><path d="M0 8 l4 -8 l4 8 M4 0 v14" stroke="#1c3a1e" fill="none"/><text x="1" y="22">N</text></g></svg>';
    var main = '<h1>National Territory</h1><p>The national territory of the marmot people comprises seven provinces on the high plateau. Select a province on the map for official information.</p>' +
      '<div class="mn-map">' + svg + '<div class="mn-pinfo" aria-live="polite"></div></div>' +
      '<p style="font:10px Arial;color:#555">Dashed line: the mountain cable car (status under referendum). Borders shown are those claimed by the Front and are not recognised by eagles.</p>';
    ctx.html(frame(ctx, '/territory', main));
    var info = ctx.root.querySelector('.mn-pinfo');
    function show(id) {
      var p = PROV.filter(function (x) { return x.id === id; })[0] || PROV[0];
      ctx.root.querySelectorAll('[data-prov]').forEach(function (g) { g.classList.toggle('on', g.dataset.prov === p.id); });
      info.innerHTML = '<img class="mn-pimg" src="' + P(p.ph) + '" alt="Official photograph: ' + p.name + '"><h3>' + p.name + '</h3><table class="mn-t"><tr><td><b>Capital</b></td><td>' + p.cap + '</td></tr><tr><td><b>Population</b></td><td>' + p.pop + '</td></tr><tr><td><b>Principal grass</b></td><td>' + p.grass + '</td></tr></table><p>' + p.note + '</p>' + (p.id === 'cable' ? '<p>' + GN.link('marmotnationalism.ou/referendum', 'Vote on the cable car question »') + '</p>' : '');
      ctx.status(p.name);
    }
    ctx.root.querySelectorAll('[data-prov]').forEach(function (g) {
      g.addEventListener('click', function () { show(g.dataset.prov); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(g.dataset.prov); } });
    });
    show(cur);
    ctx.title('National Marmot Front — National Territory');
  }
  function bulletins(ctx) {
    var main = '<h1>Government Bulletins</h1><p>Official announcements of the National Marmot Front and its ministries, in order of issue. Bulletins are read aloud from the Great Rock and posted here for citizens who were underground at the time.</p>' +
      BULLETINS.map(function (b) { return '<div class="mn-bul"' + (b.id ? ' id="mn-' + b.id + '"' : '') + '>' + (b.ph ? photo(b.ph, b.cap) : '') + '<div class="no">' + b.no + ' · ' + b.date + '</div><h3>' + b.t + '</h3><div>' + b.b + '</div></div>'; }).join('') +
      '<p style="font:10px Arial;color:#555">Earlier bulletins were not written down.</p>';
    ctx.html(frame(ctx, '/bulletins', main));
    ctx.title('National Marmot Front — Government Bulletins');
  }
  function symbols(ctx) {
    var main = '<h1>National Symbols</h1>' +
      '<h2>The National Flag</h2><div class="mn-two"><div style="flex:0 0 190px">' + flag(180).replace('class="mn-flag"', 'class="mn-flag" style="border:1px solid #1c3a1e"') + '</div><div><p>Three bands: <b>sky blue</b> for the watched sky, <b>white</b> for the snow that shelters the burrows in winter, and <b>green</b> for the meadow. At the centre, a golden sun bears the likeness of the Chairman standing sentry.</p><p>The flag is raised at emergence and lowered at hibernation. It is not raised at all on cloudy days, out of respect.</p></div></div>' +
      '<h2>The National Seal</h2><div class="mn-two"><div style="flex:0 0 150px">' + seal(140) + '</div><div><p>The seal bears the motto of the Front around an engraved likeness of the Chairman. It is applied to all bulletins, contracts and membership cards, using a stamp made of pressed clay and enthusiasm.</p></div></div>' +
      '<h2>The National Anthem: “Rise, Upon the Rock”</h2><div class="mn-lyr">Rise, upon the rock, O marmot,<br>Face the sun and face the sky,<br>Grass beneath and stone behind us,<br>Hold the burrow, standing high.<br><br>When the eagle’s shadow passes,<br>Sound the whistle, clear and true,<br>One burrow, one people,<br>One future, under you.<br><br>When the snow comes, close the doorway,<br>Sleep the long and patient sleep,<br>Spring will find the nation waiting,<br>Thinner, but the faith we keep.</div>' +
      '<p style="margin-top:6px"><button type="button" class="mn-btn mn-play">▶ Play the anthem</button> <span class="mn-astat" style="font:10px Arial;color:#555"></span></p>' +
      '<h2>The National Whistle</h2><p>The whistle is the voice of the nation. Sentries give a single whistle for danger from the air and a series of whistles for danger on the ground. Citizens hearing either should go underground at once and ask questions later.</p>' +
      '<p><button type="button" class="mn-btn red mn-w1">Single whistle (eagle)</button> <button type="button" class="mn-btn red mn-w2">Series (fox)</button> <span class="mn-wstat" style="font:10px Arial;color:#555"></span></p>' +
      '<h2>Other Symbols</h2><table class="mn-t"><tr><th>Symbol</th><th>Official designation</th></tr><tr><td>National flower</td><td>Alpine aster</td></tr><tr><td>National food</td><td>Grass (all varieties)</td></tr><tr><td>National rock</td><td>The Great Rock, Burrowburg</td></tr><tr><td>National holiday</td><td>Emergence Day, 15 April</td></tr><tr><td>National colour</td><td>Meadow green, when available</td></tr></table>';
    ctx.html(frame(ctx, '/symbols', main));
    var R = ctx.root, play = R.querySelector('.mn-play'), as = R.querySelector('.mn-astat'), ws = R.querySelector('.mn-wstat');
    function noSound(el) { el.textContent = muted() ? 'Sound is muted in Funtazia.' : 'Sound is not available in this browser.'; }
    play.addEventListener('click', function () {
      if (anthemStop) { anthemStop(); play.textContent = '▶ Play the anthem'; as.textContent = ''; return; }
      if (anthem(function () { play.textContent = '▶ Play the anthem'; as.textContent = ''; })) { play.textContent = '■ Stop'; as.textContent = 'Citizens are requested to stand on their hind legs.'; } else noSound(as);
    });
    R.querySelector('.mn-w1').addEventListener('click', function () { if (whistle(1)) ws.textContent = 'Eagle warning issued.'; else noSound(ws); });
    R.querySelector('.mn-w2').addEventListener('click', function () { if (whistle(4)) ws.textContent = 'Ground predator warning issued.'; else noSound(ws); });
    ctx.onLeave(function () { if (anthemStop) anthemStop(); });
    ctx.title('National Marmot Front — National Symbols');
  }
  function foreign(ctx) {
    var N = [['Pika Confederation', 'Allied', 'Bound by the Hay Pact. The pikas store hay, the marmots store fat, and neither interferes with the other’s method.'], ['Golden Eagles', 'Hostile', 'No diplomatic relations. See Bulletin No. 114.'], ['Red Foxes', 'Hostile', 'Ground incursions are answered by the whistle series.'], ['Alpine Ibex', 'Neutral', 'The ibex hold the cliffs and show no interest in the meadow. Relations are distant but civil.'], ['Grazing Cattle', 'Cordial', 'Summer neighbours in Lower Pasture. They eat a great deal of grass, which is noted.'], ['Ski Resorts', 'Tense', 'The cable car question remains open. A referendum is under way.'], ['Hikers', 'Tolerated', 'Hikers are permitted on marked trails. Sandwiches are monitored.'], ['Ravens', 'Under observation', 'The ravens appear to be watching the sentries watching the sky.'], ['Lowland Groundhog States', 'Disputed', 'The groundhogs claim to forecast the spring. The Front holds that spring arrives when the Chairman wakes up.'], ['Mountain Rescue Dogs', 'Friendly', 'Humanitarian partners. Their barrels are not believed to contain grass.']];
    var col = { Allied: '#2f5a2e', Hostile: '#7a1f1f', Neutral: '#555', Cordial: '#2f5a2e', Tense: '#b8892a', Tolerated: '#1d4f8a', 'Under observation': '#b8892a', Disputed: '#b8892a', Friendly: '#2f5a2e' };
    var main = '<h1>Foreign Relations</h1>' + photo('mn-p-diplomacy.jpg', 'The Minister of External Burrows receives a delegation.') + '<p>The Front conducts foreign relations through the Ministry of External Burrows. Its guiding principle is that every species is welcome to remain exactly where it is, provided that is not in a burrow.</p><div class="mn-clear"></div>' +
      '<table class="mn-t"><tr><th>Nation / species</th><th>Status</th><th>Notes</th></tr>' + N.map(function (n) { return '<tr><td><b>' + n[0] + '</b></td><td style="color:' + col[n[1]] + ';font-weight:bold">' + n[1] + '</td><td>' + n[2] + '</td></tr>'; }).join('') + '</table>' +
      '<h2>Commercial Relations</h2><p>The Front maintains one foreign commercial contract: alpine hydration infrastructure, awarded to ' + GN.link('ultrawater.ou/civic', 'ULTRAWATER Civic Systems') + '. See ' + GN.link('marmotnationalism.ou/bulletins', 'Bulletin No. 117') + '.</p>';
    ctx.html(frame(ctx, '/foreign-relations', main));
    ctx.title('National Marmot Front — Foreign Relations');
  }
  var PICKS = [['mn-sq-meadow.jpg', 'Alert'], ['mn-sq-clover.jpg', 'Golden'], ['mn-sq-gustav.jpg', 'Distinguished'], ['mn-sq-pemba.jpg', 'Upright']];
  function cardHTML(ctx, m) {
    var ph = PICKS.filter(function (p) { return p[0] === m.ph; }).length ? m.ph : PICKS[0][0];
    return '<div class="mn-card"><div class="top"><span>NATIONAL MARMOT FRONT</span><span>MEMBER</span></div><div class="bd"><img src="' + P(ph) + '" alt="Member photograph"><dl>' +
      '<dt>Name</dt><dd>' + ctx.esc(m.name) + '</dd><dt>Burrow</dt><dd>' + ctx.esc(m.prov) + '</dd><dt>Grass</dt><dd>' + ctx.esc(m.grass) + '</dd><dt>Member No.</dt><dd>' + m.no + '</dd><dt>Issued</dt><dd>' + ctx.esc(m.date) + '</dd><dt>Valid</dt><dd>Until next thaw</dd></dl></div><div class="ft">ONE BURROW \u00B7 ONE PEOPLE \u00B7 ONE FUTURE</div></div>';
  }
  function join(ctx) {
    var m = ctx.store.get('member', null);
    var main = '<h1>Join the Movement</h1>' + (m ? '<p>Welcome back, comrade. Your membership card is below.</p>' + cardHTML(ctx, m) +
      '<p><button type="button" class="mn-btn mn-save">Save card as picture</button> <button type="button" class="mn-btn red mn-revoke">Resign membership</button></p><p style="font:10px Arial;color:#555">Your card is kept on this computer only. Nothing is sent anywhere.</p>'
      : '<p>Membership of the National Marmot Front is open to all marmots, all friends of marmots, and all persons who have ever looked at a marmot and felt something. Complete the form to receive your official membership card.</p>' +
      '<form class="mn-form"><label for="mn-n">Name</label><input type="text" id="mn-n" maxlength="28" required placeholder="e.g. Clover Brightfur">' +
      '<label for="mn-p">Province of burrow</label><select id="mn-p">' + PROV.map(function (p) { return '<option>' + p.name.replace(' (disputed)', '') + '</option>'; }).join('') + '</select>' +
      '<label for="mn-g">Preferred grass</label><select id="mn-g"><option>Red clover</option><option>Alpine meadow-grass</option><option>Sweet vernal grass</option><option>Fescue</option><option>Dandelion (technically not grass)</option></select>' +
      '<label>Card photograph</label><div class="mn-picks">' + PICKS.map(function (p, i) { return '<label><img src="' + P(p[0]) + '" alt="">' + p[1] + '<input type="radio" name="mnph" value="' + p[0] + '"' + (i ? '' : ' checked') + '></label>'; }).join('') + '</div>' +
      '<label style="text-transform:none;letter-spacing:0;font-weight:normal;margin-top:8px"><input type="checkbox" id="mn-o" required> I pledge to watch the sky, guard the burrow and whistle when necessary.</label>' +
      '<p style="margin-top:8px"><button type="submit" class="mn-btn">Issue my card</button></p></form><p style="font:10px Arial;color:#555">Your card is kept on this computer only. Nothing is sent anywhere.</p>');
    ctx.html(frame(ctx, '/join', main));
    var R = ctx.root, form = R.querySelector('form.mn-form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault(); var n = R.querySelector('#mn-n').value.trim(); if (!n) return;
      var d = new Date(), mo = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      ctx.store.set('member', { name: n.slice(0, 28), prov: R.querySelector('#mn-p').value, grass: R.querySelector('#mn-g').value, ph: (R.querySelector('input[name=mnph]:checked') || {}).value || PICKS[0][0], no: 'NMF-' + String(100000 + Math.floor(Math.random() * 900000)), date: d.getDate() + ' ' + mo[d.getMonth()] + ' ' + d.getFullYear() });
      ctx.status('Membership card issued.'); join(ctx);
    });
    var rv = R.querySelector('.mn-revoke');
    if (rv) rv.addEventListener('click', function () { ctx.store.set('member', null); join(ctx); });
    var sv = R.querySelector('.mn-save');
    if (sv) sv.addEventListener('click', function () { saveCard(m, sv); });
    ctx.title('National Marmot Front — Join the Movement');
  }
  function saveCard(m, btn) {
    var W = 660, H = 360, c = document.createElement('canvas'); c.width = W; c.height = H; var x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#fffbe8'); g.addColorStop(1, '#f3e3a6'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#1c3a1e'; x.lineWidth = 6; x.strokeRect(3, 3, W - 6, H - 6);
    x.fillStyle = '#2f5a2e'; x.fillRect(6, 6, W - 12, 44); x.fillStyle = '#f3e3a6'; x.font = 'bold 20px Arial'; x.textBaseline = 'middle'; x.fillText('NATIONAL MARMOT FRONT', 20, 28); x.textAlign = 'right'; x.fillText('MEMBER', W - 20, 28); x.textAlign = 'left';
    x.fillStyle = '#7a1f1f'; x.fillRect(6, H - 40, W - 12, 34); x.fillStyle = '#fff'; x.font = 'bold 16px Arial'; x.textAlign = 'center'; x.fillText('ONE BURROW · ONE PEOPLE · ONE FUTURE', W / 2, H - 23); x.textAlign = 'left';
    var rows = [['NAME', m.name], ['BURROW', m.prov], ['GRASS', m.grass], ['MEMBER NO.', m.no], ['ISSUED', m.date], ['VALID', 'Until next thaw']];
    rows.forEach(function (r, i) { var y = 80 + i * 40; x.fillStyle = '#7a1f1f'; x.font = 'bold 13px Arial'; x.fillText(r[0], 190, y); x.fillStyle = '#1e2a1a'; x.font = 'bold 20px Arial'; x.fillText(String(r[1]).slice(0, 30), 300, y); });
    var img = new Image(), ph = PICKS.filter(function (p) { return p[0] === m.ph; }).length ? m.ph : PICKS[0][0];
    img.onload = function () {
      var bw = 140, bh = 168, sc = Math.max(bw / img.width, bh / img.height), sw = bw / sc, sh = bh / sc;
      x.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 26, 64, bw, bh); x.strokeStyle = '#1c3a1e'; x.lineWidth = 2; x.strokeRect(26, 64, bw, bh);
      var a = document.createElement('a'); a.download = 'marmot-membership-' + m.no.toLowerCase() + '.png'; a.href = c.toDataURL('image/png'); document.body.appendChild(a); a.click(); a.remove();
    };
    img.src = P(ph);
  }
  function simulated(q) {
    var day = Math.floor(Date.now() / 86400000), seed = day * 31 + q.id.charCodeAt(1) * 7, w = q.opts.map(function (_, i) { seed = (seed * 9301 + 49297) % 233280; return 10 + seed / 233280 * 90 + (i === 0 ? 30 : 0); }), tot = w.reduce(function (a, b) { return a + b; }, 0);
    return w.map(function (v) { return Math.round(v / tot * 1000) / 10; });
  }
  function referendum(ctx) {
    var tally = ctx.store.get('tally', {}), ballots = ctx.store.get('ballots', 0), done = ctx.query.voted === '1';
    function results() {
      return QS.map(function (q) {
        var t = tally[q.id] || {}, n = q.opts.reduce(function (a, _, i) { return a + (t[i] || 0); }, 0), sim = simulated(q);
        return '<h2 style="font-size:12px">' + q.q + '</h2><table class="mn-t mn-res"><tr><th>Option</th><th>This computer (' + n + ')</th><th>Simulated national result</th></tr>' + q.opts.map(function (o, i) { var p = n ? Math.round((t[i] || 0) / n * 100) : 0; return '<tr><td>' + o + '</td><td><div class="mn-bar"><i style="width:' + p + '%"></i></div>' + (t[i] || 0) + ' (' + p + '%)</td><td><div class="mn-bar sim"><i style="width:' + sim[i] + '%"></i></div>' + sim[i] + '%</td></tr>'; }).join('') + '</table>';
      }).join('');
    }
    var main = '<h1>National Referendum</h1>' +
      '<p>Citizens are invited to vote on four questions of national importance. Ballots are counted on this computer. The national figures are simulated by the Ministry of Information and Whistling for illustration and represent no real voters, marmot or otherwise.</p>' +
      (hibernating() ? '<p class="mn-warn">Turnout is expected to be low: most of the electorate is hibernating.</p>' : '') +
      (done ? '<p class="mn-warn"><b>Ballot received.</b> Thank you, citizen. Ballot No. ' + ('00000' + ballots).slice(-5) + ' has been counted on this computer.</p>' : '') +
      '<form class="mn-ballot">' + QS.map(function (q, qi) { return '<fieldset><legend>Question ' + (qi + 1) + '</legend><div style="margin-bottom:3px">' + q.q + '</div>' + (q.ph ? '<div class="mn-cands">' + q.opts.map(function (o, i) { return '<label><img src="' + P(q.ph[i]) + '" alt=""><input type="radio" name="' + q.id + '" value="' + i + '"> ' + o + '</label>'; }).join('') + '</div>' : q.opts.map(function (o, i) { return '<label><input type="radio" name="' + q.id + '" value="' + i + '"> ' + o + '</label>'; }).join('')) + '</fieldset>'; }).join('') +
      '<p><button type="submit" class="mn-btn">Cast ballot</button> <span class="mn-berr" style="font:11px Arial;color:#7a1f1f"></span></p></form>' +
      '<h1 style="font-size:16px;margin-top:16px">Results</h1><p style="font:10px Arial">Ballots cast on this computer: <b>' + ballots + '</b>. ' + (ballots ? '<a href="#" class="mn-clear">Clear local ballots</a>' : '') + '</p>' + results() +
      '<p class="mn-warn">SIMULATED NATIONAL RESULT: figures generated by this website and changed daily. They are not votes.</p>';
    ctx.html(frame(ctx, '/referendum', main));
    var R = ctx.root, form = R.querySelector('form.mn-ballot');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var picks = QS.map(function (q) { var c = form.querySelector('input[name=' + q.id + ']:checked'); return c ? +c.value : null; });
      if (picks.some(function (p) { return p === null; })) { R.querySelector('.mn-berr').textContent = 'Please answer every question. Abstention is not recognised by the Front.'; return; }
      QS.forEach(function (q, i) { tally[q.id] = tally[q.id] || {}; tally[q.id][picks[i]] = (tally[q.id][picks[i]] || 0) + 1; });
      ctx.store.set('tally', tally); ctx.store.set('ballots', ballots + 1);
      ctx.go('marmotnationalism.ou/referendum?voted=1');
    });
    var cl = R.querySelector('.mn-clear');
    if (cl) cl.addEventListener('click', function (e) { e.preventDefault(); ctx.store.set('tally', {}); ctx.store.set('ballots', 0); ctx.go('marmotnationalism.ou/referendum'); });
    ctx.title('National Marmot Front — National Referendum');
  }

  function credits(ctx) {
    var main = '<h1>Photograph Credits</h1><p>Photographs of citizens are reproduced from Wikimedia Commons under the licences shown. Images have been cropped and resized. The posters, the seal and the flag emblem are tinted adaptations and are released under the same licence as their source photograph.</p>' +
      '<table class="mn-t"><tr><th>Used for</th><th>Source photograph</th><th>Photographer</th><th>Licence</th></tr>' + CREDITS.map(function (c) { var page = 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(c[1].replace(/ /g, '_')); return '<tr><td>' + c[0] + '</td><td><a href="' + page + '" target="_blank" rel="noopener">' + ctx.esc(c[1]) + '</a></td><td>' + ctx.esc(c[2]) + '</td><td>' + (c[4] ? '<a href="' + c[4] + '" target="_blank" rel="noopener">' + c[3] + '</a>' : c[3]) + '</td></tr>'; }).join('') + '</table>' +
      '<p style="font:10px Arial;color:#555">The marmots photographed are real Alpine marmots. Their names, offices and opinions are fictional.</p>';
    ctx.html(frame(ctx, '/credits', main));
    ctx.title('National Marmot Front \u2014 Photograph Credits');
  }

  GN.site('marmotnationalism.ou', {
    name: 'marmotnationalism', title: 'National Marmot Front', css: CSS,
    icon: function (c) { c.fillStyle = '#8fc1e3'; c.fillRect(0, 0, 16, 5); c.fillStyle = '#fffdf4'; c.fillRect(0, 5, 16, 6); c.fillStyle = '#2f5a2e'; c.fillRect(0, 11, 16, 5); c.fillStyle = '#d4a72c'; c.beginPath(); c.arc(8, 8, 4.5, 0, 7); c.fill(); c.fillStyle = '#8a5a2b'; c.beginPath(); c.ellipse(8, 9, 2, 3, 0, 0, 7); c.fill(); c.beginPath(); c.arc(8, 5.6, 1.8, 0, 7); c.fill(); },
    render: function (ctx) {
      var p = ctx.path; IMG = ctx.img('');
      if (p === '/') ctx.store.set('visits', ctx.store.get('visits', 0) + 1);
      if (p === '/') return hq(ctx);
      if (p === '/chairman') return chairman(ctx);
      if (p === '/platform') return platform(ctx);
      if (p === '/territory') return territory(ctx);
      if (p === '/bulletins') return bulletins(ctx);
      if (p === '/symbols') return symbols(ctx);
      if (p === '/foreign-relations') return foreign(ctx);
      if (p === '/join') return join(ctx);
      if (p === '/referendum') return referendum(ctx);
      if (p === '/credits') return credits(ctx);
      ctx.notFound();
    }
  });
})();
