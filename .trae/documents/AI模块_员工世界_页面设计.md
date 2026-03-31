# AI 模块 / AI 员工世界 - 页面设计规格（Desktop-first）

## 全局规范（适用于所有页面）
### Layout
- 桌面端优先：1200px 内容容器居中，左右留白；主体采用 CSS Grid（12 列）+ 局部 Flex 组合。
- 断点：
  - ≥1200：三栏/两栏为主（左侧导航 + 主内容 + 右侧信息栏可选）
  - 768~1199：收敛为两栏（导航折叠为顶部/抽屉）
  - <768：单列堆叠，右侧栏下移为折叠模块

### Meta Information（示例）
- Title 模板：`AI 员工世界 - {页面名} | {产品名}`
- Description：`招募与培养 AI 员工，在世界任务中获取资源与推进进度。`
- Open Graph：
  - og:title 同 Title
  - og:description 同 Description
  - og:type = website

### Global Styles（Design Tokens）
- 背景：`--bg: #0B1020`（深色）/ `--surface: #111A33`
- 主色：`--primary: #5B8CFF`；强调：`--accent: #23C483`；危险：`--danger: #FF5B5B`
- 字体：系统字体优先；字号阶梯：12/14/16/20/24
- 圆角：卡片 12，按钮 10；阴影：轻微发光阴影用于强调卡片
- 按钮：Primary / Secondary / Ghost
  - Hover：提升亮度 + 轻微上移 1px
  - Disabled：降低透明度并禁止点击
- 链接：默认主色，下划线仅 hover 显示
- 载入态：Skeleton + 顶部细进度条（任务派遣/结算时）

---

## 页面 1：AI 员工世界概览页（/ai）
### Layout
- 页面采用「顶部栏 + 主内容双栏」：
  - 主栏（8/12）：世界进度、任务入口、员工摘要、最近结算
  - 侧栏（4/12）：资源面板、今日状态、快捷操作

### Page Structure
1. 顶部栏（Header）
2. 世界概览（World Overview）
3. 员工摘要列表（Employee Summary List）
4. 最近结算/事件（Recent Run Summary）
5. 右侧资源与状态（Wallet & Daily State）

### Sections & Components
- Header
  - 左：面包屑（现有首页/工作台 → AI）
  - 中：页面标题「AI 员工世界」+ 副标题（赛季/世界名）
  - 右：主按钮「去任务」+ 次按钮「管理员工」

- World Overview Card
  - 进度条：世界 progress（含刻度与下一解锁提示文案）
  - 今日状态：day、可用次数/能量（抽象字段），不足时提示原因

- Wallet Panel（侧栏置顶卡片）
  - 资源列表：2 列网格展示（图标 + 数值 + 近 24h 变化小字）
  - 小型提示：资源不足时引导去任务

- Employee Summary List
  - 工具条：筛选（空闲/派遣中/疲劳）+ 排序（等级/战力）
  - 列表项：头像、名称、等级、状态 Badge、推荐动作（“派遣”/“查看”）
  - 空状态：引导文案 + 「去招募/去任务」（如果现有项目已有招募入口则链接，否则仅展示提示）

- Recent Run Summary
  - 展示最近一次 run：任务名、结果标签（成功/失败/中断的抽象）、奖励摘要
  - CTA：打开「结算详情（抽屉/弹窗）」进入事件时间线

### Interaction States
- 页面加载：骨架屏（世界卡片、资源卡片、员工列表 3 行）
- 错误态：顶部 toast + 卡片内重试按钮

---

## 页面 2：员工管理与详情页（/ai/employees/:id）
### Layout
- 左右布局：左侧「员工档案」固定宽度卡片；右侧「培养/配置」标签页。

### Page Structure
1. 员工档案侧卡（Profile Side Card）
2. 右侧 Tab：培养升级 / 配置
3. 底部：影响预览（对常用任务的匹配度提示）

### Sections & Components
- Profile Side Card
  - 头像 + 名称 + 稀有度/职业
  - 状态区：空闲/派遣中；体力条；不可操作原因提示
  - 属性区：核心属性列表（如逻辑/社交等抽象项）+ 综合评分

- Tab：培养升级
  - 升级区：当前等级、经验、升级按钮
  - 消耗明细：资源列表 + 不足红色提示
  - 升级收益预览：属性增量（+x）

- Tab：配置（技能/装备位的抽象）
  - 槽位网格：Slot 1..N（空槽显示“+”）
  - 选择器：右侧抽屉/弹窗展示可用配置项（来源按项目现有资产决定）
  - 保存：保存成功 toast；失败提示原因

- 影响预览（右侧底部卡片）
  - 展示 2~3 个近期任务的“匹配度”与建议（例如“提升逻辑更适合 X”）

### Interaction States
- 派遣中：升级/配置按钮禁用；显示“任务结束后可修改”
- 保存中：按钮 Loading；防重复提交

---

## 页面 3：世界任务与结算页（/ai/world）
### Layout
- 三段式：
  1) 上：筛选与世界状态条
  2) 中：左「任务列表」右「编队面板」
  3) 下：执行/事件流与结算区（根据状态切换）

### Page Structure
1. 世界状态条（World Status Bar）
2. 任务列表（Mission List）
3. 编队与派遣（Squad & Dispatch）
4. 执行中面板（Running Panel）
5. 结算与日志（Settlement & Log）

### Sections & Components
- World Status Bar
  - 当前世界/赛季、进度、今日剩余派遣次数（抽象）
  - 小按钮：「返回概览」

- Mission List（左栏）
  - 筛选：难度、推荐属性、收益类型（抽象）
  - 列表项：任务名、难度、消耗、耗时、收益预览、推荐属性标签
  - 选择态：选中任务高亮，并同步到右侧编队面板

- Squad & Dispatch（右栏）
  - 已选任务摘要
  - 员工选择器：仅显示空闲员工；支持快速筛选与搜索
  - 校验提示：体力不足/门槛不满足的原因展示
  - 主按钮「开始派遣」：点击后进入 Running 状态

- Running Panel（状态=running）
  - 顶部：进度条（基于 duration_sec 或事件数量）
  - 事件流：时间线组件（按 t 排序），新事件高亮闪烁一次
  - 操作：仅允许“收起/展开详情”；避免引入复杂分支选择（如后续要做再扩展）

- Settlement & Log（状态=settled）
  - 结算摘要：成功/失败标签、关键指标（收益、世界进度增量、员工变化）
  - 奖励明细：资源变动表格（旧值/变化/新值）
  - 日志回看：事件时间线只读；支持复制摘要文本（可选）
  - CTA：返回概览/继续下一次派遣

### Interaction & Transition
- 从派遣到结算：使用同一页面状态切换（Running → Settled），保留任务与队伍上下文
- Loading：开始派遣时按钮进入 loading；事件流使用 skeleton 占位
- Realtime（可选）：若启用 Supabase Realtime，事件流可按新记录推送增量渲染
