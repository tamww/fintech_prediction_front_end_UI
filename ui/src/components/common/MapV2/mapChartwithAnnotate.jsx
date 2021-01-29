import React, { useEffect, useState} from "react";
// import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
  Annotation
} from "react-simple-maps";
// import Geocode from "react-geocode";

import basedata from "../data/countryRate.json"
// import dataX from "../data/final_company_info.json"
// import { getData } from "country-list";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = (num) => {
//   if (num > 1000000000) {
//     return Math.round(num / 100000000) / 10 + "Bn";
//   } else if (num > 1000000) {
//     return Math.round(num / 100000) / 10 + "M";
//   } else {
//     return Math.round(num / 100) / 10 + "K";
//   }
// };

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#f6ea8c", "#492540"]);

// function getGeoCode (name){
//   var ans = geoUrl.filter(item => ans === item.properties.ISO_A3)
//   return ans
// }


const MapChart = ({ setTooltipContent , CompanyShow,CompanyName})=> {
  const [data, setData] = useState([]);
  // const state = {
  //       company: this.props.CompanyShow}
  // const [loc, setLoc] = useState([]);

  useEffect(() => {
    // csv(`/vulnerability.csv`).then((data) => {
      setData(basedata);
    // });
  }, []);
  
  function getCorrdinate(){
    // console.log(CompanyShow.latitude);
    // console.log(CompanyShow.longitude);
    return [CompanyShow.longitude,CompanyShow.latitude]
  }


  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 150
      }}
      style ={{
          width:"90%", 
          height:"45%",
        // backgroundColor:"aqua"
    
    }}
    >
      <ZoomableGroup>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        { (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>

              geographies.map((geo) => {
                const d = data.find((s) => s.country_code === geo.properties.ISO_A3);
                // if(CompanyShow === geo.properties.ISO_A3){
                //   setLoc((geo.geometry.coordinates)[0][1][1]);
                // }
                // console.log(d);
                return (
                  <Geography
                    key={geo.rsmkey}
                    geography={geo}
                    onMouseEnter={() => {
                        const { NAME, POP_EST } = geo.properties;
                        if(d ){
                        setTooltipContent(`${NAME} — ${d.success_rate}%`);}
                        else{setTooltipContent(`${NAME} — No Info`);}
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                        
                      }}
                      style={{
                        // default: {
                        //   fill: "#D6D6DA",
                        //   outline: "none"
                        // },
                        // hover: {
                        //   fill: "#F53",
                        //   outline: "none"
                        // },
                        // pressed: {
                        //   fill: "#E42",
                        //   outline: "none"
                        // }
                      }}
                    fill={d ? colorScale(d.success_rate) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
          
        )}
        <Annotation
        subject={getCorrdinate()}
        dx={-70}
        dy={-20}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round"
        }}
      >
        <text x="-6" textAnchor="end" alignmentBaseline="middle" fill="#F53" style ={{fontSize:"x-large"}}>
          {CompanyName}
        </text>
      </Annotation>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
