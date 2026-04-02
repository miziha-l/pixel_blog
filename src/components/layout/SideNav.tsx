"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { usePixelSound } from "@/hooks/usePixelSound";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "daily-drop", label: "每日补给", icon: "🎁", color: "#ff7b9c" },
  { id: "post-list", label: "任务列表", icon: "📜", color: "#48dbfb" },
  { id: "inventory", label: "装备库", icon: "🎒", color: "#55efc4" },
  { id: "achievements", label: "成就系统", icon: "🏆", color: "#ffeaa7" },
  { id: "tavern", label: "冒险酒馆", icon: "💬", color: "#a29bfe" },
];

export default function SideNav() {
  const { playClick, playHover } = usePixelSound();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Only show SideNav on the home page
  if (pathname !== "/") return null;

  const handleScroll = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      onMouseEnter={() => {
        playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        position: "fixed",
        top: "50%",
        left: isHovered ? "0" : "-130px",
        transform: "translateY(-50%)",
        width: "160px",
        gap: 2,
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        bgcolor: "#fff",
        border: "4px solid #000",
        borderLeft: "none",
        borderRadius: "0 16px 16px 0",
        boxShadow: isHovered
          ? "8px 8px 0px rgba(0,0,0,1), 0 0 20px rgba(72, 219, 251, 0.5)"
          : "4px 4px 0px rgba(0,0,0,1)",
        p: 2,
        pl: 1,
      }}
    >
      {/* Handle / Indicator to show it can be pulled out */}
      <Box
        sx={{
          position: "absolute",
          right: "-24px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "24px",
          height: "60px",
          bgcolor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 8px 8px 0",
          color: "#fff",
          cursor: "pointer",
          opacity: isHovered ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <KeyboardDoubleArrowRightIcon
          sx={{
            fontSize: "1.2rem",
            animation: "blink 1.5s infinite",
            color: "#48dbfb",
            filter: "drop-shadow(0 0 2px #48dbfb)",
          }}
        />
      </Box>

      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          mb: 1,
          borderBottom: "2px dashed #000",
          pb: 1,
          color: "#000",
        }}
      >
        🗺️ 快速传送
      </Typography>

      {NAV_ITEMS.map((item, index) => (
        <Button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          onMouseEnter={playHover}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1.5,
            p: 1,
            bgcolor: "#fff",
            border: "2px solid #000",
            boxShadow: "2px 2px 0px #000",
            color: "#000",
            fontWeight: "bold",
            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            width: "100%",
            transform: isHovered ? "translateX(0)" : "translateX(-20px)",
            opacity: isHovered ? 1 : 0,
            transitionDelay: isHovered ? `${index * 50}ms` : "0ms",
            "&:hover": {
              bgcolor: item.color,
              color: "#fff",
              transform: "translate(-4px, -4px) scale(1.05)",
              boxShadow: `6px 6px 0px #000, 0 0 15px ${item.color}80`,
              zIndex: 2,
            },
            "&:active": {
              transform: "translate(2px, 2px) scale(0.95)",
              boxShadow: "0px 0px 0px #000",
            },
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", lineHeight: 1 }}>
            {item.icon}
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
            {item.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
}
