# Vue DeckGL

A slighty opionated prebuilt Vue.js component that wraps the [DeckGL library](https://deck.gl/).

## Documentation
- [Vue DeckGL Documentation and Full Tutorial]()
- [DeckGL Documentation](https://deck.gl/docs)
- [Mapbox Documentation](https://docs.mapbox.com/)

## Install

`npm install @hirelofty/vue_deckgl`

## Access Component
`import {DeckGL, Mapbox} from '@hirelofty/vue_deckgl'`

## Important Props

For full explanation, [please visit the tutorial]()

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
            :layers="layers"
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

- [See our contribution guide]()