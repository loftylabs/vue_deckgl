const mapViewMixin = {
    data(){
        return{
            view: {},
            baseViewImplemented: true
        }
    },
    props:{

    },
    mounted(){

    },
    methods: {
        getView(){
            return this.view
        }
    }
}
export default baseViewMixin