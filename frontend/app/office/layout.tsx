import { HeaderOffice } from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="main">
        <HeaderOffice />
        {children}
      </body>
    </html>
  );
}
