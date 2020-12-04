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

Because we love Declarative Templating so much, we simply slot a Layer Component inside of Vue DeckGL using the provided Vue DeckGL Layers. While this ultimately is just a thin abstraction for declarative templating, we hope to eventually add "nice-to-haves" to make working with Layers a little easier.
 

In this example, we will be using GeoJSON data provided via this URL: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'
  - Data passed to the layer component could be a URL to the data or data that you fetch yourself via fetch/axios.

```
<template>
  <div id="app">
      <DeckGL ref="deck"
            :class="['fill-wrapper']"
            :controlMap="true"
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
        <GeoJsonLayer 
          :layerData="'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'"             
          :id="'mylayer'"
          :opacity="0.8"
          :stroke="false"
          :filled="true"
          :extruded="true"
          :wireframe="true"
          :fp64="true"
          :getElevation="f => Math.sqrt(f.properties.valuePerSqm) * 10"
          :getLineColor="[255, 255, 255]"
          :pickable="true"
      />
    </DeckGL>
  </div>
</template>

<script>
import {DeckGL, Mapbox, GeoJsonLayer} from '@hirelofty/vue_deckgl'

export default {
  name: 'App',
  components: {
    DeckGL,
    Mapbox,
    GeoJsonLayer
  }, 
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

#### Are we not currently providing a layer you want to use? Create it and submit a PR! It's easy!

To do this, all you need to do is create a layer that utilizes the BaseLayerMixin. This mixin is how Vue DeckGL knows that a slotted component passed was a layer type. Here's a quick example of implementing a GeoJsonLayer

```
<script>
import { GeoJsonLayer } from "@deck.gl/layers";
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "GeoJsonLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: GeoJsonLayer,
    };
  },
  render: () => null,
};
</script>

```
That's it! Now mileage may vary if you are attempting to implement a more complicated layer, but the key piece to get started is to utilize the BaseLayerMixin.

Note the `render: () => null` method. Because we are creating a Vue component that does not render any HTML, but instead works with Deck.gl to display data, we can override the Vue render method to return null here, to do nothing. This allows us to avoid having to include an empty template in our code.