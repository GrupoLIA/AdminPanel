import * as types from './userActionTypes';

const userReducer = (state, action) => {
  switch (action.type) {
    case types.USER_START:
      return {
        ...state,
        loading: true,
        message: null,
        user: null,
        error: null,
      };

    case types.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case types.GET_LOGGED_IN_USER:
      return {
        ...state,
        loading: false,
        me: action.payload,
      };

    case types.GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
        errResponse: '',
      };

    case types.USER_EDIT:
      const tempState = state.users.filter(
        (data) => data._id !== action.payload._id
      );

      return {
        ...state,
        users: [action.payload, ...tempState],
        loading: false,
        error: false,
        errResponse: '',
        user: action.payload,
        message: 'Edited success',
      };

    case types.USER_DELETE:
      return {
        ...state,
        users: [
          ...state.users.slice().filter((data) => data._id !== action.payload),
        ],
        loading: false,
        error: false,
        errResponse: '',
        user: null,
        message: 'Deleted successfully',
      };

    case types.USER_ADD_TRADE:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        message: 'Trade added successfully',
      };

    case types.USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      };

    case types.USER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        message: null,
      };

    default:
      return state;
  }
};

export default userReducer;
