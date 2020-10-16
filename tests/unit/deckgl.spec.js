
import { shallowMount } from "@vue/test-utils";

import { DECKGL_SETTINGS } from "../../src/components/utils/defaultSettings.js"
import { DeckGL } from "../../src/components/deckgl";

let wrapper;

beforeAll(() => {
  wrapper = shallowMount(DeckGL, {
    props:{
      settings: DECKGL_SETTINGS
    }
  });
});

afterAll(()=>{
  wrapper.destroy();
});

describe("DeckGL", () => {
    it("should mount", () => {
      expect(wrapper.isVueInstance).toBeTruthy()
    });
  });