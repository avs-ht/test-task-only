import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import gsap from "gsap";
import styles from "./index.module.scss";

import { LeftArrow } from "@icons/LeftArrow";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useSwiperScrollState } from "./hooks/useSwiperScrollState";
import { fadeInSlides, fadeOutSlides } from "./animations";
import { ANIMATION_TIME } from "../const";
import { HistoryEvent } from "../types";

interface IEventsProps {
  events: HistoryEvent[];
  sectionTitle: string;
}

export const Events = ({ events, sectionTitle }: IEventsProps) => {
  const [displayedEvents, setDisplayedEvents] =
    useState<HistoryEvent[]>(events);
  const [displayedTitle, setDisplayedTitle] = useState(sectionTitle);
  const [isSlidesHidden, setSlidesHidden] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const swiperRef = useRef<SwiperCore | null>(null);

  const is2Slides = useMediaQuery("(max-width:1080px)");
  const isButtonsDisplayed = !useMediaQuery("(max-width: 540px)");
  const isCircleSelectHidden = useMediaQuery("(max-width: 420px)");
  const { canScrollToBegin, canScrollToEnd } = useSwiperScrollState(
    swiperRef.current
  );

  useLayoutEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    setSlidesHidden(true);
    fadeOutSlides(containerRef.current);

    const timeout = setTimeout(() => {
      setDisplayedEvents(events);
      setDisplayedTitle(sectionTitle);
      setSlidesHidden(false);
      swiperRef.current?.slideTo(0, 0);
    }, (ANIMATION_TIME - 0.5) * 1000);

    return () => clearTimeout(timeout);
  }, [events]);

  useEffect(() => {
    fadeInSlides(containerRef.current);
  }, [displayedEvents]);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div ref={containerRef}>
      {isCircleSelectHidden && (
        <h2 className={styles.sectionTitle}>{displayedTitle}</h2>
      )}
      <div className={styles.container}>
        {canScrollToBegin && isButtonsDisplayed && !isSlidesHidden && (
          <button className={styles.prevButton} onClick={handlePrev}>
            <LeftArrow />
          </button>
        )}

        <Swiper
          className={styles.swiper}
          spaceBetween={is2Slides ? 10 : 80}
          slidesPerView={is2Slides ? 2 : 3}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {displayedEvents.map(({ description, year }) => (
            <SwiperSlide key={`${description}${year}`} className={styles.slide}>
              <h3 className={styles.year}>{year}</h3>
              <p className={styles.description}>{description}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        {canScrollToEnd && isButtonsDisplayed && !isSlidesHidden && (
          <button className={styles.nextButton} onClick={handleNext}>
            <LeftArrow />
          </button>
        )}
      </div>
    </div>
  );
};
