export default function Header({ favCount }) {
  return (
    <header className="header">
      <h1>📚 Thư viện lớp</h1>
      <span>❤ Yêu thích: <strong>{favCount}</strong></span>
    </header>
  );
}
