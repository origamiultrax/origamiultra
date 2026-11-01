/* ==========================================================================
   ULTRA 98 — the Origami Ultra arcade desktop
   Window manager, menus, dialogs, taskbar, sounds and original pixel art.
   Games register themselves with ULTRA98.register({...}).
   ========================================================================== */
(function () {
  'use strict';
  if (window.ULTRA98) return;
  var ART = {"pal":{"k":"#1b0f08","e":"#000000","w":"#ffffff","R":"#9c3f16","r":"#cf6a28","o":"#ec9a48","c":"#f4e4c4","C":"#d8c4a0","s":"#f2b48e","S":"#cf8462","n":"#e06d5e","N":"#a8443a","P":"#f8a493","m":"#ff5a7a","g":"#b9b2a4","G":"#8a8478","y":"#ffe14d","Y":"#d4a017","b":"#6b4a1c","u":"#7fd4ff","U":"#2f7fd8","V":"#1a4f99","x":"#e01818","X":"#9a0d0d","d":"#3b3b44","D":"#24242a","l":"#d9d9d9","h":"#8b5a2b","H":"#5e3a17","j":"#b07a40","z":"#39ff14","q":"#c0c0c0","Q":"#808080","p":"#ffd700","J":"#2d6a2f","L":"#4a9a40","K":"#1d4a21","v":"#2a1846","W":"#140c1e","i":"#5b3f8a"},"spr":{"head_r":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRocsssssssscoRk","kRcswwsssswwscRk","kRcswesnnswescRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccckkcccck..","....kkcccckk....","......kkkk......"],"head_l":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRocsssssssscoRk","kRcswwsssswwscRk","kRcsewsnnsewscRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccckkcccck..","....kkcccckk....","......kkkk......"],"head_u":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRocsssssssscoRk","kRcswessssewscRk","kRcswwsnnswwscRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccckkcccck..","....kkcccckk....","......kkkk......"],"head_d":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRocsssssssscoRk","kRcswwsssswwscRk","kRcswesnnsewscRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccckkcccck..","....kkcccckk....","......kkkk......"],"head_eat":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRocsssssssscoRk","kRcswwsssswwscRk","kRcswesnnsewscRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccmmmmccck..","....kkcccckk....","......kkkk......"],"head_dead":["....kkkkkkkk....","..kkRrrrrrrRkk..",".kRrroooooorrRk.","kRrocsssssscorRk","kRoesesssseseoRk","kRcsessssssescRk","kRcesesnnsesecRk","kRcsssnPnnssscRk",".kcssnPnnnnssck.",".kcsnPnnnnnnsck.",".kcsnnnnnnnNsck.","..kcNnnnnnNNck..","..kccNNNNNNcck..","...kccckkcccck..","....kkcccckk....","......kkkk......"],"face_smile":["......kkkkkkkk......","....kkRRrrrrRRkk....","...kRrrroooorrrRk...","..kRrroooooooorrRk..",".kRroccssssssccorRk.","kRrocssssssssssocrRk","kRrcsswwsssswwsscrRk","kRrcsswesnnsewsscrRk","kRrcssssnPnnsssscrRk",".kRcsssnPnnnnssscRk.",".kRcssnPnnnnnnsscRk.",".kccsnnnnnnnnnnscck.","..kcsnnnnnnnnnNsck..","..kcsNnnnnnnnnNsck..","..kccsNNNNNNNNscck..","...kcckccccccckcck..","...kccckkkkkkccck...","....kkccccccccckk...","......kkkkkkkkk.....","...................."],"face_ooh":["......kkkkkkkk......","....kkRRrrrrRRkk....","...kRrrroooorrrRk...","..kRrroooooooorrRk..",".kRroccssssssccorRk.","kRrocssssssssssocrRk","kRrcssewsssswesscrRk","kRrcsswwsnnswwsscrRk","kRrcssssnPnnsssscrRk",".kRcsssnPnnnnssscRk.",".kRcssnPnnnnnnsscRk.",".kccsnnnnnnnnnnscck.","..kcsnnnnnnnnnNsck..","..kcsNnnnnnnnnNsck..","..kccsNNNNNNNNscck..","...kccccckkccckcck..","...kccccckkccccck...","....kkccccccccckk...","......kkkkkkkkk.....","...................."],"face_dead":["......kkkkkkkk......","....kkRRrrrrRRkk....","...kRrrroooorrrRk...","..kRrroooooooorrRk..",".kRroccssssssccorRk.","kRrocesesssseseocrRk","kRrcssessssssesscrRk","kRrcsesesnnsesescrRk","kRrcssssnPnnsssscrRk",".kRcsssnPnnnnssscRk.",".kRcssnPnnnnnnsscRk.",".kccsnnnnnnnnnnscck.","..kcsnnnnnnnnnNsck..","..kcsNnnnnnnnnNsck..","..kccsNNNNNNNNscck..","...kcccccccccckcck..","...kccckkkkkkccck...","....kkcccmmcccckk...","......kkkkkkkkk.....","...................."],"face_cool":["......kkkkkkkk......","....kkRRrrrrRRkk....","...kRrrroooorrrRk...","..kRrroooooooorrRk..",".kRroccssssssccorRk.","kRrocssssssssssocrRk","kRrcklkkkkkklkkkcrRk","kRrcskkksnnskkkscrRk","kRrcssssnPnnsssscrRk",".kRcsssnPnnnnssscRk.",".kRcssnPnnnnnnsscRk.",".kccsnnnnnnnnnnscck.","..kcsnnnnnnnnnNsck..","..kcsNnnnnnnnnNsck..","..kccsNNNNNNNNscck..","...kcckccccccckcck..","...kccckkkkkkccck...","....kkccccccccckk...","......kkkkkkkkk.....","...................."],"banana":["................","..........kk....",".........kbk....",".........kYk....","........kyYk....","........kyYk....",".......kyyYk....","......kyyyYk....",".....kyyyYk.....","...kkyyyyYk.....",".kkyyyyyYk......","kbyyyyyYYk......",".kYYYYYkk.......","..kkkkk.........","................","................"],"bottle":["......kkkk......","......kwwk......","......kkkk......",".....kuUUuk.....",".....kuUUuk.....","....kuuuuuuk....","...kuuuuuuuUk...","...kwwwwwwwwk...","...kwxxwwxxwk...","...kwwwwwwwwk...","...kuuuuuuuUk...","...kuwuuuuuUk...","...kuwuuuuuUk...","...kuuuuuuUUk...","....kkkkkkkk....","................"],"cassette":["................","................",".kkkkkkkkkkkkkk.",".kddddddddddddk.",".kdwwwwwwwwwwdk.",".kdwxxxxxxxxwdk.",".kdwlkkllkklwdk.",".kdwkDkllkDkwdk.",".kdwlkkllkklwdk.",".kdwwwwwwwwwwdk.",".kddddddddddddk.",".kddDkkkkkkDddk.",".kddkDDDDDDkddk.",".kkkkkkkkkkkkkk.","................","................"],"ff":["................",".kkkkkkkkkkkkkk.",".kyyyyyyyyyyyyk.",".kykyyyyykyyyyk.",".kykkyyyykkyyyk.",".kykkkyyykkkyyk.",".kykkkkyykkkkyk.",".kykkkkkykkkkkk.",".kykkkkyykkkkyk.",".kykkkyyykkkyyk.",".kykkyyyykkyyyk.",".kykyyyyykyyyyk.",".kyyyyyyyyyyyyk.",".kkkkkkkkkkkkkk.","................","................"],"log":["kkkkkkkkkkkkkkkk","khhhhjhhhhhjhhhk","khjjhhhhjjhhhhHk","khhhhHHhhhhHHhhk","kHhhhhhhjhhhhhhk","khhjjhhhhhhjjhHk","khhhhhHHhhhhhhhk","khHhhhhhhjjhhhhk","khhhhjjhhhhhhHhk","khhhhhhhHHhhhhhk","kHhjhhhhhhhjjhhk","khhhhhHHhhhhhhhk","khhjjhhhhhhHhhHk","khhhhhhhjjhhhhhk","kHHHHHHHHHHHHHHk","kkkkkkkkkkkkkkkk"],"flag":["................","................","......xxk.......","....xxxxk.......","..xxxwxxk.......","....xxxxk.......","......xxk.......","........k.......","........k.......","........k.......","......kkkkk.....","....kkkkkkkkk...","....kkkkkkkkk...","................","................","................"],"mine":["................","......kkkk......","....kkxxxxkk....","...kxxxxxxxxk...","..kxxxwwwwxxxk..","..kxxxxwwwwxxk..",".kxxwxxxwwwwxxk.",".kxxkkxxxwwwxxk.",".kxxkkkxxxwwxxk.",".kxxkkkkxxxwxxk.","..kxxkkkwxxxxk..","..kxxxkkwwxxxk..","...kxxxxxxxxk...","....kkxxxxkk....","......kkkk......","................"],"logo16":["................","....kkkxxkkk....","...kxxxxxxxxk...","..kxxxwwwwxxxk..",".kxxxxwwwwwxxxk.",".kxxxxxwwwwwxxk.",".kxwwxxxwwwwwxk.",".xxwkkxxxwwwwxx.",".xxwkkkxxxwwwxx.",".kxwkkkkxxxwwxk.",".kxxkkkkwxxxxxk.",".kxxxkkkwwxxxxk.","..kxxxwwwwxxxk..","...kxxxxxxxxk...","....kkkxxkkk....","................"],"icon_sweeper":["QQQQQQQQQQQQQQQQwwwwwwwwwwwwwwwQ","QqqqqqkkkkqqqqqqwqqqqqqqqqqqqqQQ","QqqqkkxxxxkkqqqqwqqqqqxxkqqqqqQQ","QqqkxxxxxxxxkqqqwqqqxxxxkqqqqqQQ","QqkxxxwwwwxxxkqqwqxxxwxxkqqqqqQQ","QqkxxxxwwwwxxkqqwqqqxxxxkqqqqqQQ","QkxxwxxxwwwwxxkqwqqqqqxxkqqqqqQQ","QkxxkkxxxwwwxxkqwqqqqqqqkqqqqqQQ","QkxxkkkxxxwwxxkqwqqqqqqqkqqqqqQQ","QkxxkkkkxxxwxxkqwqqqqqqqkqqqqqQQ","QqkxxkkkwxxxxkqqwqqqqqkkkkkqqqQQ","QqkxxxkkwwxxxkqqwqqqkkkkkkkkkqQQ","QqqkxxxxxxxxkqqqwqqqkkkkkkkkkqQQ","QqqqkkxxxxkkqqqqwqqqqqqqqqqqqqQQ","QqqqqqkkkkqqqqqqwQQQQQQQQQQQQQQQ","QqqqqqqqqqqqqqqqQQQQQQQQQQQQQQQQ","QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq","QqqqqqqUUqqqqqqqQqqqqVVVVVqqqqqq","QqqqqqUUUqqqqqqqQqqqVVqqqVVqqqqq","QqqqqUUUUqqqqqqqQqqqqqqqqVVqqqqq","QqqqqqqUUqqqqqqqQqqqqqqqVVqqqqqq","QqqqqqqUUqqqqqqqQqqqqqqVVqqqqqqq","QqqqqqqUUqqqqqqqQqqqqqVVqqqqqqqq","QqqqqqqUUqqqqqqqQqqqqVVqqqqqqqqq","QqqqqqqUUqqqqqqqQqqqVVqqqqqqqqqq","QqqqqUUUUUUqqqqqQqqqVVVVVVVqqqqq","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq","QqqqqqqqqqqqqqqqQqqqqqqqqqqqqqqq"],"icon_snake":["................................","................................","................................",".....kkkkkkkkkkkkkkkkkkkkkk.....","....kJJJJJJJJJJJJJJJJJJJJJJk....","...kJJJJJJJJJJJJJJJJJJJJJJJJk...","..kJJJJJJJJJkkkkkkkkJJJJJJJJJk..",".kJJJJJJJJkkRRrrrrRRkkJJJJJJJJk.",".kJJJLLJJkRrrroooorrrRkJJJJJJJk.",".kJJJJJJkRrroooooooorrRkLLJJJJk.",".kJJJJJkRroccssssssccorRkJJJJJk.",".kJJJJkRrocssssssssssocrRkJJJJk.",".kJJJJkRrcsswwsssswwsscrRkJJJJk.",".kJJJJkRrcsswesnnsewsscrRkJJJJk.",".kJJJJkRrcssssnPnnsssscrRkJJJJk.",".kJJJJJkRcsssnPnnnnssscRkJJJJJk.",".kJJJJJkRcssnPnnnnnnsscRkJJJJJk.",".kJJJJJkccsnnnnnnnnnnscckJJJJJk.",".kJJJJJJkcsnnnnnnnnnNsckJJJJJJk.",".kJJJJJJkcsNnnnnnnnnNsckJJJJJJk.",".kJJJJJJkccsNNNNNNNNscckJJJkJJk.",".kJJJJJJJkcckccccccckcckJJJYJJk.",".kJJJJJJJkccckkkkkkccckJJJkYJJk.",".kJJJJJJJJkkccccccccckkJJkyYJJk.",".kJJJJJJJJJJkkkkkkkkkJJJkyykJJk.",".kJJJJJJLLJJJJJJJJJJJJJyyyYJJJk.",".kJJJJJJJJJJJJJJJJJJJJJkkkJJJJk.","..kJJJJJJJJJJJJLLJJJJJJJJJJJJk..","...kJJJJJJJJJJJJJJJJJJJJJJJJk...","....kJJJJJJJJJJJJJJJJJJJJJJk....",".....kkkkkkkkkkkkkkkkkkkkkk.....","................................"],"icon_maze":["................................",".kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",".kNddddddddddddddddddddddddddRk.",".kNNddddddddddddddddddddddddRRk.",".kNNNddddddddddddddddddddddRRRk.",".kNNNNddddddddddddddddddddRRRRk.",".kNNNNddddddddddddddddddddRRRRk.",".kNNNNNddddddddddddddddddRRRRRk.",".kNNNNNNddddddddddddddddRRRRRRk.",".kccNNNNNddddddddddddddRRRRRCCk.",".kNNcNNNNNddddddddddddRRRRRCRRk.",".kNNNccNNNNNNcNNNcNcNNRRRCCRRRk.",".kNNNNNcNNNNxxwwwwwxNNRRCRRRRRk.",".kNNNNNNccNNxxxwwwwwNNCCRRRRRRk.",".kNNNNNNNNccwxxxwwwwcCRRRRRRRRk.",".kNNNNNNNNNNkkxxxwwwcNRRRRRRRRk.",".kccccNNNNNNkkkxxxwwcNRRRRCCCCk.",".kNNNNcccccckkkkxxxwcCCCCCRRRRk.",".kNNNNNNNNNNkkkkwxxxNNRRRRRRRRk.",".kNNNNNNNNcNxkkkwwxxNCRRRRRRRRk.",".kNNNNNNccNNNNNNNNNNNNCCRRRRRRk.",".kNNNNccNNGGGGGGGGGGGGRRCCRRRRk.",".kNNccNNNGGGGGGGGGGGGGGRRRCCRRk.",".kccNNNNGGGGGGGGGGGGGGGGRRRRCCk.",".kNNNNNGGGGGGGGGGGGGGGGGGRRRRRk.",".kNNNNGGGGGGGGGGGGGGGGGGGGRRRRk.",".kNNNNGGGGGGGGGGGGGGGGGGGGRRRRk.",".kNNNGGGGGGGGGGGGGGGGGGGGGGRRRk.",".kNNGGGGGGGGGGGGGGGGGGGGGGGGRRk.",".kNGGGGGGGGGGGGGGGGGGGGGGGGGGRk.",".kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.","................................"],"icon_hollow":["................................",".kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",".kvvvvvvvvvvvvvvvvvvvvvvvvvvvvk.",".kvvvvvvvvvvvvvvvvvvvvvvvvvvvvk.",".kvvvvvvvvvvvvvvvvvyvvvvvvvvvvk.",".kvvvvvvvvvvvvvvvvyvvvvvvvvvvvk.",".kvvvvvvvvvvvvvvvyyvvvvvvvvvvvk.",".kvvvvvvvvvvvvvvyyeeeevvvvvvvvk.",".kvvvvvvvvvvvvvyyeeeeeevvvvvvvk.",".kvvvvvvvvvvvvvyeeeexeeevvvvvvk.",".kvvvvvvvvvvvvvyeeeeeeDevvvvvvk.",".kvvvvvvvvvvvvvyeeeeeeDDDDDDvvk.",".kvvvvvvvvvvveeeeeeeeeDevvvvvvk.",".kvvvvvvvvveeeeeeeeeeeevvvvvvvk.",".kvvvvvvvveeeeeeeeeeeevvvvvvvvk.",".kvvvvvvveeddeeeeeeeeyyyyvvvvvk.",".kvvvvvvveeeedddeeeeeyyyvvvvvvk.",".kvvvvvvveeeeeeeddeeevvvvvvvvvk.",".kvvvvvvveeeeeeeeeeeevvvvvvvvvk.",".kvvvvvvveeeeeeeeeeeevvvvvvvvvk.",".kvvvvvveeeeeeeeeeeevvvvvvvvvvk.",".kvvvvveeeeeeeeeeeevvvvvvvvvvvk.",".kvvveeeeeevveeeeevWWWWWvvvvvvk.",".kvveeeeeWWWvvevvevWWWWWWWWWWWW.",".kveeeeWWWWWWWeWWeWWWWWWvWWWWWk.",".WWWWWWWWyWWvvvvvvvWWWWWvWWWWWk.",".kWWWWWWWWWWWWWWWvvWWWWWvWWyWWk.",".kWWyWWWWWWWWWWWWvvWWWWWvWWWWWk.",".kWWWWWWWWWWWWWWWvvWWWWWvWWWWWk.",".kWWWWWWWWWWWWWWWvvWWWWWvWWWWWk.",".kWWWWWWWWWWWWWWWkkWWWWWkWWWWWk.","................................"]},"dig":{"1":["...##..","..###..",".####..","...##..","...##..","...##..","...##..","...##..",".######"],"2":[".#####.","##...##",".....##","....##.","...##..","..##...",".##....","##.....","#######"],"3":["######.",".....##",".....##","..####.",".....##",".....##",".....##","##...##",".#####."],"4":["....##.","...###.","..####.",".##.##.","##..##.","#######","....##.","....##.","....##."],"5":["#######","##.....","##.....","######.",".....##",".....##",".....##","##...##",".#####."],"6":["..####.",".##....","##.....","######.","##...##","##...##","##...##","##...##",".#####."],"7":["#######",".....##",".....##","....##.","...##..","...##..","..##...","..##...","..##..."],"8":[".#####.","##...##","##...##",".#####.","##...##","##...##","##...##","##...##",".#####."],"q":[".#####.","##...##","##...##",".....##","....##.","...##..","...##..",".......","...##.."]}};
  var U = window.ULTRA98 = { apps: {}, order: [], wins: [], art: ART };
  var PAL = ART.pal;
  U.touch = !!(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  U.dpr = function () { return Math.min(3, window.devicePixelRatio || 1); };

  /* ------------------------------------------------------------ storage */
  U.load = function (k, def) {
    try { var v = JSON.parse(localStorage.getItem('ou98_' + k)); if (v && typeof v === 'object') return Object.assign(def, v); } catch (e) {}
    return def;
  };
  U.save = function (k, v) { try { localStorage.setItem('ou98_' + k, JSON.stringify(v)); } catch (e) {} };

  /* ------------------------------------------------------------ pixel art */
  var cache = {};
  /* draw a palette grid into ctx at (x,y), k device px per art px; edges snap to whole pixels */
  function paint(ctx, rows, x, y, k, map) {
    for (var j = 0; j < rows.length; j++) {
      var r = rows[j], y0 = Math.round(y + j * k), y1 = Math.round(y + (j + 1) * k);
      for (var i = 0; i < r.length; i++) {
        var ch = r.charAt(i);
        if (ch === '.') continue;
        var x0 = Math.round(x + i * k), x1 = Math.round(x + (i + 1) * k);
        ctx.fillStyle = (map && map[ch]) || PAL[ch] || ch;
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }
    }
  }
  U.paint = paint;
  U.rows = function (name) { return ART.spr[name]; };
  U.addSprite = function (name, rows) { ART.spr[name] = rows; };
  /* cached canvas of a sprite at scale k (device px per art px) */
  U.spr = function (name, k, map, mapKey) {
    var key = name + '@' + k.toFixed(3) + (mapKey || '');
    if (cache[key]) return cache[key];
    var rows = ART.spr[name], w = rows[0].length, h = rows.length;
    var c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
    paint(c.getContext('2d'), rows, 0, 0, k, map);
    return (cache[key] = c);
  };
  U.glyph = function (d) { return ART.dig[d]; };
  /* a <canvas> showing a sprite at a CSS size, crisp on any screen */
  U.iconEl = function (name, css) {
    var c = document.createElement('canvas'), d = U.dpr(), rows = ART.spr[name];
    var k = Math.max(1, Math.round(css * d / rows[0].length));
    c.width = rows[0].length * k; c.height = rows.length * k;
    c.style.width = css + 'px'; c.style.height = css + 'px';
    paint(c.getContext('2d'), rows, 0, 0, k);
    return c;
  };
  /* filled disc sprite generator (used for the monkey's body) */
  U.disc = function (size, r, ch, ring, ringCh, hi, hiCh) {
    var c = (size - 1) / 2, out = [];
    for (var y = 0; y < size; y++) {
      var s = '';
      for (var x = 0; x < size; x++) {
        var d = Math.sqrt((x - c) * (x - c) + (y - c) * (y - c));
        if (d > r + 0.35) s += '.';
        else if (ring && d > r - ring + 0.35) s += ringCh;
        else if (hi && x - c < -0.5 && y - c < -0.5 && Math.sqrt((x - c + r * .35) * (x - c + r * .35) + (y - c + r * .35) * (y - c + r * .35)) < hi) s += hiCh;
        else s += ch;
      }
      out.push(s);
    }
    return out;
  };

  /* ------------------------------------------------------------ sound (synthesised, no files) */
  var AC = null, master = null;
  U.muted = !!U.load('sys', { muted: false }).muted;
  function ac() {
    if (!AC) {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
      AC = new C(); master = AC.createGain(); master.gain.value = 0.5; master.connect(AC.destination);
    }
    if (AC.state === 'suspended') AC.resume();
    return AC;
  }
  U.audioUnlock = function () { ac(); };
  function tone(f, t0, dur, type, vol, f2) {
    var o = AC.createOscillator(), g = AC.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function noise(t0, dur, vol, fFrom, fTo) {
    var n = Math.floor(AC.sampleRate * dur), b = AC.createBuffer(1, n, AC.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var s = AC.createBufferSource(); s.buffer = b;
    var f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(fFrom || 2000, t0);
    if (fTo) f.frequency.exponentialRampToValueAtTime(fTo, t0 + dur);
    var g = AC.createGain(); g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t0); s.stop(t0 + dur + 0.02);
  }
  var SFX = {
    click: function (t) { tone(1500, t, 0.025, 'square', 0.05); },
    flag: function (t) { tone(660, t, 0.05, 'square', 0.06); tone(990, t + 0.05, 0.06, 'square', 0.05); },
    unflag: function (t) { tone(520, t, 0.05, 'square', 0.05); },
    boom: function (t) { noise(t, 0.7, 0.45, 1200, 90); tone(120, t, 0.55, 'sine', 0.5, 35); },
    win: function (t) { [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, t + i * 0.08, 0.16, 'square', 0.06); }); },
    eat: function (t) {    /* beat stab: kick + bright chord */
      tone(150, t, 0.12, 'sine', 0.55, 48);
      [392, 494, 587].forEach(function (f) { tone(f, t, 0.13, 'sawtooth', 0.045); });
      noise(t, 0.05, 0.12, 9000);
    },
    bottle: function (t) { [784, 988, 1175, 1568, 1976].forEach(function (f, i) { tone(f, t + i * 0.05, 0.12, 'triangle', 0.09); }); },
    cassette: function (t) { tone(440, t, 0.07, 'square', 0.07); tone(880, t + 0.08, 0.1, 'square', 0.07); tone(660, t + 0.18, 0.12, 'square', 0.06); },
    ff: function (t) { tone(300, t, 0.3, 'sawtooth', 0.06, 1500); },
    rewind: function (t) { tone(1400, t, 0.7, 'sawtooth', 0.05, 160); noise(t, 0.7, 0.08, 4000, 600); },
    crash: function (t) { noise(t, 0.4, 0.35, 2500, 120); tone(90, t, 0.4, 'square', 0.18, 40); },
    level: function (t) { [523, 659, 784, 1047, 784, 1047, 1319].forEach(function (f, i) { tone(f, t + i * 0.075, 0.14, 'square', 0.06); }); },
    ding: function (t) { tone(988, t, 0.18, 'sine', 0.18); tone(1319, t + 0.07, 0.35, 'sine', 0.12); },
    error: function (t) { tone(220, t, 0.16, 'square', 0.08); tone(165, t + 0.12, 0.24, 'square', 0.08); },
    start: function (t) { [262, 392, 523, 659].forEach(function (f, i) { tone(f, t + i * 0.06, 1.1, 'triangle', 0.05); }); }
  };
  U.sfx = function (name) {
    if (U.muted) return;
    try { if (!ac()) return; SFX[name] && SFX[name](AC.currentTime + 0.005); } catch (e) {}
  };
  U.setMuted = function (m) {
    U.muted = !!m; U.save('sys', { muted: U.muted });
    U.wins.forEach(function (w) { w.emit('mute', U.muted); });
    drawTray();
  };
  /* pause the site's background radio while a game plays music */
  U.pauseRadio = function () {
    var b = document.getElementById('mpPlay') || document.getElementById('npPlay');
    if (b && /\u2161/.test(b.textContent)) b.click();
  };

  /* ------------------------------------------------------------ small DOM helpers */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function acc(label) { return esc(label).replace(/&amp;(\w)/, '<u>$1</u>'); }   /* "&Game" -> underlined G */
  U.el = el; U.esc = esc;
  var SVG = {
    min: '<svg viewBox="0 0 8 7" shape-rendering="crispEdges"><path d="M1 5h6v2H1z"/></svg>',
    max: '<svg viewBox="0 0 9 9" shape-rendering="crispEdges" style="width:9px;height:9px"><path d="M0 0h9v2H0zM0 2h1v7H0zM8 2h1v7H8zM0 8h9v1H0z"/></svg>',
    res: '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" style="width:8px;height:8px"><path d="M2 0h6v1H2zM7 1h1v4H7zM2 1h1v1H2zM0 2h6v1H0zM0 3h1v5H0zM5 3h1v5H5zM0 7h6v1H0z"/></svg>',
    x: '<svg viewBox="0 0 8 7" shape-rendering="crispEdges"><path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0z"/></svg>'
  };
  var ICONS = {   /* dialog icons, drawn as SVG in the Win98 spirit */
    error: '<svg class="ico" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#800000" stroke-width="1.5"/><path d="M10 10l12 12M22 10L10 22" stroke="#fff" stroke-width="3.6"/></svg>',
    info: '<svg class="ico" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#000080" stroke-width="2"/><rect x="14" y="13" width="4" height="11" fill="#000080"/><rect x="14" y="7" width="4" height="4" fill="#000080"/></svg>',
    warn: '<svg class="ico" viewBox="0 0 32 32"><path d="M16 2L31 29H1z" fill="#ffff00" stroke="#000" stroke-width="1.5"/><rect x="14.5" y="11" width="3" height="10" fill="#000"/><rect x="14.5" y="23" width="3" height="3" fill="#000"/></svg>',
    question: '<svg class="ico" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#000080" stroke-width="2"/><text x="16" y="23" font-size="19" font-weight="bold" text-anchor="middle" fill="#000080" font-family="Tahoma,Verdana">?</text></svg>'
  };

  /* ------------------------------------------------------------ desktop */
  var D = {};   /* desktop elements */
  U.focused = false;

  U.register = function (app) { U.apps[app.id] = app; U.order.push(app.id); if (D.icons) addIcon(app); };

  U.mount = function (host) {
    host.classList.add('u98');
    host.innerHTML =
      '<div class="u98-monitor">' +
        '<div class="u98-bezel"><div class="u98-screen">' +
          '<div class="u98-desk"><div class="u98-wall"></div><div class="u98-icons" role="list"></div></div>' +
          '<div class="u98-taskbar"><button class="u98-btn u98-start" type="button" aria-haspopup="menu"></button>' +
          '<div class="u98-tasks"></div><div class="u98-tray"><button type="button" class="u98-vol" aria-label="Sound on/off"></button><span class="u98-clock"></span></div></div>' +
        '</div></div>' +
        '<div class="u98-chin"><span class="u98-brand"><b>ULTRAVISION</b> 98</span><span class="grow"></span>' +
          '<button type="button" class="u98-knob u98-fsbtn">⛶ FULLSCREEN</button><span class="u98-led" aria-hidden="true"></span>' +
          '<button type="button" class="u98-power" aria-label="Power"></button></div>' +
      '</div>';
    D.host = host; D.screen = host.querySelector('.u98-screen'); D.desk = host.querySelector('.u98-desk');
    D.icons = host.querySelector('.u98-icons'); D.tasks = host.querySelector('.u98-tasks');
    D.clock = host.querySelector('.u98-clock'); D.vol = host.querySelector('.u98-vol');
    D.start = host.querySelector('.u98-start'); D.led = host.querySelector('.u98-led');
    host.querySelector('.u98-wall').style.backgroundImage = 'url(favicon-192.png)';
    D.start.appendChild(U.iconEl('logo16', 16)); D.start.appendChild(document.createTextNode('Start'));
    U.order.forEach(function (id) { addIcon(U.apps[id]); });
    D.start.addEventListener('click', function (e) { e.stopPropagation(); toggleStart(); });
    D.vol.addEventListener('click', function () { U.audioUnlock(); U.setMuted(!U.muted); });
    host.querySelector('.u98-fsbtn').addEventListener('click', toggleFullscreen);
    host.querySelector('.u98-power').addEventListener('click', function () { if (D.off) boot(); else shutDown(); });
    D.desk.addEventListener('pointerdown', function (e) {
      if (e.target === D.desk || e.target.classList.contains('u98-wall') || e.target === D.icons) selectIcon(null);
    });
    document.addEventListener('pointerdown', function (e) {
      U.focused = !!(e.target.closest && e.target.closest('.u98-screen'));
      if (D.startMenu && !e.target.closest('.u98-startmenu') && !e.target.closest('.u98-start')) closeStart();
      if (U.openMenu && !e.target.closest('.u98-menu') && !e.target.closest('.u98-mi')) U.closeMenus();
      /* clicking the desktop, or anywhere off the monitor, deactivates the window (and pauses Snake) */
      if (U.active && e.target.closest && !e.target.closest('.u98-win,.u98-taskbar,.u98-modal,.u98-menu,.u98-startmenu')) U.deactivate();
    }, true);
    document.addEventListener('keydown', onKey);
    /* the site blocks right-click everywhere; games need it */
    window.addEventListener('contextmenu', function (e) {
      if (e.target.closest && e.target.closest('.u98-screen')) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
    document.addEventListener('fullscreenchange', function () { setTimeout(resizeAll, 60); });
    window.addEventListener('resize', function () { clearTimeout(D.rz); D.rz = setTimeout(resizeAll, 80); });
    document.addEventListener('visibilitychange', function () { U.wins.forEach(function (w) { w.emit(document.hidden ? 'hidden' : 'shown'); }); });
    tick(); setInterval(tick, 15000);
    drawTray();
    var seen = false; try { seen = sessionStorage.getItem('ou98_booted') === '1'; } catch (e) {}
    if (seen) afterBoot(); else boot();
    window.addEventListener('hashchange', route);
  };

  function tick() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    D.clock.textContent = ((h % 12) || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function drawTray() {
    if (!D.vol) return;
    D.vol.innerHTML = '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M2 6h3l4-4v12l-4-4H2z" fill="#c0c0c0" stroke="#000"/>' +
      (U.muted ? '<path d="M11 6l4 4M15 6l-4 4" stroke="#c00" stroke-width="1.6"/>' : '<path d="M11 5c1.5 1.5 1.5 4.5 0 6M13 3c2.6 2.6 2.6 7.4 0 10" fill="none" stroke="#000"/>') + '</svg>';
    D.vol.title = U.muted ? 'Sound: off' : 'Sound: on';
  }

  function addIcon(app) {
    var b = el('button', 'u98-icon' + (app.comingSoon ? ' dim' : ''));
    b.type = 'button'; b.setAttribute('role', 'listitem'); b.dataset.app = app.id;
    b.appendChild(U.iconEl(app.icon, 32));
    var s = el('span'); s.textContent = app.label || app.title; b.appendChild(s);
    var last = 0;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var now = Date.now();
      if (U.touch || (D.sel === b && now - last < 450)) { selectIcon(b); U.open(app.id); last = 0; return; }   /* the 2nd click of a double-click opens it */
      selectIcon(b);
      last = now;
    });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); U.open(app.id); } });
    D.icons.appendChild(b);
  }
  function selectIcon(b) {
    if (D.sel) D.sel.classList.remove('sel');
    D.sel = b; if (b) b.classList.add('sel');
  }

  /* ---------- start menu ---------- */
  function toggleStart() { if (D.startMenu) closeStart(); else openStart(); }
  function closeStart() { if (D.startMenu) { D.startMenu.remove(); D.startMenu = null; D.start.classList.remove('down'); } }
  function openStart() {
    U.closeMenus();
    var m = el('div', 'u98-startmenu u98-raised');
    m.innerHTML = '<div class="side"><span><b>ULTRA</b>98</span></div><div class="items"></div>';
    var items = m.querySelector('.items');
    function add(label, icon, act, dis) {
      var it = el('div', 'it' + (dis ? ' dis' : ''));
      if (icon) it.appendChild(U.iconEl(icon, 24)); else it.appendChild(el('span', '', '<span style="display:inline-block;width:24px"></span>'));
      it.appendChild(el('span', '', label));
      if (!dis) it.addEventListener('click', function () { closeStart(); act(); });
      items.appendChild(it);
    }
    U.order.forEach(function (id) { var a = U.apps[id]; add(acc(a.menuLabel || a.title), a.icon, function () { U.open(id); }, false); });
    items.appendChild(el('div', 'sep'));
    add('<u>o</u>rigamiultra.com', 'logo16', function () { location.href = 'index.html'; });
    add('Sh<u>u</u>t Down…', null, shutDownDialog);
    D.screen.appendChild(m); D.startMenu = m; D.start.classList.add('down');
  }

  /* ---------- boot / shut down ---------- */
  function boot() {
    D.off = false; closeAllWindows();
    if (D.safe) { D.safe.remove(); D.safe = null; }
    D.led.style.background = ''; D.led.style.boxShadow = '';
    var b = el('div', 'u98-boot', '<img src="favicon-192.png" alt=""><div class="nm">ULTRA <i>98</i></div><div class="bar"><i></i></div>');
    D.screen.appendChild(b);
    var done = false;
    function finish() { if (done) return; done = true; b.remove(); try { sessionStorage.setItem('ou98_booted', '1'); } catch (e) {} afterBoot(); }
    b.addEventListener('click', finish);
    setTimeout(finish, 1700);
  }
  function afterBoot() { route(); }
  function shutDownDialog() {
    U.dialog({
      title: 'Shut Down ULTRA 98', icon: 'question',
      html: 'What do you want the computer to do?<div style="margin-top:8px"><label style="display:block;margin:3px 0"><input type="radio" name="u98sd" value="off" checked> Shut down</label>' +
        '<label style="display:block;margin:3px 0"><input type="radio" name="u98sd" value="restart"> Restart</label></div>',
      buttons: [{ label: 'OK', value: 'ok', def: true }, { label: 'Cancel', value: null }],
      collect: function (d) { return (d.querySelector('input[name=u98sd]:checked') || {}).value || 'off'; }
    }).then(function (v) {
      if (v === 'restart') boot(); else if (v === 'off') shutDown();
    });
  }
  function shutDown() {
    closeAllWindows(); closeStart();
    D.off = true;
    var s = el('div', 'u98-safe', '<div>It\u2019s now safe to turn off<br>your computer.<small>click anywhere to start ULTRA 98 again</small></div>');
    s.addEventListener('click', boot);
    D.screen.appendChild(s); D.safe = s;
    D.led.style.background = '#ffb000'; D.led.style.boxShadow = '0 0 8px #ffb000';
  }
  function closeAllWindows() { U.wins.slice().forEach(function (w) { w.close(true); }); }

  /* ---------- fullscreen (real where possible, otherwise fill the viewport) ---------- */
  function isFs() { return document.fullscreenElement === D.screen || D.screen.classList.contains('fs'); }
  function setPseudoFs(on) {
    D.screen.classList.toggle('fs', on);
    document.body.classList.toggle('u98-lock', on);
    resizeAll();
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (D.screen.classList.contains('fs')) { setPseudoFs(false); return; }
    if (D.screen.requestFullscreen && !U.touch) D.screen.requestFullscreen().catch(function () { setPseudoFs(true); });
    else setPseudoFs(true);
  }
  U.toggleFullscreen = toggleFullscreen;
  U.isSmall = function () { return D.desk.clientWidth < 560; };

  /* ---------- routing: arcade.html#sweeper opens that game ---------- */
  function route() {
    var h = (location.hash || '').slice(1), cut = h.indexOf('/'), id = (cut >= 0 ? h.slice(0, cut) : h).toLowerCase(), arg = '';
    if (cut >= 0) { try { arg = decodeURIComponent(h.slice(cut + 1)); } catch (e) { arg = h.slice(cut + 1); } }
    if (id && U.apps[id] && !U.apps[id].comingSoon) { U.focused = true; U.open(id, arg); }   /* arcade.html#app/anything passes "anything" to the app */
  }
  U.setHash = function (v) { setHash(v); };
  function setHash(id) {
    try { history.replaceState(history.state, '', location.pathname + location.search + (id ? '#' + id : '')); } catch (e) {}
  }

  /* ------------------------------------------------------------ keyboard */
  function onKey(e) {
    if (document.querySelector('.ous.open')) return;          /* site search is open */
    var dlg = D.dlgs && D.dlgs[D.dlgs.length - 1];
    if (dlg) { dlg.key(e); return; }
    if (U.openMenu && e.key === 'Escape') { U.closeMenus(); e.preventDefault(); return; }
    if (!U.focused) return;
    var w = U.active;
    if (w && !w.minimized) {
      if (w.emit('key', e) === true) e.preventDefault();
    }
  }

  /* ------------------------------------------------------------ menus */
  U.openMenu = null;
  U.closeMenus = function () {
    document.querySelectorAll('.u98-menu').forEach(function (m) { m.remove(); });
    document.querySelectorAll('.u98-mi.open').forEach(function (m) { m.classList.remove('open'); });
    U.openMenu = null;
  };
  function val(v) { return typeof v === 'function' ? v() : v; }
  function buildMenu(items, x, y, parentEl) {
    var m = el('div', 'u98-menu u98-raised');
    items.forEach(function (it) {
      if (it === '-') { m.appendChild(el('div', 'sep')); return; }
      var dis = val(it.dis), chk = val(it.chk);
      var row = el('div', 'it' + (dis ? ' dis' : '') + (chk ? ' chk' : '') + (it.sub ? ' sub' : ''),
        '<span>' + acc(val(it.label)) + '</span>' + (it.key ? '<span class="k">' + esc(it.key) + '</span>' : ''));
      if (it.sub) {
        var open = function () {
          m.querySelectorAll('.u98-menu').forEach(function (s) { s.remove(); });
          var r = row.getBoundingClientRect(), mr = m.getBoundingClientRect();
          var sub = buildMenu(val(it.sub), mr.width - 3, r.top - mr.top - 3, m);
          sub.style.zIndex = 41;
        };
        row.addEventListener('mouseenter', open); row.addEventListener('click', function (e) { e.stopPropagation(); open(); });
      } else if (!dis) {
        row.addEventListener('click', function (e) { e.stopPropagation(); U.closeMenus(); setTimeout(function () { it.act && it.act(); }, 0); });
        row.addEventListener('mouseenter', function () { m.querySelectorAll(':scope > .u98-menu').forEach(function (s) { s.remove(); }); });
      }
      m.appendChild(row);
    });
    m.style.left = x + 'px'; m.style.top = y + 'px';
    parentEl.appendChild(m);
    /* keep inside the screen */
    var sr = D.screen.getBoundingClientRect(), r = m.getBoundingClientRect();
    if (r.right > sr.right - 2) m.style.left = (x - (r.right - sr.right) - 4) + 'px';
    if (r.bottom > sr.bottom - 30) m.style.top = Math.max(0, y - (r.bottom - sr.bottom + 30)) + 'px';
    return m;
  }

  /* ------------------------------------------------------------ windows */
  var cascade = 0;
  U.open = function (id, arg) {
    var app = U.apps[id]; if (!app) return;
    if (D.off) return;
    if (app.comingSoon) {
      U.sfx('error');
      U.dialog({ title: app.title, icon: 'error', html: esc('C:\\ULTRA98\\' + app.exe) + '<br><br>This program is not installed yet.<br>Insert <b>Origami Ultra Disk 2</b> and try again.', buttons: [{ label: 'OK', def: true }] });
      return;
    }
    var existing = U.wins.filter(function (w) { return w.id === id; })[0];
    if (existing) { existing.restore(); if (arg) existing.emit('route', arg); return existing; }
    var autoFs = false;
    if (U.isSmall() && !D.screen.classList.contains('fs') && !document.fullscreenElement) { setPseudoFs(true); autoFs = true; }
    U.openArg = arg || null;
    var w = new Win(app, autoFs);
    U.openArg = null;
    if (!arg) setHash(id);   /* apps given a deep link keep their own hash */
    return w;
  };

  function Win(app, autoFs) {
    var self = this;
    this.autoFs = !!autoFs;
    this.id = app.id; this.app = app; this.handlers = {}; this.minimized = false;
    var e = this.el = el('div', 'u98-win');
    e.innerHTML = '<div class="u98-title"><span class="t"></span>' +
      '<button class="u98-tb mn" type="button" aria-label="Minimize">' + SVG.min + '</button>' +
      '<button class="u98-tb mx" type="button" aria-label="Maximize">' + SVG.max + '</button>' +
      '<button class="u98-tb x" type="button" aria-label="Close">' + SVG.x + '</button></div>' +
      '<div class="u98-body"></div>';
    this.titleEl = e.querySelector('.u98-title');
    this.titleEl.insertBefore(U.iconEl(app.small, 16), this.titleEl.firstChild);
    this.body = e.querySelector('.u98-body');
    this.setTitle(app.title);
    if (app.resizable === false) e.querySelector('.mx').disabled = true, e.querySelector('.mx').style.opacity = .55;
    e.querySelector('.mn').addEventListener('click', function (ev) { ev.stopPropagation(); self.minimize(); });
    e.querySelector('.mx').addEventListener('click', function (ev) { ev.stopPropagation(); if (app.resizable !== false) self.toggleMax(); });
    e.querySelector('.x').addEventListener('click', function (ev) { ev.stopPropagation(); self.close(); });
    e.addEventListener('pointerdown', function () { self.focus(); });
    dragTitle(this);
    this.task = el('button', 'u98-btn u98-task');
    this.task.type = 'button';
    this.task.appendChild(U.iconEl(app.small, 16));
    this.task.appendChild(el('span', '', esc(app.title)));
    this.task.addEventListener('click', function () {
      if (U.active === self && !self.minimized) self.minimize(); else self.restore();
    });
    D.tasks.appendChild(this.task);
    D.desk.appendChild(e);
    U.wins.push(this);
    app.create(this);
    this.place();
    this.focus();
    U.sfx('click');
  }
  Win.prototype.on = function (ev, fn) { (this.handlers[ev] = this.handlers[ev] || []).push(fn); return this; };
  Win.prototype.emit = function (ev, a) {
    var r, hs = this.handlers[ev] || [];
    for (var i = 0; i < hs.length; i++) { var x = hs[i](a); if (x === true) r = true; }
    return r;
  };
  Win.prototype.setTitle = function (t) { this.titleEl.querySelector('.t').textContent = t; if (this.task) this.task.querySelector('span').textContent = t; };
  Win.prototype.deskSize = function () { return { w: D.desk.clientWidth, h: D.desk.clientHeight }; };
  Win.prototype.place = function () {
    var s = this.deskSize(), e = this.el;
    if (U.isSmall() && this.app.resizable !== false) { e.classList.add('max'); this.emit('resize'); return; }
    var w = e.offsetWidth, h = e.offsetHeight;
    var x = Math.max(0, Math.round((s.w - w) / 2) + (cascade % 4) * 18 - 27), y = Math.max(0, Math.round((s.h - h) / 2.4) + (cascade % 4) * 18 - 27);
    cascade++;
    e.style.left = Math.min(Math.max(0, x), Math.max(0, s.w - w)) + 'px';
    e.style.top = Math.min(Math.max(0, y), Math.max(0, s.h - h)) + 'px';
    this.emit('resize');
  };
  /* keep a window fully on the desk after its size changes */
  Win.prototype.fit = function (center) {
    var s = this.deskSize(), e = this.el;
    if (e.classList.contains('max')) { this.emit('resize'); return; }
    var w = e.offsetWidth, h = e.offsetHeight, x = e.offsetLeft, y = e.offsetTop;
    if (center) { x = Math.round((s.w - w) / 2); y = Math.round((s.h - h) / 2.4); }
    e.style.left = Math.max(0, Math.min(x, s.w - w)) + 'px';
    e.style.top = Math.max(0, Math.min(y, s.h - h)) + 'px';
  };
  function raise(win) {   /* restack 11..(10+n) so windows never climb over menus, dialogs or the taskbar */
    var list = U.wins.filter(function (w) { return w !== win; }).sort(function (a, b) { return (+a.el.style.zIndex || 0) - (+b.el.style.zIndex || 0); });
    list.push(win);
    list.forEach(function (w, i) { w.el.style.zIndex = 11 + i; });
  }
  U.deactivate = function () {
    var a = U.active; if (!a) return;
    a.el.classList.remove('active'); a.task.classList.remove('down');
    U.active = null; a.emit('blur');
  };
  Win.prototype.focus = function () {
    if (U.active === this) { raise(this); return; }
    var prev = U.active;
    U.wins.forEach(function (w) { w.el.classList.remove('active'); w.task.classList.remove('down'); });
    this.el.classList.add('active'); this.task.classList.add('down'); raise(this);
    U.active = this;
    if (prev && prev !== this) prev.emit('blur');
    this.emit('focus');
  };
  Win.prototype.minimize = function () {
    this.minimized = true; this.el.classList.add('min'); this.task.classList.remove('down');
    this.el.classList.remove('active'); this.emit('blur'); this.emit('min');
    if (U.active === this) { U.active = null; var vis = U.wins.filter(function (w) { return !w.minimized; }); if (vis.length) vis[vis.length - 1].focus(); }
    if (this.autoFs && !U.wins.some(function (w) { return !w.minimized && w.autoFs; })) setPseudoFs(false);
  };
  Win.prototype.restore = function () {
    var was = this.minimized;
    this.minimized = false; this.el.classList.remove('min');
    if (was && this.autoFs && !D.screen.classList.contains('fs')) setPseudoFs(true);
    this.focus(); if (was) this.emit('restore'); this.emit('resize');
  };
  Win.prototype.toggleMax = function () {
    this.el.classList.toggle('max');
    this.el.querySelector('.mx').innerHTML = this.el.classList.contains('max') ? SVG.res : SVG.max;
    this.emit('resize');
  };
  Win.prototype.isMax = function () { return this.el.classList.contains('max'); };
  Win.prototype.close = function (silent) {
    if (this.closed) return;
    this.closed = true;
    this.emit('close');
    this.el.remove(); this.task.remove();
    U.wins = U.wins.filter(function (w) { return w !== this; }, this);
    if (U.active === this) { U.active = null; if (U.wins.length) U.wins[U.wins.length - 1].focus(); }
    if (this.autoFs && !U.wins.some(function (w) { return w.autoFs && !w.minimized; })) setPseudoFs(false);
    if (!U.wins.length) setHash('');
  };
  Win.prototype.menu = function (spec) {
    var self = this, bar = el('div', 'u98-menubar');
    spec.forEach(function (m) {
      var mi = el('div', 'u98-mi', acc(m.label));
      function open() {
        U.closeMenus();
        mi.classList.add('open'); U.openMenu = mi;
        var r = mi.getBoundingClientRect(), wr = self.el.getBoundingClientRect();
        buildMenu(val(m.items), r.left - wr.left, r.bottom - wr.top, self.el);
      }
      mi.addEventListener('click', function (e) { e.stopPropagation(); if (mi.classList.contains('open')) U.closeMenus(); else open(); });
      mi.addEventListener('mouseenter', function () { if (U.openMenu && U.openMenu !== mi && U.openMenu.parentNode === bar) open(); });
      bar.appendChild(mi);
    });
    this.el.insertBefore(bar, this.body);
    return bar;
  };
  Win.prototype.status = function (cells) {
    var bar = el('div', 'u98-status');
    var out = cells.map(function (c) { var d = el('div', c.fit ? 'fit' : ''); d.textContent = c.text || ''; if (c.w) d.style.flex = '0 0 ' + c.w + 'px'; bar.appendChild(d); return d; });
    this.el.appendChild(bar);
    return out;
  };
  Win.prototype.dialog = function (o) { return U.dialog(o, this); };

  function dragTitle(w) {
    var t = w.titleEl, st = null;
    t.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || w.isMax()) return;
      w.focus();
      st = { x: e.clientX, y: e.clientY, l: w.el.offsetLeft, t: w.el.offsetTop };
      t.setPointerCapture(e.pointerId);
    });
    t.addEventListener('pointermove', function (e) {
      if (!st) return;
      var s = w.deskSize(), W = w.el.offsetWidth;
      var nl = st.l + e.clientX - st.x, nt = st.t + e.clientY - st.y;
      nl = Math.max(-W + 60, Math.min(s.w - 60, nl)); nt = Math.max(0, Math.min(s.h - 20, nt));
      w.el.style.left = nl + 'px'; w.el.style.top = nt + 'px';
    });
    t.addEventListener('pointerup', function () { st = null; });
    t.addEventListener('dblclick', function (e) { if (!e.target.closest('button') && w.app.resizable !== false) w.toggleMax(); });
  }
  function resizeAll() { U.wins.forEach(function (w) { if (!w.minimized) { w.emit('resize'); w.fit(); } }); }

  /* ------------------------------------------------------------ dialogs (modal message boxes) */
  D.dlgs = [];
  U.dialog = function (o, owner) {
    return new Promise(function (resolve) {
      var modal = el('div', 'u98-modal');
      var d = el('div', 'u98-dlg');
      d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', o.title || 'Message');
      d.innerHTML = '<div class="u98-title"><span class="t"></span><button class="u98-tb x" type="button" aria-label="Close">' + SVG.x + '</button></div>' +
        '<div class="db">' + (o.icon ? ICONS[o.icon] : '') + '<div class="tx"></div></div><div class="bt"></div>';
      d.querySelector('.t').textContent = o.title || '';
      var tx = d.querySelector('.tx');
      if (o.html != null) tx.innerHTML = o.html; else tx.textContent = o.text || '';
      if (o.wide) { tx.style.maxWidth = 'none'; d.style.minWidth = Math.min(o.wide, D.desk.clientWidth - 16) + 'px'; }
      var bt = d.querySelector('.bt'), det = null, defBtn = null;
      function done(v) {
        modal.remove(); D.dlgs = D.dlgs.filter(function (x) { return x !== api; });
        resolve(v);
        if (owner && !owner.closed) owner.focus();
      }
      (o.buttons || [{ label: 'OK', def: true }]).forEach(function (b) {
        var btn = el('button', 'u98-btn' + (b.def ? ' def' : ''));
        btn.type = 'button'; btn.innerHTML = '<span>' + acc(b.label) + '</span>';
        btn.addEventListener('click', function () {
          if (b.details) {
            if (!det) { det = el('div', 'det u98-sunken'); det.textContent = o.details; d.insertBefore(det, bt.nextSibling); btn.innerHTML = '<span>&lt;&lt; <u>D</u>etails</span>'; }
            else { det.remove(); det = null; btn.innerHTML = '<span><u>D</u>etails &gt;&gt;</span>'; }
            place(); return;
          }
          var v = b.value !== undefined ? b.value : b.label;
          if (o.validate && v !== null && b.value !== null && o.validate(d) === false) return;
          if (o.collect && b.value !== null && v !== null) v = o.collect(d, v);
          done(v);
        });
        if (b.def) defBtn = btn;
        bt.appendChild(btn);
      });
      d.querySelector('.x').addEventListener('click', function () { done(o.cancelValue !== undefined ? o.cancelValue : null); });
      modal.appendChild(d); D.screen.appendChild(modal);
      function place() {
        var s = { w: D.desk.clientWidth, h: D.desk.clientHeight };
        d.style.left = Math.max(4, Math.round((s.w - d.offsetWidth) / 2)) + 'px';
        d.style.top = Math.max(4, Math.round((s.h - d.offsetHeight) / 2.3)) + 'px';
      }
      place();
      /* drag by title */
      var tt = d.querySelector('.u98-title'), st = null;
      tt.addEventListener('pointerdown', function (e) { if (e.target.closest('button')) return; st = { x: e.clientX, y: e.clientY, l: d.offsetLeft, t: d.offsetTop }; tt.setPointerCapture(e.pointerId); });
      tt.addEventListener('pointermove', function (e) { if (!st) return; d.style.left = (st.l + e.clientX - st.x) + 'px'; d.style.top = Math.max(0, st.t + e.clientY - st.y) + 'px'; });
      tt.addEventListener('pointerup', function () { st = null; });
      var api = {
        key: function (e) {
          if (e.key === 'Escape') { e.preventDefault(); done(o.cancelValue !== undefined ? o.cancelValue : null); }
          else if (e.key === 'Enter' && !(e.target.tagName === 'BUTTON')) { e.preventDefault(); if (defBtn) defBtn.click(); }
        }
      };
      D.dlgs.push(api);
      var first = d.querySelector('input:not([type=radio]),input[type=radio]:checked') || defBtn;
      setTimeout(function () { try { first && first.focus({ preventScroll: true }); if (first && first.select) first.select(); } catch (e) {} }, 30);
      if (o.sound !== false) U.sfx(o.icon === 'error' ? 'error' : 'ding');
      if (o.onOpen) o.onOpen(d);
    });
  };
  /* text prompt -> resolves to string or null */
  U.prompt = function (o, owner) {
    return U.dialog({
      title: o.title, icon: o.icon, sound: o.sound,
      html: esc(o.text) + '<div style="margin-top:8px"><input class="u98-input" maxlength="' + (o.max || 24) + '" value="' + esc(o.value || '') + '"></div>',
      buttons: [{ label: 'OK', def: true, value: 'ok' }].concat(o.noCancel ? [] : [{ label: 'Cancel', value: null }]),
      collect: function (d) { return d.querySelector('input').value; }
    }, owner);
  };
  U.icons = ICONS;
  document.addEventListener('DOMContentLoaded', function () {
    var h = document.getElementById('ultra98'); if (!h) return;
    /* on the desktop but not installed yet */
    if (!U.apps.exitsim) U.register({ id: 'maze', title: '3D Maze', label: '3D Maze', exe: 'MAZE.EXE', icon: 'icon_maze', comingSoon: true });
    U.mount(h);
  });
})();
