# Vue DeckGL

A prebuilt Vue.js component wrapping the [DeckGL library](https://deck.gl/).

- [Vue DeckGL](#vue-deckgl)
- [How to install](#how-to-install)
- [TLDR: Instant Example to begin playing](#tldr-instant-example-to-begin-playing)
- [Full Tutorial](#full-tutorial)
  - [How to access Vue_DeckGL in your project](#how-to-access-vue_deckgl-in-your-project)
  - [How to use Vue_DeckGL](#how-to-use-vue_deckgl)
    - [DeckGL and Maps](#deckgl-and-maps)
      - [Vue_deckgl + Mapbox implementation](#vue_deckgl--mapbox-implementation)
    - [Controlling settings for DeckGL and Mapbox](#controlling-settings-for-deckgl-and-mapbox)
      - [Important Props](#important-props)
        - [DeckGL](#deckgl)
        - [Mapbox](#mapbox)
      - [Why didn't I have to provide any settings initially besides class/mapbox token?](#why-didnt-i-have-to-provide-any-settings-initially-besides-classmapbox-token)
      - [Passing Configuration Note](#passing-configuration-note)
    - [Adding Data to DeckGL](#adding-data-to-deckgl)
      - [Future Implementation of Layers](#future-implementation-of-layers)
    - [Interactivity with DeckGL](#interactivity-with-deckgl)
      - [Advanced: Picking Objects](#advanced-picking-objects)
  - [DeckGL LifeCycle events](#deckgl-lifecycle-events)
  - [Full examples](#full-examples)
- [Want to contribute? We want your help!](#want-to-contribute-we-want-your-help)
  - [Running test app](#running-test-app)

# How to install

```npm install @hirelofty/vue_deckgl```

# TLDR: Instant Example to begin playing

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

# Full Tutorial
## How to access Vue_DeckGL in your project

Vue_DeckGL can be imported just like any other component and used in your existing Vue components/templates.

```
<template>
  <div id="app">
    <DeckGL />
  </div>
</template>

<script>
import DeckGL from '@hirelofty/vue_deckgl'

export default {
  name: 'App',
  components: {
    DeckGL
  }
}
</script>
```

## How to use Vue_DeckGL

This library is meant to provide a slightly opionated and easy to use interface on the DeckGL library through a familiar Vue component.

While more abstractions are on the way to get Vue developers/existing DeckGL gurus up to speed faster with DeckGL/Vue, not everything currently has a nice interface to play with. 

For full documentation and more granular control of DeckGL, please see the [docs here](https://deck.gl/docs)

### DeckGL and Maps
If you've added DeckGL as a component in your project and only see an emtpy white box, you are making progress. At this point, DeckGL (asumming there are no errors) is running! 

DeckGL is often used to look Geospatial data(but it doesn't have to be). To help visualize that data, we need to provide DeckGL with a map.

DeckGL supports different types of [Base Maps](https://deck.gl/docs/get-started/using-with-map) to render Layers (your data) on top of.

This library provides a Component wrapper around Mapbox that can be slotted into DeckGL. 
  - This means you will need a [Mapbox token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)

#### Vue_deckgl + Mapbox implementation

- You can import Mapbox from same library as vue_deckgl and utilize as a component.
```
import {DeckGL, Mapbox} from '@hirelofty/vue_deckgl'
```

- You can provide the Mapbox token directly to your Mapbox Component via the `accessToken` prop
```
<Mapbox accessToken="YOUR_KEY_GOES_HERE"/>
```

- Mapbox should then be slotted in the DeckGL component. 
```
<template>
  <div id="app">
    <DeckGL>
      <Mapbox accessToken="YOUR_KEY_GOES_HERE"/>
    </DeckGL>
  </div>
</template>

<script>
import {DeckGL, Mapbox} from '@hirelofty/vue_deckgl'

export default {
  name: 'App',
  components: {
    DeckGL,
    Mapbox
  }
}
</script>
```

- Now we can apply styles on the Components so they they can be visualized

```
<template>
  <div id="app">
    <DeckGL class="fill-wrapper">
      <Mapbox class="fill-wrapper" accessToken="YOUR_KEY_GOES_HERE"/>
    </DeckGL>
  </div>
</template>

<script>
...
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

You now should have a map!

### Controlling settings for DeckGL and Mapbox

If you spent any amount of time looking at DeckGL or Mapbox documentation, you will have seen plenty of configuration properties that can be controlled for both libraries. 

You can change those properties on the Components through the Vue prop syntax.

```
<template>
    ...
        <DeckGl 
            ref="deck"
            :class="['fill-wrapper']"
            :controlMap="true"
            :layers="layers"
            :width="'100%'"
            :height="'100%'"
            :controller="true"
            :useDevicePixels="false"
            :viewState="deckglSettings.viewState"
            @initialRender="()=>{hasDeckLoaded = true}"
            >
                <Mapbox :accessToken="KEY_GOES_HERE">
            </DeckGL>
    ...
</template>
```

Some of these props are more important than others. Some will have minor explanations as they are crucial to just getting started with DeckGL, some you may need to go check existing documentation to understand what they do. 

#### Important Props
##### DeckGL
- :class="" - Need some CSS to visualize your component.
- :controlMap="true/false" - tells the Vue_DeckGL Component it needs to manually interact with the slotted Mapbox component (not a native DeckGL Prop)
- :layers=[] - where data will be provided. Minor explanation later. 
- :controller="true/false" - Allows for DeckGL manual interactivity. Minor explanation later. 
- :viewState="{viewState}" - Initial viewState object. Minor explanation later. 

##### Mapbox 
- :accessToken="KEY_GOES_HERE" - Need token to utilize Mapbox

#### Why didn't I have to provide any settings initially besides class/mapbox token? 

The components ship out of the box with default settings! 
- To view those settings, [please see here](https://github.com/loftylabs/vue_deckgl/blob/development/src/components/utils/defaultSettings.js)

We plan on exposing these settings to be accessed in your project as well. 



#### Passing Configuration Note
To avoid specifying props for each object or having a large "options" object, we have opted to just this.$attrs to grab properties that are passed which we don't have Vue props set up for. At this time, the only issue we see with this is HTML name collisions (e.g., style). In this case, we will have slightly different names for those properities (e.g., style-> mapStyle). If we need to change from this.$attrs to this.$props for validation reasons, the Vue API is similar for you, the end user. 

Open for discussion on other issues that could arise from this.

### Adding Data to DeckGL
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

### Interactivity with DeckGL

Interactivity comes in a couple different forms with DeckGL 

- Controll the Viewport: `:controller="true" :controlMap="true" ` ship by default, but these properties enable DeckGL/Mapbox to respond to viewState changes via mouse drag, scroll,etc.

#### Advanced: Picking Objects

We have also exposed the picking engine of DeckGL through a public facing API which you can access by a `ref` on the DeckGL component. 

```
<template>
    ...
  <DeckGL ref="deck"></DeckGL>
    ...
</template>

<script>

...
mounted(){
    this.$refs.deck.pickObject(100, 100, 0, null, false)
}
...
```
- If you had a ` pickable: true ` layer in that location, it would return back the the object in that position.

For full details, [see the docs](https://deck.gl/docs/developer-guide/interactivity).

## DeckGL LifeCycle events

To cooperate with Vue lifecycle events, we will expose certain DeckGL life cycle events when the need arises. 

The only current example of this is `initialRender` and using it as a "spinner" or "loading" notifier.

```
<template>
    <DeckGL>
    @initialRender="()=>{hasDeckLoaded = true}"
    </DeckGL>
    <h1 v-if="!hasDeckLoaded">DECK IS LOADING...</h1>
</template>

<script>
...
data(){
    return{
        hasDeckLoaded: false
    }
} 
...
</script>
```

## Full examples

All examples of test code can be [found here](https://github.com/loftylabs/vue_deckgl/tree/development/dev)

These examples are known workng that we use during development and to test new features. 


# Want to contribute? We want your help!
- Fork the repo and checkout a branch (named off issue vd-XX) based off development. 
- Make changes
- Create a PR!
- Once reviewed and approved, we will merge in the code into development. 

## Running test app
- To run the example component to test development, you need [vue-cli](https://cli.vuejs.org/) installed.
- Then change directory into dev `cd dev`
- Then you can run `vue serve` to serve the example vue component.
- You'll also need a env.js file to keep your mapbox token in until we find a clever way of handling this. 
  - Place a .env.js file in your root directory with the following details. Gitignore is set up to ignore this file.
  ```
  export default 'TOKEN GOES HERE
  ```
- You should be able to start adding/making changes now and see it represented in the example App.- [Vue DeckGL](#vue-deckgl)