import Head from 'next/head';
import { Image, Row, Button, Col } from 'antd';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import styles from '@styles/MemberDashboard.module.css';
import {
  ThickStarIcon,
  CaretDownInCircleIcon,
  ConfigIcon,
  MobilePhoneIcon
} from '@components/SvgIcons';

export default function MemberDashboard() {
  return (
    <>
      <Head>
        <title>The Daily Stakes - Member Dashboard</title>
      </Head>
      <AppLayout bgColor={'#ffffff'}>
        <HeroBanner />
        <div className={styles.container}>
          <TopSection />
          <Row className={styles.nowrapRow}>
            <Col span={18} className={styles.current_packages_container}>
              <CurrentPackages />
            </Col>
            <Col span={6} className={styles.weekly_pro_tip_container}>
              <WeeklyProTip />
            </Col>
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
  return (
    <>
      <Row className={styles.topSection}>
        <Col span={12} className={styles.left}>
          <Row align={'middle'}>
            <Button ghost className={styles.thick_star_btn}>
              <ThickStarIcon className={styles.thick_star_icon} />
            </Button>
            <span>Member dashboard</span>
            <Button ghost className={styles.caret_down_btn}>
              <CaretDownInCircleIcon className={styles.caret_down_icon} />
            </Button>
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
      <Row align={'middle'} justify={'space-between'} className={styles.welcome_row}>
        <Col className={styles.welcome_left}>Welcome back Nicolas!</Col>
        <Col className={styles.welcome_right}>
          <strong>Overall Record:</strong>&nbsp;123-54
        </Col>
      </Row>
    </>
  );
}

function CurrentPackages() {
  return (
    <div className={styles.current_packages}>
      <div className={styles.block_title}>Current Packages</div>
      <div className={styles.block_content}>
        <div className={styles.package_card}>
          <div className={styles.package_status}>Renews in 23 days</div>
          <div className={styles.package_card_content}>
            <Image src="/images/sports_card_bg.png" className={styles.package_card_img} />
            <div className={styles.package_title}>
              <h3>Sports Card</h3>
              <p>Monthly Picks</p>
            </div>
            <p className={styles.package_desc}>Current record: 90-0</p>
            <Button className={styles.cta_btn}>View Picks</Button>
          </div>
        </div>
        <div className={styles.package_card}>
          <div className={styles.package_status}>Expired 2 day ago</div>
          <div className={styles.package_card_content}>
            <Image src="/images/daily_lineups_bg.png" className={styles.package_card_img} />
            <div className={styles.package_title}>
              <h3>Fantasy</h3>
              <p>Daily lineups</p>
            </div>
            <p className={styles.package_desc}>Current record: 90-0</p>
            <Button className={styles.cta_btn}>Reactivate Package</Button>
          </div>
        </div>
        <div className={styles.package_card}>
          <div className={`${styles.package_card_content} ${styles.full_height}`}>
            <Button className={styles.plus_package_btn}>
              <PlusOutlined />
            </Button>
            <h1>Add to your package</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyProTip() {
  return (
    <div className={styles.weekly_pro_tip}>
      <div className={styles.block_title}>Weekly Pro Tip</div>
      <div className={styles.block_content}>
        <p className={styles.weekly_pro_tip_intro}>MLB Preseason</p>
        <Image src="/images/badminton_player.jpg" className={styles.weekly_pro_tip_img} />
        <h4>Lorem ipsum dolor sit amet, consecteturadipiscing elit</h4>
        <p className={styles.weekly_pro_tip_desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam massa et velit enim senectus
          iaculis id. Mattis posuere vulputate habitant non massa eget cursus. Volutpat maecenas
          tristique ultricies nibh scelerisque semper. Id vel quis urna adipiscing.
        </p>
        <Link href="/">
          <a>View previous tips</a>
        </Link>
      </div>
    </div>
  );
}
