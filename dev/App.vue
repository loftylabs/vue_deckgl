<template>
    <div class="example">
        <DeckGl 
            ref="deck"
            :settings="deckglSettings"
            :class="['fill-wrapper']"
            :controlMap="true"
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
    import { MAPBOX_SETTINGS, DECKGL_SETTINGS} from '../src/components/utils/defaultSettings'
    import MAPBOX_TOKEN from '../env.js'
    


    export default {
        components: { Mapbox, DeckGl },
        name: 'Example',
        data() {
            return {
                mapboxToken: MAPBOX_TOKEN,
                mapboxSettings: MAPBOX_SETTINGS,
                deckglSettings: DECKGL_SETTINGS,
                layers:[],
            }
        },
        mounted(){
    function colorScale(x) {
  const i = Math.round(x * 7) + 4;
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0];
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
}



            this.layers.push(
                    new GeoJsonLayer({
                    id: 'geojson',
                    data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
                    opacity: 0.8,
                    stroked: false,
                    filled: true,
                    extruded: true,
                    wireframe: true,
                    fp64: true,
                    getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
                    getFillColor: f => colorScale(f.properties.growth),
                    getLineColor: [255, 255, 255],
                    pickable: true,
                    })
            )
            
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