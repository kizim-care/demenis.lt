module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("resources/css/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy({ "public/favicon": "/" });
  eleventyConfig.addWatchTarget("resources/css/");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: "/demenis.lt/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
