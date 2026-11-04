# 小事存档 · Moment Archive

一个由 Markdown 驱动的通用时间线档案站点。适合生活记录、项目里程碑、旅行故事或任何「主线 + 支线」内容。

在线访问（启用 GitHub Pages 后）：https://fapig1.github.io/MdWriting/

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 新增一条记录

在 `src/content/events/` 新建 `.md` 文件。主线事件示例：

```markdown
---
title: "一个值得记住的日子"
date: 2026-11-04
type: "main"
tags: ["日常"]
summary: "显示在时间轴卡片上的简短摘要。"
location: "任意地点"
accent: "coral"
---

这里写正文，支持标准 Markdown。
```

## 页面结构

- `/`：主页，主线时间轴
- `/trivia/`：支线页，支线卡片列表
- `/events/.../`：主线 / 支线详情页

支线趣事将 `type` 改为 `trivia`，`date` 可以省略。`accent` 支持 `coral`、`blue`、`gold`、`green`。

- `main`：自动按日期升序进入横向时间轴，并生成独立详情页。
- `trivia`：进入支线页的卡片列表，点击卡片打开独立详情页，可放很长的聊天记录截图。
- 所有页面在构建时生成，无需数据库，可部署到 GitHub Pages 等静态托管服务。

## 插入聊天记录截图

把截图放到 `src/assets/screenshots/`，然后在任意事件的 Markdown 正文中使用相对路径引用：

```markdown
![聊天记录](../../assets/screenshots/example.png)
```

图片会自动优化并在详情页中居中显示。长图、多张连续截图都可以。

## GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`。推送到 `main` 后，在仓库 Settings → Pages 中选择 GitHub Actions 作为来源即可。若使用 `用户名.github.io/仓库名` 形式的项目站点，请在 `astro.config.mjs` 中补充对应的 `site` 与 `base` 配置。
