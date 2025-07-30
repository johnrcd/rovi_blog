let anchors = [];

/**
 * Retrieves the content from a page and reaplces the content of the current
 * page with it.
 *
 * The "contents" of page are determined by the innerHTML inside the panel
 * class element. All pages in rovi_blog are guarenteed to have a single
 * instance of an element with the class.
 *
 * @param {Event} event The event information given from an anchor tag during
 * a click event.
 */
const loadPage = async(url, updateHistory) => {
	if (updateHistory) {
		history.pushState({}, "", url);
	}
	// guard clause (not really): you clicked on a hash link
	const hash = window.location.hash;

	if (hash != "" && updateHistory) {
		// https://stackoverflow.com/a/49860927
		const rawPosition = document.getElementById(hash.replace("#", "")).getBoundingClientRect().top;
		const offset = 16;
		const position = rawPosition + window.pageYOffset - offset;

		window.scrollTo({
			top: position,
			behavior: "smooth"
		});
		return;
	}

	const response = await fetch(url);
	const text = await response.text();
	const doc = new DOMParser().parseFromString(text, "text/html");
	const panel = document.getElementById("content");

	// manually detach events to avoid memory error
	anchors.forEach(anchor => {
		anchor.removeEventListener("click", loadPage);
	});

	document.title = doc.title;
	panel.innerHTML = doc.getElementById("content").innerHTML;

	window.scrollTo(0, 0);
	loadAnchors();
}

/**
 * Gets a list of all the anchor tags on the page, attaches them to the
 * loadPage method, and adds them to the "anchors" variable.
 */
const loadAnchors = () => {
	const temp = Array.from(document.getElementsByTagName("a"));
	window.scrollTo(0, 0);

	temp.forEach(t => {
		// do NOT try to SPA for links to different websites
		const destination = new URL(t.href, document.baseURI);
		const root = new URL(document.baseURI);

		if (destination.origin != root.origin) return;

		anchors.push(t);
	});

	anchors.forEach(anchor => {
		anchor.addEventListener("click", (event) => {
			// EXCEPTION: rss feeds
			if (event.target.href.includes(".xml")) {
				return;
			}

			event.preventDefault();
			loadPage(event.target.href, true);
		})
	});
};

window.addEventListener("popstate", (event) => {
	// for some reason something goes wrong if you use
	// window.location.href
	loadPage(window.location.pathname, false);
})

document.addEventListener("DOMContentLoaded", () => {
	loadAnchors();
});
