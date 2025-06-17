import styles from "./index.module.scss";

interface IWrapperProps {
  children: React.ReactNode;
}
export const Wrapper = ({ children }: IWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};
