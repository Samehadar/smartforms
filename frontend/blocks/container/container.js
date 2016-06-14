import Base from '../base/base';
import Factory from '../factory';

import mapValues from 'lodash/mapValues';

export default class Container extends Base {
  constructor(config) {
    super(config);

    this.initItems();
  }

  initItems() {
    this._items = mapValues(this.config.items, blockConfig => {
      const BlockCtor = Factory.get(blockConfig.block);
      const block = new BlockCtor(blockConfig);

      block.parent = this;

      return block;
    });
  }

  render() {
    super.render();

    if (Array.isArray(this.config.itemsOrder)) {
      this.config.itemsOrder.forEach(k => {
        const block = this.items[k];

        block.render();
        this.appendChild(block);
      });

      return;
    }

    mapValues(this.items, block => {
      block.render();
      this.appendChild(block);
    });
  }

  getItemById(id) {
    return this.itemsValues.find(item => id === item.id);
  }

  validate() {
    return this.itemsValues.every(item => item.validate());
  }

  get isValid() {
    return this.itemsValues.every(item => item.isValid);
  }

  get value() {
    return mapValues(this.items, block => block.value);
  }

  get itemsKeys() {
    return Object.keys(this.items);
  }

  get itemsValues() {
    return this.itemsKeys.map(key => this.items[key]);
  }

  set value(val) {
  }

  appendChild(block) {
    throw new Error('Not implemented');
  }

  afterRender() {
    mapValues(this.items, block => block.afterRender());
  }

  get items() {
    return this._items;
  }
}
