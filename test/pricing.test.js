'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { Order } = require('../src/order');
const { Pricing } = require('../src/pricing');

const order = () => new Order({ id: 2, lines: [{ quantity: 4, unitPriceCents: 2500 }] });

test('applies tax to the subtotal', () => {
  assert.strictEqual(new Pricing({ taxRate: 0.1 }).totalCents(order()), 11000);
});

test('a discount cannot push the total below zero', () => {
  assert.strictEqual(new Pricing({ discountCents: 999999 }).totalCents(order()), 0);
});
