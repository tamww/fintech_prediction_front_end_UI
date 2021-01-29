/*import useful library*/ 
import { Typography,  notification, 
        Row, Col, Button, Select,Space, Card,
        Divider,Descriptions,Tag,
    } from 'antd';
import React, { useState,useContext,useEffect} from 'react';
import { HeartFilled,HeartOutlined} from '@ant-design/icons';

/*import data files*/ 
import categoryRate from "../../components/common/data/categoryRate.json";
import countryRate from "../../components/common/data/countryRate.json";
import employeeRate from "../../components/common/data/employeeRate.json";

import seed_to_a from "../../components/common/data/seed_probs.json";
import a_to_b from "../../components/common/data/series_a_probs.json";

import monthRateDefault from "../../components/common/data/peridoRate.json";

/*import chart to plot data*/
import BarGraphIII from "../../components/chartTemplate/barIII"
import LineGraph from "../../components/chartTemplate/lineI"
import BarGraphIV from "../../components/chartTemplate/barIV"

// import context for data across pages
import UserContext from '../../components/Context/UserContext.js'


/*import css style and image*/ 
import logoEmpty from "../../components/common/img/logo-social-sq.png"
import "./Comparison.css"

/*alias name for better readiness*/
const {Text,Title} = Typography
const { Option } = Select;
var stateXXX = [];
var k1;
var k2;

