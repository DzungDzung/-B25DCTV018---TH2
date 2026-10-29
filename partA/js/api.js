// Để trống = đọc từ books.json. Dán link mockapi để dùng GET/POST/DELETE thật,
// ví dụ: 'https://xxxxxxxx.mockapi.io/api/v1/books'
export const API_URL = '';

export async function fetchBooks() {
  const res = await fetch(API_URL || './books.json');
  if (!res.ok) throw new Error('Không tải được dữ liệu (' + res.status + ')');
  return res.json();
}

export async function addBook(book) {
  if (!API_URL) return { ...book, id: 'local-' + Date.now() };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Thêm sách thất bại');
  return res.json();
}

export async function deleteBook(id) {
  if (!API_URL) return;
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Xóa sách thất bại');
}
