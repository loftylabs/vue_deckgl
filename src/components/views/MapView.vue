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
      this.setWidthHeight()

      this.map = processChildren(this.$children)
    },
    methods:{
      setWidthHeight(){
           document.querySelector('.map-view').firstChild.style.height = this.$attrs.height;
          document.querySelector('.map-view').firstChild.style.width = this.$attrs.width;
      },
      moveMap(viewState){
              this.setViewProps(viewState)
              this.map.jumpTo([viewState.longitude, viewState.latitude], viewState.zoom, viewState.bearing, viewState.pitch)
     
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
