import { Input, Button, Image } from 'antd';

import styles from './AppFooter.module.css';

function AppFooter() {
  return (
    <footer>
      <div className={styles.newsletterRow}>
        <div className={styles.newsletterCol}>
          <Image src="/images/logo.svg" className={styles.logo} />
          <div className={styles.newsletterFormContainer}>
            <label htmlFor="newsletter_email">Sign up for our newsletter</label>
            <div className={styles.newletterForm}>
              <Input
                id="newsletter_email"
                type="email"
                placeholder="User@fakemail.com"
                className={styles.newsletterForm_email}
              />
              <Button
                icon={<Image src="/images/arrow_forward_icon.svg" className={styles.arrow_icon} />}
                className={styles.newsletterForm_submit}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
