import React, { PureComponent } from 'react';
import {
  BarChart, Bar,ReferenceLine,ResponsiveContainer, XAxis, YAxis,Tooltip,
} from 'recharts';


/*Template: Horizontal Bar Graph */
export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={this.props.dataS}
        // margin={{
        //   top: 5, right: 30, left: 20, bottom: 5,
        // }}
      >
        <XAxis dataKey={this.props.KeyX}  style = {{ opacity:"100%",fontSize:"xx-small", wordBreak:"break-all"}} />
        <YAxis unit = "%"/>
        <Tooltip />
        <ReferenceLine x= {this.props.RefX} stroke="green" />
        <Bar style ={{opacity:"50%"}} dataKey={this.props.KeyY} fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    );
  }
}
