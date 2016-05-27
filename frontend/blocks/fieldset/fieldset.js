import template from './fieldset.jade';

import './fieldset.scss';

import Container from '../base/container';
import Factory from '../factory';

export default class Fieldset extends Container {
  constructor(config) {
    const items = config.items.map(item => Object.assign({}, item, { suppressLabel: true }));
    const finalConfig = Object.assign({}, config, { items });

    finalConfig.layout = Array.isArray(config.layout) ? config.layout : [{count: config.items.length}];
    finalConfig.layout = finalConfig.layout.map(rowConfig => Number.isInteger(rowConfig) ? {count: rowConfig} : rowConfig);

    let start = 0;
    finalConfig.items = finalConfig.layout.map(rowConfig => {
      const result = {
        items: items.slice(start, start + rowConfig.count),
        block: 'fieldsetRow',
        width: rowConfig.width
      };
      start += rowConfig.count;

      return result;
    });

    super(finalConfig);
  }

  get templateFn() {
    return template;
  }

  addRow(config, index = 'last') {
    const RowConstructor = Factory.get('fieldsetRow');
    const row = new RowConstructor(config);

    const finalIndex = (!Number.isInteger(index) || index >= this.items.length) ? 'last' : index;

    row.parent = this;
    row.render();

    this.items.push(row);

    const appendChildWithIndex = {
      last: () => this.el.children('div').append(row.el),
      number: number => this.el.find('.input-set-row').eq(finalIndex).before(row.el)
    };

    (appendChildWithIndex[finalIndex] || appendChildWithIndex.number)(finalIndex);
  }

  removeRow(index) {
    this.el.find('.input-set-row').eq(index).remove();
  }

  appendChild(block) {
    this.el.children('div').append(block.el);
  }
}

Factory.register('fieldset', Fieldset);