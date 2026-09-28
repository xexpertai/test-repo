'use strict';

const STATES = ['draft', 'placed', 'shipped', 'cancelled'];

class Order {
  constructor({ id, lines = [], state = 'draft' }) {
    this.id = id;
    this.lines = lines;
    this.state = state;
  }

  subtotalCents() {
    return this.lines.reduce((sum, line) => sum + line.quantity * line.unitPriceCents, 0);
  }

  itemCount() {
    return this.lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  place() {
    if (this.state !== 'draft') {
      throw new Error('only a draft order can be placed');
    }
    if (this.lines.length === 0) {
      throw new Error('cannot place an empty order');
    }
    this.state = 'placed';
    return this;
  }

  cancel() {
    if (this.state === 'shipped') {
      throw new Error('a shipped order cannot be cancelled');
    }
    this.state = 'cancelled';
    return this;
  }
}

module.exports = { Order, STATES };
