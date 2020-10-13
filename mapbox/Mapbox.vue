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
            this.$emit('created', this.map)
        }
    }
</script>

<style scoped>

</style>

