
import { shallowMount } from "@vue/test-utils";

import { MAPBOX_SETTINGS } from "../../src/components/utils/defaultSettings.js"
import { Mapbox } from "../../src/components/mapbox";

let wrapper;

beforeAll(() => {
  wrapper = shallowMount(Mapbox, {
    props:{
      settings: MAPBOX_SETTINGS,
      accessToken: ''
    }
  });
});

afterAll(()=>{
  wrapper.destroy();
});

describe("Mapbox", () => {
    it("should mount", () => {
      expect(wrapper.isVueInstance).toBeTruthy()
    });
  });