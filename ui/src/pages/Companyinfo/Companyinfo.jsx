import { Typography,  notification, 
        Row, Col, Button, Select,Space, Card,
        Descriptions,Tag,
    } from 'antd';
import React, { useState,useContext} from 'react';
import { HeartFilled,HeartOutlined, CloudDownloadOutlined} from '@ant-design/icons';
import GCmap from "../../components/common/MapV2/mapChartwithAnnotate.jsx"
import ReactTooltip from "react-tooltip";

/*import useful data*/ 
import categoryRate from "../../components/common/data/categoryRate.json";
import countryRate from "../../components/common/data/countryRate.json";
import employeeRate from "../../components/common/data/employeeRate.json";

import seed_to_a from "../../components/common/data/seed_probs.json";
import a_to_b from "../../components/common/data/series_a_probs.json";

import monthRateDefault from "../../components/common/data/peridoRate.json";


/*import chart to plot data*/
import RadarGraph from "../../components/chartTemplate/radar"
import BarGraph from "../../components/chartTemplate/bar"
import BarGraphII from "../../components/chartTemplate/barII"

/*import css style and image*/ 
import logoEmpty from "../../components/common/img/logo-social-sq.png"
import "./Companyinfo.css"

/*import context file */
import UserContext from '../../components/Context/UserContext.js'


/*alias name for better readiness*/
const {Text,Title, Link} = Typography
const { Option } = Select;



