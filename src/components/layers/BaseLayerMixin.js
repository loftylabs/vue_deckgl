const BaseLayerMixin = {
    data(){
        return{
            layer: {},
            baseLayerImplemented: true
        }
    },
    // props:{
    //     layerData: {
    //         type:[Object, String],
    //         required: true
    //     },
    // },
    methods: {
        getLayer(){
            return this.layer
        }
    }
}

export default BaseLayerMixin