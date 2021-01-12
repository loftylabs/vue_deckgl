# Vue DeckGL

A slighty opionated prebuilt Vue.js component that wraps the [DeckGL library](https://deck.gl/).

## Documentation
- [Vue DeckGL Documentation and Full Tutorial](https://loftylabs.github.io/vue_deckgl/)
- [DeckGL Documentation](https://deck.gl/docs)
- [Mapbox Documentation](https://docs.mapbox.com/)

## Install

`npm install @hirelofty/vue_deckgl`

## Access Component
`import {DeckGL, Mapbox} from '@hirelofty/vue_deckgl'`

## Important Props

For full explanation, [please visit the tutorial](https://loftylabs.github.io/vue_deckgl/tutorial/settings)

### DeckGL
| Prop        | Description           |
| ------------- |:-------------:| 
| `:class=""`    | Need some CSS to visualize your component.| 
| `:controlMap="true/false"`     | tells the Vue_DeckGL Component it needs to manually interact with the slotted Mapbox component (not a native DeckGL Prop)      |
| `:viewState="{viewState}"` | Allows for DeckGL manual interactivity.    |
| `:controller="true/false"` | Initial viewState object      |

### Mapbox

| Prop        | Description           |
| ------------- |:-------------:|
| `:accessToken="KEY_GOES_HERE"`    | Need token to utilize Mapbox |

## Instant Example

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
                :container="'mapbox'"             
                :center="[-123.13, 49.254]"
                :zoom="11"
                :bearing="0"
                :pitch="45"
                />
        <GeoJsonLayer 
        :data="'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'"             
        :id="'mylayer'"
        :opacity="0.8"
        :stroke="false"
        :filled="true"
        :extruded="true"
        :wireframe="true"
        :fp64="true"
        :getElevation="f => Math.sqrt(f.properties.valuePerSqm) * 10"
        :getLineColor="[255, 255, 255]"
        :pickable="true" />
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

## Want to contribute? We want your help!

- [See our contribution guide](https://loftylabs.github.io/vue_deckgl/contribution/how_to_contribute)