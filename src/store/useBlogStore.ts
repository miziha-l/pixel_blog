import { create } from 'zustand';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  likes?: number;
  category: string;
  tags: string[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
  avatarBg: string;
}

export interface GuestMessage {
  id: string;
  author: string;
  content: string;
  date: string;
  avatarBg: string;
}

interface BlogState {
  posts: BlogPost[];
  messages: GuestMessage[];
  comments: BlogComment[];
  addPost: (post: BlogPost) => void;
  removePost: (id: string) => void;
  addMessage: (message: Omit<GuestMessage, 'id' | 'date' | 'avatarBg'>) => void;
  addComment: (comment: Omit<BlogComment, 'id' | 'date' | 'avatarBg'>) => void;
  likePost: (id: string) => void;
}

const getRandomColor = () => {
  const colors = ['#ff7b9c', '#48dbfb', '#ffeaa7', '#55efc4', '#a29bfe', '#fd79a8'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const useBlogStore = create<BlogState>((set) => ({
  posts: [
    {
      id: '1',
      title: '【主线任务】我的第一篇博客',
      excerpt: '这是使用 Next.js + MUI + Zustand 构建的个人博客项目。记录了魔法使的诞生！',
      content: '欢迎来到我的博客！这里记录了我的技术学习和生活点滴。这个项目使用了 Next.js App Router，结合了 Material UI 的精美组件，并使用 Zustand 进行状态管理。这里展示了如何在 Next.js 16 中完美集成 MUI。希望你能在这里找到有用的“攻略”！(๑•̀ㅂ•́)و✧',
      date: '2023-10-01',
      likes: 42,
      category: 'Main Quest',
      tags: ['Next.js', 'React', 'MUI'],
    },
    {
      id: '2',
      title: '【支线任务】为什么选择 Zustand？',
      excerpt: '在众多 React 状态管理库中，Zustand 以其简洁和易用脱颖而出。',
      content: 'Zustand 是一个轻量级的状态管理库，不需要像 Redux 那样编写大量的样板代码（Boilerplate）。它的 API 设计非常直观，而且天然支持 React Hooks。它使得组件间共享状态变得前所未有的简单。简直就是魔法使必备的“轻量级法杖”！',
      date: '2023-10-05',
      likes: 18,
      category: 'Side Quest',
      tags: ['Zustand', 'React', 'State'],
    },
    {
      id: '3',
      title: '【装备打造】如何绘制完美的像素风 UI',
      excerpt: '探讨如何使用 CSS 阴影、粗边框以及特殊字体打造复古游戏风格的网页。',
      content: '要打造一个完美的像素风 UI，关键在于“舍弃平滑”。我们需要使用粗犷的实体边框（border: 4px solid #000），使用没有任何模糊效果的硬阴影（box-shadow: 8px 8px 0px #color），以及最重要的——一款好看的像素字体（比如 DotGothic16）。再加上一点点 CSS 动画，网页瞬间变成 8-bit 游戏机！',
      date: '2023-10-12',
      likes: 99,
      category: 'Event',
      tags: ['CSS', 'Pixel Art', 'UI'],
    },
    {
      id: '4',
      title: '【日常掉落】今天的咖啡与 Bug',
      excerpt: '修不完的 Bug，喝不完的咖啡。记录今天遇到的一个离奇 Next.js 报错。',
      content: '今天在集成 MUI AppRouterCacheProvider 的时候，遇到了一个诡异的 Hydration Mismatch。原来是因为某些组件在服务端和客户端渲染的 HTML 结构不一致导致的。经过一番“魔法咏唱”（查阅官方文档），终于找到了完美的解决方案。技术之路漫漫，咖啡不能停！☕️',
      date: '2023-10-20',
      likes: 5,
      category: 'Daily',
      tags: ['Life', 'Bug', 'Next.js'],
    },
    {
      id: '5',
      title: '【新地图解锁】React 19 的前瞻探索',
      excerpt: 'React 19 带来了哪些激动人心的新特性？让我们一起提前“探图”。',
      content: 'React 19 引入了期待已久的 React Compiler，这意味着我们可能再也不需要手动写 useMemo 和 useCallback 了！这简直是“自动施法”的终极体现。此外，新的 Actions API 也将大幅简化表单处理和数据突变的逻辑。未来可期！✨',
      date: '2023-11-01',
      likes: 66,
      category: 'Main Quest',
      tags: ['React', 'Frontend'],
    },
    {
      id: '6',
      title: '【转职任务】从前端到全栈的奇妙旅程',
      excerpt: '想要成为全栈魔法使？先来学习一下 Node.js 和数据库的基础咒语吧！',
      content: '前端的世界五彩斑斓，但后端的宇宙同样深邃。学习 Node.js、Express 和 MongoDB 就像是打开了新世界的大门。全栈并不是要样样精通，而是要建立起对整个 Web 生态的全局观。从今天起，不仅要画好 UI，还要学会如何稳妥地存储数据！',
      date: '2023-11-15',
      likes: 34,
      category: 'Main Quest',
      tags: ['Node.js', 'Backend', 'Career'],
    },
    {
      id: '7',
      title: '【特殊事件】像素画初体验：手绘一只史莱姆',
      excerpt: '放下代码，拿起画笔。Aseprite 像素画绘制指南。',
      content: '写代码累了的时候，画画像素画是最好的放松方式。今天尝试用 Aseprite 画了一只蓝色的史莱姆，虽然只有 16x16 像素，但通过调整高光和阴影，它竟然变得非常立体可爱。或许以后可以给博客加更多自己画的像素素材！',
      date: '2023-12-05',
      likes: 120,
      category: 'Event',
      tags: ['Pixel Art', 'Art', 'Life'],
    },
    {
      id: '8',
      title: '【年终结算】2023 冒险回顾与来年展望',
      excerpt: '盘点这一年打败的 Bug 怪物，收集的经验值，以及即将开启的新篇章。',
      content: '转眼间 2023 年就要结束了。这一年里，我通关了 React，点亮了 Next.js 的技能树，还给自己搭建了这个充满回忆的像素风博客。明年，我希望能够挑战更难的副本：比如 WebGL 或者 WebAssembly！冒险者的旅途永远没有终点！',
      date: '2023-12-31',
      likes: 88,
      category: 'Daily',
      tags: ['Life', 'Summary'],
    },
    {
      id: '9',
      title: '【装备强化】Tailwind CSS 到底好在哪？',
      excerpt: '从抵触到真香，Tailwind CSS 是如何改变我的开发习惯的。',
      content: '一开始我觉得 Tailwind 满屏幕的 class 太丑了，简直是“代码污染”。但当你习惯了它的原子化设计，就会发现开发效率的提升是惊人的。再也不用绞尽脑汁去想 class name，也不用在组件和 CSS 文件之间来回跳转。这就像是从手动施法升级到了瞬发法术！',
      date: '2024-01-15',
      likes: 45,
      category: 'Side Quest',
      tags: ['Tailwind', 'CSS', 'Frontend'],
    },
    {
      id: '10',
      title: '【新技能解锁】探索 TypeScript 的高级类型',
      excerpt: '泛型、条件类型、映射类型...让你的代码像魔法一样严谨！',
      content: 'TypeScript 不仅仅是加了类型的 JavaScript。当你深入了解它的类型系统后，会发现它其实是一门可以在编译期运行的“编程语言”。利用条件类型和映射类型，我们可以写出极其灵活且类型安全的组件。这是通往高级魔法使的必经之路！',
      date: '2024-02-02',
      likes: 112,
      category: 'Main Quest',
      tags: ['TypeScript', 'Advanced', 'Programming'],
    },
    {
      id: '11',
      title: '【节日事件】龙年限定：用 Canvas 画一条中国龙',
      excerpt: '新年快乐！使用 HTML5 Canvas 绘制动画的初尝试。',
      content: '为了庆祝龙年，我决定用 Canvas 画一条会动的龙。虽然数学计算（比如贝塞尔曲线和三角函数）让我头疼了很久，但看到最终龙在屏幕上盘旋的画面，一切都值了。Canvas 就像是一张无限可能的魔法卷轴！',
      date: '2024-02-10',
      likes: 230,
      category: 'Event',
      tags: ['Canvas', 'Animation', 'JavaScript'],
    },
    {
      id: '12',
      title: '【日常掉落】为什么我的 useEffect 执行了两次？',
      excerpt: 'React 18 严格模式下的经典坑，你踩过吗？',
      content: '今天在开发一个倒计时组件时，发现计时器走得飞快。排查了半天，才发现是因为 React 18 的 Strict Mode 会在开发环境下故意模拟组件的卸载和重新挂载，导致我的 setInterval 被注册了两次。记住：一定要在 cleanup 函数里清除副作用！',
      date: '2024-03-05',
      likes: 76,
      category: 'Daily',
      tags: ['React', 'Bug', 'Hooks'],
    },
    {
      id: '13',
      title: '【副本攻略】如何配置一个完美的 ESLint + Prettier',
      excerpt: '结束代码风格之争，让团队协作更加顺畅。',
      content: '代码规范就像是冒险者公会的规章制度，没有规矩不成方圆。但是手动检查太麻烦了。通过配置 ESLint 和 Prettier，并结合 Husky 在 commit 前进行自动格式化，我们可以彻底解放双手。这篇攻略记录了我目前使用的最佳实践配置。',
      date: '2024-03-20',
      likes: 54,
      category: 'Side Quest',
      tags: ['Tooling', 'ESLint', 'Prettier'],
    },
    {
      id: '14',
      title: '【系统升级】博客架构大重构：引入 Turbopack',
      excerpt: '天下武功，唯快不破。体验 Next.js 带来的极速构建。',
      content: '随着博客文章越来越多，Webpack 的构建速度开始让人难以忍受。正好 Next.js 推出了 Turbopack，我果断进行了升级。结果是惊人的：冷启动速度提升了数倍，HMR（热更新）几乎是瞬间完成的。这绝对是史诗级的装备强化！',
      date: '2024-04-01',
      likes: 189,
      category: 'Main Quest',
      tags: ['Next.js', 'Turbopack', 'Performance'],
    },
    {
      id: '15',
      title: '【魔法研究】Web Components：跨框架的通用法术',
      excerpt: '不依赖任何框架，用原生浏览器 API 构建可复用的 UI 组件。',
      content: '前端框架百花齐放，React、Vue、Svelte...但如果我们想写一套能在所有框架中通用的组件怎么办？Web Components 给出了答案。通过 Custom Elements 和 Shadow DOM，我们可以封装出完全独立、不受外部样式污染的“魔法模块”。虽然 API 稍显繁琐，但它的跨平台能力绝对值得研究！',
      date: '2024-04-18',
      likes: 67,
      category: 'Main Quest',
      tags: ['Web Components', 'Frontend', 'Vanilla JS'],
    },
    {
      id: '16',
      title: '【性能优化】图片懒加载与 WebP 格式',
      excerpt: '别让庞大的图片拖慢了你的页面加载速度！',
      content: '在这个读图时代，图片往往是页面中最耗时的资源。通过给 <img> 标签添加 loading="lazy" 属性，我们可以轻松实现原生懒加载。再配合现代的 WebP 或 AVIF 格式，图片的体积能缩小 30% 以上，而画质肉眼几乎看不出区别。这是前端工程师必须掌握的“轻量化”咒语。',
      date: '2024-05-02',
      likes: 89,
      category: 'Side Quest',
      tags: ['Performance', 'Image', 'HTML'],
    },
    {
      id: '17',
      title: '【防御阵型】前端安全：防范 XSS 与 CSRF 攻击',
      excerpt: '未知用户的输入都是危险的！给你的网页套上坚固的魔法护盾。',
      content: '安全无小事。跨站脚本攻击（XSS）和跨站请求伪造（CSRF）是 Web 应用最常见的敌人。永远不要信任用户的输入，所有的 HTML 渲染都要经过严格的转义（Escape）。同时，合理配置 Cookie 的 SameSite 属性，并在关键请求中加入 CSRF Token，才能抵御那些躲在暗处的恶意魔法。',
      date: '2024-05-20',
      likes: 142,
      category: 'Main Quest',
      tags: ['Security', 'XSS', 'CSRF'],
    },
    {
      id: '18',
      title: '【日常掉落】关于 Git Rebase 的一次惨痛教训',
      excerpt: '不要在公共分支上使用 rebase！不要在公共分支上使用 rebase！不要在公共分支上使用 rebase！',
      content: '今天为了让提交历史看起来更干净，我在开发分支上疯狂使用 `git rebase`。结果不小心推送到远程的公共分支后，导致同事的提交历史全部错乱，引发了一场“合并灾难”。血的教训：Rebase 只适合清理自己本地的私有分支，一旦代码 push 到了公共仓库，老老实实地用 `git merge` 吧。',
      date: '2024-06-05',
      likes: 210,
      category: 'Daily',
      tags: ['Git', 'Version Control', 'Fail'],
    },
    {
      id: '19',
      title: '【新技能解锁】PWA：让网页变成桌面应用',
      excerpt: '渐进式 Web 应用，离线可用，还能添加到桌面，这不就是魔法吗？',
      content: '通过 Service Worker 拦截网络请求并进行缓存，再加上一个简单的 manifest.json 文件，我们的网页就能摇身一变，成为一个可以安装在手机或电脑桌面上的“原生应用”。即使用户断网，也能访问缓存的页面。PWA 技术极大地模糊了 Web 和 Native App 的边界。',
      date: '2024-06-22',
      likes: 175,
      category: 'Main Quest',
      tags: ['PWA', 'Service Worker', 'Web'],
    },
    {
      id: '20',
      title: '【探索未知】Three.js 初体验：在网页中渲染 3D 魔法阵',
      excerpt: '从 2D 到 3D 的跨越，开启前端视觉表现的新纪元。',
      content: '平面的像素风看久了，突然想搞点立体的花样。Three.js 封装了复杂的 WebGL 底层 API，让我们可以用相对简单的代码在网页中创建场景、摄像机、光源和 3D 网格。今天我成功渲染出了一个不断旋转并发光的“魔法阵”模型，感觉自己像个真正的魔法师了！',
      date: '2024-07-10',
      likes: 315,
      category: 'Side Quest',
      tags: ['Three.js', 'WebGL', '3D'],
    },
    {
      id: '21',
      title: '【跨界魔法】2025年 AI 编程助手的全面进化',
      excerpt: '从 Copilot 到 Cursor，再到各种 AI Agent，我们的施法方式正在被重构。',
      content: '2025年，AI 辅助编程已经不再是“玩具”，而是成了每个魔法使必备的“魔杖”。现在的 AI 不仅能帮你补全代码，甚至能理解整个项目的上下文，帮你重构复杂的业务逻辑。我们需要学习的不再是单纯的语法，而是如何更精准地向 AI 描述需求，也就是所谓的“咒语咏唱（Prompt Engineering）”。',
      date: '2025-01-15',
      likes: 420,
      category: 'Main Quest',
      tags: ['AI', 'Cursor', 'Productivity'],
    },
    {
      id: '22',
      title: '【核心升级】React 19 Server Components 深度实践',
      excerpt: '在生产环境中全面拥抱 RSC，性能真的有质的飞跃吗？',
      content: '进入 2025 年，React Server Components (RSC) 的生态终于完全成熟。在这篇文章里，我记录了将一个大型老旧项目重构成 RSC 架构的全过程。把繁重的数据获取和依赖包留在服务器端，客户端只接收轻量级的 UI 描述。首屏加载时间（FCP）直接缩短了一半！这就是降维打击！',
      date: '2025-02-28',
      likes: 512,
      category: 'Main Quest',
      tags: ['React 19', 'RSC', 'Performance'],
    },
    {
      id: '23',
      title: '【装备强化】Rust 正在吞噬前端工具链',
      excerpt: '从 Vite 到 Turbopack，再到 Rspack 和 Rolldown，Rust 为什么这么火？',
      content: '天下武功，唯快不破。2025年的前端工具链几乎已经被 Rust 彻底统治了。基于 Node.js/V8 的工具已经很难在构建速度上取得突破，而 Rust 的内存安全和极高的并发执行效率，让前端构建速度进入了“毫秒级”时代。即使你不写 Rust 业务代码，了解它的基本概念也已经成为了高阶前端的必修课。',
      date: '2025-04-10',
      likes: 388,
      category: 'Side Quest',
      tags: ['Rust', 'Tooling', 'Build'],
    },
    {
      id: '24',
      title: '【空间跳跃】WebXR 与苹果 Vision Pro 的碰撞',
      excerpt: '空间计算时代真的来了吗？前端开发者能做些什么？',
      content: '随着硬件的普及，2025年被称为“空间计算”的元年。我花了一个月的时间研究 WebXR API，并尝试在浏览器中构建了一个可以直接在 Vision Pro 中体验的 3D 虚拟画廊。不需要下载 App，点开网页就能进入虚拟现实。虽然性能优化是个巨大的挑战，但这绝对是未来的方向！',
      date: '2025-06-05',
      likes: 650,
      category: 'Event',
      tags: ['WebXR', 'VR/AR', 'Spatial Computing'],
    },
    {
      id: '25',
      title: '【日常掉落】2025 年还在手写 CSS 吗？',
      excerpt: '聊聊目前 CSS 生态的最佳实践，Tailwind、CSS-in-JS 还是 CSS Modules？',
      content: '经过了几年的神仙打架，2025年的 CSS 方案似乎终于有了一些共识。对于组件库和高度定制化的项目，基于零运行时的 CSS-in-JS（如 Vanilla Extract）成为了主流；而对于快速迭代的业务开发，Tailwind CSS 依然稳坐王座。当然，原生的 CSS 嵌套（Nesting）和容器查询（Container Queries）也已经完全普及，手写原生 CSS 也不再是件痛苦的事了。',
      date: '2025-08-20',
      likes: 275,
      category: 'Daily',
      tags: ['CSS', 'Styling', 'Frontend'],
    },
    {
      id: '26',
      title: '【终极奥义】WebAssembly 赋能前端视频编辑',
      excerpt: '在浏览器里剪辑 4K 视频？以前不敢想，现在可以了。',
      content: '我使用 C++ 编写了底层的视频解码和渲染逻辑，然后通过 Emscripten 编译成 WebAssembly（Wasm）模块，最后在前端使用 Web Worker 多线程调用。事实证明，Wasm 的性能极其恐怖，它让浏览器突破了原本的计算瓶颈，真正具备了开发桌面级重度应用的可能。前端的边界，又一次被拓宽了。',
      date: '2025-11-11',
      likes: 890,
      category: 'Main Quest',
      tags: ['WebAssembly', 'C++', 'Video Processing'],
    },
    {
      id: '27',
      title: '【思维黑客】AGI 时代的编程哲学：从写代码到写 Prompt',
      excerpt: '不要再说“Prompt Engineer”不是真正的工程师了，这是 2026 年最核心的技能。',
      content: '到了 2026 年，我们面临的现实是：基础的代码实现已经完全被 AI 代理（Agents）接管。作为前端开发者，我们的日常工作从“敲击键盘”变成了“指挥 AI”。这需要一种全新的思维模式——你需要拥有架构师的视野，能够将复杂的业务拆解成 AI 能够完美理解的子任务。与其抵触，不如拥抱这场范式转移。',
      date: '2026-01-10',
      likes: 540,
      category: 'Main Quest',
      tags: ['AI', 'Prompt Engineering', 'Future'],
    },
    {
      id: '28',
      title: '【终极装备】脑机接口（BCI）与前端开发的交集',
      excerpt: '抛弃鼠标和键盘？探索 Neuralink 如何改变我们与 Web 的交互。',
      content: '虽然完全商业化的脑机接口还在路上，但 2026 年针对 BCI 的 Web 交互标准草案已经引起了轩然大波。我尝试阅读了 Web BCI API 的早期文档，思考如何通过“意念”来触发 DOM 事件。这意味着我们要重新定义何为“无障碍访问（Accessibility）”，未来的网页不仅要能被“看”到，还要能被“想”到。',
      date: '2026-02-22',
      likes: 888,
      category: 'Event',
      tags: ['BCI', 'Neuralink', 'Accessibility'],
    },
    {
      id: '29',
      title: '【异世界召唤】在浏览器端跑本地大模型（LLM）',
      excerpt: '不依赖云端，保护隐私，利用 WebGPU 让大模型在你的浏览器里流畅运行。',
      content: 'WebGPU 在 2026 年已经非常成熟了。今天我尝试使用 WebLLM 技术，将一个 3B 参数的开源语言模型完全加载到了浏览器端运行。这意味着你可以拥有一个完全离线的、保护隐私的 AI 助手。这不仅仅是技术的突破，更是对“去中心化”精神的致敬。你的算力，终于完全属于你自己。',
      date: '2026-03-15',
      likes: 730,
      category: 'Side Quest',
      tags: ['WebGPU', 'LLM', 'AI'],
    },
    {
      id: '30',
      title: '【日常掉落】被 AI 写出的“幻觉 Bug”折磨的一天',
      excerpt: 'AI 确实能写代码，但它写的 Bug 往往比人类写的更难找。',
      content: '今天过度依赖 AI 自动生成了一个复杂的状态机逻辑。刚开始运行完美，但遇到了边缘条件时直接崩溃。排查了一下午才发现，AI 捏造（Hallucinate）了一个根本不存在的第三方库 API 方法，而我居然因为没仔细看就合进去了。警钟长鸣：AI 是副驾驶，你才是掌握方向盘的那个人！',
      date: '2026-04-02',
      likes: 425,
      category: 'Daily',
      tags: ['AI', 'Bug', 'Life'],
    }
  ],
  messages: [
    {
      id: 'm1',
      author: '路过的勇者',
      content: '这个博客的像素风太棒了！感觉回到了小霸王时代！🎮',
      date: '2023-11-02 10:30',
      avatarBg: '#48dbfb'
    },
    {
      id: 'm2',
      author: '神秘商人',
      content: '需要买点恢复药水吗？看你写代码挺辛苦的。🧪',
      date: '2023-11-03 14:15',
      avatarBg: '#ff7b9c'
    },
    {
      id: 'm3',
      author: '野生前端',
      content: '右下角那个小宠物能抱走吗？太可爱了！(≧∇≦)ﾉ',
      date: '2023-11-05 09:20',
      avatarBg: '#ffeaa7'
    }
  ],
  comments: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (id) => set((state) => ({ posts: state.posts.filter(p => p.id !== id) })),
  addMessage: (msg) => set((state) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    const newMessage: GuestMessage = {
      ...msg,
      id: `m_${Date.now()}`,
      date: dateStr,
      avatarBg: getRandomColor()
    };
    
    return { messages: [newMessage, ...state.messages] };
  }),
  addComment: (comment) => set((state) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    const newComment: BlogComment = {
      ...comment,
      id: `c_${Date.now()}`,
      date: dateStr,
      avatarBg: getRandomColor()
    };
    
    return { comments: [...state.comments, newComment] };
  }),
  likePost: (id) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
    )
  })),
}));