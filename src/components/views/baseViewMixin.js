const baseViewMixin = {
    data(){
        return{
            view: {},
            baseViewImplemented: true
        }
    },
    methods: {
        getView(){
            return this.view
        }
    }
}
export default baseViewMixin