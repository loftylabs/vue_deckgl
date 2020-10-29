---
title: 'Accessing Vue DeckGL'
description: 'how to access vue_deckl'
position: 4
category: 'Tutorial'
version: 1.4
fullscreen: false
menuTitle: 'Accessing Vue DeckGL'
---

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

## Using Vue DeckGL
This library is meant to provide a slightly opionated and easy to use interface on the DeckGL library through a familiar Vue component.

While more abstractions are on the way to get Vue developers/existing DeckGL gurus up to speed faster with DeckGL/Vue, not everything currently has a nice interface to play with. 

For full documentation and more granular control of DeckGL, please see the [docs here](https://deck.gl/docs)

For the rest of the tutorial, please continue on to the next page.