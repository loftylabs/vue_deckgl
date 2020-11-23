<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :class="['fill-wrapper']"
            :layers="layers"
            :views="views"
            :width="'100%'"
            :height="'100%'"
            :canvas="'deck-canvas'"
            :controller="true"
            :useDevicePixels="false"
            :controlMap="true"
            :viewState="deckglSettings.viewState"
            @initialRender="()=>{hasDeckLoaded = true}"
            :useCustomViews="true"
            >
                <GeoJsonLayer 
                :layerData="data_url"             
                :id="'mylayer'"
                :class="'layer'"
                :opacity="0.8"
                :stroke="false"
                :filled="true"
                :extruded="true"
                :wireframe="true"
                :fp64="true"
                :getElevation="f => Math.sqrt(f.properties.valuePerSqm) * 10"
                :getFillColor="f => colorScale(f.properties.growth)"
                :getLineColor="[255, 255, 255]"
                :pickable="true"
            /> 
            
          <MapView
            :id="'my-map-view-2'"
            :longitude="mapboxSettings.center[0]"
            :latitude="mapboxSettings.center[1]"
            :controller="true"
            :width="'25%'"
            :height="'25%'"
            :zoom="mapboxSettings.zoom"
            >
                <Mapbox
                 :class="'map-wrapper'"
                :accessToken="mapboxToken"
                :map_style="mapboxSettings.style"
                :container="'mapbox-2'"
                :interactive="true"
                :center="mapboxSettings.center"
                :zoom="mapboxSettings.zoom"
                :bearing="mapboxSettings.bearing"
                :pitch="mapboxSettings.pitch"
                />
          </MapView>
        </DeckGl>
        <h1 v-if="!hasDeckLoaded">Loading...</h1>
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
    import GeoJsonLayer from '../src/components/layers/GeoJsonLayer'
    import MapView from '../src/components/views/MapView'
    import { MAPBOX_SETTINGS, DECKGL_SETTINGS, DATA_URL} from './exampleSettings'
    import MAPBOX_TOKEN from '../env.js'
    import {getTooltip, colorScale} from './exampleUtils'



    export default {
        components: {  DeckGl, MapView, Mapbox, GeoJsonLayer },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[ ],
                views: [ ],
                hasDeckLoaded: false,
                data_url: '',
                colorScale: colorScale,
            }
        },
        methods: {
           getTooltip,
            testSinglePick(){
                console.log(this.$refs.deck.pickObject(100, 100, 0, null, false))
            },
            testMultiPick(){
                console.log(this.$refs.deck.pickMultipleObjects(100, 100, 0, null, 10, false))
            },
            testObjectsPick(){
                console.log(this.$refs.deck.pickObjects(100, 100, 1, 1, null))
            },
        },
        created(){            
            this.data_url = DATA_URL
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