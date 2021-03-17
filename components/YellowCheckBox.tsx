import { SVGIconPropType } from '@type/Main';
import styles from './YellowCheckBox.module.css';

const CheckedStatusIcon = ({ className, onClick }: SVGIconPropType) => (
  <svg
    width="19"
    height="19"
    className={className}
    onClick={onClick}
    viewBox="0 0 19 19"
    fill="red"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="16" height="16" fill="#1a1a1a" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.96069 0.69751H16.9607C18.0707 0.69751 18.9607 1.59751 18.9607 2.69751V16.6975C18.9607 17.7975 18.0707 18.6975 16.9607 18.6975H2.96069C1.85069 18.6975 0.960693 17.7975 0.960693 16.6975V2.69751C0.960693 1.59751 1.85069 0.69751 2.96069 0.69751ZM2.96069 9.69751L7.96069 14.6975L16.9607 5.69751L15.5507 4.27751L7.96069 11.8675L4.37069 8.28751L2.96069 9.69751Z"
      fill="#FFC700"
    />
  </svg>
);

type PropsType = {
  checked: boolean;
  label: string;
  isSmall?: boolean;
  onChangeStatus: () => void;
};

function YellowCheckBox({ label, checked, isSmall, onChangeStatus }: PropsType) {
  return (
    <div className={`${styles.checkbox} ${isSmall && styles.small}`}>
      {checked && (
        <CheckedStatusIcon className={styles.checkedStatusIcon} onClick={onChangeStatus} />
      )}
      {!checked && <div className={styles.uncheckedStatusIcon} onClick={onChangeStatus} />}
      <span onClick={onChangeStatus}>{label}</span>
    </div>
  );
}

export default YellowCheckBox;
