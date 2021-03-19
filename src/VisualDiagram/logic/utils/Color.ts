const defaultColors: string[] = [
  '#ff7875',
  '#ff4d4f',
  '#ff9c6e',
  '#ff7a45',
  '#ffc069',
  '#ffa940',
  '#ffd666',
  '#ffc53d',
  '#fff566',
  '#ffec3d',
  '#d3f261',
  '#bae637',
  '#95de64',
  '#73d13d',
  '#5cdbd3',
  '#36cfc9',
  '#69c0ff',
  '#40a9ff',
  '#85a5ff',
  '#597ef7',
  '#b37feb',
  '#9254de',
  '#ff85c0',
  '#f759ab',
];

export interface Color {
  value: string;
  name?: string;
}

export interface ColorGroup {
  [key: string]: string;
}

const RandomIndex = (range: number) => Math.round(Math.random() * range);

export const familyColorGroup: ColorGroup = {};

export const relationColorGroup: ColorGroup = {};

export const selectFamilyColor = (): string => {
  let colors = defaultColors.reduce((result: string[], next: string) => {
    if (!familyColorGroup[next]) {
      return [...result, next];
    }
    return result;
  }, []);
  // TODO:
  if (!colors.length) {
    colors = defaultColors;
  }
  const color = colors[RandomIndex(colors.length - 1)];
  familyColorGroup[color] = color;
  return color;
};

export const selectRelationColor = (): string => {
  let colors = defaultColors.reduce((result: string[], next: string) => {
    if (!relationColorGroup[next]) {
      return [...result, next];
    }
    return result;
  }, []);
  if (!colors.length) {
    colors = defaultColors;
  }
  const color = colors[RandomIndex(colors.length - 1)];
  relationColorGroup[color] = color;
  return color;
};

export const selectRandomColor = (colorExist: string[] = []): string => {
  if (!colorExist.length) return defaultColors[RandomIndex(11)];

  const colors = [...defaultColors];
  const resetColor = colors.reduce((result: string[], next: string) => {
    if (!colorExist.includes(next)) {
      return [...result, next];
    }
    return result;
  }, []);
  return resetColor[RandomIndex(resetColor.length - 1)];
};
