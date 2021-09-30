import { createContext, useReducer, useCallback, useEffect } from 'react';
import contractReducer from './contractReducer';
import * as types from './contractActionTypes';
import api from '../../utils/apiUtils';

const initialContractState = {
  loading: false,
  error: false,
  contracts: '',
  errResponse: '',
};

const ContractContext = createContext(initialContractState);

const ContractProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contractReducer, initialContractState);

  const fetchContracts = useCallback(async () => {
    dispatch({
      type: types.CONTRACT_START,
    });

    try {
      const res = await api.get('/api/admin/contracts/');
      dispatch({
        type: types.CONTRACT_SUCCESS,
        payload: res.data.data.contracts,
      });
    } catch (error) {
      dispatch({
        type: types.CONTRACT_FAILURE,
        payload: error.isAxiosError
          ? error.message
          : error.response.error.message,
      });
    }
  }, []);

  useEffect(() => {
    fetchContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContractContext.Provider
      value={{
        state,
        fetchContracts,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };
