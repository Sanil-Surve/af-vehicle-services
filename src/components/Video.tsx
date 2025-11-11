import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import video from '@/assets/video/vehicle.mp4';

interface VideoPlayerProps {
    src?: string;
    poster?: string;
    title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src = video,
    poster = "",
    title = "AF Vehicle Services"
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        if (isPlaying || isHovering) {
            setShowControls(true);
            clearTimeout(controlsTimeoutRef.current);

            if (isPlaying && !isHovering) {
                controlsTimeoutRef.current = setTimeout(() => {
                    setShowControls(false);
                }, 3000);
            }
        }

        return () => clearTimeout(controlsTimeoutRef.current);
    }, [isPlaying, isHovering]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = vol;
            setVolume(vol);
            setIsMuted(vol === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    const skip = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                </div>

                <div
                    ref={containerRef}
                    className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        src={src}
                        poster={poster}
                        className="w-full aspect-video"
                        onClick={togglePlay}
                    />

                    {/* Play Overlay */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                            onClick={togglePlay}
                        >
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                <Play className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" />
                            </div>
                        </div>
                    )}

                    {/* Controls */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-300 mt-1">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* Play/Pause */}
                                <button
                                    onClick={togglePlay}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 text-white" />
                                    ) : (
                                        <Play className="w-6 h-6 text-white" />
                                    )}
                                </button>

                                {/* Skip Buttons */}
                                <button
                                    onClick={() => skip(-10)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Skip back 10 seconds"
                                >
                                    <SkipBack className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={() => skip(10)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Skip forward 10 seconds"
                                >
                                    <SkipForward className="w-5 h-5 text-white" />
                                </button>

                                {/* Volume Controls */}
                                <div className="flex items-center gap-2 ml-2">
                                    <button
                                        onClick={toggleMute}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                                    >
                                        {isMuted || volume === 0 ? (
                                            <VolumeX className="w-5 h-5 text-white" />
                                        ) : (
                                            <Volume2 className="w-5 h-5 text-white" />
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-5 h-5 text-white" />
                                ) : (
                                    <Maximize className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
        </div>
    );
};

export default VideoPlayer;