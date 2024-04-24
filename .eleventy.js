require('dotenv').config();

const htmlmin = require('html-minifier');

const isProduction = process.env.APP_ENV === 'production';

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "resources/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "public/favicon": "/" });

  eleventyConfig.addWatchTarget("resources/js/*");


  eleventyConfig.addGlobalData("cachVersion", Date.now());

  eleventyConfig.addTransform("htmlmin", function (content) {
		if (isProduction && (this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
        minifyJS: true,
			});

			return minified;
		}

		return content;
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
