<template>
    <div id="map"></div>
</template>


<script>
    import mapboxgl from 'mapbox-gl'
    import 'mapbox-gl/dist/mapbox-gl.css'
    import {MAPBOX_SETTINGS} from '../utils/defaultSettings.js'

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
            map_style: {
                type: String,
                required: false,
                default: MAPBOX_SETTINGS.style
            }
        },
        mounted() {
            mapboxgl.accessToken = this.accessToken
            this.map = new mapboxgl.Map({...MAPBOX_SETTINGS, ...this.$attrs, style: this.map_style })
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

