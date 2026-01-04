(async function () {
  const grid = document.getElementById("musicGrid");
  if (!grid) return;

  const res = await fetch("collections.json", { cache: "no-store" });
  const data = await res.json();

  const albums = data.music_albums || [];
  if (!albums.length) {
    grid.innerHTML = `<div class="music-empty">NO ALBUMS FOUND. (missing cover.png?)</div>`;
    return;
  }

  grid.innerHTML = albums.map(a => {
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

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
