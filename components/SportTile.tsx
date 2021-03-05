/* eslint-disable react/display-name */

import styles from './SportTile.module.css';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';

type SportTilePropsType = {
  sport: string;
};

const SPORTS_INFO = [
  {
    name: 'NBA',
    id: 'NBA',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'NFL',
    id: 'NFL',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'MLB',
    id: 'MLB',
    background: '#1878FB',
    logo: () => <MLB_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAF',
    id: 'NCAAF',
    background: '#91442A',
    logo: () => <NFL_SVG className={styles.sports_logo} />
  },
  {
    name: 'NCAAB',
    id: 'NCAAB',
    background: '#EC4C15',
    logo: () => <NBA_SVG className={styles.sports_logo} />
  },
  {
    name: 'UFC',
    id: 'UFC',
    background: '#F9282B',
    logo: () => <UFC_SVG className={styles.sports_logo} />
  },
  {
    name: 'FORMULA 1',
    id: 'F1',
    background: '#505054',
    logo: () => <F1_SVG className={styles.sports_logo} />
  },
  {
    name: 'SOCCER',
    id: 'SOCCER',
    background: '#6DCF40',
    logo: () => <SOCCER_SVG className={styles.sports_logo} />
  }
];

const SportTile = ({ sport }: SportTilePropsType) => {
  const selectedSport = SPORTS_INFO.filter(
    (sp) => sp.name.toLowerCase() === sport.toLowerCase()
  )[0];
  return (
    <div
      className={`${styles.sportTileBtn} ${styles['sportTile_' + selectedSport.id]}`}
      style={{ background: selectedSport.background }}>
      {selectedSport.logo()}
      <span>{selectedSport.name.toLowerCase() === 'formula 1' ? 'F1' : selectedSport.name}</span>
    </div>
  );
};

export default SportTile;
