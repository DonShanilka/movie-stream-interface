import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from 'lucide-react';

interface Props {
  src: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<Props> = ({ src, autoPlay = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) video.play();

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) video.pause();
    else video.play();

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const v = parseFloat(e.target.value);
    video.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (sec: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + sec));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  };

  const formatTime = (t: number) =>
    `${Math.floor(t / 60).toString().padStart(2, '0')}:${Math.floor(t % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <div
      ref={containerRef}
      className="relative bg-slate-900 overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-video bg-black"
        onClick={togglePlay}
      />

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 mb-3 slider"
          style={{
            background: `linear-gradient(to right, #facc15 ${(currentTime / duration) * 100}%, #374151 0%)`,
          }}
        />

        <div className="flex justify-between items-center text-white gap-4">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause size={26} /> : <Play size={26} />}
            </button>

            <button onClick={() => skip(-10)}>
              <SkipBack size={22} />
            </button>

            <button onClick={() => skip(10)}>
              <SkipForward size={22} />
            </button>

            {/* Mute / Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 slider"
                style={{
                  background: `linear-gradient(to right, #facc15 ${volume * 100}%, #374151 0%)`,
                }}
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button onClick={toggleFullscreen}>
            <Maximize size={22} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: #facc15;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
