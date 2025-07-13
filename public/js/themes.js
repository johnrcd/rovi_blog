let initialized = false;

// note: don't put ;'s at the end of the values -- it doesn't apply the css
const themes = {
	"TEMPLATE_do_not_use_as_actual_theme": {
		// NOTE: REMOVE A PROPERTY IF YOU DONT PLAN ON SETTING IT
		//       "" IS NOT UNUSED
		//       ONLY (optional) PROPERTIES CAN BE REMOVED

		"fontNormal" : "", // font family
		"fontMono" : "",   // font family
		"fontWeight" : "", // (optional) font weight (300, 400), default 400

		"zoom" : "", // percentage/number, default 100%

		"colorText" : "blue",         // color value
		"colorTextAccent" : "blue",   // color value
		"colorBackground" : "",       // color value (because gradients, this may be super long)

		// optional values for code blocks
		// set these if the default values aren't good

		"colorBackgroundCode" : "",  // (optional) color value, default is "rgba(0, 0, 0, 0)"
		"colorTextCodeNormal" : "",  // (optional) color value, default copies colorText
		"colorTextCodeKeyword" : "", // (optional) color value, default copies colorTextAccent
		"colorTextCodeSymbol" : "",  // (optional) color value, default copies highlightBackground
		"colorTextCodeComment" : "", // (optional) color value, default copies highlightBackgroundSecondary

		// used when you drag click over stuff
		// should be very high contrast
		"selectionColor" : "",      // color value
		"selectionBackground" : "", // color value

		// used for hoverable elements that change background and color
		"highlightColor" : "",      // color value
		"highlightBackground" : "", // color value

		// niche colors used for lists with "two parts" -- a primary and secondary
		// e.g. lists of posts will include the title (primary)
		//      and date the(secondary)

		"highlightColorSecondary" : "",      // (optional) color value
		"highlightBackgroundSecondary" : "", // (optional) color value

		// see information in _root.css for more information on what the panel is
		"panel": { // (optional)
			"spacing" : "",    // (optional) units (px), default 64px
			"width" : "",      // (optional) units (px, ch), default 80ch
			"border": "",      // (optional) css border, default none
			"background" : "", // (optional) css color, default rgba(0,0,0,0)
			"padding" : "",    // (optional) units (px, em), default 0
			"radius" : "",     // (optional) units (px), default 0
		},

		"header": { // (optional)
			// note: on mobile, title will always be at the top
			"titleOnTop" : true, // (optional) boolean
			"boldTitle": true,   // (optional) boolean
			"padding": "",       // (optional) units (px)
			"background" : "",   // (optional) css color, default rgba(0,0,0,0)
			"divider" : "",      // (optional) css border, default 1px solid var(--color-text)
		},

		// used to greate a glassmorphism effect for the panel
		// this is separated from the rest of panel because i generate the values
		// of these properties using https://css.glass/

		// you can use this instead of panel if there's a property that panel
		// doesn't have, but not recommended since glass has a very specific
		// intended use case
		"glass" : { // (optional)
			"background" : "", // (optional) color value, overrides panel.background
			"radius" : "",     // (optional) units (px), overrides panel.radius
			"shadow" : "",     // (optional) css box-shadow, default 0
			"filter": "",      // (optional) css filter, default none
			"border" : "",     // (optional) css border, default border
		},

		// if set, allows for particles
		// see https://github.com/marcbruederlin/particles.js for details
		"particles" : "" // (optional) particle.js json config
	},
	"midnight" : {
		"fontNormal" : '"Manrope", "Poppins", "Open Sans", sans-serif',
		"fontMono" : "monospace",

		"colorText" : "#EEEEEE",
		"colorTextAccent" : "#85A7A8",
		"colorBackground" : "linear-gradient(233deg, rgba(1,2,8,1) 0%, rgba(4,14,24,1) 11%, rgba(5,17,19,1) 33%, rgba(6,16,24,1) 48%, rgba(6,12,20,1) 67%, rgba(6,9,22,1) 87%, rgba(3,9,22,1) 100%)",

		"colorBackgroundCode" : "rgba(1,2,8,1)",
		"colorTextCodeSymbol" : "#7bc5b1ff",
		"colorTextCodeComment" : "rgba(110, 108, 123, 1)",

		"selectionColor" : "#000000",
		"selectionBackground" : "rgb(122, 255, 252)",

		"highlightColor" : "inherit",
		"highlightBackground" : "rgba(68, 107, 106, 0.4)",
		"highlightColorSecondary" : "inherit",
		"highlightBackgroundSecondary" : "rgba(68, 107, 106, 0.25)",

		"panel": {
			"spacing" : "64px",
			"width" : "60ch",
			"padding" : "16px",
		},

		"header": {
			"titleOnTop" : false,
			"boldTitle": true,
			"padding": "8px",
		},

		"glass" : {
			"background" : "rgba(255, 255, 255, 0.02)",
			"radius" : "16px",
			"shadow" : "0 4px 16px rgba(0, 0, 0, 0)",
			"filter": "blur(3.3px)",
			"border" : "1px solid rgba(255, 255, 255, 0)",
		},

		"particles" : {
			selector: '.background',
			color: "#1d3243",
			connectParticles: true,
			speed: 0.1,
			maxParticles: 100,
			minDistance: 120,
			responsive: [
				{ breakpoint: 1440, options: { maxParticles: 100, }, },
				{ breakpoint: 1200, options: { maxParticles: 75,  }, },
				{ breakpoint: 768,  options: { maxParticles: 50,  }, },
				{ breakpoint: 576,  options: { maxParticles: 0,   }, },
			],
		},
	},
	"sunset" : {
		"fontNormal" : '"Poppins", "Open Sans", sans-serif',
		"fontMono" : "monospace",

		"colorText" : "#EEEEEE",
		"colorTextAccent" : "#ffaa75",
		"colorBackground" : "linear-gradient(320deg, rgba(156,85,13,1) 0%, rgba(140,41,71,1) 53%, rgba(75,19,79,1) 100%)",

		"colorBackgroundCode" : "rgba(1, 2, 8, 0.7)",
		"colorTextCodeSymbol" : "#ffb647",
		"colorTextCodeComment" : "rgba(167, 102, 37, 1)",

		"selectionColor" : "#000000",
		"selectionBackground" : "#ffaa75",

		"highlightColor" : "#000000",
		"highlightBackground" : "#ffb647",
		"highlightColorSecondary" : "#000000",
		"highlightBackgroundSecondary" : "#ffaa75",

		"panel": {
			"spacing" : "64px",
			"width" : "60ch",
			"padding" : "16px",
		},

		"header": {
			"titleOnTop" : false,
			"boldTitle": true,
			"padding": "8px",
		},

		"glass" : {
			"background" : "rgba(70, 20, 35, 0.18)",
			"radius" : "16px",
			"shadow" : "0 4px 16px rgba(0, 0, 0, 0)",
			"filter": "blur(3.3px)",
			"border" : "1px solid rgba(255, 255, 255, 0.15)",
		},

		"particles" : {
			selector: '.background',
			color: "AAAAAA",
			connectParticles: true,
			speed: 0.05,
			maxParticles: 200,
			minDistance: 150,
			responsive: [
				{ breakpoint: 1440, options: { maxParticles: 200, }, },
				{ breakpoint: 1200, options: { maxParticles: 120, }, },
				{ breakpoint: 768,  options: { maxParticles: 60,  }, },
				{ breakpoint: 576,  options: { maxParticles: 25,  }, },
			],
		},
	},
	"molly": {
		"fontNormal" : '"MS UI Gothic", "Comic Neue", cursive', // font family
		"fontWeight" : "600",
		"fontMono" : "monospace",   // font family

		"colorText" : "#501b38ff",
		"colorTextAccent" : "#7d4a6dff",   // color value
		// https://theplusaddons.com/blog/pastel-gradient-backgrounds-for-elementor/
		// https://codepen.io/MHLut/pen/JKEjJK?editors=1100
		// https://codepen.io/JeanQuicheLait/pen/XWdZNwG
		"colorBackground" :
			`repeating-linear-gradient(
				-45deg,
				transparent,
				transparent 1em,
				rgba(235, 127, 245, 0.4) 0,
				rgba(235, 127, 245, 0.1) 2em,
				transparent 0,
				transparent 1em,
				rgba(235, 127, 245, 0.3) 0,
				rgba(235, 127, 245, 0.2) 4em,
				transparent 0,
				transparent 1em,
				rgba(192, 235, 250, 0.6) 0,
				rgba(192, 235, 250, 0.2) 2em
			), repeating-linear-gradient(
				45deg,
				transparent,
				transparent 1em,
				rgba(235, 127, 245, 0.4) 0,
				rgba(235, 127, 245, 0.1) 2em,
				transparent 0,
				transparent 1em,
				rgba(235, 127, 245, 0.3) 0,
				rgba(235, 127, 245, 0.2) 4em,
				transparent 0,
				transparent 1em,
				rgba(192, 235, 250, 0.4) 0,
				rgba(192, 235, 250, 0.1)
				2em
			), #FFF`,
		"zoom" : "115%",

		// used when you drag click over stuff
		// should be very high contrast
		"selectionColor" : "",      // color value
		"selectionBackground" : "", // color value

		// used for hoverable elements that change background and color
		"highlightColor" : "",      // color value
		"highlightBackground" : "", // color value

		// niche colors used for lists with "two parts" -- a primary and secondary
		// e.g. lists of posts will include the title (primary)
		//      and date the(secondary)

		"highlightColorSecondary" : "",      // (optional) color value
		"highlightBackgroundSecondary" : "", // (optional) color value

		// see information in _root.css for more information on what the panel is
		"panel": { // (optional)
			"spacing" : "64px", // (optional) units (px)
			"width" : "80ch",   // (optional) units (px, ch)
			"border": "2px solid rgba(213, 67, 120, 1)",
			"radius": "16px",
			"background" : "#FFECF8",
			"padding" : "16px",
		},

		"header": { // (optional)
			// note: on mobile, title will always be at the top
			"titleOnTop" : true, // (optional) boolean
			"boldTitle": true,   // (optional) boolean
			"padding": "",       // (optional) units (px)
			"background" : "#FFD3EF",
			"divider" : "2px dotted rgba(213, 67, 120, 1)",
		},
	},
}

