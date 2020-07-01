import React, { useState } from 'react';
import * as uuid from 'uuid';
import * as moment from 'moment';

import { Form, Input, PageHeader, Button } from 'antd';

const { TextArea } = Input;

function FeatureRequestForm(props) {
    
    const { onSubmit } = props;
    
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Request a new featre"
          subTitle="This will send a request to our team"
        />,
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please provide your email'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title of the feature'}]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Description"
            name="content"
            rules={[{required: true, message: 'Please provide a description for the feature'}]}>
            
            <TextArea rows={4} />
          </Form.Item>
  
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}

export default FeatureRequestForm;