/* eslint-disable react/display-name */

import styles from './DSProtection.module.css';

const DSProtection = () => {
  return (
    <>
      <div className={styles.protection_image_div}>
        <img src="/images/ds-protectionn.png" className={styles.protection_image} />
      </div>

      <div className={styles.protection_details_div}>
        <p className={styles.protection_heading}>Only applicable to vip daily card</p>
        <p className={styles.protection_details}>
          If over 50% of the Daily VIP All Access Card are losses for a given day, the next day’s
          picks are automatically free. No questions asked.
        </p>
      </div>
    </>
  );
};

export default DSProtection;
