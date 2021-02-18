export type Sport = {
  id: number;
  name: string;
  status: number;
  active: boolean;
  logo: string | null;
};

export type FantasyTabInfo = {
  sport: string;
  company: string;
  type: string;
  salaryCap: number;
  lineupSalary: number;
};
