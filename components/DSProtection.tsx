/* eslint-disable react/display-name */

import styles from './DSProtection.module.css';

const DSProtection = () => {
  return (
    <>
      <div className={styles.protection_image_div}>
        <img src="/images/ds-protectionn.png" className={styles.protection_image} />
      </div>

      <div>
        <p className={styles.protection_heading}>Only applicable to vip daily cards</p>
        <p className={styles.protection_details}>
          IF over 50% of the plays on theCard are losses for a given day, the next day’s picks is
          automatically FREE.
        </p>
      </div>
    </>
  );
};

export default DSProtection;
