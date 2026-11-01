/* abandonedfutures.ou — Abandoned Futures: an archive of unrealized environments.
   Fictional institution; every record summarizes the published sources listed on its page. */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-abandonedfutures{background:#d9d5c7 url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%276%27 height=%276%27%3E%3Crect width=%276%27 height=%276%27 fill=%27%23d9d5c7%27/%3E%3Cpath d=%27M0 6L6 0%27 stroke=%27%23cfcabb%27/%3E%3C/svg%3E");color:#222;font:11px/1.55 Verdana,Geneva,sans-serif;padding:10px 6px}',
    '.gn-abandonedfutures a{color:#1a3a6a}.gn-abandonedfutures a:visited{color:#5a3a6a}.gn-abandonedfutures a:hover{color:#7a2a1a}',
    '.gn-abandonedfutures .af-pg{max-width:780px;margin:0 auto;background:#fbfaf5;border:1px solid #8a8577;box-shadow:2px 2px 0 #b5b0a0}',
    '.gn-abandonedfutures .af-top{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#2e3438;color:#e8e4d6;border-bottom:3px double #b5a77a}',
    '.gn-abandonedfutures .af-seal{flex:0 0 auto}',
    '.gn-abandonedfutures .af-name{font:normal 22px/1 Georgia,"Times New Roman",serif;letter-spacing:3px;font-variant:small-caps;color:#f4efe0;text-decoration:none}',
    '.gn-abandonedfutures .af-name small{display:block;font:italic 11px Georgia,serif;letter-spacing:.5px;color:#b5ad92;margin-top:4px;font-variant:normal}',
    '.gn-abandonedfutures .af-tq{margin-left:auto;display:flex;gap:3px}.gn-abandonedfutures .af-tq input{font:11px Verdana;width:150px;border:1px solid #111;padding:2px 3px}.gn-abandonedfutures .af-tq button{font:bold 10px Verdana;background:#b5a77a;border:1px outset #d9cfa8;padding:1px 6px;cursor:pointer}',
    '.gn-abandonedfutures .af-crumb{padding:3px 12px;background:#e9e5d8;border-bottom:1px solid #b5b0a0;font-size:10px;color:#555}',
    '.gn-abandonedfutures table.af-lay{width:100%;border-collapse:collapse}.gn-abandonedfutures td.af-nav{width:150px;vertical-align:top;background:#efece2;border-right:1px solid #c8c3b3;padding:10px 8px;font-size:10px}',
    '.gn-abandonedfutures td.af-main{vertical-align:top;padding:12px 16px 16px}',
    '.gn-abandonedfutures .af-nav b{display:block;font:bold 9px Verdana;letter-spacing:1.5px;color:#7a2a1a;margin:10px 0 3px;text-transform:uppercase}.gn-abandonedfutures .af-nav b:first-child{margin-top:0}',
    '.gn-abandonedfutures .af-nav a{display:block;padding:1px 0 1px 9px;text-indent:-9px;text-decoration:none}.gn-abandonedfutures .af-nav a:before{content:"\\203A  ";color:#999}.gn-abandonedfutures .af-nav a.on{font-weight:bold;color:#222}',
    '.gn-abandonedfutures h1{font:normal 20px/1.2 Georgia,serif;margin:0 0 2px;color:#111}.gn-abandonedfutures h1 small{display:block;font:11px Verdana;color:#666;margin-top:3px}',
    '.gn-abandonedfutures h2{font:bold 10px Verdana;letter-spacing:1.5px;text-transform:uppercase;color:#7a2a1a;border-bottom:1px solid #c8c3b3;padding-bottom:2px;margin:16px 0 6px}',
    '.gn-abandonedfutures p{margin:0 0 8px}',
    '.gn-abandonedfutures .af-st{display:inline-block;font:bold 9px Verdana;letter-spacing:1px;color:#fff;padding:1px 5px;border:1px solid rgba(0,0,0,.4);text-transform:uppercase;white-space:nowrap;vertical-align:1px}',
    '.gn-abandonedfutures .st-NC{background:#6a6a6a}.gn-abandonedfutures .st-PR{background:#a8741a}.gn-abandonedfutures .st-AB{background:#6e4a2e}.gn-abandonedfutures .st-DM{background:#8a1a1a}.gn-abandonedfutures .st-RA{background:#1a5a7a}.gn-abandonedfutures .st-PF{background:#3a6a3a}',
    '.gn-abandonedfutures table.af-t{width:100%;border-collapse:collapse;font-size:10px;margin:4px 0 8px}',
    '.gn-abandonedfutures .af-t th{background:#4a4f52;color:#f0ece0;text-align:left;font-weight:bold;padding:3px 5px;border:1px solid #333}.gn-abandonedfutures .af-t th a{color:#f0ece0}',
    '.gn-abandonedfutures .af-t td{padding:3px 5px;border:1px solid #c8c3b3;vertical-align:top}.gn-abandonedfutures .af-t tr:nth-child(even) td{background:#f3f0e6}',
    '.gn-abandonedfutures table.af-rec{width:100%;border-collapse:collapse;font-size:11px;margin:6px 0}',
    '.gn-abandonedfutures .af-rec th{width:130px;text-align:left;vertical-align:top;background:#e9e5d8;font:bold 9px Verdana;letter-spacing:1px;text-transform:uppercase;color:#555;padding:4px 6px;border:1px solid #c8c3b3}',
    '.gn-abandonedfutures .af-rec td{padding:4px 6px;border:1px solid #c8c3b3}',
    '.gn-abandonedfutures .af-fig{float:right;width:250px;max-width:46%;margin:0 0 8px 12px;border:1px solid #8a8577;background:#fff;padding:4px;font-size:9px;color:#555}',
    '.gn-abandonedfutures .af-fig svg{display:block;width:100%;height:auto;background:#fdfcf6}',
    '.gn-abandonedfutures .af-ph{border:1px dashed #a39e8e;background:repeating-linear-gradient(45deg,#f4f1e6 0 6px,#ece8da 6px 12px);color:#777;text-align:center;font-size:9px;padding:10px 4px;margin-top:4px}',
    '.gn-abandonedfutures ol.af-tl{list-style:none;margin:0;padding:0;border-left:2px solid #b5a77a}',
    '.gn-abandonedfutures .af-tl li{position:relative;padding:2px 0 4px 74px}.gn-abandonedfutures .af-tl li:before{content:"";position:absolute;left:-5px;top:7px;width:8px;height:8px;background:#fbfaf5;border:2px solid #7a2a1a;border-radius:50%}',
    '.gn-abandonedfutures .af-tl span{position:absolute;left:12px;top:2px;font:bold 10px Verdana;color:#7a2a1a}',
    '.gn-abandonedfutures ul.af-src{margin:0;padding-left:16px;font-size:10px}',
    '.gn-abandonedfutures .af-cite{font:10px "Courier New",monospace;background:#f3f0e6;border:1px solid #c8c3b3;padding:5px 7px;margin:4px 0}',
    '.gn-abandonedfutures .af-btn{font:bold 10px Verdana;background:#e9e5d8;border:2px outset #f6f3ea;padding:2px 8px;cursor:pointer;color:#222}.gn-abandonedfutures .af-btn:active{border-style:inset}',
    '.gn-abandonedfutures .af-today{border:1px solid #8a8577;background:#f6f3ea;padding:8px 10px;margin:6px 0 10px;overflow:hidden}',
    '.gn-abandonedfutures .af-today .lbl{font:bold 9px Verdana;letter-spacing:2px;color:#7a2a1a;text-transform:uppercase}',
    '.gn-abandonedfutures .af-today h3{font:normal 17px Georgia,serif;margin:2px 0 4px}',
    '.gn-abandonedfutures .af-today svg{float:left;width:110px;height:auto;margin:2px 10px 4px 0;border:1px solid #c8c3b3;background:#fff}',
    '.gn-abandonedfutures form.af-f{background:#efece2;border:1px solid #c8c3b3;padding:6px 8px;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:flex-end;font-size:10px}',
    '.gn-abandonedfutures form.af-f label{display:flex;flex-direction:column;gap:1px;font:bold 9px Verdana;letter-spacing:1px;text-transform:uppercase;color:#555}',
    '.gn-abandonedfutures form.af-f select,.gn-abandonedfutures form.af-f input{font:11px Verdana;max-width:170px}',
    '.gn-abandonedfutures .af-note{font-size:10px;color:#555;border-left:3px solid #b5a77a;padding:3px 8px;background:#f6f3ea;margin:8px 0}',
    '.gn-abandonedfutures .af-foot{padding:8px 12px;border-top:1px solid #b5b0a0;background:#e9e5d8;font-size:9px;color:#666;text-align:center}',
    '.gn-abandonedfutures .af-new{display:inline-block;font:bold 8px Verdana;color:#fff;background:#7a2a1a;padding:0 3px;margin-left:4px;vertical-align:2px;letter-spacing:1px}',
    '.gn-abandonedfutures .af-upd{font-size:10px;color:#555;background:#efece2;border:1px solid #c8c3b3;padding:3px 6px;margin:0 0 8px;display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between}',
    '.gn-abandonedfutures .af-log td:first-child{white-space:nowrap;font-family:"Courier New",monospace}',
    '.gn-abandonedfutures .af-kind{white-space:nowrap;display:inline-block;font:bold 8px Verdana;letter-spacing:1px;text-transform:uppercase;color:#fff;padding:0 3px}.gn-abandonedfutures .k-added{background:#3a6a3a}.gn-abandonedfutures .k-status{background:#a8741a}.gn-abandonedfutures .k-revised{background:#1a5a7a}.gn-abandonedfutures .k-opened{background:#555}',
    '.gn-abandonedfutures .af-wait{padding:30px 10px;text-align:center;color:#555;font:11px Verdana}.gn-abandonedfutures .af-wait b{display:block;font:normal 16px Georgia,serif;color:#222;margin-bottom:6px}',
    '.gn-abandonedfutures .af-clear{clear:both}',
    '@media (max-width:560px){.gn-abandonedfutures td.af-nav{display:none}.gn-abandonedfutures .af-fig{float:none;width:auto;max-width:none;margin:0 0 8px}.gn-abandonedfutures .af-tq{display:none}}'
  ].join('\n');

  var STATUS = [
    ['NC', 'Never Constructed', 'Designed, approved or begun, but never built to a usable state. Foundations, models and drawings may survive.'],
    ['PR', 'Partially Realized', 'Some components were built and are in use, but the announced whole never appeared.'],
    ['AB', 'Abandoned', 'Built and operated, then left without use or maintenance for an extended period.'],
    ['DM', 'Demolished', 'Built and operated, then removed. The site has been cleared or reused.'],
    ['RA', 'Radically Altered', 'Eventually completed or operated, but in a form substantially different from the original vision.'],
    ['PF', 'Preserved Fragments', 'Demolished as a whole, with selected parts kept, relocated or exhibited elsewhere.']
  ];
  var SN = {}; STATUS.forEach(function (s) { SN[s[0]] = s[1]; });

  /* --- original schematic figures (not archival images) --- */
  var F = {
    dubailand: '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M10 150 Q40 120 30 80 T60 20 L150 14 Q200 30 228 70 L222 150 Z" stroke-dasharray="4 2"/><path d="M30 80 L120 70 L150 14 M120 70 L170 120 L222 112 M120 70 L95 150 M60 110 L120 70" stroke="#777"/><g fill="#333" stroke="none"><text x="62" y="52">ZONE 1</text><text x="150" y="60">ZONE 2</text><text x="170" y="98">ZONE 3</text><text x="150" y="140">ZONE 4</text><text x="50" y="135">ZONE 5</text><text x="40" y="95">ZONE 6</text><text x="8" y="12">FIG. — SIX ZONES, SCHEMATIC</text><text x="160" y="164">NOT TO SCALE</text></g><circle cx="120" cy="70" r="4"/><path d="M200 18 l6 -8 l6 8 M206 10 v14" /><text x="196" y="32" fill="#333" stroke="none">N</text></svg>',
    'nara-dreamland': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M8 140 H232" /><path d="M20 140 V110 L40 60 L60 90 L80 50 L100 85 L118 40 L140 80 L160 55 L180 95 L200 70 L220 140" stroke="#777"/><path d="M20 110 H220" stroke="#aaa" stroke-dasharray="2 3"/><g transform="translate(150 70)"><path d="M0 70 V30 H40 V70 M8 30 V12 l6 -10 l6 10 V30 M22 30 V6 l6 -12 l6 12 V30"/><path d="M14 70 v-14 a6 6 0 0 1 12 0 v14"/></g><g fill="#333" stroke="none"><text x="8" y="12">FIG. — COASTER PROFILE AND CASTLE</text><text x="24" y="156">WOODEN COASTER (SCHEMATIC)</text><text x="160" y="156">CASTLE</text></g></svg>',
    'nakagin-capsule-tower': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M10 160 H230"/><rect x="92" y="40" width="16" height="120" stroke-width="1.5"/><rect x="132" y="20" width="16" height="140" stroke-width="1.5"/>' +
      (function () { var s = ''; for (var i = 0; i < 9; i++) { var y = 46 + i * 12; s += '<rect x="66" y="' + y + '" width="24" height="10"/><circle cx="72" cy="' + (y + 5) + '" r="3"/><rect x="110" y="' + y + '" width="20" height="10"/><circle cx="124" cy="' + (y + 5) + '" r="3"/>'; } for (var j = 0; j < 11; j++) { var y2 = 26 + j * 12; s += '<rect x="150" y="' + y2 + '" width="24" height="10"/><circle cx="168" cy="' + (y2 + 5) + '" r="3"/>'; } return s; })() +
      '<g fill="#333" stroke="none"><text x="8" y="12">FIG. — CORES AND CAPSULES, ELEVATION</text><text x="184" y="60">CAPSULE</text><text x="184" y="69">2.5 × 4.0 M</text><text x="40" y="168">CORE A</text><text x="180" y="168">CORE B</text></g><path d="M176 57 H182" /></svg>',
    'palace-of-the-soviets': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M10 160 H230"/><path d="M60 160 V128 H180 V160 M75 128 V100 H165 V128 M88 100 V76 H152 V100 M98 76 V56 H142 V76 M106 56 V40 H134 V56 M112 40 V30 H128 V40"/><path d="M120 30 V10 M116 14 L120 8 L126 4" stroke-width="2"/><circle cx="120" cy="12" r="2.5"/><path d="M200 160 V10 M196 10 H204 M196 160 H204" stroke="#999"/><g fill="#333" stroke="none"><text x="8" y="12">FIG. — STEPPED MASSING, 1933 SCHEME</text><text x="206" y="88">416 M</text><text x="132" y="18">STATUE</text><text x="40" y="168">FOUNDATION ONLY BUILT</text></g></svg>',
    'meadowlands-xanadu': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M14 150 H226"/><path d="M20 150 V100 H120 V150" /><path d="M24 104 h8 v42 h-8z M36 104 h8 v42 h-8z M48 104 h8 v42 h-8z M60 104 h8 v42 h-8z M72 104 h8 v42 h-8z M84 104 h8 v42 h-8z M96 104 h8 v42 h-8z" stroke="#999"/><path d="M120 150 V70 L216 120 V150 Z"/><path d="M128 76 L208 118" stroke-dasharray="3 2" stroke="#777"/><g fill="#333" stroke="none"><text x="8" y="12">FIG. — RETAIL BLOCK AND INDOOR SLOPE</text><text x="30" y="95">STRIPED FACADE</text><text x="150" y="80">INDOOR SKI SLOPE</text><text x="150" y="160">SCHEMATIC</text></g></svg>',
    'six-flags-new-orleans': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><circle cx="70" cy="80" r="44"/><circle cx="70" cy="80" r="4"/>' +
      (function () { var s = ''; for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2, x = 70 + Math.cos(a) * 44, y = 80 + Math.sin(a) * 44; s += '<path d="M70 80 L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke="#999"/><rect x="' + (x - 3).toFixed(1) + '" y="' + (y + 1).toFixed(1) + '" width="6" height="6"/>'; } return s; })() +
      '<path d="M50 160 L70 80 L90 160"/><path d="M110 160 V110 L140 60 L160 120 L180 80 L200 160" stroke="#777"/><path d="M8 136 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#1a5a7a"/><g fill="#333" stroke="none"><text x="8" y="12">FIG. — RIDES AND FLOOD LINE</text><text x="150" y="132" fill="#1a5a7a">FLOOD LINE (SCHEMATIC)</text></g></svg>',
    'ryugyong-hotel': '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/><path d="M14 160 H226"/><path d="M120 14 L60 160 M120 14 L180 160 M120 14 L120 160" /><path d="M110 22 h20 v10 h-20z"/>' +
      (function () { var s = ''; for (var i = 1; i < 12; i++) { var y = 14 + i * 13, dx = (y - 14) * 60 / 146; s += '<path d="M' + (120 - dx).toFixed(1) + ' ' + y + ' H' + (120 + dx).toFixed(1) + '" stroke="#aaa"/>'; } return s; })() +
      '<path d="M206 160 V14 M202 14 H210 M202 160 H210" stroke="#999"/><g fill="#333" stroke="none"><text x="8" y="12">FIG. — THREE-WING PYRAMID</text><text x="196" y="90">330 M</text><text x="40" y="168">105 FLOORS ABOVE GROUND</text></g></svg>'
  };

  /* typology schematics for records that have no figure of their own (the weekly update chooses one by key) */
  var SV = '<svg viewBox="0 0 240 170" font-family="Verdana" font-size="7" fill="none" stroke="#333"><rect x="1" y="1" width="238" height="168" stroke="#bbb"/>';
  function T(t) { return '<g fill="#333" stroke="none"><text x="8" y="12">FIG. — ' + t + '</text><text x="168" y="164">NOT TO SCALE</text></g></svg>'; }
  function rep(n, fn) { var s = ''; for (var i = 0; i < n; i++) s += fn(i); return s; }
  F['city-radial'] = SV + '<circle cx="120" cy="90" r="64"/><circle cx="120" cy="90" r="40" stroke="#777"/><circle cx="120" cy="90" r="14" stroke-width="1.5"/>' + rep(12, function (i) { var a = i * Math.PI / 6; return '<path d="M' + (120 + Math.cos(a) * 14).toFixed(1) + ' ' + (90 + Math.sin(a) * 14).toFixed(1) + ' L' + (120 + Math.cos(a) * 64).toFixed(1) + ' ' + (90 + Math.sin(a) * 64).toFixed(1) + '" stroke="#999"/>'; }) + '<path d="M20 60 L220 120" stroke-dasharray="5 2" stroke-width="1.5"/><rect x="116" y="86" width="8" height="8" fill="#333"/>' + T('RADIAL PLAN, HUB AND TRANSIT LINE');
  F['slab-blocks'] = SV + '<path d="M8 150 H232"/>' + rep(6, function (i) { return '<rect x="' + (14 + i * 37) + '" y="' + (60 + (i % 2) * 12) + '" width="30" height="' + (90 - (i % 2) * 12) + '"/>' + rep(9, function (j) { return '<path d="M' + (17 + i * 37) + ' ' + (66 + (i % 2) * 12 + j * 9) + ' h24" stroke="#bbb"/>'; }); }) + T('ELEVEN-STOREY SLABS, ELEVATION');
  F['hotel-low'] = SV + '<path d="M8 120 H232"/><path d="M30 120 V84 H90 V70 H150 V84 H210 V120"/><path d="M90 70 V120 M150 70 V120" stroke="#777"/>' + rep(10, function (i) { return '<rect x="' + (36 + i * 17) + '" y="96" width="8" height="12" stroke="#999"/>'; }) + '<rect x="70" y="128" width="100" height="16" stroke="#1a5a7a"/><path d="M76 136 q8 -3 16 0 t16 0 t16 0 t16 0 t16 0" stroke="#1a5a7a"/>' + T('LOW HOTEL AND REFLECTING POOL');
  F['tower-shell'] = SV + '<path d="M10 160 H230"/><rect x="92" y="54" width="56" height="106"/>' + rep(12, function (i) { return '<path d="M92 ' + (60 + i * 8.5) + ' H148" stroke="#999"/>'; }) + '<path d="M92 54 V20 H148 V54" stroke-dasharray="4 3"/><path d="M100 54 V24 M140 54 V24" stroke-dasharray="2 3" stroke="#999"/>' + '<g fill="#333" stroke="none"><text x="154" y="36">UNFINISHED</text><text x="154" y="44">FLOORS</text></g>' + T('TOWER SHELL, BUILT AND UNBUILT');
  F['helix'] = SV + '<path d="M60 160 L170 20" stroke-width="1.5"/><path d="M90 160 C40 120 150 110 110 80 C70 50 180 40 140 20" stroke-width="1.5"/><path d="M130 160 C80 120 190 110 150 80 C110 50 200 50 160 22" stroke="#777"/><rect x="96" y="112" width="26" height="22"/><path d="M112 98 l10 -16 l10 16 z"/><rect x="120" y="58" width="14" height="18" rx="7"/><path d="M134 36 a8 8 0 0 1 16 0 z"/>' + T('HELIX AND ROTATING VOLUMES');
  F['arcology'] = SV + '<path d="M8 140 Q60 128 120 132 T232 136"/><path d="M8 140 V160 H232 V136" stroke="#999"/><path d="M40 132 a22 22 0 0 1 44 0" stroke-width="1.5"/><path d="M96 132 a30 30 0 0 1 60 0" stroke-width="1.5"/><rect x="164" y="96" width="44" height="38"/>' + rep(4, function (i) { return '<circle cx="' + (172 + i * 10) + '" cy="110" r="3"/>'; }) + '<path d="M30 150 q10 -6 20 0 M150 150 q10 -6 20 0" stroke="#999"/>' + T('VAULTS AND APSES ON A MESA');
  F['glasshouse'] = SV + '<path d="M10 150 H230"/><path d="M30 150 L80 60 L130 150"/><path d="M42 128 H118 M54 106 H106 M66 84 H94" stroke="#999"/><path d="M55 150 L80 60 L105 150" stroke="#999"/><rect x="134" y="110" width="80" height="40"/>' + rep(8, function (i) { return '<path d="M' + (134 + i * 10) + ' 110 V150" stroke="#bbb"/>'; }) + '<path d="M160 110 a24 24 0 0 1 48 0" stroke="#777"/>' + T('GLASS ENCLOSURES, SCHEMATIC');
  F['island-towers'] = SV + '<path d="M20 130 Q40 100 90 104 T200 100 Q230 120 210 140 Q150 156 60 150 Q16 146 20 130 Z"/><path d="M8 160 q12 -4 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" stroke="#1a5a7a"/>' + rep(9, function (i) { var h = 24 + (i * 13) % 30; return '<rect x="' + (52 + i * 16) + '" y="' + (118 - h) + '" width="9" height="' + h + '"/>'; }) + T('TOWERS ON RECLAIMED ISLAND');
  F['pods'] = SV + '<path d="M8 150 H232"/>' + rep(4, function (i) { var x = 40 + i * 52, y = 90 + (i % 2) * 14; return '<ellipse cx="' + x + '" cy="' + y + '" rx="22" ry="11"/><path d="M' + (x - 22) + ' ' + y + ' H' + (x + 22) + '" stroke="#999"/>' + rep(3, function (k) { return '<circle cx="' + (x - 10 + k * 10) + '" cy="' + (y - 4) + '" r="2.5"/>'; }) + '<path d="M' + (x - 8) + ' ' + (y + 10) + ' L' + (x - 12) + ' 150 M' + (x + 8) + ' ' + (y + 10) + ' L' + (x + 12) + ' 150"/>'; }) + T('POD HOUSES ON STILTS');
  F['spire'] = SV + '<path d="M8 130 H232"/><path d="M100 130 V160 H140 V130" stroke-dasharray="3 2"/><g fill="#333" stroke="none"><text x="146" y="150">FOUNDATION PIT</text></g><path d="M112 130 C108 90 126 60 120 14 M128 130 C132 90 114 60 120 14" stroke-dasharray="4 3"/>' + rep(6, function (i) { var y = 120 - i * 18, w = 9 - i * 1.3; return '<path d="M' + (120 - w).toFixed(1) + ' ' + y + ' L' + (120 + w).toFixed(1) + ' ' + (y - 6) + '" stroke="#999" stroke-dasharray="2 2"/>'; }) + T('PROPOSED SPIRE, UNBUILT');
  F['theme-park'] = F['nara-dreamland']; F['tower'] = F['ryugyong-hotel']; F['complex'] = F['meadowlands-xanadu']; F['monument'] = F['palace-of-the-soviets'];
  F.generic = SV + '<rect x="40" y="40" width="160" height="100" stroke-dasharray="4 3"/><path d="M40 40 L200 140 M200 40 L40 140" stroke="#ccc"/><g fill="#555" stroke="none"><text x="120" y="94" text-anchor="middle">SCHEMATIC IN PREPARATION</text></g>' + T('RECORD FIGURE');

  /* ---------------------------------------------------------------- the database (data/abandonedfutures.json) */
  var DB = null, BY = {}, LOADING = null;
  function load(base) {
    if (DB) return Promise.resolve(DB);
    if (!LOADING) {
      var p = (GN.loadAF ? GN.loadAF() : fetch(base + 'data/abandonedfutures.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }));
      LOADING = p.then(function (d) {
        d.records = (d.records || []).filter(function (r) { return r && r.id && r.name && SN[r.status]; });
        d.log = d.log || []; DB = d; BY = {}; d.records.forEach(function (r) { BY[r.id] = r; }); return d;
      });
      LOADING.catch(function () { LOADING = null; });
    }
    return LOADING;
  }
  function RS() { return DB.records; }
  function uniq(k) { var o = {}; RS().forEach(function (r) { if (r[k]) o[r[k]] = 1; }); return Object.keys(o).sort(); }
  function badge(c) { return '<span class="af-st st-' + c + '">' + SN[c] + '</span>'; }
  function isNew(r) { if (!r.added) return false; var t = Date.parse(r.added + 'T12:00:00'); return !isNaN(t) && Date.now() - t < 14 * 86400000; }
  function rlink(r, label) { return '<a href="#" data-go="abandonedfutures.ou/project/' + r.id + '">' + (label || r.name) + '</a>' + (label ? '' : (isNew(r) ? '<span class="af-new">NEW</span>' : '')); }
  function qstr(o) { var a = []; Object.keys(o).forEach(function (k) { if (o[k]) a.push(k + '=' + encodeURIComponent(o[k])); }); return a.length ? '?' + a.join('&') : ''; }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? (+m[3]) + ' ' + MON[+m[2] - 1] + ' ' + m[1] : (s || '—'); }
  function dayNo() { var d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rotation() { return RS().slice().sort(function (a, b) { return hash(a.id) - hash(b.id); }); }
  function today(off) { var rot = rotation(); return rot[(dayNo() + (off || 0)) % rot.length]; }
  function fig(r) { return F[r.fig] || F[r.id] || F.generic; }
  function byAdded() { return RS().slice().sort(function (a, b) { return (b.added || '').localeCompare(a.added || '') || b.no.localeCompare(a.no); }); }
  var seal = '<svg class="af-seal" width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="none" stroke="#b5a77a" stroke-width="2"/><circle cx="23" cy="23" r="16" fill="none" stroke="#b5a77a" stroke-dasharray="2 2"/><path d="M12 31 H34 M14 31 V22 L23 13 L32 22 V31" fill="none" stroke="#e8e4d6" stroke-width="1.5"/><path d="M19 31 V25 H27 V31" fill="none" stroke="#e8e4d6" stroke-dasharray="2 1.5"/></svg>';

  function frame(ctx, crumb, on, main) {
    function nv(p, label) { return '<a href="#" data-go="abandonedfutures.ou' + p + '"' + (on === p ? ' class="on"' : '') + '>' + label + '</a>'; }
    var recent = DB ? byAdded().slice(0, 8) : [];
    return '<div class="af-pg"><div class="af-top">' + seal + '<a href="#" data-go="abandonedfutures.ou" class="af-name">Abandoned Futures<small>An Archive of Unrealized Environments</small></a>' +
      '<form class="af-tq" role="search"><input type="search" placeholder="Search records" aria-label="Search records"><button type="submit">FIND</button></form></div>' +
      '<div class="af-crumb">' + crumb + '</div>' +
      '<table class="af-lay"><tr><td class="af-nav"><b>Archive</b>' + nv('', 'Home') + nv('/browse', 'Browse records') + nv('/categories', 'Status classifications') + nv('/today', 'Today’s Lost Future') + nv('/updates', 'Update log') + nv('/about', 'About the archive') +
      (DB ? '<b>Recently catalogued</b>' + recent.map(function (r) { return nv('/project/' + r.id, r.name.replace(/ \(.*\)/, '')); }).join('') + '<a href="#" data-go="abandonedfutures.ou/browse">All ' + RS().length + ' records</a>' : '') +
      '<b>Elsewhere</b><a href="#" data-go="directory.ou/category/architecture">GamiNet Directory</a><a href="#" data-go="route59.ou">Route 59 Corridor Archive</a></td>' +
      '<td class="af-main">' + main + '</td></tr></table>' +
      '<div class="af-foot">Abandoned Futures is a fictional institution within Gami Net. Its records summarize the published sources cited on each page; consult them before relying on any detail.<br>Database updated ' + (DB ? fmtDate(DB.updated) : '—') + '. Schematic figures are drawn for the archive and are not archival images.</div></div>';
  }
  function wireTop(ctx) {
    var f = ctx.root.querySelector('.af-tq'); if (!f) return;
    f.addEventListener('submit', function (e) { e.preventDefault(); var v = f.querySelector('input').value.trim(); ctx.go('abandonedfutures.ou/browse' + qstr({ q: v })); });
  }
  function crumbs() { var a = ['<a href="#" data-go="abandonedfutures.ou">Archive</a>']; for (var i = 0; i < arguments.length; i++) a.push(arguments[i]); return a.join(' &rsaquo; '); }
  function updLine() { var nNew = RS().filter(isNew).length; return '<div class="af-upd"><span><b>' + RS().length + '</b> records &middot; database updated <b>' + fmtDate(DB.updated) + '</b></span><span>' + (nNew ? nNew + ' added in the last 14 days &middot; ' : '') + '<a href="#" data-go="abandonedfutures.ou/updates">update log</a></span></div>'; }
  function logRow(e) { var r = e.id && BY[e.id]; return '<tr><td>' + fmtDate(e.date) + '</td><td><span class="af-kind k-' + (e.kind || 'revised') + '">' + (e.kind || 'revised') + '</span></td><td>' + (r ? rlink(r, r.no) + ' ' : '') + ctx_esc(e.text || '') + '</td></tr>'; }
  function ctx_esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function todayBox(r, long) {
    return '<div class="af-today">' + fig(r).replace('<svg ', '<svg aria-hidden="true" ') + '<div class="lbl">Today’s Lost Future</div><h3>' + rlink(r) + '</h3><div>' + r.loc + ' &middot; ' + badge(r.status) + '</div><p style="margin-top:6px">' + String(r.vision).split('. ')[0].replace(/\.$/, '') + '.</p>' +
      (long ? '<p>' + r.happened + '</p>' : '') + '<div style="font-size:9px;color:#777">Record ' + r.no + '. A different record is selected each day from the verified archive.</div></div>';
  }

  function home(ctx) {
    var counts = {}; RS().forEach(function (r) { counts[r.status] = (counts[r.status] || 0) + 1; });
    var main = '<h1>Abandoned Futures<small>A research archive of unbuilt architecture, demolished environments, abandoned developments and futures that arrived in another form.</small></h1>' + updLine() +
      todayBox(today(), false) +
      '<h2>The archive</h2><p>Every environment in this archive was once described as the future: a tower that would renew itself, a desert that would become the largest leisure city on earth, a monument taller than anything yet built. Each record documents what was promised, what was actually built, and what is there now.</p>' +
      '<p>Not every lost future is a ruin. Some were never begun. Some were finished as something else. Some survive only in pieces in museum collections. The archive classifies each record by its <a href="#" data-go="abandonedfutures.ou/categories">final status</a>, and re-checks records whose status is still changing.</p>' +
      '<h2>Holdings by status</h2><table class="af-t"><tr><th>Code</th><th>Classification</th><th>Records</th></tr>' + STATUS.map(function (s) { return '<tr><td><b>' + s[0] + '</b></td><td><a href="#" data-go="abandonedfutures.ou/browse?status=' + s[0] + '">' + s[1] + '</a></td><td>' + (counts[s[0]] || 0) + '</td></tr>'; }).join('') + '</table>' +
      '<h2>Recently catalogued</h2><table class="af-t"><tr><th>Record</th><th>Name</th><th>Location</th><th>Status</th><th>Catalogued</th></tr>' + byAdded().slice(0, 6).map(function (r) { return '<tr><td>' + r.no + '</td><td>' + rlink(r) + '</td><td>' + r.loc + '</td><td>' + badge(r.status) + '</td><td>' + fmtDate(r.added) + '</td></tr>'; }).join('') + '</table>' +
      '<h2>Latest changes</h2><table class="af-t af-log">' + DB.log.slice(-5).reverse().map(logRow).join('') + '</table><p style="font-size:10px">' + GN.link('abandonedfutures.ou/updates', 'Full update log ›') + '</p>' +
      '<div class="af-note">Records are added only when their facts can be checked against published sources. Each record lists those sources. Where sources disagree, the record says so.</div>';
    ctx.html(frame(ctx, crumbs('Home'), '', main)); wireTop(ctx);
    ctx.title('Abandoned Futures — An Archive of Unrealized Environments');
  }

  function browse(ctx) {
    var q = ctx.query, f = { country: q.country || '', decade: q.decade || '', type: q.type || '', status: (q.status || '').toUpperCase(), q: (q.q || '').trim() }, sort = q.sort || 'no';
    var words = f.q.toLowerCase().split(/\s+/).filter(Boolean);
    var list = RS().filter(function (r) {
      if (f.country && r.country !== f.country) return false;
      if (f.decade && r.decade !== f.decade) return false;
      if (f.type && r.type !== f.type) return false;
      if (f.status && r.status !== f.status) return false;
      if (words.length) { var hay = [r.name, r.loc, r.type, r.style, r.people, r.vision, r.built, r.happened, r.current, SN[r.status], (r.tl || []).map(function (t) { return t.join(' '); }).join(' ')].join(' ').toLowerCase(); return words.every(function (w) { return hay.indexOf(w.replace(/s$/, '')) >= 0; }); }
      return true;
    });
    var key = { no: function (r) { return r.no; }, name: function (r) { return r.name.toLowerCase(); }, loc: function (r) { return r.country + r.loc; }, y: function (r) { return r.y; }, status: function (r) { return SN[r.status]; }, added: function (r) { return r.added || ''; } }[sort] || function (r) { return r.no; };
    list.sort(function (a, b) { var x = key(a), y = key(b); var c = x < y ? -1 : x > y ? 1 : 0; return sort === 'added' ? -c : c; });
    function sel(name, label, opts, names) { return '<label>' + label + '<select name="' + name + '"><option value="">All</option>' + opts.map(function (o, i) { return '<option value="' + ctx.esc(o) + '"' + (f[name] === o ? ' selected' : '') + '>' + ctx.esc(names ? names[i] : o) + '</option>'; }).join('') + '</select></label>'; }
    function th(k, label) { var o = {}; for (var x in f) o[x] = f[x]; o.sort = k; return '<th><a href="#" data-go="abandonedfutures.ou/browse' + qstr(o) + '">' + label + '</a>' + (sort === k ? ' ▾' : '') + '</th>'; }
    var main = '<h1>Browse Records<small>Filter the archive by country, decade of origin, project type and final status.</small></h1>' + updLine() +
      '<form class="af-f">' + sel('country', 'Country', uniq('country')) + sel('decade', 'Decade', uniq('decade')) + sel('type', 'Type', uniq('type')) + sel('status', 'Status', STATUS.map(function (s) { return s[0]; }), STATUS.map(function (s) { return s[1]; })) +
      '<label>Keywords<input type="search" name="q" value="' + ctx.esc(f.q) + '" placeholder="e.g. theme park"></label><button class="af-btn" type="submit">Search</button> <button class="af-btn af-reset" type="button">Reset</button></form>' +
      '<p style="margin-top:8px"><b>' + list.length + '</b> record' + (list.length === 1 ? '' : 's') + ' found' + (f.q ? ' for “' + ctx.esc(f.q) + '”' : '') + '.</p>' +
      (list.length ? '<table class="af-t"><tr>' + th('no', 'Record') + th('name', 'Name') + th('loc', 'Location') + th('y', 'Begun') + th('status', 'Status') + th('added', 'Catalogued') + '</tr>' + list.map(function (r) { return '<tr><td>' + r.no + '</td><td>' + rlink(r) + '<br><span style="color:#666">' + r.type + '</span></td><td>' + r.loc + '</td><td>' + r.y + '</td><td>' + badge(r.status) + '</td><td>' + fmtDate(r.added) + '</td></tr>'; }).join('') + '</table>'
        : '<div class="af-note">No records match. Try fewer filters, or <a href="#" data-go="abandonedfutures.ou/browse">show all records</a>.</div>');
    ctx.html(frame(ctx, crumbs('Browse'), '/browse', main)); wireTop(ctx);
    var form = ctx.root.querySelector('form.af-f');
    function submit() { var o = {}; ['country', 'decade', 'type', 'status', 'q'].forEach(function (k) { o[k] = form.elements[k].value.trim(); }); if (sort !== 'no') o.sort = sort; ctx.go('abandonedfutures.ou/browse' + qstr(o)); }
    form.addEventListener('change', function (e) { if (e.target.tagName === 'SELECT') submit(); });
    form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    form.querySelector('.af-reset').addEventListener('click', function () { ctx.go('abandonedfutures.ou/browse'); });
    ctx.title('Abandoned Futures — Browse Records');
  }

  function categories(ctx) {
    var main = '<h1>Status Classifications<small>Why the archive does not call everything “abandoned.”</small></h1>' +
      '<p>A future can be lost in several ways. The archive assigns each record one final status, describing the condition of the environment today, not how it is remembered.</p>' +
      STATUS.map(function (s) { var m = RS().filter(function (r) { return r.status === s[0]; }); return '<h2>' + s[0] + ' &middot; ' + s[1] + '</h2><p>' + s[2] + '</p><p>' + (m.length ? m.map(function (r) { return rlink(r) + ' <span style="color:#777">(' + r.loc + ')</span>'; }).join('<br>') : '<i>No records yet.</i>') + '</p>'; }).join('') +
      '<div class="af-note">Classification follows the most recent verified source for each record. A record’s status can change: an abandoned park may be demolished, an unfinished tower completed. Records marked for review are re-checked at each update.</div>';
    ctx.html(frame(ctx, crumbs('Status classifications'), '/categories', main)); wireTop(ctx);
    ctx.title('Abandoned Futures — Status Classifications');
  }

  function record(ctx, id) {
    var r = BY[id]; if (!r) return ctx.notFound();
    var d = new Date();
    var cite = 'Abandoned Futures. “' + r.name + '.” Record ' + r.no + '. abandonedfutures.ou/project/' + r.id + '. Accessed ' + d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear() + '.';
    var hist = DB.log.filter(function (e) { return e.id === r.id; });
    var main = '<h1>' + r.name + (isNew(r) ? '<span class="af-new">NEW</span>' : '') + '<small>' + r.loc + ' &middot; Record ' + r.no + '</small></h1>' +
      '<div class="af-fig">' + fig(r) + '<div style="margin-top:3px"><b>Figure.</b> Schematic drawn for the archive. Not to scale and not an archival image.</div><div class="af-ph">ARCHIVAL PHOTOGRAPH<br>not held by this archive<br>(placeholder)</div></div>' +
      '<table class="af-rec" style="width:auto;max-width:100%"><tr><th>Status</th><td>' + badge(r.status) + (r.watch ? ' <span style="font-size:9px;color:#7a2a1a">UNDER REVIEW</span>' : '') + '</td></tr><tr><th>Location</th><td>' + r.loc + '</td></tr><tr><th>Type</th><td>' + r.type + '</td></tr><tr><th>Style / typology</th><td>' + (r.style || '—') + '</td></tr><tr><th>Principal parties</th><td>' + (r.people || '—') + '</td></tr><tr><th>Begun</th><td>' + r.y + ' (' + r.decade + ')</td></tr><tr><th>Catalogued</th><td>' + fmtDate(r.added) + '</td></tr><tr><th>Last verified</th><td>' + fmtDate(r.verified) + '</td></tr></table>' +
      '<h2>Original vision</h2><p>' + r.vision + '</p>' +
      '<div class="af-clear"></div><h2>Timeline</h2><ol class="af-tl">' + (r.tl || []).map(function (t) { return '<li><span>' + t[0] + '</span>' + t[1] + '</li>'; }).join('') + '</ol>' +
      '<h2>What was built</h2><p>' + r.built + '</p>' +
      '<h2>What happened</h2><p>' + r.happened + '</p>' +
      '<h2>Current status</h2><p>' + badge(r.status) + ' ' + r.current + ' <span style="font-size:10px;color:#777">(verified ' + fmtDate(r.verified) + ')</span></p>' +
      (r.note ? '<div class="af-note">' + r.note + '</div>' : '') +
      '<h2>Sources and further reading</h2><ul class="af-src">' + (r.sources || []).map(function (s) { return /^https?:\/\//.test(s[1]) ? '<li><a href="' + ctx.esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + '</a></li>' : ''; }).join('') + '</ul>' +
      (hist.length ? '<h2>Record history</h2><table class="af-t af-log">' + hist.slice().reverse().map(logRow).join('') + '</table>' : '') +
      '<h2>Cite this record</h2><div class="af-cite">' + ctx.esc(cite) + '</div><button type="button" class="af-btn af-copy">Copy citation</button> <span class="af-copied" style="font-size:10px;color:#3a6a3a"></span>' +
      '<h2>Related records</h2><p>' + (r.rel || []).filter(function (k) { return BY[k]; }).map(function (k) { return rlink(BY[k]) + ' ' + badge(BY[k].status); }).join('<br>') + '</p>';
    ctx.html(frame(ctx, crumbs('<a href="#" data-go="abandonedfutures.ou/browse">Records</a>', r.no), '/project/' + r.id, main)); wireTop(ctx);
    ctx.root.querySelector('.af-copy').addEventListener('click', function () {
      var out = ctx.root.querySelector('.af-copied');
      function ok() { out.textContent = 'Copied.'; } function no() { out.textContent = 'Select the citation above and copy it.'; }
      try { navigator.clipboard.writeText(cite).then(ok, no); } catch (e) { no(); }
    });
    ctx.title('Abandoned Futures — ' + r.name + ' (' + r.no + ')');
  }

  function todayPage(ctx) {
    var r = today(), nx = today(1);
    var main = '<h1>Today’s Lost Future<small>One record from the verified archive, selected by date.</small></h1>' + todayBox(r, true) +
      '<p>' + rlink(r, 'Read the full record ›') + '</p>' +
      '<h2>How the selection works</h2><p>Each calendar day draws the next record in a fixed rotation through the whole archive, so every visitor sees the same record on the same day. New records join the rotation as soon as they are catalogued. Tomorrow’s record is ' + rlink(nx) + '.</p>';
    ctx.html(frame(ctx, crumbs('Today’s Lost Future'), '/today', main)); wireTop(ctx);
    ctx.title('Abandoned Futures — Today’s Lost Future');
  }

  function updates(ctx) {
    var byDate = {}; DB.log.forEach(function (e) { (byDate[e.date] = byDate[e.date] || []).push(e); });
    var dates = Object.keys(byDate).sort().reverse();
    var main = '<h1>Update Log<small>Accessions, revisions and status changes, newest first.</small></h1>' + updLine() +
      '<p>The archive is revised on a regular schedule. Each update researches new candidates, catalogues the ones whose facts can be verified, and re-checks records whose status is still changing. Every change is entered here.</p>' +
      dates.map(function (dt) { return '<h2>' + fmtDate(dt) + '</h2><table class="af-t af-log">' + byDate[dt].map(logRow).join('') + '</table>'; }).join('') +
      '<h2>Records under review</h2><p>' + (RS().filter(function (r) { return r.watch; }).map(function (r) { return rlink(r) + ' ' + badge(r.status) + ' <span style="color:#777;font-size:10px">last verified ' + fmtDate(r.verified) + '</span>'; }).join('<br>') || '<i>None.</i>') + '</p>';
    ctx.html(frame(ctx, crumbs('Update log'), '/updates', main)); wireTop(ctx);
    ctx.title('Abandoned Futures — Update Log');
  }

  function about(ctx) {
    var main = '<h1>About the Archive<small>Scope, method and sources.</small></h1>' +
      '<h2>Scope</h2><p>Abandoned Futures documents environments that were imagined as the future and did not arrive as planned: unbuilt monuments, closed and demolished parks, unfinished towers, megaprojects that opened as something else, and buildings that now survive only in fragments.</p>' +
      '<p>The archive is interested in the gap between the rendering and the site: what a project promised, what was actually poured, framed and opened, and what stands there now.</p>' +
      '<h2>Method</h2><p>Each record follows the same structure: original vision, timeline, typology, what was built, what happened, and current status. Dates are given as precisely as the sources allow. Where sources disagree, as with the completion date of the Palace of the Soviets foundations, the record notes the disagreement rather than choosing silently.</p>' +
      '<h2>Updates</h2><p>The database is revised on a regular schedule. New records are catalogued only after their facts are checked against published sources, and records whose status can still change are re-verified. Every accession and revision is entered in the ' + GN.link('abandonedfutures.ou/updates', 'update log') + '.</p>' +
      '<h2>Images</h2><p>The archive does not reproduce archival photographs it does not hold. Each record carries an original schematic drawn for the archive and a placeholder for an attributed archival image.</p>' +
      '<h2>What is fictional</h2><p>The institution itself, its seal, its record numbers and its founding are part of Gami Net. The records are not: each summarizes the published sources it cites.</p>' +
      '<h2>Related resources on Gami Net</h2><p>' + GN.link('route59.ou', 'Route 59 Corridor Archive') + ': suburban retail on one New York highway.<br>' + GN.link('fountaincam.ou', 'FountainCam Network') + ': water features in commercial interiors.<br>' + GN.link('directory.ou/category/architecture', 'GamiNet Directory: Architecture & Research') + '</p>';
    ctx.html(frame(ctx, crumbs('About'), '/about', main)); wireTop(ctx);
    ctx.title('Abandoned Futures — About the Archive');
  }

  function route(ctx) {
    var p = ctx.path;
    if (p === '/') return home(ctx);
    if (p === '/browse' || p === '/search') return browse(ctx);
    if (p === '/categories') return categories(ctx);
    if (p === '/today') return todayPage(ctx);
    if (p === '/updates' || p === '/log') return updates(ctx);
    if (p === '/about') return about(ctx);
    if (p.indexOf('/project/') === 0) return record(ctx, p.slice(9));
    ctx.notFound();
  }

  GN.site('abandonedfutures.ou', {
    name: 'abandonedfutures', title: 'Abandoned Futures', css: CSS,
    icon: function (c) { c.fillStyle = '#2e3438'; c.fillRect(0, 0, 16, 16); c.strokeStyle = '#e8e4d6'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(3, 13); c.lineTo(13, 13); c.moveTo(4, 13); c.lineTo(4, 8); c.lineTo(8, 4); c.lineTo(12, 8); c.lineTo(12, 13); c.stroke(); c.setLineDash([1.5, 1.5]); c.beginPath(); c.moveTo(6.5, 13); c.lineTo(6.5, 10); c.lineTo(9.5, 10); c.lineTo(9.5, 13); c.stroke(); c.setLineDash([]); },
    render: function (ctx) {
      if (DB) return route(ctx);
      ctx.html(frame(ctx, crumbs('Connecting'), null, '<div class="af-wait"><b>Connecting to the archive database…</b>Retrieving records.</div>'));
      ctx.status('Connecting to archive database...');
      load(ctx.base).then(function () { if (ctx.alive()) { route(ctx); ctx.status('Done'); } }, function () {
        if (!ctx.alive()) return;
        ctx.html(frame(ctx, crumbs('Database unavailable'), null, '<div class="af-wait"><b>The archive database could not be reached.</b>The record index did not load. <button type="button" class="af-btn af-retry">Try again</button></div>'));
        ctx.root.querySelector('.af-retry').addEventListener('click', function () { ctx.go(ctx.addr); });
      });
    }
  });
})();
