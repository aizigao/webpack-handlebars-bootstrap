import { BaseController, renderPage } from "../common/";
import '../assets/styles/pages/_home.scss';
import Utils from '../utils';

export default class HomeController extends BaseController {
  constructor(...args) {
    super(...args);
    this.dirction = 'down';
  }
  created () {
    const qsObj = Utils.getUrlParam();
    const targetRouteNo = qsObj.routeName || qsObj.routename;
    this.targetRouteNo = targetRouteNo;

    this.$activeTable = this.$view.find(`.table-cont-${this.targetRouteNo}`);
    this.activeTableType = this.$activeTable.data('type');
    this.$toggleBtn = this.$view.find(`.jg-toggle-btn`);
    this.$directionEl = this.$view.find('.js-direction-station');
    this.$activeTable.removeClass('d-none');

    if (this.activeTableType !== 0) {
      this.$toggleBtn.addClass('d-none');
    }
    this.binddingFns();
  }
  binddingFns () {
    // 绑定点击
    this.$toggleBtn.on('click', this.toggleBtnClick.bind(this));
  }
  toggleBtnClick () {
    const $downTableTrs = this.$activeTable.find('.data-down-stations');
    const $upTableTrs = this.$activeTable.find('.data-up-stations');
    console.log('[方向]', this.dirction);
    if (this.dirction === 'down') {
      this.dirction = 'up';
      $downTableTrs.addClass('d-none');
      $upTableTrs.removeClass('d-none');
      this.$directionEl.text(this.$directionEl.data('up-text'));
    } else {
      this.dirction = 'down';
      $downTableTrs.removeClass('d-none');
      $upTableTrs.addClass('d-none');
      this.$directionEl.text(this.$directionEl.data('down-text'));
    }
  }
}

renderPage("#page-cont", HomeController);
