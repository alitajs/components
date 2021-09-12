import * as React from 'react';
import { render, testA11y } from '@alita/test';
import Hello from './index';

it('passes a11y test', async () => {
  await testA11y(<Hello />);
});

test('render', () => {
  const { getByText } = render(<Hello />);
  expect(getByText('hello')).toBeDefined();
});
