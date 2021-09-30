import * as types from './contractActionTypes';

const contractReducer = (state, action) => {
  switch (action.type) {
    case types.CONTRACT_START:
      return {
        ...state,
        loading: true,
        error: null,
        contracts: null,
        errResponse: null,
      };

    case types.CONTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contracts: action.payload,
      };

    case types.CONTRACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
