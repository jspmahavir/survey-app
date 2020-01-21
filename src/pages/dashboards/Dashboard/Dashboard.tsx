import React, { useEffect, useRef, useState } from 'react';

import uuid from 'uuid/v4';
import ReactEcharts from 'echarts-for-react';
import { Alert, Avatar, Button, Card, List, Progress, Select, Table, Tag } from 'antd';

import activityChart from './charts/activityChart';
import browsersOptions from './charts/browsersOptions';

import user1 from '../../../assets/content/user-76-1.jpg';
import user2 from '../../../assets/content/user-76-2.jpg';
import user3 from '../../../assets/content/user-76-3.jpg';

import piOptions from './charts/piOption';
import pi2Options from './charts/pi2Options';
import popularityChart from './charts/popularityChart';
import succesRateChart from './charts/succesRateChart';

import { IPageData, IPageProps } from '../../../interfaces/page-data';

const { Option } = Select;
const columns = [
  {
    title: 'User',
    key: 'user',
    render: ({ img, person }) => {
      return (
        <div className='person-block d-flex align-items-center' key={person + img}>
          <Avatar className='mr-3' style={{ minWidth: 36, minHeight: 36 }} src={window.location.origin + img} />
          <span>{person}</span>
        </div>
      );
    }
  },
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: text => <span className='nowrap'>{text}</span>
  },
  {
    title: 'Page',
    dataIndex: 'page',
    key: 'page',
    render: (link, record, index) => (
      <a className='nowrap' key={index} href={link}>
        Link to page
      </a>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status, record, index) => {
      let color = '';
      let label = '';

      switch (status) {
        case 'info':
          color = '#2fa7ff';
          label = 'PENDING';
          break;
        case 'warning':
          color = '#fc8b37';
          label = 'SENT';
          break;
        default:
          color = '#7cdb86';
          label = 'SUCCESS';
      }

      return (
        <Tag key={index} style={{ color: '#fff' }} color={color}>
          {label}
        </Tag>
      );
    }
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: price => `#${price}`
  },
  {
    title: 'Left',
    dataIndex: 'left',
    key: 'left'
  }
];

const data = [
  {
    title: 'It’s all about simplicity…',
    desc: 'Ian Holm ',
    avatar: user1
  },
  {
    title: 'Chocolate Cake exclusively brings you the classic...',
    desc: 'Anna Smith',
    avatar: user2
  },
  {
    title: 'Say something I’m giving up on you',
    desc: 'James Holt',
    avatar: user3
  }
];

