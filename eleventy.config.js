const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // ---- Plugins ----
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  // ---- Passthrough copy (static files ship as-is) ----
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/ads.txt");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy({ "src/favicon": "/" });

  // ---- Markdown-it with anchor links on headings (nice for tech posts) ----
  const md = markdownIt({ html: true, breaks: false, linkify: true, typographer: true }).use(
    markdownItAnchor,
    { permalink: markdownItAnchor.permalink.headerLink() }
  );
  eleventyConfig.setLibrary("md", md);

  // ---- Filters ----
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLL d, yyyy") => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return 1;
    const words = content.toString().split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
  });

  // Deterministic fake "commit sha" derived from the post's slug — pure decoration for the changelog theme.
  eleventyConfig.addFilter("shortSha", (slug) => {
    if (!slug) return "0000000";
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash << 5) - hash + slug.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padEnd(7, "0").slice(0, 7);
  });

  eleventyConfig.addFilter("primaryTag", (tags) => {
    if (!Array.isArray(tags)) return null;
    return tags.find((t) => t !== "posts") || null;
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) return [];
    if (n < 0) return array.slice(n);
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("excerpt", (content, length = 160) => {
    if (!content) return "";
    const text = content.replace(/(<([^>]+)>)/gi, "").replace(/\s+/g, " ").trim();
    return text.length > length ? text.slice(0, length).trim() + "…" : text;
  });

  // ---- Global data ----
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  // ---- Collections ----
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (!["posts"].includes(tag)) tagSet.add(tag);
      });
    });
    return [...tagSet].sort();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
