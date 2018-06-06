import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
  BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, ResponsiveContainer
} from 'recharts';

class TodayProductSale extends Component {
  render() {
    const { data } = this.props;

    let graphData = [...data];
    graphData = graphData.map(value => {
      return Object.assign(value, { quantity: parseFloat(value.quantity) });
    });

    if (graphData.length == 0) return <h1>No Data</h1>

    return (
      <ResponsiveContainer width='100%' height={420} >
        <BarChart data={graphData} layout='vertical' >
          <XAxis type='number' dataKey='quantity' allowDecimals={false} />
          <YAxis type='category' dataKey='name' />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Bar dataKey='quantity' fill='#0081fa' maxBarSize={60}
            background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default TodayProductSale;
