import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import songsData from "../data/songs.json";

const AudioPlayer = () => {
    const [songs] = useState(songsData.songs);
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const isPlayingRef = useRef(isPlaying);

    const song = songs[current];

    useEffect(() => {

        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {

        const id = setTimeout(() => {
            setProgress(0);
            setCurrentTime(0);
            setDuration(song.duration_sec || 0);
            if (!audioRef.current) return;

            try { audioRef.current.pause(); } catch { /* ignore pause errors */ }
            try { audioRef.current.load(); } catch { /* ignore load errors */ }
            if (isPlayingRef.current) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
        }, 0);
        return () => clearTimeout(id);
    }, [current, song.duration_sec]);



    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    };

    const onLoadedMetadata = () => {
        const d = audioRef.current?.duration || song.duration_sec || 0;
        const ct = audioRef.current?.currentTime || 0;
        setDuration(d);
        setCurrentTime(ct);
        setProgress(d ? (ct / d) * 100 : 0);
    };

    const onTimeUpdate = () => {
        const ct = audioRef.current?.currentTime || 0;
        const d = audioRef.current?.duration || 0;
        setCurrentTime(ct);
        if (d && isFinite(d) && d > 0) setProgress((ct / d) * 100);
    };

    const formatTime = (t) => {
        if (!t || !isFinite(t)) return "0:00";
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const next = () => {
        const nextIndex = (current + 1) % songs.length;
        setCurrent(nextIndex);
        setProgress(0);
        setCurrentTime(0);
        setDuration(songs[nextIndex].duration_sec || 0);
    };
    const prev = () => {
        const prevIndex = (current - 1 + songs.length) % songs.length;
        setCurrent(prevIndex);
        setProgress(0);
        setCurrentTime(0);
        setDuration(songs[prevIndex].duration_sec || 0);
    };

    return (
        <div className="relative z-50 rounded-full px-5 py-4 flex items-center gap-4
                        bg-transparent backdrop-blur backdrop-saturate-[1.5]
                        border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.3)]
                        w-full max-w-md text-white isolate overflow-hidden">
            
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
            
            <div className="relative w-14 h-14 shrink-0">
                <img
                    src={song.cover_image}
                    alt={song.name}
                    className="w-14 h-14 rounded-full object-cover shadow-lg border border-white/10"
                    style={{ animation: isPlaying ? 'spin 8s linear infinite' : 'none' }}
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]" />
            </div>

            <div className="flex flex-col flex-1 min-w-0 justify-center">
                <span className="text-white font-medium text-[15px] leading-tight truncate drop-shadow-sm">{song.name}</span>
                <span className="text-white/60 text-xs truncate mt-0.5">{song.artist}</span>

                <div className="relative h-1 bg-white/10 rounded-full mt-2 overflow-hidden shadow-inner cursor-pointer" onClick={(e) => {
                    if (!audioRef.current) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    const newTime = percent * duration;
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                }}>
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-medium tracking-wide">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-1">
                <button onClick={prev} className="text-white/60 hover:text-white transition-colors active:scale-95 p-1.5">
                    <SkipBack fill="currentColor" size={18} />
                </button>
                <button
                    onClick={togglePlay}
                    className="w-[2.25rem] h-[2.25rem] flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 rounded-full transition-all border border-white/10 shadow-sm backdrop-blur-md text-white"
                >
                    {isPlaying ? <Pause fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} className="ml-0.5" />}
                </button>
                <button onClick={next} className="text-white/60 hover:text-white transition-colors active:scale-95 p-1.5">
                    <SkipForward fill="currentColor" size={18} />
                </button>
            </div>

            <audio
                ref={audioRef}
                src={song.song_location}
                preload="metadata"
                onLoadedMetadata={onLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={onTimeUpdate}
                onEnded={next}
            />
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AudioPlayer;