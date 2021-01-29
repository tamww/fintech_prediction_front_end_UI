
/*import useful library */
import React, { useState,useContext } from 'react';
import { Typography,  notification, Row, 
  Col, Button, Upload, message ,Select, 
  InputNumber,DatePicker,Slider,Checkbox, 
  Divider,Table, AutoComplete
} from 'antd';
import { PlusCircleTwoTone ,FundOutlined,UndoOutlined,InboxOutlined} from '@ant-design/icons';
/*import table information*/ 
import {columns} from "./KeyItem/col.jsx"
import {category_list} from "./KeyItem/unique_cat_name.jsx"
import {country_list} from "./KeyItem/country_code.jsx"

/*import chart */
import PieChartI from "../../components/chartTemplate/PieChartI.jsx";
import UserContext from '../../components/Context/UserContext.js'

/*import styling */
import './Datacenter.css'

/*alias for better representation*/
const { Dragger } = Upload;
const { Title } = Typography;
const { Option } = Select;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    // if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
};

/*constant: store the state of the filter list */
const state = {
  // default flag
  default: true,

  // status state
  f_checkedstate: false,
  statelist: [],
  // funding amount
  f_fundingAmount: true,
  fundingrange: [0,100],
  // employee size
  f_size: false,
  EmployeeSize: "",
  // established year
  f_year: false,
  yearVal: 0,
  // company name
  f_company_name: false,
  companyName: "",
  // category
  f_category: false,
  categoryList: [],
  // country code
  f_country: false,
  countryCode: "",
  // number of funding rounds
  f_numFund: false,
  numFund: 0,
}

/*constant: store the selected company */
const selected = {
  rowss:[],
  rowkey:[],
}

