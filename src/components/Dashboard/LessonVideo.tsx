"use client";
import { FullscreenIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useEffect, useRef, useState } from "react";
import { completeLesson } from "@/server/lesson";

const LessonVideo = ({ videoUrl, lessonId, userId }: { videoUrl: string, lessonId: string, userId: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlay = () => {
        if (videoRef.current) {
            setIsPlaying(!isPlaying);
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            setCurrentTime(videoRef.current.currentTime);
        }
    }

    const handleCurrentTimeChange = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }

    const handleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            
            const handleLoadedMetadata = () => {
                setDuration(video.duration || 0);
            };

            const handleEnded = () => {
                completeLesson(lessonId, userId);
            };

            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('ended', handleEnded);

            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('ended', handleEnded);
            };
        }
    }, [lessonId, userId]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
            <video 
                src={videoUrl} 
                className="w-full h-full" 
                controls={false} 
                ref={videoRef} 
                onTimeUpdate={handleTimeUpdate}
                crossOrigin="anonymous"
            />
            <LessonVideoControls 
                isPlaying={isPlaying} 
                handlePlay={handlePlay} 
                duration={duration} 
                currentTime={currentTime} 
                handleCurrentTimeChange={handleCurrentTimeChange} 
                handleFullscreen={handleFullscreen}
            />
        </div>
    )
}

const LessonVideoControls = ({ isPlaying, handlePlay, duration, currentTime, handleCurrentTimeChange, handleFullscreen }: { isPlaying: boolean, handlePlay: () => void, duration: number, currentTime: number, handleCurrentTimeChange: (time: number) => void, handleFullscreen: () => void }) => {
    return (
        <div className="bg-white p-2 flex items-center justify-between gap-2">
            <LessonVideoPlayButton isPlaying={isPlaying} handlePlay={handlePlay} />
            <LessonVideoSlider duration={duration} currentTime={currentTime} handleCurrentTimeChange={handleCurrentTimeChange} />
            <LessonVideoFullscreenButton handleFullscreen={handleFullscreen} />
        </div>
    )
}

const LessonVideoPlayButton = ({ isPlaying, handlePlay }: { isPlaying: boolean, handlePlay: () => void }) => {
    return (
        <Button size="icon" asChild className="bg-black" onClick={handlePlay}>
            {isPlaying ? <PauseIcon fill="white" className="w-6 h-6 text-white p-1.5" /> : <PlayIcon fill="white" className="w-6 h-6 text-white p-1.5" />}
        </Button>
    )
}

const LessonVideoSlider = ({ duration, currentTime, handleCurrentTimeChange }: { duration: number, currentTime: number, handleCurrentTimeChange: (time: number) => void }) => {
    const handleValueChange = (value: number[]) => {
        handleCurrentTimeChange(value[0]);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <div className="w-full mx-6 flex items-center gap-2">
            <div className="w-10 text-sm text-gray-500">{formatTime(currentTime)}</div>
            <Slider className="w-full" max={duration} step={1} value={[currentTime]} onValueChange={handleValueChange} />
            <div className="w-10 text-sm text-gray-500">{formatTime(duration)}</div>
        </div>
    )
}

const LessonVideoFullscreenButton = ({ handleFullscreen }: { handleFullscreen: () => void }) => {
    return (
        <Button size="icon" asChild variant="ghost" onClick={handleFullscreen}>
            <FullscreenIcon className="w-6 h-6" />
        </Button>
    )
}

export default LessonVideo;