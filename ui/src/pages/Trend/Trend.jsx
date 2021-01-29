
import React from 'react';
/*import subpage component */
import { Tabs } from 'antd';
import Morepage from "./TrendingPager/ExtraBumb.jsx"
import ATob from "./TrendingPager/aTob.jsx"
import SeedToa from "./TrendingPager/seedToa.jsx"
import HeadMap from "./TrendingPager/heatMap.jsx"

/*alias for better representation*/
const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}

/*function: return layout of trending page */
export default function Mapview () {

    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Seed To Seris A" key="1">
        <SeedToa/>
      </TabPane>
      <TabPane tab="Series A To Seris B" key="2">
        <ATob/>
      </TabPane>
      <TabPane tab="Country VS Category HeatMap" key="3">
        <HeadMap/>
      </TabPane>
      <TabPane tab="......" key="4">
        <Morepage />
      </TabPane>

    </Tabs>
        
    )
}
