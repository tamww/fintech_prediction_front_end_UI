import React, { useState,useEffect } from "react";
import { NavLink  } from "react-router-dom";
import { Layout, Menu} from 'antd';
/*import routing infomration */
import {Routesdata} from '../router/routes';
/*import styling information */
import "./sidebar.css"

const{Sider} = Layout ;

/*function: siderbar structure */
export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [key, setKey] = useState("");
    /*function: update the selection in sidebar*/
    function clicker (){
        setKey(window.location.pathname.split("/").pop());
    }
    useEffect(() => {
        clicker();
      });
    
    document.addEventListener("click", clicker);

    return (
        <Sider 
        className={collapsed ? "navsidebar navsidebar-collapse" : "navsidebar"}
        style = {{background: "#778DA9",width:"220vw" , overflow: "auto"}}
        collapsible
        collapsed={collapsed}
        onMouseEnter={e => {
          if (collapsed) {
              setCollapsed(false)
          }
        }}
        onMouseLeave = {e => {
            if (!collapsed) {
                setCollapsed(true)
            }
          }}
        id = "sider"        
    >
        <Menu
            mode="inline"
            style={{ height: "auto", borderRight: 1 , background: "#778DA9", color: "white"}}
            selectedKeys = {key}
            id = "inmenu"
            
        >
            {Routesdata.map((item, index) =>
                <Menu.Item 
                    key={item.name} 
                    className = {item.cName}
                >
                    <NavLink activeClassName ="selectedsideitem" className = "sideitem" to = {item.path}>
                        <div className = "sidebaric" key = {index}>
                            {item.icon}
                            </div> 
                        <span >{item.name}</span>
                    </NavLink>
                </ Menu.Item>
            )}
        </Menu>
    </Sider>

    );
}
