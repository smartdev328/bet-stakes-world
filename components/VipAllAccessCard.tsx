import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './VipAllAccessCard.module.css';
import { MinusEncloseIcon, PlusEncloseIcon, WinnerCupIcon } from './SvgIcons';
import { MOCK_VipAllAccessCard } from '@constants/index';
import SportTile from './SportTile';

function VipAllAccessCard() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <WinnerCupIcon className={styles.sidebarBlockTitleIcon} />
        <span>VIP ALL ACCESS CARD</span>
      </div>
      <p className={styles.date}>Thursday, February 25 2021</p>
      <div className={styles.sidebarBlockContent}>
        {MOCK_VipAllAccessCard.map((data, index) => (
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
                        <span className={styles.label}>{content.label}</span>
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

export default VipAllAccessCard;
