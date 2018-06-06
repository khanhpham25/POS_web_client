import React, { Component } from 'react';
import { Row, Col } from 'antd';
import pluralize from 'pluralize';

class TodaySaleResult extends Component {
  render() {
    const { data } = this.props;

    return (
      <Row type='flex' gutter={8} justify='center' >
        <Col lg={8} >
          <Row type='flex' >
            <Col lg={4} >
              <div className='daily-sale-icon' >
                <i className='fa fa-usd'></i>
              </div>
            </Col>
            <Col lg={20} >
              <Row type='flex' >
                <Col lg={24}>
                  <div className='report-total-receipt' >
                    {pluralize('Receipt', data.receipt_count, true)}
                  </div>
                </Col>
                <Col lg={24} >
                  <div className='report-sale-result up' >
                    {data.today_revenue}
                  </div>
                </Col>
                <Col lg={24} >
                  <div className='report-note' >
                    Sale
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={8} >
          <Row type='flex' >
            <Col lg={4} >
              <div className='daily-report-icon' >
                <i className={`fa fa-arrow-${data.today_yesterday_diff > 0 ? 'up' : 'down'}`} ></i>
              </div>
            </Col>
            <Col lg={20} >
              <Row type='flex' >
                <Col lg={24}>
                  &nbsp;
                </Col>
                <Col lg={24} >
                  <div className={`report-sale-result ${data.today_yesterday_diff > 0 ? 'up' : 'down'}`} >
                    {data.today_yesterday_diff}%
                  </div>
                </Col>
                <Col lg={24} >
                  <div className='report-note' >
                    Compared with yesterday
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={8} >
          <Row type='flex' >
            <Col lg={4} >
              <div className='daily-report-icon' >
                <i className={`fa fa-arrow-${data.today_month_diff > 0 ? 'up' : 'down'}`}></i>
              </div>
            </Col>
            <Col lg={20} >
              <Row type='flex' >
                <Col lg={24}>
                  &nbsp;
                </Col>
                <Col lg={24} >
                  <div className={`report-sale-result ${data.today_month_diff > 0 ? 'up' : 'down'}`} >
                    {data.today_month_diff}%
                  </div>
                </Col>
                <Col lg={24} >
                  <div className='report-note' >
                    Over the same period last month
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default TodaySaleResult;
