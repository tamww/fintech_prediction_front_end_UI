import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Layout} from 'antd';

/*import user history */
import history from '../../components/history/history'
/*import components */
import Sidebar from "../../components/common/sidebar/sidebar.jsx";
import Routing from "../../components/common/router/routing.jsx"
import Topbar from "../../components/common/topbar/topbar.jsx"
import { UserProvider } from '../../components/Context/UserContext.js'
/*import original dataset */
import basedata from "../../components/common/data/final_company_info.json"

/*alias for better representation*/
const {Content } = Layout;

/*function： retrun the page layout after login  */
export default function Postlogin() {

    const selectedITEM = {
        name:"Tania",
        itemSelected:[],
        itemName:[],
        baseDD: basedata,

    }
    return (
    <BrowserRouter history = {history} >
        
        <Redirect from="/pp" to="/pp/Dashboard" />
        
        <Layout style={{height:"100vh"}} className = "layout">
            <Topbar/>
            <Layout>
                <Sidebar/>          
                <Content className="content" 
                            style={{ 
                                    padding: '0px 2vw 0px 2vw', 
                                    marginTop: "75px" , 
                                    flex: "auto", 
                                    overflow:"auto",
                                    overflowY: "auto",
                                    height: "auto",
                                    position: "relative",
                                    }}>
                    <UserProvider value = {selectedITEM}>
                    <Routing/>                       
                    </UserProvider>
                </Content>
                
            </Layout>

        </Layout>

        
    </BrowserRouter>
    );
}
