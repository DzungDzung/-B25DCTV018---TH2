function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

export function createCard(book, isFav) {
  const card = el('article', 'card');
  card.dataset.id = book.id;
  card.append(
    el('h3', '', book.title),
    el('p', '', 'Tác giả: ' + book.author),
    el('p', '', 'Thể loại: ' + book.genre),
    el('p', '', 'Năm: ' + book.year)
  );
  const actions = el('div', 'actions');
  const fav = el('button', 'fav' + (isFav ? ' active' : ''), isFav ? '❤ Đã thích' : '♡ Yêu thích');
  fav.dataset.action = 'fav';
  const del = el('button', 'del', 'Xóa');
  del.dataset.action = 'delete';
  actions.append(fav, del);
  card.append(actions);
  return card;
}

export function renderBooks(container, books, favs) {
  container.replaceChildren(...books.map((b) => createCard(b, favs.has(String(b.id)))));
}

export function renderGenreOptions(select, genres, firstLabel) {
  const first = new Option(firstLabel, '');
  select.replaceChildren(first, ...genres.map((g) => new Option(g, g)));
}
