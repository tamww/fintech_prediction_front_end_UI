import React, { PureComponent } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Cell,
} from 'recharts';

/*template: responsive vertical bar chart */
export default class Example extends PureComponent {

  render() {
    return (
    <ResponsiveContainer width="90%" height={350}>
      <ComposedChart
        layout="vertical"

        data={this.props.dataS}
        margin={{
            top: 20, right: 20, left: 30, bottom: 15,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit = "%" />
        <YAxis dataKey={this.props.dataKeyY} type="category" fontSize="small"/>
        <Tooltip />
        <Bar dataKey={this.props.dataKeyX} barSize={10} fill="#413ea0" margin="20px">
          {
              (this.props.dataS).map((entry, index) => ( console.log(entry),
                <Cell key={`cell-${entry.company_name}`} fill={entry["fill"]} />)
                )
          }
        </Bar>
      </ComposedChart>
      </ResponsiveContainer>
    );
  }
}