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