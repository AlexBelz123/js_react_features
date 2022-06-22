// mocking HTTP requests

import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { handlers } from './test/handlers'; // ATTENTION
import Login from '../../components/login-submission';

function buildLoginForm(override = {}) {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  return {
    username,
    password,
    ...override,
  };
}

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByText(username)).toBeInTheDocument();
});

test(`logging in without password should show error`, async () => {
  render(<Login />);
  const { username } = buildLoginForm();
  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`
  );
});

test(`Server should down with 500 status code`, async () => {
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'something went wrong' })
        );
      }
    )
  );
  render(<Login />);
  const { username, password } = buildLoginForm();

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"something went wrong"`
  );
});
