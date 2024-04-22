module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy({ "public/favicon": "/" });
  eleventyConfig.addWatchTarget("src/css/");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "liquid", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
  };
};
