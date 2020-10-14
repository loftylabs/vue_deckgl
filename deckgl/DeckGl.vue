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
                this.deck.setProps({ viewState: viewState })
                this.map.jumpTo([viewState.longitude, viewState.latitude], viewState.zoom, viewState.bearing, viewState.pitch)
        },
        //Get the closest pickable and visible object at the given screen coordinate.
        pickObject(x, y, radius=0, layerIds=null, unproject3D=false) {
            return this.deck.pickObject({x, y, radius, layerIds, unproject3D});
        },
        // Performs deep picking. Finds all close pickable and visible object at the given screen coordinate, even if those objects are occluded by other objects.
        pickMultipleObjects(x, y, radius=0, layerIds=null, depth=10, unproject3D=false) {
            return this.deck.pickMultipleObjects({x, y, radius, layerIds, depth, unproject3D});
        },
        //Get all pickable and visible objects within a bounding box.
        pickObjects(x, y, width=1, height=1, layerIds=null) {
            return this.deck.pickObjects({x, y, width, height, layerIds});
        }
    }
}
</script>
