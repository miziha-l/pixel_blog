<div align="center">
  <h1>✨ 我的二次元像素宇宙 🎮</h1>
  <p><i>「代码是魔法，键盘是法杖，而这里，是我的异世界冒险记录。」</i></p>

  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-4A3C31?style=for-the-badge&logo=bear&logoColor=white)
</div>

---

## 📜 序章：这是什么地方？

欢迎来到我的个人博客！但这不仅仅是一个无聊的文本堆砌地，这是一个**完全游戏化、充满复古 8-bit 像素风和二次元浓度**的网页异世界！(๑•̀ㅂ•́)و✧

在这里，阅读文章被称为**「做任务」**，留言叫做**「在酒馆贴告示」**，甚至连你四处闲逛都能获得**「经验值 (EXP)」**！

### 🌟 核心特色玩法

- **🎒 装备与状态面板 (Player Status)**
  - 像真正的 RPG 游戏一样，你可以通过阅读文章、点赞、留言来获取 EXP！
  - 积累足够的 EXP 就能**升级**，等级越高，说明你在这个世界的探索越深。

- **🖼️ 盲盒画廊 (Pixel Gallery)**
  - 收集控狂喜！花费你辛苦赚来的 EXP，在这里**召唤（抽取）**各种像素怪物图鉴。
  - 从初级史莱姆到深海巨兽，看你能不能全图鉴毕业！

- **🐛 抓 Bug 小游戏 (Wild Bug Encounter)**
  - 逛博客时请保持警惕！屏幕上随时可能窜出野生的 Bug（物理意义上的）。
  - 赶在它们逃跑前疯狂点击，消灭它们可以获得大量 EXP 奖励！

- **👾 桌面宠物 (Pixel Pet)**
  - 屏幕右下角有一只一直在陪伴你的小家伙。
  - 你可以拖拽它（它会头晕😵‍💫），点击它（它会说话），甚至**右键点击它来投喂食物**（它会冒爱心❤）！

- **🏆 隐藏成就系统 (Achievements)**
  - 记录你的冒险里程碑。
  - *嘘...听说在这个网页里输入某个古老的 30 命秘籍（⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA），会发生不可思议的事情...*

- **🎵 BGM 与弹幕系统 (Bgm & Danmaku)**
  - 带有复古 8-bit 音效和沉浸式的背景音乐，还有全屏飘过的二次元弹幕，氛围感拉满。

---

## 🛠️ 锻造配方 (Tech Stack)

这个世界的底层逻辑是由以下“魔法卷轴”构建的：

* **世界引擎**: [Next.js 16](https://nextjs.org/) (App Router) + React 19
* **视觉材质**: [Material UI (MUI)](https://mui.com/) 配合极其粗犷的 `4px solid #000` 像素风边框
* **记忆核心**: [Zustand](https://github.com/pmndrs/zustand) (状态管理 + 本地持久化)
* **字体符文**: `DotGothic16` (谷歌字体，注入灵魂的像素字)
* **声音魔法**: 自定义 Web Audio API 合成器 (8-bit 纯手工音效，不依赖外部音频文件)

---

## 🚀 开启传送门 (Getting Started)

想要在本地运行这个异世界？很简单，只需要执行以下咒语：

```bash
# 1. 克隆魔法书
git clone <repository-url>

# 2. 安装所需的魔法素材
npm install
# 或者 yarn install / pnpm install

# 3. 启动传送门
npm run dev
```

然后，打开你的浏览器（推荐使用 Chrome 获得最佳体验），访问 [http://localhost:3000](http://localhost:3000)，冒险就开始了！

---

## 📝 任务日志 (Project Structure)

```text
src/
├── app/          # Next.js 路由与页面入口 (主城、画廊、留言板等)
├── components/   # UI 组件库 (武器库)
│   ├── blog/     # 博客文章与留言相关
│   ├── home/     # 首页特有组件 (成就、每日掉落、装备库)
│   ├── layout/   # 全局布局 (导航栏、页脚)
│   └── ui/       # 交互组件 (像素宠物、音乐播放器、抓Bug游戏等)
├── hooks/        # 自定义 Hook (技能书，如 usePixelSound 音效)
├── store/        # Zustand 状态管理 (经验值、画廊图鉴、文章数据)
└── theme/        # MUI 主题配置 (定义了像素风的灵魂颜色)
```

---

<div align="center">
  <p><i>“代码写累了？不如来这里听听 8-bit 音乐，戳一戳右下角的史莱姆吧！”</i></p>
  <p>Made with 💖 and lots of ☕</p>
</div>