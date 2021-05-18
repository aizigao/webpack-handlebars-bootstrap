const routeListData = require('./data/route-list');
const pages = [
  {
    output: "./route-list.html",
    content: {
      title: "站点发车时刻表",
      description: "站点发车时刻表",
      data: routeListData
    },
    template: "./src/pages/route-list.hbs",
    controller: "RouteList",
  },
  {
    output: "./index.html",
    content: {
      title: "home",
      description: "home",
    },
    template: "./src/pages/home.hbs",
    controller: "home",
  },
];

module.exports = pages;
