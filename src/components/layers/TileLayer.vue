<script>
// import {TileLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "TileLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: TileLayer,
    };
  },
  render: () => null,
};
</script>
