// note: don't put ;'s at the end of the values -- it doesn't apply the css
const themes = {
	"TEMPLATE_do_not_use_as_actual_theme": {
		// NOTE: REMOVE A PROPERTY IF YOU DONT PLAN ON SETTING IT
		//       "" IS NOT UNUSED
		//       ONLY (optional) PROPERTIES CAN BE REMOVED

		"fontNormal" : "", // font family
		"fontMono" : "",   // font family

		"colorText" : "blue",         // color value
		"colorTextAccent" : "blue",   // color value
		"colorBackground" : "",       // color value (because gradients, this may be super long)

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
		"highlightBackgroundSecondary" : "", // (optional) / color value

		// see information in _root.css for more information on what the panel is
		"panel": { // (optional)
			"spacing" : "", // (optional) units (px)
			"width" : "",   // (optional) units (px, ch)
		},

		"header": { // (optional)
			// note: on mobile, title will always be at the top
			"titleOnTop" : true, // (optional) boolean
			"boldTitle": true,   // (optional) boolean
			"padding": "",       // (optional) units (px)
		},

		// used to greate a glassmorphism effect for the panel
		// css properties taken from https://css.glass/, as that's where i
		// generated most of them
		"glass" : {
			"background" : "", // color value
			"radius" : "",     // units (px)
			"shadow" : "",     // css box-shadow
			"filter": "",      // css filter
			"border" : "",     // css border
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

		"selectionColor" : "#000000",
		"selectionBackground" : "rgb(122, 255, 252)",

		"highlightColor" : "inherit",
		"highlightBackground" : "rgba(68, 107, 106, 0.4)",
		"highlightColorSecondary" : "inherit",
		"highlightBackgroundSecondary" : "rgba(68, 107, 106, 0.25)",

		"panel": {
			"spacing" : "64px",
			"width" : "60ch",
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

		"selectionColor" : "#000000",
		"selectionBackground" : "rgb(122, 255, 252)",

		"highlightColor" : "#000000",
		"highlightBackground" : "#ffb647",
		"highlightColorSecondary" : "#000000",
		"highlightBackgroundSecondary" : "#ffaa75",

		"panel": {
			"spacing" : "64px",
			"width" : "60ch",
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
	}
}

addEventListener("DOMContentLoaded", (event) => {
	console.log("Loading theme initializer...");
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if (themeOnLoad in themes) {
		setTheme(themeOnLoad);
	}
	else {
		setTheme("midnight");
	}

	const collection = document.getElementsByClassName("themes__button");

	for (let i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click", (event) => {
			setTheme(collection[i].innerText);
		});
	}
});

const setTheme = (theme) => {
	if (!(theme in themes)) {
		throw new Error(`Theme \"${theme}\" not defined in theme library.`);
	}

	console.log(`Loading theme: ${theme}`);

	const themeData = themes[theme];
	const root = document.querySelector(':root');

	root.style.setProperty("--font-normal",             themeData.fontNormal           );
	root.style.setProperty("--font-mono",               themeData.fontMono             );

	root.style.setProperty("--color-text",              themeData.colorText            );
	root.style.setProperty("--color-text-accent",       themeData.colorTextAccent      );
	root.style.setProperty("--color-background",        themeData.colorBackground      );

	root.style.setProperty("--selection-color",         themeData.selectionColor       );
	root.style.setProperty("--selection-background",    themeData.selectionBackground  );

	root.style.setProperty("--highlight-color",         themeData.highlightColor       );
	root.style.setProperty("--highlight-background",    themeData.highlightBackground  );

	// complex

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

	if (themeData.hasOwnProperty("panel")) {
		root.style.setProperty("--panel-width"  , themeData.panel.width  );
		root.style.setProperty("--panel-spacing", themeData.panel.spacing);
	}

	if (themeData.hasOwnProperty("glass")) {
		root.style.setProperty("--panel-background", themeData.glass.background);
		root.style.setProperty("--panel-radius"    , themeData.glass.radius    );
		root.style.setProperty("--panel-shadow"    , themeData.glass.shadow    );
		root.style.setProperty("--panel-filter"    , themeData.glass.filter    );
		root.style.setProperty("--panel-border"    , themeData.glass.border    );
	}

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
			const fontWeight = themeData.header.boldTitle ? 700 : 400;
			root.style.setProperty("--header-title-weight", fontWeight);
		}
	}

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
};

