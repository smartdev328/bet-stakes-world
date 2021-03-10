import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import moment from 'moment';

import styles from './DailyFantasyLineups.module.css';
import { MinusEncloseIcon, PlusEncloseIcon, WinnerCupIcon } from './SvgIcons';
import SportTile from './SportTile';
import UtilsAPIs from '@apis/utils.apis';
import { SidebarCardInfo } from '@type/Main';

function DailyFantasyLineups() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const [info, setInfo] = useState<SidebarCardInfo | undefined>(undefined);

  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  useEffect(() => {
    UtilsAPIs.getSidebarInfo()
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const fantasySidebar = data.packages.filter((pack: SidebarCardInfo) => pack.package.access === 'MULTIPLE')[0];
          if (fantasySidebar) {
            setInfo(fantasySidebar);
          }
        }
      });
  }, []);

  if (!info) {
    return null;
  }

  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <WinnerCupIcon className={styles.sidebarBlockTitleIcon} />
        <span>{info.package.name}</span>
      </div>
      <p className={styles.date}>{moment(info.show_date).format('dddd, MMMM DD YYYY')}</p>
      <div className={styles.sidebarBlockContent}>
        {info.sports.map((data, index) => (
          <React.Fragment key={index}>
            <div className={styles.accordionTitle}>
              <div>
                <SportTile sport={data.sport.name} />
                <strong>{data.description}</strong>
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
                <Markdown source={data.detail} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DailyFantasyLineups;
