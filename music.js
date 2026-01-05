(async function () {
  const grid = document.getElementById("musicGrid");
  const origamiGrid = document.getElementById("origamiGrid");
  if (!grid && !origamiGrid) return;

  const res = await fetch("collections.json", { cache: "no-store" });
  const data = await res.json();

  // Origami Ultra albums
  if (origamiGrid) {
    const albums = data.origami_albums || [];
    if (!albums.length) {
      origamiGrid.innerHTML = `<div class="music-empty">NO ORIGAMI ULTRA ALBUMS FOUND.</div>`;
    } else {
      origamiGrid.innerHTML = renderTiles(albums);
    }
  }

  // Kidd Comic albums (existing behavior)
  if (grid) {
    const albums = data.music_albums || [];
    if (!albums.length) {
      grid.innerHTML = `<div class="music-empty">NO ALBUMS FOUND. (missing cover.png?)</div>`;
    } else {
      grid.innerHTML = renderTiles(albums);
    }
  }

  function renderTiles(albums) {
    return albums.map(a => {
      const safeTitle = escapeHtml(a.title);
      return `
        <a class="album-tile" href="${a.page}">
          <div class="album-tile__imgwrap">
            <img src="${a.cover}" alt="${safeTitle} cover" loading="lazy" />
          </div>
          <div class="album-tile__title">${safeTitle}</div>
          <div class="album-tile__sub">${(a.tracks?.length || 0)} tracks</div>
        </a>
      `;
    }).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();

