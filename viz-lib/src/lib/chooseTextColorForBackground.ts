import { maxBy } from "lodash";
import chroma from "chroma-js";

export default function chooseTextColorForBackground(backgroundColor: any, textColors = ["#ffffff", "#333333"]) {
  const whiteFont = ["#124652", "#F15A2C", "#4E7780", "#839537", "#7CA99F", "#94BC19", "#4A6447"];
  const blackFont = ["#A1DDF3", "#F4CB66", "#F8A692", "#D4F6F7", "#FAD1DD", "#C8DF8C", "#FDB913", "#9FCEBF", "#D8D9DA"];
  let custombackgroundColor = "";

  if (whiteFont.includes(backgroundColor)) {
    custombackgroundColor = "#124652"
  } else {
    custombackgroundColor = "#A1DDF3"
  }

  try {
    backgroundColor = chroma(custombackgroundColor);
    return maxBy(textColors, color => chroma.contrast(backgroundColor, color));
  } catch (e) {
    return null;
  }
}
