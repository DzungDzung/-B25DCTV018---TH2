import { useState } from 'react';
import books from './data/books.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [favorites, setFavorites] = useState([]); // mảng id yêu thích
  const [genre, setGenre] = useState('Tất cả');

  const genres = ['Tất cả', ...new Set(books.map((b) => b.genre))];
  const shown = genre === 'Tất cả' ? books : books.filter((b) => b.genre === genre);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <>
      <Header favCount={favorites.length} />
      <main>
        <Section title="Thể loại">
          <GenreFilter genres={genres} selected={genre} onSelect={setGenre} />
        </Section>
        <Section title={`Danh sách sách (${shown.length} / ${books.length})`}>
          <BookList books={shown} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
