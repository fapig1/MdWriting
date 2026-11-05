# 小事存档 · Moment Archive

一个由 Markdown 驱动的双页面时间线网站。主页记录按日期发生的主线故事，支线页收集不按时间顺序排列的趣事与碎片。

- 线上站点：https://fapig1.github.io/MdWriting/
- 支线页面：https://fapig1.github.io/MdWriting/trivia/
- 技术栈：Astro 5、Tailwind CSS 4、Astro Content Collections
- 部署方式：GitHub Actions → GitHub Pages

## 页面结构

| 路径 | 内容 |
| --- | --- |
| `/` | 主页，仅展示横向主线时间轴 |
| `/trivia/` | 独立的支线列表页 |
| `/events/<文件名>/` | 主线与支线的详情页 |

站点没有数据库或后台。所有页面在构建时由 Markdown 自动生成。

## 本地运行

要求 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

本地地址是：

```text
http://127.0.0.1:4321/MdWriting/
```

> 项目部署在仓库子路径下，因此本地也需要访问 `/MdWriting/`，不能直接打开根路径。

生产构建与预览：

```bash
npm run build
npm run preview
```

## 新增记录

在 `src/content/events/` 中新建 `.md` 文件。文件名建议使用 `日期-简短英文名.md`，例如 `2026-11-05-first-snow.md`。

### 主线故事

主线会按 `date` 升序进入时间轴，并自动生成详情页。

```markdown
---
title: "一个值得记住的日子"
date: 2026-11-05
type: "main"
tags: ["日常", "冬天"]
summary: "显示在时间轴卡片上的简短摘要。"
location: "任意地点"
accent: "coral"
---

这里写正文，支持标准 Markdown。
```

### 支线趣事

支线进入 `/trivia/` 页面，不要求日期；点击卡片进入独立的详情页。

```markdown
---
title: "一件没什么用但舍不得忘的小事"
type: "trivia"
tags: ["碎片"]
summary: "显示在支线卡片上的摘要。"
accent: "gold"
---

支线正文同样支持标准 Markdown，也可以插入长截图。
```

### Frontmatter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 故事标题 |
| `type` | 是 | `main` 为主线，`trivia` 为支线 |
| `summary` | 是 | 卡片摘要与页面描述 |
| `date` | 主线必填 | 主线排序依据，建议格式 `YYYY-MM-DD` |
| `tags` | 否 | 标签数组，卡片与详情页显示全部标签 |
| `location` | 否 | 地点，显示在卡片和详情页 |
| `accent` | 否 | `coral`、`blue`、`gold`、`green`，默认 `blue` |

修改或保存 Markdown 后，开发服务器会自动刷新；提交并推送后，GitHub Pages 会自动更新。

## 首页公告

公告只在首页以弹窗形式出现。在 `src/content/announcements/` 中新建 `.md` 文件即可：

```markdown
---
title: "更新了新的主线"
date: 2026-11-20
pinned: false
---

新增主线《绕了很远的路去看花》。
```

- `pinned: true` 的公告固定排在最前，带「置顶」标记。
- 普通公告按 `date` 倒序，只显示最近 3 条（在 `src/components/Announcement.astro` 的 `MAX_UPDATES` 调整）。
- 访客勾选「今日内不再显示」后，当天不再弹出；第二天或新增、删除公告文件后会重新弹出。
- 不勾选直接关闭时，本次浏览期间站内切回首页不会重复弹出。
- 删除目录下所有公告文件，弹窗就不再出现。

## 插入聊天记录截图

把截图放进 `src/assets/screenshots/`，然后从事件 Markdown 引用相对路径：

```markdown
![聊天记录](../../assets/screenshots/example.png)
```

详情页会自动处理图片宽度、边框和居中。长图、多张连续截图均可。

## 更新与发布

```bash
git add .
git commit -m "添加新事件"
git push origin main
```

推送后可在 Actions 页面查看自动部署状态：

https://github.com/fapig1/MdWriting/actions

### GitHub Pages 配置

仓库已配置 `.github/workflows/deploy.yml`。Pages 的 **Source 必须设置为 GitHub Actions**，而不是 `Deploy from a branch`：

https://github.com/fapig1/MdWriting/settings/pages

`astro.config.mjs` 中的 `site` 与 `base` 对应项目站点地址：

```js
site: 'https://fapig1.github.io',
base: '/MdWriting',
```

如果以后更改仓库名称，需要同步修改这两个值，以及页面中的站内链接。

## 目录说明

```text
src/
├── assets/screenshots/     # 支线聊天截图等图片
├── components/
│   ├── Announcement.astro  # 首页公告弹窗
│   ├── Timeline.astro      # 横向交错主线时间轴
│   └── TriviaGrid.astro    # 支线卡片列表
├── content/announcements/  # 首页公告 Markdown
├── content/events/         # 所有主线与支线 Markdown
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro         # 主页，仅时间轴
│   ├── trivia.astro        # 支线列表页
│   └── events/[slug].astro # 主线与支线详情页
├── styles/global.css
└── content.config.ts       # 内容字段校验
```
