import { isEqual, omit, functions } from "lodash";

const BaseLayerMixin = {
  data() {
    return {
      typeOfLayer: {},
      layer: {},
      baseLayerImplemented: true,
    };
  },
  created() {
    this.layer = new this.typeOfLayer({
      ...this.$attrs,
      ...this.$props,
    });
  },
  watch: {
    $attrs: {
      handler(newVal, oldVal) {
        if (
          isEqual(
            omit(newVal, functions(newVal)),
            omit(oldVal, functions(oldVal))
          )
        ) {
          return;
        }
        this.createLayer();
      },
      deep: true,
    },
  },
  methods: {
    getLayer() {
      return this.layer;
    },
    createLayer() {
      this.layer = new this.typeOfLayer({
        ...this.$attrs,
        ...this.$props,
      });

      this.$emit("layerUpdated");
    },
  },
};

export default BaseLayerMixin;
