import { useMemo } from "react";

export const useBasePointPositions = (
  count: number
): { x: number; y: number }[] => {
  return useMemo(() => {
    const angleStep = 360 / count;
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * angleStep - 90) % 360;
      const rad = (angle * Math.PI) / 180;
      return { x: Math.cos(rad), y: Math.sin(rad) };
    });
  }, [count]);
};
