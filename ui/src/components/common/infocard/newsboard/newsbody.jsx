import React from 'react';
import { Divider } from 'antd';

/*props: body of the news */
const TweetBox = (props) => {
  return(
    <div className="tweet-body">
      {props.children}
    </div>
  )
}

/*props: image of the news */
const Image = (props) => {
  return(
    <img src={props.image} alt="Logo" className="picture">
    </img>
  )
}

/*props: news handle for pull to refresh */
const Handle = (props) => {
  return(
    <div className="handle">
      {props.handle}
    </div>
  )
}

/*props: news title */
const Name = (props) => {
  return(
    <div className="name">
      {props.name}
    </div>
  )
}

/*props: main content of the news */
const Tweet = (props) => {
  return(
    <div className="tweet">
      {props.tweet}
    </div>
  )
}

/*props: date information */
const Date = (props) => {
    return(
      <div className="date">
        Published at: {props.date}
      </div>
    )
  }

/*props: main template for one news cell */
const NewsBody = (props) => {
  return(
    <TweetBox>
      <div className="inner-body">
        <Image image={props.image}/>
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}/>
            <Handle handle={props.handle}/>
          </div>
          <Tweet tweet={props.tweet}/>
          <Date date = {props.date}/>
        </div>
      </div>
      <Divider className="dividertweet" plain/>
    </TweetBox>
  )
}

export { NewsBody }