import { Card as AntCard } from 'antd';
import StatsCardStyled from './StatsCardStyled';

const StatsCard = ({ loading, stats, color, icon }) => (
  <StatsCardStyled color={color}>
    <AntCard className="card-col" loading={loading}>
      <div className="col">
        <p className="card-text">{stats.name}</p>
        <h5 className="card-stats">{stats.stats}</h5>
      </div>
      <div className="col-auto" style={{ color: color }}>
        {icon}
      </div>
    </AntCard>
  </StatsCardStyled>
);

export default StatsCard;
