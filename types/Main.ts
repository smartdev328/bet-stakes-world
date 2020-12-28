export type SVGIconPropType = {
  className: string;
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
