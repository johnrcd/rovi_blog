export default {
	tags: [
		"post"
	],
	"layout": "layouts/post.njk",
	"permalink": "/post/{{ title | slugify }}/",
	"category" : "unsorted",
};
