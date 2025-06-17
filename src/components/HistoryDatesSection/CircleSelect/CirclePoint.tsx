import { useEffect, useRef, useState } from "react";
import styles from "./CirclePoint.module.scss";

import { HistorySection } from "..";
interface ICirclePointProps {
  index: number;
  sectionId: HistorySection;
  isAnimateEnded: boolean;
  activeIndex: number;
  x: number;
  y: number;
  pointSize: number;
  activePointSize: number;
  clickFn: (index: number) => void;
}
export const CirclePoint = (props: ICirclePointProps) => {
  const [isHovered, setHovered] = useState(false);

  const {
    sectionId,
    index,
    activeIndex,
    x,
    y,
    pointSize,
    activePointSize,
    clickFn,
    isAnimateEnded,
  } = props;

  const isActivePoint = index === activeIndex || isHovered;

  const pointRef = useRef<HTMLDivElement | null>(null);
  const diametr = isActivePoint ? activePointSize : pointSize;

  return (
    <div
      ref={pointRef}
      key={sectionId.circleTitle}
      className={`${styles.point} ${isActivePoint ? styles.pointActive : ""} ${
        isAnimateEnded && index === activeIndex ? styles.activatedPoint : ""
      }`}
      style={{
        left: x,
        top: y,
        width: diametr,
        height: diametr,
      }}
      onClick={() => {
        clickFn(index);
      }}
      data-title={isActivePoint ? sectionId.circleTitle : ""}
    >
      {isActivePoint ? index + 1 : undefined}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.clickArea}
        style={{
          width: activePointSize,
          height: activePointSize,
        }}
      />
    </div>
  );
};
