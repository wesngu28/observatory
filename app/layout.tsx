import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex w-full min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
