import { useState } from 'react';
import Head from 'next/head';

import { PlusIcon, MinusIcon } from '@components/SvgIcons';
import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';
import { FAQsDescPage, FAQsTitlePage } from '@constants/index';

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
        {FAQsTitlePage.map((faq: string, index: number) => (
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
            {faqIsVisible[index] && (
              <p dangerouslySetInnerHTML={{ __html: FAQsDescPage[index] }}></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FAQsPage({ token, subscriptions }: PageProps) {
  return (
    <>
      <Head>
        <title>The Daily Stakes - FAQ</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <FAQs title={'FAQ'} />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
