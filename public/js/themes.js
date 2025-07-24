let initialized = false;
let currentTheme = null;

const themePrefix = "CURRENT_THEME_CSS_";
const themeRootPath = "/css/themes/";

// note: don't put ;'s at the end of the values -- it doesn't apply the css
const themes = {
	"TEMPLATE_do_not_use_as_actual_theme": {
		// NOTE: REMOVE A PROPERTY IF YOU DONT PLAN ON SETTING IT
		//       "" IS NOT UNUSED
		//       ONLY (optional) PROPERTIES CAN BE REMOVED

		"fontNormal" : "",          // font family
		"fontMono" : "",            // font family
		"fontWeight" : "",          // (optional) font weight (300, 400), default 400
		"isNormalFontMono" : false, // (optional) boolean, default false

		// DOES NOT WORK:
		// creates permanent scroll bar
		"zoom" : "", // percentage/number, default 100%

		"colorText" : "blue",         // color value
		"colorTextAccent" : "blue",   // color value
		"colorBackground" : "",       // color value (because gradients, this may be super long)

		// optional values for code blocks
		// set these if the default values aren't good

		"code" : { // (optional)
			"colorBackground" : "",       // (optional) color value, default is "rgba(0, 0, 0, 0)"
			"colorBackgroundInline" : "", // (optional) color value, default is "rgba(0, 0, 0, 0)"
			"colorTextNormal" : "",       // (optional) color value, default copies colorText
			"colorTextKeyword" : "",      // (optional) color value, default copies colorTextAccent
			"colorTextSymbol" : "",       // (optional) color value, default copies highlightBackground
			"colorTextComment" : "",      // (optional) color value, default copies highlightBackgroundSecondary
			"border" : "",                // (optional) css border, default value 1px solid var(--color-text-accent);
			"radius" : "",                // (optional) units (px), default 0
		},

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

		// if set, allows for particles
		// see https://github.com/marcbruederlin/particles.js for details
		"particles" : "" // (optional) particle.js json config
	},
	"midnight" : {
		"fontNormal" : '"Manrope", "Poppins", "Open Sans", sans-serif',
		"fontMono" : "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",

		"colorText" : "#EEEEEE",
		"colorTextAccent" : "#85A7A8",
		"colorBackground" : "linear-gradient(233deg, rgba(1,2,8,1) 0%, rgba(4,14,24,1) 11%, rgba(5,17,19,1) 33%, rgba(6,16,24,1) 48%, rgba(6,12,20,1) 67%, rgba(6,9,22,1) 87%, rgba(3,9,22,1) 100%)",

		"colorBackgroundCode" : "rgba(1,2,8,1)",
		"colorTextCodeSymbol" : "#7bc5b1ff",
		"colorTextCodeComment" : "rgba(110, 108, 123, 1)",

		"code" : {
			"colorBackground" : "rgba(1,2,8,1)",
			"colorTextSymbol" : "#7bc5b1ff",
			"colorTextComment" : "rgba(110, 108, 123, 1)",
		},

		"selectionColor" : "#000000",
		"selectionBackground" : "rgb(122, 255, 252)",

		"highlightColor" : "inherit",
		"highlightBackground" : "rgba(68, 107, 106, 0.4)",
		"highlightColorSecondary" : "inherit",
		"highlightBackgroundSecondary" : "rgba(68, 107, 106, 0.25)",

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
		"fontMono" : "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",

		"colorText" : "#EEEEEE",
		"colorTextAccent" : "#ffaa75",
		"colorBackground" : "linear-gradient(320deg, rgba(156,85,13,1) 0%, rgba(140,41,71,1) 53%, rgba(75,19,79,1) 100%)",

		"colorBackgroundCode" : "rgba(1, 2, 8, 0.7)",
		"colorTextCodeSymbol" : "#ffb647",
		"colorTextCodeComment" : "rgba(167, 102, 37, 1)",

		"code" : {
			"colorBackground" : "rgba(1, 2, 8, 0.7)",
			"colorTextSymbol" : "#ffb647",
			"colorTextComment" : "rgba(167, 102, 37, 1)",
		},

		"selectionColor" : "#000000",
		"selectionBackground" : "#ffaa75",

		"highlightColor" : "#000000",
		"highlightBackground" : "#ffb647",
		"highlightColorSecondary" : "#000000",
		"highlightBackgroundSecondary" : "#ffaa75",

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
	"isabelle": {
		"fontNormal" : '"MS UI Gothic", "Comic Neue", cursive',
		"fontWeight" : "600",
		"fontMono" : "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",

		"colorText" : "#501b38ff",
		"colorTextAccent" : "#7d4a6dff",
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

		"code" : {
			"colorBackground" : "#fddaf1ff",
			"colorTextNormal" : "",  // (optional) color value, default copies colorText
			"colorTextKeyword" : "", // (optional) color value, default copies colorTextAccent
			"colorTextSymbol" : "",  // (optional) color value, default copies highlightBackground
			"colorTextComment" : "", // (optional) color value, default copies highlightBackgroundSecondary
			"border": "2px dotted rgba(213, 67, 120, 1)",
			"radius": "16px",
		},

		// used when you drag click over stuff
		// should be very high contrast
		"selectionColor" : "#ffffffff",      // color value
		"selectionBackground" : "rgba(202, 50, 106, 1)", // color value

		// used for hoverable elements that change background and color
		"highlightColor" : "#ffffffff",      // color value
		"highlightBackground" : "rgba(226, 134, 168, 1)", // color value

		// niche colors used for lists with "two parts" -- a primary and secondary
		// e.g. lists of posts will include the title (primary)
		//      and date the(secondary)

		"highlightColorSecondary" : "#ffffffff",      // (optional) color value
		"highlightBackgroundSecondary" : "rgba(226, 99, 146, 1)", // (optional) color value
	},
	"terminal": {
		"fontNormal" : '"IBM Plex Mono", monospace',
		"fontMono" : '"IBM Plex Mono", monospace',
		"isNormalFontMono" : true,

		"colorText" : "#d1d6d6",
		"colorTextAccent" : "#b9e9bf",
		"colorBackground" : "#000000",

		"code" : {
			"colorTextComment" : "#749178ff",
			"colorBackgroundInline" : "#151b16ff",
		},

		"selectionColor" : "#000000",
		"selectionBackground" : "#b9e9bf",

		"highlightColor" : "#000000",
		"highlightBackground" : "#b9e9bf",
	},
	"ultraviolet": {
		"fontNormal" : "'Inter Tight', Overpass, Arial, Helvetica, sans-serif",
		"fontMono" : "monospace",

		"colorText" : "rgb(240, 240, 240)",
		"colorTextAccent" : " rgb(200, 0, 250)",
		"colorBackground" : "rgb(7, 7, 7)",

		"code" : {
			"colorTextKeyword" : "rgba(223, 96, 255, 1)",
			"colorTextSymbol" : "rgba(220, 82, 255, 1)",
			"colorTextComment" : "rgba(158, 33, 216, 1)",
			"border": "1px dashed rgba(158, 33, 216, 1)",
			"radius": "8px",
		},

		"selectionColor" : "rgb(7, 7, 7)",
		"selectionBackground" : "rgb(240, 240, 240)",

		"highlightColor" : "rgb(7, 7, 7)",
		"highlightBackground" : "rgb(200, 0, 250)",
		"highlightColorSecondary" : "rgb(240, 240, 240)",
		"highlightBackgroundSecondary" : "rgb(85, 0, 125)",
	},
	"serenity" : {
		"fontNormal" : '"Merriweather", serif',
		"fontMono" : "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",

		"colorText" : "#000000",
		"colorTextAccent" : "#FF7A30",
		"colorBackground" : "#E9E3DF",

		"code" : {
			"colorBackground" : "#fcdccbff",
			"colorBackgroundInline": "#e3c3b1ff",
			"colorTextNormal" : "#000000",  // (optional) color value, default copies colorText
			"colorTextKeyword" : "#000000", // (optional) color value, default copies colorTextAccent
			"colorTextSymbol" : "#000000",  // (optional) color value, default copies highlightBackground
			"colorTextComment" : "#000000", // (optional) color value, default copies highlightBackgroundSecondary
			"border": "2px dotted #FF7A30",
			"radius": "0px",
		},

		"selectionColor" : "#000000",
		"selectionBackground" : "rgb(122, 255, 252)",

		"highlightColor" : "#000000",
		"highlightBackground" : "#FF7A30",
		"highlightColorSecondary" : "#000000",
		"highlightBackgroundSecondary" : "#e3986fff",
	},
}

addEventListener("DOMContentLoaded", (event) => {
	console.log("Loading theme initializer...");

	// load themes

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
	const old_buttons = document.getElementsByClassName("themeGroup__button");
	for (let i = 0; i < old_buttons.length; i++) {
		old_buttons[i].removeEventListener("click", setTheme);
	}

	const collection = document.getElementsByClassName("themeGroup__button");

	for (let i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click", (event) => {
			setTheme(collection[i].innerText);
		});
	}
};

