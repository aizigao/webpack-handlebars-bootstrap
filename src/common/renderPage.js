import $ from "jquery";

export default (selector, Controller) => {
	const $view = $(selector);
	new Controller($view);
};
