import React from 'react';
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import { isValidToken, setSession } from '../utils/jwt';

import { LoginUser } from '../_apis_/auth';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialize = async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');

      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken ) {
        setSession(accessToken);
        // const response = await axios.get('/api/account/my-account');
        // const response = await FetchUser();
        // const { user } = response.data;
        const user = JSON.parse(localStorage.getItem('possap-user'));

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user
          }
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  const login = async (email, password) => {
    console.log(email);
    // const response = await LoginUser({
    //   email,
    //   password
    // });
    // const { data, token } = response.data;
    localStorage.setItem('possap-user', JSON.stringify({email}));
    setSession('token');
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {email}
      }
    });
    // initialize();
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
