---
title: 'Adding Data with Layers'
description: 'how to add data to deckgl with layers'
position: 8
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Adding Data With Layers'
---

DeckGL accepts data through the use of [many types of different layers](https://deck.gl/docs/api-reference/layers). 

To provide data to DeckGL, we simply create a Layer using the DeckGL Core Library and pass it to the `:layers` prop on the DeckGL Component. 
  - Data passed to the layer could be a URL to the data or data that you fetch yourself via fetch/axois.

In this example, we will be using GeoJSON data provided via this URL: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'

```
<template>
  <div id="app">
      <DeckGL ref="deck"
            :class="['fill-wrapper']"
            :controlMap="true"
            :layers="layers"
            :width="'100%'"
            :height="'100%'"
            :controller="true"
            :useDevicePixels="false"
            :viewState="{latitude: 49.254, longitude: -123.13, zoom: 11, maxZoom: 16, pitch: 45, bearing: 0}"
            >
      <Mapbox class="fill-wrapper" 
                :accessToken="'KEY GOES HERE'"                 
                :center="[-123.13, 49.254]"
                :zoom="11"
                :bearing="0"
                :pitch="45"/>
    </DeckGL>
  </div>
</template>

<script>
import {DeckGL, Mapbox} from '@hirelofty/vue_deckgl'
import {GeoJsonLayer} from '@deck.gl/layers';

export default {
  name: 'App',
  components: {
    DeckGL,
    Mapbox
  }, 
  data(){
      return{
          layers:[]
      }
  },
  mounted(){
        this.layers.push(new GeoJsonLayer({
            id: 'mylayer',
            data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
            getLineColor: [255, 255, 255],
            pickable: true,
        }))
  }
}
</script>

<style>
...
</style>
```

Notes about the implementation above
- As with DeckGL and Mapbox, DeckGL layers have plenty of properties that can be explored further in the documentation.
- We provide new GeoJsonLayer with a url to the data.
- Because this data is in Vancouver, we set the viewState of DeckGL and Mapbox to default to Vancouver so we can see it.

#### Future Implementation of Layers

Because we love Declarative Templating so much, our eventual goal is to build small Component wrappers around Layers so that the API is providing Layers via Slot rather than props. These also will include "nice to haves" that make Layers easier to use.

An example being...
```
<template>
    <DeckGL>
        <Mapbox />
        <GeoJsonLayer :data='DATA' />
        <ScatterPlotLayer :data='DATA' />
    </DeckGL>
</template>
```
