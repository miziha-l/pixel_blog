"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import PixelClock from "@/components/ui/PixelClock";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import PlayerStatus from "@/components/ui/PlayerStatus";
import { usePixelSound } from "@/hooks/usePixelSound";

export default function Navbar() {
  const { playClick, playHover } = usePixelSound();
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <AppBar position="static" elevation={0} sx={{ py: 1 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <VideogameAssetIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontSize: "2.5rem",
                animation: "float 3s ease-in-out infinite",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
                textShadow: "2px 2px 0px #000",
              }}
            >
              PIXEL_BLOG
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <PlayerStatus />
              <Button
                component={Link}
                href="/"
                onMouseEnter={playHover}
                onClick={playClick}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  display: "block",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#ffe6f0",
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px #000",
                  },
                  "&:active": {
                    transform: "translate(2px, 2px)",
                    boxShadow: "2px 2px 0px #000",
                  },
                }}
              >
                🎮 START_GAME
              </Button>
              <Button
                component={Link}
                href="/gallery"
                onMouseEnter={playHover}
                onClick={playClick}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  display: "block",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#55efc4",
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px #000",
                  },
                  "&:active": {
                    transform: "translate(2px, 2px)",
                    boxShadow: "2px 2px 0px #000",
                  },
                }}
              >
                🖼️ GALLERY
              </Button>
              <Button
                component={Link}
                href="/ai"
                onMouseEnter={playHover}
                onClick={playClick}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  display: "block",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#48dbfb",
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px #000",
                  },
                  "&:active": {
                    transform: "translate(2px, 2px)",
                    boxShadow: "2px 2px 0px #000",
                  },
                }}
              >
                🤖 AI_WORLD
              </Button>
              <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                <PixelClock />
                <ThemeSwitcher />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
