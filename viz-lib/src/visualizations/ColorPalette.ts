import { values } from "lodash";

// The following colors will be used if you pick "Automatic" color
export const BaseColors = {
  "Elephant": "#124652",
  "Flamingo": "#F15A2C",
  "Blizzard Blue": "#A1DDF3",
  "Cream Can": "#F4CB66",
  "Bismark": "#4E7780",
  "Rose Bud": "#F8A692",
  "White Ice": "#D4F6F7",
  "Sycamore": "#839537",
  "Sea Nymph": "#7CA99F",
  Chantilly: "#FAD1DD",
  "Yellow Green": "#C8DF8C",
  "Sun": "#FDB913",
  "Shadow Green": "#9FCEBF",
  "Iron": "#D8D9DA",
  Lima: "#94BC19",
  "Axolotl": "#4A6447",
  "Tundora": "#494949",
  "Light Blue": "#799CFF",
  "Dark Blue": "#002FB4",
};

// Additional colors for the user to choose from
export const AdditionalColors = {
  Salomie: "#FFE082",
  Shark: "#313132",
  "Green 3": "#049235",
  "Dark Turquoise": "#00B6EB",
  "Dark Violet": "#A58AFF",
  "Pink 2": "#C63FA9",
};

export const ColorPaletteArray = values(BaseColors);

const ColorPalette = {
  ...BaseColors,
  ...AdditionalColors,
};

export default ColorPalette;
