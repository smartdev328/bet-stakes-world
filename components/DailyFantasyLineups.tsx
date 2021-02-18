import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './DailyFantasyLineups.module.css';
import { MinusEncloseIcon, PlusEncloseIcon, WinnerCupIcon } from './SvgIcons';
import { MOCK_DailyFantasyLineups } from '@constants/index';
import SportTile from './SportTile';

function DailyFantasyLineups() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <WinnerCupIcon className={styles.sidebarBlockTitleIcon} />
        <span>Daily Fantasy Lineups</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        {MOCK_DailyFantasyLineups.map((data, index) => (
          <React.Fragment key={index}>
            <div className={styles.accordionTitle}>
              <div>
                <SportTile sport={data.sport} />
                <strong>{data.title}</strong>
              </div>
              {showContent[index] && (
                <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                  <MinusEncloseIcon className={styles.accordionTitleIcon} />
                </Button>
              )}
              {!showContent[index] && (
                <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                  <PlusEncloseIcon className={styles.accordionTitleIcon} />
                </Button>
              )}
            </div>
            {showContent[index] && (
              <div className={styles.accordionContent}>
                <ul>
                  {data.content.map((content) => (
                    <li className={styles.fantasyLineupContent} key={content.label}>
                      <div>
                        <span className={styles.fantasyLineupContentlabel}>{content.label}</span>
                        <ul className={styles.fantasyLineupContentFeatures}>
                          {content.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DailyFantasyLineups;
