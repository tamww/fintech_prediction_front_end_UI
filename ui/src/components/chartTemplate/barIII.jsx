import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine,ResponsiveContainer, XAxis, YAxis, Tooltip, 
} from 'recharts';

/*Template: Horizontal Bar Graph with 2 reference line */
export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="90%" height={290}>
      <BarChart
        data={this.props.dataS}
        // margin={{
        //   top: 5, right: 30, left: 20, bottom: 5,
        // }}
      >
        <XAxis dataKey={this.props.KeyX}  style = {{ opacity:"100%",fontSize:"xx-small", wordBreak:"break-all"}} />
        <YAxis unit = "%"/>
        <Tooltip />
        <ReferenceLine x= {this.props.RefX} stroke="green" label = "Op1"/>
        <ReferenceLine x= {this.props.RefY} stroke="Red" label = "Op2"/>
        <Brush dataKey={this.props.KeyX} height={30} stroke="#8884d8" />
        <Bar style ={{opacity:"50%"}} dataKey={this.props.KeyY} fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    );
  }
}
