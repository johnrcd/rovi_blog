---
title: Website Themes
description: a tutorial on how to unnecessarily complicate a website
tags: ["webdev", "code", "css", "javascript"]
is_published: true
date: 2025-07-12
category: "deep dive"
---

In most websites, the most that you'll be able to do in terms of visual customization is toggling dark/light mode. Websites aren't really made with this functionality in mind, which makes sense— typically you want your website to have a certain look and aesthetic (brand identity?), and allowing users to change that, well— changes it.

Unfortunately, because I am one of the [Developers] of all time, I wondered if I could change that, and made a core part of [my portfolio website](https://rovidecena.com/) the ability to change how it looks dramatically from a selection of themes. My main inspiration was [daisyUI's website](https://daisyui.com/), which gives you a selection of colour palettes to choose between. They probably did it to show the functionality of the library (you can add your own themes and see how it looks with their components), but still— it's a neat feature.

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

This code is okay, but it prevents users from manually changing the color palette directly in the website, forcing them to go through their operating system settings. Sites that support dark and light mode typically have a button to toggle between them.

Because I wanted more than a dark/light theme toggle, I went with a JavaScript solution that would both support multiple colour schemes, and allow users to toggle between palettes.

NOTE: For reference, all my theme logic is handled in a singluar JavaScript file, if you're wondering where all the code is stored.

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

	const root = document.querySelector(':root');
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

Basically, `themes` is a variable storing all the themes, and `setTheme` is a function that sets the `:root` CSS properties to change the look of the website.

I realized it would be nice to store the theme somewhere so the user would always see the last palette they picked, so I just kept it in local storage, and tried to load it if the user:

```jsx
addEventListener("DOMContentLoaded", (event) => {
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if(!!themeOnLoad) {
		setTheme(themeOnLoad);
	}
	// no theme stored: load default theme
	else {
		setTheme("light");
	}
});

const setTheme = (theme) => {
	// ... omitted ...

	localStorage.setItem("theme_on_load", theme);
};
```

If you want to be really fancy, you can choose between two default themes based on the user's preferences.

```jsx
addEventListener("DOMContentLoaded", (event) => {
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if(!!themeOnLoad) {
		setTheme(themeOnLoad);
	}
	// no theme stored: load default theme
	else {
		const isDarkMode =
			window
				.matchMedia
				.("(prefers-color-scheme:dark)")
				.matches;

		const themeToLoad =
			isDarkMode ? "dark" : "light";

		setTheme(themeToLoad);
	}
});

```

I didn't do this as I wanted a specific theme to act as the default, but I think it's worth it if that isn't a concern.

### fonts, filters, and other features

The initial themes I had for my website were basic, only using solid colours. I thought it was fine at the time until one of my coding friends looked at it and roasted it.

Anyways, my solution (other than making better designs) was to add additional options for themes. Any CSS property could be changed with variables, so why not? Fonts, filters, and gradients could all be easily supported. I even realized that I could add options that weren't in CSS, and slapped a particle system on a few themes to add some interest in the background.

By this point, the information for an individual theme was getting a bit out there, but that was fine. There's a lot of information when styling a website anyways, and I only had four themes which made it managable.

For reference, here's the information for the default theme (with some information truncated):

```jsx
const themes = {
	"midnight": {
		"fontFamily"       : '"Manrope", "Poppins", sans-serif',
		"colorTextTitle"   : "#EEEEEE",
		"colorTextHeader"  : "#B9E7E9",
		"colorTextSupport" : "#85A7A8",
		"colorText"        : "#C2C7C7",
		"svgFilter"        : "invert(97%) sepia(3%)...",
		"colorBg"          : "linear-gradient(...)",
		"colorBgHeader"    : "rgba(0, 0, 0, 0)",
		"glassBg"          : "rgba(255, 255, 255, 0.02)",
		"selectionText"    : "#000000",
		"selectionBg"      : "rgb(122, 255, 252)",
		"particleOptions"  : {
			selector: '.background',
			color: "#1d3243",
			connectParticles: true,
			speed: 0.1,
			maxParticles: 100,
			minDistance: 120,
			responsive: [
				{ breakpoint: 1440, options: { maxParticles: 100,} },
				{ breakpoint: 1200, options: { maxParticles: 75, } },
				{ breakpoint: 768,  options: { maxParticles: 50, } },
				{ breakpoint: 576,  options: { maxParticles: 0,  } },
			],
		}
	},
	/* ... omitted ... */
}
```

## single page application

For version 2.0 of my blog (the current one at the time of writing), I wanted to expand on the palette system, and make it a fully fledged theme system. I originally built it because I wanted something to make my portfolio stand out, but I liked it enough to want to put it in my other websites.

I first ported the existing system to the blog as it was, and while that went smooth, it exposed a glaring flaw that I'd have to fix:

Changing pages.

There was this hitch that occurred every time you loaded a new page, where the default styling would be shown momentarily before the current theme would load. This happened on my portfolio as well, but since it's literally just a single page, you wouldn't see it for very long (if you noticed it at all).

Also, because a theme would be initialized on every page load, it meant that any theme that used particles would have them reset on every page, which was jarring. This was especially bad because the themes that use the particle systems use them in a "floating background" style, where the website looks as if it's held on a panel floating on an unmoving background.

The most obvious (and probably only real) solution was to turn my website into an SPA (Single Page Application), where instead of loading a different page/file in its entirety, it simply updates the parts of the page that needs to be changed. That means that both the styles and particles can remain untouched (and consequently, don't need to load) because they aren't changed when a new page is loaded.

The problem was doing that in the first place.

Eleventy is a static site generator, and has [zero support for an SPA](https://www.11ty.dev/docs/single-page-applications/#:~:text=If%20you%E2%80%99d%20like%20to%20build%20a%20single%20page%20application%20(SPA)%2C%20Eleventy%20probably%20isn%E2%80%99t%20the%20right%20tool.), so I'd have to make it myself, but at the time that wasn't even a concept for me. An SPA in my mind was something done by whatever framework you were using. If the framework didn't do it, how could you?

I was close to giving up and rewriting the site in Next.js or something, but I stumbled on [this repository](https://github.com/learosema/eleventy-mini-spa) by [learosema](https://github.com/learosema/) demonstrating an Eleventy website with SPA functionality. Rather than simply traversing to the page you want to go to, it *fetches* its content and overrides the existing page content. It honestly blew my mind a bit thinking about it because it effectively allowed you to turn a traditional static site (MPA). It was especially cool considering that it was just powered by a script less than 100 lines long.

My solution deviates a bit from hers— I subscribe to anchor tags directly rather than processing each click in the browser, and I had to deal with a bunch of issues that may or may not have existed in hers— getting hash links to work, making sure I didn't try to load the contents of page from a *different* website, and some other stuff I forgot about. It took a while to get it to work without hiccups, but eventually I came up with something like this:

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

I think it's a little messy, but it's been working well enough for me so far. I'm pretty sure you can slap a `content` id on your body tag, add the script to your website, and have it work out-of-the-box (assuming that every single page you have has the exact same content in the `<head>` tag except for the `<title>`),

There's also probably some issues that come with website performance, but fixing the theme jitter took priority over anything else. I also didn't see a noticable difference during development.[^_performance]

[^_performance]: I don't see how there can be a noticable difference between loading in a page normally, and the SPA method where I use fetch and update the DOM. A fetch and normal page load are getting the same information, and updating the DOM isn't that slow. I know React has their virtual DOM to reduce operations but there's only ever one operation being performed— swapping the contents of `#content`. Then again, I haven't performance tested any of this (apart from using the throttling feature on Chrome DevTools), so I'm probably wrong to some degree.

Q: this is too technical i can't code/bro i don't want to read all of that just summerize it

A: um

- `loadPage`: Loads in the contents of a page.
- `loadAnchors`: Overrides links to do SPA page loading.
- the thing that says: `"popstate"`: Allows the forward and back buttons to work on your browser.
- the thing that says: `"DOMContentLoaded"`: Calls the link overriding logic when the website is first visited (or after refreshing your browser).

## bug fixing

There ended up being issues with transitioning the website to an SPA, along with other problems with the theme system that needed to be addressed.

### theme buttons

Because pages aren't actually being loaded, my theme swapper breaks because it only initializes the theme swap buttons on `DOMContentLoaded`. I assumed I could just suscribe to the `popstate` event instead, but I learned that it isn't fired when `history.pushState()` is invoked. It's meant for other events like when you press the back/forward buttons on your browser, which makes sense, but unfortunately means I can't use it.

I tried doing something similar to C# events but JavaScript doesn't have (Let me make my events please!!!). I eventually settled on listening to changes directly within the `panel` id element, which led me to one of the strangest (though accurate) class names of all time: [`MutatorObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

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

A long standing bug that came from the original theme system was that changing the themes would make the particles in the background move at a much faster speed than what was defined in the theme. This would only be fixed by manually refreshing the page.

There wasn't a clean solution I could find (although I didn't look very long), so I just decided to refresh the browser if you were attempting to load a theme. I had to add an `initialized` variable which reminded me of the game code I'd need to write sometimes:

```jsx
let initialized = false;

const setTheme = (theme) => {
	// ... omitted ...

	if (initialized) {
		window.location.reload();
	}
	Particles.init(particleOptions);
	initialized = true;
};
```

### code block styling

At some point during development, I imported a post with a code block and realized that I had no styling for them.

Eleventy's blog template (the closest thing to an official tutorial repository) uses Prism for syntax highlighting, but I think all of Prism's styles look terrible, so I wanted to make something myself. Plus, I also needed the blocks to fit the theme they were in.

I opted to extend the theme system to have code style properties, mainly colours but also borders and background color since it would be nice for some themes. There seems to be some process in Markdown regarding how code blocks are converted in HTML where based on the coding language, classes are assigned to the necessary keywords and what not.

Unfortunately, I did not want to figure that out at all, so I simply copied the CSS code from the Prism style I tolerated the most, replaced a few (mostly color) CSS properties with ones that were set by the themes, and removed code that I didn't understand or that didn't seem to be doing anything.

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

I can get away with it since this website is barebones, but if (when?) it grows in complexity, I'll have to ensure that nothing looks wrong on *every* theme available.

TL:DR; Add dark mode support to your websites. Anything else isn't worth the effort, unless it's fun, then it is!

(But if isn't, then it's not.)
