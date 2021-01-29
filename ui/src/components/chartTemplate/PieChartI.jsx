import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

import basedata from "../common/data/final_company_info.json"

/*variable: store the processed data (status distribution) */
var data = [];

/*variable: list of color scheme */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#16a3ff", "#6ddead", "#5edfff", "#3e64ff", "#505bda"];

/*constant: radian value */
const RADIAN = Math.PI / 180;

/*constant: customized label location rendering */
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + 80;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="15px" >
      {`${data[index].name}`}

    </text>
  );
};

/*template: Pie chart with fixed size*/
export default class Example extends PureComponent {

  render() {
    basedata.map(item =>  data[item.status] = (data[item.status] || 0) + 1, );
    var result = []
    for (const key in data)
    {
        result.push({name:key, value:data[key]});
    }
    data = result;
    return (
      <PieChart width={350} height={180}>
        <Pie
          data={data}
          dataKey ="value"
          cx={150}
          cy={90}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={60}
          fill="black"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}
