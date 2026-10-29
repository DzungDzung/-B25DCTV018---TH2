export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.genre}</p>
      <p>Năm: {book.year}</p>
      <button
        className={isFavorite ? 'fav active' : 'fav'}
        onClick={() => onToggleFavorite(book.id)}
      >
        {isFavorite ? '❤ Đã thích' : '♡ Yêu thích'}
      </button>
    </article>
  );
}
