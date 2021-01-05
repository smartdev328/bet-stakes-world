/* eslint-disable react/display-name */
import React, { useState } from 'react';
import Head from 'next/head';
import { Image, Row, Button, Col, Dropdown, Menu, Carousel } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { AllSportsBtnBgIcon, LockIcon, TuneIcon } from '@components/SvgIcons';
import styles from '@styles/SportsCard.module.css';
import {
  ThickStarIcon,
  CaretDownInCircleIcon,
  ConfigIcon,
  MobilePhoneIcon
} from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';

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
  },
  {
    name: 'SOCCER',
    id: 'SOCCER',
    background: '#6DCF40',
    logo: () => <SOCCER_SVG className={styles.sports_logo} />
  }
];

export default function SportsCard() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Sports Card</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection />
          <Row>
            <Col span={18}></Col>
            <Col span={6}></Col>
          </Row>
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <Image src="/images/member_dashboard.jpg" preview={false} className={styles.bgImage} />
      <BannerSportsAndMatches />
    </div>
  );
}

function TopSection() {
  const [sportMenuOpen, setSportMenuOpen] = useState<boolean>(false);
  const [unlockItems, setUnlockItems] = useState<boolean[]>([]);
  const [unlockAll, setUnlockAll] = useState<boolean>(false);
  const [selectedSportType, setSelectedSportType] = useState<string>('Largest Profit');
  const changeMenuVisible = (status: boolean) => {
    setSportMenuOpen(status);
  };
  const onUnlockItemAt = (index: number) => {
    const items = unlockItems.slice();
    items[index] = !items[index];
    setUnlockItems(items);
  };

  const onUnlockAll = () => {
    setUnlockAll(!unlockAll);
    if (unlockAll) {
      setUnlockItems([]);
    } else {
      setUnlockItems(new Array(SPORTS_INFO.length).fill(true));
    }
  };

  const menu = (
    <Menu className={styles.sportMenu}>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Largest Profit');
          setSportMenuOpen(false);
        }}>
        Largest Profit
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Medium Profit');
          setSportMenuOpen(false);
        }}>
        Medium Profit
      </Menu.Item>
      <Menu.Item
        className={styles.sportMenuItem}
        onClick={() => {
          setSelectedSportType('Small Profit');
          setSportMenuOpen(false);
        }}>
        Small Profit
      </Menu.Item>
    </Menu>
  );

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
      <Row className={styles.topSection}>
        <Col span={12} className={styles.left}>
          <Row>
            <Col span={24}>
              <Row align={'middle'}>
                <Button ghost className={styles.thick_star_btn}>
                  <ThickStarIcon className={styles.thick_star_icon} />
                </Button>
                <span>Sports Card</span>
                <Button ghost className={styles.caret_down_btn}>
                  <CaretDownInCircleIcon className={styles.caret_down_icon} />
                </Button>
              </Row>
            </Col>
            <Col span={24}>
              <Row align={'middle'}>
                <p>Monlthy Membership Renews in 20 days</p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12} className={styles.right}>
          <Button className={styles.sms_send_btn}>
            <MobilePhoneIcon className={styles.mobile_phone_icon} />
            Recieve your picks via text!
          </Button>
          <Button ghost className={styles.config_btn}>
            <ConfigIcon className={styles.config_btn_icon} />
          </Button>
        </Col>
      </Row>
      <Row className={styles.sportsCardList} justify={'center'}>
        <Button className={styles.dropdownBtnWrapper} onClick={onUnlockAll}>
          <div className={`${styles.dropdownBtn} ${styles.dropdownBtnAll}`}>
            {!unlockAll && <LockIcon className={styles.lock_icon} />}
            <span>VIP ALL ACCESS CARD</span>
            <AllSportsBtnBgIcon className={styles.dropdownBtnAllBg} />
          </div>
        </Button>
        <div className={styles.sportsCardListCarousel}>
          <Carousel
            arrows={true}
            dots={false}
            slidesToShow={6}
            responsive={responsive}
            initialSlide={0}
            variableWidth
            infinite={false}
            swipeToSlide
            slidesToScroll={SPORTS_INFO.length}>
            {SPORTS_INFO.map((sport, index) => (
              <div key={index}>
                <Button className={styles.dropdownBtnWrapper} onClick={() => onUnlockItemAt(index)}>
                  <div
                    className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                    style={{ background: unlockItems[index] ? sport.background : '' }}>
                    {sport.logo()}
                    {!unlockItems[index] && <LockIcon className={styles.lock_icon} />}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      </Row>
      <Row className={styles.optionsRow} justify={'center'}>
        <Dropdown
          overlay={menu}
          onVisibleChange={changeMenuVisible}
          placement="bottomLeft"
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>
              <strong>Sport:&nbsp;</strong>
              {selectedSportType}
            </span>
            {sportMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!sportMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <div className={styles.optionBtn}>
            <strong>Filter Cards&nbsp;</strong>
            <TuneIcon className={styles.tune_icon} />
          </div>
        </Dropdown>
      </Row>
    </>
  );
}
