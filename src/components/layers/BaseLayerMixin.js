const BaseLayerMixin = {
    data(){
        return{
            layer: {},
            baseLayerAttached: true
        }
    },
    props:{
        layerData: {
            type: String,
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