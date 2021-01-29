
import React from "react";
/*load all the pages */
import Dashboard from "../../../pages/Dashboard/Dashboard.jsx"
import Data_base from "../../../pages/Datacenter/Datacenter.jsx"
import Comparison from "../../../pages/Comparison/Comparison.jsx"
import Mapview from "../../../pages/Mapview/Mapview.jsx"
import Companyinfo from "../../../pages/Companyinfo/Companyinfo.jsx"
import Trend from "../../../pages/Trend/Trend.jsx"

import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

/*set of router data */
export const Routesdata = [
  {
    path: "/pp/Dashboard",
    name: "Dashboard",
    icon: <AiIcons.AiFillHome/>,
    component: Dashboard,
    layout: "/pp",
    cName: "side-text",
  },
  {
    path: "/pp/Database",
    name: "Database",
    icon: <AiIcons.AiOutlineFolder/>,
    component: Data_base,
    layout: "/pp",
    cName: "side-text",
  },
  {
    path: "/pp/Comparison",
    name: "Comparison",
    icon: <AiIcons.AiOutlinePieChart/>,
    component: Comparison,
    layout: "/pp",
    cName: "side-text",
  },
  {
    path: "/pp/Companyinfo",
    name: "Companyinfo",
    icon: <AiIcons.AiFillInfoCircle/>,
    component: Companyinfo,
    layout: "/pp",
    cName: "side-text",
  },
  {
    path: "/pp/Trend",
    name: "Trend",
    icon: <AiIcons.AiOutlineRise/>,
    component: Trend,
    layout: "/pp",
    cName: "side-text",
  },
  {
    path: "/pp/Map",
    name: "Map",
    icon: <RiIcons.RiMap2Line/>,
    component: Mapview,
    layout: "/pp",
    cName: "side-text",
  },
];