const setTheme = async (theme) => {
	if (!(theme in themes)) {
		throw new Error(`Theme \"${theme}\" not defined in theme library.`);
	}

	// delete old theme if exists
	if (currentTheme != null) {
		const previousTheme = document.getElementById(themePrefix + theme);
		previousTheme?.remove();
	}

	// create new theme
	currentTheme = theme;

	const element = document.createElement("link");

	element.rel = "stylesheet"; // For a stylesheet
	element.href = themeRootPath + theme + ".css";
	element.type = "text/css"; // Optional, but good practice for stylesheets

	document.head.appendChild(element);

	console.log(`Loading theme: ${theme}`);

	const themeData = themes[theme];
	const root = document.querySelector(':root');

	root.style.setProperty("--font-normal", themeData.fontNormal);
	root.style.setProperty("--font-mono",   themeData.fontMono);
	root.style.setProperty("--font-weight", 400);

	root.style.setProperty("--code-inline-margins", "0 0.15rem");

	if (themeData.hasOwnProperty("fontWeight")) {
		root.style.setProperty("--font-weight", themeData.fontWeight);
	}

	if (themeData.hasOwnProperty("isNormalFontMono")) {
		root.style.setProperty(
			"--code-inline-margins",
			themeData.isNormalFontMono ? "0" : "0 0.15rem"
		);
	}

	root.style.setProperty("--color-text",              themeData.colorText            );
	root.style.setProperty("--color-text-accent",       themeData.colorTextAccent      );
	root.style.setProperty("--color-background",        themeData.colorBackground      );

	root.style.setProperty("--selection-color",         themeData.selectionColor       );
	root.style.setProperty("--selection-background",    themeData.selectionBackground  );

	root.style.setProperty("--highlight-color",         themeData.highlightColor       );
	root.style.setProperty("--highlight-background",    themeData.highlightBackground  );

	root.style.setProperty("--code-color-background",         "rgba(0,0,0,0)"                      );
	root.style.setProperty("--code-color-background-inline",  "rgba(0,0,0,0)"                      );
	root.style.setProperty("--code-color-text-normal",        "var(--color-text)"                    );
	root.style.setProperty("--code-color-text-keyword",       "var(--color-text-accent)"             );
	root.style.setProperty("--code-color-text-symbol",        "var(--highlight-background)"          );
	root.style.setProperty("--code-color-text-comment",       "var(--highlight-background-secondary)");
	root.style.setProperty("--code-border",                   "1px solid var(--color-text-accent)"   );
	root.style.setProperty("--code-radius",                   "0"                                    );

	if (themeData.hasOwnProperty("code")) {
		if (themeData.code.hasOwnProperty("colorBackground")) {
			root.style.setProperty("--code-color-background", themeData.code.colorBackground);
		}

		if (themeData.code.hasOwnProperty("colorBackgroundInline")) {
			root.style.setProperty("--code-color-background-inline", themeData.code.colorBackgroundInline);
		}

		if (themeData.code.hasOwnProperty("colorTextNormal")) {
			root.style.setProperty("--code-color-text-normal", themeData.code.colorTextNormal);
		}

		if (themeData.code.hasOwnProperty("colorTextKeyword")) {
			root.style.setProperty("--code-color-text-keyword", themeData.code.colorTextKeyword);
		}

		if (themeData.code.hasOwnProperty("colorTextSymbol")) {
			root.style.setProperty("--code-color-text-symbol", themeData.code.colorTextSymbol);
		}

		if (themeData.code.hasOwnProperty("colorTextComment")) {
			root.style.setProperty("--code-color-text-comment", themeData.code.colorTextComment);
		}

		if (themeData.code.hasOwnProperty("border")) {
			root.style.setProperty("--code-border", themeData.code.border);
		}

		if (themeData.code.hasOwnProperty("radius")) {
			root.style.setProperty("--code-radius", themeData.code.radius);
		}
	}

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
	if (initialized) {
		window.location.reload();
	}

	initialized = true;
};

const onPanelUpdated = () => {
	bindThemeButtons();
};

const observer = new MutationObserver(onPanelUpdated);

observer.observe(
	document.getElementById("content"),
	{ attributes: true, childList: true, subtree: true }
);
