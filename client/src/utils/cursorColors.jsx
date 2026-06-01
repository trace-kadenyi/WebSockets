const CURSOR_COLORS = [
  "#5B6AF0", // indigo
  "#E F4444", // rose
  "#10B981", // emerald
  "#F59E0B", // amber
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
];

export const getColor = (uuid) => {
  const index = parseInt(uuid.slice(0, 8), 16) % CURSOR_COLORS.length;
  return CURSOR_COLORS[index];
};
