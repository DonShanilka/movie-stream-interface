'use client';

import { Play, Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const continueWatching = [
  { id: 1, title: 'Friends', image: 'https://images.unsplash.com/photo-1574267432644-f610c36e6a9f?w=300&h=400&fit=crop', progress: 45 },
  { id: 2, title: 'Gossip Girl', image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300&h=400&fit=crop', progress: 67 },
];

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[85vh] overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center px-12">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-300 mb-4">Sci-Fi / Action</p>
            <h2 className="text-6xl font-black mb-6 leading-tight tracking-tight">
              EVERYTHING<br />
              EVERYWHERE<br />
              ALL AT ONCE
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
              <span>2022</span> • <span>139 minutes</span>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg hover:bg-white/30 transition">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      <div className="px-12 py-8 -mt-32 relative z-10">
        <h3 className="text-2xl font-bold mb-6">Continue Watching</h3>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {continueWatching.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-52 group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Play className="w-10 h-10 fill-current" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
