# commit log — a tech blog you run by pushing to GitHub

A static blog built with [Eleventy](https://www.11ty.dev/). No server, no database.
You add a Markdown file, push it, and a GitHub Action rebuilds and republishes the
whole site automatically.

## 1. One-time setup (5 minutes)

1. Create a new **public** repo on GitHub (e.g. `your-username/your-blog`).
2. Upload the entire contents of this folder to that repo (drag-and-drop on
   github.com works fine, or `git push` if you're comfortable with git).
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open `src/_data/site.json` and edit:
   - `"url"` → `https://your-username.github.io/your-blog` (must match exactly, no trailing slash)
   - `"title"`, `"tagline"`, `"description"`, `"author"`, `"authorEmail"`, `"twitter"`, `"github"`
5. Also update the `Sitemap:` line in `src/robots.txt` to match your real URL.
6. Push. Check the **Actions** tab — once the workflow finishes (green check), your
   site is live at the URL from step 4.

Using a custom domain instead of `github.io`? Add a `CNAME` file containing just your
domain (e.g. `blog.example.com`) to `src/`, add it to the passthrough copy list in
`eleventy.config.js`, and point your DNS at GitHub Pages per
[GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## 2. Adding a new post

Create a Markdown file in `src/posts/`, e.g. `src/posts/my-new-post.md`:

```md
---
title: My New Post
description: One sentence summary — shown in previews, search results, and RSS.
date: 2026-07-20
tags: ["javascript", "performance"]
---

Write your post here in normal Markdown. Headings, code blocks, images,
links — all supported.
```

Commit and push. That's the entire workflow — the Action handles the rest.
The post appears on the homepage, its own page at `/posts/my-new-post/`,
every tag page it belongs to, the RSS feed, and the sitemap.

## 3. Turning on ads (Google AdSense)

1. Apply for AdSense with your live site once you have several real posts.
2. After approval, open `src/_data/site.json` and set:
   ```json
   "adsenseEnabled": true,
   "adsenseClientId": "ca-pub-XXXXXXXXXXXXXXXX"
   ```
3. Paste the verification line AdSense gives you into `src/ads.txt`.
4. Push. Ad slots are already placed in the layout (top of homepage, and
   above/below every post body) — they'll start serving automatically.
   Search `ad-slot.njk` in `src/_includes/partials/` to add more slots elsewhere.

Until `adsenseEnabled` is `true`, those slots render as small labeled
placeholder boxes so you can see the layout without live ads.

## 4. Turning on comments (optional, still no server)

Comments use [giscus](https://giscus.app/), which stores comments as GitHub
Discussions on your own repo — free, no backend to run.

1. Enable **Discussions** in your repo's Settings.
2. Go to [giscus.app](https://giscus.app/), fill in your repo, and copy the
   `data-repo-id` and `data-category-id` values it gives you.
3. In `src/_data/site.json`, set `"giscusEnabled": true` and fill in the
   `"giscus"` object with those values.

## 5. Local preview (optional)

If you have Node.js installed:

```
npm install
npm run serve
```

Opens a local preview at `http://localhost:8080` that live-reloads as you edit.
You don't need to do this — pushing to GitHub is enough — but it's handy for
checking a post before it goes live.

## Project structure

```
src/
  _data/site.json       ← global settings: title, URL, AdSense, giscus, socials
  _includes/layouts/     ← base.njk (page shell), post.njk (blog post template)
  _includes/partials/     ← header, footer, ad-slot
  posts/                 ← ★ your blog posts go here (.md files)
  css/style.css           ← all styling, one file
  index.njk               ← homepage (lists posts as a commit-log timeline)
  tags/                   ← auto-generated tag pages
  about.njk               ← About page — edit your bio here
  feed.njk, sitemap.njk   ← RSS + sitemap, generated automatically
.github/workflows/deploy.yml  ← builds and deploys on every push to main
```

## Design

The theme treats each post like an entry in a changelog — a monospace
"commit" ID, a timeline rail, tag pills — since a tech blog is, structurally,
a running log of entries. Colors and type are defined as CSS variables at the
top of `src/css/style.css`; the site also auto-switches to a dark palette
based on the visitor's OS setting.