export default function Companyinfo () {
  const selectedITEM = useContext(UserContext)
  var basedata = selectedITEM.baseDD
  const [comparisonItem, setComparisonItem] = useState([]);
  const [heartState_1, setheartState_1_comparison] = useState(false);
  const [heartState_2, setheartState_2_comparison] = useState(false);

  /*state to hold information of a selected company*/
  const [compnameComparison, setCompanyName_comparison] = useState([]);

  useEffect(() => {
    setComparisonItem(selectedITEM.itemSelected);
    setCompanyName_comparison(selectedITEM.itemName);
  });

  /*function: clear the selected company*/
  function clearCompanySelected_comparison (value) {
        selectedITEM.itemSelected = [];
        selectedITEM.itemName = [];
        setCompanyName_comparison(selectedITEM.itemName);
        setComparisonItem(selectedITEM.itemSelected);
  }

  /*function: select a company for comparion
    - return error message if more than 2 companies selected
    - otherwise return success information 
        @param: value: set of selected company
  */
  function onChangeCompcomparison (value){
      var templist = [];
      for (var i in basedata){
        var name = basedata[i].name;
          for (var j in value ){
            if( name=== value[j]){
              templist.push(basedata[i])
            }
          }
      }
      if(templist.length !== 0 && templist.length <= 2){
        selectedITEM.itemSelected = templist;
        selectedITEM.itemName = value;
        setCompanyName_comparison(selectedITEM.itemName);
        setComparisonItem(selectedITEM.itemSelected);
        notification['success']({
          message: 'Company Selected',
          description:
          `${value} is(are) selected for comparison.`,
          });
      }else{
        notification['warning']({
          message: 'Function Error',
          description:
          'At most 2 companies can be selected for comparison.',
          });
      }
    
  }

  /*function: show company name in title bar
      @param: num: 1: company at the left
                 2: company at the right
  */
  function showcompanyname(num){
    var name = "";
    if (compnameComparison.length >0){
      if (num === "0"){
        name = compnameComparison[0]
      }else if (num=== "1"){
        name = compnameComparison[1]
      }
      return <Title level = {4} className = "text_nameCard_comparison">{name}</Title>;
    }else{
      return <Title level = {4} className = "text_nameCard_comparison">dummy</Title>;
    }
  }

  /*function: show company name with extra wordings "next stage of...." 
      @param: num: 1: company at the left
                 2: company at the right
  */
  function showcompanynameC(num){
    var name = "";
    if (compnameComparison.length >0){
      if (num === "0"){
        name = compnameComparison[0]
      }else if (num=== "1"){
        name = compnameComparison[1]
      }
      return <Title level = {5} className = "text_nameCard_comparison">{`Next Stage of ${name}`}</Title>;
    }else{
      return <Title level = {5} className = "text_nameCard_comparison">dummy</Title>;
    }
  }

  /*function: show company name with extra wordings "Predicted Success Rate over next X months of...." 
      @param: num: 1: company at the left
                 2: company at the right
  */
  function showcompanynameA(num){
    var name = "";
    if (compnameComparison.length >0){
      if (num === "0"){
        name = compnameComparison[0]
      }else if (num=== "1"){
        name = compnameComparison[1]
      }
      return <Text strong>{`Predicted Success Rate over next X months of  ${name}`}</Text>;
    }else{
      return <Text>dummy</Text>;
    }
  }

  /*function: set company logo
    @param: num: 1: company at the left
                 2: company at the right
  */
  function setImageCard (num){
    var itemm;
    if (num === "0"){
      if(comparisonItem[0] !== undefined){
        itemm = comparisonItem[0];
        return <img className = "CompanyLogo_comparison" src = {itemm.logo_url} alt = {itemm.name + ".logo"}></img>;
      }else{
        return <img className = "CompanyLogo_comparison" src = {logoEmpty} alt = "logo"></img>;
      }
    }else if (num=== "1"){
      if(comparisonItem[1] !== undefined){
        itemm = comparisonItem[1];
        return <img className = "CompanyLogo_comparison" src = {itemm.logo_url} alt = {itemm.name + ".logo"}></img>;
      }else{
        return <img className = "CompanyLogo_comparison" src = {logoEmpty} alt = "logo"></img>;
      }
    }
  }

  /*function: handle the change of my favourite list for company at the left*/
  function onClickHeart1(){
      if (compnameComparison[0] !== undefined ){        
        if(heartState_1 === true){
          setheartState_1_comparison(false);
          notification.open({
            message: 'My Favourite List Change !',
            description:
            `${compnameComparison[0]} has been removed from My Favourite.`,
            icon: <HeartOutlined style={{ color: 'red' }} />,
          });
        }else{
          setheartState_1_comparison(true);
          notification.open({
            message: 'My Favourite List Change !',
            description:
            `${compnameComparison[0]} has been added to My Favourite.`,
            icon: <HeartFilled style={{ color: 'red' }} />,
          });
        }          
    }else{
      notification['warning']({
        message: 'Function Error',
        description:
          'There is no company selected.',
      });
    }
  }
  /*function: handle the change of my favourite list for company at the right*/
  function onClickHeart2(){
    if (compnameComparison[0] !== undefined ){        
      if(heartState_2 === true){
          setheartState_2_comparison(false);


        notification.open({
                message: 'My Favourite List Change !',
                description:
                `${compnameComparison[1]} has been removed from My Favourite.`,
                icon: <HeartOutlined style={{ color: 'red' }} />,
              });
      }else{
          setheartState_2_comparison(true);
           notification.open({
                message: 'My Favourite List Change !',
                description:
                `${compnameComparison[1]} has been added to My Favourite.`,
                icon: <HeartFilled style={{ color: 'red' }} />,
              });
      }          
    }else{
      notification['warning']({
        message: 'Function Error',
        description:
          'There is no company selected.',
      });
    }
  }

  /*function: handle the button: Add to Following List for company at the left*/
  function onClickFollow1(){
    if(compnameComparison[0] === undefined){
      notification['warning']({
      message: 'Function Error',
      description:
      'There is no company selected.',
      });
    }else{
      notification['success']({
        message: 'Operation Success',
        description:
        `${compnameComparison[0]} has been added to the following list. `,
      });
    }
  }

  /*function: handle the button: Add to Following List for company at the right*/
  function onClickFollow2(){
    if(compnameComparison[1] === undefined){
      notification['warning']({
      message: 'Function Error',
      description:
      'There is no company selected.',
      });
    }else{
      notification['success']({
        message: 'Operation Success',
        description:
        `${compnameComparison[1]} has been added to the following list. `,
      });
    }
  }

  /*function: handle the button: add to portfolio for company at the left*/
  function onClickPortfolio1(){
    if(compnameComparison[0] === undefined){
      notification['warning']({
      message: 'Function Error',
      description:
      'There is no company selected.',
      });
    }else{
      notification['success']({
        message: 'Operation Success',
        description:
        `${compnameComparison[0]} has been added to the Portfolio. `,
      });
    }
  }

  /*function: handle the button: add to portfolio for company at the right*/
  function onClickPortfolio2(){
    if(compnameComparison[1] === undefined){
      notification['warning']({
      message: 'Function Error',
      description:
      'There is no company selected.',
      });
    }else{
      notification['success']({
        message: 'Operation Success',
        description:
        `${compnameComparison[1]} has been added to the Portfolio. `,
      });
    }
  }
  
  /*function: helper: process dataset to reformat success_rate as percentage
    @param: datas: dataset
  */ 
  function process_data_comparison (datas) {
    for (var i in datas){
      if(typeof(datas[i].success_rate) !== typeof(12)){
        datas[i].success_rate = (Math.trunc(parseFloat(datas[i].success_rate)*10000))/100;
      }
    }
    return datas
  }

  /*function: get the success rate value for one company 
    @param: data1: dataset
              aim: 1: success rate based on category(ies)
                   2: success rate based on company code
  */
  function RateFinder_Comparison(data1, aim, itmm ){
    data1 = process_data_comparison(data1)
    var val = aim? itmm.category_groups_list: itmm.country_code;
    for (var i in data1){
      var check = aim? data1[i].category_groups_list : data1[i].country_code;
      if (check === val){
          return data1[i].success_rate.toString() + "%"
      }
    }
  }

  /*function: return specific predicted rate
    @param: num: item index
            itm: category of the predicted score
  */
  function rateinfo(num, itm) {

    var itemm;
    if (num === "0"){
      if(comparisonItem[0] !== undefined){
        itemm = comparisonItem[0];
        if (itm === "ind"){
          if (process_data_comparison(monthRateDefault) !== monthPredicted(0)){
            var sum = stateXXX[0].success_rate + stateXXX[1].success_rate + stateXXX[2].success_rate+stateXXX[3].success_rate +stateXXX[4].success_rate;
            sum = sum/5;
            k1 = sum;

            return (Math.trunc(k1*100)/100).toString() + "%";
          }else{
            return  "%";
          }
        }else if (itm === "country"){
          return RateFinder_Comparison(countryRate, 0, itemm);
        }else {
          return RateFinder_Comparison(categoryRate, 1, itemm);
        }
    }else{
      return" __ %";
      }
    }else if (num=== "1"){
      if(comparisonItem[1] !== undefined){
        itemm = comparisonItem[1];
        if (itm === "ind"){
          monthPredicted(1)
          var sum = stateXXX[0].success_rate + stateXXX[1].success_rate + stateXXX[2].success_rate+stateXXX[3].success_rate +stateXXX[4].success_rate;
          sum = sum/5;
          k2 = sum;
          return (Math.trunc(k2*100)/100).toString() + "%";
        }else if (itm === "country"){
          return RateFinder_Comparison(countryRate, 0, itemm);
        }else {
          return RateFinder_Comparison(categoryRate, 1, itemm);
        }
    }else{
      return  "__ %";
      }
    }
  }

  /*function: return one of the company information
  @param:
        num: which company  
      catee: index of company information
            - 1: country code
            - 2: region and city
            - 3: region and city
            - 4: address
            - 5: description
            - 6: total funding amount in usd
            - 7: number of funding rounds
            - 8: company size
  */
  function GetInfoComparison(num, catee){
    var itemm;
    if (num === "0"){
      if(comparisonItem[0] !== undefined){
        itemm = comparisonItem[0];
        var ans = "";
        switch (catee) {
          case 0:
              ans = itemm.country_code;
              break;
          case 1:
              ans = itemm.region + ", " + itemm.city;
               break;
          case 2:
              ans = itemm.region + ", " + itemm.city;
              break;
          case 3:
              ans = itemm.address;
               break;
          case 4:
              ans = itemm.short_description;
               break;
          case 5:
              ans = itemm.total_funding_usd;
               break;
          case 6:
              ans = itemm.num_funding_rounds;
               break;
          case 7:
              ans = itemm.employee_count;
              break;
          case 8:
              ans = itemm.rank;
              break;
          default:
              ans = "no";
        } 
        return <span>{ans}</span>
      }else{
        return <span>Nil</span>;
      }
    }else if (num=== "1"){
      if(comparisonItem[1] !== undefined){
        itemm = comparisonItem[1];
        switch (catee) {
          case 0:
              ans = itemm.country_code;
              break;
          case 1:
              ans = itemm.region + ", " + itemm.city;
               break;
          case 2:
              ans =  itemm.region + ", " + itemm.city;
              break;
          case 3:
              ans = itemm.address;
               break;
          case 4:
              ans = itemm.short_description;
               break;
          case 5:
              ans = itemm.total_funding_usd;
               break;
          case 6:
              ans = itemm.num_funding_rounds;
               break;
          case 7:
              ans = itemm.employee_count;
              break;
          case 8:
              ans = itemm.rank;
              break;
          default:
              ans = "no";
        } 
        return <span>{ans}</span>
      }else{
        return <span>Nil</span>;
      }
    }
  }
  
  /*function: return category tag
      @param: num: 1: company at the left
                 2: company at the right
  */
  function category_comparison(num){
    var itemm;
    if (num === "0"){
      if(comparisonItem[0] !== undefined){
        if(comparisonItem[0] !== undefined){
          itemm = comparisonItem[0];
          return itemm.category_groups_list.split(",").map(item=>
            {
              return <Tag color={"blue"} key={item}>{item}</Tag>;
            })}
        }else{
          return <Tag color={"yellow"} key={"empty"}>{"empty"}</Tag>;
        }
    }else if (num=== "1"){
      if(comparisonItem[1] !== undefined){
        itemm = comparisonItem[1];
        return itemm.category_groups_list.split(",").map(item=>
          {
            return <Tag color={"blue"} key={item}>{item}</Tag>;
          })}
      }else{
        return <Tag color={"yellow"} key={"empty"}>{"empty"}</Tag>;
      }
  }

  /*function: return status tag
      @param: num: 1: company at the left
                 2: company at the right
  */
  function status_comparison(num){
    if (num === "0"){
      if(comparisonItem[0] !== undefined){
              var tag = comparisonItem[0].status;
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
        }else{
          return <Tag color={"yellow"} key={"empty"}>{"empty"}</Tag>;
        }
    }else if (num=== "1"){
        if(comparisonItem[1] !== undefined){
              var tag = comparisonItem[1].status;
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
        }else{
          return <Tag color={"yellow"} key={"empty"}>{"empty"}</Tag>;
        }
    }
  }

  /*function: return the next stage information
      @param: num: 1: company at the left
                 2: company at the right
  */
  function next_stage(num){
    var item = comparisonItem[num]
    if(item !== undefined){
      if(item.funding_status === "seed"){
        return "Series A";
      }else if (item.funding_status === "series_a"){
        return "Series B";
      }else if (item.funding_status === "series_b"){
        return "Series C";
      }else if (item.funding_status === "series_c"){
        return "Series D";
      }else if (item.funding_status === "series_d"){
        return "IPO";
      }
    }else{
      return "span";
    }
  }

  /*function: truncate the number
    @params: datas: dataset
  */
  function process_data_numeric_comparison(datas) {
    for (var i in datas){
      for(var j in datas[i]){
        if (typeof(datas[i][j]) === typeof(12)){
          if(datas[i][j] > 0 && datas[i][j] <1){
            datas[i][j] = (Math.trunc(datas[i][j] *10000))/100
          }
        }
      }
    }
    return datas

  }


  /*function: find respected projected monthly rate data
      @param: num: 1: company at the left
                 2: company at the right
  */
  function monthPredicted(num){
    var tempdata = "";
    var flag = 1;
    var item = comparisonItem[num]
    if(item !== undefined){
      if (item.funding_status === "seed"){
        tempdata = process_data_numeric_comparison(seed_to_a);
      }else if (item.funding_status === "series_a"){
        tempdata =  process_data_numeric_comparison(a_to_b);
      }else{
        flag = 0;
        tempdata = process_data_comparison(monthRateDefault);
      }
      var ans = [];
      if (flag === 1){
        for (var i in tempdata){
          if (tempdata[i].name === item.name){
            const entries = Object.entries(tempdata[i])
            let id = 0;
            ans = entries.map(function(itemX){
              if(itemX[0] !== "name" && itemX[0] !== "key") {
                var info = {
                  key: id,
                  period: itemX[0],
                  success_rate: itemX[1],
                }
                id++;
                return info;
              }
            })
            break;
          }
        }
        ans.shift()
        ans.shift()
        stateXXX = []
        stateXXX.push(ans.pop())
        stateXXX.push(ans.pop())
        stateXXX.push(ans.pop())
        stateXXX.push(ans.pop())
        stateXXX.push(ans.pop())
        return ans;
      }else{
        return tempdata;
      }
    }else{
      return process_data_comparison(monthRateDefault);
    }
  }

  /*function: return category group list for reference line in bar graph
      @param: num: 1: company at the left
                 2: company at the right
  */
  function referenceline (num){
      if (comparisonItem[num] !== undefined){
        return comparisonItem[num].category_groups_list;
      }else{
        return ""
      }
  }

  /*function: return company size for reference point in line graph
      @param: num: 1: company at the left
                 2: company at the right
  */
  function getLinePos(num){
    if (comparisonItem[num] !== undefined){
      return comparisonItem[num].employee_count;
    }else{
      return ""
    }
  }

  /*function: return company size success rate
      @param: num: 1: company at the left
                 2: company at the right
  */
  function getLineVal(num){
    if (comparisonItem[num] !== undefined){
      var target = comparisonItem[num].employee_count;
      for (var i in employeeRate){
        if (employeeRate[i].employee === target){
          return employeeRate[i].success_rate;
        }
      }
    }else{
      return ""
    }
  }
    return (
        <div className = "comparisoninfopager">
{/* Search Bar */}
          <Row className = "searchbar_comparison">
                <div className = "SearchCompany_comparison">
                    <Space size = "middle">
                          <div className = "searchtitle_comparison">
                            <Text strong style = {{display:"inline-block"}} >Company Search :</Text>
                          </div>
                          
                          <Select
                            mode="multiple"
                            className = "selector_comparison"
                            showSearch
                            style={{ width: '800px' }}
                            placeholder="Please select a company"
                            onChange={onChangeCompcomparison}
                            value = {compnameComparison}
                            onSearch={onChangeCompcomparison}
                            filterOption={(inputValue, option) => 
                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            > 
                            {basedata.map(item => (
                                <Option key={item.key} value = {item.name}>
                                  {item.name}
                                </Option>
                            ))}
                          </Select>

                          <Button type="primary" className = "clearSelection_comparison" 
                          onClick = {clearCompanySelected_comparison}
                          >
                            <p className = "clearSelectionText_comparison" >Clear Selection</p>
                          </Button>
                      </Space>
                  </div>
            </Row>
{/* Title Bar */}
            <Row className = "titlebar_comparison" >
                <Col span = {11}> {/*1st company*/}
                  <Row>
                    <Col span = {16} >
                      <Row style = {{display:"flex", flexDirection:"row"}} justify="space-around" align="middle">
                        <Col span = {8} >
                          <div className = "CompanyLogo_holder_comparison">
                          {setImageCard("0")}
                          </div >
                        </Col>
                        <Col span = {16}  className = "nameCard_comparison">
                            {showcompanyname("0")}
                        </Col>
                      </Row>
                    </Col>
                    
                    <Col span = {8} >
                        <Row justify="start" align="middle">
                            <Button 
                                type = "link" 
                                icon = {heartState_1 === false?<HeartOutlined style = {{color:"red"}}/>:<HeartFilled style = {{color:"red"}}/>} 
                                onClick = {onClickHeart1}
                              >
                              <Text type="danger">
                                Add to My Favourite
                              </Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button 
                            type="primary"
                            onClick = {onClickFollow1}
                            className = "button_comparison"
                          >
                          Add to Following List
                          </Button>
                      </Row>
                      <Row>
                            <Button 
                            type="primary"
                            onClick = {onClickPortfolio1}
                            className = "button_comparison"
                          >
                          Add to Portfolio
                          </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                
                <Col span = {1}>
                <Divider type = "vertical" style = {{height:"100%"}}/>
                <Divider type = "vertical" style = {{height:"100%"}}/>

                </Col>

                <Col span = {12}> {/*2nd company*/}
                <Row>
                    <Col span = {16} >
                      <Row style = {{display:"flex", flexDirection:"row"}} justify="space-around" align="middle">
                        <Col span = {8} >
                          <div className = "CompanyLogo_holder_comparison">
                          {setImageCard("1")}
                          </div >
                        </Col>
                        <Col span = {16}  className = "nameCard_comparison">
                            {showcompanyname("1")}
                        </Col>
                      </Row>
                    </Col>
                    
                    <Col span = {8} >
                        <Row justify="start" align="middle">
                            <Button 
                                type = "link" 
                                icon = {heartState_2 === false?<HeartOutlined style = {{color:"red"}}/>:<HeartFilled style = {{color:"red"}}/>} 
                                onClick = {onClickHeart2}
                              >
                              <Text type="danger">
                                Add to My Favourite
                              </Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button 
                            type="primary"
                            onClick = {onClickFollow2}
                            className = "button_comparison"
                          >
                          Add to Following List
                          </Button>
                      </Row>
                      <Row>
                            <Button 
                            type="primary"
                            onClick = {onClickPortfolio2}
                            className = "button_comparison"
                          >
                          Add to Portfolio
                          </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
            </Row>

{/* Main Content */}
            <Row className = "contentbox_comparison">
                <Col span = {11}> {/*1st company*/}
                    <Row>
                      <Col span = {14}>
                          <Descriptions
                            title = "Basic Fact"
                            size = "small"
                            bordered
                            column={1}
                            className = "CompanyInfoBox_comparison"
                            contentStyle = {{
                              fontSize:"small"
                            }}
                          >
                            <Descriptions.Item label="Country">{GetInfoComparison("0", 0)}</Descriptions.Item>
                            <Descriptions.Item label="City">{GetInfoComparison("0", 1)}</Descriptions.Item>
                            <Descriptions.Item label="Address">{GetInfoComparison("0", 3)}</Descriptions.Item>
                            <Descriptions.Item label="Description">{GetInfoComparison("0", 4)}</Descriptions.Item>
                            <Descriptions.Item label="Category">{category_comparison("0")}</Descriptions.Item>
                          </Descriptions>
                      </Col>
                      <Col span = {10}>
                        <Descriptions
                          title = "Financial Features"
                          size = "small"
                          bordered
                          column={1}
                          className = "CompanyInfoBox_comparison"
                        >
                          <Descriptions.Item label="Funding Amount (USD)">{GetInfoComparison("0", 5)}</Descriptions.Item>
                          <Descriptions.Item label="Number of Funding Rounds">{GetInfoComparison("0", 6)}</Descriptions.Item>
                          <Descriptions.Item label="Company Size">{GetInfoComparison("0", 7)}</Descriptions.Item>
                          <Descriptions.Item label="Status">{status_comparison("0")}</Descriptions.Item>
                          <Descriptions.Item label="Rank">{GetInfoComparison("0", 8)}</Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row>
                    <br/>
                    <Row justify = "space-around" align = "middle"> {/* numeric score*/}
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#2f4858",
                              borderColor: "#2f4858",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                            }}
                          >
                            <div>
                              Individual Success Rate:
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("0", "ind")}</Title>
                            </div>
                          </div>
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#2176ff",
                              borderColor: "#2176ff",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                            }}
                          >
                            <div>
                              Success Rate (Country):
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("0","country") }</Title>
                            </div>
                          </div>
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#33a1fd",
                              borderColor: "#33a1fd",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                            }}
                          >
                            <div>
                              Success Rate (Category):
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("0","category") }</Title>
                            </div>
                          </div>

                    </Row>
                </Col>

                <Col span = {1}> {/* divider*/ }
                  <Divider type = "vertical" style = {{height:"100%"}}/>
                  <Divider type = "vertical" style = {{height:"100%"}}/>
                </Col>

                <Col span = {12}> {/*2nd company*/}
                    <Row>
                      <Col span = {14}>
                          <Descriptions
                            title = "Basic Fact"
                            size = "small"
                            bordered
                            column={1}
                            className = "CompanyInfoBox_comparison"
                            contentStyle = {{
                              fontSize:"small"
                            }}
                          >
                            <Descriptions.Item label="Country">{GetInfoComparison("1", 0)}</Descriptions.Item>
                            <Descriptions.Item label="City">{GetInfoComparison("1", 1)}</Descriptions.Item>
                            <Descriptions.Item label="Address">{GetInfoComparison("1", 3)}</Descriptions.Item>
                            <Descriptions.Item label="Description">{GetInfoComparison("1", 4)}</Descriptions.Item>
                            <Descriptions.Item label="Category">{category_comparison("1")}</Descriptions.Item>
                          </Descriptions>
                      </Col>
                      <Col span = {10}>
                        <Descriptions
                          title = "Financial Features"
                          size = "small"
                          bordered
                          column={1}
                          className = "CompanyInfoBox_comparison"
                        >
                          <Descriptions.Item label="Funding Amount (USD)">{GetInfoComparison("1", 5)}</Descriptions.Item>
                          <Descriptions.Item label="Number of Funding Rounds">{GetInfoComparison("1", 6)}</Descriptions.Item>
                          <Descriptions.Item label="Company Size">{GetInfoComparison("1", 7)}</Descriptions.Item>
                          <Descriptions.Item label="Status">{status_comparison("1")}</Descriptions.Item>
                          <Descriptions.Item label="Rank">{GetInfoComparison("1", 8)}</Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row>
                    <br/>
                    <Row justify = "space-around" align = "middle"> {/* numeric score*/}
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#2f4858",
                              borderColor: "#2f4858",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                              
                              // color: "white"
                            }}
                          >
                            <div>
                              Individual Success Rate:
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("1", "ind")}</Title>
                            </div>
                          </div>
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#2176ff",
                              borderColor: "#2176ff",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                            }}
                          >
                            <div>
                              Success Rate (Country):
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("1","country") }</Title>
                            </div>
                          </div>
                          <div 
                            type="primary" 
                            id = "suggestionrate_comparison"
                            className = "suggestionrate"
                            style ={{
                              backgroundColor: "#33a1fd",
                              borderColor: "#33a1fd",
                              width: "30%",
                              borderRadius: "25px",
                              height:"6vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              fontSize:"medium",
                            }}
                          >
                            <div>
                              Success Rate (Category):
                              <br/>
                              <Title style = {{color:"white"}} level = {4} >{rateinfo("1","category") }</Title>
                            </div>
                          </div>

                    </Row>
                </Col>
            </Row>
            
