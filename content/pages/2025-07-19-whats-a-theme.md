---
title: What's a theme?
---
One of the major features of this site is the ability to customize the visual appearance of everything via a selection of themes.

For the rest of this page, I will be treating it like a Q&A. (Or is it an FAQ?)

## questions

### Why?

I got the idea from the [CSS Zen Garden](https://csszengarden.com/), which wanted to show off the power of CSS by allowing visitors to dramatically change the look of the website by allowing them to update the CSS via user-submitted styles. I brought a simple version over for my [portfolio website](https://rovidecena.com/), and expanded upon it for this blog.

### How does it work?

Non-technical explanation: The data that stores each theme is located in a few files not immediately loaded by the website. When a theme is loaded, the necessary data

Full: Themes are stored in a hybrid format in both individual stylesheets and a JavaScript object that stores basic CSS property information, with stylesheets being intended for layouts and bigger changes. A function called `setTheme` handles all of this logic whenever a theme button is pressed.

There's a base stylesheet that's always loaded to ensure some elements always look similar, but themes can override appearances as needed, because they're at the bottom of the cascade (last `<link>` in the `<head>`).

### Give me the full technical breakdown.

Oh. Okay.

You can divide the theme system into two three major "systems"— the theme loader, the theme swapper, and the theme data:

*   The theme loader is simply the `setTheme` function.
    
*   The theme swapper refers to the code that initialize the theme changing buttons when you're on the theme page. It also includes the saving and loading of the current theme.
    
*   The theme data is where theme information is stored. As mentioned before, each theme has properties defined within a config file meant for setting basic CSS properties and variables (colours, fonts, etc.), and an individual CSS file to deal with anything more complex, such as changing layouts, or overriding the default styles.
    

`setTheme` is the core of the entire theme system, working as follows:

*   If there is an existing CSS theme file, it is removed.
    
*   The CSS file for the requested theme is loaded, attached to the `<head>`.
    
*   The theme's basic properties are all initialized. This is done by setting a bunch of CSS variables in `:root`.
    
*   The name of the theme is stored in `localStorage`.
    

The theme swapper simply runs every time a new page is loaded, and overrides every button that inherits from a specific class (originally it was `theme__button`) to load in the theme of that name.

The theme page itself is built from a `JSON` file storing the themes into groups, mostly to keep the HTML clean (thank you Nunjucks)

## contribute

### Can I make a theme?

Uh— probably not.

Part of the fun of making this website is coming up with cool themes, along with building/optimizing the theme system itself. Plus, this is _my_ website, and it feels a bit strange to allow other people to edit it, y'know?

Despite all that, I'm not completely against the idea of others giving me theme ideas on the rare occasion, as long as they understand that I'm probably not going to implement it.

If you'd like to send me a theme idea, I suppose you could just... message me somewhere? With the necessary information??? I'm not sure.