const Dashboard: React.FunctionComponent<IPageProps> = props => {
  const { onSetPage, getPageData } = props;
  const [recentOrders, setRecentOrders] = useState([]);

  const pageData: IPageData = {
    title: 'Dashboard',
    loaded: false,
    breadcrumbs: [
      {
        title: 'Home',
        route: 'dashboard'
      },
      {
        title: 'Dashboard'
      }
    ]
  };

  useEffect(() => onSetPage(pageData), []);

  useEffect(() => {
    getPageData('./data/table.json').then(setRecentOrders);
  }, []);

  return (
    <>
      <Alert
        className='mb-4'
        message={null}
        type='success'
        showIcon
        description='This is a warning message. Please pay attention to view it.'
      />

      <div className='row'>
        <div className='col-12 col-xl-8'>
          <Card title='Activity' bodyStyle={{ padding: 0 }}>
            <ReactEcharts className='chart-container container-h-350' option={activityChart} />
          </Card>
        </div>

        <div className='col-12 col-xl-4'>
          <Card title='Recent posts'>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={70} src={item.avatar} />}
                    title={<a href='https://ant.design'>{item.title}</a>}
                    description={
                      <div className='description-block'>
                        <span className='description'>{item.desc}</span>
                        <Tag className='m-0' style={{ color: '#fff' }} color={'#fc8b37'}>
                          Sent
                        </Tag>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Button className='view-more-btn mt-3' block>
              View more
            </Button>
          </Card>
        </div>

        <div className='col-12 col-xl-8'>
          <Card title='Browsers' bodyStyle={{ padding: '0 30px 30px' }}>
            <ReactEcharts className='chart-container container-h-370' option={browsersOptions} />
          </Card>
        </div>

        <div className='col-12 col-xl-4'>
          <Card bodyStyle={{ padding: 0 }}>
            <div className='d-flex p-4 justify-content-between'>
              <div className='title-box d-flex flex-column'>
                <h5 style={{ fontSize: 18 }} className='title mb-1'>
                  Samsung
                </h5>
                <span className='mb-2 sub-title'>Revenue generated</span>
                <span className='d-flex align-items-baseline' style={{ color: '#c565e7' }}>
                  87,6
                  <i className='icofont-rounded-right-up ml-1' />
                </span>
              </div>
            </div>

            <ReactEcharts className='chart-container container-h-100' option={piOptions} />
          </Card>

          <Card bodyStyle={{ padding: 0 }}>
            <div className='d-flex p-4 justify-content-between'>
              <div className='title-box d-flex flex-column'>
                <h5 style={{ fontSize: 18 }} className='title mb-1'>
                  Samsung
                </h5>
                <span className='mb-2 sub-title'>Revenue generated</span>
                <span className='d-flex align-items-baseline' style={{ color: '#7cdb86' }}>
                  87,6
                  <i className='icofont-rounded-right-up ml-1' />
                </span>
              </div>
            </div>

            <ReactEcharts className='chart-container container-h-100' option={pi2Options} />
          </Card>
        </div>
      </div>

      <div className='row'>
        <div className='col-xl-3 col-sm-12'>
          <Card>
            <div className='widget-card d-flex flex-column justify-content-center align-items-center'>
              <Progress
                type='circle'
                strokeColor={{
                  '25%': '#6ec8ff',
                  '65%': '#b3589c',
                  '100%': '#9d5ce5'
                }}
                percent={84}
              />

              <div className='info'>
                <h6 className='title mb-0'>Server load</h6>

                <div className='desc text-center'>Operations run according to general amount</div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-xl-3 col-sm-12'>
          <Card>
            <div className='widget-card d-flex flex-column justify-content-center align-items-center'>
              <span
                className='mb-3 icofont-color-picker'
                style={{
                  borderRadius: 500,
                  fontSize: 20,
                  padding: 25,
                  color: '#6e40d8',
                  backgroundColor: 'rgba(110,64,216, .2)'
                }}
              />

              <div className='info text-center'>
                <span className='title' style={{ fontSize: 40 }}>
                  15.2k
                </span>

                <div style={{ fontSize: 16 }} className='desc mb-2'>
                  <span className='desc font-weight-bold'>Followers</span>
                </div>

                <p style={{ color: '#7ed321' }}>
                  <i className='icofont-caret-up ' />
                  98,5%
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-xl-3 col-lg-6 col-sm-12'>
          <div className='row'>
            <div className='col-12'>
              <Card>
                <div className='mb-4' style={{ fontSize: 40 }}>
                  $34.4k
                </div>

                <div className='info'>
                  <span className='title'>Sales</span> <br />
                  <span className='desc'>Operations run according to general amount</span>
                </div>
              </Card>
            </div>

            <div className='col-12'>
              <Card>
                <div className='mb-4' style={{ fontSize: 40 }}>
                  2.1k
                </div>

                <div className='info'>
                  <span className='title'>Orders</span> <br />
                  <span className='desc'>Operations run according to general amount</span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className='col-xl-3 col-lg-6 col-sm-12'>
          <Card
            style={{
              backgroundImage:
                'linear-gradient(215deg, rgb(205, 84, 71), rgb(179, 88, 156) 65%, rgb(157, 92, 229))'
            }}>
            <div
              className='widget-card d-flex flex-column justify-content-center align-items-center'
              style={{ color: '#fff' }}>
              <span
                className='mb-3 mt-auto icofont-color-picker'
                style={{
                  borderRadius: 500,
                  fontSize: 20,
                  padding: 25,
                  color: '#f8e71c',
                  backgroundColor: 'rgba(74,74,74, .15)'
                }}
              />

              <div className='info text-center mb-auto' style={{ color: '#fff' }}>
                <div style={{ fontSize: 16 }} className='desc mb-2'>
                  <span className='desc'>San Francisco</span>
                </div>

                <span className='title' style={{ fontSize: 40, color: '#fff' }}>
                  -5&#176;
                </span>
              </div>

              <div className='w-100 align-self-end d-flex d-flex justify-content-between'>
                <div
                  className='d-flex align-items-center justify-content-between'
                  style={{ fontSize: 12 }}>
                  <span
                    className='icofont-water-drop mr-2'
                    style={{ color: '#f8e71c', fontSize: 20 }}
                  />
                  98,5%
                </div>

                <div
                  className='d-flex align-items-center justify-content-between'
                  style={{ fontSize: 12 }}>
                  98,5%
                </div>

                <div
                  className='d-flex align-items-center justify-content-between'
                  style={{ fontSize: 12 }}>
                  <span
                    className='icofont-paper-plane mr-2'
                    style={{ color: '#f8e71c', fontSize: 20 }}
                  />
                  98,5%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card
        bodyStyle={{ padding: 0 }}
        title={
          <div className='card-header mb-4'>
            <div className='title-box'>
              <h5 className='title'>Recent orders</h5>
            </div>

            <div className='actions d-flex'>
              <span className='icofont-trash' />
              <span className='icofont-archive' />
              <span className='icofont-navigation-menu' />
            </div>
          </div>
        }>
        {recentOrders && (
          <Table
            rowKey={() => uuid()}
            pagination={false}
            columns={columns}
            dataSource={recentOrders}
          />
        )}
      </Card>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card>
            <div className='title-box'>
              <h5 className='title'>Tickets overview</h5>
            </div>
            <div className='d-flex justify-content-center align-items-center mb-5 mt-2'>
              <div className='d-lg-flex flex-column d-none mr-auto' style={{ fontSize: 13 }}>
                <span className='card-label'>Completed</span>
                <span>78,661</span>
              </div>
              <Progress
                type='dashboard'
                width={154}
                percent={80}
                strokeColor={{
                  '25%': '#6ec8ff',
                  '65%': '#b3589c',
                  '100%': '#9d5ce5'
                }}
              />

              <div className='d-lg-flex flex-column d-none ml-auto' style={{ fontSize: 13 }}>
                <span className='card-label'>Left</span>
                <span>1,356</span>
              </div>
            </div>
            <div className='button-group'>
              <button className='btn active no-style'>Today</button>
              <button className='btn disabled no-style'>Last Week</button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card>
            <div className='d-flex justify-content-between align-items-start'>
              <div className='title-box'>
                <h5 className='title mb-1'>Popularity</h5>
              </div>

              <Select
                style={{ maxWidth: 140 }}
                defaultValue='google'
                placeholder='Person'
                optionFilterProp='children'>
                <Option value='google'>Bill Gates</Option>
                <Option value='apple'>Tim Cook</Option>
                <Option value='microsoft'>Sati Nadela</Option>
              </Select>
            </div>

            <div className='chart-card'>
              <div className='d-flex justify-content-center'>
                <ReactEcharts
                  option={popularityChart}
                  className='chart-container container-h-180 container-w-180'
                />
              </div>

              <div className='chart-text-block'>
                <div style={{ fontSize: 28 }} className='title'>
                  110k
                </div>
                <div className='label'>VOTES</div>
              </div>

              <div className='markers d-flex justify-content-start flex-column'>
                <div className='marker-block d-flex justify-content-start align-items-center'>
                  <div style={{ backgroundColor: '#f741b5' }} className='marker' />
                  <div className='marker-label'>Bill Gates</div>
                </div>
                <div className='marker-block d-flex justify-content-start align-items-center'>
                  <div style={{ backgroundColor: '#2fa7ff' }} className='marker' />
                  <div className='marker-label'>Tim Cook</div>
                </div>
                <div className='marker-block d-flex justify-content-start align-items-center'>
                  <div style={{ backgroundColor: '#7cdb86' }} className='marker' />
                  <div className='marker-label'>Jeff Bezos</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card
            className='mb-md-0'
            title={
              <div className='title-box' style={{ fontSize: 14 }}>
                <h5 className='title mb-1'>Performance</h5>
                <span className='sub-title'>Operations run according to general amount</span>
              </div>
            }>
            <div className='d-flex flex-column justify-content-end chart-container container-h-300'>
              <div
                className='label-block d-flex justify-content-between'
                style={{ fontSize: '0.9em' }}>
                <span className='label'>Angular</span>
                <span style={{ opacity: 0.8 }} className='value'>
                  35%
                </span>
              </div>
              <Progress percent={30} showInfo={false} />

              <div
                className='label-block d-flex justify-content-between mt-2'
                style={{ fontSize: '0.8em' }}>
                <span className='label'>Html</span>
                <span style={{ opacity: 0.8 }} className='value'>
                  50%
                </span>
              </div>
              <Progress percent={50} showInfo={false} status='active' />

              <div
                className='label-block d-flex justify-content-between mt-2'
                style={{ fontSize: '0.8em' }}>
                <span className='label'>JavaScript</span>
                <span style={{ opacity: 0.8 }} className='value'>
                  65%
                </span>
              </div>
              <Progress percent={65} showInfo={false} status='exception' />

              <div
                className='label-block d-flex justify-content-between mt-2'
                style={{ fontSize: '0.8em' }}>
                <span className='label'>React</span>
                <span style={{ opacity: 0.8 }} className='value'>
                  80%
                </span>
              </div>
              <Progress percent={80} showInfo={false} status='success' />
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card
            className='mb-0'
            title={
              <div className='d-flex justify-content-between align-items-start'>
                <div className='title-box' style={{ maxWidth: '60%', fontSize: 14 }}>
                  <h5 className='title mb-1'>Success rate</h5>
                  <span className='sub-title'>Operations run according to general amount</span>
                </div>

                <Select
                  style={{ maxWidth: 140, marginLeft: 'auto' }}
                  defaultValue='google'
                  placeholder='Company'
                  optionFilterProp='children'>
                  <Option value='google'>Bill Gates</Option>
                  <Option value='apple'>Tim Cook</Option>
                  <Option value='microsoft'>Sati Nadela</Option>
                </Select>
              </div>
            }>
            <ReactEcharts option={succesRateChart} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
