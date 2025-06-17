import { useEffect, useState } from "react";
import { useClampValue } from "../../hooks/useClampValue";
import { CircleSelect } from "./CircleSelect";
import { EarlyAndLateDates } from "./EarlyAndLateDates";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Slider } from "./Slider";
import { Events } from "./Events";
import styles from "./index.module.scss";

export interface HistoryEvent {
  year: number;
  description: string;
}
export interface HistorySection {
  circleTitle: string;
  events: HistoryEvent[];
}

interface IHistoryDatesSectionProps {
  sections: HistorySection[];
}

export const HistoryDatesSection = ({
  sections,
}: IHistoryDatesSectionProps) => {
  if (sections.length < 2) {
    throw new Error(
      `HistoryDatesSection requires 2+ sections. Now sections' length is ${sections.length}`
    );
  }

  const radius = useClampValue(150, 520, 265, 1920);
  const { width: windowWidth } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(sections.length - 1);
  const activeSection = sections[activeIndex];

  useEffect(() => {}, [activeIndex]);
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Исторические
        <br />
        даты
      </h2>
      {windowWidth > 420 && (
        <div className={styles.selectContainer}>
          <CircleSelect
            sections={sections}
            radius={radius}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      )}
      <EarlyAndLateDates activeSection={activeSection} />
      <div className={styles.downPart}>
        <Slider
          activeIndex={activeIndex}
          itemsLength={sections.length}
          setActiveIndex={setActiveIndex}
        />
        <Events events={activeSection.events} />
      </div>
    </section>
  );
};
