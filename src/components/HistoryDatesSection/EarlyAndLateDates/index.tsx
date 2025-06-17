import { HistorySection } from "..";
import styles from "./index.module.scss";
import { useAnimatedNumber } from "../../../hooks/useAnimatedNumber";
import { ANIMATION_TIME } from "../const";
interface IEarlyAndLateDatesProps {
  activeSection: HistorySection;
}
export const EarlyAndLateDates = ({
  activeSection,
}: IEarlyAndLateDatesProps) => {
  const sortedEvents = activeSection.events.sort((a, b) => a.year - b.year);
  const earlyDate = sortedEvents[0].year;
  const lateDate = sortedEvents[sortedEvents.length - 1].year;
  const animatedEarlyDate = useAnimatedNumber(earlyDate, ANIMATION_TIME);
  const animtedLateDate = useAnimatedNumber(lateDate, ANIMATION_TIME);

  return (
    <div className={styles.datesContainer}>
      <p className={styles.earlyDate}>{animatedEarlyDate}</p>
      <p className={styles.lateDate}>{animtedLateDate}</p>
    </div>
  );
};
