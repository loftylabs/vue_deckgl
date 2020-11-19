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
    render: () => null
}
</script>