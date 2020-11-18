const mapViewMixin = {
    data(){
        return{
            view: {},
            implementsBaseView: true
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
export default mapViewMixin