<script>
import {GeoJsonLayer} from '@deck.gl/layers';

import BaseLayerMixin from './BaseLayerMixin'

export default {
    name: 'GeoJsonLayer',
    mixins:[BaseLayerMixin],
    props: {
        data:{
            type: String,
            required:true
        }
    },
    created(){
        this.layer = new GeoJsonLayer({
            ...this.$attrs,
               ...this.$props,
        })
    },
    mounted(){
        console.log('mounted')
    },
    updated(){
        console.log('updated')
    },
    watch: {
      $props: {
      handler() {
    
        this.createLayer()
      },
      deep: true,
      immediate: true,
    }
 },
    render: () => null,
    methods: {
      createLayer(){
               this.layer = new GeoJsonLayer({
            ...this.$attrs,
              ...this.$props,
        })
        console.log({...this.$attrs})

        this.$emit('layerUpdated')
        }
    }
}
</script>