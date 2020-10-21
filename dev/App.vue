<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :test="'BLAH'"
            :settings="deckglSettings"
            :class="['fill-wrapper']"
            :controlMap="true"
            :layers="layers"
            :canvas="'deck-canvas'"
            :width="'100%'"
            :height="'100%'"
            :controller="true"
            :useDevicePixels="false"
            :viewState="deckglSettings.viewState"
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
    import { MAPBOX_SETTINGS, DECKGL_SETTINGS, DATA_URL} from './exampleSettings'
    import {GeoJsonLayer} from '@deck.gl/layers';
    import MAPBOX_TOKEN from '../env.js'
    import {getTooltip, colorScale} from './exampleUtils'

    export default {
        components: { Mapbox, DeckGl },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[ new GeoJsonLayer({
                        id: 'mylayer',
                        data: DATA_URL,
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
                        })],
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