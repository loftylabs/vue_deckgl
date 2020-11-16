<template>
    <div>
        <slot></slot>
        <canvas id="deck-canvas"></canvas>
    </div>
</template>

<script>
import { Deck } from "@deck.gl/core"

import processChildren from "../utils/processChildren.js"
import {DECKGL_SETTINGS} from '../utils/defaultSettings.js'

export default {
    name: 'deckgl',
    data() {
        return { 
            deck: {},
            map: {},
            hasHandlers: false,
            afterRenderCounter: 0 
        }
    },
    props: {
        controlMap: {
            type: Boolean,
            default: false
        },
        layers: {
            type: Array,
            required: false
        }        
    },
    mounted() {
        this.deck = new Deck({ ...DECKGL_SETTINGS,
            ...this.$attrs, 
            ...this.$props,
            onAfterRender: this.setupHandlers
            })

        this.map = processChildren(this.$children)
        window.addEventListener('resize', this.onWindowResizeHandler)
        
    },
    watch: {
        layers(){
            this.deck.setProps({layers: [...this.layers]})
        }
    },
    methods: {
        /* The initialization of DeckGL is not working properly with Vue.
            We need to setProps once before interactive listeners can be added (IE - onViewStateChange).
            We know it's safe to do so once the render has taken place twice. (First Render = Canvas, Second Render = Layers)
        */
        hasInitialRenderBugResolved(){
            if(this.afterRenderCounter == 1){
                return true                
            }
            this.afterRenderCounter += 1
            this.deck.setProps({...this.deck.props})
            return false
        },
        // Once we know we have moved past the initialRender cycle, we can then remove listener for onAfterRender, attach interactive listeners, and emit initialRender is complete.
        setupHandlers(){
            if(this.hasInitialRenderBugResolved()){
                this.deck.setProps({...this.deck.props, onViewStateChange: this.moveMap, onAfterRender: ()=>{}})
                this.$emit('initialRender', true)
                this.hasHandlers = true
            }
        },
        moveMap({ viewState }) {
            this.deck.setProps({ viewState: viewState })

            if(this.controlMap){
                this.map.jumpTo([viewState.longitude, viewState.latitude], viewState.zoom, viewState.bearing, viewState.pitch)
            }
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
        },
        onWindowResizeHandler(){
            setTimeout(() => {
                this.deck.setProps({...this.deck.props, width:'100%', height:'100%'})
            }, 300);
        }
    }
}
</script>
