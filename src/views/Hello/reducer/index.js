import * as constants from '../constants';
import { message } from 'antd';

const initialState = {
  errors: null,
  data: {
    todaySaleResult: {
      receipt_count: 0,
      today_revenue: 0,
      today_yesterday_diff: 0,
      today_month_diff: 0
    },
    today_sale_by_hour_graph: [],
    yesterday_sale_by_hour_graph: [],
    sale_by_seven_day_graph: [],
    sale_by_month_graph: [],
    sale_by_last_month_graph: [],
    today_ten_product_sale_graph: [],
    yesterday_ten_product_sale_graph: [],
    seven_day_ten_product_sale_graph: [],
    this_month_ten_product_sale_graph: [],
    last_month_ten_product_sale_graph: [],
  }
}

const generalReportReducer = (state = initialState, action) => {
  switch (action.type) {

    case constants.ON_LOAD_GENERAL_REPORT_SUCCESS:
      let response = action.response.data.data;
      let data = Object.assign({}, state.data);
      Object.assign(data.todaySaleResult, {
        receipt_count: response.receipt_count,
        today_revenue: response.today_revenue,
        today_yesterday_diff: response.today_yesterday_diff,
        today_month_diff: response.today_month_diff,
      });

      data.today_sale_by_hour_graph = response.today_sale_by_hour_graph;
      data.yesterday_sale_by_hour_graph = response.yesterday_sale_by_hour_graph;
      data.sale_by_seven_day_graph = response.sale_by_seven_day_graph;
      data.sale_by_month_graph = response.sale_by_month_graph;
      data.sale_by_last_month_graph = response.sale_by_last_month_graph;

      data.today_ten_product_sale_graph = response.today_ten_product_sale_graph;
      data.yesterday_ten_product_sale_graph = response.yesterday_ten_product_sale_graph;
      data.seven_day_ten_product_sale_graph = response.seven_day_ten_product_sale_graph;
      data.this_month_ten_product_sale_graph = response.this_month_ten_product_sale_graph;
      data.last_month_ten_product_sale_graph = response.last_month_ten_product_sale_graph;

      return {
        errors: null,
        data
      }

    default:
      return state
  }
}

export default generalReportReducer;
