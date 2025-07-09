---
title: About
permalink: "/about/"
eleventyNavigation:
  key: About
  order: 2
---
This is the about page.

By default, entries created within the Pages directory in PagesCMS will have pages built in the `/pages/` folder. These pages can be accessed in through blog posts (or other pages technically) via defining a URL, but the layout of the website will not change by default (no links or buttons will generate to allow viewers to access new pages).

The About page is a special case as it has additional properties (in the frontmatter) not visible to PagesCMS to include it in the header navigation bar, while still allowing it to be a user-editable page. For pages you want to be user-editable, it is recommended to follow this format of adding it to the pages folder, but adding front matter as needed.
