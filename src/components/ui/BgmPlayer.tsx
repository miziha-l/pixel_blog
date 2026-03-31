"use client";

import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography, Collapse } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

type Track = {
  title: string;
  url: string;
  artist?: string;
  note?: string;
};

const PLAYLIST: Track[] = [
  {
    title: "8-Bit Arcade",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=8-bit-arcade-138828.mp3",
  },
  {
    title: "Retro Platformer",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=platformer-level-01-283120.mp3",
  },
  {
    title: "Pixel Dream",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245e14b2d1.mp3?filename=8-bit-background-music-for-arcade-game-come-on-mario-164702.mp3",
  },
  {
    title: "花事了",
    artist: "王菲",
    url: "/wangfei-huashile.mp3",
    note: "需要你提供已授权音频文件",
  },
];

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentIndexRef = useRef(0);
  const autoplayRef = useRef(false);

  const handleNext = () => {
    setPlayError(null);
    autoplayRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setPlayError(null);
    autoplayRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const audio = new Audio(PLAYLIST[0].url);
    audio.volume = 0.3;
    audioRef.current = audio;

    const handleEnded = () => {
      handleNext();
    };

    const handleError = () => {
      setIsPlaying(false);
      const track = PLAYLIST[currentIndexRef.current];
      const label = [track.artist, track.title].filter(Boolean).join(" - ");
      setPlayError(
        `${label} 播放失败：音源不可用或无权限（若为本地文件请确认已放入 public/audio）`,
      );
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []); // Note: ESLint might complain about missing dependency handleNext, but it's fine for this simple player

  // Handle track change
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      const shouldAutoplay = autoplayRef.current || wasPlaying;
      autoplayRef.current = false;
      audioRef.current.src = PLAYLIST[currentIndex].url;
      audioRef.current.load();
      if (shouldAutoplay) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          const track = PLAYLIST[currentIndex];
          const label = [track.artist, track.title].filter(Boolean).join(" - ");
          setPlayError(
            `${label} 播放失败：音源不可用或无权限（若为本地文件请确认已放入 public/audio）`,
          );
        });
      }
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setPlayError(null);
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          const track = PLAYLIST[currentIndex];
          const label = [track.artist, track.title].filter(Boolean).join(" - ");
          setPlayError(
            `${label} 播放失败：音源不可用或无权限（若为本地文件请确认已放入 public/audio）`,
          );
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {/* Player Panel */}
      <Collapse in={isExpanded} timeout="auto">
        <Box
          sx={{
            bgcolor: "#fff",
            border: "3px solid #000",
            boxShadow: "4px 4px 0px #000",
            p: 1.5,
            mb: 1,
            width: "220px",
          }}
        >
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              color: "#ff7b9c",
              display: "block",
              mb: 1,
              borderBottom: "2px dashed #000",
              pb: 0.5,
            }}
          >
            BGM TRACK {currentIndex + 1}/{PLAYLIST.length}
          </Typography>

          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              mb: 2,
              bgcolor: "#000",
              color: "#48dbfb",
              p: 0.5,
              border: "2px solid #000",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{
                display: "inline-block",
                animation: "marquee 10s linear infinite",
              }}
            >
              ♪{" "}
              {[PLAYLIST[currentIndex].artist, PLAYLIST[currentIndex].title]
                .filter(Boolean)
                .join(" - ")}
            </Typography>
          </Box>

          {(PLAYLIST[currentIndex].note || playError) && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 1.5,
                color: playError ? "#ff4757" : "#2f3542",
              }}
            >
              {playError ?? PLAYLIST[currentIndex].note}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
            <IconButton
              size="small"
              onClick={handlePrev}
              sx={{
                color: "#000",
                border: "2px solid #000",
                borderRadius: 0,
                "&:hover": { bgcolor: "#f1f2f6" },
              }}
            >
              <SkipPreviousIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={togglePlay}
              sx={{
                color: "#000",
                border: "2px solid #000",
                borderRadius: 0,
                bgcolor: isPlaying ? "#ff7b9c" : "transparent",
                "&:hover": { bgcolor: isPlaying ? "#ff9a9e" : "#f1f2f6" },
              }}
            >
              {isPlaying ? (
                <PauseIcon fontSize="small" />
              ) : (
                <PlayArrowIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNext}
              sx={{
                color: "#000",
                border: "2px solid #000",
                borderRadius: 0,
                "&:hover": { bgcolor: "#f1f2f6" },
              }}
            >
              <SkipNextIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Collapse>

      {/* Main Toggle Button */}
      <IconButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          bgcolor: isPlaying ? "#ff7b9c" : "#fff",
          color: isPlaying ? "#fff" : "#000",
          border: "3px solid #000",
          boxShadow: "4px 4px 0px #000",
          borderRadius: 0,
          "&:hover": {
            bgcolor: isPlaying ? "#ff9a9e" : "#f1f2f6",
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0px #000",
          },
          "&:active": {
            transform: "translate(2px, 2px)",
            boxShadow: "2px 2px 0px #000",
          },
        }}
      >
        <QueueMusicIcon />
      </IconButton>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
}
