---
title: 'Using Multiple Views'
description: 'how to visualize your deck.gl with multiple views'
position: 10
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Using Multiple Views'
---

Deck GL allows for the visualization of your layers through multiple viewpoints. There are several types of views that Deck Gl has, the MapView being the default and most common one. Other examples are First Person and Orthographic views. You can have multiple views to visualize your data from multiple viewpoints. The example below implements a full width map with a GeoJson layer and a minimap with the same GeoJson layer. 




Because we love Declarative Templating so much, we simply slot a View Component inside of Vue DeckGL using the provided Vue DeckGL Views. While this ultimately is just a thin abstraction for declarative templating, we hope to eventually add "nice-to-haves" to make working with Views a little easier. When using a slotted view, you will need to provide a Map if you would like to have a map under your layer.


In this example, we will be using GeoJSON data provided via this URL: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'

```
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
        components: {  DeckGl, Mapbox, MapView, GeoJsonLayer },
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
```
- In this example, we are using two map views with a GeoJson layer. 
- For the first map view, we set the width and height to 100% so it will take up the full screen. Inside this map view we have slotted a Mapbox so that our layer will appear on the map. 
- For the second map view, we set the width and height to 25% so it will appear as a secondary minimap in the top left. Inside this map view we have slotted a Mapbox so that our layer will appear on the secondary map as well. 
- When controlling the map, the two maps will move at the same time. If you move the smaller map then it will move the large map and vice versa.