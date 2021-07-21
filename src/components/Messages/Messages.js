import React from 'react';
import { Layout } from 'antd';

const {  Content } = Layout;

function Messages(props) {
    return (
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>danh sách bạn</Breadcrumb.Item>
          <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
           đây là trang tin nhắn
        </div>
      </Content>
    );
}

export default Messages;