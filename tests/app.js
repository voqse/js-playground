import { sum } from '../src/app.js';

test('Sum should be correct', () => {
    expect(sum(1, 5)).toBe(6);
});
