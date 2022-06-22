// simple test with ReactDOM (without react testing library)

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Counter from '../../components/counter';

global.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  document.body.innerHTML = '';
});

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div');
  document.body.append(div);
  act(() => {
    createRoot(div).render(<Counter />);
  });
  const [decrement, increment] = div.querySelectorAll('button');
  const message = div.firstChild.querySelector('div');

  const event = new MouseEvent('click', {
    // can create seperate for inc & dec
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  expect(message.textContent).toBe('Current count: 0');
  act(() => increment.dispatchEvent(event));
  expect(message.textContent).toBe('Current count: 1');
  act(() => decrement.dispatchEvent(event));
  expect(message.textContent).toBe('Current count: 0');
});

/* eslint no-unused-vars:0 */
