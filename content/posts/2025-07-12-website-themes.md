---
title: Website Themes
description: css variables my beloved
is_published: true
date: 2025-07-12
---
description: enough said

—

Awhile back (at the time of writing this), I switched from Namecheap to Cloudflare for domain registration and hosting. During that move, my old blog went down, and I never ended up getting it up and running again. If you attempt to access it, the only thing that’ll load is my portfolio page, except without any CSS.

But, y’know — I still wanted to do stuff revolving it.

The original blog was fine… all things considered. I designed it when I was attached to the idea of a super minimal website — something about “cutting out the fluff.” In retrospect, I think I took the idea too far because the website was pretty ugly. On my portfolio website, I have this feature where you can customize the look of the website from a few presets, and I thought it was cool and fun so I wanted to do it again.

In terms of visual customization, websites typically have very little, if at all. There isn’t really an expectation that you can change the look of a website, which makes sense— it’s a lot of work (and somewhat of a nightmare) to allow your users to have that control. The most that you’ll get is the ability to palette swap, almost always in the form of a light/dark mode toggle, and I assume that’s partially because it contributes to accessible design. Unfortunat

## explanation

To give a brief (non-technical) overview on how my “themes” system works:

Themes are stored on a list in the code. Each theme is represented as a list of properties, written in a format like this:

```xml
"textColor" : "black",
"backgroundColor : "white",
```

A function called `setTheme` takes in a string representing the theme to load, reading the properties one-by-one and determining what to do with it. Sometimes a property is as simple as changing a line in the code:

```xml
// before setting theme
textColor: blue;

// after
textColor: white;
```

…and other times it’ll have to do something weird like “reinitialize the particle system.”

```xml
Particles.init(particleOptions);
// there's too much particles i'm not listening them down for you
```

There’s a specific page on the website with a list of all the possible themes. Clicking on one will change the style to the theme selected. The website stores the theme you set on your computer (or device), so it’ll always remember and load it when you visit.

It gets more complex than that, but if you just wanted an easy to understand explanation (hopefully…) — that’s it!

## the most barebones themeing: here’s a tutorial if you want

(Not color.)

If you want an absolute barebones way of modifying the colour palette of your website, you can simply have your CSS check if `prefers-color-scheme` \*\*\*\*is true or false.

```css
:root {
	/* default: light theme */
	--color-text: #000;
	--color-bg: #EEE;
}

@media (prefers-color-scheme: dark) {
	:root {
		--color-text: #EEE;
		--color-bg: #000;
	}
}
```

This solution is useful enough (and doesn’t require JavaScript), but it prevents users from manually changing the colour palette directly in the website, forcing them to go through their operating system settings. Most websites that support dark and light mode typically have a button to toggle between them.

You can implement the ability to swap between colour palettes using some JavaScript to manually modify the CSS variables:

```jsx
const themes = {
	"light": {
		"colorText"  : "#000",
		"colorBg"    : "#EEE",
	},
	"dark": {
		"colorText"  : "#EEE",
		"colorBg"    : "#000",
	},
}

const setTheme = (theme) => {
	const themeData = themes[theme];

	root.style.setProperty("--color-text",  themeData.colorText);
	root.style.setProperty("--color-bg",    themeData.colorBg  );
};
```

It’ll be useful to initialize the site theme when the page loads, and have some way of keeping track of the current theme so swapping works.

```jsx
// this code might not work i didn't actually test it

let isDarkMode;

addEventListener("DOMContentLoaded", (event) => {
	const prefersDarkMode = window.matchMedia.("(prefers-color-scheme:dark)").matches;
	isDarkMode = prefersDarkMode;

	setTheme(isDarkMode ? "dark" : "light");

	document
		.getElementById("swap_theme")
		.addEventListener("click", () => {
			isDarkMode = !isDarkMode;
			setTheme(isDarkMode ? "dark" : "light");
		});
});
```

## \## css variables are Evil.

One thing that you’ll realize if you decide to implement

## eleventy is not an SPA. but i will Make it one.

Okay, now that everything’s working now, I realized I should probably address how to properly deal with the jitter that comes from swapping pages. I tried to avoid it for awhile (mostly because I had no idea how to fix it), but it got bad when I introduced the particle system as a visual option for some themes because it would reinitialize every time you went to a new page. The jitter was showing up half the time, so even in an ideal situation with minimal latency and lag it’s problematic.

The most obvious (and probably only real) solution is to turn my website into an SPA (Single Page Application), where instead of actually loading a different page/file, it simply swaps the contents of the page. This fix both prevents the jitter from a theme being loaded in and the particle system being reinitialized, because neither of them need to happen at all — the only thing that changes is the actual content of the page.

The problem for me was how I was going to do that at all.

Eleventy is a static site generator, and has zero support for an SPA, so I’d have to make it myself, but there’s no way, right? How do you even go about making an SPA? I don’t want to make the next React. I don’t know where to begin.

