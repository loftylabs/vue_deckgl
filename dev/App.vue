<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :class="['fill-wrapper']"
            :layers="layers"
            :width="'100%'"
            :height="'100%'"
            :canvas="'deck-canvas'"
            :controller="true"
            :useDevicePixels="true"
            :controlMap="true"
            :viewState="deckglSettings.viewState"
            @initialRender="()=>{hasDeckLoaded = true}"
             :getTooltip="deckTooltipCallback" 

            >


                    <GeoJsonLayer 
                    :data="data_url"  
                    :id="'my-layer'"
                    :visible="topVisible"
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
                    :onHover="deckTooltipCallback" 

                /> 


          <!-- <GeoJsonLayer 
                :data="data_url"             
                :id="'my-layer-2'"
                :class="'layer'"
                :opacity="0.8"
                :stroke="false"
                :filled="true"
                :extruded="true"
                :wireframe="true"
                :fp64="true"
                :getElevation="f => Math.sqrt(f.properties.valuePerSqm) * valuePerSqm"
                :getFillColor="f => colorScale(f.properties.growth * valuePerSqm)"
                :getLineColor="[255, 255, 255]"
                :pickable="true"
                :onHover="deckTooltipCallback"
                :dataTransform="(data, previousData) => transformData(data, previousData)"
            />  -->
            
           <MapView
            :id="'my-map-view-2'"
            :longitude="mapboxSettings.center[0]"
            :latitude="mapboxSettings.center[1]"
            :controller="true"
            :width="'100%'"
            :height="'100%'"
            :zoom="mapboxSettings.zoom"
            >
                <Mapbox
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
        <MapView
            :id="'my-map-view-1'"
            :longitude="mapboxSettings.center[0]"
            :latitude="mapboxSettings.center[1]"
            :controller="true"
            :width="'25%'"
            :height="'25%'"
            :zoom="mapboxSettings.zoom"
            >
                <Mapbox
                :accessToken="mapboxToken"
                :map_style="mapboxSettings.style"
                :container="'mapbox-3'"
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
            <button  @click="toggleTopLayer">Toggle Top Layer</button>
            <!-- <div class="slidecontainer">
                <input type="range" :min="0" :max="20" v-model.number="valuePerSqm"   step="1"  class="slider" id="myRange">
            </div> -->
        </div>
       
        <div id="example-deck-tooltip"   v-if="deckTooltipHovered"  :style="hoverPosition">
            <p>valuePerSqm: {{deckHoveredData.valuePerSqm}}</p>
            <p>Growth: {{deckHoveredData.growth}}</p>
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

    let valuePer = 5;

    export default {
        components: {  DeckGl, Mapbox, MapView, GeoJsonLayer },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[ ],
                valuePerSqm: valuePer,
                topVisible:true,
                hasDeckLoaded: false,
                data_url: '',
                colorScale: colorScale,
                deckTooltipHovered: false,
                deckHoveredData: {x:0, y:0, valuePerSqm: 0, growth:0}
            }
        },
        computed: {
              hoverPosition: function () {
                return {
                    'position': 'absolute',
                    'left': (this.deckHoveredData.x + 30) + 'px',
                    'top': (this.deckHoveredData.y + + 30) + 'px'
                }
            },
        },
        methods: {
           getTooltip,
            deckTooltipCallback({x,y, picked, object}){
                if(!(picked)){
                    this.deckTooltipHovered = false
                    return 
                }
                
                this.deckTooltipHovered = true
                this.deckHoveredData.x = x
                this.deckHoveredData.y = y
                this.deckHoveredData.valuePerSqm = object.properties.valuePerSqm
                this.deckHoveredData.growth = object.properties.growth
            },
            testSinglePick(){
                console.log(this.$refs.deck.pickObject(100, 100, 0, null, false))
            },
            testMultiPick(){
                console.log(this.$refs.deck.pickMultipleObjects(100, 100, 0, null, 10, false))
            },
            testObjectsPick(){
                console.log(this.$refs.deck.pickObjects(100, 100, 1, 1, null))
            },
            toggleTopLayer(){
                this.topVisible = !this.topVisible
            },
            transformData(data){
                var newData = {...data}
                newData.features = newData.features.filter(f => {
                    return f.properties.valuePerSqm > 7000})
                return newData
            }
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
    #example-deck-tooltip{
        position:absolute;
        background-color:purple;
        width:10%;
        height:10%;
    }
</style>