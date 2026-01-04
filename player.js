(function () {
  const album = window.__ALBUM__;
  if (!album) return;

  // Elements
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
  const reverbDecay = document.getElementById("reverbDecay");

  // State
  let idx = 0;
  let isSeeking = false;
  let shuffle = false;
  let order = [...album.tracks.keys()];
  let ctx, srcNode, gainNode, eqNodes, dryGain, wetGain, convolver;

  // Tracklist UI
  tracklistEl.innerHTML = album.tracks.map((t, i) => `
    <button class="track" data-i="${i}">
      <span class="track__n">${String(i + 1).padStart(2, "0")}</span>
      <span class="track__t">${escapeHtml(t.title)}</span>
      <span class="track__d" id="dur-${i}">--:--</span>
    </button>
  `).join("");

  // Click to play
  tracklistEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".track");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    playIndex(i, true);
  });

  // Controls
  playBtn.addEventListener("click", async () => {
    await ensureAudioGraph();
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
    syncPlayIcon();
  });

  prevBtn.addEventListener("click", () => skip(-1));
  nextBtn.addEventListener("click", () => skip(1));

  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.setAttribute("aria-pressed", String(shuffle));
    if (shuffle) {
      order = shuffled([...album.tracks.keys()], idx);
    } else {
      order = [...album.tracks.keys()];
    }
  });

  volSlider.addEventListener("input", async () => {
    await ensureAudioGraph();
    gainNode.gain.value = Number(volSlider.value);
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
    if (!isSeeking) {
      seek.value = String(Math.floor((audio.currentTime / audio.duration) * 1000));
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;
    durTime.textContent = fmt(audio.duration);
    // Also set the per-track duration label for the current track if needed
    const label = document.getElementById(`dur-${idx}`);
    if (label && label.textContent === "--:--") label.textContent = fmt(audio.duration);
  });

  audio.addEventListener("ended", () => skip(1));

  // Build EQ UI (fancy-ish: 10 bands)
  const EQ_BANDS = [
    { f: 60,  label: "60"  },
    { f: 170, label: "170" },
    { f: 310, label: "310" },
    { f: 600, label: "600" },
    { f: 1000,label: "1K"  },
    { f: 3000,label: "3K"  },
    { f: 6000,label: "6K"  },
    { f: 12000,label:"12K" },
    { f: 14000,label:"14K" },
    { f: 16000,label:"16K" }
  ];

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
    const bi = Number(r.dataset.bi);
    const gain = Number(r.value);
    eqNodes[bi].gain.value = gain;
  });

  eqReset.addEventListener("click", async () => {
    await ensureAudioGraph();
    eqBandsEl.querySelectorAll(".band__s").forEach((s, bi) => {
      s.value = "0";
      eqNodes[bi].gain.value = 0;
    });
  });

  // Reverb UI
  reverbMix.addEventListener("input", async () => {
    await ensureAudioGraph();
    const mix = Number(reverbMix.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;
  });

  reverbDecay.addEventListener("input", async () => {
    await ensureAudioGraph();
    convolver.buffer = makeImpulseResponse(ctx, Number(reverbDecay.value), 2.5);
  });

  // Kick off: load first track (but don't autoplay)
  highlight(idx);
  loadForDurations(); // fill durations in list (lazy-ish)

  async function playIndex(i, autoplay) {
    idx = clamp(i, 0, album.tracks.length - 1);
    highlight(idx);
    await ensureAudioGraph();
    audio.src = album.tracks[idx].file;
    nowTrack.textContent = album.tracks[idx].title;
    seek.value = "0";
    curTime.textContent = "0:00";
    durTime.textContent = "0:00";
    if (autoplay) {
      await audio.play();
    }
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
    // Unlock on first user gesture (play click does it)
    srcNode = ctx.createMediaElementSource(audio);

    // Master gain
    gainNode = ctx.createGain();
    gainNode.gain.value = Number(volSlider.value);

    // EQ chain
    eqNodes = EQ_BANDS.map((b) => {
      const f = ctx.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = b.f;
      f.Q.value = 1.0;
      f.gain.value = 0;
      return f;
    });

    // Reverb: dry/wet with ConvolverNode + generated impulse
    convolver = ctx.createConvolver();
    convolver.buffer = makeImpulseResponse(ctx, Number(reverbDecay.value), 2.5);

    dryGain = ctx.createGain();
    wetGain = ctx.createGain();
    const mix = Number(reverbMix.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;

    // Wiring:
    // src -> eq... -> split(dry/wet)
    // dry -> master -> out
    // wet -> convolver -> master -> out
    let node = srcNode;
    for (const eq of eqNodes) {
      node.connect(eq);
      node = eq;
    }
    node.connect(dryGain);
    node.connect(wetGain);
    wetGain.connect(convolver);

    dryGain.connect(gainNode);
    convolver.connect(gainNode);

    gainNode.connect(ctx.destination);
  }

  function makeImpulseResponse(ctx, decaySeconds, preDelayMs) {
    const rate = ctx.sampleRate;
    const length = Math.max(1, Math.floor(rate * decaySeconds));
    const impulse = ctx.createBuffer(2, length, rate);

    const preDelaySamples = Math.floor((preDelayMs / 1000) * rate);

    for (let ch = 0; ch < impulse.numberOfChannels; ch++) {
      const channel = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        if (i < preDelaySamples) {
          channel[i] = 0;
          continue;
        }
        const t = (i - preDelaySamples) / (length - preDelaySamples);
        // Noise * exponential decay
        channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.2);
      }
    }
    return impulse;
  }

  async function loadForDurations() {
    // Fill durations by loading metadata per track.
    // This will request each mp3's headers; fine on GitHub Pages, but can take a bit on large catalogs.
    for (let i = 0; i < album.tracks.length; i++) {
      const label = document.getElementById(`dur-${i}`);
      if (!label) continue;
      const tmp = new Audio();
      tmp.preload = "metadata";
      tmp.src = album.tracks[i].file;

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
    // Fisher–Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Ensure current track is first in traversal (nice UX)
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