I ended up stumbling upon [this repository](https://github.com/learosema/eleventy-mini-spa) by [learosema](https://github.com/learosema/), which uses a script that overrides links. Rather than simply traversing to the page, it _fetches_ the contents of the page and swaps it in place of the current page information. It honestly kind of blew me away because it meant that it could effectively turn any statically generated site into an SPA. Plus, it still allows the site to function fine even if JavaScript isn’t enabled, and it doesn’t have those ugly links that come with client-side rendered SPA’s ([www.domain.com/#/link](http://www.domain.com/#/link), or simply just have non-root links fail).

My solution deviates a bit from hers — I suscribe to anchor tags directly rather than processing each click, and I make a lot of assumptions (less error handling) which might be a bad thing but that’ll a problem for future me (although I do not believe there’ll be serious issues with my code).

```jsx
let anchors = [];

const loadPage = async(event) => {
	event.preventDefault();
	const url = event.target.href
	const response = await fetch(url);
	const text = await response.text();

	const doc = new DOMParser()
		.parseFromString(text, "text/html");

	const panel = document
		.getElementsByClassName("panel")[0];

	anchors.forEach(anchor => {
		anchor.removeEventListener("click", loadPage);
	});

	panel.innerHTML =
		doc
			.getElementsByClassName("panel")[0]
			.innerHTML;

	history.pushState({}, document.title, url);

	loadAnchors();
}

/**
 * Gets a list of all the anchor tags on the page, attaches them to the
 * loadPage method, and adds them to the "anchors" variable.
 */
const loadAnchors = () => {
	const temp = Array.from(document.getElementsByTagName("a"));

	temp.forEach(t => {
		// do NOT try to SPA for links to different websites
		const destination = new URL(t.href, document.baseURI);
		const root = new URL(document.baseURI);
		if (destination.origin != root.origin) return;

		anchors.push(t);
	});

	anchors.forEach(anchor => {
		console.log(anchor);
		anchor.addEventListener("click", (event) => { loadPage(event); })
	});
};

document.addEventListener("DOMContentLoaded", () => {
	loadAnchors();
});

```

Honestly— making the SPA logic was one of the easier parts of the site. It definitely helped that someone already had a solution I could reference for my own, but creating the theme logic was significantly worse.

## mutations???

Because pages aren’t actually being loaded, my theme swapper breaks because it only initializes the theme swap buttons on `DOMContentLoaded` . Shouldn’t be a big deal, I’ll just use `popstate` instead…

Hm. It didn’t work.

I discovered that `popstate` isn’t fired when `history.pushState()` is invoked. It’s meant for other events like when you press the back/forward buttons on your browser, which makes sense, but unfortunately means I can’t use it.

I tried doing something similar to C# events but JavaScript doesn’t really have that so I’d have to shoehorn it in, and this entire deep dive is me shoehorning in features in the first place, and I didn’t want to add another one to the list so I just scrapped it.

I eventually settled on listening to changes directly within the `panel` class element, which led me to one of the class names of all time: `MutatorObserver`

```jsx
const bindThemeButtons = () => {
	const collection = document
		.getElementsByClassName("themes__button");

	for (let i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click", (event) => {
			setTheme(collection[i].innerText);
		});
	}
};

const onPanelUpdated = () => {
	bindThemeButtons();
};

const observer = new MutationObserver(callback);

observer.observe(
	document.getElementsByClassName("panel")[0],
	{ attributes: true, childList: true, subtree: true }
);
```

## super fast particles

A long standing bug with this whole theme thing was particles moving at a faster speed than set. The only time this didn’t happen was the first initialization when you loaded the page.

I tried fixing this by deleting the `<canvas>` element and remaking it since the particle system uses it for rendering— not sure why I considered this, probably something about forcing a “reset” of some sorts. It didn’t work so I just decided to force refresh the browser if you were attempting to load a theme that had particles.

```jsx
let initialized = false;

const setTheme = (theme) => {
	// ... omitted ...

	Particles.init(particleOptions);

	localStorage.setItem("theme_on_load", theme);

	if (hasParticles && initialized) {
		window.location.reload();
	}

	initialized = true;
};
```

Definitely one of the solutions of all time (don’t like global variables), but it works, and I severely doubt the JavaScript of my blog is going to get so complex that I will be significantly burdened by this decision (knock on wood lol).

## retrospective

Website themes are overkill.

I will probably not do anything here for anyone of this for anyone else except for the dark/light mode logic because those are nice features to have, and even then not unless they specifically request for it. However, it looks cool so for my own personal web development projects (when I can find it in me to do so), I will continue to support colour palettes.

Cross-site compatibility is out of the picture to prevent the headache of constantly synchronizing styles across multiple (likely unrelated) projects.
