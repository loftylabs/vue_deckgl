---
title: 'Instant Example'
description: 'Vue_DeckGL Example'
position: 3
category: 'Getting started'
version: 1.4
fullscreen: false
menuTitle: 'Instant Example'
---

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
          :accessToken="'YOUR MAPBOX TOKEN'"                 
          :center="[-123.13, 49.254]"
          :zoom="11"
          :bearing="0"
          :pitch="45"
          />
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
.fill-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
```