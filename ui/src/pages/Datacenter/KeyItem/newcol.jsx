import { Table, Tag, Radio, Space, Button } from 'antd';
import { List } from 'antd/lib/form/Form';
import { text } from 'd3';
import React from "react"

const mappingEmployee ={
  "1-10":0,
  "11-50":1,
  "51-100":2,
  "101-250":3,
  "251-500":4,
  "501-1000":5,
  "1001-5000":6,
  "5001-1000":7,
  "10000+":8,
  "unkonwn":9,
}

export const columns = [
  // { /*1*/
  //   title: 'Add to Favourites',
  //   wdith: 100,
  //   dataIndex: 'addfav',
  //   fixed: 'left',
  //   ellipsis: true,
  //   render: text => <a>22</a>,
  // },
  { /*1*/
    title: 'Company Name',
    wdith: 100,
    dataIndex: 'name',
    fixed: 'left',
    ellipsis: true,
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    render: text => <a>{text}</a>,
    sorter: {
      compare: (a, b) => a.name.length - b.name.length,
      multiple: 1,
    },
  },
  { /*2*/
    title: 'Status',
    wdith: 50,
    dataIndex: 'status',
    fixed: 'left',
    // ellipsis: true,
    render: status => (
      <>
        {
        
        status.split(",").map(tag => {
          let color = "purple";
          if (tag.toUpperCase() === 'ACQUIRED') {
            color = 'blue';
          }else if(tag.toUpperCase()  === 'CLOSED'){
            color = 'red';
          }else if (tag.toUpperCase() === 'OPERATING'){
            color = 'green'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  { /*2.5*/
    title: 'Category',
    wdith: 100,
    dataIndex: 'category_groups_list',
    fixed:'left',
    render: category => (
      <>
      {category.split(",").map(tag =>{
        let color = "blue";
      
      return (
        <Tag color={color} key={tag}>
                {tag}
      </Tag>
      );

      })}
      </>
    )
    // fixed: 'left',
    // ellipsis: true,
    // render: status => (
    //   <>
    //     {
        
    //     status.split(",").map(tag => {
    //       let color = "green";
    //       if (tag === 'Acquired') {
    //         color = 'blue';
    //       }else if(tag === 'Closed'){
    //         color = 'red';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  { /*3*/
    title: '#Funding Rounds',
    wdith: 50,
    dataIndex: 'num_funding_rounds',
    fixed: 'left',
    // ellipsis: true,
    sorter: {
      compare: (a, b) => a.num_funding_rounds - b.num_funding_rounds,
      multiple: 2,
    },
  },
  { /*3*/
    title: 'Funding Amount',
    wdith: 100,
    dataIndex: 'total_funding',
    fixed: 'left',
    // ellipsis: true,
    sorter: {
      compare: (a, b) => a.FundAMT - b.FundAMT,
      multiple: 3,
    },
  },
  { /*4*/
    title: 'Country',
    wdith: 100,
    dataIndex: 'country_code',
    fixed: 'left',
    ellipsis: true,
  },
  { /*5*/
    title: 'Year of Establishment',
    wdith: 100,
    dataIndex: 'founded_on',
    fixed: 'left',
    ellipsis: true,
    sorter: {
      compare: (a, b) => a.YearOfE - b.YearOfE,
      multiple: 4,
    },
    
  },
  { /*6*/
    title: 'Employee Size',
    wdith: 100,
    dataIndex: 'EmployeeSize',
    fixed: 'left',
    ellipsis: true,
    sorter: {
      compare: (a, b) => mappingEmployee[a.EmployeeSize] - mappingEmployee[b.EmployeeSize],
      multiple: 5,
      },
  },
  // { /*7*/
  //   title: '',
  //   wdith: 100,
  //   dataIndex: 'CompName',
  //   fixed: 'left',
  //   ellipsis: true,
  // },
  // { /*8*/
  //   title: 'Company Name',
  //   wdith: 100,
  //   dataIndex: 'CompName',
  //   fixed: 'left',
  //   ellipsis: true,
  // },

    // {
    //     title: 'Company Name',
    //     width: 100,
    //     dataIndex: 'CompName',
    //     key: 'CompName',
    //     fixed: 'left',
    //     ellipsis: true,
    //     render: tags => (
    //         <span>
    //           {tags.map(tag => {
    //             let color = tag.length > 5 ? 'geekblue' : 'green';
    //             if (tag === 'loser') {
    //               color = 'volcano';
    //             }
    //             return (
    //               <Tag color={color} key={tag}>
    //                 {tag.toUpperCase()}
    //               </Tag>
    //             );
    //           })}
    //         </span>
    //       ),
    //       filters: [
    //         {
    //           text: 'London',
    //           value: 'London',
    //         },
    //         {
    //           text: 'New York',
    //           value: 'New York',
    //         },
    //       ],
    //       onFilter: (value, record) => record.address.indexOf(value) === 0,
    // },

];