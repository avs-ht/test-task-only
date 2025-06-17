import { useMediaQuery } from "@hooks/useMediaQuery";
import { LeftArrow } from "@icons/LeftArrow";
import styles from "./index.module.scss";

interface ISliderProps {
  activeIndex: number;
  itemsLength: number;
  setActiveIndex: (idx: number) => void;
}

export const Slider = ({
  activeIndex,
  itemsLength,
  setActiveIndex,
}: ISliderProps) => {
  const isDotsDisplayed = useMediaQuery("(max-width: 540px)");

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < itemsLength - 1) setActiveIndex(activeIndex + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrows}>
        <p className={styles.itemsAmount}>
          {(activeIndex + 1).toString().padStart(2, "0")}/
          {itemsLength.toString().padStart(2, "0")}
        </p>
        <div className={styles.buttons}>
          <button
            onClick={handlePrev}
            className={styles.prevButton}
            disabled={activeIndex === 0}
          >
            <LeftArrow />
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={activeIndex === itemsLength - 1}
          >
            <LeftArrow />
          </button>
        </div>
      </div>

      {isDotsDisplayed && (
        <div className={styles.dots}>
          {Array.from({ length: itemsLength }).map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dot} ${
                activeIndex === idx ? styles.activeDot : ""
              }`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
