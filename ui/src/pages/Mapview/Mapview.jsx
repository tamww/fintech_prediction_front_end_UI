import React, { useState } from 'react';
import { Tabs,Typography } from 'antd';
import ReactTooltip from "react-tooltip";

/*import map componenet */
import GCmap from "../../components/common/MapV2/mapChartNoAnnotate.jsx"
import ExtraMap from "../../components/common/MapV2/extraMAP.jsx"

/*alias for better representation*/
const { TabPane } = Tabs;
const {Title} = Typography

function callback(key) {
  // console.log(key);
}

export default function Mapview () {
    const [content, setContent] = useState("");

    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Distribution By Success Rate" key="1">
        <Title level = {1}> Average Success Rate</Title>
        <GCmap setTooltipContent={setContent}/>
        <ReactTooltip>{content}</ReactTooltip>
      </TabPane>
      <TabPane tab="Distribution By Heat Map" key="2">
        <ExtraMap/>
      </TabPane>

    </Tabs>
    )
}
