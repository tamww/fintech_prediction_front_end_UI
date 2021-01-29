import React, { PureComponent } from 'react';

/*import open layer library */
import { Map, View } from 'ol';
import { Tile, Heatmap } from 'ol/layer';
import { OSM, Vector } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';

import pdata from "./processed_.jsx"
const control = require('ol/control');



/*component: heat map showing distribution of companies recorded in city scale */
export default class Home extends PureComponent {
    
    // call during operation
    componentDidMount() {
        let map = new Map({
            // set the mount point as map
            target: 'map',
            // set up the layer
            layers: [
                new Tile({
                    source: new OSM()
                })
            ],
            // set up the map visible area，"center" as the center point，"zoom"as the zooming scale
            view: new View({
                center: fromLonLat([0, 25]),
                zoom: 2
            }),
            // load controller to the map
            controls: control.defaults({
                // zoom: false,
                rotate: false,
                attribution: false
            }).extend([
                new ScaleLine(),
                new ZoomSlider()
            ])
        });
        // console.log(pdata())
        var dataS = pdata()
        // console.log(dataS)
        var heatData = {
            type: 'FeatureCollection',
            features: dataS,
            // mock-up GeoJson format data
            // [
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 112.40, 31.19 ] }, properties: { weight: 0.9 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.30, 30.60 ] }, properties: { weight: 0.19 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 123.30, 30.60 ] }, properties: { weight: 0.419 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 105.30, 30.60 ] }, properties: { weight: 0.319 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 106.30, 30.60 ] }, properties: { weight: 0.719 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 109.30, 31.60 ] }, properties: { weight: 0.519 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 109.30, 30.60 ] }, properties: { weight: 0.319 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 108.30, 32.60 ] }, properties: { weight: 0.139 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 118.30, 31.60 ] }, properties: { weight: 0.129 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 108.30, 33.60 ] }, properties: { weight: 0.190 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 108.30, 32.60 ] }, properties: { weight: 0.189 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 100.30, 30.60 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 109.30, 30.60 ] }, properties: { weight: 0.119 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 108.30, 31.60 ] }, properties: { weight: 0.200 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 118.30, 30.60 ] }, properties: { weight: 0.300 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.30, 23.60 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 112.214350, 23.3423 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.45656, 22.4545 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.78684, 22.1235 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.43543, 21.4378 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 112.506, 23.234 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.9087, 22.45345 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 113.8764, 23.1234 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 112.4753, 21.948 ] }, properties: { weight: 0.1 }},
            //   { type: 'Feature', geometry: {type: 'Point', 'coordinates': [ 112.10, 23.789 ] }, properties: { weight: 0.1 }}
            // ]
        }
  
        var features = new GeoJSON().readFeatures(heatData, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
  
        var source = new Vector({
          features: features,
          wrapX: false
        })
        var vector = new Heatmap({
            source: source,
            blur: parseInt(24, 10),
            radius: parseInt(5, 12)
          });

        map.addLayer(vector)
    }
    render() {
        return (
            <div style={{ width: '100%', height: '90%' }}>
                <div id="map" style={{ width: '100%', height: "800px" }} />

            </div>
        );
    }
}