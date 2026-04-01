"use client";

import React, { useState, useMemo } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CATEGORIES = ["All", "Main Quest", "Side Quest", "Daily", "Event"];
const CATEGORY_COLORS: Record<string, string> = {
  "Main Quest": "#ff7b9c",
  "Side Quest": "#48dbfb",
  Daily: "#ffeaa7",
  Event: "#a29bfe",
};

const ITEMS_PER_PAGE = 6;

export default function PostList() {
  const posts = useBlogStore((state) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1); // Reset page when category changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page when search query changes
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    const element = document.getElementById("post-list-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box sx={{ mt: 4 }} id="post-list-top">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        fontWeight="bold"
        sx={{
          borderBottom: "4px dashed #ff7b9c",
          display: "inline-block",
          pb: 1,
          mb: 4,
        }}
      >
        📜 QUEST LOG / 任务列表
      </Typography>

      {/* 搜索与过滤区域 */}
      <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索任务..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "#fff",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              borderRadius: 0,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: "6px 6px 0px #000",
              },
              "&.Mui-focused": {
                boxShadow: "6px 6px 0px #ff7b9c",
              },
            },
          }}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              sx={{
                bgcolor:
                  selectedCategory === cat
                    ? CATEGORY_COLORS[cat] || "#000"
                    : "#fff",
                color: selectedCategory === cat ? "#fff" : "#000",
                border: "2px solid #000",
                boxShadow:
                  selectedCategory === cat ? "none" : "2px 2px 0px #000",
                transform:
                  selectedCategory === cat ? "translate(2px, 2px)" : "none",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: CATEGORY_COLORS[cat] || "#000",
                  color: "#fff",
                  boxShadow: "none",
                  transform: "translate(2px, 2px)",
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={post.id}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "#fff",
                  border: "4px solid #000",
                  boxShadow: "6px 6px 0px #000",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translate(-4px, -4px)",
                    boxShadow: "10px 10px 0px #ff7b9c",
                  },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      color: "#ff7b9c",
                      fontWeight: "bold",
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Box
                    sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: "inline-block",
                        bgcolor: "#48dbfb",
                        px: 1,
                        py: 0.5,
                        border: "2px solid #000",
                        fontWeight: "bold",
                      }}
                    >
                      {post.date}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "inline-block",
                        bgcolor: CATEGORY_COLORS[post.category] || "#ffeaa7",
                        px: 1,
                        py: 0.5,
                        border: "2px solid #000",
                        fontWeight: "bold",
                      }}
                    >
                      {post.category}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {post.tags?.map((tag) => (
                      <Typography
                        key={tag}
                        variant="caption"
                        sx={{
                          display: "inline-block",
                          color: "#666",
                          borderBottom: "1px dashed #666",
                        }}
                      >
                        #{tag}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, flexGrow: 1 }}>
                    {post.excerpt}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, mt: "auto" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    component={Link}
                    href={`/post/${post.id}`}
                    fullWidth
                    sx={{
                      border: "2px solid #000",
                      boxShadow: "2px 2px 0px #000",
                      "&:hover": {
                        boxShadow: "4px 4px 0px #000",
                        transform: "translate(-2px, -2px)",
                      },
                    }}
                  >
                    READ MORE &gt;&gt;
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                border: "4px dashed #000",
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                没有找到相关的任务...
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                border: "2px solid #000",
                bgcolor: "#fff",
                color: "#000",
                fontWeight: "bold",
                boxShadow: "2px 2px 0px #000",
                "&:hover": {
                  bgcolor: "#ffeaa7",
                },
                "&.Mui-selected": {
                  bgcolor: "#ff7b9c",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#ff4757",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
