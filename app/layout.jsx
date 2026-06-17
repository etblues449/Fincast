import "./globals.css";

export const metadata = {
  title: "CreatorOS — Finance Channel",
  description: "Content workbench for a faceless personal-finance YouTube channel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
