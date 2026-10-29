export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="genre-filter">
      {genres.map((g) => (
        <button
          key={g}
          className={g === selected ? 'active' : ''}
          onClick={() => onSelect(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
