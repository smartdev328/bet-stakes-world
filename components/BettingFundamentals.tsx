import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './BettingFundamentals.module.css';
import { ListIcon, MinusEncloseIcon, PlusEncloseIcon } from './SvgIcons';
import { MOCK_BetFundaments, MOCK_FantasyFundaments } from '@constants/index';

type PropsType = {
  showContentAt: boolean[];
  isFantasy?: boolean;
  toggleDetailsAt: (index: number) => void;
};

function BettingFundamentals({ isFantasy, showContentAt, toggleDetailsAt }: PropsType) {
  const Fundaments = isFantasy ? MOCK_FantasyFundaments : MOCK_BetFundaments;
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <ListIcon className={styles.sidebarBlockTitleIcon} />
        {!isFantasy && <span>Sports Betting Fundamentals</span>}
        {isFantasy && <span>Daily Fantasy Fundamentals</span>}
      </div>
      <div className={styles.sidebarBlockContent}>
        {Fundaments.map((data, index) => (
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

function BettingFundamentalRender({ isFantasy }: { isFantasy?: boolean }) {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <BettingFundamentals
      showContentAt={showContent}
      isFantasy={isFantasy}
      toggleDetailsAt={toggleDetailsAt}></BettingFundamentals>
  );
}

export default BettingFundamentalRender;
