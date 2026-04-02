"use client";

import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PostList from "@/components/blog/PostList";
import Inventory from "@/components/home/Inventory";
import Achievements from "@/components/home/Achievements";
import DailyDrop from "@/components/home/DailyDrop";
import Tavern from "@/app/guestbook/page";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { usePlayerStore } from "@/store/usePlayerStore";
import { usePixelSound } from "@/hooks/usePixelSound";
import Typewriter from "@/components/ui/Typewriter";

export default function Home() {
  const {
    hp,
    maxHp,
    mp,
    maxMp,
    level,
    healHp,
    takeDamage,
    restoreMp,
    deductMp,
  } = usePlayerStore();
  const { playClick, playError, playSuccess } = usePixelSound();

  const handleHpClick = () => {
    if (hp < maxHp) {
      if (deductMp(10)) {
        playSuccess();
        healHp(20);
      } else {
        playError();
      }
    }
  };

  const handleMpClick = () => {
    if (mp < maxMp) {
      if (hp > 10) {
        playClick();
        takeDamage(10);
        restoreMp(20);
      } else {
        playError();
      }
    }
  };

  useEffect(() => {
    const scrollPos = sessionStorage.getItem("homeScrollPosition");
    if (scrollPos) {
      // Need a slight delay to ensure components are rendered before scrolling
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPos));
      }, 50);
      sessionStorage.removeItem("homeScrollPosition");
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
          backgroundColor: "#fff",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #a29bfe",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left Side: Character Profile */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box display="flex" justifyContent="center" mb={3}>
            <Box
              component="img"
              src="/assets/avatar.jpg"
              alt="avatar"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #000",
                boxShadow: "4px 4px 0px #000",
                animation: "float 4s ease-in-out infinite alternate",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "#ff7b9c" }}
          >
            CHARACTER PROFILE
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              mt: 2,
              p: 3,
              bgcolor: "#fdf6e3",
              border: "2px dashed #000",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -15,
                right: -15,
                bgcolor: "#fff",
                border: "2px solid #000",
                px: 1,
                transform: "rotate(15deg)",
              }}
            >
              <Typography variant="caption" fontWeight="bold">
                Lv.{level}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ mt: 1, fontWeight: "bold", fontSize: "1.2rem" }}
            >
              NAME: 魔法使开发者 🧙‍♂️
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, fontWeight: "bold", fontSize: "1.2rem" }}
            >
              CLASS: FRONTEND MAGE ✨
            </Typography>
            <Box
              onClick={handleHpClick}
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                transition: "transform 0.1s",
                "&:hover": { transform: "scale(1.02)" },
                "&:active": { transform: "scale(0.98)" },
              }}
              title="点击使用 10 MP 恢复 20 HP"
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: "40px" }}
              >
                HP:
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  height: "20px",
                  bgcolor: "#ffeaa7",
                  border: "2px solid #000",
                  p: "2px",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.max(0, Math.min(100, (hp / maxHp) * 100))}%`,
                    height: "100%",
                    bgcolor: "#ff7675",
                    transition: "width 0.3s",
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  textAlign: "right",
                }}
              >
                {hp}/{maxHp}
              </Typography>
            </Box>
            <Box
              onClick={handleMpClick}
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                transition: "transform 0.1s",
                "&:hover": { transform: "scale(1.02)" },
                "&:active": { transform: "scale(0.98)" },
              }}
              title="点击消耗 10 HP 恢复 20 MP"
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: "40px" }}
              >
                MP:
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  height: "20px",
                  bgcolor: "#ffeaa7",
                  border: "2px solid #000",
                  p: "2px",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.max(0, Math.min(100, (mp / maxMp) * 100))}%`,
                    height: "100%",
                    bgcolor: "#74b9ff",
                    transition: "width 0.3s",
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  textAlign: "right",
                }}
              >
                {mp}/{maxMp}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Vertical Divider for Desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "4px",
            bgcolor: "#000",
            borderRadius: "2px",
            mx: 2,
          }}
        />

        {/* Right Side: Welcome Message & Bio */}
        <Box
          sx={{
            flex: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            color="primary"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            ✨ 欢迎来到我的二次元宇宙 🎮
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.8,
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#2d3436",
              textAlign: "left",
              bgcolor: "#f1f2f6",
              p: 2,
              border: "2px solid #000",
              borderRadius: "8px",
            }}
          >
            你好！我是这个博客的作者。我喜欢探索新技术，特别是前端领域的最新发展。
            在这里，阅读文章就是“做任务”，留言就是“在酒馆贴告示”。
            希望这个像素风格的博客能给你带来复古游戏的乐趣！🌸✨
            <br />
            (๑•̀ㅂ•́)و✧ 一起加油吧！
          </Typography>

          <Box
            sx={{
              minHeight: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#000",
              color: "#55efc4",
              border: "2px solid #000",
              borderRadius: "4px",
              p: 2,
              mb: 2,
            }}
          >
            <Typewriter
              text="> INIT SYSTEM... LOADING PIXEL DATA... READY!"
              variant="h6"
              speed={50}
              sx={{ fontWeight: "bold", fontFamily: "monospace" }}
            />
          </Box>
          <Typography
            variant="h6"
            color="secondary"
            sx={{
              fontWeight: "bold",
              animation: "blink 1.5s step-end infinite",
            }}
          >
            ▼ PUSH START BUTTON TO EXPLORE ▼
          </Typography>
        </Box>
      </Box>

      <Box id="daily-drop">
        <DailyDrop />
      </Box>
      <Box id="post-list">
        <PostList />
      </Box>
      <Box id="inventory">
        <Inventory />
      </Box>
      <Box id="achievements">
        <Achievements />
      </Box>
      <Box id="tavern">
        <Tavern />
      </Box>
    </Container>
  );
}
