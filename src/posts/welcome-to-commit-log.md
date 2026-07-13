---
title: Welcome to commit log
description: Why this blog exists, how it's built, and how to add your own posts in under a minute.
date: 2026-07-01
tags: ["meta"]
---

This blog is built with [Eleventy](https://www.11ty.dev/), a static site generator. There's no database and no server process — every page is plain HTML generated at build time, which is exactly what search engines and ad networks like to see: fast, simple, crawlable pages.

## How posts work

Every post is a Markdown file in `src/posts/`. The front matter at the top of the file controls the title, date, and tags:

```md
---
title: My New Post
description: A one-line summary for previews and search results.
date: 2026-07-13
tags: ["javascript", "performance"]
---

Your post content goes here, in regular Markdown.
```

Push that file to GitHub, and a GitHub Action rebuilds the whole site and republishes it automatically. You never touch a server.

## What you get out of the box

- Syntax-highlighted code blocks
- Tag pages, an RSS feed, and a sitemap for SEO
- Ad slots (header, in-article, and easy to add more) that switch on the moment you add your AdSense client ID
- Optional comments powered by GitHub Discussions, via [giscus](https://giscus.app/) — no server required

Open `README.md` in the repo for the full setup checklist.
