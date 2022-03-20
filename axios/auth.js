import api from './interceptors'; // some axios instance

// SetAuthToken
const setAuthToken = (token) => {
  // change headers depending on token
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('jwt', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('jwt');
  }
};

export default setAuthToken;

// App.jsx
// ... some code
useEffect(() => {
  if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
  }
  store.dispatch(loadUser());

  // log user out from all tabs if they log out in one tab
  window.addEventListener('storage', () => {
    if (!localStorage.jwt) store.dispatch({ type: LOGOUT });
  });
}, []);

// ... some code
