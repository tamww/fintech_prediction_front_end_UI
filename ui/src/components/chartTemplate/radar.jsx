import { Tooltip } from '@material-ui/core';
import React, { PureComponent } from 'react';
import {
  Radar, RadarChart,PolarGrid, PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer
} from 'recharts';


/*template: a responsive radar graph with 2 display items*/
export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height={180}>
      <RadarChart cx={220} cy={110} outerRadius={60}  data={this.props.dataS}>
        <PolarGrid />
        <PolarAngleAxis dataKey="key" />
        <PolarRadiusAxis />
        <Tooltip/>
        <Radar dataKey="ref" stroke='#aeeba9' fill="#aeeba9" fillOpacity={0.5} />
        <Radar dataKey="datapoint" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
      </RadarChart>
      </ResponsiveContainer>
    );
  }
}
