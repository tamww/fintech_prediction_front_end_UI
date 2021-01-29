import { Tag} from 'antd';
import React from "react"

/*mapping of company size and value for comparison */
const mappingEmployee ={
  "1-10":1,
  "11-50":2,
  "51-100":3,
  "101-250":4,
  "251-500":5,
  "501-1000":6,
  "1001-5000":7,
  "5001-10000":8,
  "10000+":9,
  "unkonwn":10,
  "NaN": 11,
}

/*constant: columns name and rendering information */
export const columns = [

  { /*1*/
    title: 'Company Name',
    width: 100,
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
    width: 50,
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
            color = 'green';
          }else if (tag.toUpperCase() === 'NaN'){
            color = 'gray';
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
    width: 100,
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
  },
  { /*3*/
    title: '#Funding Rounds',
    width: 100,
    dataIndex: 'num_funding_rounds',
    fixed: 'left',
    // ellipsis: true,
    sorter: {
      compare: (a, b) => {
          if(a.num_funding_rounds !== "NaN" && b.num_funding_rounds !== "NaN"){
            return a.num_funding_rounds - b.num_funding_rounds
          }else if (a.num_funding_rounds === "NaN"){
            return -1
          }else{
            return 1
          }
        },
      multiple: 2,
    },
  },
  { /*4*/
    title: 'Funding Amount (Millions USD)',
    width: 100,
    dataIndex: 'total_funding_usd',
    fixed: 'left',
    // ellipsis: true,
    render: item => (
      <>
      {item = (Math.trunc((item /1000000)*1000))/1000}
      </>
    ),
    sorter: {
      compare: (a, b) => {
        if(a.total_funding_usd !== "NaN" && b.total_funding_usd !== "NaN"){
          return a.total_funding_usd - b.total_funding_usd
        }else if (a.total_funding_usd === "NaN"){
          return -1
        }else{
          return 1
        }
      
      },
      multiple: 3,
    },
  },
  { /*5*/
    title: 'Country',
    width: 50,
    dataIndex: 'country_code',
    fixed: 'left',
    ellipsis: true,
  },
  { /*6*/
    title: 'Year of Establishment',
    width: 80,
    dataIndex: 'founded_on',
    fixed: 'left',
    ellipsis: true,
    sorter: {
      compare: (a, b) => parseInt((a.founded_on.split("-"))[0]) - parseInt((b.founded_on.split("-"))[0]),
      multiple: 4,
    },
    
  },
  { /*7*/
    title: 'Company Size',
    width: 80,
    dataIndex: 'employee_count',
    fixed: 'left',
    ellipsis: true,
    sorter: {
      compare: (a, b) => {
        if(a.employee_count !== "NaN" && b.employee_count !== "NaN"){
          return mappingEmployee[a.employee_count] - mappingEmployee[b.employee_count]
        }else if (a.employee_count === "NaN"){
          return -1
        }else{
          return 1
        }
      
      },
      multiple: 5,
    },
  },
];

