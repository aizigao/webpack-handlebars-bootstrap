import "../assets/styles/main.scss";

export default class BaseController {
	constructor($view = null, $props = {}, $cbs = {}) {
		this.$view = $view;
		this.$props = $props;
		this.$cbs = $cbs;
		this.created();
	}
	created() {
		console.log("need you to override this function");
	}
}
