---
title: 'Vue_DeckGL and Maps'
description: 'vue_deckgl and maps implementation'
position: 5
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Implementing a Map'
---

If you've added DeckGL as a component in your project and only see an emtpy white box, you are making progress. At this point, DeckGL (asumming there are no errors) is running! 

DeckGL is often used to look Geospatial data(but it doesn't have to be). To help visualize that data, we need to provide DeckGL with a map.

DeckGL supports different types of [Base Maps](https://deck.gl/docs/get-started/using-with-map) to render Layers (your data) on top of.

This library provides a Component wrapper around Mapbox that can be slotted into DeckGL. 
  - This means you will need a [Mapbox token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)

## Adding Mapbox

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