<template>
    <canvas id="deck-canvas"></canvas>
</template>

<script>
import { Deck } from "@deck.gl/core"

export default {
    name: 'deckgl',
    data() {
        return { 
            deck: {}
        }
    },
    props: {
        settings: {
            type: Object,
            required: true
        },
        layers: {
            type: Array
        },
        map: {
            type: Object
        }
    },
    mounted() {
        this.deck = new Deck({ ...this.settings, onViewStateChange: this.moveMap})
        this.$emit("created", this.deck)
    },
    methods: {
        moveMap({ viewState }) {
            this.deck.setProps({ viewState: viewState })
            this.map.jumpTo({
                center: [viewState.longitude, viewState.latitude],
                zoom: viewState.zoom,
                bearing: viewState.bearing,
                pitch: viewState.pitch,
            })
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
