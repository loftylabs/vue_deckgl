<script>
import {BitmapLayer} from '@deck.gl/layers';
import BaseLayerMixin from "./BaseLayerMixin";

export default {
  name: "HexagonLayer",
  mixins: [BaseLayerMixin],
  data() {
    return {
      typeOfLayer: BitmapLayer,
    };
  },
  render: () => null,
};
</script>
