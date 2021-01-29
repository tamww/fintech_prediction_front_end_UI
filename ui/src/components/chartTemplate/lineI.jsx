import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Brush,ReferenceDot
} from 'recharts';


/*Template: Line graph with 2 reference dots */
export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height={290}>

      <LineChart data={this.props.dataS}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="employee" padding={{ left: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend iconSize={15} width={110} height={140} layout="vertical" verticalAlign="middle" />
        <Brush dataKey="employee" height={20} stroke="#8884d8" />
        <ReferenceDot isFront = {true} x = {this.props.X1} y ={this.props.Y1} r={8} fill="red" stroke="none"  /> 
        <ReferenceDot isFront = {true} x = {this.props.X2} y ={this.props.Y2} r={8} fill="yellow" stroke="none"  /> 
        <Line type="monotone" dataKey="success_rate" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>

    );
  }
}
