async function loadCollections() {
  const res = await fetch("collections.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load collections.json");
  return res.json();
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.appendChild(c);
  return node;
}

function safeUrl(path) {
  // handles spaces etc in filenames/folders
  return encodeURI(path);
}

function renderMuseumGrid(container, data) {
  container.innerHTML = "";

  for (const c of data.collections) {
    const href = `gallery.html?c=${encodeURIComponent(c.id)}`;

    const card = el("a", { class: "museum-card", href, style: "display:block; text-decoration:none;" }, [
      el("div", { class: "card", style: "border-radius:16px; overflow:hidden;" }, [
        el("div", {
          style:
            "aspect-ratio: 16 / 10; background: rgba(0,0,0,.35); border-bottom:1px solid rgba(57,255,20,.16); overflow:hidden;"
        }, [
          el("img", {
            src: safeUrl(c.cover),
            alt: `${c.title} cover`,
            loading: "lazy",
            style: "width:100%; height:100%; object-fit:cover; display:block; filter: contrast(1.02) saturate(1.02);"
          })
        ]),
        el("div", { style: "padding:12px 12px 14px;" }, [
          el("div", { style: "font-size:26px; letter-spacing:.12em; text-transform:uppercase;" }, [
            document.createTextNode(c.title)
          ]),
          el("div", {
            style: "font-size:18px; letter-spacing:.10em; opacity:.78; margin-top:4px;"
          }, [
            document.createTextNode(`${c.count} photos • click to enter`)
          ])
        ])
      ])
    ]);

    container.appendChild(card);
  }

  // Optional: if no collections found
  if (!data.collections.length) {
    container.appendChild(
      el("div", { class: "card", style: "border-radius:16px; padding:18px; opacity:.8;" }, [
        document.createTextNode("No collections found in collections.json.")
      ])
    );
  }
}

(async function initMuseum() {
  try {
    const data = await loadCollections();
    const grid = document.querySelector("#museumGrid");
    if (!grid) throw new Error("Missing #museumGrid container");
    renderMuseumGrid(grid, data);
  } catch (err) {
    console.error(err);
    const grid = document.querySelector("#museumGrid");
    if (grid) {
      grid.innerHTML = `<div class="card" style="border-radius:16px; padding:18px; opacity:.85;">
        Could not load collections. Open console for details.
      </div>`;
    }
  }
})();
