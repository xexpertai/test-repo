'use strict';

// Flat shipping fee, waived once the discounted subtotal reaches the threshold.
const SHIPPING_CENTS = 500;
const FREE_SHIPPING_THRESHOLD_CENTS = 10000;

// Applies tax and a flat discount to an order subtotal.
class Pricing {
  constructor({ taxRate = 0, discountCents = 0 } = {}) {
    this.taxRate = taxRate;
    this.discountCents = discountCents;
  }

  discountedSubtotalCents(order) {
    return Math.max(order.subtotalCents() - this.discountCents, 0);
  }

  shippingCents(order) {
    if (this.discountedSubtotalCents(order) >= FREE_SHIPPING_THRESHOLD_CENTS) {
      return 0;
    }
    return SHIPPING_CENTS;
  }

  totalCents(order) {
    const discounted = this.discountedSubtotalCents(order);
    return Math.round(discounted * (1 + this.taxRate));
  }
}

module.exports = { Pricing, SHIPPING_CENTS, FREE_SHIPPING_THRESHOLD_CENTS };
