import { X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface Props {
  open: boolean;
  movie: any;
  onClose: () => void;
}

export default function VideoModal({ open, movie, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black rounded-xl w-[95%] md:w-[900px] overflow-hidden transform transition-all duration-300 ${
          open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white border-b border-white/10">
          <h2 className="text-xl font-semibold">{movie.title}</h2>
          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Custom Video Player */}
        <VideoPlayer src={movie.trailer} autoPlay />
      </div>
    </div>
  );
}
