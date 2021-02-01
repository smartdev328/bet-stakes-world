import { useState } from 'react';
import Head from 'next/head';

import { PlusIcon, MinusIcon } from '@components/SvgIcons';
import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';

export default function FAQs({ token, subscriptions }: PageProps) {
  const FAQsTitle = [
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
    'What is your refund policy?'
  ];

  const FAQsDesc = [
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
    'Our refund policy can be found here. Cancellations are available on any packages exceeding one month based on the remaining time left for a the purchased membership package(s).'
  ];

  function FAQs({ title }: { title: string }) {
    const [faqIsVisible, setFaqIsVisible] = useState<boolean[]>([]);
    const toggleFAQ = (index: number) => {
      const updated = faqIsVisible.slice();
      updated[index] = !updated[index];
      setFaqIsVisible(updated);
    };

    return (
      <div className={styles.faqs}>
        <h4>{title}</h4>
        <ul>
          {FAQsTitle.map((faq: string, index: number) => (
            <li key={index}>
              <div className={styles.faq_title}>
                {!faqIsVisible[index] && (
                  <PlusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
                )}
                {faqIsVisible[index] && (
                  <MinusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
                )}
                <span>{faq}</span>
              </div>
              {faqIsVisible[index] && <p dangerouslySetInnerHTML={{ __html: FAQsDesc[index] }}></p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>About Us</h4>
            <p>
              The Daily Stakes, Inc. is a North American digital sports consulting & media company
              focused on the rapidly evolving sports betting and daily fantasy sports landscape. The
              company uses data driven models to provide users with predictive sports analytics,
              credible bet recommendations, premium content, and advanced bankroll management
              strategies via its membership packages.{' '}
            </p>
            <h4>Our Story</h4>
            <h4>Our Mission</h4>
            <p>
              To be the sports consulting industry leader by providing our clients with the
              industry’s most versatile content and insightful recommendations.
            </p>
            <h4>Our Purpose HOLD</h4>
            <p>
              <ul>
                <li>Educating the Bettor</li>
                <li>Providing Credibility</li>
                <li>Providing Value</li>
              </ul>
            </p>

            <p>
              For more information, please visit our <a href="/faqs">FAQ Page</a> or{' '}
              <a href="/contactus">Contact Us</a> directly!
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
