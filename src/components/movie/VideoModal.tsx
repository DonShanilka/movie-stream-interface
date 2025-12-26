'use client';

import { X } from 'lucide-react';
import CustomVideoPlayer from './CustomVideoPlayer';

export default function VideoModal({
  movieUrl,
  onClose,
}: {
  movieUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-500 transition"
      >
        <X className="w-8 h-8" />
      </button>

      {/* 🎬 Custom Player */}
      <CustomVideoPlayer src={movieUrl} />
    </div>
  );
}
