const pages = [
	{
		output: "./index.html",
		content: {
			title: "Home",
			description: "Home Page",
		},
		template: "./src/pages/home.hbs",
		controller: "home",
	},
	{
		output: "./about/index.html",
		content: {
			title: "About",
			description: "About Page",
		},
		template: "./src/pages/about.hbs",
		controller: "about",
	},
];

module.exports = pages;
