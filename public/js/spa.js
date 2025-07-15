let anchors = [];

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        // ... whatever else you want to do
        // maybe call onhashchange e.handler
        return pushState.apply(history, arguments);
    };
})(window.history);

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
const loadPage = async(event) => {
	event.preventDefault();
	const url = event.target.href;
	const response = await fetch(url);
	const text = await response.text();

	const doc = new DOMParser().parseFromString(text, "text/html");

	const panel = document.getElementById("content");

	// manually detach events to avoid memory error
	anchors.forEach(anchor => {
		anchor.removeEventListener("click", loadPage);
	});

	panel.innerHTML = doc.getElementById("content").innerHTML;

	history.pushState({}, "", url);

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
		anchor.addEventListener("click", (event) => { loadPage(event); })
	});
};

document.addEventListener("DOMContentLoaded", () => {
	loadAnchors();
});
