import $ from 'jquery';

import cloneDeep from 'lodash/cloneDeep';
import defaults from 'lodash/defaults';
import uniqueId from 'lodash/uniqueId';

export default class Block {
  constructor(config) {
    this._el = null;
    this._parent = null;
    this._id = uniqueId();
    this._config = cloneDeep(config);
  }

  render() {
    const tplData = defaults(this.getTemplateData(), this.templateDefaults);

    this._el = $(this.templateFn(tplData));
  }

  afterRender() {
  }

  validate() {
    return true;
  }

  get isValid() {
    return true;
  }

  get value() {
    return {};
  }

  set value(val) {
  }

  get el() {
    return this._el;
  }

  set el(e) {
    this._el = e;
  }

  get config() {
    return this._config;
  }

  get parent() {
    return this._parent;
  }

  set parent(p) {
    this._parent = p;
  }

  get id() {
    return this._id;
  }

  getTemplateData() {
    return this.config;
  }

  get templateDefaults() {
    return {
      _prefix: 'smartforms',
      id: this.id,
      cls: '',
      value: '',
      required: false,
      readOnly: false,
      disabled: false,
      append: null,
      prepend: null,
      description: null,
      placeholder: null,
      suppressLabel: false
    };
  }
}