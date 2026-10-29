// Dùng children: nội dung bên trong thẻ <Section>…</Section>
export default function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
