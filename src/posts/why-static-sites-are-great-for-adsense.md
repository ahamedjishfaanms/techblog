---
title: Why static sites are a good fit for AdSense
description: Fast pages, clean markup, and predictable ad placement — the three things review teams actually check.
date: 2026-07-08
tags: ["seo", "adsense"]
---

Ad networks care about page experience, and static HTML tends to win on the metrics that matter most:

1. **Speed.** There's no database query or server render on each request — the HTML is already built, so pages load close to instantly.
2. **Stability.** Ad slots have a reserved size (see `.ad-slot__box` in `style.css`), which avoids layout shift when an ad loads in.
3. **Crawlability.** Every post is a real HTML page with its own URL, title, and description — nothing hidden behind client-side routing.

## A quick checklist before you apply

- Write a handful of genuinely useful posts first (AdSense reviews for original content, not placeholders)
- Fill in `src/about.njk` with a real bio
- Set your real `url` in `src/_data/site.json` so canonical tags and the sitemap are correct
- Once approved, flip `adsenseEnabled` to `true` and drop in your publisher ID

```js
// src/_data/site.json
{
  "adsenseEnabled": true,
  "adsenseClientId": "ca-pub-1234567890123456"
}
```

That's it — the ad slots already in the layout will start serving automatically.
