'use client';

import { useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from 'lucide-react';

interface Props {
  src: string;
}

export default function CustomVideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  /* ▶ Play / Pause */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  /* 🔊 Mute */
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  /* ⏩ Progress */
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  /* ⛶ Fullscreen */
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl bg-black rounded-lg overflow-hidden"
    >
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() =>
          setDuration(videoRef.current?.duration || 0)
        }
        onClick={togglePlay}
        playsInline
      />

      {/* 🎛 CONTROLS */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 space-y-2">

        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={progress}
          onChange={handleSeek}
          className="w-full accent-red-600"
        />

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {playing ? <Pause /> : <Play />}
            </button>

            <button onClick={toggleMute}>
              {muted ? <VolumeX /> : <Volume2 />}
            </button>

            <span className="text-sm">
              {Math.floor(progress / 60)}:
              {String(Math.floor(progress % 60)).padStart(2, '0')}
              {' / '}
              {Math.floor(duration / 60)}:
              {String(Math.floor(duration % 60)).padStart(2, '0')}
            </span>
          </div>

          <button onClick={toggleFullscreen}>
            {fullscreen ? <Minimize /> : <Maximize />}
          </button>
        </div>
      </div>
    </div>
  );
}
