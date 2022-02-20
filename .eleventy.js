module.exports = function (eleventyConfig) {
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
