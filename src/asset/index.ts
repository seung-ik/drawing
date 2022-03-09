export const COLOR_PICKER_LIST = [
  'black',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#009688',
  '#4caf50',
  '#cddc39',
  '#ffeb3b',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

export const calcDistanceTwoDots = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
