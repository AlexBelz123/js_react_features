import axios from 'axios';

const api = axios.create({
  baseUR: 'https://...',
  headers: {
    'Content-Type': 'application/json',
  },
  // ... here define your default sruff you need
});

// interceptors for token authorization

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken(); // get token (can use another way)
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token' // can change to your url
    ) {
      router.push('/login'); // can change to your route
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken(); // can get refresh token in another way
      return axios
        .post('/auth/token', {
          // can change request url to your one
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorageService.setToken(res.data); // set token on local storage (can hange it)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default api;
