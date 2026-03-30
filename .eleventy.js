const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFigures = require("markdown-it-implicit-figures");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItMark     = require("markdown-it-mark");

module.exports = function (eleventyConfig) {
  // Date formatting using Luxon format tokens
  // Usage: {{ date | dateFormat("MMMM d, yyyy") }}
  // Special value "now" returns current year/date
  eleventyConfig.addFilter("dateFormat", (value, format = "MMMM d, yyyy") => {
    if (value === "now") {
      return DateTime.now().toFormat(format);
    }
    const dt = value instanceof Date
      ? DateTime.fromJSDate(value, { zone: "utc" })
      : DateTime.fromISO(String(value), { zone: "utc" });
    return dt.isValid ? dt.toFormat(format) : String(value);
  });
  // Markdown-it with attrs plugin — enables {.classname} syntax in Markdown
  const md = markdownIt({ html: true })
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItMark)
    // figcaption: false — we add our own from the title attribute below
    .use(markdownItFigures, { figcaption: false, lazy: true, async: true });

  // Track whether we are currently inside a <figure> block.
  // Only emit <figcaption> when inside a figure — otherwise the image is
  // inline inside a <p>, and a block-level figcaption would break out of it.
  let _inFigure = false;
  md.renderer.rules.figure_open  = () => { _inFigure = true;  return '<figure>'; };
  md.renderer.rules.figure_close = () => { _inFigure = false; return '</figure>'; };

  // Render image title as <figcaption> when provided: ![alt](src "Caption text")
  const defaultImageRender = md.renderer.rules.image;
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const title = token.attrGet("title");
    const base = defaultImageRender
      ? defaultImageRender(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
    if (title && _inFigure) {
      return base + `<figcaption>${md.utils.escapeHtml(title)}</figcaption>`;
    }
    return base;
  };

  // TinaCMS escapes custom syntax with backslashes when it saves rich-text
  // content. Undo those specific escapes before markdown-it processes the
  // source so posts edited in TinaCMS don't need manual repair.
  const _originalRender = md.render.bind(md);
  md.render = function (content, env) {
    const fixed = content
      .replace(/\\==/g, '==')       // ==highlight==
      .replace(/\\\[\^/g, '[^')     // [^footnote] refs and definitions
      .replace(/\\\{/g, '{')        // {.image-attrs}
      // TinaCMS Aside embed (JSX form, when TinaCMS serialises it correctly)
      .replace(/<Aside\s+([\s\S]*?)\/>/gi, (_, attrs) => {
        const m = attrs.match(/text=["']?((?:[^"'\\]|\\.)*)/s);
        if (!m) return '';
        const txt = m[1].replace(/\n/g, ' ').trim();
        const safe = txt.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return `<span class="aside-trigger" data-aside="${safe}" tabindex="0" role="button" aria-label="Show aside note">\u00B7\u00B7\u00B7</span>`;
      })
      // Plain-text fallback syntax usable in the Raw editor: [aside: text here]
      .replace(/\[aside:\s*([\s\S]*?)\]/gi, (_, txt) => {
        const safe = txt.trim().replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return `<span class="aside-trigger" data-aside="${safe}" tabindex="0" role="button" aria-label="Show aside note">\u00B7\u00B7\u00B7</span>`;
      })
      // TinaCMS-escaped angle-bracket form: \<aside="text"> or \<aside = "text">
      .replace(/\\<aside\s*=\s*["']([^"']*)["']\s*>/gi, (_, txt) => {
        const safe = txt.trim().replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return `<span class="aside-trigger" data-aside="${safe}" tabindex="0" role="button" aria-label="Show aside note">\u00B7\u00B7\u00B7</span>`;
      })
      // TinaCMS-escaped bracket form: \[aside: text]
      .replace(/\\\[aside:\s*([\s\S]*?)\]/gi, (_, txt) => {
        const safe = txt.trim().replace(/&/g,'&amp;').replace(/"/g,'&quot;');
        return `<span class="aside-trigger" data-aside="${safe}" tabindex="0" role="button" aria-label="Show aside note">\u00B7\u00B7\u00B7</span>`;
      });
    return _originalRender(fixed, env);
  };

  eleventyConfig.setLibrary("md", md);

  // Copy src/assets/ → _site/assets/ (not _site/src/assets/)
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy("_redirects");

  // Sort newest-first; use optional `time` field (HH:MM) as tiebreaker within a day
  function newestFirst(a, b) {
    const diff = b.date - a.date;
    if (diff !== 0) return diff;
    return (b.data.time || "00:00").localeCompare(a.data.time || "00:00");
  }
  // Sort oldest-first; use optional `time` field (HH:MM) as tiebreaker within a day
  function oldestFirst(a, b) {
    const diff = a.date - b.date;
    if (diff !== 0) return diff;
    return (a.data.time || "00:00").localeCompare(b.data.time || "00:00");
  }

  // Make collections available to templates
  eleventyConfig.addCollection("post", (api) =>
    api.getFilteredByTag("post").sort(newestFirst)
  );
  eleventyConfig.addCollection("adventure", (api) =>
    api.getFilteredByTag("adventure").sort(newestFirst)
  );
  eleventyConfig.addCollection("gallery", (api) =>
    api.getFilteredByTag("gallery")
  );
  eleventyConfig.addCollection("camino", (api) =>
    api.getFilteredByTag("camino").sort(oldestFirst)
  );
  eleventyConfig.addCollection("page", (api) =>
    api.getFilteredByTag("page")
  );
  eleventyConfig.addCollection("pageAliases", (api) => {
    const aliases = [];
    for (const page of api.getFilteredByTag("page")) {
      if (!page.data.aliases) continue;
      const target = "/" + (page.data.slug || page.fileSlug) + "/";
      for (const alias of page.data.aliases) {
        aliases.push({ alias, target });
      }
    }
    return aliases;
  });

  // Prev/next navigation within a collection
  // Returns the item one position earlier in the array (lower index)
  eleventyConfig.addFilter("collectionPrev", (collection, currentUrl) => {
    const idx = collection.findIndex(i => i.url === currentUrl);
    return idx > 0 ? collection[idx - 1] : null;
  });
  // Returns the item one position later in the array (higher index)
  eleventyConfig.addFilter("collectionNext", (collection, currentUrl) => {
    const idx = collection.findIndex(i => i.url === currentUrl);
    return idx !== -1 && idx < collection.length - 1 ? collection[idx + 1] : null;
  });

  // Serialise a value to JSON for inline <script> usage
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  // Limit a collection to N items
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      layouts: "src/_includes",
      data: "src/_data",
    },
  };
};
