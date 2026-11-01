/* ============================================================
   GAMI NET — GAMINET.EXE  (Funtazia · ULTRA 98)
   A browser for an alternative internet of .ou websites.
   The shell: address resolution, history, favorites, search
   index, loading, and the network's site loader.
   ============================================================ */
(function () {
  'use strict';
  var U = window.ULTRA98; if (!U) return;
  var BASE = 'arcade/gaminet/';
  var VERSION = '2';
  var GN_ICONS = {"icon": ["................................", "................................", "................................", "............kkkkkkkk............", "..........kkkkUUUUkkkk..........", "........kkkUUUUUUUUUUkkk........", ".......kkUUUUUUUUUUUUUUkk.......", "......kkUUuuAUUUUUUUUUUUk5555...", ".....kkUUuAAAAUUUUUUAAAUUkk.55..", ".....kUUuAAAAAAUUUUAAAAAUUk..5..", "....kkUUuAAAAAAAUUUAAAAAUVkk.5..", "....kUUAAAAAAAAAUUUAAAAAVVVk5...", "...kkUUAAAAAAAAAUUUUUAUVVVV55...", "...kkUUAAAAAAAAAUUUUUUVVVV55k...", "...kUUUAAAAAAAAAUUUUUVVVV55Vk...", "...kUUUUAAAAAAAUUUUUVVVV55VVk...", "...kUUUUAAAAAAAUUUABBBV55VVVk...", "...kUUUUUAAAAAUUUABBB555VVVVk...", "...kkUUUUUUUUUUUUBBB55BVVVVkk...", "...5kUUUUUUUUUUUBB55BBBVVVVkk...", "...5kUUUUUUUUUUV555BBBBVVVVk....", "..5.kkUUUUUUUU555BBBBBBVVVkk....", "..5..kUUUUU555VVVBBBBBBVVVk.....", "..55.kkU5555VVVVVBBBBBVVVkk.....", "...55555UUUVVVVVVVBBBVVVkk......", ".......kkUVVVVVVVVVVVVVkk.......", "........kkkVVVVVVVVVVkkk........", "..........kkkkVVVVkkkk..........", "............kkkkkkkk............", "................................", "................................", "................................"], "small": ["................", ".....kkkkkk.....", "...kkUUUUUUkk...", "..kUUAAUUUUUUk..", ".kUAAAAUUUUUU5k.", ".kUAAAUUUUUU55k.", "kUUUAAUUUUU55UUk", "kUUUUUUUUU55UAUk", "kUUUUUUU555UAAUk", "kUUUUU555UUAAAUk", ".kUU555UUUAAAUk.", ".k555UUUUUUAAUk.", "55kUUUUUUUUUUk..", "...kkUUUUUUkk...", ".....kkkkkk.....", "................"], "tb": {"back": ["................", "......BB........", ".....BAB........", "....BAAB........", "...BAAABBBBBBB..", "..BAAAAAAAAAAB..", ".BAAAAAAAAAAAB..", "..BAAAAAAAAAAB..", "...BAAABBBBBBB..", "....BAAB........", ".....BAB........", "......BB........", "................", "................", "................", "................"], "fwd": ["................", "........BB......", "........BAB.....", "........BAAB....", "..BBBBBBBAAAB...", "..BAAAAAAAAAAB..", "..BAAAAAAAAAAAB.", "..BAAAAAAAAAAB..", "..BBBBBBBAAAB...", "........BAAB....", "........BAB.....", "........BB......", "................", "................", "................", "................"], "stop": ["................", "....kkkkkkk.....", "...kxxxxxxxk....", "..kxxxxxxxxxk...", ".kxxwxxxxxwxxk..", ".kxxxwxxxwxxxk..", ".kxxxxwxwxxxxk..", ".kxxxxxwxxxxxk..", ".kxxxxwxwxxxxk..", ".kxxxwxxxwxxxk..", ".kxxwxxxxxwxxk..", "..kxxxxxxxxxk...", "...kxxxxxxxk....", "....kkkkkkk.....", "................", "................"], "reload": ["................", ".....UUUUU......", "...UU.....UU.U..", "..U.........UU..", "..U........UUU..", ".U.......UUUU...", ".U..............", ".U..............", ".U...........U..", ".U...........U..", "..U.........U...", "..UU.......U....", "...UU.....UU....", ".....UUUUU......", "................", "................"], "home": [".......kk.......", "......kyyk......", ".....kyyyyk.kk..", "....kyyyyyykqk..", "...kyyyyyyyykk..", "..kyyyyyyyyyyk..", ".kkkkkkkkkkkkkk.", "..kccccccccccck.", "..kcRRccccUUcck.", "..kcRRccccUUcck.", "..kcRRccccccccck", "..kcRRcccccccck.", "..kcRRcccccccck.", "..kkkkkkkkkkkkk.", "................", "................"], "search": ["................", "....kkkk........", "...kuuuuk.......", "..kuwuuuuk......", "..kuuuuuuk......", "..kuuuuuuk......", "..kuuuuuuk......", "...kuuuuk.......", "....kkkkkk......", "........kkk.....", ".........kkk....", "..........kkk...", "...........kkk..", "............kk..", "................", "................"], "fav": [".......k........", "......kyk.......", "......kyk.......", ".....kyyyk......", "kkkkkkyyyykkkkk.", ".kyyyyyyyyyyyk..", "..kyyyyyyyyyk...", "...kyyyyyyyk....", "....kyyyyyk.....", "...kyyykyyyk....", "...kyyk.kyyk....", "..kyyk...kyyk...", "..kyk.....kyk...", "..kk.......kk...", "................", "................"], "go": ["................", "................", ".......BB.......", ".......BAB......", ".......BAAB.....", ".BBBBBBBAAAB....", ".BAAAAAAAAAAB...", ".BAAAAAAAAAAAB..", ".BAAAAAAAAAAB...", ".BBBBBBBAAAB....", ".......BAAB.....", ".......BAB......", ".......BB.......", "................", "................", "................"], "page": ["................", "..kkkkkkkk......", "..kwwwwwwkk.....", "..kwwwwwwkwk....", "..kwQQQQwkkkk...", "..kwwwwwwwwwk...", "..kwQQQQQQwwk...", "..kwwwwwwwwwk...", "..kwQQQQQQwwk...", "..kwwwwwwwwwk...", "..kwQQQQwwwwk...", "..kwwwwwwwwwk...", "..kkkkkkkkkkk...", "................", "................", "................"]}};
  U.art.pal.A = U.art.pal.A || '#46c046'; U.art.pal.B = U.art.pal.B || '#1f7a1f';
  U.addSprite('icon_gaminet', GN_ICONS.icon); U.addSprite('icon_gaminet_s', GN_ICONS.small);
  Object.keys(GN_ICONS.tb).forEach(function (k) { U.addSprite('gn_' + k, GN_ICONS.tb[k]); });

  /* ---------------------------------------------------------------- the network */
  var GN = window.GAMINET = { sites: {}, waits: {}, BASE: BASE };
  GN.site = function (host, def) { GN.sites[host] = def; var w = GN.waits[host] || []; delete GN.waits[host]; w.forEach(function (f) { f(def); }); };
  var FILES = { 'directory.ou': 'directory', 'ultrawater.ou': 'ultrawater', 'fountaincam.ou': 'fountaincam', 'abandonedfutures.ou': 'abandonedfutures', 'marmotnationalism.ou': 'marmotnationalism', 'luckystationary.ou': 'luckystationary', 'gamilexicon.ou': 'gamilexicon' };
  var BUILDING = {
    'route59.ou': { title: 'ROUTE 59 CORRIDOR ARCHIVE', by: 'the Route 59 Corridor Archive', note: 'Documenting West Nyack, Nanuet, Orangeburg and the commercial landscape of Route 59, Rockland County, NY.' },
    'stopnrest.ou': { title: 'STOP N’ REST MOTEL', by: 'the management', note: 'Clean rooms. Color TV. Ice machine. Easy on, easy off the highway.' }
  };
  GN.HOSTS = ['directory.ou', 'ultrawater.ou', 'route59.ou', 'stopnrest.ou', 'fountaincam.ou', 'abandonedfutures.ou', 'luckystationary.ou', 'marmotnationalism.ou', 'gamilexicon.ou'];

  /* every page the directory can find, so search works without loading the sites */
  GN.INDEX = [
    { u: 'directory.ou', t: 'GamiNet Directory', d: 'The official search and directory service of Gami Net. Every .ou site, sorted by subject.', k: 'search directory portal index find websites gami net categories random', c: 'Government & Organizations' },
    { u: 'directory.ou/new', t: 'GamiNet Directory: What’s New', d: 'Recently added and updated listings across the network.', k: 'new updated listings', c: 'Government & Organizations' },
    { u: 'directory.ou/about', t: 'About the GamiNet Directory', d: 'How the directory is compiled, and how .ou addresses work.', k: 'about help how addresses ou domain', c: 'Government & Organizations' },

    { u: 'ultrawater.ou', t: 'ULTRAWATER: Water as Infrastructure', d: 'Corporate home of ULTRAWATER, a water-design company working across vessels, civic fountains, atmosphere and synthetic nature.', k: 'water bottle hydration fountain design industrial corporation infrastructure company mona', c: 'Business & Industry' },
    { u: 'ultrawater.ou/individual', t: 'ULTRAWATER Individual: MONA modular vessel', d: 'Modular reusable vessels with kelp-fiber composite frames, transparent bio-resin windows and replaceable parts.', k: 'bottle vessel jug reusable modular kelp fiber composite bio-resin replaceable components exploded diagram', c: 'Business & Industry' },
    { u: 'ultrawater.ou/home', t: 'ULTRAWATER Home Systems', d: 'Pitchers, filtration, the 12-vessel case, and integrated kitchen and bathroom water hardware.', k: 'pitcher filtration kitchen bathroom case domestic home', c: 'Business & Industry' },
    { u: 'ultrawater.ou/civic', t: 'ULTRAWATER Civic Systems', d: 'Public fountains, refill terminals, campus and office hydration, vending infrastructure.', k: 'fountain fountains public refill terminal civic campus office vending municipal drinking', c: 'Business & Industry' },
    { u: 'ultrawater.ou/atmosphere', t: 'ULTRAWATER Atmosphere', d: 'Mist, condensation and humidity control: water you breathe and feel rather than drink.', k: 'mist condensation humidity fog atmosphere air', c: 'Architecture & Research' },
    { u: 'ultrawater.ou/synthetic-nature', t: 'ULTRAWATER Synthetic Nature', d: 'Artificial waterfalls, interior water environments and fabricated natural atmospheres.', k: 'waterfall artificial nature interior fog installation atrium mall water feature', c: 'Architecture & Research' },
    { u: 'ultrawater.ou/research', t: 'ULTRAWATER Research & Development', d: 'Program notes from the kelp-fiber composite and bio-resin optics labs.', k: 'research development lab kelp resin materials program', c: 'Architecture & Research' },
    { u: 'ultrawater.ou/terminal', t: 'ULTRAWATER Virtual Hydration Terminal', d: 'Simulate filling a vessel: choose a system, set the flow, watch the volume.', k: 'simulator terminal fill hydration flow interactive', c: 'Business & Industry' },
    { u: 'ultrawater.ou/corporate', t: 'ULTRAWATER Corporate Information', d: 'Company history, principles, divisions and investor notes.', k: 'corporate about company history investors careers', c: 'Business & Industry' },

    { u: 'route59.ou', t: 'Route 59 Corridor Archive (under construction)', d: 'A hyperlocal archive of Route 59 in Rockland County, NY: Palisades Center, the Nanuet Mall, the Shops at Nanuet, toy stores and roadside memory.', k: 'route 59 rockland county new york west nyack nanuet orangeburg palisades center nanuet mall shops at nanuet toywiz mall malls suburban highway retail roadside americana hotel', c: 'Geography & Local History' },
    { u: 'stopnrest.ou', t: 'Stop N’ Rest Motel (under construction)', d: 'Clean rooms, color TV, ice machine and easy highway access.', k: 'motel hotel stop n rest vacancy color tv rooms roadside highway interstate room 6', c: 'Entertainment & Attractions' },

    { u: 'fountaincam.ou', t: 'FountainCam Network', d: 'Continuous simulated camera feeds of shopping-mall fountains and commercial water features.', k: 'fountain fountains webcam camera cam feed mall malls atrium plaza lobby water feature live mallsoft muzak surveillance', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/plaza-001', t: 'FountainCam: PLAZA CAM 001', d: 'Overhead view of an outdoor plaza basin with a central jet.', k: 'plaza fountain basin overhead jet', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/north-atrium', t: 'FountainCam: NORTH ATRIUM FOUNTAIN', d: 'A tiered atrium fountain under a skylight.', k: 'atrium mall skylight tiered fountain', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/lobby-04', t: 'FountainCam: CORPORATE LOBBY 04', d: 'A granite water wall in a corporate lobby.', k: 'lobby corporate water wall granite', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/watercourt', t: 'FountainCam: MEADOWLANDS WATERCOURT', d: 'Choreographed dancing jets in a retail watercourt.', k: 'watercourt dancing jets choreographed retail meadowlands', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/reflection-pool', t: 'FountainCam: HOTEL REFLECTION POOL', d: 'A still reflection pool at night.', k: 'hotel reflection pool night still', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/feed/vacant-retail', t: 'FountainCam: VACANT RETAIL FOUNTAIN', d: 'An empty basin in a vacant retail concourse. Signal unstable.', k: 'vacant dead mall empty abandoned retail fountain', c: 'Entertainment & Attractions' },
    { u: 'fountaincam.ou/about', t: 'About the FountainCam Network', d: 'Why the network watches fountains.', k: 'about faq why fountains', c: 'Entertainment & Attractions' },

    { u: 'abandonedfutures.ou', t: 'Abandoned Futures: an archive of unrealized environments', d: 'A research database of unbuilt architecture, demolished environments, abandoned developments and radically altered megaprojects.', k: 'architecture archive database abandoned unbuilt demolished theme park theme parks megaproject research history futures', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/dubailand', t: 'Dubailand, Dubai (Partially Realized)', d: 'A 2003 masterplan for the world’s largest leisure destination, paused in 2008 and only partly built.', k: 'dubai uae united arab emirates theme park theme parks entertainment masterplan megaproject 2008 financial crisis', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/nara-dreamland', t: 'Nara Dreamland, Japan (Demolished)', d: 'A Disneyland-inspired park that opened in 1961, closed in 2006 and was demolished in 2016–2017.', k: 'nara japan theme park theme parks amusement park abandoned demolished dreamland roller coaster', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/nakagin-capsule-tower', t: 'Nakagin Capsule Tower, Tokyo (Preserved Fragments)', d: 'Kisho Kurokawa’s 1972 Metabolist tower, demolished in 2022 with 23 capsules saved.', k: 'tokyo japan metabolism metabolist capsule tower kurokawa ginza demolished 2022 architecture', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/palace-of-the-soviets', t: 'Palace of the Soviets, Moscow (Never Constructed)', d: 'A 416-metre Soviet monument begun in the 1930s and stopped by war; its foundation became an open-air pool.', k: 'moscow russia soviet ussr palace iofan monument unbuilt never constructed pool cathedral', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/meadowlands-xanadu', t: 'Meadowlands Xanadu, New Jersey (Radically Altered)', d: 'A stalled megamall that became American Dream, opening in 2019.', k: 'new jersey meadowlands xanadu american dream mall malls megamall shopping center redevelopment east rutherford', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/six-flags-new-orleans', t: 'Six Flags New Orleans (Jazzland), Louisiana (Abandoned)', d: 'A theme park that opened in 2000, closed by Hurricane Katrina in 2005 and stood abandoned for nearly twenty years.', k: 'new orleans louisiana theme park theme parks amusement park abandoned hurricane katrina flood jazzland six flags rides bayou phoenix demolition', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/project/ryugyong-hotel', t: 'Ryugyong Hotel, Pyongyang (Partially Realized)', d: 'A 105-storey pyramid hotel begun in 1987, halted in 1992, clad in glass in 2011 and never opened.', k: 'pyongyang north korea hotel tower skyscraper pyramid unfinished never opened orascom tallest unoccupied', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/today', t: 'Abandoned Futures: Today\u2019s Lost Future', d: 'One record from the archive, selected by date.', k: 'today daily lost future featured record', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/about', t: 'About Abandoned Futures', d: 'Scope, method and sources of the archive.', k: 'about method sources scope research', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/browse', t: 'Abandoned Futures: Browse the Archive', d: 'Filter records by country, decade, type and final status.', k: 'browse filter search records country decade status', c: 'Architecture & Research' },
    { u: 'abandonedfutures.ou/categories', t: 'Abandoned Futures: Status Classifications', d: 'Never Constructed, Partially Realized, Abandoned, Demolished, Radically Altered, Preserved Fragments.', k: 'categories classification status definitions', c: 'Architecture & Research' },

    { u: 'luckystationary.ou', t: 'LUCKY STATIONARY: Toys, Cards & School Supplies', d: 'A stationery and toy shop in Pune, India. Gel pens, erasers, trading cards, wind chimes and gifts.', k: 'stationery stationary shop store toys cards trading cards pune india school supplies gel pens erasers notebooks gifts wind chimes', c: 'Culture & History' },
    { u: 'luckystationary.ou/toys-cards', t: 'Lucky Stationary: Toys & Cards', d: 'Monster card packs, spinning tops, yo-yos, toy cars, water guns.', k: 'toys cards packs trading card game monsters tops yo-yo', c: 'Culture & History' },
    { u: 'luckystationary.ou/school-supplies', t: 'Lucky Stationary: School Supplies', d: 'Gel pens, scented erasers, geometry boxes, notebooks, tiffin boxes and bottles.', k: 'school supplies gel pens erasers geometry box notebooks tiffin bottle sharpener stickers', c: 'Culture & History' },
    { u: 'luckystationary.ou/counter', t: 'Lucky Stationary: The Display Counter', d: 'Step up to the counter and look at the shelves.', k: 'counter shop interior shelves display virtual', c: 'Culture & History' },
    { u: 'luckystationary.ou/memories', t: 'Lucky Stationary: Memories', d: 'Summer trips, a cousin, and a shop that stood for a whole period of life.', k: 'memories childhood cousin summer india nostalgia', c: 'Culture & History' },
    { u: 'luckystationary.ou/rare-finds', t: 'Lucky Stationary: Rare Finds (card packs)', d: 'Open monster card packs and keep your collection.', k: 'rare cards pack opening collection holo binder', c: 'Culture & History' },

    { u: 'gamilexicon.ou', t: 'Gami Lexicon: the Gami Dictionary', d: 'The Gami Dictionary online. Look up words, browse A to Z, word of the day.', k: 'dictionary lexicon gami words definitions slang language glossary vocabulary meaning define word of the day', c: 'Arts & Media' },
    { u: 'gamilexicon.ou/all', t: 'Gami Lexicon: Full Dictionary', d: 'Every entry in the Gami Dictionary on one page.', k: 'full dictionary all words list glossary', c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/giga', t: 'Gami Lexicon: Giga', d: "Good, impressive, hard, elite, beautiful, powerful, unusually successful.", k: "define definition meaning giga good impressive hard elite beautiful powerful unusually successful", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/ill', t: 'Gami Lexicon: Ill', d: "Bad, disturbing, ugly, embarrassing, spiritually unpleasant, or just deeply off.", k: "define definition meaning ill bad disturbing ugly embarrassing spiritually unpleasant or just deeply off", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/audio', t: 'Gami Lexicon: Audio', d: "Bad music, bad sound, or something sonically embarrassing.", k: "define definition meaning audio bad music bad sound or something sonically embarrassing", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/footage', t: 'Gami Lexicon: Footage', d: "Embarrassing, cursed, awkward, or incriminating visual material.", k: "define definition meaning footage embarrassing cursed awkward or incriminating visual material", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/ill-combinations', t: 'Gami Lexicon: Ill combinations', d: "Compound words built from ill + another noun: illdio, ill footage, ill files.", k: "define definition meaning ill combinations compound words built from ill + another noun illdio ill footage ill files", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/malware', t: 'Gami Lexicon: Malware', d: "Something actively contaminating the environment.", k: "define definition meaning malware something actively contaminating the environment", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/trojan-horse', t: 'Gami Lexicon: Trojan Horse', d: "Something that looks harmless or appealing but secretly imports something awful.", k: "define definition meaning trojan horse something that looks harmless or appealing but secretly imports something awful", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/matrix', t: 'Gami Lexicon: Matrix', d: "Artificial, fake, conformist, manufactured, spiritually dead.", k: "define definition meaning matrix artificial fake conformist manufactured spiritually dead", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/files', t: 'Gami Lexicon: Files', d: "Embarrassing, incriminating, bizarre, or cursed material associated with someone.", k: "define definition meaning files embarrassing incriminating bizarre or cursed material associated with someone", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/reeks', t: 'Gami Lexicon: Reeks', d: "Radiates an unmistakable negative quality.", k: "define definition meaning reeks radiates an unmistakable negative quality", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/coded', t: 'Gami Lexicon: Coded', d: "Carries the vibe, characteristics, or associations of something without literally being that thing.", k: "define definition meaning coded carries the vibe characteristics or associations of something without literally being that thing", c: 'Arts & Media' },
    { u: 'gamilexicon.ou/word/dit', t: 'Gami Lexicon: DIT', d: "Dead Internet Theory.", k: "define definition meaning dit dead internet theory", c: 'Arts & Media' },

    { u: 'marmotnationalism.ou', t: 'National Marmot Front: Official Headquarters', d: 'ONE BURROW. ONE PEOPLE. ONE FUTURE. The official site of the movement for marmot sovereignty.', k: 'marmot marmots nationalism national front party government alpine burrow burrows grass politics satire', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/referendum', t: 'National Marmot Front: National Referendum', d: 'Vote on burrow funding, cable cars, a Ministry of Grass and the next ceremonial chairman.', k: 'vote election referendum ballot ministry of grass cable cars chairman', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/territory', t: 'National Marmot Front: National Territory', d: 'A map of the marmot provinces.', k: 'map territory provinces alps mountains', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/platform', t: 'National Marmot Front: Party Platform', d: 'Burrow sovereignty, grass access, hibernation rights.', k: 'platform policy grass hibernation', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/bulletins', t: 'National Marmot Front: Government Bulletins', d: 'Official announcements, including the alpine hydration contract.', k: 'bulletins announcements news contract hydration water', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/chairman', t: 'National Marmot Front: The Chairman', d: 'Official portrait and biography of the Chairman.', k: 'chairman leader portrait biography', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/symbols', t: 'National Marmot Front: National Symbols', d: 'The flag, the seal, the anthem and the national whistle.', k: 'flag seal anthem symbols whistle', c: 'Arts & Media' },
    { u: 'marmotnationalism.ou/foreign-relations', t: 'National Marmot Front: Foreign Relations', d: 'Relations with pikas, eagles, ski resorts and the lowland groundhog states.', k: 'foreign relations diplomacy pikas eagles', c: 'Government & Organizations' },
    { u: 'marmotnationalism.ou/join', t: 'National Marmot Front: Join the Movement', d: 'Receive your official membership card.', k: 'join membership card member', c: 'Government & Organizations' }
  ];
  /* the Abandoned Futures database is a separate, regularly updated file; merge its records into search */
  GN.afDB = null;
  GN.loadAF = function () {
    if (GN.afDB) return GN.afDB;
    var SN = { NC: 'Never Constructed', PR: 'Partially Realized', AB: 'Abandoned', DM: 'Demolished', RA: 'Radically Altered', PF: 'Preserved Fragments' };
    var p = GN.afDB = fetch(BASE + 'data/abandonedfutures.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).catch(function (e) { if (window.__AF_DB) return window.__AF_DB; throw e; }).then(function (db) {
      (db.records || []).forEach(function (r) {
        var u = 'abandonedfutures.ou/project/' + r.id;
        if (GN.INDEX.some(function (e) { return e.u === u; })) return;
        GN.INDEX.push({ u: u, t: r.name + ', ' + String(r.loc || '').split(',')[0] + ' (' + (SN[r.status] || '') + ')', d: String(r.vision || '').split('. ')[0].replace(/\.$/, '') + '.', k: [r.type, r.style, r.country, r.loc, r.decade, SN[r.status], r.people].join(' ').toLowerCase(), c: 'Architecture & Research' });
      });
      return db;
    });
    p.catch(function () { if (GN.afDB === p) GN.afDB = null; });
    return p;
  };
  GN.CATEGORIES = [
    ['Business & Industry', 'business'], ['Geography & Local History', 'geography'], ['Entertainment & Attractions', 'entertainment'],
    ['Architecture & Research', 'architecture'], ['Culture & History', 'culture'], ['Government & Organizations', 'government'], ['Arts & Media', 'arts']
  ];
  GN.SITE_INFO = {
    'directory.ou': { name: 'GamiNet Directory', blurb: 'Search the network. Every .ou site, sorted by subject.', cat: 'Government & Organizations' },
    'ultrawater.ou': { name: 'ULTRAWATER', blurb: 'Water-design corporation: vessels, civic fountains, atmosphere, synthetic nature.', cat: 'Business & Industry' },
    'route59.ou': { name: 'Route 59 Corridor Archive', blurb: 'Hyperlocal archive of Route 59, Rockland County, NY. (Under construction)', cat: 'Geography & Local History' },
    'stopnrest.ou': { name: 'Stop N’ Rest Motel', blurb: 'Roadside motel. Color TV. Ice machine. (Under construction)', cat: 'Entertainment & Attractions' },
    'fountaincam.ou': { name: 'FountainCam Network', blurb: 'Simulated camera feeds of mall fountains and water features.', cat: 'Entertainment & Attractions' },
    'abandonedfutures.ou': { name: 'Abandoned Futures', blurb: 'Research archive of unbuilt, demolished and altered environments.', cat: 'Architecture & Research' },
    'luckystationary.ou': { name: 'Lucky Stationary', blurb: 'Toys, trading cards and school supplies. Pune, India.', cat: 'Culture & History' },
    'gamilexicon.ou': { name: 'Gami Lexicon', blurb: 'The Gami Dictionary online: words, definitions and examples.', cat: 'Arts & Media' },
    'marmotnationalism.ou': { name: 'National Marmot Front', blurb: 'Official headquarters of the movement for marmot sovereignty.', cat: 'Government & Organizations' }
  };

  /* ---------------------------------------------------------------- search */
  function stem(w) { w = w.toLowerCase().replace(/[^a-z0-9']/g, '').replace(/'s$/, ''); if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + 'y'; if (w.length > 4 && /(ches|shes|xes|sses)$/.test(w)) return w.slice(0, -2); if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1); return w; }
  var STOP = { the: 1, a: 1, an: 1, of: 1, and: 1, or: 1, in: 1, on: 1, to: 1, for: 1, at: 1, by: 1, with: 1, is: 1 };
  function toks(s) { return (s || '').toLowerCase().split(/[^a-z0-9']+/).filter(function (w) { return w && !STOP[w]; }).map(stem).filter(Boolean); }
  GN.search = function (q) {
    var qt = toks(q); if (!qt.length) return [];
    var out = [];
    GN.INDEX.forEach(function (e) {
      var fields = { address: toks(e.u.replace(/[./-]/g, ' ')), title: toks(e.t), keywords: toks(e.k), description: toks(e.d) };
      var w = { address: 6, title: 8, keywords: 4, description: 2 }, score = 0, why = {}, hit = 0;
      qt.forEach(function (t) {
        var got = false;
        Object.keys(fields).forEach(function (f) {
          var list = fields[f], exact = list.indexOf(t) >= 0, pre = !exact && t.length > 2 && list.some(function (x) { return x.indexOf(t) === 0; });
          if (exact || pre) { score += w[f] * (exact ? 1 : 0.5); (why[f] = why[f] || {})[t] = 1; got = true; }
        });
        if (got) hit++;
      });
      if (!hit) return;
      score *= hit / qt.length; if (hit === qt.length) score *= 1.5;
      if (e.u.indexOf('/') < 0) score *= 1.15;   /* homepages first */
      out.push({ e: e, score: score, why: Object.keys(why).map(function (f) { return { field: f, terms: Object.keys(why[f]) }; }) });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  };
  GN.suggest = function (q) {
    var s = (q || '').toLowerCase().trim(); if (s.length < 2) return [];
    var seen = {}, out = [];
    GN.INDEX.forEach(function (e) {
      (e.k + ' ' + e.t.toLowerCase()).split(/[^a-z0-9' ]+/).forEach(function (phrase) {
        phrase.split(' ').forEach(function (w, i, arr) {
          [w, arr.slice(i, i + 2).join(' '), arr.slice(i, i + 3).join(' ')].forEach(function (p) {
            p = p.trim(); if (p.length > 2 && p.indexOf(s) === 0 && !seen[p]) { seen[p] = 1; out.push(p); }
          });
        });
      });
    });
    return out.sort(function (a, b) { return a.length - b.length; }).slice(0, 6);
  };
  function lev(a, b) { var m = [], i, j; for (i = 0; i <= b.length; i++) m[i] = [i]; for (j = 0; j <= a.length; j++) m[0][j] = j; for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1)); return m[b.length][a.length]; }

  /* ---------------------------------------------------------------- addresses */
  function parseQ(s) { var o = {}; (s || '').replace(/^\?/, '').split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); try { o[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); } catch (e) {} }); return o; }
  function qs(o) { var k = Object.keys(o || {}); return k.length ? '?' + k.map(function (x) { return encodeURIComponent(x) + '=' + encodeURIComponent(o[x]).replace(/%20/g, '+'); }).join('&') : ''; }
  GN.parse = function (raw) {
    var s = (raw || '').trim(); if (!s) return null;
    s = s.replace(/^(gaminet|https?):\/\//i, '').replace(/^www\./i, '');
    var m = s.match(/^([a-z0-9-]+\.ou)(\/[^?#\s]*)?(\?[^#\s]*)?$/i);
    if (m) { var p = (m[2] || '/').replace(/\/+$/, '') || '/'; return { host: m[1].toLowerCase(), path: p.toLowerCase(), query: parseQ(m[3]) }; }
    if (/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s)) return { host: s.split('/')[0].toLowerCase(), path: '/', query: {}, foreign: true };
    return { host: 'directory.ou', path: '/search', query: { q: s } };
  };
  GN.fmt = function (r) { return r.host + (r.path && r.path !== '/' ? r.path : '') + qs(r.query); };
  GN.link = function (addr, label, cls) { return '<a href="#" data-go="' + U.esc(addr) + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + label + '</a>'; };

  var store = U.load('gaminet', { favs: [{ t: 'GamiNet Directory', a: 'directory.ou' }, { t: 'ULTRAWATER', a: 'ultrawater.ou' }, { t: 'FountainCam Network', a: 'fountaincam.ou' }], recent: [], last: 'directory.ou' });
  function persist() { U.save('gaminet', store); }
  GN.recent = function () { return store.recent.slice(); };

  /* per-site local storage */
  function siteStore(name) {
    return {
      get: function (k, def) { try { var v = JSON.parse(localStorage.getItem('ou98_gn_' + name + '_' + k)); return v === null || v === undefined ? def : v; } catch (e) { return def; } },
      set: function (k, v) { try { localStorage.setItem('ou98_gn_' + name + '_' + k, JSON.stringify(v)); } catch (e) {} }
    };
  }

  /* ---------------------------------------------------------------- the browser window */
  function Browser(win, start) {
    var self = this;
    try { GN.loadAF(); } catch (e) {}
    this.win = win; win.game = this;
    win.el.classList.add('gn-win');
    this.hist = []; this.hi = -1; this.tok = 0; this.leave = [];
    win.menu([
      { label: '&File', items: [
        { label: '&Open…', key: 'Ctrl+O', act: function () { self.openDialog(); } },
        { label: '&Close', act: function () { win.close(); } }
      ] },
      { label: '&View', items: [
        { label: '&Stop', key: 'Esc', act: function () { self.stop(); } },
        { label: '&Refresh', key: 'F5', act: function () { self.reload(); } }
      ] },
      { label: '&Go', items: [
        { label: '&Back', key: 'Alt+←', dis: function () { return self.hi <= 0; }, act: function () { self.back(); } },
        { label: '&Forward', key: 'Alt+→', dis: function () { return self.hi >= self.hist.length - 1; }, act: function () { self.forward(); } },
        '-',
        { label: '&Home Page', act: function () { self.go('directory.ou'); } },
        { label: '&Search the Net', act: function () { self.go('directory.ou'); } }
      ] },
      { label: 'F&avorites', items: function () { return self.favMenu(); } },
      { label: '&Help', items: [
        { label: '&About Gami Net', act: function () { self.about(); } }
      ] }
    ]);
    var tbtn = function (k, label, title) { return '<button type="button" class="gn-tb" data-a="' + k + '" title="' + title + '"><span class="i"></span><span class="l">' + label + '</span></button>'; };
    win.body.innerHTML =
      '<div class="gn">' +
        '<div class="gn-bar gn-tools">' +
          tbtn('back', 'Back', 'Back (Alt+Left)') + tbtn('fwd', 'Forward', 'Forward (Alt+Right)') + tbtn('stop', 'Stop', 'Stop (Esc)') + tbtn('reload', 'Refresh', 'Refresh (F5)') + tbtn('home', 'Home', 'Home') +
          '<span class="gn-sep"></span>' + tbtn('search', 'Search', 'Search the Net') + tbtn('fav', 'Favorites', 'Add to Favorites (Ctrl+D)') +
          '<span class="gn-throb" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="gn-bar gn-addr"><label>Address</label><div class="gn-field"><canvas class="gn-favi" width="16" height="16"></canvas><input class="gn-url" spellcheck="false" autocomplete="off" list="gn-hosts" aria-label="Address"><datalist id="gn-hosts">' + GN.HOSTS.map(function (h) { return '<option value="' + h + '">'; }).join('') + '</datalist></div>' +
          '<button type="button" class="u98-btn gn-go"><span class="i"></span>Go</button></div>' +
        '<div class="gn-view" tabindex="-1"></div>' +
      '</div>';
    var b = win.body;
    this.view = b.querySelector('.gn-view'); this.url = b.querySelector('.gn-url'); this.favi = b.querySelector('.gn-favi'); this.throb = b.querySelector('.gn-throb');
    b.querySelectorAll('.gn-tb').forEach(function (bt) { bt.querySelector('.i').appendChild(U.iconEl('gn_' + bt.dataset.a, 16)); });
    b.querySelector('.gn-go .i').appendChild(U.iconEl('gn_go', 16));
    this.throb.appendChild(U.iconEl('icon_gaminet_s', 16));
    this.st = win.status([{ text: 'Done' }, { text: '', w: 110 }, { text: 'Gami Net', w: 104 }]);
    this.st[2].textContent = ''; this.st[2].appendChild(U.iconEl('icon_gaminet_s', 16)); this.st[2].appendChild(document.createTextNode(' Gami Net')); this.st[2].classList.add('gn-zone');
    this.st[1].innerHTML = '<div class="gn-prog"><i></i></div>';
    this.prog = this.st[1].querySelector('i');
    b.querySelector('.gn-tools').addEventListener('click', function (e) {
      var bt = e.target.closest('.gn-tb'); if (!bt) return;
      var a = bt.dataset.a;
      if (a === 'back') self.back(); else if (a === 'fwd') self.forward(); else if (a === 'stop') self.stop(); else if (a === 'reload') self.reload();
      else if (a === 'home') self.go('directory.ou'); else if (a === 'search') self.go('directory.ou'); else if (a === 'fav') self.addFav();
    });
    b.querySelector('.gn-go').addEventListener('click', function () { self.go(self.url.value); });
    this.url.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); self.go(self.url.value); self.view.focus({ preventScroll: true }); } });
    var fresh = false;
    this.url.addEventListener('focus', function () { try { self.url.select(); } catch (e) {} fresh = true; });
    this.url.addEventListener('mouseup', function (e) { if (fresh) { e.preventDefault(); fresh = false; } });
    this.url.addEventListener('blur', function () { fresh = false; });
    this.view.addEventListener('click', function (e) {
      var a = e.target.closest('[data-go]');
      if (a) { e.preventDefault(); self.go(a.getAttribute('data-go')); return; }
      var ext = e.target.closest('a[href^="http"]');
      if (ext) { ext.target = '_blank'; ext.rel = 'noopener'; }
      else { var dead = e.target.closest('a[href="#"]'); if (dead) e.preventDefault(); }
    });
    this.view.addEventListener('mouseover', function (e) {
      var a = e.target.closest('[data-go]'), x = !a && e.target.closest('a[href^="http"]');
      self.status(a ? 'Shortcut to ' + a.getAttribute('data-go') : x ? x.href + '  (opens outside Gami Net)' : self.doneText || 'Done');
    });
    win.on('key', function (e) { return self.key(e); });
    win.on('route', function (arg) { if (arg) self.go(arg); });
    win.on('close', function () { self.runLeave(); });
    win.on('min', function () { self.view.classList.add('gn-paused'); });
    win.on('restore', function () { self.view.classList.remove('gn-paused'); });
    if (!U.isSmall()) { var s = win.deskSize(); win.el.style.width = Math.min(s.w - 16, 720) + 'px'; win.el.style.height = Math.min(s.h - 16, 520) + 'px'; }
    win.on('resize', function () { self.win.el.classList.toggle('gn-narrow', self.win.el.offsetWidth < 560); });
    this.go(start || store.last || 'directory.ou');
  }
  var P = Browser.prototype;
  P.status = function (t) { this.st[0].textContent = t; };
  P.setProgress = function (f) { this.prog.style.width = Math.round(f * 100) + '%'; this.st[1].classList.toggle('on', f > 0 && f < 1); };
  P.loading = function (on) { this.throb.classList.toggle('on', on); this.win.body.querySelector('.gn-tb[data-a=stop]').disabled = !on; };
  P.navButtons = function () {
    this.win.body.querySelector('.gn-tb[data-a=back]').disabled = this.hi <= 0;
    this.win.body.querySelector('.gn-tb[data-a=fwd]').disabled = this.hi >= this.hist.length - 1;
  };
  P.go = function (input, mode) {
    var r = typeof input === 'string' ? GN.parse(input) : input; if (!r) return;
    var addr = GN.fmt(r);
    if (mode !== 'nohist') {
      if (this.hist[this.hi] !== addr) { this.hist = this.hist.slice(0, this.hi + 1); this.hist.push(addr); if (this.hist.length > 60) this.hist.shift(); this.hi = this.hist.length - 1; }
    }
    this.load(r, addr);
  };
  P.back = function () { if (this.hi > 0) { this.hi--; this.go(this.hist[this.hi], 'nohist'); } };
  P.forward = function () { if (this.hi < this.hist.length - 1) { this.hi++; this.go(this.hist[this.hi], 'nohist'); } };
  P.reload = function () { if (this.cur) this.go(this.cur, 'nohist'); };
  P.stop = function () {
    if (!this.busy) return;
    this.tok++; this.busy = false; this.timers && this.timers.forEach(clearTimeout); this.loading(false); this.setProgress(0);
    this.status('Stopped.');
    if (this.prevAddr) { this.url.value = this.prevAddr; this.cur = this.prevAddr; }
  };
  P.load = function (r, addr) {
    var self = this, tok = ++this.tok;
    this.timers && this.timers.forEach(clearTimeout); this.timers = [];
    this.prevAddr = this.cur; this.cur = addr; this.busy = true;
    this.url.value = addr; this.loading(true); this.navButtons();
    var steps = [[0, 'Finding site: ' + r.host + '…', 0.15], [70, 'Connecting to ' + r.host + '…', 0.4], [150, 'Opening page ' + addr + '…', 0.7]];
    steps.forEach(function (s) { self.timers.push(setTimeout(function () { if (tok === self.tok) { self.status(s[1]); self.setProgress(s[2]); } }, s[0])); });
    function done(def) {
      self.timers.push(setTimeout(function () {
        if (tok !== self.tok) return;
        self.render(def, r, addr);
        self.busy = false; self.loading(false); self.setProgress(1); setTimeout(function () { if (tok === self.tok) self.setProgress(0); }, 250);
      }, 230));
    }
    if (r.foreign) return done(notFound(r, true));
    if (FILES[r.host]) {
      if (GN.sites[r.host]) return done(GN.sites[r.host]);
      (GN.waits[r.host] = GN.waits[r.host] || []).push(function (def) { if (tok === self.tok) done(def); });
      if (!document.querySelector('script[data-gn="' + r.host + '"]')) {
        var sc = document.createElement('script'); sc.src = BASE + 'sites/' + FILES[r.host] + '.js?v=' + VERSION; sc.async = true; sc.dataset.gn = r.host;
        sc.onerror = function () { sc.remove(); delete GN.waits[r.host]; if (tok === self.tok) done(connFailed(r)); };
        document.head.appendChild(sc);
      }
      return;
    }
    if (BUILDING[r.host]) return done(underConstruction(r.host));
    done(notFound(r));
  };
  P.runLeave = function () { this.leave.forEach(function (f) { try { f(); } catch (e) {} }); this.leave = []; };
  P.render = function (def, r, addr) {
    var self = this;
    this.runLeave();
    if (def.css && !document.querySelector('style[data-gn-css="' + def.name + '"]')) {
      var st = document.createElement('style'); st.dataset.gnCss = def.name; st.textContent = def.css; document.head.appendChild(st);
    }
    var page = document.createElement('div'); page.className = 'gn-page gn-' + def.name;
    this.view.innerHTML = ''; this.view.appendChild(page); this.view.scrollTop = 0; this.view.scrollLeft = 0;
    var title = def.title || r.host, live = true;
    var ctx = {
      host: r.host, path: r.path, query: r.query, addr: addr, root: page, base: BASE, img: function (n) { return BASE + 'img/' + n; },
      esc: U.esc, link: GN.link, gn: GN, U: U,
      go: function (a) { self.go(a); },
      title: function (t) { title = t; self.win.setTitle(t + ' - Gami Net'); },
      html: function (h) { page.innerHTML = h; },
      status: function (t) { self.doneText = t; self.status(t); },
      store: siteStore(def.name),
      alive: function () { return live && !self.win.closed; },
      every: function (fn, ms) { var id = setInterval(fn, ms); self.leave.push(function () { clearInterval(id); }); return id; },
      later: function (fn, ms) { var id = setTimeout(fn, ms); self.leave.push(function () { clearTimeout(id); }); return id; },
      frame: function (fn) { var id, run = function (t) { if (!live) return; if (!self.view.classList.contains('gn-paused')) fn(t); id = requestAnimationFrame(run); }; id = requestAnimationFrame(run); self.leave.push(function () { cancelAnimationFrame(id); }); },
      onLeave: function (fn) { self.leave.push(fn); },
      notFound: function () { self.render(notFound(r), r, addr); },
      view: this.view
    };
    this.leave.push(function () { live = false; });
    try { def.render(ctx); }
    catch (err) { page.className = 'gn-page gn-err'; page.innerHTML = '<h2>This page has an error</h2><p>' + U.esc(String(err && err.message || err)) + '</p><p>' + GN.link('directory.ou', 'Return to the GamiNet Directory') + '</p>'; if (window.console) console.error(err); }
    ctx.title(title);
    this.drawFavicon(def);
    this.doneText = 'Done'; this.status('Done');
    if (!def.error) {
      store.last = addr;
      var host = r.host; store.recent = [host].concat(store.recent.filter(function (h) { return h !== host; })).slice(0, 8);
      persist();
    }
    U.setHash && U.setHash('gaminet/' + addr);
    this.navButtons();
  };
  P.drawFavicon = function (def) {
    var c = this.favi.getContext('2d'); c.clearRect(0, 0, 16, 16);
    if (def.icon) { try { def.icon(c); return; } catch (e) {} }
    c.drawImage(U.spr('gn_page', 1), 0, 0);
  };
  P.key = function (e) {
    var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    var k = e.key, mod = e.ctrlKey || e.metaKey;
    if (e.altKey && k === 'ArrowLeft') { this.back(); return true; }
    if (e.altKey && k === 'ArrowRight') { this.forward(); return true; }
    if (e.altKey && k === 'Home') { this.go('directory.ou'); return true; }
    if (k === 'F5' || (mod && k.toLowerCase() === 'r')) { this.reload(); return true; }
    if (mod && k.toLowerCase() === 'l' || k === 'F6') { this.url.focus(); return true; }
    if (mod && k.toLowerCase() === 'd') { this.addFav(); return true; }
    if (mod && k.toLowerCase() === 'o') { this.openDialog(); return true; }
    if (k === 'Escape' && this.busy) { this.stop(); return true; }
    if (typing) return false;
    if (k === 'Backspace') { this.back(); return true; }
    return false;
  };
  P.favMenu = function () {
    var self = this;
    var items = [{ label: '&Add to Favorites…', key: 'Ctrl+D', act: function () { self.addFav(); } }, { label: '&Organize Favorites…', act: function () { self.organize(); } }, '-'];
    store.favs.forEach(function (f) { items.push({ label: f.t, act: function () { self.go(f.a); } }); });
    if (!store.favs.length) items.push({ label: '(Empty)', dis: function () { return true; } });
    return items;
  };
  P.addFav = function () {
    var self = this, addr = this.cur || 'directory.ou', name = (this.win.titleEl.querySelector('.t').textContent || addr).replace(/ - Gami Net$/, '');
    U.prompt({ title: 'Add Favorite', text: 'Gami Net will add this page to your Favorites list. Name:', value: name, max: 60 }, this.win).then(function (v) {
      if (v === null || v === undefined || self.win.closed) return;
      v = (v || '').trim() || addr;
      store.favs = store.favs.filter(function (f) { return f.a !== addr; }); store.favs.push({ t: v.slice(0, 60), a: addr }); persist();
      self.status('Added to Favorites: ' + v);
    });
  };
  P.organize = function () {
    var self = this;
    if (!store.favs.length) { U.dialog({ title: 'Organize Favorites', icon: 'info', text: 'Your Favorites list is empty.', buttons: [{ label: 'OK', def: true }] }, this.win); return; }
    var rows = store.favs.map(function (f, i) { return '<label class="gn-favrow"><input type="checkbox" value="' + i + '"> <b>' + U.esc(f.t) + '</b> <span>' + U.esc(f.a) + '</span></label>'; }).join('');
    U.dialog({ title: 'Organize Favorites', wide: 360, html: 'Tick the favorites to delete:<div class="gn-favlist">' + rows + '</div>',
      buttons: [{ label: '&Delete', value: 'del' }, { label: 'Close', value: null, def: true }],
      collect: function (d) { return [].map.call(d.querySelectorAll('input:checked'), function (c) { return +c.value; }); } }, this.win).then(function (sel) {
      if (!sel || !sel.length) return;
      store.favs = store.favs.filter(function (f, i) { return sel.indexOf(i) < 0; }); persist(); self.status('Favorites updated.');
    });
  };
  P.openDialog = function () {
    var self = this;
    U.prompt({ title: 'Open', text: 'Type the .ou address of a site, or words to search for, and Gami Net will open it for you.', value: this.cur || '', max: 120 }, this.win).then(function (v) { if (v && !self.win.closed) self.go(v); });
  };
  P.about = function () {
    U.dialog({ title: 'About Gami Net', icon: 'info', html: '<b>GAMI NET</b> Version 1.0<br>GAMINET.EXE · ULTRA 98<br>A Drome Damage network for Origami Ultra.<br><br>Every .ou site on Gami Net is fiction or archive, served from this computer. Nothing you type leaves it.', buttons: [{ label: 'OK', def: true }] }, this.win);
  };

  /* ---------------------------------------------------------------- built-in pages */
  function notFound(r, foreign) {
    var near = GN.HOSTS.map(function (h) { return { h: h, d: lev(r.host, h) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    return {
      name: 'err', title: 'Cannot find server', error: true,
      render: function (ctx) {
        ctx.html('<div class="gn-errpage"><div class="gn-errhead"><span class="gn-erricon"></span><div><h1>The page cannot be displayed</h1><p>The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or the address may be wrong.</p></div></div><hr>' +
          '<p><b>Host Not Found:</b> <tt>' + ctx.esc(r.host) + '</tt></p>' +
          (foreign ? '<p>Gami Net only resolves <b>.ou</b> addresses. Sites on the regular Internet can’t be reached from this network.</p>' : '<p>No server on Gami Net answers to that name.</p>') +
          (near && near.d <= 4 && !foreign ? '<p>Did you mean ' + ctx.link(near.h, near.h) + '?</p>' : '') +
          '<p>Please try the following:</p><ul><li>Check the spelling of the address in the Address bar.</li><li>Open the ' + ctx.link('directory.ou', 'GamiNet Directory') + ' and look for the site you want.</li><li>' + ctx.link('directory.ou/search?q=' + encodeURIComponent(r.host.replace(/\.ou$/, '')), 'Search Gami Net for “' + ctx.esc(r.host.replace(/\.ou$/, '')) + '”') + '</li></ul>' +
          '<p class="gn-errfoot">Cannot find server or DNS Error<br>Gami Net</p></div>');
      }
    };
  }
  function connFailed(r) {
    return { name: 'err', title: 'Connection failed', error: true, render: function (ctx) { ctx.html('<div class="gn-errpage"><h1>Connection failed</h1><p>Gami Net could not reach <tt>' + ctx.esc(r.host) + '</tt>. Check your connection to the network and press Refresh.</p><p>' + ctx.link('directory.ou', 'Return to the GamiNet Directory') + '</p></div>'); } };
  }
  function underConstruction(host) {
    var b = BUILDING[host];
    return {
      name: 'uc', title: b.title + ' — Under Construction',
      icon: function (c) { c.fillStyle = '#ffd400'; c.fillRect(0, 0, 16, 16); c.fillStyle = '#000'; for (var i = -16; i < 16; i += 6) { c.beginPath(); c.moveTo(i, 16); c.lineTo(i + 3, 16); c.lineTo(i + 19, 0); c.lineTo(i + 16, 0); c.fill(); } },
      render: function (ctx) {
        var hits = ctx.store.get('hits_' + host, 1032 + host.length * 37) + 1; ctx.store.set('hits_' + host, hits);
        ctx.html('<div class="gn-uc"><div class="gn-ucstripe"></div><h1>' + ctx.esc(b.title) + '</h1><div class="gn-ucsign"><span class="gn-ucman"></span><div><b>UNDER CONSTRUCTION</b><br>This site is being built by ' + ctx.esc(b.by) + '.<br>Please check back soon!</div><span class="gn-ucman r"></span></div>' +
          '<p class="gn-ucnote">' + ctx.esc(b.note) + '</p>' +
          '<p class="gn-uccount">You are visitor number <span>' + ('000000' + hits).slice(-6) + '</span></p>' +
          '<p>' + ctx.link('directory.ou', '« Back to the GamiNet Directory') + '</p><div class="gn-ucstripe"></div></div>');
      }
    };
  }

  /* ---------------------------------------------------------------- registration */
  U.register({
    id: 'gaminet', title: 'Gami Net', label: 'GAMI NET', menuLabel: 'GAMI &NET', exe: 'GAMINET.EXE',
    icon: 'icon_gaminet', small: 'icon_gaminet_s',
    create: function (win) { var arg = U.openArg; U.openArg = null; new Browser(win, arg); }
  });
})();
