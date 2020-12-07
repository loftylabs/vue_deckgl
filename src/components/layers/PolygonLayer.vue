<script>
import { PolygonLayer } from "@deck.gl/layers";
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "PolygonLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: PolygonLayer,
    };
  },
  render: () => null,
};
</script>
