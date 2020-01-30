import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#F92672', '#66D9EF',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class SimplePieChart extends PureComponent {

  render() {
    const { suki_percent, kirai_percent } = this.props;
    const data = [
      { name: 'スキ', value: suki_percent },
      { name: 'キライ', value: kirai_percent },
    ];
    return (
      <PieChart width={200} height={200}>
        <Pie
          startAngle={90}
          endAngle={-270}
          data={data}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}