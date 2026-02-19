
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // URL nhạc lãng mạn/chill (Jazz Piano)
  const musicUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lo-fi-chill-medium-version-120-bpm-11642.mp3"; 

  useEffect(() => {
    // Tạo audio object
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.4; // Âm lượng vừa phải
    audioRef.current = audio;

    // Tự động phát nếu có thể (thường trình duyệt chặn cho đến khi user tương tác)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <motion.button
      className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all"
      onClick={togglePlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
    >
      {isPlaying ? (
        <span className="animate-pulse text-lg">♫</span>
      ) : (
        <span className="text-lg">🔇</span>
      )}
      
      {/* Visualizer effect circle */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
      )}
    </motion.button>
  );
};

export default BackgroundMusic;
