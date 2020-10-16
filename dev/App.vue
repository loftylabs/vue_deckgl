<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :settings="deckglSettings"
            :class="['fill-wrapper']"
            :controlMap="true"
            :layers="layers"
        >
                <Mapbox
                :accessToken="mapboxToken"
                :settings="mapboxSettings"
                :class="['fill-wrapper']"
                />
        </DeckGl>
        <div style="position:absolute;">
            <button  @click="testSinglePick">Test Deck Single Pick object</button>
            <button  @click="testMultiPick">Test Deck Multi Pick object</button>
            <button  @click="testObjectsPick">Test Deck Objects Pick object</button>
        </div>
    </div>
</template>

<script>
    import DeckGl from '../src/components/deckgl'
    import Mapbox from '../src/components/mapbox'
    import MAPBOX_TOKEN from '../env.js'
    import {GeoJsonLayer} from '@deck.gl/layers';
    import {COLOR_SCALE} from '../src/components/utils/mapUtils'


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

    export default {
        components: { Mapbox, DeckGl },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[],
            }
        },
        mounted(){
    function colorScale(x) {
  const i = Math.round(x * 7) + 4;
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0];
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
}



            this.layers.push(
                    new GeoJsonLayer({
      id: 'geojson',
      data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
       fp64: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => colorScale(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true,
    })
            )


            
            
        },
        methods: {
            testSinglePick(){
                console.log(this.$refs.deck.pickObject(100, 100, 0, null, false))
            },
            testMultiPick(){
                console.log(this.$refs.deck.pickMultipleObjects(100, 100, 0, null, 10, false))
            },
            testObjectsPick(){
                console.log(this.$refs.deck.pickObjects(100, 100, 1, 1, null))
            }
        }
    }
</script>

<style scoped>
    .fill-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>