import { FavoritesProvider } from '@/context/FavoritesContext';
import './globals.css';

export const metadata = {
  title: 'StreamBerry',
  description: 'Streaming platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
