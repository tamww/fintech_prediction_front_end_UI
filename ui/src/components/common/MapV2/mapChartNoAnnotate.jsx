import React, { useEffect, useState, memo } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

import basedata from "../data/countryRate.json"

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
  .range(["#ffedea", "#ff5233"]);


const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  /*function: process data to return percentage data*/

  function process_data (datas) {
    for (var i in datas){
      if(typeof(datas[i].success_rate) !== typeof(12)){
        datas[i].success_rate = (Math.trunc(parseFloat(datas[i].success_rate)*10000))/100;
      }
    }
    // console.log(datas)
    return datas
  }

  useEffect(() => {
      setData(process_data(basedata));
  }, []);



  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 200
      }}
      style ={{
          width:"100%", 
          height:"70vh",
        backgroundColor:"white"
    
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
                // console.log(d);
                return (
                  <Geography
                    key={geo.rsmkey}
                    geography={geo}
                    onMouseEnter={() => {
                        const { NAME, POP_EST } = geo.properties;
                        if(d){
                        setTooltipContent(`${NAME} — ${Math.trunc(d.success_rate*10000)/10000}%`);}
                        else{setTooltipContent(`${NAME} — No Info`);}
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                        
                      }}
                      style={{
                        default: {
                          // fill: "#D6D6DA",
                          outline:"none"
                        },
                        hover: {
                          fill: "#6b7e94",
                          outline: "dotted"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    fill={d ? colorScale(parseFloat(d.success_rate)) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
// import React from "react";
// import ReactDOM from "react-dom";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// // import "./styles.css";

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const Mapp = () => (
//   <div>
//     <ComposableMap>
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
//         }
//       </Geographies>
//     </ComposableMap>
//   </div>
// );

// export default Mapp;