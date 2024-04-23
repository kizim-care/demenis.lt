module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy({ "public/favicon": "/" });
  eleventyConfig.addWatchTarget("src/css/");

  eleventyConfig.setEjsOptions({
		delimiter: "?",
	});

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "ejs", "html"],
    markdownTemplateEngine: "ejs",
    htmlTemplateEngine: "ejs",
    dataTemplateEngine: "ejs",
  };
};
