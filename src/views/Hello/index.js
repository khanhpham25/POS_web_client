import React, { Component } from 'react';
import { Layout, Card, Select } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TodaySaleResult from './partials/TodaySaleResult';
import TodaySale from './partials/TodaySale';
import TodayProductSale from './partials/TodayProductSale';

import { getStatisticData } from './actions';

const { Content } = Layout;
const Option = Select.Option;

class Hello extends Component {
  constructor() {
    super();

    this.state = {
      currentSaleSelect: 'today',
      currentProductSelect: 'today',
    }
  }

  componentDidMount() {
    this.props.getStatisticData();
  }

  render() {
    const { data } = this.props;
    const { currentSaleSelect, currentProductSelect } = this.state;
    const dateOptions = [
      <Option value='today' key='sale' >Today</Option>,
      <Option value='yesterday' key='sale' >Yesterday</Option>,
      <Option value='seven_day' key='sale' >7 days</Option>,
      <Option value='this_month' key='sale' >This month</Option>,
      <Option value='last_month' key='sale' >Last Month</Option>,
    ]

    let currentSaleGraph;
    let currentProductGraph;
    let firstTitle;
    let secondTitle;

    if (currentSaleSelect == 'today') { firstTitle = 'Today'; currentSaleGraph = data.today_sale_by_hour_graph; }
    else if (currentSaleSelect == 'yesterday') { firstTitle = 'Yesterday'; currentSaleGraph = data.yesterday_sale_by_hour_graph }
    else if (currentSaleSelect == 'seven_day') { firstTitle = 'Last 7 day'; currentSaleGraph = data.sale_by_seven_day_graph }
    else if (currentSaleSelect == 'this_month') { firstTitle = 'This Month'; currentSaleGraph = data.sale_by_month_graph }
    else { firstTitle = 'Last Month'; currentSaleGraph = data.sale_by_last_month_graph }

    if (currentProductSelect == 'today') { secondTitle = 'Today'; currentProductGraph = data.today_ten_product_sale_graph }
    else if (currentProductSelect == 'yesterday') { secondTitle = 'Yesterday'; currentProductGraph = data.yesterday_ten_product_sale_graph }
    else if (currentProductSelect == 'seven_day') { secondTitle = 'Last 7 day'; currentProductGraph = data.seven_day_ten_product_sale_graph }
    else if (currentProductSelect == 'this_month') { secondTitle = 'This Month'; currentProductGraph = data.this_month_ten_product_sale_graph }
    else { secondTitle = 'Last Month'; currentProductGraph = data.last_month_ten_product_sale_graph }

    return (
      <Content style={{ margin: '0 16px' }}>
        <Card title="Today's Selling Result" style={{ width: '100%' }}
          className='today-sale-result' >
          <TodaySaleResult data={data.todaySaleResult} />
        </Card>

        <Card title={`${firstTitle}'s Sales`} style={{ width: '100%', minHeight: 470 }}
          className='today-sale-result' extra={<Select
            style={{ width: 230 }}
            value={currentSaleSelect}
            onChange={this.onSaleSelectChange.bind(this)}
          >
            {dateOptions}
          </Select>} >
          <TodaySale data={currentSaleGraph} type={currentSaleSelect} />
        </Card>

        <Card title={`Top 10 Most Selling Product By Quantity ${secondTitle}`} style={{ width: '100%', minHeight: 470 }}
          className='today-sale-result' extra={<Select
            style={{ width: 230 }}
            value={currentProductSelect}
            onChange={this.onProductSelectChange.bind(this)}
          >
            {dateOptions}
          </Select>} >
          <TodayProductSale data={currentProductGraph} type={currentProductSelect} />
        </Card>
      </Content>
    );
  }

  onSaleSelectChange(value) {
    this.setState({ currentSaleSelect: value });
  }

  onProductSelectChange(value) {
    this.setState({ currentProductSelect: value });
  }
}

const mapStateToProps = (state) => {
  return ({
    data: state.generalReportReducer.data
  })
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getStatisticData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
