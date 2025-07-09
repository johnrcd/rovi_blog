---
permalink: false
layout: false
eleventyExcludeFromCollections: true
---

# Eleventy Pages CMS Base: /content/

The /content/ folder holds the files that Eleventy looks in to build your website. This doesn't mean that other files aren't included, but if they aren't referenced by a content file, they'll be ignored.

Eleventy specifically looks for *template* (e.g. .njk, .liquid, .md, etc) files to build pages with. If you had images within the `content` folder, they would not do anything on their own.

NOTE: The directory that Eleventy uses to build your website (where your content is stored) is referred to as the [input directory](https://www.11ty.dev/docs/config/#input-directory). The default directory is `.`. This template changes it to `content` within the configuration defined in `eleventy.config.js`.

## Generating URL's

Pages are built using files in your input directory, meaning that all the template files in this directory (and subdirectories) will be turned into a page. By default, the URL for these pages will be relative to the root input directory.

For example, `/content/blog/example_post.md` will output to `/content/blog/example-post/index.html` (or rather, it can be accessed at `/content/blog/example-post/`).

The output path/url for a template can be changed using the `permalink` key. Generally, most content in this template overrides the permalink value, so you shouldn't use where it's stored in the `/content/` folder as a reference to where it'll be outputted. 11ty has a system to apply data to multiple templates at once via `*.11tydata.js` files, and `permalink` is typically set within those files rather than each individual file that needs it.

For more information on the special keys that Eleventy uses for templates, see the [data configuration](https://www.11ty.dev/docs/data-configuration/) page.

Because *this* file is in the `/content/` folder, three data keys have been set in the file to prevent it from being processed during the build.

- `permalink: false` is the actual key that prevents the file from being built.
- `eleventyExcludeFromCollections: true` prevents Eleventy from allowing other files to reference this file.
	- Specifically, this prevents logic within `/sitemap.xml.njk` from attempting to access the file (which would produce an error).
	- If you don't know what a sitemap is, check the file.
- `layout: false` prevents the file from being formatted with other template files.
	- This is a bit more complicated to understand, but it's all part of Eleventy's [data cascade](https://www.11ty.dev/docs/data-cascade/), with the data directly within a template file taking priority over values from other sources.

## /content/posts/

The `/content/posts/` folder holds all the blog posts.

Blog post URL are generated using this format:

`/{{ metadata.posts_path }}/{{ title | slugify }}/`

with `posts_path` being a key stored in `/_data/metadata.json`. If it is set to an empty string, blog posts will be stored directly in the root folder.

You should be able to put just about any (UTF-8) string as the `blog_path`, but keep in mind that the project will run the [slugify](https://www.npmjs.com/package/slugify) filter in order to clean it; `blog posts` and `blog-posts` will both become `blog-posts`. (You could even used emojis if you really wanted to, but not all emojis will be converted to text, with a decent amount being ignored).

Recommended to keep `blog_path` to something short and simple like `blog` or `posts`.

### Tags - Overlap Issue

Pages for each unique `tag` in the project (barring a few exceptions) are generated during builds, with each tag page holding a list of posts that have the tag in it's tag list. However, because URLs are slugified, different tags may Eleventy to fail during the build process if it attempts to generate two files with the same file path. There are two primary situations where this can occur:

- Case Sensitivity: `testpost` and `TESTPOST` will be slugified to `testpost`.
- White Space: `foo bar` and `foo-bar` will be slugified to `foo-bar`
- Emojis: `emoji test ☢` and `emoji test ` will be sluigified to `emoji-test-`
	- Note that this specific example is due to the slugify plugin used within the project (slugify) not having a default emoji.

In this project, this problem is avoided by using regex to restrict the characters that can be used. When using this template, you may opt for a different solution, such as changing the regex to suit the needs of your project, or restricting your CMS to only allow a list of pre-defined tags.

For a full overview on `collections` and `tags`, see the documentation on [collections](https://www.11ty.dev/docs/collections/).

## /content/pages/

The `/content/pages/` folder stores user-generated pages that are not blog posts. It's meant for pages that you want to give users the ability to edit, thought keep in mind user-generated pages are written in Markdown, the same as blog posts.

User-generated pages are not referenced anywhere by default. The only way to access them is from another user-generated page, or from a post. Developers can add support for navigating to these pages by using the `user-page` collections, as templates within the `/content/pages` directory are given the `user-page` tag via `/content/pages/pages.11tydata.js`.

Similar to posts, user generated page URL's are generated using this format:

`/{{ metadata.pages_path }}/{{ title | slugify }}/`

with `pages_path` being a key stored in `/_data/metadata.json`. If it is set to an empty string, pages will be stored directly in the root folder.

Recommened to keep `pages_path` set to something like `pages`. Alternatively, set it to an empty string if you don't think file path conflicts during builds will be an issue.

## /content/tags/

The `/content/tags/` folder holds the system to generate tag-related pages.

The project excludes a few tags from tag pagination:
	- all
	- post
	- posts
	- blog
	- page
	- pages
	- user page

This list is hardcoded in both `/content/tags/generate-tag-pages.njk` inside the front matter, and in `/config/filters.js` within `filterTagList`.

Half of these aren't needed, but they're put in with the assumption that if you decide to update the project's post and/or user-generated page tag, that it will be one of these. Note that if you decide to override those tags, that you'll need to go through the templates to ensure that they're referencing the new tag. Additionally, keep in mind that there's no system in place to restrict these tags from  Pages CMS, so if a user attempts to use them, they will not show up in the tags list. This isn't seen as a major concern given how vague the tags are, but it may cause confusion later on.

## Miscellaneous

- You can tell Nunjucks to strip all leading or trailing whitespace by adding a minus sign (-) to the start or end block or a variable.
	- {{- variable_name -}}
	- ```{% for i in [1,2,3,4,5] -%}{{ i }}{%- endfor %}```
	- more info: <https://mozilla.github.io/nunjucks/templating.html#whitespace-control>
