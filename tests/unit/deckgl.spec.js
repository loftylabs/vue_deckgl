
import { shallowMount } from "@vue/test-utils";
import DeckGL from "../../src/components/deckgl";

describe("DeckGL", () => {
    it("should mount", () => {
      const DeckGL = shallowMount(DeckGL);
      console.log(DeckGL)
    });
  });