const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/CNAME")
  eleventyConfig.addPassthroughCopy("./src/robots.txt")
  return {
    dir: {
      input: "src",
      layouts: '_layouts',
    },
  };
};