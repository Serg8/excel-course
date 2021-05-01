import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emmiter = options.emmiter;
    this.unsubscribers = [];

    this.prepare();
  }

  // настраиваем компонент до init
  prepare() {}

  // return a template of a component
  toHTML() {
    return '';
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emmiter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // инициализуруем компонент
  // добавляем dom слушателей
  init() {
    this.initDomListeners();
  }

  // Удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
