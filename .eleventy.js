const { DateTime } = require("luxon");

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
  // Copy src/assets/ → _site/assets/ (not _site/src/assets/)
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Make collections available to templates
  eleventyConfig.addCollection("post", (api) =>
    api.getFilteredByTag("post").reverse()
  );
  eleventyConfig.addCollection("adventure", (api) =>
    api.getFilteredByTag("adventure").reverse()
  );
  eleventyConfig.addCollection("gallery", (api) =>
    api.getFilteredByTag("gallery")
  );
  eleventyConfig.addCollection("camino", (api) =>
    api.getFilteredByTag("camino").sort((a, b) =>
      a.date - b.date
    )
  );

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
