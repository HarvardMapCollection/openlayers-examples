import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';


//define the layers, including the basemap and a HMC HGL map
const layers = [
  new TileLayer({
    source: new OSM()
  }),
  new TileLayer({
    source: new TileWMS({
      projection: 'EPSG:32618',
      url: 'https://geodata-proxy.lib.harvard.edu/geoserver/proxy/requestfile/wms',
      attributions:
        'Harvard Map Collection',
      params: {
        'LAYERS': 'mapimages_public:G3801_G46_1790_D4_1849',
      },
    }),
  }),
];


//initialize the map
const map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: [-8313419.924689821,5270000.419856723],
    zoom: 11
  })
});


//function to get the current extent and zoom level 
function getBounds() {
    const currentCenter = map.getView().getCenter() 
    const currentZoom = map.getView().getZoom()
    return "Center: " + currentCenter + "\nZoom:" +  currentZoom
  }

//print current zoom level on drag
map.on('moveend', function (e) {
    console.log(getBounds())
});