import { fetchBooks, addBook, deleteBook } from './api.js';
import { loadFavs, saveFavs, loadTheme, saveTheme } from './storage.js';
import { renderBooks, renderGenreOptions } from './render.js';
import { validateField } from './validate.js';

const $ = (s) => document.querySelector(s);
const listEl = $('#book-list'), statusEl = $('#status'), favCountEl = $('#fav-count');
const searchEl = $('#search'), filterEl = $('#genre-filter'), formEl = $('#book-form');

const state = { books: [], favs: new Set(loadFavs().map(String)), keyword: '', genre: '' };

function getFiltered() {
  const kw = state.keyword.trim().toLowerCase();
  return state.books.filter(
    (b) => b.title.toLowerCase().includes(kw) && (!state.genre || b.genre === state.genre)
  );
}

function render() {
  const shown = getFiltered();
  renderBooks(listEl, shown, state.favs);
  favCountEl.textContent = state.favs.size;
  statusEl.className = '';
  statusEl.textContent = `Đang hiển thị ${shown.length} / ${state.books.length} cuốn`;
}

function refreshGenres() {
  const genres = [...new Set(state.books.map((b) => b.genre))]; // Set: loại trùng
  renderGenreOptions(filterEl, genres, 'Tất cả thể loại');
  filterEl.value = genres.includes(state.genre) ? state.genre : '';
  const formSelect = $('#genre');
  const cur = formSelect.value;
  renderGenreOptions(formSelect, genres, '-- Chọn thể loại --');
  formSelect.value = cur;
}

async function init() {
  statusEl.textContent = 'Đang tải…';
  try {
    state.books = await fetchBooks();
    refreshGenres();
    render();
  } catch (err) {
    statusEl.className = 'error';
    statusEl.textContent = 'Lỗi: ' + err.message;
  }
}

// --- Tìm kiếm & lọc ---
searchEl.addEventListener('input', (e) => { state.keyword = e.target.value; render(); });
filterEl.addEventListener('change', (e) => { state.genre = e.target.value; render(); });

// --- Event delegation cho Yêu thích / Xóa ---
listEl.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.card');
  const id = card.dataset.id;
  if (btn.dataset.action === 'fav') {
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    saveFavs(state.favs);
    render();
  } else if (btn.dataset.action === 'delete') {
    if (!confirm('Bạn có chắc muốn xóa cuốn sách này?')) return;
    try {
      await deleteBook(id);
      state.books = state.books.filter((b) => String(b.id) !== id);
      state.favs.delete(id);
      saveFavs(state.favs);
      refreshGenres();
      render();
    } catch (err) {
      statusEl.className = 'error';
      statusEl.textContent = 'Lỗi: ' + err.message;
    }
  }
});

// --- Form thêm sách ---
function showError(name, msg) {
  formEl.querySelector(`[data-for="${name}"]`).textContent = msg;
  formEl.elements[name].classList.toggle('invalid', !!msg);
}
function checkField(name) {
  const msg = validateField(name, formEl.elements[name].value);
  showError(name, msg);
  return !msg;
}
const FIELDS = ['title', 'author', 'genre', 'year'];

formEl.addEventListener('input', (e) => { if (FIELDS.includes(e.target.name)) checkField(e.target.name); });
formEl.addEventListener('change', (e) => { if (FIELDS.includes(e.target.name)) checkField(e.target.name); });

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ok = FIELDS.map(checkField).every(Boolean); // kiểm tra hết mọi ô
  if (!ok) return;
  const data = {
    title: formEl.title.value.trim(),
    author: formEl.author.value.trim(),
    genre: formEl.genre.value,
    year: Number(formEl.year.value),
  };
  try {
    const created = await addBook(data);
    state.books.unshift(created); // hiển thị ở đầu danh sách
    formEl.reset();
    refreshGenres();
    render();
  } catch (err) {
    statusEl.className = 'error';
    statusEl.textContent = 'Lỗi: ' + err.message;
  }
});

// --- Chế độ sáng/tối (nâng cao) ---
const themeBtn = $('#theme-toggle');
function applyTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
  themeBtn.textContent = t === 'dark' ? '☀ Sáng' : '🌙 Tối';
}
applyTheme(loadTheme());
themeBtn.addEventListener('click', () => {
  const next = document.body.classList.contains('dark') ? 'light' : 'dark';
  saveTheme(next);
  applyTheme(next);
});

init();
