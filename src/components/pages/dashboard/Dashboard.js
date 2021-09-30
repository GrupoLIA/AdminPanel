import { useContext, useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from '../../../contexts/user/userContext';
import { ContractContext } from '../../../contexts/contract/contractContext';
import DashboardHOC from './DashboardHOC';
import UserStats from '../user/UserStats';

const Dashboard = () => {
  const {
    state: { users, loading },
  } = useContext(UserContext);
  const {
    state: { contracts },
  } = useContext(ContractContext);

  const [userObj, setuserObj] = useState();
  const [doughnutStateData, setdoughnutStateData] = useState();

  const DoughnutData = {
    labels: ['Employers', 'Employees'],
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const getUsersData = () => {
    /*
    retorna un objeto con el total de servicios ofrecidos
    
    ejemplo: {
      mecanico: 2,
      plomero: 5,
      noTrades: 100
    }
    
     const allTrades = users
      ? users.reduce(
          (newData, user) => {
            const trd = user.trades;

            if (trd.length === 0) {
              newData['noTrade']++;
            } else {
              trd.forEach((trd) => {
                if (newData[trd.trade] === undefined) {
                  newData[trd.trade] = 1;
                } else {
                  newData[trd.trade]++;
                }
              });
            }

            return newData;
          },
          { noTrade: 0 }
        )
      : 0; */

    const withTrades = users
      ? users.filter((user) => user.trades.length > 0).length
      : 0;

    const withoutTrades = users ? users.length - withTrades : 0;

    const totalStaffs = users
      ? users.filter((user) => user.role === 'admin').length
      : 0;

    const contractStatus = (type) =>
      contracts.reduce(
        (total, contract) =>
          contract.status === type ? (total = total + 1) : total,
        0
      );

    const userObj = [
      { name: 'Total Users', stats: users ? users.length : 0 },
      { name: 'Total Admins', stats: totalStaffs },
      { name: 'Users with trades', stats: withTrades },
      { name: 'Users without trades', stats: withoutTrades },
      {
        name: 'Accepted contracts',
        stats: contracts ? contractStatus('accepted') : 0,
      },
      {
        name: 'Pending contracts',
        stats: contracts ? contractStatus('pending') : 0,
      },
      {
        name: 'Expired contracts',
        stats: contracts ? contractStatus('expired') : 0,
      },
      {
        name: 'Finished contracts',
        stats: contracts ? contractStatus('finished') : 0,
      },
    ];

    DoughnutData.datasets[0].data.push(withTrades);
    DoughnutData.datasets[0].data.push(withoutTrades);
    setdoughnutStateData(DoughnutData);

    return userObj;
  };

  useEffect(() => {
    setuserObj(getUsersData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="container">
      <Typography.Title>Dashboard</Typography.Title>

      {userObj && <UserStats users={userObj} loading={loading} />}

      <div className="row">
        <div className="col-md-4">
          <Card title="Employers vs Empoyees">
            {doughnutStateData ? (
              <>
                <Spin spinning={loading}>
                  <Doughnut data={doughnutStateData} width={100} height={115} />
                </Spin>
              </>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHOC(Dashboard);
