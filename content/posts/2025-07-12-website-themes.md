---
title: Website Themes
description: a tutorial on how to unnecessarily complicate a website
tags: ["webdev", "code", "css", "javascript"]
is_published: true
date: 2025-07-12
category: "deep dive"
---

Q: What's a deep dive?

A: [This.](/category/deep-dive/)

In most websites, the most that you'll be able to do in terms of visual customization is toggling dark/light mode. Websites aren't really made with this functionality in mind, which makes sense— typically you want your website to have a certain look and aesthetic (brand identity?), and allowing users to change that, well— changes it.

Unfortunately, because I am one of the [Developers] of all time, I wondered if I could change that, and made a core part of my portfolio the ability to change how it looks dramatically from a selection of themes. My main inspiration was [daisyUI's website](https://daisyui.com/), which gives you a selection of colour palettes to choose between. They probably did it to show the functionality of the library (you can add your own themes and see how it looks with their components), but still— it's a neat feature.

![](/_media/daisyui_themelist.png)

## what's a colour palette?

Palette swapping was the initial idea of the whole theme system. It's what daisyUI did, so it made sense to follow in their footsteps.

If you want an absolute barebones way of modifying the colour palette of a website, you can define CSS variables for the colours you'll be using throughout your stylesheets, and add a media query to change them based on the users preferences:

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

This solution is okay (and is a good fallback if a user doesn't support scripts), but it prevents users from manually changing the color palette directly in the website, forcing them to go through their operating system settings. Sites that support dark and light mode typically have a button to toggle between them.

(Also, I wanted more than two palettes to choose from so I didn't never actually implemented this— *although* you'd probably want to implement this regardless to support users who don't allow scripts.)

I went for a solution where themes are stored in an list of objects each object having properties corresponding to a CSS variable, with a `setTheme` function that does all the theme applying logic.

```jsx
const themes = {
	"light": {
		"colorText" : "#000",
		"colorBg" : "#EEE",
	},
	"dark": {
		"colorText" : "#EEE",
		"colorBg" : "#000",
	},
}

const setTheme = (theme) => {
	const themeData = themes[theme];

	root.style.setProperty(
		"--color-text",
		themeData.colorText
		);
	root.style.setProperty(
		"--color-bg",
		themeData.colorBg
		);
};
```

I realized it would be nice to store the theme somewhere so the user would always see the last palette they picked, so I just kept it in local storage:

```jsx
addEventListener("DOMContentLoaded", (event) => {
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if (themeOnLoad in themes) {
	setTheme(themeOnLoad);
	}
});

const setTheme = (theme) => {
	// ... omitted ...

	localStorage.setItem("theme_on_load", theme);
};
```

If you want to be really fancy, you can choose between two themes based on the user's preferences.

```jsx
// this code probably doesn't work i didn't actually test it

let isDarkMode;

addEventListener("DOMContentLoaded", (event) => {
	const themeOnLoad =
		localStorage.getItem("theme_on_load");

	const darkModePreferences =
		window
			.matchMedia
			.("(prefers-color-scheme:dark)")
			.matches;

	setTheme(
		themeOnLoad ||
		isDarkMode ? "dark" : "light"
	);
});
```

I didn't do this as I wanted a specific theme to act as the default, but it wouldn't be a bad thing to add if you're not concerned about that.

### fonts, filters, and other features

The initial themes I had for my website were basic, only using solid colours. I thought it was fine at the time until one of my coding friends looked at it and roasted it.

Anyways, my solution (other than making better designs) was to add additional options for themes. Any CSS property could be changed with variables, so why not? Fonts, filters, and gradients could all be supported because they were apart of CSS. I even realized that I could add stuff that couldn't be done purely through CSS, and slapped a particle system on a few themes to add some interest in the background.

For reference, here's the information for one theme on my portfolio:

```jsx
const themes = {
	"midnight": {
	"fontFamily"		 : '"Manrope", "Poppins", sans-serif',
	"colorTextTitle"	 : "#EEEEEE",
	"colorTextHeader"	: "#B9E7E9",
	"colorTextSupport" : "#85A7A8",
	"colorText"		: "#C2C7C7",
	"svgFilter"		: "invert(97%) sepia(3%)...",
	"colorBg"			: "linear-gradient(233deg, rgba(1,2,8,1)...",
	"colorBgHeader"	: "rgba(0, 0, 0, 0)",
	"glassBg"			: "rgba(255, 255, 255, 0.02)",
	"selectionText"	: "#000000",
	"selectionBg"		: "rgb(122, 255, 252)",
	"particleOptions"	: {
		selector: '.background',
		color: "#1d3243",
		connectParticles: true,
		speed: 0.1,
		maxParticles: 100,
		minDistance: 120,
		responsive: [
		{ breakpoint: 1440, options: { maxParticles: 100, }, },
		{ breakpoint: 1200, options: { maxParticles: 75,	}, },
		{ breakpoint: 768,	options: { maxParticles: 50,	}, },
		{ breakpoint: 576,	options: { maxParticles: 0,	 }, },
		],
	}
	},
	/* ... omitted ... */
}
```

## single page application

Porting the theme system to version 2.0 of my blog went relatively smooth, except for one major flaw:

Changing pages.

There was this hitch that occurred every time you loaded a new page, where the default styling would be shown momentarily before the current theme would load. This happened on my portfolio as well, but it was also literally a single page website, so you'd only ever see it once, if you even noticed it at all.

(Also, the particles would reset on every page change, which was definitely a bigger issue.)

The most obvious (and probably only real) solution was to turn my website into an SPA (Single Page Application), where instead of loading a different page/file in its entirety, it simply swaps the contents of the current page (normally only what's changed). This fix both prevents the jitter from a theme being loaded in and the particle system being reinitialized, because neither of them need to happen at all— the only thing that changes is the actual content of the page.

The problem for me was how I was going to do that at all.

Eleventy is a static site generator, and has [zero support for an SPA](https://www.11ty.dev/docs/single-page-applications/#:~:text=If%20you%E2%80%99d%20like%20to%20build%20a%20single%20page%20application%20(SPA)%2C%20Eleventy%20probably%20isn%E2%80%99t%20the%20right%20tool.), so I'd have to make it myself, but at the time that wasn't even a concept for me. An SPA in my mind was something done by whatever framework you were using. If the framework didn't do it, how could you?

I was close to giving up and rewriting the site in Next.js or something, but I stumbled on [this repository](https://github.com/learosema/eleventy-mini-spa) by [learosema](https://github.com/learosema/) demonstrating an Eleventy website with SPA functionality. Rather than simply traversing to the page you want to go to, it *fetches* its content and overrides the existing page content. It honestly blew my mind a bit thinking about it because it effectively allowed you to have an SPA that could still function as a traditional static site if JavaScript couldn't be enabled for some reason.

My solution deviates a bit from hers— I subscribe to anchor tags directly rather than processing each click in the browser, and I had to deal with a bunch of issues that may or may not have existed in hers— getting hash links to work, making sure I didn't try to load the contents of page from a *different* website. It took a while to get it to work without hiccups, but eventually I came up with something like this:

```jsx
let anchors = [];

const loadPage = async(url, updateHistory) => {
	if (updateHistory) {
		history.pushState({}, "", url);
	}
	const hash = window.location.hash;

	if (hash != "") {
		const rawPosition =
			document
				.getElementById(hash.replace("#", ""))
				.getBoundingClientRect().top;
		const offset = 16; // for stylistic purposes
		const position =
			rawPosition +
			window.pageYOffset -
			offset;

		window.scrollTo({
			top: position,
			behavior: "smooth"
		});
		return;
	}

	const response = await fetch(url);
	const text = await response.text();

	const doc =
		new DOMParser()
		.parseFromString(text, "text/html");

	const panel = document.getElementById("content");

	anchors.forEach(anchor => {
		anchor.removeEventListener("click", loadPage);
	});

	document.title = doc.title;
	panel.innerHTML = doc.getElementById("content").innerHTML;

	window.scrollTo(0, 0);
	loadAnchors();

}

const loadAnchors = () => {
	const temp =
		Array.from(document.getElementsByTagName("a"));

	temp.forEach(t => {
		// don't listen to links for external sites
		const destination = new URL(t.href, document.baseURI);
		const root = new URL(document.baseURI);
		if (destination.origin != root.origin) return;

		anchors.push(t);
	});

	anchors.forEach(anchor => {
		// adding through browser history
		anchor.addEventListener("click", (event) => {
			event.preventDefault();
			loadPage(event.target.href, true);
		})
	});
};

// traversing through browser history
window.addEventListener("popstate", (event) => {
	loadPage(window.location.pathname, false);
})

document.addEventListener("DOMContentLoaded", () => {
	loadAnchors();
});

```

Q: TL;DR?

A: um

- `loadPage`: Loads in the contents of a page.
- `loadAnchors`: Overrides links to do SPA page loading.
- the thing that says: `"popstate"`: Allows the forward and back buttons to work on your browser.
- the thing that says: `"DOMContentLoaded"`: Calls the link overriding logic when the website is first visited (or after being refreshed).

## bug fixing

### theme buttons

Because pages aren't actually being loaded, my theme swapper breaks because it only initializes the theme swap buttons on `DOMContentLoaded`. I assumed I could just suscribe to the `popstate` event instead, but I learned that it isn't fired when `history.pushState()` is invoked. It's meant for other events like when you press the back/forward buttons on your browser, which makes sense, but unfortunately means I can't use it.

I tried doing something similar to C# events but JavaScript doesn't really have that so I'd have to shoehorn it in, and this entire deep dive is me shoehorning in features in the first place, and I didn't want to add another one to the list so I just scrapped it.

I eventually settled on listening to changes directly within the `panel` id element, which led me to one of the strangest (though accurate) class names of all time: [`MutatorObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

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

const observer = new MutationObserver(onPanelUpdated);

observer.observe(
	document.getElementById("content"),
	{ attributes: true, childList: true, subtree: true }
);
```

### super fast particles

A long standing bug that came from the original theme system was that changing the themes would make the particles in the background move at a much faster speed than what was defined in the theme. This would only be fixed by manually refreshing the paged.

I tried deleting the `<canvas>` element that it uses when selecting a new theme, and remaking it to force a reset of sorts. It didn't work so I just decided to force refresh the browser if you were attempting to load a theme that had particles.

```jsx
let initialized = false;

const setTheme = (theme) => {
	// ... omitted ...

	if (hasParticles && initialized) {
		window.location.reload();
	}
	Particles.init(particleOptions);
	initialized = true;
};
```

Definitely one of the solutions of all time (don't like global variables), but it works, and I severely doubt the JavaScript of my blog is going to get so complex that I will be significantly burdened by this decision (knock on wood lol).

### code block styling

At the time of writing the previous section, I figured I would upload a draft of the post to get a feel of how the website looked, and I realized that there was no code styling (code blocks just had mono text).

Eleventy's blog template uses Prism for syntax highlight, but I think practically all of Prisma's default styles look terrible. Besides, I needed to have the highlighting match the style of the current theme, or else it would make everything look weird.

I spend (rounded down) zero effort to figure out exactly what prism was doing for syntax highlighting, and simply just copied the CSS from a style that I liked, replacing the colours with CSS variables from the themes so they matched. I initially tried borrowing colours from other properties in the themes, but had some issues with some themes using certain variables in a different way that would make some parts of code unreadable.

I ended up taking a solution from one of the other optional theme properties and having a default value that could be overridden.

```jsx
const setTheme = (theme) => {
	/* ... omitted ... */

	root.style.setProperty(
		"--color-background-code",
		themeData.hasOwnProperty("colorBackgroundCode") ?
			themeData.colorBackgroundCode :
			"rgba(0,0,0,0)"
	);

	root.style.setProperty(
		"--color-text-code-normal",
		themeData.hasOwnProperty("colorTextCodeNormal") ?
			themeData.colorTextCodeNormal :
			themeData.colorText
	);

	/* ... omitted ... */
};
```

Having default values for optional properties ended up becoming a lot more valuable as I expanded the theme customization because every CSS property that a theme *could* set also *had* to be set to prevent styles from bleeding in to other themes that didn't support them. It also made it so existing themes could be left untouched and look the same.

## making themes

Because I want this theme system to be more than a palette swapper, it means that I actually have to come up with and create themes that weren't just recolours. This is easier said than done, because:

1. CSS is not a programming language. There isn't a general-purpose `if` statement to choose how to render stuff. I had to use JavaScript to deal with all the style logic processing, then "transfer" it to the styles via CSS variables.
2. Practically every website I've made has like no content. There isn't much ways to style a 5-option nav bar.

For example, one of the things I wanted to look into was having the option to render the header vertically— specifically, on the left of the browser window instead of the top. I've seen a few amount of websites do it and it definitely adds a certain aura that I'd like to have as an option when making themes.

Unfortunately, the logic was a pain to add. It didn't take too long— I grinded it out in a day, but it definitely wasn't clean. For reference, here's the CSS variables the `header` config modified initially:

- `--header-display`
- `--header-padding`
- `--header-background`
- `--header-divider`

And here's what I had to add to support `isVertical`:

- `--header-menu-flex-direction`
- `--header-menu-gap`
- `--header-menu-justify-content`
- `--header-justify-content`
- `--header-title-hover-before-content`
- `--header-border-radius-1`
- `--header-border-radius-2`
- `--header-border-radius-3`
- `--header-border-radius-4`
- `--header-divider-bottom`
- `--header-divider-right`

## hindsight is 20/20, but i don't have my glasses on

After I had to suffer through making a layout customization option for the themes, I thought about something:

> Why don't I just use separate CSS files?

Colours are one thing, but layout changes via CSS variables are clearly beyond what the language was ever intended for, and I definitely knew *something* was off about what I was doing. For awhile, I just assumed it was just the nature of the problem I was trying to solve.

Eventually, I looked up to see if you could just load up CSS files, and you just… can.

Hm.

### i have no original ideas

It's strange because I distinctly (well, distinctly *now*) remember that one of my inspirations for my theme system was the [CSS Zen Garden](https://csszengarden.com/), which showed off the power of CSS by allowing the website to be styled with a collection of user-submitted themes. Typing this also made me remember that I definitely did not pull this idea out of thin air like I thought I did.

Wait— even w3schools did their [own version of a theme system](https://www.w3schools.com/CSS/demo_default.htm). What???

![](/_media/w3_multiple_stylesheets_1.png)

![](/_media/w3_multiple_stylesheets_2.png)

Okay so "website themes" are definitely a solved problem that I have attempted to resolve whoops

The only argument I have for my implementation is that it's easier for a non-developer to use, because all the configuration you need is in a JavaScript object that has a clearly defined format (well, as clear as I'm going to make it).

For example, if you wanted to change the default position of the header so that it's on the side rather than on the top of the page, you can do that with a boolean.

```jsx
	"header": {
		"isVertical" : true, // (optional) boolean, default false
	},
```

If I used a file-based approach, I'd have to wrangle with CSS directly.

Q: But aren't *you* a developer? What benefits does a "style config" object give you that using CSS file don't? You have both the technical skills to work with CSS, the knowledge of how the styles are implemented (since you made them), and you would have the full power of CSS rather than a restricted system that is difficult to expand.

A: I didn't say it was good argument. Just… an argument.

Whatever. It's a deep dive, not a… smart dive. Or something.

I hate coding.

### refactoring time!!!

Honestly there was zero chance I was going to continue with my old system because it relied on creating the most atrocious CSS variables of all time to make layout configurations, the worst of the bunch being `--header-title-hover-before-content`.

The overhauled theme system adds an additional step by loading a stylesheet corresponding with the theme. Any layout properties were deleted, and I just recreated the layouts in the CSS files directly.

I was split between having completely separate CSS files for every theme, or having a base stylesheet all themes would use. I went with the latter because I think that setting CSS variables for colours was perfectly fine (along with some other "single line" deals such as `font-family`), but anything layout-based was going to be handled by the stylesheet directly. There was also a few parts of my website that I wanted to stay formatted the same no matter which theme; specifically Markdown content, the theme buttons (to have some stability when users try out different themes), and the posts page, which has this dual colour hover that I've started to use in my projects.

Anything outside the scope of CSS had to stay in JS, which at the time of writing is just the particle system. I *could* implement sound effects and make my themes more web-app-y (some of them anyways), but I figured that would be a task for future me.

## final thoughts

I think I can categorize three "tiers" of website theming:

- Dark mode support.
- Colour palettes
- Layout changes

Dark mode support is good to have on any website, and you should probably add it. Anything else is probably overkill, though.

The main issue with supporting themes is that it adds a new overhead to manage when updating a site. Full-blown layout changes need to have support for every type of page you want to have, and even colour palettes need some care if you ever decide to update your `--variables`.

I can get away with it since this website is barebones, but if (when?) it grows in complexity, I'll have to ensure that nothing looks weird on *every* theme available.

TL:DR; Add dark mode support to your websites. Anything else isn't worth the effort, unless it's fun, then it is!

(But if isn't, then it's not.)
