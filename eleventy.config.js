import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import pluginTOC from "eleventy-plugin-toc";
import pluginRss from "@11ty/eleventy-plugin-rss";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Update build if public directory is updated in any way
	eleventyConfig.addWatchTarget("public/");

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform

	// this stupid shit is messing with my image urls
	// CAN YOU STAY ABSOLUTE FOR FIVE SECONDS

	// eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
	// 	// Output formats for each image.
	// 	formats: ["avif", "webp", "auto"],

	// 	// widths: ["auto"],

	// 	failOnError: false,
	// 	htmlOptions: {
	// 		imgAttributes: {
	// 			// e.g. <img loading decoding> assigned on the HTML tag will override these values.
	// 			loading: "lazy",
	// 			decoding: "async",
	// 		}
	// 	},

	// 	sharpOptions: {
	// 		animated: true,
	// 	},
	// });

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "post", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name",
				email: "", // Optional
			}
		}
	});




	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	// don't really use this atm cause... why
	// MAYBE for tutorials.
	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy's built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// MARKDOWN ANCHOR LOGIC

	const markdownItOptions = {
		html: true,
	};

	const markdownItAnchorOptions = {
		permalink: markdownItAnchor.permalink.headerLink()
	};

	const markdownLib = markdownIt(markdownItOptions)
		.use(markdownItFootnote)
		.use(markdownItAnchor, markdownItAnchorOptions);

	markdownLib.renderer.rules.footnote_block_open = (tokens, idx, options) => (
		"<h2 tabindex=\"-1\">" +
		"  <a class=\"header-anchor\" href=\"#footnotes\">footnotes</a>" +
		"</h2>" +

		// taken directly from the source code
		// https://github.com/markdown-it/markdown-it-footnote/blob/master/index.mjs
		'<section class="footnotes">\n' +
		'<ol class="footnotes-list">\n'
	);

	eleventyConfig.setLibrary("md", markdownLib);

	eleventyConfig.addPlugin(pluginTOC);
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
