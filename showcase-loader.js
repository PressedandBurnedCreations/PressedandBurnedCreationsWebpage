(async function () {
  const endpoint = 'https://pressed-and-burned-order-app.pages.dev/api/showcase';
  const section = document.querySelector('#custom-projects');
  if (!section) return;
  try {
    const response = await fetch(endpoint, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Showcase returned ${response.status}`);
    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    if (!items.length) return;
    const style = document.createElement('style');
    style.textContent = '.app-showcase-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;max-width:1180px;margin:2rem auto 0}.app-showcase-card{overflow:hidden;border:1px solid rgba(244,166,50,.32);border-radius:16px;background:#130d09;color:#fff}.app-showcase-card img{display:block;width:100%;height:270px;object-fit:cover}.app-showcase-card div{padding:1rem 1.1rem}.app-showcase-card small{color:#f4a632;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.app-showcase-card h3{margin:.4rem 0;color:#fff}.app-showcase-card p{margin:.4rem 0 0;color:#d9cfc8;line-height:1.55}';
    document.head.append(style);
    const gallery = document.createElement('div');
    gallery.className = 'app-showcase-gallery';
    gallery.setAttribute('aria-label', 'Recently published projects');
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'app-showcase-card';
      const image = document.createElement('img');
      image.src = item.imageUrl;
      image.alt = item.title || 'Pressed and Burned Creations project';
      image.loading = 'lazy';
      const body = document.createElement('div');
      const category = document.createElement('small');
      category.textContent = item.category || 'Pressed & Burned creation';
      const title = document.createElement('h3');
      title.textContent = item.title || 'Custom project';
      const caption = document.createElement('p');
      caption.textContent = item.caption || '';
      body.append(category, title);
      if (item.caption) body.append(caption);
      card.append(image, body);
      gallery.append(card);
    });
    section.append(gallery);
  } catch (error) {
    console.warn('Public showcase could not be loaded.', error);
  }
})();
