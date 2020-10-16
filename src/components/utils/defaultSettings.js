
/* eslint-disable no-unused-vars */

export const MAP_STYLES = {
    'satellite': 'mapbox://styles/mapbox/satellite-v9',
    'dark': 'mapbox://styles/mapbox/dark-v10'
}

/* eslint-enable no-unused-vars */


/* eslint-disable no-unused-vars */

export const INITIAL_VIEW_STATE = {
    latitude: 37.8,
    longitude: -122.45,
    zoom: 12,
    bearing: 0,
    pitch: 0
}

/* eslint-enable no-unused-vars */

export const MAPBOX_SETTINGS = {
    container: 'map',
    width: '100%',
    style: MAP_STYLES.dark,
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
}
export const DECKGL_SETTINGS = {
    canvas: "deck-canvas",
    width: "100%",
    height: "100%",
    controller: true,
    useDevicePixels: false,
    viewState: INITIAL_VIEW_STATE,
}