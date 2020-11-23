<template>
    <div :id="this.$attrs.container"></div>
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

            window.addEventListener('resize', this.onWindowResizeHandler)
        },
        methods: {
            jumpTo(center, zoom, bearing, pitch){
                this.map.jumpTo({center, zoom, bearing, pitch})
            },
            resize(){
                this.map.resize()
            },
            onWindowResizeHandler(){
                setTimeout(() => this.map.resize(), 300);
            },
        }
    }
</script>

<style scoped>

</style>

