'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movie' },
  { name: 'TV Series', href: '/tv' },
  { name: 'New & Popular', href: '/new-popular' },
  { name: 'My List', href: '/my-list' },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between px-12 py-4">
        {/* Logo + Menu */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold text-yellow-400">
            StreamBerry
          </Link>

          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