export default function Companyinfo () {
  const selectedITEM = useContext(UserContext)
  var basedata = selectedITEM.baseDD

  const [inspectedItem, setInspect] = useState("");
  const [heartState, setheartState] = useState(false);
  /*state to hold information of a selected company*/
  const [compname, setCompanyName] = useState("");
  /*store the tooltip state*/
  const [content, setContent] = useState("");

  /*set of state to hold the content for further editing*/
  const [info_country, setInfoCountry] = useState("");
  const [info_Region, setInfoRegion] = useState("");
  const [info_city, setInfocity] = useState("");
  const [info_address, setInfoaddress] = useState("");
  const [info_description, setInfodescription] = useState("");
  const [info_fundround, setInfofundround] = useState();
  const [info_fundamt, setInfofundamt] = useState();
  const [info_employeeSize, setInfoemployeeSize] = useState("");
  const [info_category, setInfoCate] = useState("");
  const [info_status, setInfostatus] = useState("");
  const [info_Fundstatus, setInfoFundstatus] = useState("");
  const [info_rank, setInforank] = useState("");
  const [info_crubLink , setInfocrubLink] = useState("");
  const [info_weblink, setInfoweblink] = useState("");
  const [changable , setChangeable] = useState(false);
  const [edittext, setEditext] = useState("Edit")
  var idex = "";
  var stateX = []

      var IndividualData = [
        {
          key:"X", value:"", datapoint:0, ref:100,
        },
        {
          key:"X", value:"", datapoint:0, ref:100,
        },
        {
          key:"X", value:"", datapoint:0, ref:100,
        },
        {
          key:"X", value:"", datapoint:0, ref:100,
        },
        {
          key:"X", value:"", datapoint:0, ref:100,
        },      

      ]

      /*function: reset all the boxes when clear selection clicked*/ 
      function resetINFO(){

        setCompanyName("");
        setInspect("");
    
        setInfoCountry("");
        setInfocity("");
        setInfoRegion("");
        setInfoaddress("");
        setInfodescription("");
    
        setInfofundround();
        setInfofundamt();
        setInfoemployeeSize("");
    
        setInfostatus("");
        setInfoFundstatus("")
        setInforank("");
        setInfoCate("");
        setInfocrubLink("");
        setInfoweblink("");
      }

      /*function: process data to return percentage data*/
      function process_data (datas) {
        for (var i in datas){
          if(typeof(datas[i].success_rate) !== typeof(12)){
            datas[i].success_rate = (Math.trunc(parseFloat(datas[i].success_rate)*10000))/100;
          }
        }
        return datas
      }

      /*function: truncate the number*/
      function process_data_numeric(datas) {
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


      /*function: find respected projected monthly rate data*/
      function monthPredicted(){
        var tempdata = "";
        var flag = 1;
        if (inspectedItem.funding_status === "seed"){
          tempdata = process_data_numeric(seed_to_a);
        }else if (inspectedItem.funding_status === "series_a"){
          tempdata =  process_data_numeric(a_to_b);
        }else{
          flag = 0;
          tempdata = process_data(monthRateDefault);
        }
        var ans = [];
        if (flag === 1){
          for (var i in tempdata){
            if (tempdata[i].name === inspectedItem.name){
              const entries = Object.entries(tempdata[i])
              let id = 0;
              ans = entries.map(function(item){
                var info = {
                  "key": id,
                  "period": item[0],
                  "success_rate": item[1],
                }
                id++;
                return info;
              })
              ans.shift()
              ans.shift()
              stateX = []
              stateX.push(ans.pop())
              stateX.push(ans.pop())
              stateX.push(ans.pop())
              stateX.push(ans.pop())
              stateX.push(ans.pop())
            }
          }
          return ans;
        }else{
          return tempdata;
        }
      }
      /*function: get the top 3 important features*/
      function getFeatures(){
        if (stateX.length !== 0){
          stateX = stateX.sort((a,b) => (a.success_rate > b.success_rate) ? 1 : ((b.success_rate > a.success_rate) ? -1 : 0))
          var ans = stateX.map(function(item){
            return <p style ={{fontSize:"xx-small"}}>{item.period}</p>
          })
          ans.pop()
          ans.pop()
          return ans;
          
        }else{
          return <p>Card content</p>;
        }
      }

  

      /*function: return specific data*/
      function RateFinder(data1, aim ){
        data1 = process_data(data1)
        var val = aim? inspectedItem.category_groups_list: inspectedItem.country_code;
        for (var i in data1){
          var check = aim? data1[i].category_groups_list : data1[i].country_code;
          if (check === val){
              return `${data1[i].success_rate}%`
          }
        }
      }

    function getRadial(){
      if(compname !== ""){
        monthPredicted()
        if (inspectedItem.funding_status === "seed" || inspectedItem.funding_status === "series_a"){
        
        // console.log(stateX)
        IndividualData[0].key = stateX[0].period;
        IndividualData[0].datapoint = stateX[0].success_rate;

        IndividualData[1].key = stateX[1].period;
        IndividualData[1].datapoint = stateX[1].success_rate;

        IndividualData[2].key= stateX[2].period;
        IndividualData[2].datapoint = stateX[2].success_rate;

        IndividualData[3].key = stateX[3].period;
        IndividualData[3].datapoint = stateX[3].success_rate;

        IndividualData[4].key = stateX[4].period;
        IndividualData[4].datapoint = stateX[4].success_rate;
        }else{
          return IndividualData;
        }
      }
            return IndividualData;
    }
    
    function clearRadial(){
            IndividualData[0].value = "Empty";
            IndividualData[0].datapoint = 0;

            IndividualData[1].value = "Empty";
            IndividualData[1].datapoint = 0;

            IndividualData[2].value = "Empty";
            IndividualData[2].datapoint = 0;

            IndividualData[3].value = "Empty";
            IndividualData[3].datapoint = 0;

            IndividualData[4].value = "Empty";
            IndividualData[4].datapoint = 0;
            stateX = []
    }
            
      /*function: select a company*/
      function onChangeComp (value){
        setCompanyName(value);
        for (var i in basedata){
          var name = basedata[i].name;
            if(name === value){
              // console.log("enter?")
            setInspect(basedata[i]);
            getRadial();
            
            setInfoCountry(basedata[i].country_code);
            setInfocity(basedata[i].city);
            setInfoRegion(basedata[i].region);
            setInfoaddress(basedata[i].address);
            setInfodescription(basedata[i].short_description);
    
            setInfofundround(basedata[i].num_funding_rounds.toString());
            setInfofundamt(basedata[i].total_funding_usd.toString());
            setInfoemployeeSize(basedata[i].employee_count);
    
            setInfostatus(basedata[i].status);
            setInfoFundstatus(basedata[i].funding_status)
            setInforank(basedata[i].rank);
            setInfoCate(basedata[i].category_groups_list);
            setInfocrubLink(basedata[i].cb_url);
            setInfoweblink(basedata[i].homepage_url);
            idex = i;
          }
        }
      }

      /*function: clear the selected company*/
      function clearCompanySelected (value) {
        setInspect("");
        clearRadial();
        resetINFO();
      }

      /*function: set company name*/
      function showcompanyname(){
        if (compname !== ""){
          return <Title level = {4} className = "text_nameCard_companyinfo">{compname}</Title>;
        }else{
          return <Title level = {4} className = "text_nameCard_companyinfo">dummy</Title>;
        }
      }

      /*function: set company logo*/
      function setImageCard (){
        if (compname !== ""){
          return <img style={{display: "inline-block"}} src = {inspectedItem.logo_url} alt = {inspectedItem.name + ".logo"}></img>;
        }else{
          return <img style={{display: "inline-block"}} src = {logoEmpty} alt = "logo"></img>;
        } 
      }

      /*function: handle the change of my favourite list*/
      function onClickHeart(){
        if(compname === ""){
          notification['warning']({
            message: 'Function Error',
            description:
              'There is no company selected.',
          });
        }else{
            if(heartState === true){
              setheartState(false);
              notification.open({
                message: 'My Favourite List Change !',
                description:
                `${compname} has been removed from My Favourite.`,
                icon: <HeartOutlined style={{ color: 'red' }} />,
              });
            }else{
              setheartState(true);
              notification.open({
                message: 'My Favourite List Change !',
                description:
                `${compname} has been added to My Favourite.`,
                icon: <HeartFilled style={{ color: 'red' }} />,
              });
            }
        }
      }

      /*function: handle the file export*/
      function onClickPDF(){
        if(compname === ""){
          notification['warning']({
            message: 'Function Error',
            description:
              'There is no company selected.',
          });
        }else{
          notification['success']({
            message: 'File Download',
            description:
            `PDF file of ${compname} has been exported. `,
          });
        }
      }

      /*function: handle the button: add to comparison*/
      function onClickADDComparison(){
        if(compname === ""){
          notification['warning']({
            message: 'Function Error',
            description:
              'There is no company selected.',
          });
        }else{
          notification['success']({
            message: 'Operation Success',
            description:
            `${compname} has been added to the comparison table. `,
          });
        }
      }

      /*function: handle the button: Add to Following List*/
      function onClickFollow(){
        if(compname === ""){
          notification['warning']({
            message: 'Function Error',
            description:
              'There is no company selected.',
          });
        }else{
          notification['success']({
            message: 'Operation Success',
            description:
            `${compname} has been added to the following list. `,
          });
        }
      }

      /*function: handle the button: Add to the Portfolio*/
      function onClickPortfolio(){
        if(compname === ""){
          notification['warning']({
            message: 'Function Error',
            description:
              'There is no company selected.',
          });
        }else{
          notification['success']({
            message: 'Operation Success',
            description:
            `${compname} has been added to the portfolio. `,
          });
        }
      }

      /*function: update the investment suggestion box*/
      function suggestionUpdate(){
        if(compname === ""){
          return <Text style ={{color:"white"}}>Chance to Move Next Stage: Nil</Text>
        }else{
          getRadial()
          var sum = IndividualData[0].datapoint + IndividualData[1].datapoint + IndividualData[2].datapoint+IndividualData[3].datapoint +IndividualData[4].datapoint;
          sum = sum/5;
          if (inspectedItem.funding_status === "seed"){
            if (sum >= 20){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#25da9b";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Highly Possible</Text>
            }else if (sum >= 17){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#2ccdd3";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Possible</Text>
            }else if (sum >= 13){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#1ea5e1";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Maybe</Text>
            }else if (sum >= 10){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#691ee1";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Medium</Text>
            }else if (sum >= 5){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#c53aae";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Less Possible</Text>
            }else{
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#c5423a";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Least Possible</Text>
            }
          }else if (inspectedItem.funding_status === "series_a"){
            if (sum >= 40){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#25da9b";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Highly Possible</Text>
            }else if (sum >= 35){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#2ccdd3";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Possible</Text>
            }else if (sum >= 25){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#1ea5e1";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Maybe</Text>
            }else if (sum >= 15){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#691ee1";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Medium</Text>
            }else if (sum >= 10){
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#c53aae";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Less Possible</Text>
            }else{
              document.getElementById("suggestion_companyinfo").style.backgroundColor = "#c5423a";
              return <Text style ={{color:"white"}}>Chance to Move Next Stage: Least Possible</Text>
            }
          }else{
            document.getElementById("suggestion_companyinfo").style.backgroundColor = "#ffffff";
            return <Text style ={{color:"black"}}>Chance to Move Next Stage: No Information</Text>
          }

        }
      }

      /*function: return category tag*/
      function category_companyinfo(){
        if(inspectedItem !== ""){
        return inspectedItem.category_groups_list.split(",").map(item=>
          {
            return <Tag color={"red"} key={item}>{item}</Tag>;
          })}
      }

      /*function: return status tag*/
      function status_companyinfo(){
        if(inspectedItem !== ""){

          var tag = inspectedItem.status;
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
        }
      }

      /*function: handle the changes after editing */
      const Editing =() =>{
        setChangeable(!changable)
        if (edittext === "Edit"){setEditext("Complete")}else{setEditext("Edit")}
        if(inspectedItem !== undefined && idex !== ""){
          basedata[idex].country_code = info_country;
          basedata[idex].city = info_city;
          basedata[idex].region = info_Region;
          basedata[idex].address = info_address;
          basedata[idex].short_description = info_description;
  
          basedata[idex].num_funding_rounds = parseFloat(info_fundround);
          basedata[idex].total_funding_usd = parseFloat(info_fundamt);
          basedata[idex].employee_count = info_employeeSize;
  
          basedata[idex].status = info_status;
          basedata[idex].funding_status = info_Fundstatus;
          basedata[idex].rank = info_rank;
        }
      }

    return (
<div className = "companyinfopager">
{/* Search Bar */}
          <Row className = "searchbar_companyinfo">
                <div className = "SearchCompany_companyinfo">
                    <Space size = "middle">
                          <div className = "searchtitle_companyinfo">
                            <Text strong style = {{display:"inline-block"}} >Company Search :</Text>
                          </div>
                          
                          <Select
                            className = "selector_companyinfo"
                            showSearch
                            allowClear
                            style={{ width: '400px' }}
                            placeholder="Please select a company"
                            onChange={onChangeComp}
                            value = {compname}
                            onSearch={onChangeComp}
                            filterOption={(inputValue, option) => 
                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            > 
                            {basedata.map(item => (
                                <Option key={item.key} value = {item.name}>
                                  {item.name}
                                </Option>
                            ))}
                          </Select>

                          <Button type="primary" className = "clearSelection_companyinfo" onClick = {clearCompanySelected}>
                            <p className = "clearSelectionText_companyinfo" >Clear Selection</p>
                          </Button>
                      </Space>
                  </div>
            </Row>
{/* Title Bar */}
            <Row className = "titlebar_companyinfo">
              <Col span = {7} className = "titlebar_left_companyinfo">
                    <Col >
                    <div className = "CompanyLogo_companyinfo">
                      {setImageCard()}
                    </div>
                    </Col>
                    <Col >
                    <div className = "nameCard_companyinfo">
                        {showcompanyname()}
                    </div>
                    </Col>
              </Col>
              <Col span = {5} className = "titlebar_extra_function_companyinfo">
                
                  <Button 
                      type = "link" 
                      icon = {heartState === false?<HeartOutlined style = {{color:"red"}}/>:<HeartFilled style = {{color:"red"}}/>} 
                      onClick = {onClickHeart}
                    >
                    <Text type="danger">
                      Add to My Favourite
                    </Text>
                  </Button>
                
                <br/>
                
                  <Button 
                      type = "link" 
                      icon = {<CloudDownloadOutlined style = {{color:"grey"}}/>} 
                      onClick = {onClickPDF}
                    >
                    <Text underline>
                    Export to PDF
                    </Text>
                  </Button>
              </Col>

              <Col span = {12}>
                <Row style = {{height: "50%", 
                              width:"100%", 
                              // backgroundColor:"grey", 
                              zIndex:"6", 
                              alignItems:"center",
                              justifyContent:"space-around", 
                              display:"flex"}}>
                <Button 
                      type="primary" 
                      onClick = {onClickADDComparison}
                      className = "button_companyinfo"
                    >
                    Add to Comparison
                  </Button>
                  <Button 
                      type="primary"
                      onClick = {onClickFollow}
                      className = "button_companyinfo"
                    >
                    Add to Following List
                  </Button>
                  <Button 
                      type="primary" 
                      onClick = {onClickPortfolio}
                      className = "button_companyinfo"
                    >
                    Add to the Portfolio
                  </Button>
                </Row>

                <Row style = {{height: "50%",
                              width:"100%",
                              // backgroundColor:"grey",
                              zIndex:"6",
                              alignItems:"center",
                              justifyContent:"center", 
                              display:"flex", 
                              marginTop:"5px"}}>
                      <Col span = {24} style={{display:"flex",justifyContent:"center"}}>
                          <div 
                            type="primary" 
                            id = "suggestion_companyinfo"
                            className = "suggestionC"
                            style ={{
                              backgroundColor: "orange",
                              borderColor: "orange",
                              width: "27vw",
                              borderRadius: "25px",
                              height:"5vh",
                              color:"white",
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              fontSize:"large",
                            }}
                          >
                            {suggestionUpdate()}
                          </div>
                      </Col>
                </Row>
              </Col>
            </Row>
            {/* <Divider/> */}
{/* Main Content */}
    <Row>
        <Col span = {16}>
          <Row className = "contentbox_companyinfo">
            <Col span = {12}>
              <Title level = {5}>Company Portfolio <Button type="primary" onClick = {Editing}>{edittext}</Button></Title>
                <div>
                  <Descriptions
                    size = "small"
                    bordered
                    column={1}
                    className = "CompanyInfoBox_companyinfo"
                    contentStyle = {{
                      fontSize:"small"
                    }}
                  >
                    <Text strong>Basic Fact</Text>
                    <Descriptions.Item label="Country"><Text editable={{editing:changable , onChange: setInfoCountry }}>{info_country}</Text></Descriptions.Item>
                    <Descriptions.Item label="City"><Text  editable={{editing:changable , onChange: setInfoRegion }}>{info_Region}</Text>, <Text  editable={{editing:changable , onChange: setInfocity }}>{info_city}</Text></Descriptions.Item>
                    <Descriptions.Item label="Address"><Text  editable={{editing:changable , onChange: setInfoaddress }}>{info_address}</Text></Descriptions.Item>
                    <Descriptions.Item label="Description"><Text  editable={{editing:changable , onChange: setInfodescription }}>{info_description}</Text></Descriptions.Item>
                    <Text strong>Financial Features</Text>
                    <Descriptions.Item label="Funding Amount (USD)"><Text  editable={{editing:changable , onChange: setInfofundamt }}>{info_fundamt}</Text></Descriptions.Item>
                    <Descriptions.Item label="Number of Funding Rounds"><Text  editable={{editing:changable , onChange: setInfofundround }}>{info_fundround}</Text></Descriptions.Item>
                    <Descriptions.Item label="Company Size"><Text  editable={{editing:changable , onChange: setInfoemployeeSize }}>{info_employeeSize}</Text></Descriptions.Item>
                    <Descriptions.Item label="Category">{category_companyinfo()}</Descriptions.Item>
                    <Descriptions.Item label="Rank"><Text  editable={{editing:changable , onChange: setInforank }}>{info_rank}</Text></Descriptions.Item>
                  </Descriptions>
                </div>
            </Col>
            <Col span = {12}>
              <Row className = "firstRow_graph_companyinfo">
                <Col span = {22} style = {{ alignItems:"center"}}>
                <br/>
                <Title level = {5}>Predicted Success Rate over next X months</Title>
                <div >
                <BarGraphII
                  data = {monthPredicted()}
                  Xaiss = "period"
                  Yaiss = "success_rate"
                /> 
                </div>                             
                </Col>
              </Row>
              <Row className = "secondRow_graph_companyinfo">
                <Col span = {16} style = {{display:"flexbox", alignItems:"center"}}>
                  <br/>
                  <Title level = {5}>Predicted Success Rate based on Category</Title>
                      <div >
                        <BarGraph
                        dataS = {process_data(categoryRate)}  
                        KeyX = "category_groups_list"
                        KeyY = "success_rate"
                        RefX = {info_category}
                        /> 
                      </div>                             
                </Col>
                <Col span = {8}>
                  <div className ="secondRow_text_companyinfo">
                    <Card size = "small" className = "Important_features2_companyinfo">
                    <Text strong>Category:</Text>{info_category}<br/>
                    <span className = "cardText_companyinfo">{RateFinder(categoryRate, 1)}</span>
                    </Card>
                    <Card size = "small" className = "Important_features2_companyinfo">
                    <Text strong style = {{color: ""}}>Country Code:</Text>{info_country}<br/>
                    <span className = "cardText_companyinfo">{RateFinder(countryRate, 0)}</span>
                    </Card>
                  </div>
                </Col>
              </Row>        
            </Col>
          </Row>
          {/* Bottom Bar */}
          <Row className = "bottombar_companyinfo">
            <Col span = {4}>
              <Card size="small" className = "StatusCard_companyinfo">
                <Title level = {5} style = {{color:"white"}}>Current Status: {status_companyinfo()}</Title>
                  <Text style = {{color:"white", fontSize:"xx-large"}} editable={{editing:changable , onChange: setInforank }}>{info_status}</Text>
              </Card>
            </Col>
            <Col span = {4}>
              <Card size="small" className = "StatusCard_companyinfo">
                <Title level = {5} style = {{color:"white"}}>Current Funding Stage:</Title>
                  <Text style = {{color:"white", fontSize:"xx-large"}} editable={{editing:changable , onChange: setInfoFundstatus }}>{info_Fundstatus}</Text>
              </Card>
            </Col>
            <Col span = {6}>
              <Card size="small" extra={<a href={info_crubLink} target = "_blank" rel = "noopener noreferrer">More</a>} className = "Important_features_companyinfo" title = "Important Features to Note">
                  {getFeatures()}
              </Card>
            </Col>
            <Col span = {10}>
              <Title level={3}>More information</Title>
              Company Official Link: <Link copyable href = {info_weblink} target = "_blank" rel = "noopener noreferrer"><br/>{info_weblink}</Link>
              <br/>
              Crunchbase Reference Link: <Link copyable href = {info_crubLink} target = "_blank" rel = "noopener noreferrer"><br/>{info_crubLink}</Link>
            </Col>
          </Row>
        </Col>
        <Col span = {8} style ={{}}>
        <br/>
            <Title level = {5}>{`Radial Graph of ${compname}`}</Title>
            <RadarGraph dataS = {getRadial()}/>
            <Title level = {5}>*Green region stands for mean value for each item.</Title>
            <Title level = {5}>*Green region stands for value for current inspected firm.</Title>
            <br/>
            <div style ={{maxHeight:"42vh",  overflowY:"Hidden"}}>
                <Title level = {4}>Predicted Success Rate based on Country</Title>
                <Title level = {5}>*The darker the Color means a higher predicted score to reach next stage.</Title>
              <GCmap setTooltipContent={setContent} CompanyShow = {inspectedItem} CompanyName = {compname}/>
              <ReactTooltip>{content}</ReactTooltip>
            </div>                            

        </Col>
    </Row>
</div>
        
  )
}
