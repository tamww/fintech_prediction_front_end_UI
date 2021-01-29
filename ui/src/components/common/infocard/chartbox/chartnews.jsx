import React from 'react';
import { Typography,  Divider } from 'antd';
import img1 from "./stocks-vs-market.jpg"
import "./chartnews.css"

const { Title } = Typography;
const cardContainer = document.querySelector('.react-card');

/*Component: React component for the front side of the card*/
class CardFront extends React.Component {
  render() {
    return(
      <div className='card-side side-front'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-6'>
              <img src={img1} alt="img" />
            </div>

            <div className='col-xs-6 side-front-content'>
            
              <Divider orientation = "center" plain> 
                    <h2>Whats New in the Chart</h2>
                </Divider>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

/*Component: React component for the back side of the card*/
class CardBack extends React.Component {
  render() {
    return(
      <div className='card-side side-back'>
        <div className='container-fluid'>
            <Title level = {3}>New Predictions for South Asian</Title>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                In aliquam sem fringilla ut morbi tincidunt. Imperdiet nulla malesuada 
                pellentesque elit. Placerat in egestas erat imperdiet sed euismod nisi porta.</p>
            <Divider/>
            <Title level = {3}>Adjusted Benchmark for investment possibilities</Title>
            <p>Nisl nisi scelerisque eu ultrices vitae. Nunc sed velit dignissim sodales ut eu. 
                Ut tortor pretium viverra suspendisse. Lectus quam id leo in vitae turpis massa. 
                Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit.</p>
        </div>
      </div>
    )
  }
}

/*Component: React component of the card*/
class Card extends React.Component {
  render() {
    return(
      <div className='card-container'>
        <div className='card-body'>
          <CardBack />

          <CardFront />
        </div>
      </div>
    )
  }
}

export default Card;