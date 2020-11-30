const BaseLayerMixin = {
    data(){
        return{
            layer: {},
            baseLayerImplemented: true
        }
    },
    props:{
        layerData: {
            type: [String, Array, Object, Boolean],
            required: true
        },
    },
    methods: {
        getLayer(){
            return this.layer
        }
    }
}

export default BaseLayerMixin