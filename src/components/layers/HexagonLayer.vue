<script>
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "HexagonLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: HexagonLayer,
    };
  },
  render: () => null,
};
</script>
