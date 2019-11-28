const routeListData = require('./data/home');
const pages = [
  {
    output: "./index.html",
    content: {
      title: "站点发车时刻表",
      description: "Home Page",
      data: routeListData
    },
    template: "./src/pages/home.hbs",
    controller: "home",
  },
  // {
  //   output: "./about/index.html",
  //   content: {
  //     title: "About",
  //     description: "About Page",
  //   },
  //   template: "./src/pages/about.hbs",
  //   controller: "about",
  // },
];

module.exports = pages;
