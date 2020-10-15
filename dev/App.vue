<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :settings="deckglSettings"
            :class="['fill-wrapper']"
            :controlMap="false"
            :layers="layers"
        >
                <Mapbox
                :accessToken="mapboxToken"
                :settings="mapboxSettings"
                :class="['fill-wrapper']"
                />
        </DeckGl>
        <div style="position:absolute;">
            <button  @click="testSinglePick">Test Deck Single Pick object</button>
            <button  @click="testMultiPick">Test Deck Multi Pick object</button>
            <button  @click="testObjectsPick">Test Deck Objects Pick object</button>
        </div>
    </div>
</template>

<script>
    import DeckGl from '../src/components/deckgl'
    import Mapbox from '../src/components/mapbox'
    import MAPBOX_TOKEN from '../env.js'

    const MAP_STYLES = {
        'satellite': 'mapbox://styles/mapbox/satellite-v9',
        'dark': 'mapbox://styles/mapbox/dark-v10'
    }

    const INITIAL_VIEW_STATE = {
        latitude: 37.8,
        longitude: -122.45,
        zoom: 12,
        bearing: 0,
        pitch: 0
    }
    const MAPBOX_SETTINGS = {
        accessToken: MAPBOX_TOKEN,
        container: 'map',
        width: '100%',
        style: MAP_STYLES.dark,
        interactive: false,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch
    }
    const DECKGL_SETTINGS = {
        canvas: "deck-canvas",
        width: "100%",
        height: "100%",
        controller: true,
        useDevicePixels: false,
        viewState: INITIAL_VIEW_STATE,
    }

    export default {
        components: { Mapbox, DeckGl },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[]
            }
        },
        methods: {
            testSinglePick(){
                console.log(this.$refs.deck.pickObject(100, 100, 0, null, false))
            },
            testMultiPick(){
                console.log(this.$refs.deck.pickMultipleObjects(100, 100, 0, null, 10, false))
            },
            testObjectsPick(){
                console.log(this.$refs.deck.pickObjects(100, 100, 1, 1, null))
            }
        }
    }
</script>

<style scoped>
    .fill-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>