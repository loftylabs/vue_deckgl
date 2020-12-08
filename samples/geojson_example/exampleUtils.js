
import { AmbientLight, _SunLight as SunLight} from '@deck.gl/core';

const COLOR_SCALE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],

  // positive
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [189, 0, 38],
  [128, 0, 38]
];

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true
});

const landCover = [[[-123.0, 49.196], [-123.0, 49.324], [-123.306, 49.324], [-123.306, 49.196]]];


function colorScale(x) {
    const i = Math.round(x * 7) + 4;
    if (x < 0) {
      return COLOR_SCALE[i] || COLOR_SCALE[0];
    }
    return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
  }


function getTooltip({object}) {
    return object && `Average Property Value
  ${object.properties.valuePerSqm}
  Growth
  ${Math.round(object.properties.growth * 100)}`;
  }
  


export {landCover, dirLight, ambientLight, colorScale, getTooltip}