export const normalizeAngle = (angle: number): number =>
  ((angle % 360) + 360) % 360;

export const getRotationForIndex = (
  index: number,
  sectionCount: number,
  fixedAngle: number
): number => {
  const anglePerSection = 360 / sectionCount;
  const targetAngle = index * anglePerSection;
  return normalizeAngle(fixedAngle - targetAngle);
};

export const calculateDiffRotation = (
  current: number,
  target: number
): number => {
  let diff = target - current;
  if (diff > 180) diff -= 360;
  else if (diff < -180) diff += 360;
  return current + diff;
};
