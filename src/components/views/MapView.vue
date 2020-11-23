<template>
    <div :id="this.$attrs.id" :class="'map-view'">
      <slot></slot>
    </div>
</template>

<script>
import baseViewMixin from './baseViewMixin.js'
import {MapView} from '@deck.gl/core';
import processChildren from './processChildren'

export default {
    name: 'MapView',
    mixins:[baseViewMixin],
    data(){
      return {
        map:{}
      }
    },
    created(){
        this.view = new MapView({
            ...this.$attrs,
        });
    },
    mounted(){
      this.map = processChildren(this.$children)
      this.setWidthHeight()
    },
    methods:{
      setWidthHeight(){
        this.map.$el.style.height = this.$attrs.height;
        this.map.$el.style.width = this.$attrs.width;

      },
      moveMap(viewState, controlMap){
        this.setViewProps(viewState)
        if(controlMap){
            this.map.jumpTo([viewState.longitude, viewState.latitude], viewState.zoom, viewState.bearing, viewState.pitch)
        }
      },
      setViewProps(viewState){
        this.view.props = {...viewState}
      }
    }


}
</script>
<style  scoped>

.map-view div{
  position:absolute;
}
</style>
