import { useRef, useState } from "react";
import styles from "./CirclePoint.module.scss";
import { HistorySection } from "../types";

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

export const CirclePoint = ({
  index,
  sectionId,
  isAnimateEnded,
  activeIndex,
  x,
  y,
  pointSize,
  activePointSize,
  clickFn,
}: ICirclePointProps) => {
  const [isHovered, setHovered] = useState(false);
  const pointRef = useRef<HTMLDivElement | null>(null);

  const isActive = index === activeIndex || isHovered;
  const isActivated = isAnimateEnded && index === activeIndex;
  const diameter = isActive ? activePointSize : pointSize;
  const title = isActive ? sectionId.circleTitle : "";

  const handleClick = () => clickFn(index);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const classNames = [
    styles.point,
    isActive && styles.pointActive,
    isActivated && styles.activatedPoint,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={pointRef}
      className={classNames}
      style={{ left: x, top: y, width: diameter, height: diameter }}
      onClick={handleClick}
      data-title={title}
    >
      {isActive ? index + 1 : null}
      <div
        className={styles.clickArea}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: activePointSize,
          height: activePointSize,
        }}
      />
    </div>
  );
};
