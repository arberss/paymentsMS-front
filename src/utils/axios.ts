import axios from 'axios';

// configure axios defaults
axios.defaults.baseURL = `${import.meta.env.VITE_API_KEY}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setupAxios = () => {
  axios.interceptors.request.use((config) => {
    // config token as default per request
    const _token = localStorage.getItem('token');
    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      /*
       * if error: "No permission!"
       * logout & go to login page
       */
      if (
        response &&
        response.data &&
        response.data.error === 'No permission!'
      ) {
        // store.dispatch(userActions.logout());
      }

      return response;
    },
    (error) => {
      const _error = { ...error };
      if (_error.response && _error.response.status === 401) {
        /*
         * Unauthorized Request
         * store.dispatch(userActions.logout());
         */
      } else if (_error.response && _error.response.status === 403) {
        /*
         * Forbiden Request
         * store.dispatch(forbidenRequest());
         */
      } else if (_error.response && _error.response.status === 404) {
        /*
         * route not found
         * store.dispatch(erroredRequest());
         * history.push('/error/404');
         * store.dispatch(userActions.logout());
         */
      } else {
        /*
         * TODO FIX THIS
         * store.dispatch(userActions.logout());
         */
      }

      return Promise.reject(_error);
    }
  );
};

export default axios;
