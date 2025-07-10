// note: don't put ;'s at the end of the values -- it doesn't apply the css
const themes = {
	"TEMPLATE_do_not_use_as_actual_theme": {
		// BASIC PROPERTIES
		// these settings have a 1-to-1 relationship with a css variable
		"fontNormal" : "",    // default font
		"fontMono" : "", // for code blocks and stuff

		"colorText" : "blue",
		"colorTextSecondary" : "red",
		"colorTextAccent" : "blue",
		"colorBackground" : "",
		"colorBackgroundAccent" : "",

		"highlightColor" : "",
		"highlightBackground" : "",
	},
	"default" : {
		"fontNormal" : '"Poppins", "Open Sans", sans-serif',
		"fontMono" : "monospace",

		"colorText" : "#EEEEEE",
		"colorTextSecondary" : "#efce8b",
		"colorTextAccent" : "#ffaa75",
		"colorBackground" : "linear-gradient(320deg, rgba(156,85,13,1) 0%, rgba(140,41,71,1) 53%, rgba(75,19,79,1) 100%)",
		"colorBackgroundAccent" : "",

		"highlightColor" : "#000000",
		"highlightBackground" : "#ffb647",
		"highlightColorSecondary" : "#000000",
		"highlightBackgroundSecondary" : "#ffaa75",

		"panel": {
			"spacing" : "64px",
			"width" : "60ch",
		},

		"glass" : {
			"background" : "rgba(70, 20, 35, 0.18)",
			"radius" : "16px",
			"shadow" : "0 4px 16px rgba(0, 0, 0, 0)",
			"filter": "blur(3.3px)",
			"border" : "1px solid rgba(255, 255, 255, 0.13)",
		},
	}
}

addEventListener("DOMContentLoaded", (event) => {
	console.log("themeSetter DOMContentLoaded invoked");
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if (themeOnLoad in themes) {
		setTheme(themeOnLoad);
	}
	else {
		setTheme("default");
	}
});

const setTheme = (theme) => {
	if (!(theme in themes)) {
		throw new Error(`Theme ${theme} not defined in theme library.`);
	}

	console.log(`Loading theme: ${theme}`);

	const themeData = themes[theme];
	const root = document.querySelector(':root');

	root.style.setProperty("--font-normal",             themeData.fontNormal           );
	root.style.setProperty("--font-mono",               themeData.fontMono             );

	root.style.setProperty("--color-text",              themeData.colorText            );
	root.style.setProperty("--color-text-secondary",    themeData.colorTextSecondary   );
	root.style.setProperty("--color-text-accent",       themeData.colorTextAccent      );
	root.style.setProperty("--color-background",        themeData.colorBackground      );
	root.style.setProperty("--color-background-accent", themeData.colorBackgroundAccent);

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

	localStorage.setItem("theme_on_load", theme);
};

