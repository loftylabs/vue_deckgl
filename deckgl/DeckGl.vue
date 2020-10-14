<template>
    <div>
        <slot></slot>
        <canvas id="deck-canvas"></canvas>
    </div>
</template>

<script>
import { Deck } from "@deck.gl/core"


const processChildren = (children) => {
    let map = null

    children.forEach(child => {
        // TODO: To add support for Slotted Layers, we will need to change this to a return type of {} with a map key and maybe a layers key which points to an Array.
        if(child.$options._componentTag === 'Mapbox'){
            console.log('found it')
            map = child
        }
    });
    return map
}

export default {
    name: 'deckgl',
    data() {
        return { 
            deck: {},
            map: {}
        }
    },
    props: {
        settings: {
            type: Object,
            required: true
        },
        layers: {
            type: Array
        }
    },
    mounted() {
        this.deck = new Deck({ ...this.settings, onViewStateChange: this.moveMap})
        this.map = processChildren(this.$children)
    },
    methods: {
        moveMap({ viewState }) {
            console.log(viewState)
                this.deck.setProps({ viewState: viewState })
                this.map.jumpTo([viewState.longitude, viewState.latitude], viewState.zoom, viewState.bearing, viewState.pitch)
            }
    }
}
</script>
