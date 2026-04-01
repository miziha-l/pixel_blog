import React from "react";
import Container from "@mui/material/Container";
import PostList from "@/components/blog/PostList";
import Inventory from "@/components/home/Inventory";
import Achievements from "@/components/home/Achievements";
import DailyDrop from "@/components/home/DailyDrop";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Typewriter from "@/components/ui/Typewriter";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 6,
          px: 4,
          textAlign: "center",
          backgroundColor: "#fff",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #48dbfb",
          mb: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
          color="primary"
          sx={{ mb: 4 }}
        >
          ✨ 欢迎来到我的二次元宇宙 🎮
        </Typography>
        <Box
          sx={{
            minHeight: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typewriter
            text="> INIT SYSTEM... LOADING PIXEL DATA... READY!"
            variant="h6"
            color="text.secondary"
            speed={50}
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Typography
          variant="h6"
          color="secondary"
          sx={{
            mt: 4,
            fontWeight: "bold",
            animation: "blink 1.5s step-end infinite",
          }}
        >
          ▼ PUSH START BUTTON TO EXPLORE ▼
        </Typography>
      </Box>
      <DailyDrop />
      <PostList />
      <Inventory />
      <Achievements />
    </Container>
  );
}
