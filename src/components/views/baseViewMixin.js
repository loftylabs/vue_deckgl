const baseViewMixin = {
    data(){
        return{
            view: {},
            baseViewImplemented: true
        }
    },
    props:{

    },
    methods: {
        getView(){
            return this.view
        }
    }
}
export default baseViewMixin