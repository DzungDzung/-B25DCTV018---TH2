import BookCard from './BookCard.jsx';

export default function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) return <p>Không có sách nào.</p>;
  return (
    <div className="book-list">
      {books.map((b) => (
        <BookCard
          key={b.id}
          book={b}
          isFavorite={favorites.includes(b.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
