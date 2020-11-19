<script>
import baseViewMixin from './baseViewMixin.js'
import {MapView} from '@deck.gl/core';
import {MapController} from '@deck.gl/core';

export default {
    name: 'MapView',
    mixins:[baseViewMixin],
    created(){
        this.view = new MapView({
            ...this.$attrs,
            controller: MapController
        });


},
render: () => null
}
</script>
