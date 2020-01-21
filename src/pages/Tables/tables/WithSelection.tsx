import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => (
      <a onClick={e => e.preventDefault()} href='#'>
        {text}
      </a>
    )
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown 1',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green 1',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black 1',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Disabled User 1',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name
  })
};

const WithSelection = () => {
  return (
    <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
    
  );
};
export default WithSelection;
