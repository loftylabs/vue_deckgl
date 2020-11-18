<template>
  <div></div>
</template>

<script>
import {GeoJsonLayer} from '@deck.gl/layers';

import BaseLayerMixin from './BaseLayerMixin'

export default {
    name: 'GeoJsonLayer',
    mixins:[BaseLayerMixin],
    created(){
        this.layer = new GeoJsonLayer({
            ...this.$attrs,
            data: this.layerData,
        })
    },
}
</script>

<style>

</style>