// --non-photo-blue: #b8ebf4ff;
// --celadon: #abd8bdff;
// --night: #121113ff;
// --cherry-blossom-pink: #fbb1c2ff;
// --magnolia: #f6f2ffff;

addEventListener("DOMContentLoaded", (event) => {
	console.log("Loading theme initializer...");
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if (themeOnLoad in themes) {
		setTheme(themeOnLoad);
	}
	else {
		setTheme("midnight");
	}

	bindThemeButtons();
});

const bindThemeButtons = () => {
	// prevent events from stacking onto the same button
	const old_buttons = document.getElementsByClassName("themes__button");
	for (let i = 0; i < old_buttons.length; i++) {
		old_buttons[i].removeEventListener("click", setTheme);
	}

	const collection = document.getElementsByClassName("themes__button");

	for (let i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click", (event) => {
			setTheme(collection[i].innerText);
		});
	}
};

const setTheme = (theme) => {
	if (!(theme in themes)) {
		throw new Error(`Theme \"${theme}\" not defined in theme library.`);
	}

	console.log(`Loading theme: ${theme}`);

	const themeData = themes[theme];
	const root = document.querySelector(':root');

	root.style.setProperty("--font-normal", themeData.fontNormal);
	root.style.setProperty("--font-mono",   themeData.fontMono);
	root.style.setProperty("--font-weight", 400);

	if (themeData.hasOwnProperty("fontWeight")) {
		root.style.setProperty("--font-weight", themeData.fontWeight);
	}

	root.style.setProperty(
		"--zoom",
		themeData.hasOwnProperty("zoom") ?
			themeData.zoom :
		"100%"
	);

	root.style.setProperty("--color-text",              themeData.colorText            );
	root.style.setProperty("--color-text-accent",       themeData.colorTextAccent      );
	root.style.setProperty("--color-background",        themeData.colorBackground      );

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

	root.style.setProperty(
		"--color-text-code-keyword",
		themeData.hasOwnProperty("colorTextCodeKeyword") ?
			themeData.colorTextCodeKeyword :
			themeData.colorTextAccent
	);

	root.style.setProperty(
		"--color-text-code-symbol",
		themeData.hasOwnProperty("colorTextCodeSymbol") ?
			themeData.colorTextCodeSymbol :
			themeData.highlightBackground
	);

	root.style.setProperty("--selection-color",         themeData.selectionColor       );
	root.style.setProperty("--selection-background",    themeData.selectionBackground  );

	root.style.setProperty("--highlight-color",         themeData.highlightColor       );
	root.style.setProperty("--highlight-background",    themeData.highlightBackground  );

	root.style.setProperty(
		"--highlight-color-secondary",
		themeData.hasOwnProperty("highlightColorSecondary") ?
			themeData.highlightColorSecondary :
			themeData.highlightColor
	);

	root.style.setProperty(
		"--highlight-background-secondary",
		themeData.hasOwnProperty("highlightBackgroundSecondary") ?
			themeData.highlightBackgroundSecondary :
			themeData.highlightBackground
	);

	root.style.setProperty(
		"--color-text-code-comment",
		themeData.hasOwnProperty("colorTextCodeComment") ?
			themeData.colorTextCodeComment :
			"var(--highlight-background-secondary)"
	);

	root.style.setProperty("--panel-spacing", "   64px"         );
	root.style.setProperty("--panel-width",      "60ch"         );
	root.style.setProperty("--panel-border",     "0"            );
	root.style.setProperty("--panel-background", "rgba(0,0,0,0)");
	root.style.setProperty("--panel-radius"    , "0"            );
	root.style.setProperty("--panel-shadow"    , "0"            );
	root.style.setProperty("--panel-filter"    , "none"         );
	root.style.setProperty("--panel-border"    , "0"            );
	root.style.setProperty("--panel-padding"   , "0"            );

	if (themeData.hasOwnProperty("panel")) {
		if (themeData.panel.hasOwnProperty("width")) {
			root.style.setProperty("--panel-width"  , themeData.panel.width);
		}

		if (themeData.panel.hasOwnProperty("spacing")) {
			root.style.setProperty("--panel-spacing", themeData.panel.spacing);
		}

		if (themeData.panel.hasOwnProperty("border")) {
			root.style.setProperty("--panel-border", themeData.panel.border);
		}

		if (themeData.panel.hasOwnProperty("background")) {
			root.style.setProperty("--panel-background", themeData.panel.background);
		}

		if (themeData.panel.hasOwnProperty("padding")) {
			root.style.setProperty("--panel-padding", themeData.panel.padding);
		}

		if (themeData.panel.hasOwnProperty("radius")) {
			root.style.setProperty("--panel-radius", themeData.panel.radius);
		}
	}

	if (themeData.hasOwnProperty("glass")) {
		root.style.setProperty("--panel-background", themeData.glass.background);
		root.style.setProperty("--panel-radius"    , themeData.glass.radius    );
		root.style.setProperty("--panel-shadow"    , themeData.glass.shadow    );
		root.style.setProperty("--panel-filter"    , themeData.glass.filter    );
		root.style.setProperty("--panel-border"    , themeData.glass.border    );
	}

	root.style.setProperty("--header-background", "rgba(0,0,0,0)");
	root.style.setProperty("--header-divider"   , "1px solid var(--color-text)");

	if (themeData.hasOwnProperty("header")) {
		if (themeData.header.hasOwnProperty("padding")) {
			root.style.setProperty("--header-padding", themeData.header.padding);
		}

		if (themeData.header.hasOwnProperty("titleOnTop")) {
			const isTitleOnTop = themeData.header.titleOnTop;
			const flexDirection = isTitleOnTop ? "column" : "row";

			root.style.setProperty("--header-flex-direction", flexDirection);

			const paddingTop = isTitleOnTop ?
				"var(--header-padding)" :
				"calc(var(--header-padding) - var(--panel-radius))";

			root.style.setProperty("--header-padding-top", paddingTop);
		}

		if (themeData.header.hasOwnProperty("boldTitle")) {
			const fontWeight = themeData.header.boldTitle ? 700 : "var(--font-weight)";
			root.style.setProperty("--header-title-weight", fontWeight);
		}

		if (themeData.header.hasOwnProperty("background")) {
			root.style.setProperty("--header-background", themeData.header.background);
		}

		if (themeData.header.hasOwnProperty("divider")) {
			root.style.setProperty("--header-divider", themeData.header.divider);
		}
	}

	const hasParticles = themeData.hasOwnProperty("particles")
	const particleOptions = themeData.hasOwnProperty("particles") ?
		themeData.particles : {
			selector: '.background',
			maxParticles: 0,
			responsive: [
				{ breakpoint: 1440, options: { maxParticles: 0, }, },
				{ breakpoint: 1200, options: { maxParticles: 0, }, },
				{ breakpoint: 768,  options: { maxParticles: 0, }, },
				{ breakpoint: 576,  options: { maxParticles: 0, }, },
			],
		};

	Particles.init(particleOptions);

	localStorage.setItem("theme_on_load", theme);

	// reinitializing the particle system causes the particles to move superfast
	// hotfix is to simply refresh page (spa my ass...)
	if (hasParticles && initialized) {
		window.location.reload();
	}

	initialized = true;
};

const onPanelUpdated = () => {
	bindThemeButtons();
};

const observer = new MutationObserver(onPanelUpdated);

observer.observe(
	document.getElementsByClassName("panel")[0],
	{ attributes: true, childList: true, subtree: true }
);
