/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Col, Dropdown, Menu, Carousel } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';

import {
  AppLayout,
  BannerSportsAndMatches,
  DashboardHeader,
  SportEntryActive
} from '@components/index';
import {
  AllSportsBtnBgIcon,
  ListIcon,
  LockIcon,
  MinusEncloseIcon,
  MoneyPocketIcon,
  OpenBookIcon,
  PlusEncloseIcon
} from '@components/SvgIcons';

import styles from '@styles/SportsCard.module.css';
import { EarliestGameInfoType, PageProps } from '@type/Main';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { Sport } from '@type/Sports';
import SportsAPIs from '@apis/sport.apis';
import { BillingPlan, Package } from '@type/Packages';
import PackageAPIs from '@apis/package.apis';
import { UserSubscription } from '@type/Users';
import { MOCK_BetFundaments } from '@constants/*';

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
    name: 'Soccer',
    id: 'SOCCER',
    background: '#6DCF40',
    logo: () => <SOCCER_SVG className={styles.sports_logo} />
  },
  {
    name: 'UFC',
    id: 'UFC',
    background: '#F9282B',
    logo: () => <UFC_SVG className={styles.sports_logo} />
  },
  {
    name: 'Formula 1',
    id: 'F1',
    background: '#505054',
    logo: () => <F1_SVG className={styles.sports_logo} />
  }
];

