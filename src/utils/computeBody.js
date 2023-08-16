import config from '../config.json'
export const computeCBSBody = (
    method,
    url,
    headers,
    hashField = '',
    hashmessage = '',
    body = null
  ) => {
    return {
      requestObject: {
        body,
        headers: {
          ...headers,
        },
        helpers: {
          method,
          url,
          hashField,
          hashmessage,
          clientSecret: config.clientSecret,
        },
      },
    };
  }
