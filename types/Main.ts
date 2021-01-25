import { Package } from './Packages';
import { Sport } from './Sports';

export type SVGIconPropType = {
  className: string;
  onClick?: () => void;
};

export type ClickableArrowIconProps = {
  className: string;
  onClick: () => void;
};

export type SportInfoType = {
  name: string;
  id: string;
  background: string;
  logo: () => JSX.Element;
};

export type SportCardsSelectionType = {
  nba: boolean;
  nfl: boolean;
  mlb: boolean;
  ufc: boolean;
  f1: boolean;
  soccer: boolean;
};

export type MatchSimpleType = {
  name: string;
  team1: string;
  team2: string;
  value: string;
};

export type SlickArrowType = {
  slideCount?: number;
  currentSlide?: number;
};

type TeamInfo = {
  name: string;
  logo: string;
  score?: number;
};

export type EarliestGameInfoType = {
  id: number;
  startDate: string;
  sportType: string;
  teams: TeamInfo[];
  state: string;
  odds: number;
  price: number;
  units: string[];
};

export type YesterdayPlayInfoType = {
  id: number;
  startDate: string;
  sportType: string;
  teams: TeamInfo[];
  state: string;
  odds: number;
  price: number;
  isWinner: boolean;
  patriots?: boolean;
};

export type DailyLineupType = {
  id: number;
  state: string;
  team_logo: string;
  lineup_name: string;
  team1: string;
  team2: string;
  startTime: string;
  fppg: number;
  oprk: string;
  price: number;
};

export type PageDefaultProps = {
  packages: Package[];
  sports?: Sport[];
};

export type JWT = {
  id: number;
  ita: number;
};
