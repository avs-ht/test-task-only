import { useMemo } from "react";
import styles from "./index.module.scss";
import { useAnimatedNumber } from "@hooks/useAnimatedNumber";
import { ANIMATION_TIME } from "../const";
import { HistorySection } from "../types";

interface IEarlyAndLateDatesProps {
  activeSection: HistorySection;
}

export const EarlyAndLateDates = ({
  activeSection,
}: IEarlyAndLateDatesProps) => {
  const sortedEvents = useMemo(() => {
    return [...activeSection.events].sort((a, b) => a.year - b.year);
  }, [activeSection.events]);

  const earlyDate = sortedEvents[0]?.year ?? 0;
  const lateDate = sortedEvents[sortedEvents.length - 1]?.year ?? 0;

  const animatedEarlyDate = useAnimatedNumber(earlyDate, ANIMATION_TIME);
  const animatedLateDate = useAnimatedNumber(lateDate, ANIMATION_TIME);

  return (
    <div className={styles.datesContainer}>
      <p className={styles.earlyDate}>{animatedEarlyDate}</p>
      <p className={styles.lateDate}>{animatedLateDate}</p>
    </div>
  );
};
