import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import { HistoryEvent } from "..";
import "swiper/css";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LeftArrow } from "../../../icons/LeftArrow";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { ANIMATION_TIME } from "../const";
interface IEventsProps {
  events: HistoryEvent[];
}
export const Events = ({ events }: IEventsProps) => {
  const [isCanScrollToEnd, setCanScrollToEnd] = useState(true);
  const [isCanScrollToBegin, setCanScrollToBegin] = useState(false);
  const [displayedEvents, setDisplayedEvents] =
    useState<HistoryEvent[]>(events);
  const [isSlidesHidden, setSlidesHidden] = useState(false);

  const slidesRef = useRef<HTMLCollectionOf<Element> | null>(null);
  const is2Slides = useMediaQuery("(max-width:1080px)");
  const isButtonsDisplayed = !useMediaQuery("(max-width: 540px)");
  const swiperRef = useRef<SwiperCore | null>(null);

  const onSwiperInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
    setCanScrollToBegin(!swiper.isBeginning);
    setCanScrollToEnd(!swiper.isEnd);

    swiper.on("slideChange", () => {
      setCanScrollToBegin(!swiper.isBeginning);
      setCanScrollToEnd(!swiper.isEnd);
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (swiperRef.current && containerRef.current) {
      slidesRef.current = containerRef.current.getElementsByClassName(
        styles.slide
      );
      gsap.set(slidesRef.current, { opacity: 0 });
    }
  }, []);
  useEffect(() => {
    if (!slidesRef.current) return;
    setSlidesHidden(true);

    gsap.to(slidesRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: "power1.out",
    });

    const timeout = setTimeout(() => {
      setDisplayedEvents(events);
    }, (ANIMATION_TIME - 0.5) * 1000);

    return () => clearTimeout(timeout);
  }, [events]);
  useEffect(() => {
    if (!slidesRef.current) return;

    gsap.fromTo(
      slidesRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setSlidesHidden(false);
        },
      }
    );
  }, [displayedEvents]);
  return (
    <div className={styles.container} ref={containerRef}>
      {isCanScrollToBegin && isButtonsDisplayed && !isSlidesHidden && (
        <button
          className={styles.prevButton}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <LeftArrow />
        </button>
      )}
      <Swiper
        onSwiper={onSwiperInit}
        spaceBetween={is2Slides ? 10 : 80}
        slidesPerView={is2Slides ? 2 : 3}
        className={styles.swiper}
      >
        {displayedEvents.map(({ description, year }) => {
          return (
            <SwiperSlide className={styles.slide}>
              <h3 className={styles.year}>{year}</h3>
              <p className={styles.description}>{description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {isCanScrollToEnd && isButtonsDisplayed && !isSlidesHidden && (
        <button
          className={styles.nextButton}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <LeftArrow />
        </button>
      )}
    </div>
  );
};
