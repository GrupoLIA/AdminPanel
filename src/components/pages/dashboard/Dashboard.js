import { useContext, useState, useEffect } from 'react';
import { Card, Spin, Typography } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from '../../../contexts/user/userContext';
import DashboardHOC from './DashboardHOC';
import UserStats from '../user/UserStats';

const Dashboard = () => {
  const {
    state: { users, loading },
  } = useContext(UserContext);
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
    const withTrades = users
      ? users.filter((user) => user.trades.length > 0).length
      : 0;

    const withoutTrades = users ? users.length - withTrades : 0;

    const totalStaffs = users
      ? users.filter((user) => user.role === 'admin').length
      : 0;

    const userObj = [
      { name: 'Total Users', stats: users ? users.length : 0 },
      { name: 'Total Admins', stats: totalStaffs },
      { name: 'Users with trades', stats: withTrades },
      { name: 'Users without trades', stats: withoutTrades },
      // TODO
      // { name: 'Total contracts', stats: inActiveUsers },
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
