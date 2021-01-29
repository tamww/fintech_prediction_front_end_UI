import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

/*variable: store the colors */
const colors = scaleOrdinal(schemeCategory10).range();

/*function: return the path of the triangle bar based on the y-axis value */
const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

/*props: a prop of the triangle bar*/
const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

/*variable: store information of the customized shape */
TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

/*function: return customized labels*/
const CustomizedLabel = (props) =>{
    const {Xaiss} = props;
    return <span>{`Next ${Xaiss} Months`}</span>
}


/*Template: Horizontal Bar Graph with customized shape */
export default class Example extends PureComponent {

  render() {
    return (
        <ResponsiveContainer width= '105%' height={200}>

      <BarChart
        data={this.props.data}
        // margin={{
        //   top: 20, right: 30, left: 20, bottom: 5,
        // }}
        margin = {{top: 20}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.Xaiss} label={<CustomizedLabel />}/>
        <YAxis unit = "%"/>
        <Tooltip/>
        <Bar dataKey={this.props.Yaiss}  fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {
            this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
      </ResponsiveContainer>

    );
  }
}
