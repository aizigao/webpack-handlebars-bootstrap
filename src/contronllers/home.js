import { BaseController, renderPage } from "../common/";
// import '../assets/styles/pages/_home.scss';

export default class HomeController extends BaseController {
  constructor(...args) {
    super(...args);
  }
  created () {
  }
}

renderPage("#page-cont", HomeController);
