import React from 'react';
import FakeNewsData from "../../data/newstemp.jsx"
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import {NewsBody} from "./newsbody.jsx"

import "./newsbox.css"
import { index } from 'd3';

/*function: require the component newsbox in dashboard */
export default function newsbox () {

    function handleRefresh() {
        console.log("refresh");
    }
    return (
        <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={2}
        onRefresh={handleRefresh}
        triggerHeight={10}
        backgroundColor='white'
        >
          <div className="main-body">
            {FakeNewsData.articles.map(item => {
              let nameX = item.title
              // let handle = `@${user.name.first}`
              let imageX = item.urlToImage
              let tweetX = item.description
              let dateX = item.publishedAt
              console.log(imageX)
              return(
                <NewsBody 
                  key={index}
                  name={nameX}
                  tweet={tweetX}
                  image={imageX}
                  date = {dateX}
                  />
              )
            })}      

          </div>
        </PullToRefresh>

    )
      
    

}