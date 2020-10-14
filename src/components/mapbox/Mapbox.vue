<template>
    <div id="map"></div>
</template>


<script>
    import mapboxgl from 'mapbox-gl'
    import 'mapbox-gl/dist/mapbox-gl.css'

    export default {
        name:'Mapbox',
        data(){
            return {
                map: {},
            }
        },
        props: {
            accessToken: {
                type: String,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        mounted() {
            mapboxgl.accessToken = this.accessToken
            this.map = new mapboxgl.Map(this.settings)
        },
        methods: {
            jumpTo(center, zoom, bearing, pitch){
                this.map.jumpTo({center, zoom, bearing, pitch})
            }
        }
    }
</script>

<style scoped>

</style>

