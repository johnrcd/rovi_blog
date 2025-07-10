addEventListener("DOMContentLoaded", (event) => {
	console.log("themeSetter DOMContentLoaded invoked");
	const themeOnLoad = localStorage.getItem("theme_on_load");

	if (themeOnLoad in themes) {
		setTheme(themeOnLoad);
	}
	else {

	}
});

const setTheme = (theme) => {
	if (!(themeOnLoad in themes)) {
		throw new Error(`Theme ${theme} not defined in theme library.`);
	}

	const themeData = themes[theme];

	root.style.setProperty("--font-normal",             themeData.fontNormal           );
	root.style.setProperty("--font-mono",               themeData.fontMono             );

	root.style.setProperty("--color-text",              themeData.colorText            );
	root.style.setProperty("--color-text-secondary",    themeData.colorTextSecondary   );
	root.style.setProperty("--color-text-accent",       themeData.colorTextAccent      );
	root.style.setProperty("--color-background",        themeData.colorBackground      );
	root.style.setProperty("--color-background-accent", themeData.colorBackgroundAccent);

	root.style.setProperty("--highlight-color",         themeData.highlightColor       );
	root.style.setProperty("--highlight-background",    themeData.highlightBackground  );
};
