import { useEffect, useState } from "react";
import { Swiper } from "swiper";
export const useSwiperScrollState = (swiper: Swiper | null) => {
  const [canScrollToBegin, setBegin] = useState(false);
  const [canScrollToEnd, setEnd] = useState(true);

  useEffect(() => {
    if (!swiper) return;

    const update = () => {
      setBegin(!swiper.isBeginning);
      setEnd(!swiper.isEnd);
    };

    swiper.on("slideChange", update);
    update();

    return () => swiper.off("slideChange", update);
  }, [swiper]);

  return { canScrollToBegin, canScrollToEnd };
};
