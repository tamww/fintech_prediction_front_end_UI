import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer,
  Legend,
} from 'recharts';


/*Template: Area chart for both sales and balance data*/
export default class Example extends PureComponent {

  render() {
    return (
    <div style={{ width: '100%' }}>

      <ResponsiveContainer>

      <AreaChart
        data={this.props.data}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="sales"stackId="1" stroke="#30A9DE" fill="#30A9DE" />
        <Area type="monotone" dataKey="balance"stackId="1" stroke="#84B1ED" fill="#84B1ED" />
      </AreaChart>

      </ResponsiveContainer>
    </div>

    );
  }
}