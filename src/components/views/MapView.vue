<template>
  <div id="base-map"></div>
</template>
<script>

import mapViewMixin from '../utils/mapViewMixin'
import {MapView} from '@deck.gl/core';
export default {
    name: 'MapView',
    mixins:[mapViewMixin],
    created(){
        this.view = new MapView({
            id: 'base-map'
        });


},
}
</script>
<style>
</style>