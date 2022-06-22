// mocking Browser APIs and modules
// 💯 mock the module

import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
// Location has hook called "useCurrentPosition" which behind the scenes uses
//  window.navigator.geolocation.getCurrentPosition
// our tests are running not in the browser, so we need to mock that logic
// In this case we are mocking the entire hook, not just a function from (v1)
import { useCurrentPosition } from 'react-use-geolocation';
import Location from '../../examples/location';

jest.mock('react-use-geolocation');

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});
