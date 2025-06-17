import { useMemo } from "react";

export const usePointPositions = (
  rotation: number,
  basePositions: { x: number; y: number }[]
) => {
  return useMemo(() => {
    const rotationRad = (rotation * Math.PI) / 180;
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);

    return basePositions.map((point) => ({
      x: point.x * cos - point.y * sin,
      y: point.x * sin + point.y * cos,
    }));
  }, [rotation, basePositions]);
};
