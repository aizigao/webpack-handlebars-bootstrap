import { BaseController, renderPage } from "../common/";

export default class HomeController extends BaseController {
	constructor(...args) {
		super(...args);
	}
	created() {
		console.log(this.$view);
		console.log("-----------------");
		console.log("[BASE]: page created");
		console.log("-----------------");
	}
}

renderPage("#page-cont", HomeController);
