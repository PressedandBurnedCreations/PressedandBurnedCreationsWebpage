(async function () {
  const collection = document.querySelector('#sticker-collection');
  if (!collection) return;

  const endpoint = 'https://pressed-and-burned-order-app.pages.dev/api/sticker-catalog';
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };

  try {
    const response = await fetch(endpoint, { cache: 'no-store' });
    if (!response.ok) throw new Error('Catalog returned ' + response.status);
    const { items } = await response.json();
    if (!Array.isArray(items) || !items.length) return;

    const section = element('section', '', 'section-pad');
    const wrap = element('div', '', 'wrap');
    const heading = element('h2', 'From the Sticker Catalog');
    heading.id = 'published-stickers-title';
    section.setAttribute('aria-labelledby', heading.id);
    const grid = element('div', '', 'sticker-grid');
    grid.style.marginTop = '1.5rem';

    for (const item of items) {
      const card = element('article', '', 'sticker-card');
      if (item.imageUrl) {
        const frame = element('div', '', 'sticker-image');
        const image = element('img');
        image.src = item.imageUrl;
        image.alt = item.name || 'Sticker artwork';
        image.loading = 'lazy';
        image.style.objectFit = 'contain';
        frame.append(image);
        card.append(frame);
      }
      const copy = element('div');
      copy.style.padding = '1rem';
      copy.append(element('h3', item.name || 'Sticker'));
      if (item.description) copy.append(element('p', item.description));
      if (item.sizes?.length) {
        const sizes = element('ul');
        for (const size of item.sizes) {
          sizes.append(element('li', size.label + ' · ' + money.format(size.price)));
        }
        copy.append(sizes);
      } else if (Number.isFinite(item.price)) {
        copy.append(element('p', money.format(item.price)));
      }
      card.append(copy);
      grid.append(card);
    }
    wrap.append(heading, grid);
    section.append(wrap);
    collection.after(section);
  } catch (error) {
    console.warn('The published sticker catalog could not load.', error);
  }
})();
