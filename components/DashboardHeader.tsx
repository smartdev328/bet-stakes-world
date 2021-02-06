import { Row, Button, Col } from 'antd';

import { ThickStarIcon } from '@components/SvgIcons';
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
            </Row>
          </Col>
        </Row>
      </Col>
      {/* <Col span={12} className={styles.right}>
        <Button className={styles.sms_send_btn}>
          <MobilePhoneIcon className={styles.mobile_phone_icon} />
          Receive alerts via text!
        </Button>
      </Col> */}
    </Row>
  );
};

export default DashboardHeader;
