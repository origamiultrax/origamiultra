/* ==========================================================================
   ULTRA SEARCH v1 — site search for origamiultra.com
   - Opens from any [data-ou-search] element, the "/" key, or Ctrl/Cmd + K
   - The index (search/index.json) loads only when search is first used
   - Typo-tolerant, ranked, grouped results that open the exact thing:
     a track on its album, a photo in its gallery, a book or script on the page
   - Also handles incoming deep links: #v= (visuals) #n= (galleries) #uw= (concepts)
   ========================================================================== */
(function () {
  'use strict';
  if (window.OUSearch) return;

  var VERSION = '2';
  var SCRIPT = document.currentScript;
  var ROOT = (function () {
    try { return new URL('../', SCRIPT && SCRIPT.src ? SCRIPT.src : location.href).href; }
    catch (e) { return ''; }
  })();
  var INDEX_URL = ROOT + 'search/index.json?v=' + VERSION;
  var RECENT_KEY = 'ou_search_recent_v1';
  var PAGE = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  /* ------------------------------------------------------------------ styles */
  var CSS = [
    '.ous{position:fixed;inset:0;z-index:9500;display:none;font-family:"VT323","Share Tech Mono",monospace;color:#e9ffe4;-webkit-text-size-adjust:100%;}',
    '.ous.open{display:block;}',
    '.ous *{box-sizing:border-box;margin:0;padding:0;}',
    '.ous-back{position:absolute;inset:0;background:rgba(0,0,0,.74);background-image:repeating-linear-gradient(to bottom,rgba(57,255,20,.05) 0,rgba(57,255,20,.05) 1px,transparent 1px,transparent 3px);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);}',
    '.ous-win{position:absolute;left:50%;top:6vh;transform:translateX(-50%);width:min(860px,calc(100vw - 32px));max-height:88vh;display:flex;flex-direction:column;background:#040904;border:3px solid;border-color:#5dff3e #1d6b12 #1d6b12 #5dff3e;box-shadow:0 0 0 1px #000,0 0 28px rgba(57,255,20,.45),0 0 80px rgba(57,255,20,.18),12px 14px 0 rgba(0,0,0,.6);animation:ousIn .18s steps(4,end);}',
    '@keyframes ousIn{from{transform:translateX(-50%) scale(.94);opacity:0}to{transform:translateX(-50%) scale(1);opacity:1}}',
    '.ous-bar{display:flex;align-items:center;gap:8px;padding:4px 6px 4px 10px;background:linear-gradient(90deg,#0d4a10,#06261a 55%,#0a1d3a);border-bottom:2px solid #1d6b12;font-family:"Silkscreen",monospace;font-size:11px;letter-spacing:2px;color:#d4ffcf;text-shadow:0 0 6px rgba(57,255,20,.7);user-select:none;-webkit-user-select:none;}',
    '.ous-bar b{font-weight:700;color:#fff;}',
    '.ous-bar .ous-ver{color:#7dff6a;opacity:.75;}',
    '.ous-x{margin-left:auto;width:26px;height:22px;display:inline-flex;align-items:center;justify-content:center;background:#c0c0c0;color:#000;border:2px solid;border-color:#fff #404040 #404040 #fff;font:700 13px/1 Tahoma,Verdana,sans-serif;cursor:pointer;text-shadow:none;}',
    '.ous-x:active{border-color:#404040 #fff #fff #404040;}',
    '.ous-head{padding:14px 18px 10px;border-bottom:1px solid rgba(57,255,20,.25);background:radial-gradient(ellipse at 50% 0,rgba(57,255,20,.12),transparent 70%);}',
    '.ous-logo{text-align:center;font-family:"TS Block Bold","Press Start 2P",sans-serif;font-weight:700;font-size:30px;letter-spacing:5px;line-height:1;user-select:none;-webkit-user-select:none;transition:font-size .15s;}',
    '.ous-logo span{display:inline-block;text-shadow:0 0 6px currentColor,0 0 16px currentColor;}',
    '.ous-tag{margin-top:7px;text-align:center;font-family:"Silkscreen",monospace;font-size:10px;letter-spacing:3px;color:#ffb347;text-shadow:0 0 5px rgba(255,179,71,.6);}',
    '.ous.has-q .ous-logo{font-size:17px;letter-spacing:3px;}',
    '.ous.has-q .ous-tag{display:none;}',
    '.ous-form{display:flex;gap:8px;margin-top:12px;}',
    '.ous-field{position:relative;flex:1;min-width:0;display:flex;align-items:center;background:#000;border:2px solid;border-color:#0f3a0b #5dff3e #5dff3e #0f3a0b;box-shadow:inset 0 0 14px rgba(57,255,20,.12);}',
    '.ous-field:focus-within{box-shadow:inset 0 0 14px rgba(57,255,20,.18),0 0 12px rgba(57,255,20,.55);}',
    '.ous-glass{display:flex;align-items:center;padding:0 6px 0 11px;color:#39ff14;filter:drop-shadow(0 0 4px #39ff14);}',
    '.ous-glass svg{width:16px;height:16px;display:block;}',
    '.ous-input{flex:1;min-width:0;height:42px;padding:0 8px 0 4px;background:transparent;border:0;outline:0;color:#d4ffcf;font-family:"VT323",monospace;font-size:24px;letter-spacing:1px;caret-color:#39ff14;-webkit-appearance:none;appearance:none;border-radius:0;}',
    '.ous-input::placeholder{color:#3f8f35;opacity:1;}',
    '.ous-input::-webkit-search-cancel-button{display:none;}',
    '.ous-clear{display:none;margin-right:6px;padding:2px 7px;background:transparent;border:1px solid #2a7a20;color:#7dff6a;font-family:"Silkscreen",monospace;font-size:9px;letter-spacing:1px;cursor:pointer;}',
    '.ous.has-q .ous-clear{display:block;}',
    '.ous-go{flex:0 0 auto;padding:0 16px;background:#39ff14;color:#000;border:3px solid;border-color:#b6ff9f #157a07 #157a07 #b6ff9f;font-family:"Silkscreen",monospace;font-weight:700;font-size:12px;letter-spacing:2px;cursor:pointer;box-shadow:0 0 14px rgba(57,255,20,.55);}',
    '.ous-go:active{border-color:#157a07 #b6ff9f #b6ff9f #157a07;}',
    '.ous-tabs{display:flex;gap:6px;margin-top:10px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;}',
    '.ous-tabs::-webkit-scrollbar{display:none;}',
    '.ous-tab{flex:0 0 auto;padding:4px 9px;background:rgba(0,0,0,.6);border:1px solid #1d5a16;color:#8fdc84;font-family:"Silkscreen",monospace;font-size:10px;letter-spacing:1.5px;cursor:pointer;white-space:nowrap;}',
    '.ous-tab i{font-style:normal;opacity:.7;margin-left:4px;}',
    '.ous-tab.on{color:#000;background:var(--ous-c,#39ff14);border-color:var(--ous-c,#39ff14);box-shadow:0 0 10px var(--ous-c,#39ff14);}',
    '.ous-tab.zero{opacity:.35;}',
    '.ous:not(.has-q) .ous-tabs{display:none;}',
    '.ous-stat{padding:7px 18px;font-family:"Silkscreen",monospace;font-size:10px;letter-spacing:1.5px;color:#7dff6a;border-bottom:1px dashed rgba(57,255,20,.2);min-height:28px;}',
    '.ous-stat b{color:#fff;font-weight:700;}',
    '.ous-stat em{font-style:normal;color:#ffd700;}',
    '.ous-body{flex:1;min-height:120px;overflow-y:auto;overscroll-behavior:contain;padding:6px 10px 14px;scrollbar-width:thin;scrollbar-color:#2a7a20 #020502;-webkit-overflow-scrolling:touch;}',
    '.ous-body::-webkit-scrollbar{width:10px;}',
    '.ous-body::-webkit-scrollbar-track{background:#020502;}',
    '.ous-body::-webkit-scrollbar-thumb{background:#1f6b17;border:2px solid #020502;}',
    '.ous-grp{margin-top:10px;}',
    '.ous-gh{display:flex;align-items:center;gap:10px;padding:6px 8px 5px;font-family:"Silkscreen",monospace;font-size:11px;font-weight:700;letter-spacing:3px;color:var(--ous-c,#39ff14);text-shadow:0 0 6px var(--ous-c,#39ff14);}',
    '.ous-gh:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--ous-c,#39ff14),transparent);opacity:.55;}',
    '.ous-gh i{font-style:normal;font-weight:400;opacity:.7;letter-spacing:1px;}',
    '.ous-r{position:relative;display:flex;align-items:stretch;gap:0;border:1px solid transparent;border-left:3px solid transparent;}',
    '.ous-r.sel{background:linear-gradient(90deg,rgba(57,255,20,.13),rgba(57,255,20,.03));border-color:rgba(57,255,20,.35);border-left-color:var(--ous-c,#39ff14);box-shadow:0 0 14px rgba(57,255,20,.12);}',
    '.ous-a{flex:1;min-width:0;display:flex;align-items:center;gap:12px;padding:8px 8px;color:inherit;text-decoration:none;cursor:pointer;-webkit-tap-highlight-color:transparent;}',
    '.ous-th{flex:0 0 auto;width:52px;height:52px;position:relative;overflow:hidden;background:#0a140a;border:1px solid rgba(57,255,20,.35);box-shadow:0 0 8px rgba(57,255,20,.15);display:flex;align-items:center;justify-content:center;font-family:"Silkscreen",monospace;font-size:20px;color:var(--ous-c,#39ff14);text-shadow:0 0 8px currentColor;}',
    '.ous-th img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}',
    '.ous-th.w{width:76px;height:43px;}',
    '.ous-th.tall{width:40px;height:52px;margin:0 6px;}',
    '.ous-th.glyph{background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.08),#050a05 70%);}',
    '.ous-th .pl{position:absolute;right:2px;bottom:2px;font-size:9px;padding:1px 3px;background:rgba(0,0,0,.75);color:#fff;text-shadow:none;}',
    '.ous-tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;}',
    '.ous-tt{font-family:"VT323",monospace;font-size:22px;line-height:1.02;color:#ecffe8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.ous-mt{font-family:"Silkscreen",monospace;font-size:9.5px;letter-spacing:1px;color:#8fdc84;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.ous-k{display:inline-block;margin-right:7px;padding:0 4px;border:1px solid var(--ous-c,#39ff14);color:var(--ous-c,#39ff14);font-weight:700;letter-spacing:1px;}',
    '.ous-sn{font-family:"VT323",monospace;font-size:17px;line-height:1.08;color:#b4c9b0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}',
    '.ous mark{background:rgba(255,215,0,.22);color:#ffd700;text-shadow:0 0 6px rgba(255,215,0,.7);padding:0 1px;}',
    '.ous-act{flex:0 0 auto;display:flex;align-items:center;gap:6px;padding:0 8px 0 0;}',
    '.ous-btn{padding:5px 8px;background:rgba(0,0,0,.7);border:2px solid;border-color:#5dff3e #1d6b12 #1d6b12 #5dff3e;color:#39ff14;font-family:"Silkscreen",monospace;font-size:9px;font-weight:700;letter-spacing:1px;cursor:pointer;white-space:nowrap;text-decoration:none;line-height:1.2;}',
    '.ous-btn:hover,.ous-btn:focus-visible{background:#39ff14;color:#000;outline:0;}',
    '.ous-btn.done{color:#ffd700;border-color:#ffd700 #8a6d00 #8a6d00 #ffd700;}',
    '.ous-top{margin:8px 0 2px;border:1px solid rgba(255,215,0,.45);background:linear-gradient(90deg,rgba(255,215,0,.07),transparent 70%);box-shadow:0 0 18px rgba(255,215,0,.08);}',
    '.ous-top .ous-label{display:block;padding:5px 10px 0;font-family:"Silkscreen",monospace;font-size:9px;letter-spacing:3px;color:#ffd700;text-shadow:0 0 6px rgba(255,215,0,.7);}',
    '.ous-top .ous-th{width:64px;height:64px;}',
    '.ous-top .ous-th.w{width:104px;height:59px;}',
    '.ous-top .ous-th.tall{width:50px;height:64px;}',
    '.ous-top .ous-tt{font-size:28px;}',
    '.ous-more{display:block;margin:4px 0 0 auto;padding:5px 10px;background:transparent;border:1px dashed rgba(57,255,20,.4);color:var(--ous-c,#39ff14);font-family:"Silkscreen",monospace;font-size:9.5px;letter-spacing:1.5px;cursor:pointer;}',
    '.ous-more:hover{border-style:solid;background:rgba(57,255,20,.08);}',
    '.ous-empty{padding:18px 10px 6px;text-align:center;}',
    '.ous-empty h4{font-family:"Silkscreen",monospace;font-size:10px;letter-spacing:3px;color:#ffb347;font-weight:700;margin:14px 0 8px;text-shadow:0 0 5px rgba(255,179,71,.6);}',
    '.ous-empty h4:first-child{margin-top:0;}',
    '.ous-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;}',
    '.ous-chip{padding:5px 10px;background:rgba(0,0,0,.6);border:1px solid #2a7a20;color:#bfffb3;font-family:"VT323",monospace;font-size:19px;line-height:1;cursor:pointer;}',
    '.ous-chip:hover,.ous-chip:focus-visible{background:#39ff14;color:#000;outline:0;}',
    '.ous-chip.rc{border-color:#6b4fa0;color:#e4c8ff;}',
    '.ous-chip.rc:hover{background:#ff4bd8;color:#000;}',
    '.ous-lucky{margin-top:16px;padding:8px 16px;background:#ff4bd8;color:#000;border:3px solid;border-color:#ffb3ef #8a1d72 #8a1d72 #ffb3ef;font-family:"Silkscreen",monospace;font-weight:700;font-size:11px;letter-spacing:2px;cursor:pointer;box-shadow:0 0 16px rgba(255,75,216,.6);}',
    '.ous-none{padding:26px 12px;text-align:center;font-family:"Silkscreen",monospace;font-size:11px;letter-spacing:2px;color:#ff6e6e;line-height:1.8;}',
    '.ous-none .ous-chips{margin-top:12px;}',
    '.ous-load{padding:34px 10px;text-align:center;font-family:"Silkscreen",monospace;font-size:11px;letter-spacing:3px;color:#39ff14;}',
    '.ous-load i{display:inline-block;width:10px;height:14px;margin-left:4px;background:#39ff14;vertical-align:-2px;animation:ousBlink 1s steps(2,end) infinite;}',
    '@keyframes ousBlink{50%{opacity:0}}',
    '.ous-foot{display:flex;align-items:center;gap:14px;padding:6px 14px;border-top:2px solid #1d6b12;background:#020602;font-family:"Silkscreen",monospace;font-size:9px;letter-spacing:1.5px;color:#5fae55;}',
    '.ous-foot kbd{display:inline-block;padding:0 4px;margin-right:3px;border:1px solid #3c8f33;color:#bfffb3;font-family:inherit;font-size:9px;}',
    '.ous-foot .r{margin-left:auto;color:#ffb347;}',
    '.ous-toast{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);padding:6px 12px;background:#000;border:2px solid #39ff14;color:#39ff14;font-family:"Silkscreen",monospace;font-size:10px;letter-spacing:2px;box-shadow:0 0 14px rgba(57,255,20,.6);opacity:0;transition:opacity .25s;pointer-events:none;white-space:nowrap;}',
    '.ous-toast.on{opacity:1;}',
    '.ous-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}',
    '@media (max-width:640px){',
    '  .ous-win{left:0;top:0;transform:none;width:100%;height:100%;max-height:none;border-width:0;box-shadow:none;animation:none;}',
    '  .ous-head{padding:10px 12px 8px;}',
    '  .ous-logo{font-size:22px;letter-spacing:3px;}',
    '  .ous.has-q .ous-logo{display:none;}',
    '  .ous.has-q .ous-form{margin-top:0;}',
    '  .ous-tag{font-size:9px;letter-spacing:2px;}',
    '  .ous-input{font-size:22px;height:44px;}',
    '  .ous-go{padding:0 10px;font-size:11px;}',
    '  .ous-stat{padding:6px 12px;}',
    '  .ous-body{padding:4px 6px 18px;}',
    '  .ous-a{gap:10px;padding:8px 4px;}',
    '  .ous-tt{font-size:21px;}',
    '  .ous-top .ous-tt{font-size:24px;}',
    '  .ous-act{padding-right:4px;}',
    '  .ous-btn .lg{display:none;}',
    '  .ous-foot .k{display:none;}',
    '}',
    '@media (prefers-reduced-motion:reduce){.ous-win{animation:none}.ou-found,.ou-cue,.search-hit,.rw-hit{animation:none!important}}',
    /* deep-link landing highlight, used on the pages themselves */
    '.ou-found{outline:2px solid #00e5ff!important;outline-offset:3px;animation:ouFound 2.6s ease-out 1;}',
    '@keyframes ouFound{0%,35%{box-shadow:0 0 0 4px rgba(0,229,255,.85),0 0 30px rgba(0,229,255,.9)}100%{box-shadow:0 0 0 0 rgba(0,229,255,0),0 0 0 rgba(0,229,255,0)}}',
    '.ou-cue{animation:ouCue .9s ease-in-out 4;}',
    '@keyframes ouCue{50%{box-shadow:0 0 0 4px rgba(0,229,255,.85),0 0 26px #00e5ff;filter:brightness(1.35);}}',
    /* searched words glowing on book pages + script pages */
    '.highlight-rect.search-hit,.rw-hit{background:rgba(0,229,255,.22)!important;border:1px solid #00e5ff!important;mix-blend-mode:normal!important;box-shadow:0 0 10px rgba(0,229,255,.85),inset 0 0 6px rgba(0,229,255,.4);pointer-events:none;animation:ouHit 1.1s ease-in-out 3;}',
    '.rw-hit{position:absolute;z-index:2;}',
    '@keyframes ouHit{50%{background:rgba(0,229,255,.45);box-shadow:0 0 18px #00e5ff,inset 0 0 8px rgba(0,229,255,.6);}}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('ous-css')) return;
    var st = document.createElement('style');
    st.id = 'ous-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ------------------------------------------------------------------ text utils */
  var COMBINING = /[̀-ͯ]/g;
  function norm(s) {
    return String(s || '').normalize('NFKD').replace(COMBINING, '').toLowerCase()
      .replace(/[’'`´]/g, '').replace(/&/g, ' and ')
      .replace(/[^a-z0-9぀-ヿ一-鿿ऀ-ॿ]+/g, ' ').trim();
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var STOP = {};
  ('a an and are as at be but by for from had has have he her his i if in into is it its me my no not of on or our so ' +
   'than that the their them then there these they this to too us was we were what when where which who will with you your')
    .split(' ').forEach(function (w) { STOP[w] = 1; });

  /* Bounded Damerau–Levenshtein distance (returns max+1 when over the bound) */
  function dist(a, b, max) {
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > max) return max + 1;
    var prev2 = null, prev = new Array(lb + 1), cur;
    for (var j = 0; j <= lb; j++) prev[j] = j;
    for (var i = 1; i <= la; i++) {
      cur = new Array(lb + 1); cur[0] = i;
      var rowMin = cur[0];
      for (j = 1; j <= lb; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a.charCodeAt(i - 1) === b.charCodeAt(j - 2) && a.charCodeAt(i - 2) === b.charCodeAt(j - 1))
          v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v; if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev; prev = cur;
    }
    return prev[lb];
  }

  /* Split original text into word spans, so matches can be highlighted in place */
  var WORD_RE = /[A-Za-z0-9À-ɏ぀-ヿ一-鿿ऀ-ॿ’'`´]+/g;
  function spans(text) {
    var out = [], m;
    WORD_RE.lastIndex = 0;
    while ((m = WORD_RE.exec(text))) {
      var n = norm(m[0]);
      if (n) out.push({ s: m.index, e: m.index + m[0].length, n: n.replace(/ /g, '') });
    }
    return out;
  }
  function isHit(n, terms) {
    for (var i = 0; i < terms.length; i++) if (n === terms[i]) return true;
    return false;
  }
  function markText(text, terms) {
    if (!terms || !terms.length) return esc(text);
    var sp = spans(text), out = '', last = 0;
    for (var i = 0; i < sp.length; i++) {
      if (!isHit(sp[i].n, terms)) continue;
      out += esc(text.slice(last, sp[i].s)) + '<mark>' + esc(text.slice(sp[i].s, sp[i].e)) + '</mark>';
      last = sp[i].e;
    }
    return out + esc(text.slice(last));
  }
  function snippet(text, terms, len) {
    len = len || 150;
    if (!text) return '';
    if (text.length <= len) return markText(text, terms);
    var sp = spans(text), best = -1, bestScore = -1;
    for (var i = 0; i < sp.length; i++) {
      if (!isHit(sp[i].n, terms)) continue;
      var sc = 0, seen = {};
      for (var j = i; j < sp.length && sp[j].s - sp[i].s < len * 0.6; j++)
        if (isHit(sp[j].n, terms) && !seen[sp[j].n]) { seen[sp[j].n] = 1; sc += 2; }
      if (sc > bestScore) { bestScore = sc; best = i; }
    }
    if (best < 0) return esc(text.slice(0, len).replace(/\s+\S*$/, '')) + '…';
    var start = sp[Math.max(0, best - 6)].s;
    if (best - 6 <= 0) start = 0;
    var end = Math.min(text.length, start + len);
    var cut = text.slice(start, end);
    if (end < text.length) cut = cut.replace(/\s+\S*$/, '');
    return (start > 0 ? '…' : '') + markText(cut, terms) + (start + cut.length < text.length ? '…' : '');
  }

  /* ------------------------------------------------------------------ engine */
  var DOCS = null, POST = null, VOCAB = null, IDF = null, loading = null, loadFailed = false;
  var PRIOR = { section: 1.25, album: 1.4, gallery: 1.3, book: 1.3, concept: 1.3, video: 1.2, link: 1.15,
                track: 1.05, radio: 0.95, photo: 0.95, uw: 0.95, bpage: 0.85, spage: 0.85 };

  function build(data) {
    var docs = data.docs, post = new Map();
    docs.forEach(function (d, di) {
      var fw = {};
      function field(text, w, body) {
        if (!text) return;
        var raw = String(text), toks = norm(raw).split(' '), tf = {};
        toks.forEach(function (t) { if (t && (t.length > 1 || /[0-9]/.test(t) || /[^a-z]/.test(t))) tf[t] = (tf[t] || 0) + 1; });
        (raw.match(/[A-Za-z0-9]+(?:[-.][A-Za-z0-9]+)+/g) || []).forEach(function (h) {   /* x-perimental -> xperimental */
          var j = norm(h).replace(/ /g, ''); if (j.length > 2) tf[j] = (tf[j] || 0) + 1;
        });
        for (var t in tf) {
          var ww = body ? w * (1 + 0.25 * Math.log(tf[t])) : w;
          if (!fw[t] || fw[t] < ww) fw[t] = ww;
        }
      }
      var paged = d.k === 'bpage' || d.k === 'spage';
      field(d.n, paged ? 0.6 : 10);
      field(d.t2, 10);
      field(d.a, 6);
      field(d.s, (d.k === 'track' || d.k === 'photo' || d.k === 'uw') ? 1.6 : paged ? 0.3 : 2.5);
      field(d.b, paged ? 1 : 1.4, true);
      d._nt = norm(d.n); d._nt2 = norm(d.t2); d._na = norm(d.a);
      d._here = !!d.u && !/^https?:/.test(d.u) && (d.u.split('#')[0] || 'index.html').toLowerCase() === PAGE; d._nb = paged || d.b ? norm(d.b) : '';
      for (var t in fw) {
        var arr = post.get(t);
        if (!arr) post.set(t, arr = []);
        arr.push(di, fw[t]);
      }
    });
    var N = docs.length, idf = new Map();
    post.forEach(function (arr, t) { idf.set(t, 1 + Math.log(1 + N / (arr.length / 2))); });
    DOCS = docs; POST = post; IDF = idf; VOCAB = Array.from(post.keys()).sort();
  }

  function load() {
    if (DOCS) return Promise.resolve();
    if (loading) return loading;
    loadFailed = false;
    loading = fetch(INDEX_URL, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(build)
      .catch(function (e) { loading = null; loadFailed = true; throw e; });
    return loading;
  }

  function lowerBound(arr, s) {
    var lo = 0, hi = arr.length;
    while (lo < hi) { var mid = (lo + hi) >> 1; if (arr[mid] < s) lo = mid + 1; else hi = mid; }
    return lo;
  }

  function expand(tok, typing) {
    var out = new Map();
    function put(t, q) { if (!(out.get(t) >= q)) out.set(t, q); }
    var num = /^\d+$/.test(tok);
    if (POST.has(tok)) put(tok, 1);
    if (tok.length >= 2 || typing) {
      for (var i = lowerBound(VOCAB, tok); i < VOCAB.length && VOCAB[i].lastIndexOf(tok, 0) === 0; i++) {
        var v = VOCAB[i];
        if (v !== tok && !(num && /^\d+$/.test(v))) put(v, (typing ? 0.9 : 0.72) * (0.5 + 0.5 * tok.length / v.length));
      }
    }
    if (tok.length >= 4 && !num && !out.size) {   /* inside a word, e.g. "water" in a run-together name */
      for (var k = 0; k < VOCAB.length; k++) {
        var w = VOCAB[k];
        if (w.length > tok.length && w.indexOf(tok) > 0) put(w, 0.5);
      }
    }
    if (!out.size && tok.length >= 3 && !num) {   /* typo fallback, only when nothing matched as typed */
      var maxd = tok.length >= 8 ? 2 : 1;
      for (var m = 0; m < VOCAB.length; m++) {
        var v2 = VOCAB[m];
        if (Math.abs(v2.length - tok.length) <= maxd) {
          var d = dist(tok, v2, maxd);
          if (d <= maxd) put(v2, d === 1 ? 0.7 : 0.48);
        }
        if (typing && v2.length > tok.length && dist(tok, v2.slice(0, tok.length), 1) <= 1) put(v2, 0.55);
      }
    }
    return out;
  }

  function search(q) {
    var t0 = (window.performance && performance.now()) || Date.now();
    var nq = norm(q);
    if (!nq) return null;
    var typing = !/\s$/.test(q);
    var all = nq.split(' '), seen = {}, toks = [];
    var content = all.filter(function (t) { return !STOP[t]; });
    (content.length ? content : all).forEach(function (t) {
      /* run-together words: "oceanman" -> "ocean" + "man" */
      if (t.length >= 6 && !POST.has(t) && !/^\d+$/.test(t)) {
        var i0 = lowerBound(VOCAB, t);
        if (!(i0 < VOCAB.length && VOCAB[i0].lastIndexOf(t, 0) === 0)) {
          for (var c = t.length - 3; c >= 3; c--) {
            var a = t.slice(0, c), b2 = t.slice(c);
            if (POST.has(a) && POST.has(b2)) { if (!seen[a]) { seen[a] = 1; toks.push(a); } if (!seen[b2]) { seen[b2] = 1; toks.push(b2); } return; }
          }
        }
      }
      if (!seen[t]) { seen[t] = 1; toks.push(t); }
    });
    var acc = new Map();
    toks.forEach(function (tok, ti) {
      var exp = expand(tok, typing && ti === toks.length - 1 && tok === all[all.length - 1]);
      var best = new Map();
      exp.forEach(function (qual, term) {
        var p = POST.get(term), idf = IDF.get(term);
        for (var j = 0; j < p.length; j += 2) {
          var di = p[j], sc = qual * p[j + 1] * idf, b = best.get(di);
          if (!b) best.set(di, b = { s: 0, q: 0, terms: [] });
          if (sc > b.s) b.s = sc;
          if (qual > b.q) b.q = qual;
          if (qual >= 0.48 && b.terms.length < 8) b.terms.push([term, qual]);
        }
      });
      best.forEach(function (b, di) {
        var r = acc.get(di);
        if (!r) acc.set(di, r = { d: DOCS[di], s: 0, n: 0, terms: [] });
        r.s += b.s; r.n++;
        /* highlight the words that actually matched best (not every loose prefix) */
        b.terms.forEach(function (tq) { if (tq[1] >= b.q - 0.3 && r.terms.indexOf(tq[0]) < 0) r.terms.push(tq[0]); });
      });
    });
    var need = toks.length, res = [], partial = false;
    acc.forEach(function (r) { if (r.n === need) res.push(r); });
    if (!res.length && need > 1) {
      partial = true;
      acc.forEach(function (r) { if (r.n >= Math.ceil(need / 2)) res.push(r); });
    }
    var phrase = nq;
    res.forEach(function (r) {
      var d = r.d, s = r.s * (r.n / need);
      var tb = 0;
      [d._nt, d._nt2].forEach(function (t) {
        if (!t) return;
        if (t === phrase) tb = Math.max(tb, 45);
        else if (t.lastIndexOf(phrase, 0) === 0) tb = Math.max(tb, 24);
        else if ((' ' + t + ' ').indexOf(' ' + phrase) >= 0) tb = Math.max(tb, 12);
      });
      s += tb;
      if (d._na && (' ' + d._na + ' ').indexOf(' ' + phrase + ' ') >= 0) s += 10;
      if (need > 1 && d._nb && d._nb.indexOf(phrase) >= 0) s += 8;
      r.score = s * (PRIOR[d.k] || 1) * (d._here ? 1.15 : 1);   /* things on the page you're on rank a bit higher */
    });
    res.sort(function (a, b) { return b.score - a.score || a.d.id - b.d.id; });
    var ms = ((window.performance && performance.now()) || Date.now()) - t0;
    return { q: q, nq: nq, results: res, partial: partial, ms: ms, toks: toks };
  }

  function suggest(tokens) {
    /* "did you mean": closest vocabulary word for each token */
    var out = [];
    tokens.forEach(function (t) {
      if (t.length < 3) return;
      var best = null, bd = 4;
      for (var i = 0; i < VOCAB.length; i++) {
        var v = VOCAB[i];
        if (v.length < 3 || Math.abs(v.length - t.length) > 3) continue;
        var d = dist(t, v, 3);
        if (d < bd || (d === bd && best && POST.get(v).length > POST.get(best).length)) { bd = d; best = v; }
      }
      if (best && best !== t) out.push(best);
    });
    return out;
  }

  /* ------------------------------------------------------------------ categories */
  var CATS = [
    { id: 'music', label: 'MUSIC', c: '#ff4bd8' },
    { id: 'visuals', label: 'VISUALS', c: '#00e5ff' },
    { id: 'museum', label: 'MUSEUM', c: '#ffb347' },
    { id: 'books', label: 'BOOKS', c: '#ffd700' },
    { id: 'concepts', label: 'CONCEPTS', c: '#39ff14' },
    { id: 'site', label: 'SITE + LINKS', c: '#ff6ec7' }
  ];
  var CAT = {}; CATS.forEach(function (c) { CAT[c.id] = c; });
  function kindLabel(d) {
    switch (d.k) {
      case 'album': return 'ALBUM';
      case 'track': return 'TRACK';
      case 'radio': return 'RADIO';
      case 'video': return /^Visual album/i.test(d.s) ? 'VISUAL ALBUM' : /^Bumper/i.test(d.s) ? 'BUMPER' : 'FILM';
      case 'gallery': return d.c === 'visuals' ? 'ARCHIVE' : 'EXHIBIT';
      case 'photo': return /GRAFX/i.test(d.s) ? 'GRAFX' : 'PHOTO';
      case 'book': return 'BOOK';
      case 'bpage': return 'PAGE';
      case 'spage': return 'SCRIPT';
      case 'concept': return 'CONCEPT';
      case 'uw': return 'FILE';
      case 'link': return 'LINK ↗';
      default: return 'PAGE';
    }
  }
  function thumbHtml(d) {
    var cls = 'ous-th', inner = '';
    if (d.yt) { cls += ' w'; inner = '<img src="https://i.ytimg.com/vi/' + esc(d.yt) + '/mqdefault.jpg" alt="" loading="lazy" decoding="async"><span class="pl">▶</span>'; }
    else if (d.i) {
      if (/\/(sore|dc)-\d+\.jpg$/.test(d.i)) cls += ' tall';
      inner = '<img src="' + esc(ROOT + d.i) + '" alt="" loading="lazy" decoding="async">';
    } else {
      cls += ' glyph';
      inner = d.k === 'radio' ? '♪' : d.k === 'link' ? '↗' : d.c === 'visuals' ? '▶' : '◆';
    }
    return '<span class="' + cls + '" aria-hidden="true">' + inner + '</span>';
  }
  function hrefFor(d, terms) {
    if (d.k === 'radio') return '#';
    var u = d.u;
    if ((d.k === 'bpage' || d.k === 'spage') && d.hw && terms && terms.length) u += '&hl=' + encodeURIComponent(terms.slice(0, 6).join(','));
    return /^https?:/.test(u) ? u : ROOT + u;
  }

  /* ------------------------------------------------------------------ UI */
  var ui = null, state = { q: '', tab: 'all', res: null, sel: -1, items: [], expanded: {}, keyed: false };
  var TOUCH = !!(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  var lastFocus = null, pushed = false, savedOverflow = '';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function buildUI() {
    injectCss();
    var root = el('div', 'ous');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Ultra Search');
    var LOGO = ['#ff4bd8', '#00e5ff', '#ffd700', '#39ff14', '#ffb347', '#ff6ec7'];
    var logo = 'ULTRA SEARCH'.split('').map(function (ch, i) {
      return ch === ' ' ? '<span>&nbsp;</span>' : '<span style="color:' + LOGO[i % LOGO.length] + '">' + ch + '</span>';
    }).join('');
    root.innerHTML =
      '<div class="ous-back"></div>' +
      '<div class="ous-win">' +
        '<div class="ous-bar"><span><b>ULTRA_SEARCH.EXE</b></span><span class="ous-ver">v1.0</span>' +
          '<button type="button" class="ous-x" aria-label="Close search">✕</button></div>' +
        '<div class="ous-head">' +
          '<div class="ous-logo" aria-hidden="true">' + logo + '</div>' +
          '<div class="ous-tag">THE SEARCH ENGINE OF THE NEW ULTRA EMPIRE</div>' +
          '<form class="ous-form" role="search" autocomplete="off">' +
            '<div class="ous-field"><span class="ous-glass" aria-hidden="true"><svg class="ou-sico" viewBox="0 0 16 16" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M10.2 10.2l4.3 4.3" stroke="currentColor" stroke-width="2.6"/></svg></span>' +
              '<input class="ous-input" type="search" enterkeyhint="search" spellcheck="false" autocapitalize="off" autocorrect="off" ' +
              'placeholder="songs, films, photos, words in the books…" aria-label="Search origamiultra.com" ' +
              'role="combobox" aria-expanded="true" aria-controls="ous-list" aria-autocomplete="list">' +
              '<button type="button" class="ous-clear" aria-label="Clear search">CLEAR</button></div>' +
            '<button type="submit" class="ous-go">SEARCH!</button>' +
          '</form>' +
          '<div class="ous-tabs" role="tablist"></div>' +
        '</div>' +
        '<div class="ous-stat" aria-live="polite"></div>' +
        '<div class="ous-body" id="ous-list" role="listbox" aria-label="Results"></div>' +
        '<div class="ous-foot"><span class="k"><kbd>↑</kbd><kbd>↓</kbd>MOVE</span><span class="k"><kbd>↵</kbd>OPEN</span>' +
          '<span class="k"><kbd>ESC</kbd>CLOSE</span><span class="k"><kbd>/</kbd>SEARCH ANYWHERE</span><span class="r">◆ ORIGAMIULTRA.COM</span></div>' +
        '<div class="ous-toast" role="status"></div>' +
      '</div>';
    document.body.appendChild(root);
    ui = {
      root: root, input: root.querySelector('.ous-input'), body: root.querySelector('.ous-body'),
      tabs: root.querySelector('.ous-tabs'), stat: root.querySelector('.ous-stat'), toast: root.querySelector('.ous-toast'),
      win: root.querySelector('.ous-win')
    };
    root.querySelector('.ous-back').addEventListener('click', close);
    root.querySelector('.ous-x').addEventListener('click', close);
    root.querySelector('.ous-clear').addEventListener('click', function () { setQuery(''); ui.input.focus(); });
    root.querySelector('.ous-form').addEventListener('submit', function (e) {
      e.preventDefault();
      rememberQuery();
      /* phones: the keyboard's search key just reveals the results; desktop: Enter opens the highlighted one */
      if (TOUCH && !state.keyed) { ui.input.blur(); return; }
      if (state.sel >= 0 && state.items[state.sel]) activate(state.items[state.sel], e);
    });
    var t = null;
    ui.input.addEventListener('input', function () {
      clearTimeout(t);
      var v = ui.input.value;
      t = setTimeout(function () { setQuery(v, true); }, 40);
    });
    /* keep page shortcuts (gallery arrows, reader keys…) from firing while searching */
    root.addEventListener('keydown', onKey);
    ['keyup', 'keypress'].forEach(function (ev) { root.addEventListener(ev, function (e) { e.stopPropagation(); }); });
    root.addEventListener('wheel', function (e) { e.stopPropagation(); }, { passive: true });
    ui.body.addEventListener('mousemove', function (e) {
      var r = e.target.closest && e.target.closest('.ous-r');
      if (r) select(+r.getAttribute('data-n'), false);
    });
    ui.body.addEventListener('click', onBodyClick);
    ui.tabs.addEventListener('click', function (e) {
      var b = e.target.closest('.ous-tab');
      if (!b) return;
      state.tab = b.getAttribute('data-tab');
      render();
      ui.body.scrollTop = 0;
    });
    /* let people paste with right-click inside the search box (site blocks the menu elsewhere) */
    window.addEventListener('contextmenu', function (e) {
      if (e.target && e.target.closest && e.target.closest('.ous-input')) e.stopImmediatePropagation();
    }, true);
  }

  function toast(msg) {
    if (!ui) return;
    ui.toast.textContent = msg;
    ui.toast.classList.add('on');
    clearTimeout(ui.toast._t);
    ui.toast._t = setTimeout(function () { ui.toast.classList.remove('on'); }, 1600);
  }

  function open(q) {
    if (!ui) buildUI();
    if (ui.root.classList.contains('open')) { if (q != null) setQuery(q); ui.input.focus(); return; }
    lastFocus = document.activeElement;
    state.keyed = false;
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ui.root.classList.add('open');
    try { history.pushState({ ouSearch: 1 }, ''); pushed = true; } catch (e) { pushed = false; }
    ui.input.focus();
    if (q != null) ui.input.value = q;
    state.tab = 'all';
    setQuery(ui.input.value);
    if (ui.input.value) ui.input.select();
    if (!DOCS) {
      load().then(function () { setQuery(ui.input.value); }, function () { setQuery(ui.input.value); });
    }
  }

  function close(opts) {
    if (!ui || !ui.root.classList.contains('open')) return;
    ui.root.classList.remove('open');
    document.body.style.overflow = savedOverflow;
    if (pushed && !(opts && opts.fromPop)) {
      pushed = false;
      if (history.state && history.state.ouSearch) { try { history.back(); } catch (e) {} }
    }
    pushed = false;
    if (lastFocus && lastFocus.focus && !(opts && opts.keepFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }
  window.addEventListener('popstate', function () {
    if (ui && ui.root.classList.contains('open')) close({ fromPop: true });
  });

  function setQuery(v, fromInput) {
    state.q = v;
    if (!fromInput && ui.input.value !== v) ui.input.value = v;
    ui.root.classList.toggle('has-q', !!norm(v));
    state.expanded = {};
    if (!fromInput) state.tab = 'all';
    state.res = DOCS && norm(v) ? search(v) : null;
    if (state.res && state.tab !== 'all') {
      var has = state.res.results.some(function (r) { return r.d.c === state.tab; });
      if (!has) state.tab = 'all';
    }
    render();
    ui.body.scrollTop = 0;
  }

  /* --------------------------------------------------------------- rendering */
  function rowHtml(r, n, top) {
    var d = r.d, cat = CAT[d.c] || CAT.site, terms = r.terms;
    var body = '';
    if (d.b) {
      var showSnip = d.k === 'bpage' || d.k === 'spage' || r.terms.some(function (t) { return d._nb.indexOf(t) >= 0 && d._nt.indexOf(t) < 0; });
      if (showSnip || top) body = '<span class="ous-sn">' + snippet(d.b, terms, top ? 190 : 150) + '</span>';
    }
    var acts = '';
    if (d.k === 'track' && d.pl && window.OUPlaylist) {
      var inPl = window.OUPlaylist.has && window.OUPlaylist.has(d.pl.file);
      acts += '<button type="button" class="ous-btn' + (inPl ? ' done' : '') + '" data-act="add" tabindex="-1">' + (inPl ? '✓ ADDED' : '+ ADD') + '</button>';
    }
    if (d.k === 'video' && d.v) acts += '<a class="ous-btn" data-act="vis" tabindex="-1" href="' + esc(ROOT + d.v) + '">◆ <span class="lg">IN </span>VISUALS</a>';
    if (d.k === 'radio') acts += '<button type="button" class="ous-btn" data-act="radio" tabindex="-1">▶ PLAY</button>';
    var ext = d.x || /^https?:/.test(d.u);
    var href = hrefFor(d, terms);
    var meta = '<span class="ous-k">' + kindLabel(d) + '</span>' + esc(d.s || '');
    return '<div class="ous-r' + (top ? ' ous-top-r' : '') + '" role="option" id="ous-o' + n + '" data-n="' + n + '" style="--ous-c:' + cat.c + '">' +
      '<a class="ous-a" tabindex="-1" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        thumbHtml(d) +
        '<span class="ous-tx"><span class="ous-tt">' + markText(d.n, terms) + '</span>' +
          '<span class="ous-mt">' + meta + '</span>' + body + '</span>' +
      '</a>' + (acts ? '<span class="ous-act">' + acts + '</span>' : '') + '</div>';
  }

  function render() {
    if (!ui) return;
    var res = state.res;
    state.items = []; state.sel = -1;
    if (!norm(state.q)) { renderHome(); return; }
    if (!DOCS) {
      ui.tabs.innerHTML = '';
      ui.stat.innerHTML = '';
      ui.body.innerHTML = loadFailed
        ? '<div class="ous-none">✕ COULD NOT REACH THE SEARCH INDEX<br>CHECK YOUR CONNECTION AND TRY AGAIN</div>'
        : '<div class="ous-load">LOADING THE ULTRA INDEX<i></i></div>';
      return;
    }
    var list = res.results;
    var counts = { all: list.length };
    CATS.forEach(function (c) { counts[c.id] = 0; });
    list.forEach(function (r) { counts[r.d.c] = (counts[r.d.c] || 0) + 1; });
    ui.tabs.innerHTML = '<button type="button" class="ous-tab' + (state.tab === 'all' ? ' on' : '') + '" data-tab="all" role="tab">ALL<i>' + counts.all + '</i></button>' +
      CATS.map(function (c) {
        return '<button type="button" class="ous-tab' + (state.tab === c.id ? ' on' : '') + (counts[c.id] ? '' : ' zero') + '" data-tab="' + c.id +
          '" role="tab" style="--ous-c:' + c.c + '">' + c.label + '<i>' + counts[c.id] + '</i></button>';
      }).join('');
    var secs = res.ms < 1 ? '0.00' + Math.max(1, Math.round(res.ms * 10)) : (res.ms / 1000).toFixed(3);
    if (!list.length) {
      ui.stat.innerHTML = 'NO RESULTS FOR <em>“' + esc(state.q.trim()) + '”</em>';
      var sug = suggest(res.toks);
      var alt = sug.length ? sug.join(' ') : '';
      ui.body.innerHTML = '<div class="ous-none">NOTHING IN THE EMPIRE MATCHES THAT… YET.' +
        (alt ? '<br>DID YOU MEAN:<div class="ous-chips"><button type="button" class="ous-chip" data-q="' + esc(alt) + '">' + esc(alt) + '</button></div>' : '') +
        '<div class="ous-chips" style="margin-top:14px">' + popularChips() + '</div></div>';
      return;
    }
    ui.stat.innerHTML = (res.partial ? 'NO EXACT MATCH · CLOSEST ' : '') + '<b>' + list.length + '</b> RESULT' + (list.length === 1 ? '' : 'S') +
      ' FOR <em>“' + esc(state.q.trim()) + '”</em> · ' + secs + ' SEC';
    var html = '', n = 0;
    function push(r, top) { state.items.push(r); return rowHtml(r, n++, top); }
    if (state.tab === 'all') {
      var top = list[0];
      html += '<div class="ous-top" style="--ous-c:' + (CAT[top.d.c] || CAT.site).c + '"><span class="ous-label">★ TOP RESULT</span>' + push(top, true) + '</div>';
      var groups = {};
      list.slice(1).forEach(function (r) { (groups[r.d.c] = groups[r.d.c] || []).push(r); });
      var order = Object.keys(groups).sort(function (a, b) { return groups[b][0].score - groups[a][0].score; });
      order.forEach(function (cid) {
        var g = groups[cid], c = CAT[cid] || CAT.site, lim = state.expanded[cid] ? 40 : (cid === 'books' || cid === 'museum' ? 4 : 5);
        html += '<div class="ous-grp" style="--ous-c:' + c.c + '"><div class="ous-gh">◆ ' + c.label + ' <i>' + counts[cid] + '</i></div>';
        g.slice(0, lim).forEach(function (r) { html += push(r); });
        if (g.length > lim) html += '<button type="button" class="ous-more" data-more="' + cid + '">+ ' + (g.length - lim) + ' MORE IN ' + c.label + ' ▸</button>';
        html += '</div>';
      });
    } else {
      var c = CAT[state.tab] || CAT.site, g = list.filter(function (r) { return r.d.c === state.tab; });
      var lim2 = state.expanded['tab:' + state.tab] ? 400 : 60;
      html += '<div class="ous-grp" style="--ous-c:' + c.c + '"><div class="ous-gh">◆ ' + c.label + ' <i>' + g.length + '</i></div>';
      g.slice(0, lim2).forEach(function (r) { html += push(r); });
      if (g.length > lim2) html += '<button type="button" class="ous-more" data-more="tab:' + state.tab + '">+ ' + (g.length - lim2) + ' MORE ▸</button>';
      html += '</div>';
    }
    ui.body.innerHTML = html;
    select(0, false);
  }

  var POPULAR = ["sun's getting low", 'vibes cubed', 'lower levels', 'dante crow', 'ultrawater', 'chinatown', 'dead mall', 'comic sans', 'videodroid', 'gardens of gami'];
  function popularChips() {
    return POPULAR.map(function (p) { return '<button type="button" class="ous-chip" data-q="' + esc(p) + '">' + esc(p) + '</button>'; }).join('');
  }
  function recent() {
    try { var r = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); return Array.isArray(r) ? r : []; } catch (e) { return []; }
  }
  function rememberQuery() {
    var q = (state.q || '').trim();
    if (norm(q).length < 2) return;
    try {
      var r = recent().filter(function (x) { return norm(x) !== norm(q); });
      r.unshift(q); localStorage.setItem(RECENT_KEY, JSON.stringify(r.slice(0, 8)));
    } catch (e) {}
  }
  function renderHome() {
    ui.tabs.innerHTML = '';
    var total = DOCS ? DOCS.length : 0;
    ui.stat.innerHTML = DOCS ? 'INDEXING <b>' + total + '</b> FILES · EVERY SONG, FILM, PHOTO + PAGE ON THE SITE' : (loadFailed ? 'INDEX OFFLINE' : 'WARMING UP THE INDEX…');
    var rc = recent();
    ui.body.innerHTML = '<div class="ous-empty">' +
      (rc.length ? '<h4>◆ RECENT SEARCHES</h4><div class="ous-chips">' + rc.map(function (p) {
        return '<button type="button" class="ous-chip rc" data-q="' + esc(p) + '">' + esc(p) + '</button>';
      }).join('') + '</div>' : '') +
      '<h4>◆ TRY SEARCHING</h4><div class="ous-chips">' + popularChips() + '</div>' +
      '<button type="button" class="ous-lucky" data-lucky="1">★ I’M FEELING ULTRA ★</button>' +
      '</div>';
  }

  function select(n, scroll) {
    if (!ui) return;
    var rows = ui.body.querySelectorAll('.ous-r');
    if (!rows.length) { state.sel = -1; ui.input.removeAttribute('aria-activedescendant'); return; }
    n = Math.max(0, Math.min(rows.length - 1, n));
    if (state.sel === n && !scroll) return;
    if (state.sel >= 0 && rows[state.sel]) { rows[state.sel].classList.remove('sel'); rows[state.sel].setAttribute('aria-selected', 'false'); }
    state.sel = n;
    rows[n].classList.add('sel'); rows[n].setAttribute('aria-selected', 'true');
    ui.input.setAttribute('aria-activedescendant', rows[n].id);
    if (scroll) {
      var top = n === 0 ? rows[0].closest('.ous-top') || rows[0] : rows[n];
      var b = ui.body.getBoundingClientRect(), r = top.getBoundingClientRect();
      if (r.top < b.top + 4) ui.body.scrollTop += r.top - b.top - 30;
      else if (r.bottom > b.bottom - 4) ui.body.scrollTop += r.bottom - b.bottom + 12;
    }
  }

  function onKey(e) {
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); if (ui.input.value) { setQuery(''); ui.input.focus(); } else close(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!state.items.length) return;
      e.preventDefault();
      state.keyed = true;
      select(state.sel + (e.key === 'ArrowDown' ? 1 : -1), true);
      return;
    }
    if (e.key === 'Tab') {   /* keep focus inside the dialog */
      var f = Array.prototype.filter.call(ui.root.querySelectorAll('input,button,a[href]'), function (x) {
        return x.offsetParent !== null && x.tabIndex !== -1;
      });
      if (!f.length) return;
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  }

  function onBodyClick(e) {
    var chip = e.target.closest('[data-q]');
    if (chip) { e.preventDefault(); setQuery(chip.getAttribute('data-q')); ui.input.focus(); return; }
    if (e.target.closest('[data-lucky]')) { e.preventDefault(); lucky(e); return; }
    var more = e.target.closest('[data-more]');
    if (more) {
      var key = more.getAttribute('data-more');
      if (key.indexOf('tab:') === 0) { state.expanded[key] = 1; render(); }
      else { state.tab = key; render(); ui.body.scrollTop = 0; }
      return;
    }
    var row = e.target.closest('.ous-r');
    if (!row) return;
    var r = state.items[+row.getAttribute('data-n')];
    if (!r) return;
    var act = e.target.closest('[data-act]');
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'add') {
        e.preventDefault();
        var ok = window.OUPlaylist && window.OUPlaylist.add(r.d.pl);
        act.textContent = '✓ ADDED'; act.classList.add('done');
        toast(ok === false ? '♫ ALREADY IN YOUR PLAYLIST' : '♫ ADDED TO YOUR PLAYLIST');
        return;
      }
      if (a === 'radio') { e.preventDefault(); playRadio(r.d); return; }
      if (a === 'vis') {
        rememberQuery();
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (samePage(r.d.v)) { close({ keepFocus: true }); landVisual(r.d.yt); }
        else go(ROOT + r.d.v);
        return;
      }
    }
    if (e.target.closest('.ous-a')) activate(r, e);
  }

  function samePage(u) {
    if (!u || /^https?:/.test(u)) return false;
    return (u.split('#')[0].split('?')[0] || 'index.html').toLowerCase() === PAGE;
  }
  function hashParams(u) {
    var h = (u.split('#')[1] || ''), o = {};
    h.split('&').forEach(function (kv) { if (!kv) return; var i = kv.indexOf('='); o[i < 0 ? kv : kv.slice(0, i)] = i < 0 ? '' : decodeURIComponent(kv.slice(i + 1)); });
    return o;
  }

  function playRadio(d) {
    if (window.OUPlayer && window.OUPlayer.play) {
      document.querySelectorAll('audio').forEach(function (a) { try { a.pause(); } catch (e) {} });
      window.OUPlayer.play(d.r);
      rememberQuery();
      toast('▶ NOW PLAYING: ' + d.n.toUpperCase());
      setTimeout(function () { close({ keepFocus: true }); }, 650);
    }
  }

  /* open a result. e = the click/submit event (so real links keep new-tab behaviour) */
  function activate(r, e) {
    var d = r.d;
    rememberQuery();
    if (d.k === 'radio') { if (e) e.preventDefault(); playRadio(d); return; }
    var href = hrefFor(d, r.terms);
    var ext = d.x || /^https?:/.test(d.u);
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;   /* let the browser open a new tab */
    if (ext) {
      if (!e || e.type !== 'click') window.open(href, '_blank', 'noopener');
      return;
    }
    if (e) e.preventDefault();
    if (samePage(d.u) && landHere(d, r.terms)) return;
    go(href);
  }

  function go(href) {
    if (pushed && history.state && history.state.ouSearch) { pushed = false; location.replace(href); }
    else location.href = href;
  }

  /* same page: act directly (no reload) */
  function landHere(d, terms) {
    var p = hashParams(d.u);
    if (d.k === 'track' && window.OUAlbum && p.t) { close({ keepFocus: true }); window.OUAlbum.play(+p.t - 1); return true; }
    if (d.k === 'photo' && p.n && galleryOpen(+p.n, true)) return true;
    if ((d.k === 'uw' || d.k === 'concept') && 'uw' in p && typeof FOLDERS !== 'undefined') { close({ keepFocus: true }); landConcept(p.uw); return true; }
    if (d.k === 'bpage' && window.OUReader && p.p) { close({ keepFocus: true }); window.OUReader.go(+p.p, terms); return true; }
    if (d.k === 'spage' && window.OUScript && p.p) { close({ keepFocus: true }); window.OUScript.go(+p.p, terms); return true; }
    if (d.k === 'video' && d.v && samePage(d.v)) return false;
    if (!d.u.split('#')[1]) { close({ keepFocus: true }); window.scrollTo({ top: 0, behavior: 'smooth' }); return true; }
    return false;
  }

  function lucky(e) {
    if (!DOCS) return;
    var kinds = ['track', 'video', 'album', 'gallery', 'uw', 'bpage'];   /* pick a kind first so no one kind drowns the rest */
    var pool = [];
    for (var tries = 0; !pool.length && tries < 10; tries++) {
      var kind = kinds[Math.floor(Math.random() * kinds.length)];
      pool = DOCS.filter(function (d) { return d.k === kind && !(d.k === 'bpage' && (!d.b || d.b.length < 120)) && !(d.k === 'gallery' && !d.i); });
    }
    if (!pool.length) return;
    var d = pool[Math.floor(Math.random() * pool.length)];
    toast('★ ' + kindLabel(d) + ': ' + d.n.toUpperCase());
    if (d.k === 'video' && d.v) { setTimeout(function () { go(ROOT + d.v); }, 450); return; }   /* stay on the site */
    setTimeout(function () { activate({ d: d, terms: [] }, null); }, 450);
  }

  /* ------------------------------------------------------------------ deep links (pages) */
  function clearHash() {
    try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
  }
  function flash(node) {
    if (!node) return;
    node.classList.remove('ou-found');
    void node.offsetWidth;
    node.classList.add('ou-found');
    setTimeout(function () { node.classList.remove('ou-found'); }, 2700);
  }
  function landVisual(id) {
    var a = document.querySelector('a.vid[href*="' + id.replace(/"/g, '') + '"]');
    if (!a) return false;
    a.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(function () { flash(a); }, 350);
    return true;
  }
  function galleryOpen(n, fromSearch) {
    if (typeof ITEMS === 'undefined' || typeof openLightbox !== 'function' || typeof IMG_DIR === 'undefined') return false;
    var k = -1;
    for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].idx === n) { k = i; break; }
    if (k < 0) return false;
    if (fromSearch) close({ keepFocus: true });
    openLightbox(k);
    return true;
  }
  function landConcept(v) {
    if (typeof openFolder !== 'function') return false;
    openFolder('ultrawater');
    var i = parseInt(v, 10);
    if (i >= 1 && typeof openLightbox === 'function') setTimeout(function () { openLightbox(i - 1); }, 60);
    return true;
  }
  function handleHash() {
    var h = location.hash;
    if (!h || h.length < 2) return;
    if (h === '#search') { clearHash(); open(); return; }
    var p = hashParams(h);
    if (p.v && document.querySelector('a.vid')) {
      clearHash();
      var tries = 0;
      (function attempt() { if (!landVisual(p.v) && tries++ < 20) setTimeout(attempt, 100); })();
    } else if (p.n && typeof ITEMS !== 'undefined') {
      clearHash(); galleryOpen(+p.n, false);
    } else if ('uw' in p && typeof FOLDERS !== 'undefined') {
      clearHash(); landConcept(p.uw);
    }
  }

  /* ------------------------------------------------------------------ triggers */
  function isTyping(t) {
    if (!t) return false;
    var tag = t.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable;
  }
  document.addEventListener('keydown', function (e) {
    if (ui && ui.root.classList.contains('open')) {   /* focus fell outside the dialog */
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === '/' || ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey))) { e.preventDefault(); ui.input.focus(); }
      return;
    }
    var k = e.key;
    if ((k === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !isTyping(e.target)) ||
        ((k === 'k' || k === 'K') && (e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey)) {
      e.preventDefault();
      open();
    }
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-ou-search]');
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute('data-ou-q') || null);
  });
  function prefetch(e) {
    var t = e.target && e.target.closest && e.target.closest('[data-ou-search]');
    if (t) load().catch(function () {});
  }
  document.addEventListener('pointerover', prefetch, { passive: true });
  document.addEventListener('touchstart', prefetch, { passive: true });
  document.addEventListener('focusin', prefetch);

  injectCss();
  window.addEventListener('hashchange', handleHash);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', handleHash);
  else handleHash();

  window.OUSearch = { open: open, close: close, search: function (q) { return load().then(function () { return search(q); }); }, version: VERSION };
})();
