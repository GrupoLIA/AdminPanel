import { useContext } from 'react';
import { ContractContext } from '../../../contexts/contract/contractContext';
import DashboardHOC from '../dashboard/DashboardHOC';
import ContractTable from '../table/ContractTable';
import CustomLoader from '../../common/CustomLoader';

const ContractListPage = () => {
  const { contracts, loading } = useContext(ContractContext).state;

  return (
    <div>
      {!loading ? (
        <ContractTable data={contracts} />
      ) : (
        <CustomLoader text={'Getting contracts from DB'} />
      )}
    </div>
  );
};

export default DashboardHOC(ContractListPage);
