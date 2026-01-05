/* bg-player.js
   - Uses voss_tracks.js (window.VOSS_TRACKS)
   - Plays from: Not Found NYC - Voss Collection/<filename>
   - Resumes track + time across pages via localStorage
*/

(function(){
  const PLAYLIST = (window.VOSS_TRACKS || []).slice();

  // IMPORTANT: must match your repo folder name EXACTLY:
  const FOLDER = "Not Found NYC - Vóss Collection";

  const STORAGE_KEY = "bgPlayerState_v1";

  if (!PLAYLIST.length){
    console.warn("[bg-player] No tracks found. Did you add voss_tracks.js?");
    return;
  }

  const $ = (sel, root=document) => root.querySelector(sel);

  function niceTitle(filename){
    return filename.replace(/\.[^/.]+$/, "");
  }

  function fmtTime(sec){
    if (!Number.isFinite(sec)) return "--:--";
    sec = Math.max(0, Math.floor(sec));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function loadState(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch{ return {}; }
  }

  function saveState(partial){
    const prev = loadState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...partial }));
  }

  function makeTrackUrl(filename){
    return `${FOLDER}/${filename}`;
  }

  // Inject UI
  const wrap = document.createElement("div");
  wrap.id = "bgPlayer";
  wrap.innerHTML = `
    <div class="titlebar">
      <div class="title">
        <strong>Nightwave Plaza</strong>
        <span id="bgpTitle"></span>
      </div>
      <div class="winbtns">
        <button class="winbtn" id="bgpCollapse" title="Collapse">_</button>
      </div>
    </div>

    <div class="body">
      <div class="row">
        <div class="meta">
          <div class="track" id="bgpTrack">—</div>

          <div class="timebar">
            <div class="clock" id="bgpClock">00:00 / 00:00</div>
            <input id="bgpSeek" type="range" min="0" max="1000" value="0" aria-label="Seek">
          </div>

          <div class="controls">
            <button class="btn" id="bgpPrev" title="Previous">prev</button>
            <button class="btn" id="bgpPlay" title="Play/Pause">play</button>
            <button class="btn" id="bgpNext" title="Next">next</button>
            <button class="btn" id="bgpShuffle" title="Shuffle">shuf</button>

            <div class="vol" aria-label="Volume">
              <button class="btn" id="bgpMute" title="Mute">mute</button>
              <div class="label">vol</div>
              <input id="bgpVol" type="range" min="0" max="1" step="0.01" value="0.9" aria-label="Volume slider">
            </div>
          </div>

          <div class="hint" id="bgpHint" style="display:none;"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // Audio element
  const audio = document.createElement("audio");
  audio.preload = "metadata";
  document.body.appendChild(audio);

  // Restore state
  const state = loadState();
  let index = Number.isFinite(state.index) ? state.index : 0;
  index = Math.max(0, Math.min(index, PLAYLIST.length - 1));

  let shuffle = !!state.shuffle;
  let collapsed = !!state.collapsed;
  let wasPlaying = !!state.wasPlaying;
  let seekIsDragging = false;

  // Mobile: start collapsed unless user already chose otherwise
  if (window.matchMedia && window.matchMedia("(max-width: 520px)").matches){
    if (typeof state.collapsed !== "boolean") collapsed = true;
  }

  // Refs
  const elTrack = $("#bgpTrack", wrap);
  const elClock = $("#bgpClock", wrap);
  const elSeek = $("#bgpSeek", wrap);
  const elPlay = $("#bgpPlay", wrap);
  const elPrev = $("#bgpPrev", wrap);
  const elNext = $("#bgpNext", wrap);
  const elShuffle = $("#bgpShuffle", wrap);
  const elVol = $("#bgpVol", wrap);
  const elMute = $("#bgpMute", wrap);
  const elCollapse = $("#bgpCollapse", wrap);
  const elHint = $("#bgpHint", wrap);

  function setCollapsed(on){
    collapsed = !!on;
    wrap.classList.toggle("collapsed", collapsed);
    saveState({ collapsed });
  }

  function setShuffle(on){
    shuffle = !!on;
    elShuffle.classList.toggle("toggled", shuffle);
    saveState({ shuffle });
  }

  function setPlayLabel(){
    elPlay.textContent = audio.paused ? "play" : "pause";
  }

  function updateTitles(){
    const name = PLAYLIST[index];
    elTrack.textContent = niceTitle(name) || "—";
  }

  function loadTrack(i){
    index = i;
    audio.src = makeTrackUrl(PLAYLIST[index]);
    updateTitles();
    saveState({ index });
  }

  function pickRandomIndex(){
    return Math.floor(Math.random() * PLAYLIST.length);
  }

  async function attemptPlay(){
    elHint.style.display = "none";
    try{
      await audio.play();
      saveState({ wasPlaying: true });
      setPlayLabel();
    }catch{
      saveState({ wasPlaying: false });
      setPlayLabel();
      elHint.textContent = "press play to resume";
      elHint.style.display = "block";
    }
  }

  function pause(){
    audio.pause();
    saveState({ wasPlaying: false });
    setPlayLabel();
  }

  function nextTrack(){
    if (shuffle) loadTrack(pickRandomIndex());
    else loadTrack((index + 1) % PLAYLIST.length);

    if (wasPlaying) attemptPlay();
    else setPlayLabel();
  }

  function prevTrack(){
    if (audio.currentTime > 3){
      audio.currentTime = 0;
      return;
    }
    if (shuffle) loadTrack(pickRandomIndex());
    else loadTrack((index - 1 + PLAYLIST.length) % PLAYLIST.length);

    if (wasPlaying) attemptPlay();
    else setPlayLabel();
  }

  // UI events
  elPlay.addEventListener("click", () => {
    wasPlaying = true; // user gesture: okay to resume later
    if (audio.paused) attemptPlay();
    else pause();
  });

  elNext.addEventListener("click", () => { wasPlaying = true; nextTrack(); });
  elPrev.addEventListener("click", () => { wasPlaying = true; prevTrack(); });

  elShuffle.addEventListener("click", () => setShuffle(!shuffle));

  // Volume restore
  const volInit = (typeof state.volume === "number") ? state.volume : 0.9;
  audio.volume = Math.max(0, Math.min(1, volInit));
  elVol.value = String(audio.volume);

  if (typeof state.muted === "boolean") audio.muted = state.muted;
  elMute.textContent = audio.muted ? "unmute" : "mute";

  elVol.addEventListener("input", () => {
    audio.volume = Number(elVol.value);
    saveState({ volume: audio.volume });
    if (audio.volume === 0) audio.muted = true;
    else audio.muted = false;
    elMute.textContent = audio.muted ? "unmute" : "mute";
  });

  elMute.addEventListener("click", () => {
    audio.muted = !audio.muted;
    elMute.textContent = audio.muted ? "unmute" : "mute";
    saveState({ muted: audio.muted });
  });

  elCollapse.addEventListener("click", () => setCollapsed(!collapsed));

  // Seek
  elSeek.addEventListener("input", () => { seekIsDragging = true; });
  elSeek.addEventListener("change", () => {
    const pct = Number(elSeek.value) / 1000;
    if (Number.isFinite(audio.duration) && audio.duration > 0){
      audio.currentTime = pct * audio.duration;
    }
    seekIsDragging = false;
  });

  // Audio events
  audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    if (!seekIsDragging){
      const pct = audio.currentTime / audio.duration;
      elSeek.value = String(Math.floor(pct * 1000));
    }
    elClock.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    saveState({ time: audio.currentTime });
  });

  audio.addEventListener("loadedmetadata", () => {
    const st = loadState();
    const savedTime = (typeof st.time === "number") ? st.time : 0;
    if (typeof st.index === "number" && st.index === index && savedTime > 0){
      audio.currentTime = Math.min(savedTime, (audio.duration || savedTime));
    }
    elClock.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    setPlayLabel();
  });

  audio.addEventListener("ended", () => {
    wasPlaying = true;
    nextTrack();
  });

  // Save on navigation
  window.addEventListener("pagehide", () => {
    saveState({
      index,
      time: audio.currentTime,
      wasPlaying: !audio.paused,
      shuffle,
      volume: audio.volume,
      muted: audio.muted,
      collapsed
    });
  });

  // Init
  setCollapsed(collapsed);
  setShuffle(shuffle);
  loadTrack(index);

  // Start paused unless previously playing
  if (state.wasPlaying){
    wasPlaying = true;
    attemptPlay(); // may be blocked; hint appears
  } else {
    pause();
  }
})();
