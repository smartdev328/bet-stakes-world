import { Row, Button, Col } from 'antd';

import {
  ThickStarIcon,
  CaretDownInCircleIcon,
  ConfigIcon,
  MobilePhoneIcon
} from '@components/SvgIcons';
import styles from './DashboardHeader.module.css';

type DashboardHeaderPropsType = {
  title: string;
};

const DashboardHeader = ({ title }: DashboardHeaderPropsType) => {
  return (
    <Row className={styles.topSection}>
      <Col span={12} className={styles.left}>
        <Row>
          <Col span={24}>
            <Row align={'middle'}>
              <Button ghost className={styles.thick_star_btn}>
                <ThickStarIcon className={styles.thick_star_icon} />
              </Button>
              <span>{title}</span>
              <Button ghost className={styles.caret_down_btn}>
                <CaretDownInCircleIcon className={styles.caret_down_icon} />
              </Button>
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
  );
};

export default DashboardHeader;