/*function: database component */
export default function Datacenter () {
  /*retrieve dataset from context */
    const selectedITEM = useContext(UserContext)
    var basedata = selectedITEM.baseDD
  /*constant: list of company status */
    const StatusOptions = ['IPO', 'Acquired', 'Closed', 'Operating', 'NAN'];
  /*filtered dataset */
    const [datafilter, setData] = useState(basedata);
  /*filter list statue */
    const [statusOpt, setStatus] = useState(StatusOptions);
    const [fundrange, setFundingrange] = useState([0,100]);
    const [employeesize, setEmployeesize] = useState();
    const [yearval, setYearval] = useState();
    const [compname, setCompanyName] = useState("");
    const [catlist, setCategory] = useState();
    const [countrycode, setCountry] = useState();
    const [numfund, setNumFund] = useState();
    const [selectedrow, setRow] = useState();
    const [selectedKey, setKey] = useState();


    /*row selected store */
    const rowSelection = {
      selectedRowKeys: selectedKey,
      selectedRows: selectedrow,
      onChange: (selectedRowKeys, selectedRows) => {
        setRow(selectedRows);
        setKey(selectedRowKeys);
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        selected.rowss = selectedRows;
        selected.rowkey = selectedRowKeys;
      },
    };

    /*function: filtering the base dataset with respect to the filters selected  */
    function filterALL(){
      if (state.default){
        return setData(basedata);
        
      }else{
        const filteredEvents = basedata.filter(item =>{
          // filtering by company name
          if(state.f_company_name){
            if(!item.name.toUpperCase().includes(state.companyName.toUpperCase())){
              return false;
            }
          }

          // filtering by funding amount
          var fundvalue = (Math.trunc((item.total_funding_usd /1000000)*1000))/1000
          if (fundvalue <= state.fundingrange[0] || fundvalue >= state.fundingrange[1]){
            return false;
          }

          // filtering by status state
          if(state.f_checkedstate){
            var countstate = 0
            let kkk = state.checkedstate;
            for (var key in kkk){
              if (item.status.toUpperCase() === kkk[key].toUpperCase()){
                countstate = countstate + 1;
              }
            }
            if (countstate === 0){
              return false;
            }
          }

          // filtering by employee size
          if(state.f_size){
            if (item.employee_count !== state.EmployeeSize){
              return false;
            }
          }

          // filtering by established year
          if (state.f_year){
            var year = state.yearVal.toDate().getFullYear().toString();
            if((item.founded_on.split("-"))[0] !== year ){
              return false;
            }
          }

          // filtering by category
          if(state.f_category){
            var count = 0;
            var temppp = item.category_groups_list.split(',')
            for (var i in temppp){
              for(var j in state.categoryList){
                if (temppp[i].toLowerCase() === state.categoryList[j].toLowerCase()){
                  count++;
                }
              }
            }
            if (count !== state.categoryList.length){
              return false;
            }
          }

          // filtering by country code
          if(state.f_country){
            var countt = 0;
            for(var k in state.countryCode){
              if (item.country_code === state.countryCode[k]){
                countt++;
              }
            }
            if (countt === 0){
              return false;
            }
          }

          // filtering by number of funding
          if(state.f_numFund){
            if(Math.trunc(item.num_funding_rounds) !== state.numFund && state.numFund !== 0){
              return false;
            }
          }

          return true;
        });
        // console.log(state);
        setData(filteredEvents);
      }
    }

    /*filter change handler: status*/ 
    function onChangeStatus (checkedValues) {
      setStatus(checkedValues);
      if (checkedValues.length ===5){
        state.f_checkedstate = false;

      }else{
        state.f_checkedstate = true;
        state.checkedstate = checkedValues;
        state.default = false;
      }
      filterALL();
    }

    /*filter change handler: funding amount*/
    function sliderchange (value) {
      setFundingrange(value);
      console.log(value);
      state.fundingrange = value;
      state.default = false;
      filterALL();
    }
    
    /*filter change handler: employee size*/
    function onChangeEmploySize (value){
      setEmployeesize(value);
      console.log(value);
      if (value){
        state.f_size = true;
        state.EmployeeSize = value;
        state.default = false;

      }else{
        state.f_size = false;
      }
      filterALL();   
    }

    /*filter change handler: established year*/
    function onChangeYear (value){
      setYearval(value);
      if (!value){
        state.f_year = false;
      }else{
        state.f_year = true;
        state.yearVal = value;
        state.default = false;

      }
      filterALL();
    }

    /*filter change handler: company name */
    function onChangeComp (value){
      setCompanyName(value);
      if(!value){
        state.f_company_name = false;
      }else{
        state.f_company_name = true;
        state.companyName = value;
        state.default = false;

      }
      filterALL()
    }

    /*filter change handler: category*/
    function onChangeCat(value){
      setCategory(value);
      if(!value){
        state.f_category= false;
      }else{
        state.f_category = true;
        state.categoryList = value;
        state.default = false;

      }
      filterALL();
    }

    /*filter change handler: country code*/
    function onChangeCountry(value){
      setCountry(value);
      if(value.length === 0){
        state.f_country = false;
      }else{
        state.f_country = true;
        state.countryCode = value;
        state.default = false;
      }
      filterALL();
    }

    /*filter change handler: number of funding rounds*/
    function onChangeNumFunding(value){
      setNumFund(value);
      if(!value){
        state.f_numFund = false;
      }else{
        state.f_numFund = true;
        state.numFund = value;
        state.default = false;
      }
      filterALL();
    }



    /*function: clear all the selected companies in the table */
    function clearselect () {
      setRow();
      setKey([]);
      selectedITEM.itemSelected = [];
      selectedITEM.itemName = [];
      notification["info"]({
        message: 'Operation Completed',
        description:
        `De-selected All Companies`,
      });
    }

    /*constant: notification push handler
      @params: type: type of notification
    */
    const notifComparison = type => {
      if (type === 'warning'){
          notification[type]({
            message: 'Too many items selected',
            description:
              'At most two items can be selected for the comparison. Please reselect the items.',
          });
      }else if (type === 'success'){
        notification[type]({
          message: '2 items are selected for comparison',
          description:
          `The selected companys are: ${selected.rowss[0].name} and ${selected.rowss[1].name} `,
        });
        selectedITEM.itemSelected = selected.rowss;
        // console.log(selectedITEM.itemSelected)
        selectedITEM.itemName = [selected.rowss[0].name, selected.rowss[1].name];
      }else if (type === 'info'){
        notification[type]({
          message: 'Not enough infor for comparison',
          description:
          `Please select more companies for comparison. 2 Companies are needed. `,
        });
      }
    };
    
    /*function: select companies for comparison and return a notification */
    function makeComparison(){
      if(selected.rowss.length >2){
        // console.log("oversize");
        notifComparison('warning');
      }else if (selected.rowss.length ===2){
        notifComparison('success');

      }else if (selected.rowss.length <2){
        notifComparison('info');
      }
      // console.log("clicked comparison");
    }

    /*constant: store the notification of restore to default */
    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Restore to default',
        description:
          'All the filters have been restored to default value',
      });
    };

    /*function: clear all the filters and restore the original dataset */
    function restoreDefault(){
      // default flag
      state.default= true;
      state.f_checkedstate=  false;
      state.statelist=  [];
      state.f_fundingAmount=  true;
      state.fundingrange=  [0,100];
      state.f_size=  false;
      state.EmployeeSize=  "";
      state.f_year=  false;
      state.yearVal=  0;
      state.f_company_name=  false;
      state.companyName=  "";
      state.f_category=  false;
      state.categoryList=  [];
      state.f_country=  false;
      state.countryCode=  "";
      state.f_numFund=  false;
      state.numFund=  0;

      // restore selection
      setStatus(StatusOptions);
      setFundingrange([0,100]);
      setEmployeesize();
      setYearval();
      setCompanyName();
      setCategory();
      setCountry();
      setNumFund();
      openNotificationWithIcon('success');
      filterALL()
    }

    

    return (
        <div className = "datapager" >
         {/* {upper half} */}
          <div className = "upperhalf">
              <Row gutter= {8} >
                {/* left column*/}
                <Col span={16} className = "firstCol">

                  
                  <Divider 
                    orientation="left" 
                    plain
                    style = {{height: "12%"}}
                  >
                      <Title level = {3}>
                        Filter
                      </Title>      
                  </Divider>
                  <Row className = "Filter_BOX_1">
                    <Col span = {8}>                  
                    <div  className = "filter status" style = {{display:"inline", height: "100%"}}>
                      <div>Status:</div>
                      <Checkbox.Group
                      id = "fstatus"
                        style = {{display:"inline-box"}}
                        options={StatusOptions}
                        onChange={onChangeStatus}
                        value = {statusOpt}
                      />
                    </div>
                    </Col>

                    <Col span = {3}>
                      <div className = "filter employeesize">
                          <div>Company Size:</div>
                          <Select  
                                  autoFocus	 
                                  style={{ width: "90%" }} 
                                  onChange={onChangeEmploySize} 
                                  allowClear
                                  value = {employeesize}
                          >
                            <Option value="1-10">1-10</Option>
                            <Option value="11-50">11-50</Option>
                            <Option value="51-100">51-100</Option>
                            <Option value="101-250">101-250</Option>
                            <Option value="251-500">251-500</Option>
                            <Option value="501-1000">501-1000</Option>
                            <Option value="1001-5000">1001-5000</Option>
                            <Option value="5001-10000">5001-10000</Option>
                            <Option value="10000+">10000+</Option>
                            <Option value="unkonwn">unkonwn</Option>
                            <Option value="NaN">NaN</Option>
                          </Select> 
                        </div>   
                    </Col>
                    <Col span = {3}>
                      
                      Funded Year:
                      <DatePicker 
                          picker="year" 
                          onChange={onChangeYear} 
                          defaultValue = {0} 
                          style ={{width: "90%"}}
                          value = {yearval}
                        />
                    </Col>
                    <Col span = {10}>
                      <div id = "filter SearchCompany">Company Search
                              <AutoComplete
                                style={{ width: "90%" }}
                                onSearch={onChangeComp}
                                backfill
                                filterOption={(inputValue, option) =>
                                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                placeholder="Company Quick Search (Auto-Complete)" 
                                value = {compname}
   
                              >
                                  {basedata.map(({ key, name }) => (
                                          <Option key={key} value = {name}>
                                            {/* {name} */}
                                          </Option>
                                        ))}

                              </AutoComplete>
                      </div>

                    </Col>
                  </Row>
                  <Row className = "Filter_BOX_2">
                    <Col span = {6}>
                      <div className = "filter funding" sytle = {{ display: "flex" }} >
                          <span level = {6}>Funding Amount (USD ,000,000's):</span>
                            <br/>
                            <Slider  
                                style = {{width:'90%', fontSize: '50%', display: "inline-block", textalign: "center",alignContent: "center"}}
                                range = {{ draggableTrack: true }}
                                step={5}
                                defaultValue={[0, 100]}
                                onChange = {sliderchange}
                                tooltipPlacement = 'bottom'
                                value = {fundrange}
                              />
                          </div>
                    </Col>
                    <Col span = {6}>
                      <div className = "filter category">
                    <span>category<br /></span>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '90%' }}
                      placeholder="Please select"
                      onChange={onChangeCat}
                      value = {catlist}
                    >
                        {category_list.map(({ key, cate }) => (
                                              <Option key={key} value = {cate}>
                                                {cate}
                                              </Option>
                                            ))}

                                        </Select>
                      </div>
                    </Col>
                    <Col span = {5}>
                    <div className = "filter country">
                    <span>Country Code<br /></span>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '90%' }}
                      placeholder="Please select"
                      onChange={onChangeCountry}
                      value = {countrycode}
                    >
                        {country_list.map(({ key, country }) => (
                                              <Option key={key} value = {country}>
                                                {country}
                                              </Option>
                                            ))}

                                        </Select>
                      </div>

                    </Col>
                    <Col span = {3}>
                      <span>Num. Funding Rounds<br /></span>
                      <InputNumber min={0} max={30}  onStep={onChangeNumFunding} value = {numfund} />
                    
                    </Col>
                    <Col span = {4}>
                      <div style = {{position: "relative",display: "flex",verticalAlign:"middle",alignItems:"center", }}>
                          <Button style = {{position: "relative", 
                                            width: "80%", 
                                            marginTop: "10%", 
                                            alignItems:"center",
                                            verticalAlign:"middle",
                                            backgroundColor:"#18A0FB", 
                                            borderRadius: "10px" 
                                          }}
                                          onClick = {restoreDefault}
                          >
                            <span style ={{color: "white", 
                                            alignSelf:"center"
                                          }}
                            >
                              Restore Default
                            </span>
                          </Button>
                    </div>
                    </Col>
                  </Row>
                </Col>


                <Col span={3} className = "secondCol">
                  <div style = {{height: "70%"}}>
                  <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload.
                        </p>
                      </Dragger>
                  {/* <Button style = {{position: "relative", width: "100%", height: "90%"}}>
                      map view
                    </Button> */}
                  </div>
                  <div style = {{height: "30%"}}>
                    <Button style = {{position: "relative", width: "100%", height: "100%"}}>
                      <PlusCircleTwoTone />
                      <span>Add new data</span>
                    </Button>
                  </div>
                </Col>

                <Col span={5} className = "thirdCol">
                  Distribution of Status
                  <div style = {{position: "relative", width: "10%"}}>
                  <PieChartI/>
                  </div>
                </Col>
              </Row>

          </div>
         

         {/* {lower half} */}
          <div className = "lowerhalf">
            <Row>
            <div 
                  className = "comparisonbutton"
                  style = {{height: "30%", 
                                display: "inline-flex",
                                justifyContent:"flex-end", 
                                width:"100%", 
                                paddingBottom:"2px",
                              }}
                                
                    >

                    <Button 
                      type="primary"
                      className = "comparisonbutton"
                      style = {{display: "inline-flex", 
                                      justifyContent:"center",
                                      height: "100%", 
                                      marginRight: "2%",
                                      backgroundColor:"#18A0FB", 
                                      borderRadius: "10px",
                                      }}
                      onClick = {clearselect}
                    >
                      
                      <div className = "comparisonbuttontext" ><UndoOutlined />  Clear Selection</div>
                    </Button>


                    <Button 

                      className = "comparisonbutton"
                      style = {{display: "inline-flex", 
                                      justifyContent:"center",
                                      height: "100%", 
                                      marginRight: "2%",
                                      backgroundColor:"#18A0FB", 
                                      borderRadius: "10px",
                                      }}
                      onClick = {makeComparison}
                    >
                      
                      <div className = "comparisonbuttontext" ><FundOutlined />  Make a Comparison</div>
                    </Button>
                  </div>
                  
              <div className = "datatable">
                <Table 
                  columns={columns}
                  selectedRows = {selectedrow}
                  selectedRowKeys = {selectedKey}
                  rowSelection={{
                    type: 'checkbox',
                    selectedKey,
                    ...rowSelection,
                  }} 
                  dataSource={datafilter}
                  size = "small"
                  expandedRowRender= {record =>
                      <Row>
                        <Col span = {4}>
                        <img src={record.logo_url} alt="company logo" width="20%"  object-fit="contain"/>
                        </Col>
                        <Col span = {8}>
                        <p style={{ margin: 0 }}><span>UID: </span>{record.uuid}</p>
                        <p style={{ margin: 0 }}><span>Location: </span>{record.Citycity},{record.region},  {record.country_code}</p>
                        <p style={{ margin: 0 }}><span>Address: </span>{record.address}</p>
                        </Col>

                        <Col span = {12}>    
                          <p style={{ margin: 0 }}><span>Rank: </span>{record.rank}</p>                
                          <p style={{ margin: 0 }}><span>Description: </span>{record.short_description}</p>
                          <p style={{ margin: 0 }}><span>Company Link: </span><a href={record.homepage_url}></a>{record.homepage_url}</p>
                          <p style={{ margin: 0 }}><span>Crunchbase Link: </span><a href={record.cb_url}></a>{record.cb_url}</p>
                        </Col>                
                      </Row>
                    }
                  expandRowByClick = {true}

                  />
              </div>
            </Row>

          </div>

        </div>
        
    )
}
