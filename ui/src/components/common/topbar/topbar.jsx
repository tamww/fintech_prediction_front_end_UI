import React from "react";
import { NavLink  } from "react-router-dom";

/*import antd UI component */
import { Menu , Layout, Button, Input, Badge} from 'antd';

/*import useful image and icons */
import logoimage from "./img/ubs-logo.png"
import { BellOutlined,SearchOutlined,LogoutOutlined } from '@ant-design/icons';

/*import logout function */
import {logout} from "../../Auth/userToken.js"

/*import topbar styling*/
import "./topbar.css"


const { Header } = Layout;

/*function: Topbar */
export default function Topbar() {


    return (
        
        <Header className="header" 
        style = {{
            background: "white", 
            height:"60px", 
            margin: "0px", 
            position: "fixed", 
            width: "100vw",
            zIndex: "2",
            display: "inline",
        }} 
 
        >
        {/* logo holder  */}
                    <a href="s"><img src = {logoimage} className ="logoimage" alt = ""/></a>

        {/* left top bar */}
                    <Menu mode="horizontal" id = "topbarLeft"className = "topbarLeft" data-toggle="collapse" selectedKeys = "">
                        <Menu.Item key="1" className = "Item Overview" aria-expanded = "true">
                            <NavLink to ="/pp/Dashboard" >                                
                                <p className = "itemtext" >
                                    Overview
                                </p>
                            </NavLink>
                            </Menu.Item>
                        <Menu.Item key="2" className = "Item Database" aria-expanded = "true">
                            <NavLink to ="/pp/Database" >                                
                                <p className = "itemtext" >
                                    Database
                                </p>
                            </NavLink>
                        </Menu.Item>
                    </Menu >

        {/* right top bar */}
                    <div className = "topRight-holder">

                        <Menu mode="horizontal" className = "topbarRight" id = "topRight" selectedKeys = "None">
                            <Menu.Item className = "BuTrend" id = "item3" key ="item3" >
                                <NavLink to ="/pp/Search" >
                                    <Button type="text" key="3" className = "Button Search"><p className = "buttontext" >Search</p></Button>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item4" key ="item4" >
                                <NavLink to ="/pp/Favourite" className = "BuTrend" id = "item4">
                                    <Button type="text" key="4" className = "Button MyFav"><p className = "buttontext" >My Favourites</p></Button>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item5" key ="item5" >
                                <NavLink to ="/pp/Trend" className = "BuTrend" id = "item5">
                                    <Button type="link" key="5" className = "Button Trending"><p className = "buttontext"  to = "/pp/Trend">Trending</p></Button>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item6" key ="item6" >
                                <div id = "item6">
                                    <Input placeholder="Help Desk" prefix={<SearchOutlined />} className = "searchbox"  ></Input>
                                </div>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item7" key ="item7" >
                                <Button size = "large" type="text" key="7" className = "notification" icon={<BellOutlined />} id = "item7">
                                    <Badge size="default" count={5} overflowCount={10} offset = {[-5,-15]} > 
                                        <a href="#" className="notibell"/>
                                    </Badge>
                                </Button>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item8" key ="item8" >
                                <NavLink to ="/pp/Account" className = "BuAcc"  id = "item8">
                                    <Button key="8" className = "Button MyAcc"><p className = "buttonACtext" >My Account</p></Button>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item className = "BuTrend" id = "item9" key ="item9" >
                                <Button type="text" key="9" className = "Exit" icon={<LogoutOutlined />} id = "item9" onClick = {logout}></Button>
                            </Menu.Item>
                        </Menu>
                    </div>

        </Header>
    );
}
