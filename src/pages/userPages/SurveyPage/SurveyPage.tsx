import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Rate, Tag, Timeline, Table, Divider } from 'antd';
import axios from 'axios';

import { IPageData, IPageProps } from '../../../interfaces/page-data';
import userCover from '../../../assets/content/user-profile.jpg';
import userAvatar from '../../../assets/content/user-400-1.jpg';
import API from "../../../utils/API";

const skills = [
  'HTML',
  'PHP',
  'CSS',
  'SCSS',
  'ANGUlAR',
  'REACT',
  'VUE.JS',
  'JAVASCRIPT',
  'TYPESCRIPT'
];

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
    }
  ];

  return (
    <>
      <div className='row'>
        <div className='col col-12 col-md-12'>
          <Card title='Survey list' className='component-demo-card'>
            <Table pagination={{ pageSize: 5 }} dataSource={surveyData} columns={columns} onChange={onChange}/>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PageSurveyPage;
