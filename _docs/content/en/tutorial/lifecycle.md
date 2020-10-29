---
title: 'Lifecycle Events of DeckGL'
description: 'how to listen to lifecycle events of DeckGL'
position: 10
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Lifecycle Events'
---

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
