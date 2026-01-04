// ===== MONA Headlines Panel (World) =====
// Uses BBC World RSS via AllOrigins RAW proxy.

(function initHeadlines(){
  const FEED_NAME = "BBC World";
  const FEED_URL = "https://feeds.bbci.co.uk/news/world/rss.xml";
  const FETCH_URL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(FEED_URL);

  const btn = document.getElementById("headlinesBtn");
  if(!btn){
    // No button on this page (only homepage) — silently do nothing
    return;
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    }
    for (const c of children) node.appendChild(c);
    return node;
  }

  const panel = el("div", {
    class: "headlines-panel",
    id: "mona-headlines-panel",
    role: "dialog",
    "aria-label": "World headlines",
    "aria-hidden": "true"
  });

  const title = el("div", { class: "headlines-panel__title", text: "WORLD HEADLINES" });
  const meta = el("div", { class: "headlines-panel__meta", text: `SOURCE: ${FEED_NAME}` });
  const closeBtn = el("button", { class: "headlines-panel__close", type: "button", text: "CLOSE" });

  const head = el("div", { class: "headlines-panel__head" }, [
    el("div", {}, [title, meta]),
    closeBtn
  ]);

  const body = el("div", { class: "headlines-panel__body" }, [
    el("div", { text: "Loading…" })
  ]);

  panel.appendChild(head);
  panel.appendChild(body);
  document.body.appendChild(panel);

  let loaded = false;
  let loading = false;

  function setOpen(isOpen){
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (isOpen && !loaded && !loading) loadFeed();
  }

  function parseRss(xmlText){
    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];
    const items = Array.from(doc.querySelectorAll("item")).slice(0, 10);
    return items.map(item => ({
      title: item.querySelector("title")?.textContent?.trim() || "Untitled",
      link: item.querySelector("link")?.textContent?.trim() || "#",
      pubDate: item.querySelector("pubDate")?.textContent?.trim() || ""
    }));
  }

  async function loadFeed(){
    loading = true;
    try{
      body.innerHTML = "";
      body.appendChild(el("div", { text: "Fetching latest…" }));

      const res = await fetch(FETCH_URL + "&_=" + Date.now(), { cache: "no-store" });
      if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);

      const text = await res.text();
      const items = parseRss(text);

      body.innerHTML = "";

      if(items.length === 0){
        body.appendChild(el("div", { text: "No headlines available (feed blocked or not parsed)." }));
        loaded = false;
        return;
      }

      const list = el("ul", { class: "headlines-list" });

      for(const it of items){
        const a = el("a", { href: it.link, target: "_blank", rel: "noopener noreferrer" }, [
          el("div", { class: "headlines-item__title", text: it.title }),
          el("div", { class: "headlines-item__sub", text: it.pubDate })
        ]);
        list.appendChild(el("li", { class: "headlines-item" }, [a]));
      }

      body.appendChild(list);
      loaded = true;
    }catch(err){
      body.innerHTML = "";
      body.appendChild(el("div", { text: "Couldn’t load headlines (network/CORS/proxy)." }));
      body.appendChild(el("div", { text: String(err) }));
      loaded = false;
    }finally{
      loading = false;
    }
  }

  // events
  btn.addEventListener("click", () => {
    const isOpen = panel.getAttribute("aria-hidden") === "false";
    setOpen(!isOpen);
  });

  closeBtn.addEventListener("click", () => setOpen(false));

  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") setOpen(false);
  });

  window.addEventListener("click", (e) => {
    const isOpen = panel.getAttribute("aria-hidden") === "false";
    if(!isOpen) return;
    if(e.target === panel || panel.contains(e.target) || e.target === btn) return;
    setOpen(false);
  });
})();
