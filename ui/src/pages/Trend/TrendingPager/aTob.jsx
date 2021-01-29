// import React from 'react';
// import './Landing.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { 
    Result, Button,Tabs,
    Row, Col, Typography,Divider
} from 'antd';


// import graphical chart template
import VBarI from "../../../components/chartTemplate/verticalBarI.jsx"
// import necessary dataset
import seedA_probs from "../../../components/common/data/series_a_probs.json"

// import style
const {Text,Title} = Typography
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

export default function Mapview () {
    // const [token, setToken] = useState();
    const formattedData = {
        month_18:[],
        month_20:[],
        month_22:[],
        month_24:[],
        month_26:[],
        month_28:[],
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

    function stringToColor(str){
      var hash = 0;
      for(var i=0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 4) - hash);
      }
      var color = Math.abs(hash).toString(16).substring(0, 6);
    
      return "#" + '000000'.substring(0, 6 - color.length) + color;
    }

    function formatHelper(item, source, id, variable){
        var info = {
            "key":id,
            "company_name":source["name"],
            "value":source[variable],
            "fill":stringToColor(source["name"])
        }
        // console.log(info.fill)
        item.push(info)
    }

    function dataDistributer(itemm, vars){
        var tempdata = process_data_numeric(seedA_probs);
        let id = 0
        for(var i in tempdata){
            formatHelper(itemm, tempdata[i], id, vars)
            id++;
        }
    }

    function getData(item, val, vars){
        dataDistributer(item, vars)
        item.sort((a,b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
        var i;
        var ans = []
        for (i = 0; i < val; i++) {
            var te = item.shift()
            ans.push(te)
        }
        return ans
    }

    return (
        <div style = {{backgroundColor:"white", height:"84vh", padding:"5px"}}>

            {/*first row*/}
            <Row gutter={[8, 8]} className = "rowAlpha" style = {{height:"40vh"}}>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 18 months</Title>
                        <VBarI
                            dataS = {getData(formattedData.month_18, 10, "18_months")}
                            dataKeyY = "company_name"
                            dataKeyX = "value"
                        />
                </Col>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 20 months</Title>
                        <VBarI
                            dataS = {getData(formattedData.month_20, 10, "20_months")}
                            dataKeyY = "company_name"
                            dataKeyX = "value"
                        />
                </Col>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 22 months</Title>
                        <VBarI
                            dataS = {getData(formattedData.month_22, 10, "22_months")}
                            dataKeyY = "company_name"
                            dataKeyX = "value"
                        />
                </Col>
            </Row>
            <Divider/>
            {/*second row*/}
            <Row gutter={[8, 8]} className = "rowBeta" style = {{height:"40vh"}}>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 24 months</Title>
                            <VBarI
                                dataS = {getData(formattedData.month_24, 10, "24_months")}
                                dataKeyY = "company_name"
                                dataKeyX = "value"
                            />
                </Col>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 6 months</Title>
                            <VBarI
                                dataS = {getData(formattedData.month_26, 10, "26_months")}
                                dataKeyY = "company_name"
                                dataKeyX = "value"
                            />
                </Col>
                <Col span={8} >
                    <Title level = {5}>Top 10 firms with highest possibilies to enter Series B in next 28 months</Title>
                            <VBarI
                                dataS = {getData(formattedData.month_28, 10, "28_months")}
                                dataKeyY = "company_name"
                                dataKeyX = "value"
                            />
                </Col>
            </Row>
      </div>
        
    )
}
