---
title: What's a theme?
---
One of the major features of this site is the ability to customize the visual appearance of everything via a selection of themes.

For the rest of this page, I will be treating it like a Q&A. (Or is it an FAQ?)

## questions

### Why?

I got the idea from the [CSS Zen Garden](https://csszengarden.com/), which wanted to show off the power of CSS by allowing visitors to dramatically change the look of the website by allowing them to update the CSS via user-submitted styles. I brought a simple version over for my [portfolio website](https://rovidecena.com/), and expanded upon it for this blog.

### How does it work?

Non-technical explanation: The information for a theme (the colours the website will use, and how parts of the website will be placed on the page) are stored in a few files that the website selectively loads in based on the currently active theme.

Full: Themes are stored in a hybrid format: a root stylesheet, and a custom stylesheet that each theme has which is loaded alongside the root.

The root stylesheet has a list of CSS properties that are updated when a new theme is loaded in. This is meant for "simple" things— mostly colours, but also fonts.

Each theme also comes with a stylesheet that adds onto the existing base. This is intended for determining the layout of the website. Most themes typically share their layout with another, but change it in some way.

### Give me the full technical breakdown.

Oh. Okay.

You can divide the theme system into two three major "systems"— the theme loader, the theme swapper, and the theme data:

- The theme loader is the `setTheme` function, and all the logic within it. It does the actual heavy-lifting.
- The theme swapper refers to the theme page, which handle the logic to call `setTheme`.
- The theme data is where the actual pieces of theme information are stored.
	- Theme data is split between a theme's CSS file and a list of CSS properties.

`setTheme` is the core of the theme system, working as follows:

- A theme's CSS file is loaded, and attached.
- 	If there is an existing CSS theme file, it is removed beforehand.
- The theme's basic properties are all initialized. This is done by setting a bunch of CSS variables in `:root`.
- The name of the theme is stored in `localStorage`.

The theme swapper simply runs every time a new page is loaded, and overrides every button that inherits from a specific class (originally it was `theme__button`) to load in the theme of that name.

The theme page itself is built from a `JSON` file storing the themes into groups, mostly to keep the HTML clean (thank you Nunjucks)

### How did you figure this out?

See [this blog post](/post/website-themes/).

## contribute

### Can I make a theme?

Uh— probably not.

Part of the fun of making this website is coming up with cool themes, along with building/optimizing the theme system itself. Plus, this is _my_ website, and it feels a bit strange to allow other people to edit it, y'know?

Despite all that, I'm not completely against the idea of others giving me theme ideas on the rare occasion, as long as they understand that I'm probably not going to implement it.

If you'd like to send me a theme idea, I suppose you could just... message me somewhere? With the necessary information??? I'm not sure.