{/* Graph Bar */}
            <Row className = "graphbar_comparison">

              
              <Row className = "graph area" style = {{width:"100%"}}>
                <Col span = {3} style = {{display:"flex", flexDirection:"column"}}>
                    <Space direction="vertical">
                    <Card bordered={false} size="small"  className = "StatusCard_comparison">
                        {showcompanynameC("0")}
                       <Title level = {5}>{next_stage(0)}</Title>
                    </Card>
                    <Card bordered={false} size="small"  className = "StatusCard_comparison">
                    {showcompanynameC("1")}
                       <Title level = {5}>{next_stage(1)}</Title>
                    </Card>
                    </Space>
                </Col>
                <Col span = {7}>
                    {showcompanynameA("0")}
                        <div >
                          <BarGraphIV
                          data = {monthPredicted(0)}
                          Xaiss = "period"
                          Yaiss = "success_rate"
                      /> 
                      </div> 
                    {showcompanynameA("1")}
                      <div >
                        <BarGraphIV
                        data = {monthPredicted(1)}
                        Xaiss = "period"
                        Yaiss = "success_rate"
                    /> 
                    </div> 
                </Col>
                <Col span = {7}>
                  <Title level = {5}>Distribution of Predicted Score Based on Category</Title>
                  <div ><BarGraphIII
                                      dataS = {process_data_comparison(categoryRate)}  
                                      KeyX = "category_groups_list"
                                      KeyY = "success_rate"
                                      RefX = {referenceline(0)}
                                      RefY = {referenceline(1)}
                                  /> </div> 
                </Col>
                <Col span = {7}>
                <Title level = {5}>Distribution of Predicted Score Based on Employee Size</Title>
                  <div><LineGraph
                      dataS = {process_data_comparison(employeeRate)}
                      X1 = {getLinePos(0)}
                      Y1 = {getLineVal(0)}
                      X2 = {getLinePos(1)}
                      Y2 = {getLineVal(1)}
                  />
                  </div>
                </Col>
              </Row>
            </Row>

        </div>
        
    )
}
