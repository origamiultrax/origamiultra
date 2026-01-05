(function () {
  const album = window.__ALBUM__;
  if (!album) return;

  const tracklistEl = document.getElementById("tracklist");
  const audio = document.getElementById("audio");
  const nowTrack = document.getElementById("nowTrack");
  const curTime = document.getElementById("curTime");
  const durTime = document.getElementById("durTime");
  const seek = document.getElementById("seek");

  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const volSlider = document.getElementById("volSlider");

  const eqBandsEl = document.getElementById("eqBands");
  const eqReset = document.getElementById("eqReset");

  const reverbMix = document.getElementById("reverbMix");
  const reverbRoom = document.getElementById("reverbRoom");
  const reverbDecay = document.getElementById("reverbDecay");

  const viz = document.getElementById("viz");
  const vctx = viz.getContext("2d");

  let idx = 0;
  let isSeeking = false;
  let shuffle = false;
  let order = [...album.tracks.keys()];

  let ctx, srcNode, gainNode, eqNodes, analyser, rafId;
  let dryGain, wetGain, preDelay, combSum, allpass1, allpass2, wetLP;

  const EQ_BANDS = [
    { f: 31, label: "31" },
    { f: 62, label: "62" },
    { f: 125, label: "125" },
    { f: 250, label: "250" },
    { f: 500, label: "500" },
    { f: 1000, label: "1K" },
    { f: 2000, label: "2K" },
    { f: 4000, label: "4K" },
    { f: 8000, label: "8K" },
    { f: 16000, label: "16K" }
  ];

  // Tracklist
  tracklistEl.innerHTML = album.tracks.map((t, i) => `
    <button class="track" data-i="${i}">
      <span class="track__n">${String(i + 1).padStart(2, "0")}</span>
      <span class="track__t">${escapeHtml(t.title)}</span>
      <span class="track__d" id="dur-${i}">--:--</span>
    </button>
  `).join("");

  tracklistEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".track");
    if (!btn) return;
    playIndex(Number(btn.dataset.i), true);
  });

  // EQ UI (uses your existing .eq__bands/.band styles)
  eqBandsEl.innerHTML = EQ_BANDS.map((b, bi) => `
    <div class="band">
      <input class="band__s" type="range" min="-12" max="12" step="0.5" value="0" data-bi="${bi}" />
      <div class="band__l">${b.label}</div>
    </div>
  `).join("");

  eqBandsEl.addEventListener("input", async (e) => {
    const r = e.target.closest(".band__s");
    if (!r) return;
    await ensureAudioGraph();
    eqNodes[Number(r.dataset.bi)].gain.value = Number(r.value);
  });

  eqReset.addEventListener("click", async () => {
    await ensureAudioGraph();
    eqBandsEl.querySelectorAll(".band__s").forEach((s, bi) => {
      s.value = "0";
      eqNodes[bi].gain.value = 0;
    });
  });

  // Controls
  playBtn.addEventListener("click", async () => {
    await ensureAudioGraph();
    if (audio.paused) await audio.play();
    else audio.pause();
    syncPlayIcon();
  });

  prevBtn.addEventListener("click", () => skip(-1));
  nextBtn.addEventListener("click", () => skip(1));

  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.setAttribute("aria-pressed", String(shuffle));
    order = shuffle ? shuffled([...album.tracks.keys()], idx) : [...album.tracks.keys()];
  });

  volSlider.addEventListener("input", async () => {
    await ensureAudioGraph();
    gainNode.gain.value = Number(volSlider.value);
  });

  // Reverb controls
  reverbMix.addEventListener("input", async () => {
    await ensureAudioGraph();
    const mix = Number(reverbMix.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;
  });

  reverbRoom.addEventListener("input", async () => {
    await ensureAudioGraph();
    updateReverbParams();
  });

  reverbDecay.addEventListener("input", async () => {
    await ensureAudioGraph();
    updateReverbParams();
  });

  // Seek
  seek.addEventListener("input", () => { isSeeking = true; });
  seek.addEventListener("change", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;
    const v = Number(seek.value) / 1000;
    audio.currentTime = v * audio.duration;
    isSeeking = false;
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;
    curTime.textContent = fmt(audio.currentTime);
    if (!isSeeking) seek.value = String(Math.floor((audio.currentTime / audio.duration) * 1000));
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;
    durTime.textContent = fmt(audio.duration);
    const label = document.getElementById(`dur-${idx}`);
    if (label && label.textContent === "--:--") label.textContent = fmt(audio.duration);
  });

  audio.addEventListener("ended", () => skip(1));
  audio.addEventListener("play", () => { syncPlayIcon(); startViz(); });
  audio.addEventListener("pause", () => { syncPlayIcon(); stopViz(); });

  // Init
  highlight(idx);
  loadForDurations();

  async function playIndex(i, autoplay) {
    idx = clamp(i, 0, album.tracks.length - 1);
    highlight(idx);
    await ensureAudioGraph();

    audio.src = encodeURI(album.tracks[idx].file);
    nowTrack.textContent = album.tracks[idx].title;

    seek.value = "0";
    curTime.textContent = "0:00";
    durTime.textContent = "0:00";

    if (autoplay) await audio.play();
    syncPlayIcon();
  }

  function skip(dir) {
    const list = shuffle ? order : [...album.tracks.keys()];
    const pos = list.indexOf(idx);
    const nextPos = (pos + dir + list.length) % list.length;
    playIndex(list[nextPos], true);
  }

  function highlight(i) {
    tracklistEl.querySelectorAll(".track").forEach((el, n) => {
      el.classList.toggle("track--active", n === i);
    });
    nowTrack.textContent = album.tracks[i]?.title ?? "—";
  }

  function syncPlayIcon() {
    playBtn.textContent = audio.paused ? "▶" : "⏸";
  }

  async function ensureAudioGraph() {
    if (ctx) return;

    ctx = new (window.AudioContext || window.webkitAudioContext)();
    srcNode = ctx.createMediaElementSource(audio);

    gainNode = ctx.createGain();
    gainNode.gain.value = Number(volSlider.value);

    eqNodes = EQ_BANDS.map((b) => {
      const f = ctx.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = b.f;
      f.Q.value = 1.0;
      f.gain.value = 0;
      return f;
    });

    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.82;

    // Faux reverb
    dryGain = ctx.createGain();
    wetGain = ctx.createGain();
    const mix = Number(reverbMix.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;

    preDelay = ctx.createDelay(0.2);
    preDelay.delayTime.value = 0.018;

    combSum = makeCombBank(ctx);
    allpass1 = makeAllpass(ctx, 0.007);
    allpass2 = makeAllpass(ctx, 0.011);

    wetLP = ctx.createBiquadFilter();
    wetLP.type = "lowpass";
    wetLP.frequency.value = 9000;

    let node = srcNode;
    for (const eq of eqNodes) { node.connect(eq); node = eq; }

    node.connect(dryGain);
    node.connect(wetGain);

    wetGain.connect(preDelay);
    preDelay.connect(combSum.input);
    combSum.output.connect(allpass1.input);
    allpass1.output.connect(allpass2.input);
    allpass2.output.connect(wetLP);

    dryGain.connect(gainNode);
    wetLP.connect(gainNode);

    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    updateReverbParams();
  }

  function updateReverbParams() {
    const room = Number(reverbRoom.value);   // 0..1
    const decay = Number(reverbDecay.value); // 0.15..6

    const base = 0.012 + room * 0.03;        // 12ms .. 42ms
    const spread = 0.004 + room * 0.012;     // 4ms  .. 16ms
    const fb = clamp(0.25 + (decay / 6) * 0.68, 0.25, 0.93);

    combSum._combs.forEach((c, k) => {
      c.delay.delayTime.value = base + spread * (k + 1);
      c.fb.gain.value = fb;
    });

    wetLP.frequency.value = 14000 - room * 9000; // 14k -> 5k
  }

  function makeCombBank(ctx) {
    const input = ctx.createGain();
    const output = ctx.createGain();

    const combs = [
      makeComb(ctx, 0.0297),
      makeComb(ctx, 0.0371),
      makeComb(ctx, 0.0411),
      makeComb(ctx, 0.0437),
    ];

    combs.forEach(c => { input.connect(c.input); c.output.connect(output); });

    return {
      input,
      output,
      _combs: combs.map(c => ({ delay: c.delay, fb: c.fb }))
    };
  }

  function makeComb(ctx, delayTime) {
    const input = ctx.createGain();
    const delay = ctx.createDelay(0.2);
    delay.delayTime.value = delayTime;

    const fb = ctx.createGain();
    fb.gain.value = 0.75;

    input.connect(delay);
    delay.connect(fb);
    fb.connect(delay);

    const output = ctx.createGain();
    delay.connect(output);

    return { input, output, delay, fb };
  }

  function makeAllpass(ctx, delayTime) {
    const input = ctx.createGain();
    const delay = ctx.createDelay(0.2);
    delay.delayTime.value = delayTime;

    const fb = ctx.createGain();
    const ff = ctx.createGain();
    const sum = ctx.createGain();
    const output = ctx.createGain();

    fb.gain.value = 0.5;
    ff.gain.value = -0.5;

    input.connect(sum);
    input.connect(delay);

    delay.connect(fb);
    fb.connect(sum);

    sum.connect(output);
    delay.connect(ff);
    ff.connect(output);

    return { input, output };
  }

  function startViz() {
    if (!analyser || rafId) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = viz.clientWidth || 600;
    const h = viz.clientHeight || 120;
    viz.width = Math.floor(w * dpr);
    viz.height = Math.floor(h * dpr);

    const buf = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(buf);

      vctx.setTransform(1, 0, 0, 1, 0, 0);
      vctx.clearRect(0, 0, viz.width, viz.height);

      // Green bars (fits your neon theme)
      vctx.fillStyle = "rgba(57,255,20,0.70)";

      const barCount = 64;
      const step = Math.floor(buf.length / barCount);
      const bw = viz.width / barCount;

      for (let i = 0; i < barCount; i++) {
        const v = buf[i * step] / 255;
        const bh = v * viz.height;
        vctx.fillRect(i * bw, viz.height - bh, Math.max(1, bw - 2), bh);
      }
    };

    draw();
  }

  function stopViz() {
    if (!rafId) return;
    cancelAnimationFrame(rafId);
    rafId = null;
    vctx.clearRect(0, 0, viz.width, viz.height);
  }

  async function loadForDurations() {
    for (let i = 0; i < album.tracks.length; i++) {
      const label = document.getElementById(`dur-${i}`);
      if (!label) continue;

      const tmp = new Audio();
      tmp.preload = "metadata";
      tmp.src = encodeURI(album.tracks[i].file);

      await new Promise((resolve) => {
        const done = () => resolve();
        tmp.addEventListener("loadedmetadata", () => {
          if (tmp.duration && isFinite(tmp.duration)) label.textContent = fmt(tmp.duration);
          done();
        }, { once: true });
        tmp.addEventListener("error", done, { once: true });
      });
    }
  }

  function fmt(sec) {
    sec = Math.max(0, sec);
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function shuffled(arr, keepIdx) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const pos = arr.indexOf(keepIdx);
    if (pos > 0) {
      const head = arr.splice(pos, 1);
      arr.unshift(head[0]);
    }
    return arr;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
