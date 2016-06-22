import Base from '../base/base';
import Factory from '../factory';

import Form from '../form/form';

import template from './modal.jade';
import './modal.css';

import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';

export default class Modal extends Base {
  constructor(config) {
    const finalConfig = cloneDeep(config);

    if (finalConfig.iagree) {
      finalConfig.iagreeId = uniqueId();
      finalConfig.iagree = Object.assign({
        block: 'checkbox',
        checkboxCls: 'iagree',
        name: 'iagree',
        checked: true,
        id: finalConfig.iagreeId,
        labelWidth: 3
      }, finalConfig.iagree);
      finalConfig.footer = [finalConfig.iagree, ...finalConfig.footer];
    }

    if (finalConfig.submitButton) {
      finalConfig.submitButtonId = uniqueId();
      finalConfig.submitButton = Object.assign({
        block: 'button',
        type: 'submit',
        label: 'Submit',
        cls: 'btn-primary',
        id: finalConfig.submitButtonId,
        labelWidth: 3
      }, finalConfig.submitButton);
      finalConfig.footer.push(finalConfig.submitButton);
    }

    super(finalConfig);

    this._bodyForm = new Form({
      block: 'form',
      items: this.config.body
    });

    this._footerForm = new Form({
      block: 'form',
      cls: 'form form-horizontal',
      items: this.config.footer
    });
  }

  get templateFn() {
    return template;
  }

  validate() {
    return this._bodyForm.validate() && this._footerForm.validate();
  }

  get isValid() {
    return this._bodyForm.isValid && this._footerForm.isValid;
  }

  get value() {
    return Object.assign(this._bodyForm.value, this._footerForm.value);
  }

  render() {
    super.render();

    this._bodyForm.render();
    this._footerForm.render();

    this.el.find('.modal-body').append(this._bodyForm.el);
    this.el.find('.modal-footer').append(this._footerForm.el);
  }

  afterRender() {
    this._footerForm.el.find('button[type=submit]').click(e => this._onSubmit(e));
    this._bodyForm.afterRender();
    this._footerForm.afterRender();

    const iagree = this.el.find(`input#${this.config.iagreeId}`);
    const submitButton = this.el.find(`button#${this.config.submitButtonId}`);

    iagree.on('change', () => {
      submitButton.prop('disabled', () => !iagree.prop('checked'));
    }).change();
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      // submit form
    }
  }
}

Factory.register('modal', Modal);
