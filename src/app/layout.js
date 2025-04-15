import "./globals.css";
export const metadata = {
  title: "Snippie — Cute App Builder",
  description: "Turn your ideas into adorable apps with Snippie 🐣",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`  font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
