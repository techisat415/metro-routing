export const LINE_COLORS = {
  RED: "#E32D2D",
  YELLOW: "#F5C518",
  BLUE: "#4A90D9",
  GREEN: "#2ECC71",
  VIOLET: "#A97ECC",
  PINK: "#E91E8C",
  MAGENTA: "#e036e0",
};

export function getLineColor(lineName) {
  if (!lineName) return "#888";

  const upper = lineName.toUpperCase();

  for (const [key, color] of Object.entries(LINE_COLORS)) {
    if (upper.includes(key)) return color;
  }

  return "#888";
}