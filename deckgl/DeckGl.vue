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
            }
    }
}
</script>
