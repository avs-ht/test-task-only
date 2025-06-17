import { useState } from "react";
import { useClampValue } from "@hooks/useClampValue";
import { CircleSelect } from "./CircleSelect";
import { EarlyAndLateDates } from "./EarlyAndLateDates";
import { useWindowSize } from "@hooks/useWindowSize";
import { Slider } from "./Slider";
import { Events } from "./Events";
import styles from "./index.module.scss";
import { HistorySection } from "./types";

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

  const { width: windowWidth } = useWindowSize();
  const radius = useClampValue(150, 520, 265, 1920);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex] ?? sections[0];
  const isCircleSelectVisible = windowWidth > 420;

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Исторические
        <br />
        даты
      </h2>

      {isCircleSelectVisible && (
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
        <Events
          events={activeSection.events}
          sectionTitle={activeSection.circleTitle}
        />
      </div>
    </section>
  );
};
export { HistorySection };
