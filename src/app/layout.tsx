import { FavoritesProvider } from '@/context/FavoritesContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'StreamBerry',
  description: 'Streaming platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
