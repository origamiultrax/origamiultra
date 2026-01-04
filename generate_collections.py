#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).parent
PICS_DIR = ROOT / "MONA PICTURES"
MUSIC_DIR = ROOT / "Kidd Comic Beat Tapes"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
AUDIO_EXTS = {".mp3"}

def is_image_file(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in IMAGE_EXTS and p.name != ".DS_Store"

def is_audio_file(p: Path) -> bool:
    return p.is_file() and p.suffix.lower() in AUDIO_EXTS and p.name != ".DS_Store"

def pretty_title(folder_name: str) -> str:
    return folder_name

def slugify(name: str) -> str:
    """
    Deterministic slug for filenames/urls.
    Keeps ascii letters/digits, turns spaces/punct into '-'.
    """
    out = []
    prev_dash = False
    for ch in name.strip().lower():
        if ch.isalnum():
            out.append(ch)
            prev_dash = False
        else:
            if not prev_dash:
                out.append("-")
                prev_dash = True
    slug = "".join(out).strip("-")
    return slug or "album"

def track_title_from_filename(filename: str) -> str:
    """
    Derive title from filename:
      '01 - Intro.mp3' -> '01 - Intro'
      'My_Song.mp3' -> 'My_Song'  (keeps your vibe; you can prettify later)
    """
    p = Path(filename)
    return p.stem

def build_picture_collections() -> list[dict]:
    if not PICS_DIR.exists():
        return []

    collections = []
    for folder in sorted([p for p in PICS_DIR.iterdir() if p.is_dir()], key=lambda p: p.name.lower()):
        images = sorted([p for p in folder.iterdir() if is_image_file(p)], key=lambda p: p.name.lower())
        if not images:
            continue

        rel_images = [str(Path("MONA PICTURES") / folder.name / img.name) for img in images]
        cover = rel_images[0]  # first alphabetically
        collections.append({
            "id": folder.name,
            "title": pretty_title(folder.name),
            "count": len(rel_images),
            "cover": cover,
            "images": rel_images
        })
    return collections

def build_music_albums() -> list[dict]:
    if not MUSIC_DIR.exists():
        return []

    albums = []

    # IMPORTANT: you asked for "folder order top-down".
    # True manual Finder order isn't portable; we keep OS iteration order (no sorting).
    # For stable ordering across machines/commits, use "01 - ..." prefixes (recommended).
    for album_dir in [p for p in MUSIC_DIR.iterdir() if p.is_dir() and p.name != ".DS_Store"]:
        cover_path = album_dir / "cover.png"
        if not cover_path.exists():
            # skip albums without cover.png
            continue

        # track order: as encountered in directory listing (not sorted)
        tracks = [p for p in album_dir.iterdir() if is_audio_file(p)]

        # Build rel paths
        rel_cover = str(Path("Kidd Comic Beat Tapes") / album_dir.name / "cover.png")
        rel_tracks = []
        for t in tracks:
            rel_tracks.append({
                "file": str(Path("Kidd Comic Beat Tapes") / album_dir.name / t.name),
                "title": track_title_from_filename(t.name),
                # Duration will be filled client-side via loadedmetadata (stable + no extra deps)
                "duration": None,
            })

        slug = slugify(album_dir.name)
        albums.append({
            "id": album_dir.name,
            "title": pretty_title(album_dir.name),
            "slug": slug,
            "cover": rel_cover,
            "page": f"album-{slug}.html",
            "tracks": rel_tracks
        })

    return albums

ALBUM_PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>{album_title} — MONA</title>
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="site.css">
  <link rel="stylesheet" href="airbrush.css">
</head>

<body class="airbrush-wall">
  <div class="globe left" aria-hidden="true"></div>
  <div class="globe right" aria-hidden="true"></div>
  <div class="crt-noise" aria-hidden="true"></div>
  <div class="tracking-bar" aria-hidden="true"></div>

  <div class="app">
    <nav class="nav">
      <a class="tab" href="index.html">home</a>
      <a class="tab" href="museum.html">museum</a>
      <a class="tab" href="visuals.html">visuals</a>
    </nav>

    <main class="stage">
      <section class="panel hero music-hero">
        <div class="titleRow">
          <h1>{album_title}</h1>
          <div class="byline">by origami ultra</div>
        </div>
        <div class="status">KIDD COMIC BEAT TAPES<span class="cursor"></span></div>
      </section>

      <section class="panel album-panel">
        <div class="album-head">
          <img class="album-cover" src="{album_cover}" alt="{album_title} cover" loading="lazy" />
          <div class="album-meta">
            <div class="album-meta__title">{album_title}</div>
            <div class="album-meta__sub">click a track to play · shuffle lives in the player</div>
          </div>
        </div>

        <div class="tracklist" id="tracklist"></div>

        <div class="player" id="player" aria-label="Album player">
          <audio id="audio" preload="metadata" crossorigin="anonymous"></audio>

          <div class="player-row player-row--top">
            <button class="pbtn" id="prevBtn" title="Previous">⟪</button>
            <button class="pbtn" id="playBtn" title="Play/Pause">▶</button>
            <button class="pbtn" id="nextBtn" title="Next">⟫</button>
            <button class="pbtn" id="shuffleBtn" aria-pressed="false" title="Shuffle">SHUF</button>

            <div class="now">
              <div class="now__track" id="nowTrack">—</div>
              <div class="now__time"><span id="curTime">0:00</span> / <span id="durTime">0:00</span></div>
            </div>

            <div class="vol">
              <label class="tiny">VOL</label>
              <input id="volSlider" type="range" min="0" max="1" step="0.01" value="0.85" />
            </div>
          </div>

          <div class="player-row player-row--mid">
            <input id="seek" class="seek" type="range" min="0" max="1000" step="1" value="0" />
          </div>

          <details class="fx" open>
            <summary class="fx__summary">FX / EQ</summary>

            <div class="fx__grid">
              <div class="fxbox">
                <div class="fxbox__title">REVERB</div>
                <div class="fxbox__row">
                  <label class="tiny">MIX</label>
                  <input id="reverbMix" type="range" min="0" max="1" step="0.01" value="0.0" />
                </div>
                <div class="fxbox__row">
                  <label class="tiny">DECAY</label>
                  <input id="reverbDecay" type="range" min="0.2" max="8" step="0.1" value="2.5" />
                </div>
              </div>

              <div class="eq">
                <div class="eq__title">EQUALIZER</div>
                <div class="eq__bands" id="eqBands"></div>
                <div class="eq__row">
                  <button class="pbtn pbtn--small" id="eqReset">RESET</button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>
    </main>

    <nav class="nav">
      <a class="tab" href="music.html">music</a>
      <a class="tab" href="agenda.html">agenda</a>
      <a class="tab" href="shop.html">shop</a>
      <a class="tab" href="donations.html">donations</a>
      <a class="tab" href="https://li.sten.to/ORIGAMIULTRA" target="_blank" rel="noopener noreferrer">links</a>
    </nav>
  </div>

  <script>
    // embedded album data (static page)
    window.__ALBUM__ = {album_json};
  </script>
  <script src="player.js"></script>
</body>
</html>
"""

def write_album_pages(albums: list[dict]):
    for a in albums:
        page_path = ROOT / a["page"]
        html = ALBUM_PAGE_TEMPLATE.format(
            album_title=a["title"],
            album_cover=a["cover"],
            album_json=json.dumps(a, ensure_ascii=False)
        )
        page_path.write_text(html, encoding="utf-8")
        print(f"Wrote {page_path}")

def main():
    pictures = build_picture_collections()
    music_albums = build_music_albums()

    out = {
        "collections": pictures,      # existing behavior
        "music_albums": music_albums  # new
    }

    out_path = ROOT / "collections.json"
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out_path} with {len(pictures)} picture collections + {len(music_albums)} music albums.")

    write_album_pages(music_albums)

if __name__ == "__main__":
    main()
