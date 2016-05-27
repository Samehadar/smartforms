import 'jquery.formstyler';

import './checkbox.scss';
import template from './checkbox.jade';

import Base from '../base/base';
import Factory from '../factory';

export default class Checkbox extends Base {
  get templateFn() {
    return template;
  }

  get value() {
    return {
      [this.config.name]: this._checkboxWrapper.prop('checked')
    };
  }

  set value(val) {
    this._checkboxWrapper.prop('checked', val);
    this._checkboxWrapper.trigger('refresh');
  }

  render() {
    super.render();

    this._checkboxWrapper = this.el.find(`#${this.id}-checkbox`);
    this._checkboxWrapper.styler();
  }
}

Factory.register('checkbox', Checkbox);