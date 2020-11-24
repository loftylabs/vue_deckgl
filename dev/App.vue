<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :class="['fill-wrapper']"
            :controlMap="true"
            :layers="layers"
            :canvas="'deck-canvas'"
            :width="'100%'"
            :height="'100%'"
            :controller="true"
            :useDevicePixels="false"
            :viewState="deckglSettings.viewState"
            @initialRender="()=>{hasDeckLoaded = true}"
            :getTooltip="deckTooltipCallback"
            
            >
                <Mapbox
                :class="['fill-wrapper']"
                :accessToken="mapboxToken"
                :map_style="mapboxSettings.style"
                :container="'map'"
                :width="'100%'"
                :interactive="false"
                :center="mapboxSettings.center"
                :zoom="mapboxSettings.zoom"
                :bearing="mapboxSettings.bearing"
                :pitch="mapboxSettings.pitch"
                />
                <GeoJsonLayer 
                :layerData="data_url"             
                :id="'mylayer'"
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
        </DeckGl>
        <h1 v-if="!hasDeckLoaded">Loading...</h1>
        <div style="position:absolute;">
            <button  @click="testSinglePick">Test Deck Single Pick object</button>
            <button  @click="testMultiPick">Test Deck Multi Pick object</button>
            <button  @click="testObjectsPick">Test Deck Objects Pick object</button>
        </div>
        <div id="example-deck-tooltip" v-if="deckTooltipHovered" :style="hoverPosition">
            <p>valuePerSqm: {{deckHoveredData.valuePerSqm}}</p>
            <p>Growth: {{deckHoveredData.growth}}</p>
        </div>
    </div>
</template>

<script>
    import DeckGl from '../src/components/deckgl'
    import Mapbox from '../src/components/mapbox'
    import GeoJsonLayer from '../src/components/layers/GeoJsonLayer'
    import { MAPBOX_SETTINGS, DECKGL_SETTINGS, DATA_URL} from './exampleSettings'
    import MAPBOX_TOKEN from '../env.js'
    import {getTooltip, colorScale} from './exampleUtils'

    export default {
        components: { Mapbox, DeckGl, GeoJsonLayer },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[ ],
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
            }
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