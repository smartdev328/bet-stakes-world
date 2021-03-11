export const API_BASE_URL = 'https://api.tdsdevelopment.info';
export const STRIPE_API_KEY =
  'pk_test_51H3m5pEPT82q25ZMP07C58HuGdSSWPLbZx2d7dBI0xbAXMLvXbidZK8AdTdDTC5G64jVoxXm9gv8K1PZrMGbqqBf00Mc6dlaF0';

export const SportBetTypes = [
  {
    id: 'straight',
    name: 'Straight Bets'
  },
  {
    id: 'parlay',
    name: 'Parlays'
  },
  {
    id: 'wildcard',
    name: 'Bonus Wilcard Plays'
  }
];

export const MATCHES_MOCK = [
  {
    name: 'NBA | MON 07/31 3:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 4:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 5:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 6:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 7:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 8:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 9:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  },
  {
    name: 'NBA | MON 07/31 10:00PM',
    team1: 'TOR',
    team2: 'LAL',
    value: 'TOR -5.5'
  }
];

export const FAQsARR = {
  all: [
    'What does the VIP All Access Card include?',
    'Which sports does the VIP All Access cover?',
    'What is The DailyStakes Protection?',
    'What is In-game betting?',
    'Are the VIP All Access Plays guaranteed winners?',
    'What is your cancellation and refund policy?'
  ],
  sports_card: [
    'What does the Sports Card include?',
    'Which sports does the Sports Card cover?',
    'What is In-game betting?',
    'Are the Sports Card Plays guaranteed winners?',
    'What is your cancellation and refund policy?'
  ],
  fantasy: [
    'What does the Fantasy Package include?',
    'Which sports does the Fantasy Package cover?',
    'Are the Fantasy lineups guaranteed winners?',
    'What is your cancellation and refund policy?'
  ]
};

export const FAQsDesc = {
  all: [
    'The VIP All Access Card includes all picks released for a given day for all sports. A breakdown of key stats and trends are included with each pick. A unit is associated with each pick for bankroll management purposes. The VIP All Access card also includes our Weekly Pro Tip.',
    'We cover the NBA, NFL, MLB, Soccer*, NCAAF, NCAAB, UFC, and Formula 1. <br><br> *Soccer includes all Major Leagues and Tournaments Including the English Premier League, MLS, La Liga, Serie A, Bundesliga, UEFA Champions League, & others.',
    'The DailyStakes Protection applies only to the Daily VIP All Access Card. If over 50% of the Daily VIP All Access Card are losses for a given day, the next day’s picks are FREE. No questions asked. For example, if 6 picks are released and 4 are losses for a given day. The Daily VIP All Access Card for the next day is free. ** <br><br> This does not happen often, however when it does, we aim to look out in the best interest of our clients and endorse a win-win outcome.',
    'In-game betting has been one of the most lucrative ways of betting for our users. It is simply wagering on a game while it’s happening live. Odds for sportsbooks for the "in-game" will normally change during a timeout or commercial break.',
    'Guaranteed winners do not exist in the sports betting and daily fantasy world. However, The DailyStakes does everything possible to cover all angles of our analysis including detailed matchup analyses, lineup optimizations, quantitative backtesting, line movement trends, etc. to ensure we release the most optimal picks for our users every night. In order to even a turn in sports betting a winning rate required is 52.4% & The DailyStakes has built a proven track record & credibility to consistently provide winners for its clients.',
    'Our cancellation and refund policy can be found <a href="/refund-policy">here</a>.'
  ],
  sports_card: [
    'The Sports Card includes all picks released for the selected sport(s) of your choice. A breakdown of key stats and trends are included with each pick. A unit is associated with each pick for bankroll management purposes. The Sports Card card also includes our Weekly Pro tip.',
    'You have the option to select amongst the following sports: NBA, NFL, MLB, Soccer*, NCAAF, NCAAB, UFC, and Formula 1. A sports package for multiple sports can be purchased at varying time frames <br><br>Example: A monthly NBA package & a weekly Soccer package can be purchased at the same time <br><br>*Soccer includes all Major Leagues and Tournaments Including the English Premier League, MLS, La Liga, Serie A, Bundesliga, UEFA Champions League, & others. ',
    'In-game betting has been one of the most lucrative ways of betting for our users. It is simply wagering on a game while it’s happening live. Odds for sportsbooks for the "in-game" will normally change during a timeout or commercial break.',
    'Guaranteed winners do not exist in the sports betting and daily fantasy world. However, The DailyStakes does everything possible to cover all angles of our analysis including detailed matchup analyses, lineup optimizations, quantitative backtesting, line movement trends, etc. to ensure we release the most optimal picks for our users every night. In order to even a turn in sports betting a winning rate required is 52.4% & The DailyStakes has built a proven track record & credibility to consistently provide winners for its clients.',
    'Our cancellation and refund policy can be found <a href="/refund-policy">here</a>.'
  ],
  fantasy: [
    'The Fantasy Card includes optimal Daily Fantasy Sports (“DFS”) lineups for both single game and tournament style formats tailored for the following sportsbooks: DraftKings, Fanduel, and Yahoo Sports. Advanced stats for each selected player are provided such as projected points, expected value, player prop comparison, amongst other insightful statistics.',
    'Fantasy Packages can be purchased for any or all of the following sports: NBA, NFL, MLB.',
    'Guaranteed winners do not exist in the daily fantasy world. However, The DailyStakes does everything possible to cover all angles of our analysis including detailed matchup analysis, lineup optimizations, quantitative backtesting, line movement trends, etc. to ensure we release the most optimal picks for our users every night.',
    'Our cancellation and refund policy can be found <a href="/refund-policy">here</a>.'
  ]
};

export const MOCK_BetFundaments = [
  {
    id: 1,
    title: 'Oddsmakers',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 2,
    title: 'Moneyline',
    content:
      'This is the simplest type of bet to grasp. Betting the Moneyline simply means that your team needs to win the game. The minus sign next to the odds denotes the favorite & the plus sign denotes the underdog team.'
  },
  {
    id: 3,
    title: 'Spread',
    content:
      'Also known as the point spread & one of the most popular forms of betting. A favorite gives points and an underdog gets points. The minus sign (favorite) denotes that that team has to win by more than that margin while the plus sign (underdog) indicates that the other team can lose by that margin, or win the game, and they cover the spread in either case. (Ex: Lakers -5 means the Lakers have to win by more than 5 points to cover the spread).'
  },
  {
    id: 4,
    title: 'Prop Bet',
    content:
      'Prop bets are a more exciting way to enhance betting beyond the Moneyline or Point Spread. It provides you a way to place wagers beyond only game outcomes. Player Props are amongst the most popular prop bets..'
  },
  {
    id: 5,
    title: 'Over/Unders',
    content:
      'Also known as a totals bets is wagering on the total for a particular game that is set by oddsmakers based on a particular matchup and how the game will unfold from a scoring point of view. As a person betting on a totals bet, you would need to select if the total number of points scored by both teams will be over or under the total set by oddsmakers.'
  },
  {
    id: 6,
    title: 'Parlay',
    content:
      'A parlay is a single bet that combines two or more wagers. In order to win the bet, the player must win all the wagers for a given parlay. If one of the bets fall through, the entire bet is lost. If the players wins all the wagers for a given parlay, the player wins a greater payout compared to placing the bets separately. '
  },
  {
    id: 7,
    title: 'Bonus Wildcard Plays',
    content:
      "These are unofficial bets proposed by TheDailyStakes. They're intended to be wagered in small amounts making them low risk high return plays. We all love stacked parlays and having a bit of skin in the game for a large wildcard play is always enticing for sports fans, casuals & bettors."
  }
];

export const FAQsTitlePage = [
  'What does The DailyStakes offer?',
  'Which sports do you cover?',
  'What types of membership offerings do you provide?',
  'If I subscribe and do not purchase a package, what do I have access to?',
  'Once I purchase a membership, how can I view the plays for a package?',
  'What is In-game betting?',
  'How many picks do you release per day?',
  'When are picks released for a given day?',
  'What is The DailyStakes Protection?',
  'Do you place bets? Where can I bet?',
  'Do you rate your plays?',
  'What is the Weekly Pro Tip?',
  'What types of bets do you provide?',
  'Are the plays guaranteed winners?',
  'What is your cancellation and refund policy?'
];

export const FAQsDescPage = [
  'The Daily Stakes, Inc. is a North American digital sports consulting & media company focused on the rapidly evolving sports betting and daily fantasy sports landscape. The company uses data driven models to provide users with predictive sports analytics, credible bet recommendations, premium content, and advanced bankroll management strategies via its membership packages. <br><br> Our mission is to be the sports consulting industry leader by providing our clients with the industry’s most versatile content and insightful recommendations.',
  'We cover the NBA, NFL, MLB, Soccer*, NCAAF, NCAAB, UFC, and Formula 1. <br><br> *Soccer includes all Major Leagues and Tournaments Including the English Premier League, MLS, La Liga, Serie A, Bundesliga, UEFA Champions League, & others.',
  'We have three main membership offerings which can be purchased at varying lengths.<br><br>The <a href="/shop">VIP All Access Card</a> includes all recommended sports bets for all sports released during a given day.<br><br>The <a href="/shop">Sports Card</a> includes recommended sports bets released for the sport(s) of your choice. <br><br>The <a href="/shop">Fantasy Card</a> includes optimal Daily Fantasy Sports (“DFS”) lineups for both single game and tournament style formats tailored for the following sportsbooks: DraftKings, Fanduel, and Yahoo Sports<br><br>Our membership packages also include advanced statistics, pro tips, and premium content. It\'s more than just picks!',
  'A user has the option to <a href="#">subscribe for free!</a> The subscribed member will have access to our Monthly Newsletter, The DailyStakes Insights, Free Monthly Picks, and up to date information related to sports betting & daily fantasy sports. Subscribers will also be able to view our historical results via <a href="/yesterdays-plays">Yesterday\'s Plays.</a>',
  'All users will have access to their customized member dashboard upon purchasing a member package. Plays can be found on your Membership Dashboard immediately after purchase. Once you have logged into your account, the plays can be viewed via desktop or our mobile friendly dashboard.',
  'In-game betting has been one of the most lucrative ways of betting for our users. It is simply wagering on a game while it’s happening live. Odds for sportsbooks for the "in-game" will normally change during a timeout or commercial break.',
  'There are no set number of picks which are released per day. The quantum of picks released are dependent on the package purchased, coupled with the perceived value in sports matchups for a given day based on our in-depth analysis. Total plays released for a given day can vary anywhere from 2-15 picks.',
  'Picks are released on varying times based on your selected membership package. Alerts can be received at your preference via text or email. Alerts are also posted via our social media platforms, namely Instagram & Twitter. <br><br> A Daily Countdown can also be found on our Homepage which shows when the card for the Daily VIP All Access Card will be released. Picks are always released minimum 1 hour before a game takes place.',
  'The DailyStakes Protection applies only to the Daily VIP All Access Card. If over 50% of the Daily VIP All Access Card are losses for a given day, the next day’s picks are FREE. No questions asked. For example, if 6 picks are released and 4 are losses for a given day. The Daily VIP All Access Card for the next day is free. <br><br> This does not happen often, however when it does, we aim to look out in the best interest of our clients and endorse a win-win outcome.',
  'We are not a platform which accepts or places bets (a.k.a bookies). Conversely, we provide advanced predictive analytics & recommended wagers based on quantitative data and elaborative research to beat the bookies. Our recommended bookies can be found here.',
  'We designate proposed units with each recommended pick. A unit represents a percentage of your bankroll and should generally represent between 1 to 5 percent of your bankroll. Setting a unit percentage for your bankroll is completely at the users discretion. The higher the unit percentage, the more aggressive your bankroll. For example, for a $5,000 starting bankroll, a 1 unit wager would represent $100, *i.e.* 2% of your bankroll.<br><br>The DailyStakes recommends setting 1 unit as 2% of your bankroll.',
  'The Weekly Pro Tip provides insights and advice from a “sharp” point of view. A sharp is a professional bettor. We aim to arm our users with the best available knowledge in order for them to become better, and more importantly consistently profitable bettors, whether you’re a casual, a fan, or a sharp.',
  'Our sports betting packages i.e., VIP All Access & Sports Card includes straight bets, parlays, player props, bonus wildcard parlays, amongst other bet types. Our Fantasy Packages includes lineups for tournaments (i.e. main slate) contests and single game contests (e.g. 50/50, Beat The Score), along with recommendations as to which tournaments to enter to maximize profit.',
  'Guaranteed winners do not exist in the sports betting and daily fantasy world. However, The DailyStakes does everything possible to cover all angles of our analysis including detailed matchup analysis, lineup optimizations, quantitative backtesting, line movement trends, etc.  <br><br>In order to break even in sports betting a winning rate required is 52.4% & The DailyStakes has built a proven track record & credibility to consistently provide winners for its clients.',
  'Our cancellation and refund policy can be found <a href="/refund-policy">here</a>.'
];

export const CREDIT_COUNTRIES = [
  {
    id: 'CA',
    name: 'Canada'
  },
  {
    id: 'US',
    name: 'United States'
  }
];

export const FANTASY_TABS = [
  {
    id: 'Main_Slate',
    name: 'MAIN SLATE'
  },
  {
    id: 'Single_Slate',
    name: 'SINGLE SLATE'
  }
];

export const MOCK_DailyFantasyLineups = [
  {
    sport: 'NBA',
    title: 'Lineups for DK, FD and Yahoo!',
    content: [
      {
        label: 'Draftkings Lineups Include',
        features: ['NBA Single Slate for NOP vs LAL', 'NBA MAIN slate at 7:00 pm EST']
      },
      {
        label: 'Fanduel lineups include',
        features: ['NBA Single Slate for NOP vs LAL', 'NBA MAIN slate at 7:00 pm EST']
      }
    ]
  },
  {
    sport: 'NFL',
    title: 'Lineups for DK, FD and Yahoo!',
    content: [
      {
        label: 'Draftkings Lineups Include',
        features: ['NFL Single Slate for NOP vs LAL', 'NFL MAIN slate at 7:00 pm EST']
      },
      {
        label: 'Fanduel lineups include',
        features: ['NFL Single Slate for NOP vs LAL', 'NFL MAIN slate at 7:00 pm EST']
      }
    ]
  },
  {
    sport: 'MLB',
    title: 'Lineups for DK, FD and Yahoo!',
    content: [
      {
        label: 'Draftkings Lineups Include',
        features: ['MLB Single Slate for NOP vs LAL', 'MLB MAIN slate at 7:00 pm EST']
      },
      {
        label: 'Fanduel lineups include',
        features: ['MLB Single Slate for NOP vs LAL', 'MLB MAIN slate at 7:00 pm EST']
      }
    ]
  }
];

export const MOCK_FantasyFundaments = [
  {
    id: 0,
    title: 'Mock Lineup',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },

  {
    id: 1,
    title: 'Tournament',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 2,
    title: 'Beat the Score',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 3,
    title: 'Multipliers',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 4,
    title: 'Head to Head',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 5,
    title: '3-100 Players',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 6,
    title: '50/50s',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  }
];

export const MOCK_BankRoll = [
  {
    id: 1,
    title: 'What is a unit? ',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 2,
    title: 'What should my unit % be?',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 3,
    title: 'TheDailyStakes Recommendation',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  },
  {
    id: 4,
    title: 'Other Bankroll Systems',
    content:
      'Also known as bookmakers, sportsbooks, or bookies, are people who are licensed to create betting lines and take wagers.'
  }
];

export const PACKAGE_NAMES = {
  VIP_ALL_ACCESS: 'VIP',
  SPORTS_CARD: 'SPORTS CARD',
  FANTASY: 'FANTASY'
};
