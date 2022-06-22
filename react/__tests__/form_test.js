// form testing

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Login from '../../components/login';

function buildLoginForm(override = {}) {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  return {
    username,
    password,
    ...override,
  };
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm({ password: 'abc' });

  console.log(password);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(usernameInput, username);
  await userEvent.type(passwordInput, password);

  const submitionButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitionButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  console.log(handleSubmit.mock.results);
});

/*
eslint
  no-unused-vars: "off",
*/
