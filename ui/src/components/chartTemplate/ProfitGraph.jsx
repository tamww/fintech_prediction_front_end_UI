import React, { PureComponent } from 'react';
import {
  AreaChart, Legend,Area, XAxis,Brush, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

/*Template: Area chart for profit information in dashbaord */
export default class Example extends PureComponent {

  render() {
    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Brush />
            <Area type="monotone" dataKey="profit" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
