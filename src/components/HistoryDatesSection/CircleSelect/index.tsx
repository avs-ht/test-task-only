import { useState, useRef, useEffect, CSSProperties } from "react";
import gsap from "gsap";
import styles from "./index.module.scss";
import { CirclePoint } from "./CirclePoint";
import { useBasePointPositions } from "./hooks/useBasePointPositions";
import { usePointPositions } from "./hooks/usePointPositions";
import {
  normalizeAngle,
  getRotationForIndex,
  calculateDiffRotation,
} from "./utils/angle";
import { ANIMATION_TIME } from "../const";

interface ICircleSelectProps {
  sections: any[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  radius?: number;
  pointSize?: number;
  activePointSize?: number;
}

export const CircleSelect = ({
  sections,
  radius = 265,
  pointSize = 6,
  activePointSize = 56,
  activeIndex,
  setActiveIndex,
}: ICircleSelectProps) => {
  const [isAnimateEnded, setAnimateEnded] = useState(true);
  const FIXED_ANGLE = 30;
  const basePositions = useBasePointPositions(sections.length);
  const [rotation, setRotation] = useState(() =>
    getRotationForIndex(activeIndex, sections.length, FIXED_ANGLE)
  );

  const animationRef = useRef<gsap.core.Tween | null>(null);
  const prevActiveIndexRef = useRef(activeIndex);

  const animateToIndex = (index: number) => {
    setAnimateEnded(false);
    const targetRotation = getRotationForIndex(
      index,
      sections.length,
      FIXED_ANGLE
    );
    const adjustedTarget = calculateDiffRotation(rotation, targetRotation);

    if (animationRef.current) animationRef.current.kill();

    const animObj = { rotation };
    animationRef.current = gsap.to(animObj, {
      rotation: adjustedTarget,
      duration: ANIMATION_TIME,
      ease: "power2.out",
      onUpdate: () => setRotation(normalizeAngle(animObj.rotation)),
      onComplete: () => {
        setRotation(targetRotation);
        setAnimateEnded(true);
      },
    });
  };

  const handlePointClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    animateToIndex(index);
  };

  useEffect(() => {
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (prevActiveIndexRef.current !== activeIndex) {
      animateToIndex(activeIndex);
      prevActiveIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  const positions = usePointPositions(rotation, basePositions);
  const borderWidth = 2;
  const containerSize = radius * 2 + borderWidth * 2;
  const center = containerSize / 2;
  const adjustedRadius = radius - borderWidth / 2;

  return (
    <div
      className={styles.wrapper}
      style={{ "--sizeGrowth": activePointSize / pointSize } as CSSProperties}
    >
      <div
        className={styles.container}
        style={{ width: containerSize, height: containerSize }}
      >
        <div
          className={styles.circle}
          style={{
            width: radius * 2,
            height: radius * 2,
            left: borderWidth,
            top: borderWidth,
          }}
        />

        {sections.map((section, index) => {
          const pos = positions[index];
          const x = center + pos.x * adjustedRadius;
          const y = center + pos.y * adjustedRadius;

          return (
            <CirclePoint
              key={section.circleTitle || index}
              pointSize={pointSize}
              activePointSize={activePointSize}
              x={x}
              y={y}
              sectionId={section}
              clickFn={handlePointClick}
              index={index}
              activeIndex={activeIndex}
              isAnimateEnded={isAnimateEnded}
            />
          );
        })}
      </div>
    </div>
  );
};
