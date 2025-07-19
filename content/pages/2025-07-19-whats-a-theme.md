---
title: What's a theme?
---
One of the major features of this site is the ability to customize the visual appearance of everything via a selection of themes. This isn't required of course, but

## /main/

### Why?

I got the idea from the [CSS Zen Garden](https://csszengarden.com/), which wanted to show off the power of CSS by allowing visitors to dramatically change the look of the website by allowing them to update the CSS via user-submitted styles. I brought a simple version over for my [portfolio website](https://rovidecena.com/), and expanded upon it for this blog.

### How did you implement it?

Non-technical explanation: The data that stores each theme is located in a few files not immediately loaded by the website. When a theme is loaded, the necessary data is loaded.

Full: Themes are stored in a hybrid format in both individual stylesheets and a JavaScript object that stores basic CSS property information, with stylesheets being intended for layouts and bigger changes. A function called `setTheme` handles all of this logic whenever a theme button is pressed.

There's a base stylesheet that's always loaded to ensure some elements always look similar, but themes can override appearances as needed, because they're at the bottom of the cascade (last `<link>` in the `<head>` .

## /contribute/

### Could I make a theme?

Um-- Maybe. At the very least, I'd check it out to see what it looks like!

If you're familiar with programming and GitHub, you can send a PR with a theme you'd like to add. I don't have a step-by-step tutorial or anything, but:

*   `/content/themes.md` is where the theme swapping buttons are stored. Just add a button with the name of your theme.
    
*   `/public/js/themes.js` is where the theme logic is stored, but most important it's where the basic configuration options are. This is where you'll set primarily colour variables, but also things like fonts.
    
*   Each theme is expected to have a CSS file associated with it in `/public/css/`.
    
*   If you want to import a font, you can do so by updating `/_includes/_base.njk` . Just import it via the CSS shortcode (where you see `{% css %}`.
    
    *   There may or may not be a font there imported via an HTML `<link>` tag. I was lazy at the time. If it hasn't been removed yet, I'm still lazy.
        

Also, important:

*   `/content/themes.md` , `/public/js/themes.js` , and `/public/css/[theme_name].css` all need to have the exact same name, or else they won't connect to each other.
    
    *   Mobile support is required. It doesn't need to look perfect or anything, but I usually test all my themes on a 360 by 360 viewport during testing.
        

### I don't know anything about programming. I have no idea what you just said.

Okay, uh-- that's fine. I think.

If you'd like to send me a theme idea, I suppose you could just... message me somewhere? With the necessary information???

At the very least, I need to know what CSS properties you'd like (colour and stuff). You can use a format like this:

```
name of theme:

fontNormal:
fontMono:
fontWeight: (if you're unsure, just put 400)

colorText: 
colorTextAccent:
colorBackground:

(pair should have high contrast)
selectionColor:
selectionBackground:

(pair should have high contrast)
highlightColor:
highlightBackground:

(pair should have same or less contrast as pair above)
(this is optional so you can leave blank if you want)
highlightColorSecondary:
highlightBackgroundSecondary:

particles: (just put yes or no here)
```

For layout, just mention which of the existing themes you like.