/* eslint-disable react/display-name */
import Head from 'next/head';
import React, { useState } from 'react';
import { Row, Col, Dropdown, Menu, Button } from 'antd';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { NormalCheckIcon, EmptyCircleIcon, CheckedCircleIcon } from '@components/SvgIcons';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { SportInfoType } from '@type/Main';

import styles from '@styles/Signup.module.css';
import { MembershipType, PackageType } from '@type/Memberships';

export default function Registration() {
  const [userMemberships, setUserMemberships] = useState<MembershipType>({
    vipAllAccessCard: undefined,
    sportsCard: undefined,
    fantasy: undefined
  });

  const changeMemberships = (type: keyof MembershipType, pack: PackageType | undefined) => {
    const updatedMemberships = Object.assign({}, userMemberships);
    updatedMemberships[type] = pack;
    setUserMemberships(updatedMemberships);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Registration</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <div className={styles.sectionTitle}>Select a Membership package</div>
          <Row>
            <div className={styles.packagesCol}>
              <VIPAllAccessCardPackage
                selected={userMemberships.vipAllAccessCard !== undefined}
                onSelectPackage={changeMemberships}
              />
              <SportsCardPackage
                selected={userMemberships.sportsCard !== undefined}
                onSelectPackage={changeMemberships}
              />
              <FantasyPackage
                selected={userMemberships.fantasy !== undefined}
                onSelectPackage={changeMemberships}
              />
            </div>
            <div className={styles.registrationCol}>
              <div className={styles.sectionTitle}>Create Account</div>
              <ul className={styles.list_with_checkmark}>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  <NormalCheckIcon className={styles.list_check_icon} />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
              </ul>
              <form autoComplete="off">
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>User Name*</label>
                    <input name="username" placeholder="ie: CashmeOut91" />
                  </Col>
                </Row>
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.formGroup}>
                    <label>First Name*</label>
                    <input name="first_name" placeholder="ie: Johnny" />
                  </Col>
                  <Col span={12} className={styles.formGroup}>
                    <label>Last Name*</label>
                    <input name="last_name" placeholder="ie: Cash" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>Email*</label>
                    <input name="email" type="email" placeholder="ie: j.cash@gmail.com" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={styles.formGroup}>
                    <label>Mobile Number</label>
                    <input name="mobile_number" placeholder="1-111-111-1111" />
                  </Col>
                </Row>
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.formGroup}>
                    <label>Password*</label>
                    <input name="password" type="password" placeholder="ie: **********" />
                  </Col>
                  <Col span={12} className={styles.formGroup}>
                    <label>Verify Password*</label>
                    <input name="verify_password" type="password" placeholder="ie: **********" />
                  </Col>
                </Row>
                <Row className={styles.rowWithTwoChild} justify="space-between">
                  <Col span={12} className={styles.termsSection}>
                    <input type="checkbox" name="terms" />
                    <div className={styles.termsContent}>
                      <div className={styles.title}>Communication Policy</div>
                      <div>
                        Lorem ipsum dolor sit amet,{' '}
                        <Link href="/">
                          <a>Read More</a>
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Button className={styles.registerBtn}>Registor Now</Button>
                  </Col>
                </Row>
              </form>
              <div className={styles.orText}>
                <span>Or</span>
              </div>
              <Button className={styles.register_facebook_btn}>Registor With Facebook</Button>
              <Button className={styles.register_goggle_btn}>Registor With Google</Button>
            </div>
          </Row>
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <LazyLoad>
        <img src="/images/registration_page_bg.png" className={styles.bgImage} />
      </LazyLoad>
      <div className={styles.heroBannerContent}>
        <h1>Registration</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type AccessCardPackagePropsType = {
  selected: boolean;
  onSelectPackage: (type: keyof MembershipType, _: PackageType | undefined) => void;
};

