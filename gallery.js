async function loadCollections() {
  const res = await fetch("collections.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load collections.json");
  return res.json();
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function safeUrl(path) {
  return encodeURI(path);
}

function $(sel) {
  return document.querySelector(sel);
}

(async function initGallery() {
  const collectionId = getQueryParam("c");
  const titleEl = $("#galleryTitle");
  const metaEl = $("#galleryMeta");
  const gridEl = $("#thumbGrid");

  if (!collectionId) {
    titleEl.textContent = "NO COLLECTION";
    metaEl.textContent = "Missing ?c=collection query param";
    return;
  }

  let data;
  try {
    data = await loadCollections();
  } catch (e) {
    console.error(e);
    titleEl.textContent = "LOAD ERROR";
    metaEl.textContent = "Could not load collections.json";
    return;
  }

  const collection = data.collections.find(c => c.id === collectionId);
  if (!collection) {
    titleEl.textContent = "NOT FOUND";
    metaEl.textContent = `Unknown collection: ${collectionId}`;
    return;
  }

  titleEl.textContent = collection.title;
  metaEl.textContent = `${collection.count} photos`;

  // Render thumbs
  gridEl.innerHTML = "";
  const images = collection.images;

  images.forEach((src, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb";
    btn.style.fontFamily = "inherit";
    btn.style.color = "inherit";
    btn.style.padding = "0";
    btn.style.textAlign = "inherit";
    btn.setAttribute("aria-label", `Open image ${idx + 1} of ${images.length}`);

    const img = document.createElement("img");
    img.src = safeUrl(src);
    img.alt = `${collection.title} — ${idx + 1}`;
    img.loading = "lazy";

    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(idx));
    gridEl.appendChild(btn);
  });

  // Lightbox logic
  const lb = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbLabel = $("#lbLabel");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const closeBtn = $("#closeBtn");

  let current = 0;

  function renderLightbox() {
    lbImg.src = safeUrl(images[current]);
    lbImg.alt = `${collection.title} — ${current + 1} of ${images.length}`;
    lbLabel.textContent = `${current + 1} / ${images.length}`;
  }

  function openLightbox(i) {
    current = i;
    renderLightbox();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    renderLightbox();
  }

  function next() {
    current = (current + 1) % images.length;
    renderLightbox();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  closeBtn.addEventListener("click", closeLightbox);

  // click backdrop closes
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  // keyboard controls
  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
