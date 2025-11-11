

// "use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";
import video from "@/assets/video/vehicle.mp4";

const VideoPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        const video = videoRef.current;
        if (video) {
            video.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(e.target.value) / 100) * (videoRef.current?.duration || 0);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        if (video && video.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
            <div className="relative w-full h-auto">
                <video
                    ref={videoRef}
                    src={video}
                    className="w-full rounded-lg"
                    onTimeUpdate={handleTimeUpdate}
                />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                {/* Play / Pause */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayPause}
                    className="rounded-full"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                {/* Progress Bar */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full sm:w-2/3 accent-black cursor-pointer"
                />

                {/* Volume */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleMute}
                        className="rounded-full"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 accent-black cursor-pointer"
                    />
                </div>

                {/* Fullscreen */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFullscreen}
                    className="rounded-full"
                >
                    <Maximize2 className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default VideoPlayer;