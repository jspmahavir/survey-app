import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Rate, Tag, Timeline, Table, Divider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IPageData, IPageProps } from '../../../interfaces/page-data';
import API from "../../../utils/API";

const PageSurveyPage: React.FC<IPageProps> = props => {
  const { onSetPage } = props;
  const [surveyData, setSurveyData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      //const result = await API.get('surveys.json');
      const result = await axios('./data/surveys.json');
      setSurveyData(result.data);
    }
    fetchData().catch(err => console.log('Server Error', err));
  }, []);

  const onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  const handleDelete = key => {
    //API.delete('surveys/'+key);
    setSurveyData(surveyData.filter(item => item.id !== key));
  };

  const pageData: IPageData = {
    title: 'Survey Lists',
    loaded: true,
    breadcrumbs: [
      {
        title: 'Home',
        route: 'dashboard'
      },
      {
        title: 'User Pages ',
        route: 'dashboard'
      },
      {
        title: 'Survey Page'
      }
    ]
  };
  useEffect(() => onSetPage(pageData), []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'translations.en.title',
      key: 'title'
    },
    {
      title: 'Description',
      dataIndex: 'translations.en.description',
      key: 'description'
    },
    {
      title: 'Created Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      sorter: (a, b) => a.dateCreated - b.dateCreated
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) =>
        surveyData.length >= 1 ? (<div>
          <Link to={`/survey-page/${record.id}`}>Edit</Link>
          {/* <span><a onClick={() => handleEdit(record.id)} href={`#/survey-page/${record.id}`}>Edit</a></span> */}
          &nbsp;|&nbsp;
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
            <a onClick={e => e.preventDefault()} href='#'>Delete</a>
          </Popconfirm>
          </div>
        ) : null
    }
  ];

  return (
    <>
      <div className='row'>
        <div className='col col-12 col-md-12'>
          <Card title='Survey list' className='component-demo-card'>
            <Button type='primary' style={{ marginBottom: 16 }}>Add a row</Button>
            <Table pagination={{ pageSize: 5 }} dataSource={surveyData} columns={columns} onChange={onChange}/>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PageSurveyPage;
