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

Interactivity comes in a couple different forms with DeckGL. 

- Controll the Viewport: `:controller="true" :controlMap="true" ` ship by default, but these properties enable DeckGL/Mapbox to respond to viewState changes via mouse drag, scroll,etc.


### Interacting with onHover and adding Tooltips

With DeckGL we can hook into either DeckGL's getTooltip event or a Layer's individual onHover event. Both callbacks look effectively the same. 
- DeckGL: `:getTooltip="CALLBACK`
- Layer: `:onHover="CALLBACK"`

DeckGL provides two options as you may want to handle a individual type of Layers onHover differently. Like rendering different tooltips.

A tooltip in this case is just a HTML element that we render in our templates using a `v-if`.

```
<template> 
  <DeckGL
  :getTooltip="deckToolTipCallback
  >
  </DeckGL>
...
  <div id="example-deck-tooltip" v-if="deckTooltipHovered" :style="hoverPosition">
      <p>valuePerSqm: {{deckHoveredData.valuePerSqm}}</p>
      <p>Growth: {{deckHoveredData.growth}}</p>
  </div>
...
</template>

<script>
data:{
  return {
    ...
    deckTooltipHovered: false,
    deckHoveredData: {x:0, y:0, valuePerSqm: 0, growth:0}
  }
},
computed: {
      hoverPosition: function () {
        return {
            'position': 'absolute',
            'left': (this.deckHoveredData.x + 30) + 'px',
            'top': (this.deckHoveredData.y + + 30) + 'px'
        }
    }
},
methods: {
  deckTooltipCallback({x,y, picked, object}){
      if(!(picked)){
          this.deckTooltipHovered = false
          return 
      }
      
      this.deckTooltipHovered = true
      this.deckHoveredData.x = x
      this.deckHoveredData.y = y
      this.deckHoveredData.valuePerSqm = object.properties.valuePerSqm
      this.deckHoveredData.growth = object.properties.growth
  },
}
</script>
<style scoped>
    #example-deck-tooltip{
        position:absolute;
        background-color:purple;
        width:10%;
        height:10%;
    }
</style>
```

We implement a tooltip by doing the following
- Create a HTML element that will hold data that we conditionally render and provide style to.
- Create data for Vue to be reactive on. 
- Generate a computed style property that will render the Tooltip in the location of the values that come back from the Hover event.
- Create a callback for getTooltip that destructures that data provided. 
- Create some default styling for a tooltip that won't change.

To implement this at a Layer level, we would only need to change the following:

```
<template> 
  <DeckGL
  >
  ...
  <GeoJsonLayer 
    onHover="deckTooltipCallback"
  />
  </DeckGL>
...
  <div id="example-deck-tooltip" v-if="deckTooltipHovered" :style="hoverPosition">
      <p>valuePerSqm: {{deckHoveredData.valuePerSqm}}</p>
      <p>Growth: {{deckHoveredData.growth}}</p>
  </div>
...
</template>
```



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