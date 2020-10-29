---
title: 'Interacting with DeckGL'
description: 'how to interact with DeckGL'
position: 9
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Interactivity'
---

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