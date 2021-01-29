import React from 'react';

import { Typography, Row, Col, Divider,Timeline } from 'antd';

/*import components */
import Newsbox from "../../components/common/infocard/newsboard/newsbox.jsx"
import ProfitChart from "../../components/chartTemplate/ProfitGraph.jsx"
import BalanceChart from "../../components/chartTemplate/BalanceGraph.jsx"
import transactiondata from "../../components/common/data/transactiondata"
import Card from "../../components/common/infocard/chartbox/chartnews.jsx"

/*import styling */
import "./Dashboard.css"
/*alias for better representation*/
const { Title } = Typography;

/*function: bashboard component */
export default function Dashboard({ setToken }) {

    return (
        <div className = "pager">
      {/* top infomration box */}
          <Row className = "topinfobox" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span = {16}>
                  <Divider orientation="left" plain>
                    <Title level = {1} className = "title1">
                    Dashboard
                    </Title>
                  </Divider>
                  
                  <div className = "highlineOffavourite">
                      <Title level={3} style = {{textIndent: "2vw"}}>
                        Welcome, Angela
                      </Title>
                      <p style = {{textIndent: "3vw" , fontSize:"large"}}>
                        Upon your last log-in...... 
                      </p>
                      <div style = {{marginLeft:"4vw", fontSize:"large"}}>
                        - <a>Kilo</a> received a new seed fund from <a>ABC</a><br/>
                        - <a>Milo</a> has been <a>acquired</a> by <a>ABC</a><br/>
                        - <a>Zilo</a> raises $50 Million in Series B Funding<br/>
                      </div>
                  </div>
                </Col>
                <Col span = {8}>
                <Title level = {4} style = {{marginTop:"3%"}}>Recent Activity</Title>
                <Timeline mode={"left"} style = {{marginTop:"7%"}} pending="Loading...">
                  <Timeline.Item label="2020-09-01">Added <a>Milo</a> into portfolio</Timeline.Item>
                  <Timeline.Item label="2020-08-31 09:15:11">Prediction on <a>Titus Mountain Ski Resort</a></Timeline.Item>
                  <Timeline.Item label="2020-09-01 09:12:11">Added Company: <a>Zermatt</a></Timeline.Item>
                </Timeline>
                </Col>

          </Row>

          <Row  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className = "bottominfobox">
            <Col span={10}>
                <Row span={12} style = {{height:"30vh"}}> 
                  <Divider orientation="center" plain><Title level = {5}>Profit</Title></Divider>
                  <ProfitChart data = {transactiondata} style = {{height:"30%", objectFit:"contain"}}/>
                </Row>

                <Row span={12} style = {{height:"30vh"}}>
                  <Divider orientation="center" plain><Title level = {5}>Balance</Title></Divider>
                  <BalanceChart data = {transactiondata} style = {{height:"30%", objectFit:"contain"}}/>
                </Row> 
            </Col>

            <Col span={6}>
              <Divider orientation="center" plain><Title level = {4}>What's New in the Chart</Title></Divider>
              <Card/>
            </Col>
            
            <Col span={8}>
              <Divider orientation="center" plain><Title level = {4}>Top News of the Day</Title></Divider>
              <Newsbox className = "newbox_dashboard"/>
            </Col>
          </Row>
          
        </div>
        
    )
}
