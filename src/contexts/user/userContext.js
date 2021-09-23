import { createContext, useReducer, useCallback, useEffect } from 'react';
import userReducer from './userReducer';
import * as types from './userActionTypes';
import api from '../../utils/apiUtils';

const initialUserState = {
  loading: false,
  error: false,
  users: '',
  user: null,
  me: null,
  errResponse: '',
  message: null,
};

const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const UserReset = () => {
    dispatch({
      type: types.USER_RESET,
    });
  };

  const fetchUsers = useCallback(async () => {
    dispatch({
      type: types.USER_START,
    });

    try {
      const res = await api.get('/api/users/');
      dispatch({
        type: types.USER_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.isAxiosError
          ? error.message
          : error.response.error.message,
      });
    }
  }, []);

  const fetchLoggedInUser = useCallback(async () => {
    dispatch({
      type: types.USER_START,
    });

    try {
      const res = await api.get('/api/users/profile');

      dispatch({
        type: types.GET_LOGGED_IN_USER,
        payload: res.data.data.user,
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.isAxiosError
          ? error.message
          : error.response.error.message,
      });
    }
  }, []);

  const fetchSingleUser = useCallback(
    async (id) => {
      dispatch({
        type: types.USER_START,
      });
      const tempState = { ...state };

      if (!tempState.users) {
        try {
          const { data } = await api.get(`/api/admin/user/${id}`);

          dispatch({
            type: types.GET_USER,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: types.USER_FAILURE,
            payload: error.isAxiosError
              ? error.message
              : error.response.error.message,
          });
        }
      } else {
        const user = tempState.users.find((user) => user._id === id);

        dispatch({
          type: types.GET_USER,
          payload: user,
        });
      }
    },
    [state]
  );

  // TODO
  const editUserAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START,
    });

    try {
      console.log('Data is: ', data);
      const res = await api.patch(`/api/admin/user/${data._id}`, data);

      dispatch({
        type: types.USER_EDIT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.isAxiosError
          ? error.message
          : error.response.error.message,
      });
    }
  }, []);

  // TODO
  const deleteUserAction = useCallback(async (id) => {
    dispatch({
      type: types.USER_START,
    });

    try {
      // await mernDashApi.post(`/api/user/delete/${id}`);
      dispatch({
        type: types.USER_DELETE,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.error.message,
      });
    }
  }, []);

  const addTradeAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START,
    });

    try {
      await api.put(`/api/admin/user/${data._id}`, data);

      dispatch({
        type: types.USER_ADD_TRADE,
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.error.message,
      });
    }
    fetchSingleUser(data._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLoggedInUser();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        fetchSingleUser,
        fetchLoggedInUser,
        fetchUsers,
        editUserAction,
        addTradeAction,
        deleteUserAction,
        UserReset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
