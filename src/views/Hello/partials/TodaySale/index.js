import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
  BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, ResponsiveContainer
} from 'recharts';

class TodaySale extends Component {
  render() {
    const { data, type } = this.props;

    let unit = '';
    let xType = 'number';
    let graphData = [...data];
    graphData = graphData.map(value => {
      return Object.assign(value, { revenue: parseFloat(value.revenue) });
    });

    if (graphData.length == 0) return <h1>No Data</h1>

    if (type == 'today' || type == 'yesterday') unit = ':00';
    if (type == 'seven_day') xType = 'category';

    return (
      <ResponsiveContainer width='100%' height={420}>
        <BarChart data={graphData} >
          <XAxis type={xType} dataKey='time' unit=':00' padding={{ left: 100, right: 100 }} allowDecimals={false} />
          <YAxis type='number' unit='$' domain={[0, 'dataMax + 500']} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Bar dataKey='revenue' fill='#0081fa' maxBarSize={60}
            label={{ fill: 'white', fontSize: 20 }} background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default TodaySale;
