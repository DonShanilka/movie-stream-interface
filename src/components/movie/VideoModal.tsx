'use client';

import { X } from 'lucide-react';

export default function VideoModal({
  movieUrl,
  onClose,
}: {
  movieUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white"
      >
        <X className="w-8 h-8" />
      </button>

      <video
        src={movieUrl}
        controls
        autoPlay
        playsInline
        className="w-full max-w-6xl rounded-lg"
      />
    </div>
  );
}
