/* directory.ou — the GamiNet Directory (search + categories), circa 1998 */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-directory{background:#fff;font:14px/1.35 "Times New Roman",Times,serif;padding:10px 12px 24px}',
    '.gn-directory .dr-top{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;flex-wrap:wrap;border-bottom:1px solid #999;padding-bottom:6px}',
    '.gn-directory .dr-logo{font:bold 40px/1 "Times New Roman",serif;letter-spacing:-1px;color:#c00;text-decoration:none;text-shadow:2px 2px 0 #f8c0c0}',
    '.gn-directory .dr-logo b{color:#000080}.gn-directory .dr-logo i{font:italic 15px Georgia,serif;color:#444;letter-spacing:0;text-shadow:none;margin-left:6px}',
    '.gn-directory .dr-quick{display:flex;gap:10px;font-size:12px}.gn-directory .dr-quick a{display:flex;flex-direction:column;align-items:center;gap:2px}',
    '.gn-directory .dr-quick canvas{width:24px;height:24px;image-rendering:pixelated}',
    '.gn-directory .dr-search{margin:12px 0 4px;text-align:center}',
    '.gn-directory .dr-search form{display:inline-flex;gap:4px;flex-wrap:wrap;justify-content:center;position:relative}',
    '.gn-directory input.dr-q{width:min(320px,62vw);font:14px Arial,sans-serif;padding:2px 3px;border:2px inset #ddd}',
    '.gn-directory button.dr-btn{font:13px Arial,sans-serif;padding:1px 10px;background:#ddd;border:2px outset #eee;cursor:pointer}',
    '.gn-directory button.dr-btn:active{border-style:inset}',
    '.gn-directory .dr-sug{position:absolute;left:0;top:100%;z-index:3;background:#ffffe8;border:1px solid #888;min-width:220px;text-align:left;font:13px Arial,sans-serif;box-shadow:2px 2px 0 rgba(0,0,0,.25)}',
    '.gn-directory .dr-sug a{display:block;padding:2px 6px;color:#000;text-decoration:none}.gn-directory .dr-sug a:hover,.gn-directory .dr-sug a.on{background:#000080;color:#fff}',
    '.gn-directory .dr-sub{font-size:12px;text-align:center;color:#333}',
    '.gn-directory .dr-banner{display:block;margin:10px auto;max-width:468px;height:60px;border:1px solid #000;text-decoration:none;position:relative;overflow:hidden;background:linear-gradient(180deg,#e8f6ff,#6ab8f0 60%,#2a6ab8);color:#fff;font:bold 20px Arial,sans-serif}',
    '.gn-directory .dr-banner span{position:absolute;left:12px;top:9px;text-shadow:1px 1px 0 #024}.gn-directory .dr-banner small{position:absolute;left:12px;top:34px;font:11px Verdana,sans-serif}',
    '.gn-directory .dr-banner em{position:absolute;right:10px;top:16px;font:bold 12px Verdana;background:#ff0;color:#c00;padding:4px 6px;border:1px solid #c00;animation:drBlink 1s steps(1) infinite}',
    '@keyframes drBlink{50%{opacity:0}}',
    '.gn-directory .dr-main{display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap}',
    '.gn-directory .dr-cats{flex:1 1 360px;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px 18px;margin-top:8px}',
    '.gn-directory .dr-cat a.h{font:bold 16px "Times New Roman",serif}.gn-directory .dr-cat div{font-size:12px;color:#333;line-height:1.3}',
    '.gn-directory .dr-side{flex:0 1 220px;min-width:190px;font-size:12px}',
    '.gn-directory .dr-box{border:1px solid #999;margin-top:8px}.gn-directory .dr-box h3{margin:0;padding:2px 6px;background:#dcdcdc;font:bold 12px Arial,sans-serif;border-bottom:1px solid #999}',
    '.gn-directory .dr-box .in{padding:6px}.gn-directory .dr-feat b{font-size:14px}',
    '.gn-directory .dr-new{color:#c00;font:bold 10px Arial;vertical-align:super}',
    '.gn-directory .dr-foot{margin-top:18px;border-top:1px solid #999;padding-top:6px;font-size:11px;text-align:center;color:#444}',
    '.gn-directory h2{font:bold 18px "Times New Roman",serif;margin:12px 0 4px}',
    '.gn-directory .dr-crumb{font-size:13px;margin:8px 0;background:#eee;padding:3px 6px;border:1px solid #ccc}',
    '.gn-directory ul.dr-res{list-style:none;padding:0;margin:6px 0}.gn-directory ul.dr-res li{margin:0 0 12px}',
    '.gn-directory .dr-url{color:#008000;font-size:12px}.gn-directory .dr-why{color:#666;font:11px Arial,sans-serif}',
    '.gn-directory .dr-why b{color:#000}.gn-directory .dr-cbc{font-size:12px}',
    '.gn-directory .dr-tabs{font:12px Arial,sans-serif;margin:6px 0;color:#444}',
    '.gn-directory .dr-randbtn{font:bold 12px Arial;padding:2px 8px;background:#ffd;border:2px outset #ffe;cursor:pointer}',
    '.gn-directory table.dr-tbl{border-collapse:collapse;width:100%;font-size:13px}.gn-directory .dr-tbl td,.gn-directory .dr-tbl th{border:1px solid #bbb;padding:3px 6px;text-align:left;vertical-align:top}',
    '.gn-directory .dr-tbl th{background:#dcdcdc}'
  ].join('\n');

  var ICONS = {
    'directory.ou': ['#000080', '#c00', 'D'], 'ultrawater.ou': ['#2a7ad8', '#bfe6ff', 'drop'], 'route59.ou': ['#1a1a1a', '#39ff14', '59'], 'stopnrest.ou': ['#7a0010', '#ff4a6a', 'V'],
    'fountaincam.ou': ['#222', '#8fd', 'cam'], 'abandonedfutures.ou': ['#f2ead8', '#2a2a5a', 'AF'], 'luckystationary.ou': ['#1a5ab8', '#fff', 'L'], 'marmotnationalism.ou': ['#2f5a24', '#e8c060', 'M'], 'gamilexicon.ou': ['#fff', '#a01818', 'Aa']
  };
  function drawIcon(c, host, s) {
    var x = c.getContext ? c.getContext('2d') : c, ic = ICONS[host] || ['#888', '#fff', '?'];
    s = s || 16; x.fillStyle = ic[0]; x.fillRect(0, 0, s, s);
    x.fillStyle = ic[1];
    if (ic[2] === 'drop') { x.beginPath(); x.moveTo(s / 2, 2); x.quadraticCurveTo(s - 2, s * 0.62, s / 2, s - 2); x.quadraticCurveTo(2, s * 0.62, s / 2, 2); x.fill(); }
    else if (ic[2] === 'cam') { x.fillRect(2, s * 0.3, s * 0.6, s * 0.42); x.beginPath(); x.moveTo(s * 0.62, s * 0.42); x.lineTo(s - 2, s * 0.3); x.lineTo(s - 2, s * 0.72); x.lineTo(s * 0.62, s * 0.6); x.fill(); x.fillStyle = '#f33'; x.fillRect(4, s * 0.36, 2, 2); }
    else { x.font = 'bold ' + Math.round(s * (ic[2].length > 1 ? 0.5 : 0.75)) + 'px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(ic[2], s / 2, s / 2 + 1); }
    x.strokeStyle = 'rgba(0,0,0,.6)'; x.strokeRect(0.5, 0.5, s - 1, s - 1);
  }
  GN.drawSiteIcon = drawIcon;
  var HOME_PAGES = GN.HOSTS.slice();
  var NEW = [
    ['gamilexicon.ou', 'Gami Lexicon dictionary goes online', 'Nov 4'],
    ['fountaincam.ou/feed/vacant-retail', 'VACANT RETAIL FOUNTAIN feed re-listed (signal unstable)', 'Nov 3'],
    ['abandonedfutures.ou/project/nakagin-capsule-tower', 'Abandoned Futures: Nakagin Capsule Tower record revised', 'Nov 2'],
    ['marmotnationalism.ou/bulletins', 'National Marmot Front posts Bulletin No. 114', 'Nov 1'],
    ['ultrawater.ou/terminal', 'ULTRAWATER Virtual Hydration Terminal goes online', 'Oct 30'],
    ['luckystationary.ou/rare-finds', 'Lucky Stationary adds card packs to Rare Finds', 'Oct 28'],
    ['route59.ou', 'Route 59 Corridor Archive reserves its address (under construction)', 'Oct 27'],
    ['stopnrest.ou', 'Stop N’ Rest Motel reserves its address (under construction)', 'Oct 27']
  ];

  function header(ctx, q) {
    return '<div class="dr-top"><a href="#" data-go="directory.ou" class="dr-logo">Gami<b>Net</b><i>Directory</i></a>' +
      '<div class="dr-quick">' + [['directory.ou/new', 'What’s New', 'new'], ['__random', 'Random', 'rand'], ['directory.ou/about', 'Help', 'help']].map(function (q2) {
        return '<a href="#" ' + (q2[0] === '__random' ? 'data-rand="1"' : 'data-go="' + q2[0] + '"') + '><canvas width="12" height="12" data-q="' + q2[2] + '"></canvas>' + q2[1] + '</a>';
      }).join('') + '</div></div>' +
      '<div class="dr-search"><form autocomplete="off"><input class="dr-q" name="q" value="' + ctx.esc(q || '') + '" aria-label="Search Gami Net"><button class="dr-btn" type="submit">Search</button>' +
      '<div class="dr-sug" hidden></div></form><div class="dr-sub">Try: ' + ['fountains', 'marmots', 'abandoned theme parks', 'mall', 'water'].map(function (t) { return ctx.link('directory.ou/search?q=' + encodeURIComponent(t), t); }).join(' · ') + '</div></div>';
  }
  function footer() {
    return '<div class="dr-foot"><a href="#" data-go="directory.ou/about">About the Directory</a> · <a href="#" data-go="directory.ou/submit">Submit a Site</a> · <a href="#" data-go="directory.ou/new">What’s New</a><br>Copyright © 2001 GamiNet Directory. All rights reserved.</div>';
  }
  function quickIcons(root) {
    root.querySelectorAll('canvas[data-q]').forEach(function (c) {
      var x = c.getContext('2d'), k = c.dataset.q;
      if (k === 'new') { x.fillStyle = '#c00'; x.fillRect(0, 2, 12, 8); x.fillStyle = '#ff0'; x.font = 'bold 7px Arial'; x.fillText('NEW', 0, 8); }
      else if (k === 'rand') { x.fillStyle = '#fff'; x.fillRect(1, 1, 10, 10); x.strokeRect(1.5, 1.5, 9, 9); x.fillStyle = '#000'; [[3, 3], [8, 3], [5.5, 5.5], [3, 8], [8, 8]].forEach(function (p) { x.fillRect(p[0], p[1], 1.6, 1.6); }); }
      else { x.fillStyle = '#ff0'; x.beginPath(); x.arc(6, 6, 5, 0, 7); x.fill(); x.fillStyle = '#000'; x.font = 'bold 9px Arial'; x.fillText('?', 3.5, 9.5); }
    });
  }
  function wire(ctx) {
    var root = ctx.root, form = root.querySelector('.dr-search form'), inp = form.querySelector('.dr-q'), sug = form.querySelector('.dr-sug'), sel = -1;
    quickIcons(root);
    form.addEventListener('submit', function (e) { e.preventDefault(); var v = inp.value.trim(); if (v) ctx.go('directory.ou/search?q=' + encodeURIComponent(v)); });
    function show() {
      var list = GN.suggest(inp.value); sel = -1;
      if (!list.length) { sug.hidden = true; return; }
      sug.innerHTML = list.map(function (s) { return '<a href="#" data-go="directory.ou/search?q=' + encodeURIComponent(s) + '">' + ctx.esc(s) + '</a>'; }).join('');
      sug.hidden = false;
    }
    inp.addEventListener('input', show);
    inp.addEventListener('keydown', function (e) {
      var items = sug.querySelectorAll('a'); if (sug.hidden || !items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items.forEach(function (a, i) { a.classList.toggle('on', i === sel); }); inp.value = items[sel].textContent; }
      if (e.key === 'Escape') sug.hidden = true;
    });
    inp.addEventListener('blur', function () { ctx.later(function () { sug.hidden = true; }, 200); });
    root.querySelectorAll('[data-rand]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); randomSite(ctx); }); });
    root.querySelectorAll('canvas[data-icon]').forEach(function (c) { drawIcon(c, c.dataset.icon, c.width); });
  }
  function randomSite(ctx) {
    var list = HOME_PAGES.filter(function (h) { return h !== 'directory.ou'; });
    ctx.go(list[Math.floor(Math.random() * list.length)]);
  }
  function siteLine(ctx, h) {
    var i = GN.SITE_INFO[h];
    return '<canvas width="12" height="12" data-icon="' + h + '" style="width:12px;height:12px;vertical-align:-1px"></canvas> ' + ctx.link(h, ctx.esc(i.name));
  }

  function home(ctx) {
    var cats = GN.CATEGORIES.map(function (c) {
      var sites = HOME_PAGES.filter(function (h) { return GN.SITE_INFO[h].cat === c[0]; });
      var pages = GN.INDEX.filter(function (e) { return e.c === c[0] && e.u.indexOf('/') > 0; }).length;
      return '<div class="dr-cat">' + ctx.link('directory.ou/category/' + c[1], ctx.esc(c[0]), 'h') + ' <span style="font-size:12px">(' + (sites.length + pages) + ')</span><div>' +
        (sites.length ? sites.map(function (h) { return ctx.link(h, ctx.esc(GN.SITE_INFO[h].name)); }).join(', ') : '<i>' + ctx.esc(sub(c[0])) + '</i>') + '</div></div>';
    }).join('');
    var recent = GN.recent().filter(function (h) { return h !== 'directory.ou'; }).slice(0, 5);
    ctx.html(header(ctx) +
      '<a href="#" data-go="ultrawater.ou" class="dr-banner"><span>ULTRAWATER</span><small>Water as infrastructure. Civic · Atmosphere · Synthetic Nature</small><em>CLICK HERE!</em></a>' +
      '<div class="dr-main"><div class="dr-cats">' + cats + '</div>' +
      '<div class="dr-side"><div class="dr-box"><h3>Featured Site</h3><div class="in dr-feat"></div></div>' +
      '<div class="dr-box"><h3>Recently Visited</h3><div class="in">' + (recent.length ? recent.map(function (h) { return GN.SITE_INFO[h] ? siteLine(ctx, h) : ctx.link(h, ctx.esc(h)); }).join('<br>') : 'Sites you visit will be listed here.') + '</div></div>' +
      '<div class="dr-box"><h3>Feeling lost?</h3><div class="in"><button type="button" class="dr-randbtn" data-rand="1">Random Website</button><br><br><a href="#" data-go="directory.ou/new">What’s New</a> <span class="dr-new">NEW!</span></div></div></div></div>' +
      footer());
    wire(ctx);
    var feat = HOME_PAGES.filter(function (h) { return h !== 'directory.ou'; }), fi = Math.floor(Math.random() * feat.length), box = ctx.root.querySelector('.dr-feat');
    function showFeat() {
      var h = feat[fi % feat.length], i = GN.SITE_INFO[h]; fi++;
      box.innerHTML = '<canvas width="24" height="24" data-icon="' + h + '" style="width:24px;height:24px;float:left;margin:0 6px 2px 0"></canvas><b>' + ctx.link(h, ctx.esc(i.name)) + '</b><br>' + ctx.esc(i.blurb) + '<br><span class="dr-url">' + h + '</span>';
      drawIcon(box.querySelector('canvas'), h, 24);
    }
    showFeat(); ctx.every(showFeat, 6000);
    ctx.title('GamiNet Directory');
  }
  function sub(cat) { return { 'Arts & Media': 'Symbols, anthems, design', 'Culture & History': 'Memory, shops, childhood' }[cat] || ''; }

  function results(ctx) {
    var q = (ctx.query.q || '').trim();
    var res = q ? GN.search(q) : [];
    var catHits = GN.CATEGORIES.filter(function (c) { return q && c[0].toLowerCase().indexOf(q.toLowerCase()) >= 0; });
    var fieldName = { address: 'address', title: 'title', keywords: 'topics', description: 'description' };
    var html = header(ctx, q) + '<div class="dr-tabs">Search results for <b>“' + ctx.esc(q) + '”</b>: found <b>' + res.length + '</b> page' + (res.length === 1 ? '' : 's') + ' on Gami Net</div>';
    if (catHits.length) html += '<h2>Directory Categories</h2><ul class="dr-res">' + catHits.map(function (c) { return '<li>' + ctx.link('directory.ou/category/' + c[1], '<b>' + ctx.esc(c[0]) + '</b>') + '</li>'; }).join('') + '</ul>';
    if (res.length) {
      html += '<h2>Web Pages</h2><ul class="dr-res">' + res.slice(0, 30).map(function (r) {
        var e = r.e, host = e.u.split('/')[0], cat = GN.CATEGORIES.filter(function (c) { return c[0] === e.c; })[0];
        return '<li><canvas width="12" height="12" data-icon="' + host + '" style="width:12px;height:12px;vertical-align:-1px"></canvas> ' + ctx.link(e.u, '<b>' + ctx.esc(e.t) + '</b>') + ' - ' + ctx.esc(e.d) +
          '<br><span class="dr-url">' + ctx.esc(e.u) + '</span>' +
          '<br><span class="dr-why">Matched: ' + r.why.map(function (w) { return w.terms.map(function (t) { return '<b>“' + ctx.esc(t) + '”</b>'; }).join(', ') + ' in ' + fieldName[w.field]; }).join('; ') + '</span>' +
          (cat ? '<br><span class="dr-cbc">Category: ' + ctx.link('directory.ou/category/' + cat[1], ctx.esc(cat[0])) + '</span>' : '') + '</li>';
      }).join('') + '</ul>';
    } else if (q) {
      var s = GN.suggest(q.split(' ')[0].slice(0, 3));
      html += '<p>Sorry, no matches were found for <b>' + ctx.esc(q) + '</b>.</p><ul><li>Check your spelling.</li><li>Try fewer or more general words.</li>' + (s.length ? '<li>Related searches: ' + s.map(function (t) { return ctx.link('directory.ou/search?q=' + encodeURIComponent(t), ctx.esc(t)); }).join(', ') + '</li>' : '') + '<li>Browse the ' + ctx.link('directory.ou', 'Directory categories') + ', or <a href="#" data-rand="1">visit a random site</a>.</li></ul>';
    }
    ctx.html(html + footer()); wire(ctx);
    ctx.title(q ? 'GamiNet Search: ' + q : 'GamiNet Search');
  }
  function category(ctx, slug) {
    var c = GN.CATEGORIES.filter(function (x) { return x[1] === slug; })[0]; if (!c) return ctx.notFound();
    var sites = HOME_PAGES.filter(function (h) { return GN.SITE_INFO[h].cat === c[0]; });
    var pages = GN.INDEX.filter(function (e) { return e.c === c[0] && e.u.indexOf('/') > 0; });
    ctx.html(header(ctx) + '<div class="dr-crumb">' + ctx.link('directory.ou', 'Top') + ' : <b>' + ctx.esc(c[0]) + '</b></div>' +
      '<h2>Sites</h2>' + (sites.length ? '<ul class="dr-res">' + sites.map(function (h) { var i = GN.SITE_INFO[h]; return '<li>' + siteLine(ctx, h) + ' - ' + ctx.esc(i.blurb) + '<br><span class="dr-url">' + h + '</span></li>'; }).join('') + '</ul>' : '<p><i>No sites are filed directly in this category. See the pages below.</i></p>') +
      (pages.length ? '<h2>Pages</h2><table class="dr-tbl"><tr><th>Page</th><th>Address</th></tr>' + pages.map(function (e) { return '<tr><td>' + ctx.link(e.u, ctx.esc(e.t)) + '<br><small>' + ctx.esc(e.d) + '</small></td><td class="dr-url">' + ctx.esc(e.u) + '</td></tr>'; }).join('') + '</table>' : '') +
      '<p>Other categories: ' + GN.CATEGORIES.filter(function (x) { return x !== c; }).map(function (x) { return ctx.link('directory.ou/category/' + x[1], ctx.esc(x[0])); }).join(' · ') + '</p>' + footer());
    wire(ctx); ctx.title('GamiNet Directory: ' + c[0]);
  }
  function whatsNew(ctx) {
    ctx.html(header(ctx) + '<h2>What’s New on Gami Net</h2><table class="dr-tbl"><tr><th style="width:60px">Date</th><th>Listing</th></tr>' +
      NEW.map(function (n) { return '<tr><td>' + n[2] + '</td><td>' + ctx.link(n[0], ctx.esc(n[1])) + ' <span class="dr-new">NEW!</span><br><span class="dr-url">' + n[0] + '</span></td></tr>'; }).join('') + '</table>' + footer());
    wire(ctx); ctx.title('GamiNet Directory: What’s New');
  }
  function about(ctx) {
    ctx.html(header(ctx) + '<h2>About the GamiNet Directory</h2>' +
      '<p>The GamiNet Directory is a hand-compiled index of every site on Gami Net. Each listing is visited and described by an editor before it appears here.</p>' +
      '<h2>How addresses work</h2><p>Every site on the network ends in <b>.ou</b>. Type an address such as <tt>fountaincam.ou</tt> into the Address bar, or a deeper page such as <tt>marmotnationalism.ou/referendum</tt>. If you type ordinary words instead, Gami Net searches this directory for you.</p>' +
      '<h2>How search works</h2><p>Searches look at each page’s title, address, description and topic keywords. Results that match every word you typed come first, and each result shows why it matched.</p>' +
      '<h2>Sites listed</h2><ul class="dr-res">' + HOME_PAGES.map(function (h) { return '<li>' + siteLine(ctx, h) + ' <span class="dr-url">' + h + '</span></li>'; }).join('') + '</ul>' + footer());
    wire(ctx); ctx.title('About the GamiNet Directory');
  }
  function submit(ctx) {
    ctx.html(header(ctx) + '<h2>Submit a Site</h2><p>Thank you for your interest. <b>Submissions are closed</b> while our editors finish surveying the network. All nine .ou sites currently on Gami Net are already listed.</p><p>' + ctx.link('directory.ou', 'Return to the Directory') + '</p>' + footer());
    wire(ctx); ctx.title('GamiNet Directory: Submit a Site');
  }

  GN.site('directory.ou', {
    name: 'directory', title: 'GamiNet Directory', css: CSS,
    icon: function (c) { drawIcon({ getContext: function () { return c; } }, 'directory.ou', 16); },
    render: function (ctx) {
      var p = ctx.path;
      if (p === '/') return home(ctx);
      if (p === '/search') return results(ctx);
      if (p.indexOf('/category/') === 0) return category(ctx, p.slice(10));
      if (p === '/new') return whatsNew(ctx);
      if (p === '/about') return about(ctx);
      if (p === '/submit') return submit(ctx);
      if (p === '/random') { randomSite(ctx); return; }
      ctx.notFound();
    }
  });
})();
