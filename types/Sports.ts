export type Sport = {
  id: number;
  name: string;
  status: number;
  active: boolean;
  logo: string | null;
};

export type FantasyTabInfo = {
  sport: number;
  sportsbooks: string;
  tournament_type: string;
  total_salary: number;
  stat: {
    tournament: string;
    beat_the_score: string;
    fifty_to_fifty: string;
  };
};
