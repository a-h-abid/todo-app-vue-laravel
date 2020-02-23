import axios from 'axios';


/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (options = {}) => {
  const defaults = {
    baseURL: process.env.VUE_APP_API_BASE_URL || '/',
    timeout: 30000,
  };

  if (!options.headers) {
    options.headers = {
      'Accept': 'application/json',
      'Content-type': 'application/json;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  const mergedOptions = Object.assign({}, axios.defaults, defaults, options);
  const client = axios.create(mergedOptions);

  // Add a request interceptor
  client.interceptors.request.use(
    (requestConfig) => {
      // Ex. Add token, Additional Headers
      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );

  return client;
};


const commonSuccessResponse = (response) => {
  if (response && (response.status == true || response.data)) {
    return Promise.resolve(response);
  }

  return Promise.reject({
    type: 'invalid-response',
    message: 'Response was invalid.',
    response: response,
  });
}

const commonErrorResponse = (error) => {
  if (error.response && error.response.status == 401) {
    return Promise.reject({
      type: 'unauthenticated',
      message: 'Unauthenticated',
      error: error,
    });
  }

  if (error.response && error.response.status == 422) {
    let validationErrors;
    if (error.response.data.errors) {
      validationErrors = error.response.data.errors;
    }
    else if (error.response.data.response && error.response.data.response.errors) {
      validationErrors = error.response.data.response.errors;
    }

    return Promise.reject({
      type: 'validation-errors',
      message: 'Validation Errors',
      error: error,
      validationErrors: validationErrors,
    });
  }

  let msg = 'An error occured with gateway.';
  if (error && error.response && error.response.data && error.response.data.message) {
    msg = error.response.data.message;
  }

  return Promise.reject({
    type: 'error',
    message: msg,
    error: error,
  });
}

class HttpClient {
  constructor(options = {}) {
    this.client = getClient(options);
  }

  async get(url, queries = {}, conf = {}) {
    conf.params = queries;

    return this.client.get(url, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }

  async delete(url, data = {}, conf = {}) {
    conf.data = data;
    return this.client.delete(url, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }

  async head(url, conf = {}) {
    return this.client.head(url, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }

  async post(url, data = {}, conf = {}) {
    return this.client.post(url, data, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }

  async put(url, data = {}, conf = {}) {
    return this.client.put(url, data, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }

  async patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then((response) => commonSuccessResponse(response))
      .catch((error) => commonErrorResponse(error));
  }
}

export default HttpClient;