const SportBetTypes = [
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

export default function SportsCard({ token, subscriptions, sports, packages }: PageProps) {
  const [openUnlockModal, setOpenUnlockModal] = useState<Sport | undefined>(undefined);
  const [activeSport, setActiveSport] = useState<number>(-1);
  const [filterType, setFilterType] = useState<string>('');
  const [unlockedItems, setUnlockedItems] = useState<number[]>([]);

  useEffect(() => {
    const items: number[] = [];
    subscriptions.forEach((subscription) => {
      if (subscription.plan.name.toLowerCase().indexOf('sports card') > -1) {
        items.push(subscription.sports[0].id);
      }
    });
    setUnlockedItems(items);
  }, [subscriptions]);

  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection
            sports={sports}
            unlockedItems={unlockedItems}
            changeActiveSport={(sport) => {
              setActiveSport(sport);
              setOpenUnlockModal(undefined);
            }}
            openUnlockModal={(sport: Sport) => {
              setOpenUnlockModal(sport);
            }}
            filterChanged={(filter) => {
              setFilterType(filter);
            }}
          />
        </div>
        <div className={styles.containerWrapper}>
          {openUnlockModal && packages && (
            <UnLockItemModal
              sport={openUnlockModal}
              packages={packages}
              closeModal={() => setOpenUnlockModal(undefined)}
            />
          )}
          <div className={styles.container}>
            <Row className={styles.content}>
              <Col span={18} className={styles.contentMainCol}>
                {SportBetTypes.map((type) => (
                  <ListGames
                    id={type.id}
                    title={type.name}
                    key={type.id}
                    subscriptions={subscriptions}
                    selectedSport={activeSport}
                    selectedFilterType={filterType}
                  />
                ))}
              </Col>
              <Col span={6} className={styles.contentSideCol}>
                <BankrollManagementSystem />
                <CommonSportsbooks />
                <BettingFundamentals />
              </Col>
            </Row>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/member_dashboard.jpg" className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

type TopSectionPropsType = {
  unlockedItems: number[];
  sports: Sport[];
  openUnlockModal: (_: Sport) => void;
  changeActiveSport: (_: number) => void;
  filterChanged: (_: string) => void;
};

function TopSection({
  unlockedItems,
  sports,
  openUnlockModal,
  changeActiveSport
}: TopSectionPropsType) {
  const [sportsStatus, setSportsStatus] = useState<number[]>([]);

  useEffect(() => {
    console.log('-- unlockedItems:', unlockedItems);
    const selectedStatus = sports.map((sport: Sport) => {
      const unlockedItemIndex = unlockedItems.findIndex((item: number) => item === sport.id);
      if (unlockedItemIndex > -1) {
        return 1;
      }
      return 0;
    });
    setSportsStatus(selectedStatus);
  }, [unlockedItems]);

  const onUnlockItemAt = (index: number) => {
    const items = sportsStatus.slice();
    if (items[index] === 1) {
      const newItems = items.fill(1);
      newItems[index] = 2;
      setSportsStatus(newItems);
      changeActiveSport(sports[index].id);
    } else if (items[index] === 2) {
      const newItems = items.slice();
      newItems[index] = 1;
      setSportsStatus(newItems);
      changeActiveSport(-1);
    } else {
      openUnlockModal(sports[index]);
    }
  };

  const responsive = [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        draggable: true
      }
    }
  ];

  return (
    <>
      <DashboardHeader title={'Sports Card'} />
      <Row className={styles.sportsCardList}>
        <Button className={styles.dropdownBtnWrapper}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            <LockIcon className={styles.lock_icon} />
            <span>VIP ALL ACCESS CARD</span>
            <AllSportsBtnBgIcon className={styles.dropdownBtnAllBg} />
          </div>
        </Button>
        <div className={styles.sportsCardListCarousel}>
          <Carousel
            arrows={true}
            dots={false}
            slidesToShow={8}
            responsive={responsive}
            initialSlide={0}
            variableWidth
            infinite={false}
            swipeToSlide
            draggable={false}
            slidesToScroll={1}>
            {sports.map((sport: Sport, index: number) => (
              <div key={index}>
                <Button className={styles.dropdownBtnWrapper} onClick={() => onUnlockItemAt(index)}>
                  <div
                    className={`${styles.dropdownBtn} ${
                      styles[
                        'dropdown_' +
                          SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.id
                      ]
                    }`}
                    style={{
                      background:
                        sportsStatus[index] === 2
                          ? SPORTS_INFO.filter(
                              (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                            )[0]?.background
                          : ''
                    }}>
                    {SPORTS_INFO.filter(
                      (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                    )[0]?.logo()}
                    {unlockedItems.indexOf(sport.id) < 0 && (
                      <LockIcon className={styles.lock_icon} />
                    )}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      </Row>
      <br></br>
    </>
  );
}

type ListGamesProps = {
  title: string;
  id: string;
  selectedSport: number;
  selectedFilterType: string;
  subscriptions: UserSubscription[];
};

function ListGames({
  title,
  id,
  selectedSport,
  selectedFilterType,
  subscriptions
}: ListGamesProps) {
  const [showDetailsAt, setShowDetailsAt] = useState<boolean[]>([]);
  const [hideSection, setHideSection] = useState<boolean>(true);
  const [games, setGames] = useState<EarliestGameInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    SportsAPIs.getSportEntries(id, subscriptions, selectedSport !== -1 ? selectedSport : undefined)
      .then((res) => res.json())
      .then((data: EarliestGameInfoType[]) => {
        switch (selectedFilterType) {
          case 'Highest Units':
            setGames(data.filter((game) => game.units > 250));
            break;
          case 'Highest Odds':
            setGames(data.filter((game) => game.odds_decimal > 250));
            break;
          default:
            setGames(data);
        }
        setLoading(false);
      });
  }, [selectedSport, selectedFilterType, subscriptions]);

  const changeDetailsVisibleAt = (index: number) => {
    showDetailsAt[index] = !showDetailsAt[index];
    setShowDetailsAt(showDetailsAt.slice());
  };

  const hideDetailsAt = (state: boolean) => {
    setHideSection(state);
  };

  return (
    <SportEntryActive
      title={title}
      loading={loading}
      hideSection={hideSection}
      hideDetailsAt={hideDetailsAt}
      games={games}
      showDetailsAt={showDetailsAt}
      changeDetailsVisibleAt={changeDetailsVisibleAt}></SportEntryActive>
  );
}

function BankrollManagementSystem() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <MoneyPocketIcon className={styles.sidebarBlockTitleIcon} />
        <span>Bankroll Management System</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <p>
          A unit represents a percentage of your bankroll and should generally represent between 1
          to 5 percent of your bankroll. Setting a unit percentage for your bankroll is completely
          at the users discretion. The higher the unit percentage, the more aggressive your
          bankroll. For example, for a $5,000 starting bankroll, a 1 unit wager would represent
          $100, i.e. 2% of your bankroll.
        </p>

        <div className={styles.footer_desc}>
          TheDailyStakes recommends setting 1 unit as 2% of your bankroll.
        </div>
      </div>
    </div>
  );
}

function CommonSportsbooks() {
  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <OpenBookIcon className={styles.sidebarBlockTitleIcon} />
        <span>Common Sportsbooks</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        <Row>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.bet365.com/#/HO/">
              <img src="/images/bet365.png" alt="Bet365 Logo" width={94} height={31} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://betway.com/">
              <img src="/images/betway.png" alt="Betway Logo" width={98} height={32} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.fanduel.com/">
              <img src="/images/fanduel.png" alt="Fanduel Logo" width={107} height={26} />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://sportsbook.draftkings.com">
              <img
                src="/images/draftkings.png"
                alt="Draftkings SportsBook Logo"
                width={109}
                height={29}
              />
            </a>
          </Col>
          <Col span={12} className={styles.company_logo}>
            <a href="https://www.williamhill.com/us">
              <img
                src="/images/williamhill.png"
                alt="WilliamHill SportsBook Logo"
                width={120}
                height={34}
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function BettingFundamentals() {
  const [showContent, setShowContent] = useState<boolean[]>([]);
  const toggleDetailsAt = (id: number) => {
    showContent[id] = !showContent[id];
    setShowContent(showContent.slice());
  };

  return (
    <div className={styles.sidebarBlock}>
      <div className={styles.sidebarBlockTitle}>
        <ListIcon className={styles.sidebarBlockTitleIcon} />
        <span>Sports Betting Fundamentals</span>
      </div>
      <div className={styles.sidebarBlockContent}>
        {MOCK_BetFundaments.map((data, index) => (
          <React.Fragment key={index}>
            <div className={styles.accordionTitle}>
              {showContent[index] && (
                <>
                  <strong>{data.title}</strong>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <MinusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
              {!showContent[index] && (
                <>
                  <span>{data.title}</span>
                  <Button ghost className={styles.ghostBtn} onClick={() => toggleDetailsAt(index)}>
                    <PlusEncloseIcon className={styles.accordionTitleIcon} />
                  </Button>
                </>
              )}
            </div>
            {showContent[index] && <div className={styles.accordionContent}>{data.content}</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

type UnlockItemModalPropsType = {
  closeModal: () => void;
  sport: Sport;
  packages: Package[];
};

function UnLockItemModal({ sport, closeModal, packages }: UnlockItemModalPropsType) {
  const sportCardPack = packages.filter((pack) => pack.name.indexOf('Sports Card') > -1)[0];
  const vipAllAccessPack = packages.filter((pack) => pack.name.indexOf('VIP All Access') > -1)[0];
  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPackType, setSelectedPackType] = useState<BillingPlan>(
    sportCardPack.billing_plans[0]
  );
  const [memberTypeMenuOpen, setMemberTypeMenuOpen] = useState<boolean>(false);
  const [selectedMemberType, setSelectedMemberType] = useState<BillingPlan>(
    vipAllAccessPack.billing_plans[0]
  );
  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {sportCardPack.billing_plans?.map((plan) => (
        <Menu.Item
          key={plan.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPackType(plan);
            setPackTypeMenuOpen(false);
          }}>
          {`${plan.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const MemberTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {sportCardPack.billing_plans?.map((plan) => (
        <Menu.Item
          key={plan.id}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedMemberType(plan);
            setMemberTypeMenuOpen(false);
          }}>
          {`${plan.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const changeMemberMenuVisible = (status: boolean) => {
    setMemberTypeMenuOpen(status);
  };
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };

  return (
    <div className={styles.unlockItemModal}>
      <div className={styles.modalWrapper} onClick={closeModal} />
      <Row align={'middle'} justify={'center'} className={styles.modalContainer}>
        <LazyLoad>
          <img
            src="/images/new_pack_bg.jpg"
            alt="Package Add Modal Background"
            className={styles.modalBg}
          />
        </LazyLoad>
        <div className={styles.modalOverlay} />
        <div className={styles.modalContent}>
          <div className={styles.contentTitle}>
            You need to purchase this pack in order to view the picks
          </div>
          <div className={styles.contentDesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel amet lorem odio
            tincidunt sed dolor commodo risus.
          </div>
          <Row className={styles.plans} align={'middle'} justify="center">
            <div className={styles.plan}>
              <h4>{sport.name} Access</h4>
              <p>Ut aliquam eleifend et fames.</p>
              <div>
                <label>Select Pack Type</label>
                <Dropdown
                  overlay={PackTypeMenu}
                  onVisibleChange={changePackMenuVisible}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <div className={styles.optionBtn}>
                    <span>{selectedPackType.name}</span>
                    {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
                    {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
                </Dropdown>
              </div>
              <Button className={styles.planSubmitBtn}>Add to Sports Card</Button>
            </div>
            <div className={styles.orText}>OR</div>
            <div className={styles.plan}>
              <h4>VIP ALL ACCESS CARD</h4>
              <p>Ut aliquam eleifend et fames.</p>
              <div>
                <label>Select Pack Type</label>
                <Dropdown
                  overlay={MemberTypeMenu}
                  onVisibleChange={changeMemberMenuVisible}
                  placement="bottomLeft"
                  transitionName=""
                  trigger={['click']}>
                  <div className={styles.optionBtn}>
                    <span>{selectedMemberType.name}</span>
                    {memberTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
                    {!memberTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
                  </div>
                </Dropdown>
              </div>
              <Button className={styles.planSubmitBtn}>Add Membership</Button>
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
}

export async function getStaticProps() {
  const res = await PackageAPIs.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
