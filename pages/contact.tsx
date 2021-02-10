import Head from 'next/head';
import { AppLayout } from '@components/index';
import { PageProps } from '@type/Main';
import styles from '@styles/Static.module.css';
import React from 'react';
import { Button, Form, Input } from 'antd';

export default function Contact({ token, subscriptions }: PageProps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!'
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Terms</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h4>Contact Us</h4>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}>
              <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[{ type: 'email', required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['user', 'message']} label="Message" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className={styles.registerBtn} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
