import { useEffect, useState } from "react";

export const useClampValue = (
  minSize: number,
  minScreen: number,
  maxSize: number,
  maxScreen: number
) => {
  const [value, setValue] = useState(minSize);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;

      if (width <= minScreen) {
        setValue(minSize);
      } else if (width >= maxScreen) {
        setValue(maxSize);
      } else {
        const ratio = (width - minScreen) / (maxScreen - minScreen);
        const interpolated = minSize + ratio * (maxSize - minSize);
        setValue(interpolated);
      }
    }

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [minSize, maxSize, minScreen, maxScreen]);

  return value;
};
