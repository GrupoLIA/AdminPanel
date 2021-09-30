import { createContext, useReducer, useCallback } from 'react';
import userReducer from './authReducer';
import * as types from './authActionTypes';
import api from '../../utils/apiUtils';

const initialAuthState = {
  loading: false,
  error: false,
  token: null,
  errResponse: null,
};

const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthState);

  const AuthReset = () => {
    dispatch({
      type: types.AUTH_RESET,
    });
  };

  const LoginAction = useCallback(async (data) => {
    dispatch({
      type: types.AUTH_START,
    });

    try {
      const res = await api.post('/api/admin/login', data);
      const user_token = res.data.token;

      localStorage.setItem('user_token', user_token);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: user_token,
      });
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: 'Can not login',
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        AuthReset,
        LoginAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
