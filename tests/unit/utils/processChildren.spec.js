import { shallowMount } from "@vue/test-utils";

import processChildren from "../../../src/components/utils/processChildren.js"
import { DECKGL_SETTINGS, MAPBOX_SETTINGS } from "../../../src/components/utils/defaultSettings.js"
import { DeckGL } from "../../../src/components/deckgl";
import { Mapbox } from "../../../src/components/mapbox";

describe("processChildren", () => {
    

    it("should return a map with slotted component", () => {

        const mapboxComponentWithoutProps = {
            name: '',
            render(h) {
                return h('p')
              }
            } 
        mapboxComponentWithoutProps.name = Mapbox.name

        const deckComponent = shallowMount(DeckGL, {
            props:{
                settings: DECKGL_SETTINGS
            },
            slots:{
                default: mapboxComponentWithoutProps
            }
        })
        
        const mapComponent = processChildren(deckComponent.$children)
        expect(mapComponent).toBeDefined()
    });

    it("should not return a map with no slotted components", ()=>{
        const deckComponent = shallowMount(DeckGL,{
            props:{
                settings: DECKGL_SETTINGS
            }
        })
        
        const mapComponent = processChildren(deckComponent.$children)
        expect(mapComponent).toBeNull()
    });
  });