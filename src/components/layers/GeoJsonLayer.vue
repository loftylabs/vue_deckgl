<script>
import { GeoJsonLayer } from "@deck.gl/layers";
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "GeoJsonLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: GeoJsonLayer,
    };
  },
  render: () => null,
};
</script>
