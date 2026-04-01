import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PixelPet from '@/components/ui/PixelPet';
import BgmPlayer from '@/components/ui/BgmPlayer';
import PixelDanmaku from '@/components/ui/PixelDanmaku';
import WildBug from '@/components/ui/WildBug';
import KonamiCode from '@/components/ui/KonamiCode';
import "./globals.css";

export const metadata: Metadata = {
  title: "我的二次元像素博客",
  description: "基于 Next.js + MUI + Zustand 构建",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <Navbar />
            <main style={{ flex: 1, padding: '32px 0' }}>
              {children}
            </main>
            <Footer />
            <PixelPet />
            <BgmPlayer />
            <PixelDanmaku />
            <WildBug />
            <KonamiCode />
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}