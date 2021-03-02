import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './BettingFundamentals.module.css';
import { ListIcon, MinusEncloseIcon, PlusEncloseIcon } from './SvgIcons';
import { MOCK_BankRoll } from '@constants/index';

type PropsType = {
  showContentAt: boolean[];
  toggleDetailsAt: (index: number) => void;
};

function BankrollManagment({ showContentAt, toggleDetailsAt }: PropsType) {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <ListIcon className={styles.sidebarBlockTitleIcon} />
        <span>Bankroll Management Systems</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        {MOCK_BankRoll.map((data, index) => (
          <React.Fragment key={index}>
            <div className={styles.accordionTitle}>
              {showContentAt[index] && (
                <>
                  <strong>{data.title}</strong>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <MinusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
              {!showContentAt[index] && (
                <>
                  <span>{data.title}</span>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <PlusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
            </div>
            {showContentAt[index] && <div className={styles.accordionContent}>{data.content}</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function BankrollManagmentRender() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <BankrollManagment
      showContentAt={showContent}
      toggleDetailsAt={toggleDetailsAt}></BankrollManagment>
  );
}

export default BankrollManagmentRender;
