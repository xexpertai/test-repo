# Order Service

A small HTTP-free order pricing service. Pure functions, no dependencies,
no build step.

```bash
npm test
```

## Layout

- `src/order.js` — the order model and its state transitions
- `src/pricing.js` — totals, discounts and tax
- `test/` — the suite, using Node's built-in runner
