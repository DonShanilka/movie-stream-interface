'use client';

import { useState } from 'react';
import { Play, Plus, Search, User, Volume2, VolumeX, Pause } from 'lucide-react';

// Mock data
const continueWatching = [
  { id: 1, title: 'Friends', image: 'https://images.unsplash.com/photo-1574267432644-f610c36e6a9f?w=300&h=400&fit=crop', progress: 45 },
  { id: 2, title: 'Gossip Girl', image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300&h=400&fit=crop', progress: 67 },
  { id: 3, title: 'Action Movie', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=400&fit=crop', progress: 23 },
  { id: 4, title: 'Fight Club', image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=400&fit=crop', progress: 89 },
  { id: 5, title: 'Rick and Morty', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=400&fit=crop', progress: 34 },
  { id: 6, title: 'The Great Wall', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop', progress: 56 },
];

const trendingNow = [
  { id: 7, title: 'Sports Event', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=400&fit=crop' },
  { id: 8, title: 'In Time', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop' },
  { id: 9, title: 'Divergent', image: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=300&h=400&fit=crop' },
  { id: 10, title: 'Aquaman', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=400&fit=crop' },
  { id: 11, title: 'Drama Series', image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop' },
  { id: 12, title: 'Comedy Show', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=400&fit=crop' },
];

export default function StreamingPlatform() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('Film');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-yellow-400">StreamBerry</h1>
            <div className="flex gap-6">
              {['Film', 'Serie', 'Live TV'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[85vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop)',
            backgroundPosition: 'center 20%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center px-12">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-300 mb-4">FictR / SciFi</p>
            <h2 className="text-6xl font-black mb-6 leading-tight tracking-tight">
              EVERYTHING<br />
              EVERYWHERE<br />
              ALL AT ONCE
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
              <span>2022</span>
              <span>•</span>
              <span>139 minutes</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
              A middle-aged Chinese immigrant is swept up into an insane adventure where she alone can save existence by exploring other universes and connecting with the lives she could have led.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105">
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-all"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
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
                  className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-10 h-10 fill-current" />
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div 
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="px-12 py-8">
        <h3 className="text-2xl font-bold mb-6">Trending Now</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {trendingNow.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-52 group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-10 h-10 fill-current" />
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
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}