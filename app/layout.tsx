import { TableContextProvider } from "../contexts/TableContext";
import "../styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://observatories.vercel.app/"),
  title: "Observatory",
  openGraph: {
    title: 'Observatory',
    description: 'Find your unstarred repositories and become a stargazer',
    url: 'https://observatories.vercel.app',
    siteName: 'Observatory',
    images: ['/observatory-conner-baker-unsplash.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Observatory',
    description: 'Find your unstarred repositories and become a stargazer',
    creator: '@wesngu28',
    images: ['/observatory-conner-baker-unsplash.jpg'],
  },
  icons: {
    apple: '/apple-icon.png',
  },
  manifest: "/site.webmanifest"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex w-full min-h-screen flex-col">
        <TableContextProvider>
          {children}
        </TableContextProvider>
      </body>
    </html>
  );
}
