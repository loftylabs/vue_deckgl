---
title: 'Configuring DeckGL/Mapbox settings'
description: 'How to configure DeckGL and Mapbox settings'
position: 7
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Configuring Settings'
---

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

## Important Props
### DeckGL
- `:class=""` - Need some CSS to visualize your component.
- `:controlMap="true/false"` - tells the Vue_DeckGL Component it needs to manually interact with the slotted Mapbox component (not a native DeckGL Prop)
- `:layers=[]` - where data will be provided. Minor explanation later. 
- `:controller="true/false"` - Allows for DeckGL manual interactivity. Minor explanation later. 
- `:viewState="{viewState}"` - Initial viewState object. Minor explanation later. 

### Mapbox 
- `:accessToken="KEY_GOES_HERE"` - Need token to utilize Mapbox

## Why didn't I have to provide any settings initially besides class/mapbox token? 

The components ship out of the box with default settings! 
- To view those settings, [please see here](https://github.com/loftylabs/vue_deckgl/blob/development/src/components/utils/defaultSettings.js)

We plan on exposing these settings to be accessed in your project as well. 



## Passing Configuration Note
To avoid specifying props for each object or having a large "options" object, we have opted to just this.$attrs to grab properties that are passed which we don't have Vue props set up for. At this time, the only issue we see with this is HTML name collisions (e.g., style). In this case, we will have slightly different names for those properities (e.g., style-> mapStyle). If we need to change from this.$attrs to this.$props for validation reasons, the Vue API is similar for you, the end user. 

Open for discussion on other issues that could arise from this.