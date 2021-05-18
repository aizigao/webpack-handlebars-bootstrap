import { BaseController, renderPage } from "../common/";
import '../assets/styles/pages/_home.scss';
import Utils from '../utils';

export default class RouteListCtrl extends BaseController {
  constructor(...args) {
    super(...args);
  }
  created () {
    const qsObj = Utils.getUrlParam();
    const targetRouteNo = qsObj.routeName || qsObj.routename || '00';
    this.targetRouteNo = targetRouteNo;
    this.direction = 'down'

    // $el
    this.$activeTable = this.$view.find(`.table-cont-${this.targetRouteNo}`);
    this.activeTableType = this.$activeTable.data('type');
    this.$toggleBtn = this.$view.find(`.jg-toggle-btn`);
    this.$directionEl = this.$view.find(`.js-direction-station-${this.targetRouteNo}`);
    this.$activeTable.removeClass('d-none');
    this.toggleBtnClick = this.toggleBtnClick.bind(this);

    // init
    if (this.activeTableType !== 0) {
      this.$toggleBtn.addClass('d-none');
    }
    this.binddingFns();

    // 传入为上行时, 立即切换为上行
    if (Number(qsObj.direction) === 5) {
      this.toggleBtnClick();
    }
  }
  binddingFns () {
    // 绑定点击
    this.$toggleBtn.on('click', this.toggleBtnClick);
  }
  toggleBtnClick () {
    const $downTableTrs = this.$activeTable.find('.data-down-stations');
    const $upTableTrs = this.$activeTable.find('.data-up-stations');
    if (this.direction === 'down') {
      this.direction = 'up';
      console.log('[当前方向]', this.direction);
      $downTableTrs.addClass('d-none');
      $upTableTrs.removeClass('d-none');
      this.$directionEl.text(this.$directionEl.data('up-text'));
    } else {
      this.direction = 'down';
      console.log('[当前方向]', this.direction);
      $downTableTrs.removeClass('d-none');
      $upTableTrs.addClass('d-none');
      this.$directionEl.text(this.$directionEl.data('down-text'));
    }
  }
}

renderPage("#page-cont", RouteListCtrl);
