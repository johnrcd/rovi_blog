# Eleventy PaperCMS Base

The Eleventy PaperCMS Base repository is a project template for static websites. It uses [Eleventy](https://www.11ty.dev/) (or 11ty for short) as a static site generator, and by default supports the use of [Pages CMS](https://pagescms.org/) as the content management system. This project is based off of Eleventy's example blog (eleventy-blog-base), modified to suit my own needs.

Many of the files are filled with comments explaining the purpose and reasoning for the code. When cloning this repository, you'll probably want to remove them.

## Notes

- Two form of user-generated pages can be used: "pages" and "posts"
	- Posts are standard blog posts.
	- Pages are similar to posts, but stripped of any frontmatter/metadata. This is an niche option for when you have a post that you don't want to treat as a normal blog post. Pages are not accessable in the site by default apart from direct linking.
	- Both pages and posts use Markdown syntax for editing. Pages CMS internally labels this as `rich-text`.
- There is a minimal amount of CSS classes used. This is to keep the HTML code clean when referencing it.
- This template provides a default style, but it is recommended to override it completely as it only modifies the root HTML elements.
- If you plan on having an RSS feed for your website, keep in mind that the settings for RSS are defined in `eleventy.config.js`. This should ideally have the same metadata as `_data/metadata.json`, but there is no connection between the two files.
