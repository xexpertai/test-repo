'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { Order } = require('../src/order');

const build = (overrides = {}) => new Order({
  id: 1,
  lines: [{ quantity: 2, unitPriceCents: 500 }],
  ...overrides
});

test('subtotal sums the lines', () => {
  assert.strictEqual(build().subtotalCents(), 1000);
});

test('item count sums the quantities', () => {
  assert.strictEqual(build().itemCount(), 2);
});

test('placing moves a draft order to placed', () => {
  assert.strictEqual(build().place().state, 'placed');
});

test('an empty order cannot be placed', () => {
  assert.throws(() => build({ lines: [] }).place(), /empty order/);
});

test('a shipped order cannot be cancelled', () => {
  assert.throws(() => build({ state: 'shipped' }).cancel(), /shipped/);
});