function VIPAllAccessCardPackage({ selected, onSelectPackage }: AccessCardPackagePropsType) {
  const PackageTypes = [
    {
      title: '* Daily *',
      price: 40
    },
    {
      title: 'Weekly',
      price: 120
    },
    {
      title: 'Monthly',
      price: 300
    },
    {
      title: 'Quarterly',
      price: 600
    },
    {
      title: 'Semi-Annual',
      price: 850
    },
    {
      title: 'Annual',
      price: 1000
    }
  ];

  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPack, setSelectedPack] = useState<PackageType>(PackageTypes[0]);

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {PackageTypes.map((pack: PackageType, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPack(pack);
            setPackTypeMenuOpen(false);
          }}>
          {`${pack.title} - $${pack.price}.00`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };
  const clickCheckIcon = () => {
    if (!selected) {
      onSelectPackage('vipAllAccessCard', selectedPack);
    } else {
      onSelectPackage('vipAllAccessCard', undefined);
    }
  };

  return (
    <div className={`${styles.package} ${selected && styles.selected}`}>
      {selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <CheckedCircleIcon className={styles.checkedStatusIcon} />
        </Button>
      )}
      {!selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
        </Button>
      )}
      <div className={styles.packageTitle}>
        <span>ViP All Access Card</span>
        <LazyLoad>
          <img src="/images/registration_vip_card_wave.svg" alt="Registration VIP All Card" />
        </LazyLoad>
      </div>
      <ul className={styles.list_with_checkmark}>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
      <div className={styles.packageTypes}>
        <span className={styles.sectionTitle}>Select Pack Type</span>
        <Dropdown
          overlay={PackTypeMenu}
          onVisibleChange={changePackMenuVisible}
          placement="bottomLeft"
          transitionName=""
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>{`${selectedPack.title} - $${selectedPack.price}.00`}</span>
            {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

function SportsCardPackage({ selected, onSelectPackage }: AccessCardPackagePropsType) {
  const PackageTypes = [
    {
      title: '* Daily *',
      price: 40
    },
    {
      title: 'Weekly',
      price: 120
    },
    {
      title: 'Monthly',
      price: 300
    },
    {
      title: 'Quarterly',
      price: 600
    },
    {
      title: 'Semi-Annual',
      price: 850
    },
    {
      title: 'Annual',
      price: 1000
    }
  ];
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

  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPack, setSelectedPack] = useState<PackageType>(PackageTypes[0]);
  const [sportsStatus, setSportsStatus] = useState<boolean[]>([]);

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {PackageTypes.map((pack: PackageType, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPack(pack);
            setPackTypeMenuOpen(false);
          }}>
          {`${pack.title} - $${pack.price}.00`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };
  const clickCheckIcon = () => {
    if (!selected) {
      onSelectPackage('sportsCard', selectedPack);
    } else {
      onSelectPackage('sportsCard', undefined);
    }
  };
  const onChangeItemAt = (index: number) => {
    const items = sportsStatus.slice();
    items[index] = !items[index];
    setSportsStatus(items);
  };

  return (
    <div className={`${styles.package} ${selected && styles.selected}`}>
      {selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <CheckedCircleIcon className={styles.checkedStatusIcon} />
        </Button>
      )}
      {!selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
        </Button>
      )}
      <div className={styles.packageTitle}>
        <span>Sports Card</span>
      </div>
      <ul className={styles.list_with_checkmark}>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
            <Button
              key={index}
              className={styles.dropdownBtnWrapper}
              onClick={() => onChangeItemAt(index)}>
              <div
                className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                style={{
                  background: !sportsStatus[index] ? sport.background : ''
                }}>
                {sport.logo()}
                <span>{sport.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.packageTypes}>
        <div className={styles.sectionTitle}>Select Pack Type</div>
        <Dropdown
          overlay={PackTypeMenu}
          onVisibleChange={changePackMenuVisible}
          placement="bottomLeft"
          transitionName=""
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>{`${selectedPack.title} - $${selectedPack.price}.00`}</span>
            {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

function FantasyPackage({ selected, onSelectPackage }: AccessCardPackagePropsType) {
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
    }
  ];

  const PackageTypes = [
    {
      title: 'Daily Lineups',
      price: 10
    },
    {
      title: 'Seasonal Lineups',
      price: 100
    }
  ];

  const [packTypeMenuOpen, setPackTypeMenuOpen] = useState<boolean>(false);
  const [selectedPack, setSelectedPack] = useState<PackageType>(PackageTypes[0]);
  const [sportsStatus, setSportsStatus] = useState<boolean[]>([]);

  const PackTypeMenu = () => (
    <Menu className={styles.sportMenu}>
      {PackageTypes.map((pack: PackageType, index: number) => (
        <Menu.Item
          key={index}
          className={styles.sportMenuItem}
          onClick={() => {
            setSelectedPack(pack);
            setPackTypeMenuOpen(false);
          }}>
          {`${pack.title} - $${pack.price}.00`}
        </Menu.Item>
      ))}
    </Menu>
  );
  const changePackMenuVisible = (status: boolean) => {
    setPackTypeMenuOpen(status);
  };
  const onChangeItemAt = (index: number) => {
    const items = sportsStatus.slice();
    items[index] = !items[index];
    setSportsStatus(items);
  };
  const clickCheckIcon = () => {
    if (!selected) {
      onSelectPackage('fantasy', selectedPack);
    } else {
      onSelectPackage('fantasy', undefined);
    }
  };

  return (
    <div className={`${styles.package} ${selected && styles.selected}`}>
      {selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <CheckedCircleIcon className={styles.checkedStatusIcon} />
        </Button>
      )}
      {!selected && (
        <Button className={styles.checkIconBtn} onClick={clickCheckIcon}>
          <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
        </Button>
      )}
      <div className={styles.packageTitle}>
        <span>Fantasy</span>
      </div>
      <ul className={styles.list_with_checkmark}>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </li>
      </ul>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {SPORTS_INFO.map((sport: SportInfoType, index: number) => (
            <Button
              key={index}
              className={styles.dropdownBtnWrapper}
              onClick={() => onChangeItemAt(index)}>
              <div
                className={`${styles.dropdownBtn} ${styles['dropdown_' + sport.id]}`}
                style={{
                  background: !sportsStatus[index] ? sport.background : ''
                }}>
                {sport.logo()}
                <span>{sport.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.packageTypes}>
        <div className={styles.sectionTitle}>Select Pack Type</div>
        <Dropdown
          overlay={PackTypeMenu}
          onVisibleChange={changePackMenuVisible}
          placement="bottomLeft"
          transitionName=""
          trigger={['click']}>
          <div className={styles.optionBtn}>
            <span>{`${selectedPack.title} - $${selectedPack.price}.00`}</span>
            {packTypeMenuOpen && <CaretUpOutlined className={styles.caret_up} />}
            {!packTypeMenuOpen && <CaretDownOutlined className={styles.caret_down} />}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
