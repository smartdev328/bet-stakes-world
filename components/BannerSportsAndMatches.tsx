/* eslint-disable react/display-name */
import React, { createRef, RefObject, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';

import { ClickableArrowIcon } from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { SportInfoType, MatchSimpleType } from '@type/Main';
import { MATCHES_MOCK } from '@constants/';
import styles from './BannerSportsAndMatches.module.css';

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
    name: 'SOCCER',
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
    name: 'FORMULA 1',
    id: 'F1',
    background: '#505054',
    logo: () => <F1_SVG className={styles.sports_logo} />
  }
];

export default function BannerSportsAndMatches() {
  const [nextArrowVisible, setNextArrowVisible] = useState<boolean>(true);
  const [prevArrowVisible, setPrevArrowVisible] = useState<boolean>(false);
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<SportInfoType>(SPORTS_INFO[0]);
  const carouselRef: RefObject<CarouselRef> = createRef();

  const goCarouselBack = () => {
    carouselRef.current?.prev();
  };
  const goCarouselNext = () => {
    carouselRef.current?.next();
  };
  const changeSport = (sport: SportInfoType) => {
    setSelectedSport(sport);
    setSportMenuOpen(false);
  };
  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
  const beforeSlideChange = (_: number, next: number) => {
    const slides = document.querySelectorAll('.matches-carousel .slick-dots li').length;
    if (slides == next + 1) {
      setNextArrowVisible(false);
    } else if (next == 0) {
      setPrevArrowVisible(false);
    } else {
      setPrevArrowVisible(true);
      setNextArrowVisible(true);
    }
  };

  const menu = (
    <Menu className={styles.sportMenu}>
      {SPORTS_INFO.map((sport) => (
        <Menu.Item
          key={sport.name}
          className={styles.sportMenuItem}
          onClick={() => changeSport(sport)}>
          {sport.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const responsive = [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5,
        dots: true
      }
    },
    {
      breakpoint: 1120,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 940,
      settings: {
        slidesToShow: 3,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }
  ];
  return (
    <div className={styles.sports_and_matches}>
      <div className={styles.container}>
        <div className={styles.dropdownBox}>
          <Dropdown
            overlay={menu}
            onVisibleChange={changeMenuVisible}
            placement="bottomLeft"
            transitionName=""
            trigger={['click']}>
            <div
              className={`${styles.dropdownBtn} ${styles['dropdown_' + selectedSport.id]}`}
              style={{ background: selectedSport.background }}>
              {selectedSport.logo()}
              <span>{selectedSport.name}</span>
              {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
              {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
            </div>
          </Dropdown>
        </div>
        <div className={styles.matchesCarouselView}>
          {prevArrowVisible && (
            <ClickableArrowIcon className={styles.arrow_back_icon} onClick={goCarouselBack} />
          )}
          {nextArrowVisible && (
            <ClickableArrowIcon className={styles.arrow_forward_icon} onClick={goCarouselNext} />
          )}
          <Carousel
            ref={carouselRef}
            dots={true}
            infinite={false}
            className="matches-carousel"
            responsive={responsive}
            initialSlide={0}
            beforeChange={beforeSlideChange}
            slidesToShow={6}>
            {MATCHES_MOCK.map((match: MatchSimpleType, index: number) => (
              <React.Fragment key={index}>
                <div className={styles.match_view}>
                  <div className={styles.match_title}>{match.name}</div>
                  <div className={styles.match_content}>
                    <div className={styles.match_content_left}>
                      <div className={styles.team1}>
                        <div className={styles.team_logo_container}>
                          <img
                            src={
                              'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Toronto_Raptors.png'
                            }
                            alt="Toronto Raptors Logo"
                            className={styles.team_logo}
                          />
                        </div>
                        <span>{match.team1}</span>
                      </div>
                      <div className={styles.team2}>
                        <div className={styles.team_logo_container}>
                          <img
                            alt="Los Angeles Lakers Logo"
                            src={
                              'https://dailystakes-assets.s3.us-east-2.amazonaws.com/Los_Angeles_Lakers.png'
                            }
                            className={styles.team_logo}
                          />
                        </div>
                        <span>{match.team2}</span>
                      </div>
                    </div>
                    <div className={styles.match_content_right}>{match.value}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.gradient_bg}></div>
    </div>
  );
}
