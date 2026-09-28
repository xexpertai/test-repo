'use strict';

// Applies tax and a flat discount to an order subtotal.
class Pricing {
  constructor({ taxRate = 0, discountCents = 0 } = {}) {
    this.taxRate = taxRate;
    this.discountCents = discountCents;
  }

  totalCents(order) {
    const discounted = Math.max(order.subtotalCents() - this.discountCents, 0);
    return Math.round(discounted * (1 + this.taxRate));
  }
}

module.exports = { Pricing };
