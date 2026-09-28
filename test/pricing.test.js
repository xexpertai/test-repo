'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { Order } = require('../src/order');
const { Pricing } = require('../src/pricing');

const order = () => new Order({ id: 2, lines: [{ quantity: 4, unitPriceCents: 2500 }] });
const smallOrder = () => new Order({ id: 3, lines: [{ quantity: 1, unitPriceCents: 2500 }] });

test('applies tax to the subtotal', () => {
  assert.strictEqual(new Pricing({ taxRate: 0.1 }).totalCents(order()), 11000);
});

test('a discount cannot push the total below zero', () => {
  assert.strictEqual(new Pricing({ discountCents: 999999 }).totalCents(order()), 0);
});

test('shipping is charged below the free-shipping threshold', () => {
  assert.strictEqual(new Pricing().shippingCents(smallOrder()), 500);
});

test('shipping is free at the threshold', () => {
  assert.strictEqual(new Pricing().shippingCents(order()), 0);
});

test('a discount that drops the subtotal below the threshold brings shipping back', () => {
  assert.strictEqual(new Pricing({ discountCents: 1 }).shippingCents(order()), 500);
});

test('shipping is charged once a discount clamps the subtotal to zero', () => {
  assert.strictEqual(new Pricing({ discountCents: 999999 }).shippingCents(order()), 500);
});

test('the tax rate does not affect shipping', () => {
  assert.strictEqual(new Pricing({ taxRate: 0.25 }).shippingCents(smallOrder()), 500);
});
