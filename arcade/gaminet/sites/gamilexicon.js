/* gamilexicon.ou — Gami Lexicon: the Gami Dictionary online. Entries reproduced as written in the Gami Dictionary. */
(function () {
  var GN = window.GAMINET; if (!GN) return;
  var CSS = [
    '.gn-gamilexicon{background:#dfe3ea;color:#1a1a2a;font:12px/1.5 Verdana,Geneva,sans-serif;padding:8px 4px}',
    '.gn-gamilexicon a{color:#1d2f8e}.gn-gamilexicon a:visited{color:#5a2a7a}.gn-gamilexicon a:hover{color:#a01818}',
    '.gn-gamilexicon .gl-pg{max-width:780px;margin:0 auto;background:#fff;border:1px solid #9aa2b4}',
    '.gn-gamilexicon .gl-strip{background:#1d2f5e;color:#c9d2ea;font:10px Verdana;padding:3px 10px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}.gn-gamilexicon .gl-strip a{color:#fff;text-decoration:none;margin-left:10px}.gn-gamilexicon .gl-strip a:hover{text-decoration:underline}',
    '.gn-gamilexicon .gl-head{display:flex;align-items:center;gap:14px;padding:12px 14px 8px;flex-wrap:wrap}',
    '.gn-gamilexicon .gl-logo{display:flex;align-items:center;gap:8px;text-decoration:none}',
    '.gn-gamilexicon .gl-logo b{font:bold 30px/1 Georgia,"Times New Roman",serif;color:#a01818;letter-spacing:-1px}.gn-gamilexicon .gl-logo b i{font-style:normal;color:#1d2f5e}',
    '.gn-gamilexicon .gl-logo small{display:block;font:italic 11px Georgia,serif;color:#556;margin-top:3px;letter-spacing:.5px}',
    '.gn-gamilexicon form.gl-q{margin-left:auto;background:#eef1f7;border:1px solid #b5bccb;padding:6px 8px;font-size:11px}',
    '.gn-gamilexicon form.gl-q label{font-weight:bold;color:#1d2f5e;margin-right:4px}.gn-gamilexicon form.gl-q input[type=search]{font:13px Verdana;width:170px;border:2px inset #ccc;padding:2px 3px}',
    '.gn-gamilexicon form.gl-q select{font:11px Verdana}.gn-gamilexicon form.gl-q button,.gn-gamilexicon .gl-btn{font:bold 11px Verdana;background:linear-gradient(180deg,#fff,#d6dbe6);border:1px solid #6a7290;border-radius:2px;padding:2px 8px;cursor:pointer;color:#1d2f5e}',
    '.gn-gamilexicon .gl-tabs{display:flex;gap:2px;padding:0 14px;border-bottom:3px solid #a01818}',
    '.gn-gamilexicon .gl-tabs a{font:bold 11px Verdana;text-decoration:none;color:#1d2f5e;background:#e3e7f0;border:1px solid #9aa2b4;border-bottom:0;padding:4px 12px 3px;border-radius:4px 4px 0 0}',
    '.gn-gamilexicon .gl-tabs a.on{background:#a01818;color:#fff;border-color:#a01818}',
    '.gn-gamilexicon .gl-az{padding:5px 14px;background:#f6f7fa;border-bottom:1px solid #d5d9e2;font:bold 11px Verdana;letter-spacing:1px;word-spacing:3px}.gn-gamilexicon .gl-az span{color:#b5bccb}.gn-gamilexicon .gl-az a.on{background:#a01818;color:#fff;padding:0 3px;text-decoration:none}',
    '.gn-gamilexicon table.gl-lay{width:100%;border-collapse:collapse}.gn-gamilexicon td.gl-side{width:170px;vertical-align:top;background:#f6f7fa;border-right:1px solid #d5d9e2;padding:10px 8px;font-size:11px}',
    '.gn-gamilexicon td.gl-main{vertical-align:top;padding:12px 18px 18px}',
    '.gn-gamilexicon .gl-side h4{margin:10px 0 4px;font:bold 10px Verdana;letter-spacing:1px;text-transform:uppercase;color:#a01818;border-bottom:1px solid #d5d9e2;padding-bottom:2px}.gn-gamilexicon .gl-side h4:first-child{margin-top:0}',
    '.gn-gamilexicon .gl-side ol{margin:0;padding-left:20px}.gn-gamilexicon .gl-side li{margin:1px 0}.gn-gamilexicon .gl-side li.on a{font-weight:bold;color:#a01818;text-decoration:none}',
    '.gn-gamilexicon h1{font:bold 22px Georgia,serif;color:#1d2f5e;margin:0 0 6px}',
    '.gn-gamilexicon h2{font:bold 11px Verdana;letter-spacing:1px;text-transform:uppercase;color:#a01818;margin:16px 0 5px;border-bottom:1px dotted #b5bccb;padding-bottom:2px}',
    '.gn-gamilexicon .gl-hw{font:bold 34px/1.05 Georgia,"Times New Roman",serif;color:#1a1a2a;margin:2px 0 2px}',
    '.gn-gamilexicon .gl-meta{font-size:10px;color:#667;margin-bottom:10px}',
    '.gn-gamilexicon .gl-def{font:15px/1.55 Georgia,serif;margin:0 0 8px;color:#111}',
    '.gn-gamilexicon .gl-def b.n{font:bold 11px Verdana;color:#fff;background:#1d2f5e;padding:0 5px;margin-right:6px;vertical-align:2px}',
    '.gn-gamilexicon ul.gl-ex{list-style:none;margin:0;padding:0}.gn-gamilexicon ul.gl-ex li{font:italic 14px Georgia,serif;color:#333;padding:3px 0 3px 14px;border-left:3px solid #e2c2c2;margin:0 0 4px}',
    '.gn-gamilexicon table.gl-forms{border-collapse:collapse;margin:4px 0 8px;font:14px Georgia,serif}.gn-gamilexicon .gl-forms td{border:1px solid #d5d9e2;padding:4px 10px}.gn-gamilexicon .gl-forms td:first-child{font-weight:bold;background:#f6f7fa}',
    '.gn-gamilexicon .gl-pn{display:flex;justify-content:space-between;gap:8px;margin-top:18px;padding-top:6px;border-top:1px solid #d5d9e2;font-size:11px}',
    '.gn-gamilexicon .gl-wotd{border:1px solid #b5bccb;background:linear-gradient(180deg,#fff,#f2f4f9);padding:8px 10px;margin:0 0 12px}',
    '.gn-gamilexicon .gl-wotd .l{font:bold 9px Verdana;letter-spacing:2px;color:#a01818;text-transform:uppercase}.gn-gamilexicon .gl-wotd .w{font:bold 24px Georgia,serif;color:#1d2f5e;text-decoration:none}',
    '.gn-gamilexicon .gl-wotd.s{padding:6px}.gn-gamilexicon .gl-wotd.s .w{font-size:17px}',
    '.gn-gamilexicon table.gl-list{width:100%;border-collapse:collapse;font-size:12px}.gn-gamilexicon .gl-list td{border-bottom:1px solid #e3e7f0;padding:5px 4px;vertical-align:top}.gn-gamilexicon .gl-list td:first-child{width:130px;font:bold 14px Georgia,serif;white-space:nowrap}.gn-gamilexicon .gl-list tr:hover td{background:#f6f7fa}',
    '.gn-gamilexicon mark{background:#fff2a8;color:inherit;padding:0 1px}',
    '.gn-gamilexicon .gl-full li{margin:0 0 12px}.gn-gamilexicon .gl-full .t{font:bold 16px Georgia,serif}.gn-gamilexicon .gl-full .d{font:14px/1.5 Georgia,serif}.gn-gamilexicon .gl-full .e{font:italic 13px Georgia,serif;color:#333;margin-left:18px}',
    '.gn-gamilexicon .gl-note{font-size:11px;color:#556;background:#f6f7fa;border:1px solid #d5d9e2;padding:5px 8px;margin:10px 0}',
    '.gn-gamilexicon .gl-foot{background:#f6f7fa;border-top:1px solid #d5d9e2;font-size:10px;color:#667;text-align:center;padding:8px}',
    '@media (max-width:560px){.gn-gamilexicon td.gl-side{display:none}.gn-gamilexicon form.gl-q{margin-left:0;width:100%;box-sizing:border-box}.gn-gamilexicon form.gl-q input[type=search]{width:120px}.gn-gamilexicon .gl-hw{font-size:28px}}'
  ].join('\n');

  /* The dictionary, in the order and wording of the Gami Dictionary. */
  var D = [
    { id: 'giga', w: 'Giga', d: ['good, impressive, hard, elite, beautiful, powerful, unusually successful.'], ex: ['“That architecture is giga.”', '“Giga fit.”', '“This beat is giga.”'] },
    { id: 'ill', w: 'Ill', d: ['bad, disturbing, ugly, embarrassing, spiritually unpleasant, or just deeply off.', 'Can also intensify another negative term.'], ex: ['“That whole situation is ill.”', '“Ill footage.”'] },
    { id: 'audio', w: 'Audio', d: ['bad music, bad sound, or something sonically embarrassing.', 'Works especially well when said as though the mere existence of sound is incriminating.'], ex: ['“Turn this audio off.”'] },
    { id: 'footage', w: 'Footage', d: ['embarrassing, cursed, awkward, or incriminating visual material.', 'Can refer to a person, outfit, event, screenshot, or actual video.'], ex: ['“This is insane footage.”'] },
    { id: 'ill-combinations', w: 'Ill combinations', d: ['compound words built from ill + another noun.'], forms: [['Illdio', 'ill audio'], ['Ill footage', 'cursed or terrible visuals'], ['Ill files', 'embarrassing material']], after: 'Basically a productive prefix system.' },
    { id: 'malware', w: 'Malware', d: ['something actively contaminating the environment: terrible music, ideology, aesthetics, content, or behavior that feels infectious.'], ex: ['“This playlist is malware.”'] },
    { id: 'trojan-horse', w: 'Trojan Horse', d: ['something that looks harmless or appealing but secretly imports something awful.'], ex: ['“That trend is a Trojan horse for slop.”'] },
    { id: 'matrix', w: 'Matrix', d: ['artificial, fake, conformist, manufactured, spiritually dead, overly institutional, or trapped inside consensus reality.'], ex: ['“That whole scene is Matrix.”'] },
    { id: 'files', w: 'Files', d: ['embarrassing, incriminating, bizarre, or cursed material associated with someone.', 'Can also mean accumulated evidence of weird behavior.'], ex: ['“Bro has files.”', '“These are evil files.”'] },
    { id: 'reeks', w: 'Reeks', d: ['radiates an unmistakable negative quality.', 'Usually stronger than merely “seems like.”'], ex: ['“This reeks of DIT.”', '“That fit reeks.”'] },
    { id: 'coded', w: 'Coded', d: ['carries the vibe, characteristics, or associations of something without literally being that thing.', 'Extremely flexible modifier.'], ex: ['“Mall-coded.”', '“Matrix-coded.”', '“2011-coded.”'] },
    { id: 'dit', w: 'DIT', d: ['Dead Internet Theory.', 'Used for content, aesthetics, people, trends, or environments that feel algorithmic, synthetic, bot-generated, recycled, engagement-farmed, or culturally lifeless.'], ex: ['“That whole page is DIT.”', '“DIT clothing.”'] }
  ];
  var BY = {}; D.forEach(function (e, i) { e.n = i + 1; BY[e.id] = e; });
  /* every form a reader might type, mapped to its entry */
  var FORMS = {}; D.forEach(function (e) { FORMS[e.w.toLowerCase()] = e.id; (e.forms || []).forEach(function (f) { FORMS[f[0].toLowerCase()] = e.id; }); });
  FORMS['dead internet theory'] = 'dit';
  function text(e) { return [e.w].concat(e.d, e.ex || [], (e.forms || []).map(function (f) { return f.join(' = '); }), e.after || []).join(' '); }
  function plain(e) { return e.d.join(' '); }
  /* cross-references: other headwords that appear in this entry's own text */
  function seeAlso(e) {
    var t = ' ' + text(e).toLowerCase().replace(/[^a-z0-9 -]/g, ' ') + ' ';
    return D.filter(function (o) { if (o === e) return false; var w = o.w.toLowerCase(); return t.indexOf(' ' + w + ' ') >= 0 || t.indexOf(' ' + w + '-') >= 0 || (o.id === 'ill-combinations' && /\bill (footage|files|audio)|illdio/.test(t)); });
  }
  function link(e, label) { return '<a href="#" data-go="gamilexicon.ou/word/' + e.id + '">' + (label || e.w) + '</a>'; }
  function dayNo() { var d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
  function wotd() { return D[(dayNo() * 7 + 3) % D.length]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lev(a, b) { var m = [], i, j; for (i = 0; i <= b.length; i++) m[i] = [i]; for (j = 0; j <= a.length; j++) m[0][j] = j; for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++) m[i][j] = Math.min(m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1), m[i][j - 1] + 1, m[i - 1][j] + 1); return m[b.length][a.length]; }
  var book = '<svg width="38" height="34" viewBox="0 0 38 34" aria-hidden="true"><path d="M19 7 C14 3 7 3 2 5 V30 C7 28 14 28 19 32 Z" fill="#a01818"/><path d="M19 7 C24 3 31 3 36 5 V30 C31 28 24 28 19 32 Z" fill="#1d2f5e"/><path d="M5 9 C9 8 13 8 16 10 M5 14 C9 13 13 13 16 15 M5 19 C9 18 13 18 16 20 M22 10 C25 8 29 8 33 9 M22 15 C25 13 29 13 33 14 M22 20 C25 18 29 18 33 19" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/></svg>';

  function frame(ctx, tab, cur, main) {
    var letters = {}; D.forEach(function (e) { letters[e.w[0].toUpperCase()] = 1; });
    var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (c) { return letters[c] ? '<a href="#" data-go="gamilexicon.ou/browse/' + c.toLowerCase() + '"' + (tab === 'az:' + c ? ' class="on"' : '') + '>' + c + '</a>' : '<span>' + c + '</span>'; }).join(' ');
    var recent = ctx.store.get('recent', []).filter(function (id) { return BY[id]; });
    var w = wotd();
    function t(k, href, label) { return '<a href="#" data-go="gamilexicon.ou' + href + '"' + (tab === k || (k === 'az' && tab.indexOf('az') === 0) ? ' class="on"' : '') + '>' + label + '</a>'; }
    return '<div class="gl-pg"><div class="gl-strip"><span>The Gami Dictionary online · ' + D.length + ' entries</span><span><a href="#" data-go="gamilexicon.ou">Home</a><a href="#" data-go="gamilexicon.ou/all">Full Dictionary</a><a href="#" class="gl-rand">Random Word</a></span></div>' +
      '<div class="gl-head"><a href="#" data-go="gamilexicon.ou" class="gl-logo">' + book + '<span><b>Gami<i>Lexicon</i></b><small>The Gami Dictionary</small></span></a>' +
      '<form class="gl-q" role="search"><label for="gl-in">Look up</label><input type="search" id="gl-in" name="q" autocomplete="off" value="' + esc(ctx.query.q || '') + '" placeholder="a word"> <select name="in" aria-label="Search in"><option value="">Headwords</option><option value="text"' + (ctx.query.in === 'text' ? ' selected' : '') + '>Full text</option></select> <button type="submit">Search</button></form></div>' +
      '<div class="gl-tabs">' + t('home', '', 'Dictionary') + t('az', '/browse', 'A–Z') + t('all', '/all', 'Full Dictionary') + t('wotd', '/word-of-the-day', 'Word of the Day') + '</div>' +
      '<div class="gl-az">' + L + '</div>' +
      '<table class="gl-lay"><tr><td class="gl-side"><h4>Browse the Dictionary</h4><ol>' + D.map(function (e) { return '<li' + (cur === e.id ? ' class="on"' : '') + '>' + link(e) + '</li>'; }).join('') + '</ol>' +
      '<h4>Word of the Day</h4><div class="gl-wotd s">' + link(w).replace('<a ', '<a class="w" ') + '<div>' + esc(w.d[0]) + '</div></div>' +
      (recent.length ? '<h4>Recent Lookups</h4>' + recent.map(function (id) { return link(BY[id]); }).join('<br>') : '') + '</td>' +
      '<td class="gl-main">' + main + '</td></tr></table>' +
      '<div class="gl-foot">Gami Lexicon · Entries as written in the Gami Dictionary · ' + GN.link('directory.ou/category/arts', 'Listed in the GamiNet Directory') + '</div></div>';
  }
  function wire(ctx) {
    var R = ctx.root, f = R.querySelector('form.gl-q');
    f.addEventListener('submit', function (e) { e.preventDefault(); var q = f.elements.q.value.trim(); if (!q) return; ctx.go('gamilexicon.ou/search?q=' + encodeURIComponent(q) + (f.elements['in'].value ? '&in=text' : '')); });
    R.querySelectorAll('.gl-rand').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var cur = ctx.path.split('/').pop(), pool = D.filter(function (x) { return x.id !== cur; }); ctx.go('gamilexicon.ou/word/' + pool[Math.floor(Math.random() * pool.length)].id); }); });
  }

  function entryHTML(e, big) {
    var defs = e.d.map(function (p, i) { return '<p class="gl-def">' + (i === 0 && big ? '<b class="n">def.</b>' : '') + esc(p) + '</p>'; }).join('');
    var h = defs;
    if (e.forms) h += '<table class="gl-forms">' + e.forms.map(function (f) { return '<tr><td id="gl-f-' + f[0].toLowerCase().replace(/\s+/g, '-') + '">' + esc(f[0]) + '</td><td>= ' + esc(f[1]) + '</td></tr>'; }).join('') + '</table>' + (e.after ? '<p class="gl-def">' + esc(e.after) + '</p>' : '');
    if (e.ex) h += (big ? '<h2>Examples</h2>' : '') + '<ul class="gl-ex">' + e.ex.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    return h;
  }
  function word(ctx, id, from) {
    var e = BY[id]; if (!e) return notFound(ctx, id);
    var rec = ctx.store.get('recent', []).filter(function (x) { return x !== id; }); rec.unshift(id); ctx.store.set('recent', rec.slice(0, 6));
    var prev = D[(e.n - 2 + D.length) % D.length], next = D[e.n % D.length], sa = seeAlso(e);
    var main = (from ? '<div class="gl-note">Showing the entry for <b>' + esc(from) + '</b>.</div>' : '') +
      '<div class="gl-hw">' + esc(e.w) + '</div><div class="gl-meta">Entry ' + e.n + ' of ' + D.length + '</div>' + entryHTML(e, true) +
      (sa.length ? '<h2>See also</h2><p>' + sa.map(function (o) { return link(o); }).join(' · ') + '</p>' : '') +
      '<div class="gl-pn"><span>« ' + link(prev) + '</span><a href="#" data-go="gamilexicon.ou/all?w=' + e.id + '">View in full dictionary</a><span>' + link(next) + ' »</span></div>';
    ctx.html(frame(ctx, 'word', id, main)); wire(ctx);
    ctx.title(e.w + ' — Gami Lexicon');
  }
  function home(ctx) {
    var w = wotd();
    var main = '<div class="gl-wotd"><div class="l">Word of the Day</div>' + link(w).replace('<a ', '<a class="w" ') + '<div class="gl-def" style="margin-top:4px">' + esc(plain(w)) + '</div>' + (w.ex ? '<div style="font:italic 13px Georgia,serif;color:#444">' + esc(w.ex[0]) + '</div>' : '') + '</div>' +
      '<h1>The Gami Dictionary</h1><p>Look up any word in the box above, browse by letter, or read the ' + GN.link('gamilexicon.ou/all', 'full dictionary') + ' on one page.</p>' +
      '<h2>All entries</h2><table class="gl-list">' + D.map(function (e) { return '<tr><td>' + link(e) + '</td><td>' + esc(e.d[0]) + '</td></tr>'; }).join('') + '</table>';
    ctx.html(frame(ctx, 'home', null, main)); wire(ctx);
    ctx.title('Gami Lexicon — The Gami Dictionary');
  }
  function browse(ctx, letter) {
    var sorted = D.slice().sort(function (a, b) { return a.w.toLowerCase() < b.w.toLowerCase() ? -1 : 1; });
    var groups = {}; sorted.forEach(function (e) { var c = e.w[0].toUpperCase(); (groups[c] = groups[c] || []).push(e); });
    var keys = letter ? [letter.toUpperCase()] : Object.keys(groups).sort();
    if (letter && !groups[keys[0]]) return notFound(ctx, letter);
    var main = '<h1>' + (letter ? 'Words beginning with ' + keys[0] : 'Browse A–Z') + '</h1>' +
      keys.map(function (k) { return '<h2>' + k + '</h2><table class="gl-list">' + groups[k].map(function (e) { return '<tr><td>' + link(e) + '</td><td>' + esc(e.d[0]) + '</td></tr>'; }).join('') + '</table>'; }).join('') +
      (letter ? '<p style="margin-top:10px">' + GN.link('gamilexicon.ou/browse', 'All letters') + '</p>' : '');
    ctx.html(frame(ctx, letter ? 'az:' + keys[0] : 'az', null, main)); wire(ctx);
    ctx.title((letter ? keys[0] + ' — ' : 'A–Z — ') + 'Gami Lexicon');
  }
  function full(ctx) {
    var main = '<h1>Gami Dictionary</h1><p style="font-size:11px;color:#667">The complete dictionary, in its original order.</p><ul class="gl-full">' + D.map(function (e) {
      return '<li id="gl-' + e.id + '"><span class="t">' + link(e) + '</span> — <span class="d">' + esc(e.d.join(' ')) + '</span>' +
        (e.ex ? '<div class="e">' + e.ex.map(esc).join(' / ') + '</div>' : '') +
        (e.forms ? e.forms.map(function (f) { return '<div class="e" style="font-style:normal">' + esc(f[0]) + ' = ' + esc(f[1]) + '.</div>'; }).join('') + '<div class="e" style="font-style:normal">' + esc(e.after) + '</div>' : '') + '</li>';
    }).join('') + '</ul>';
    ctx.html(frame(ctx, 'all', null, main)); wire(ctx);
    var target = String(ctx.query.w || '');
    if (target) { var el = ctx.root.querySelector('#gl-' + target.replace(/[^a-z0-9-]/g, '')); if (el) { el.scrollIntoView({ block: 'start' }); el.style.background = '#fff8d0'; } }
    ctx.title('Full Dictionary — Gami Lexicon');
  }
  function wordOfDay(ctx) {
    var w = wotd(), n = dayNo(), next = D[((n + 1) * 7 + 3) % D.length];
    var main = '<h1>Word of the Day</h1><div class="gl-wotd"><div class="l">' + new Date().toDateString() + '</div>' + link(w).replace('<a ', '<a class="w" ') + entryHTML(w, false) + '</div>' +
      '<p style="font-size:11px">A new word from the dictionary is featured every day. Tomorrow: ' + link(next) + '.</p>';
    ctx.html(frame(ctx, 'wotd', w.id, main)); wire(ctx);
    ctx.title('Word of the Day — Gami Lexicon');
  }
  function search(ctx) {
    var q = String(ctx.query.q || '').trim(), ql = q.toLowerCase(), full = ctx.query.in === 'text';
    if (!q) return home(ctx);
    if (!full && FORMS[ql]) return word(ctx, FORMS[ql], q.toLowerCase() !== BY[FORMS[ql]].w.toLowerCase() ? q : null);
    var head = D.filter(function (e) { return e.w.toLowerCase().indexOf(ql) === 0 || (e.forms || []).some(function (f) { return f[0].toLowerCase().indexOf(ql) === 0; }); });
    var body = D.filter(function (e) { return head.indexOf(e) < 0 && text(e).toLowerCase().indexOf(ql) >= 0; });
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    function hl(s) { return esc(s).replace(re, '<mark>$1</mark>'); }
    function row(e) { var t = text(e), i = t.toLowerCase().indexOf(ql), snip = i < 0 ? e.d[0] : (i > 40 ? '…' : '') + t.slice(Math.max(0, i - 40), i + 70) + (i + 70 < t.length ? '…' : ''); return '<tr><td>' + link(e) + '</td><td>' + hl(snip) + '</td></tr>'; }
    var main = '<h1>Results for “' + esc(q) + '”</h1>';
    if (head.length) main += '<h2>Headwords</h2><table class="gl-list">' + head.map(row).join('') + '</table>';
    if (body.length) main += '<h2>Found in definitions and examples</h2><table class="gl-list">' + body.map(row).join('') + '</table>';
    if (!head.length && !body.length) {
      var near = D.map(function (e) { return { e: e, d: lev(ql, e.w.toLowerCase()) }; }).sort(function (a, b) { return a.d - b.d; }).filter(function (x) { return x.d <= Math.max(2, Math.floor(ql.length / 2)); }).slice(0, 3);
      main += '<p>No entry was found for <b>' + esc(q) + '</b>.</p>' + (near.length ? '<p>Did you mean: ' + near.map(function (x) { return link(x.e); }).join(', ') + '?</p>' : '') + '<p>Try a ' + GN.link('gamilexicon.ou/search?q=' + encodeURIComponent(q) + '&in=text', 'full-text search') + ' or ' + GN.link('gamilexicon.ou/browse', 'browse A–Z') + '.</p>';
    }
    ctx.html(frame(ctx, 'home', null, main)); wire(ctx);
    ctx.title('“' + q + '” — Gami Lexicon');
  }
  function notFound(ctx, what) {
    var main = '<h1>Entry not found</h1><p>There is no entry for <b>' + esc(what) + '</b> in this dictionary.</p><p>' + GN.link('gamilexicon.ou/browse', 'Browse A–Z') + ' or ' + GN.link('gamilexicon.ou/all', 'read the full dictionary') + '.</p>';
    ctx.html(frame(ctx, 'home', null, main)); wire(ctx); ctx.title('Not found — Gami Lexicon');
  }

  GN.site('gamilexicon.ou', {
    name: 'gamilexicon', title: 'Gami Lexicon', css: CSS,
    icon: function (c) { c.fillStyle = '#fff'; c.fillRect(0, 0, 16, 16); c.fillStyle = '#a01818'; c.beginPath(); c.moveTo(8, 4); c.quadraticCurveTo(5, 2, 1, 3); c.lineTo(1, 14); c.quadraticCurveTo(5, 13, 8, 15); c.fill(); c.fillStyle = '#1d2f5e'; c.beginPath(); c.moveTo(8, 4); c.quadraticCurveTo(11, 2, 15, 3); c.lineTo(15, 14); c.quadraticCurveTo(11, 13, 8, 15); c.fill(); },
    render: function (ctx) {
      var p = ctx.path;
      if (p === '/') return home(ctx);
      if (p.indexOf('/word/') === 0) return word(ctx, p.slice(6));
      if (p === '/browse') return browse(ctx, '');
      if (/^\/browse\/[a-z]$/.test(p)) return browse(ctx, p.slice(8));
      if (p === '/all') return full(ctx);
      if (p === '/word-of-the-day') return wordOfDay(ctx);
      if (p === '/search') return search(ctx);
      ctx.notFound();
    }
  });
})();
