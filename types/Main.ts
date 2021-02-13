import { Package } from './Packages';
import { Sport } from './Sports';
import { UserSubscription } from './Users';

export type PageProps = {
  token: JWT | null;
  sports: Sport[];
  packages?: Package[];
  subscriptions: UserSubscription[];
};

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

export type Team = {
  logo: {
    url: string;
  };
  name: string;
  sport: number;
};

export type Schedule = {
  active: boolean;
  home_team: Team;
  id: number;
  name: string;
  published_at: Date;
  status: boolean;
  team: Team;
  time: Date;
};

export type EarliestGameInfoType = {
  bet_text: string;
  detail: string;
  id: number;
  odds: number;
  odds_decimal: number;
  outcome: number | null;
  publish_date: Date;
  schedules: Schedule[];
  score: number | null;
  sport: Sport;
  type: 'straight' | 'wilcard' | 'parlay';
  units: number;
};

export type YesterdayPlayInfoType = {
  bet_text: string;
  detail: string;
  id: number;
  odds: number;
  odds_decimal: number;
  outcome: 'LOSS' | 'WIN' | 'PUSH';
  publish_date: Date;
  schedules: Schedule[];
  score: string | null;
  sport: Sport;
  type: 'straight' | 'wilcard' | 'parlay';
  units: number;
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

export type JWT = {
  id: number;
  ita: number;
};

export type PromiseResponse = {
  message: string;
  status: number;
  statusCode?: number;
  raw?: {
    message: string;
  };
};
