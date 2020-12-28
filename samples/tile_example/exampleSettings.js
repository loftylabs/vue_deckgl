import MAPBOX_TOKEN from '../../env.js'

const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'

const MAP_STYLES = {
    'satellite': 'mapbox://styles/mapbox/satellite-v9',
    'dark': 'mapbox://styles/mapbox/dark-v10',
    'light': 'mapbox://styles/mapbox/light-v9'
}


const INITIAL_VIEW_STATE = {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
  bearing: 0
}

const MAPBOX_SETTINGS = {
    accessToken: MAPBOX_TOKEN,
    container: 'map',
    width: '100%',
    style: MAP_STYLES.light,
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
}
const DECKGL_SETTINGS = {
    canvas: "deck-canvas",
    width: "100%",
    height: "100%",
    controller: true,
    useDevicePixels: false,
    viewState: INITIAL_VIEW_STATE,
}
    

export {MAPBOX_SETTINGS, DECKGL_SETTINGS, DATA_URL}