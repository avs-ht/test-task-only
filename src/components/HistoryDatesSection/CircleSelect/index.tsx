import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  CSSProperties,
} from "react";
import gsap from "gsap";
import styles from "./index.module.scss";
import { CirclePoint } from "./CirclePoint";
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
  const normalizeAngle = (angle: number): number => ((angle % 360) + 360) % 360;

  const FIXED_ANGLE = 30;

  const basePointPositions = useMemo(() => {
    const angleStep = 360 / sections.length;
    return sections.map((_, i) => {
      const angle = (i * angleStep - 90) % 360;
      const rad = (angle * Math.PI) / 180;
      return { x: Math.cos(rad), y: Math.sin(rad) };
    });
  }, [sections.length]);

  const getRotationForIndex = (index: number) => {
    const anglePerSection = 360 / sections.length;
    const targetAngle = index * anglePerSection;
    return normalizeAngle(FIXED_ANGLE - targetAngle);
  };
  const [rotation, setRotation] = useState(() =>
    getRotationForIndex(activeIndex)
  );

  const animationRef = useRef<gsap.core.Tween | null>(null);
  const animateToIndex = (index: number) => {
    setAnimateEnded(false);
    const anglePerSection = 360 / sections.length;
    const targetAngle = index * anglePerSection;
    const targetRotation = normalizeAngle(FIXED_ANGLE - targetAngle);

    let currentRot = rotation;
    let diff = targetRotation - currentRot;
    if (diff > 180) diff -= 360;
    else if (diff < -180) diff += 360;

    const adjustedTarget = currentRot + diff;

    if (animationRef.current) animationRef.current.kill();

    const animationObj = { rotation: currentRot };
    animationRef.current = gsap.to(animationObj, {
      rotation: adjustedTarget,
      duration: ANIMATION_TIME,
      ease: "power2.out",
      onUpdate: () => setRotation(normalizeAngle(animationObj.rotation)),
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
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  const pointPositions = useMemo(() => {
    const rotationRad = (rotation * Math.PI) / 180;
    const cosRotation = Math.cos(rotationRad);
    const sinRotation = Math.sin(rotationRad);
    return basePointPositions.map((point) => ({
      x: point.x * cosRotation - point.y * sinRotation,
      y: point.x * sinRotation + point.y * cosRotation,
    }));
  }, [basePointPositions, rotation]);

  const borderWidth = 2;
  const containerSize = radius * 2 + borderWidth * 2;
  const center = containerSize / 2;
  const adjustedRadius = radius - borderWidth / 2;

  const prevActiveIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (prevActiveIndexRef.current !== activeIndex) {
      animateToIndex(activeIndex);
      prevActiveIndexRef.current = activeIndex;
    }
  }, [activeIndex, rotation, sections.length]);
  return (
    <div
      className={styles.wrapper}
      style={
        {
          "--sizeGrowth": activePointSize / pointSize,
        } as CSSProperties
      }
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
          const pos = pointPositions[index];
          const x = center + pos.x * adjustedRadius;
          const y = center + pos.y * adjustedRadius;

          return (
            <CirclePoint
              key={section.circleTitle}
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
