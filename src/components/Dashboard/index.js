import React from 'react';

import { Layout, Menu} from 'antd';

import { auth, } from '../../firebase/config';

const { Header } = Layout;

function index(props) {
  const  {defaultSelectedKeys} = props
  console.log( defaultSelectedKeys)
  const handleLogOut = () =>{
    auth.signOut()
  }
    return (
        <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${defaultSelectedKeys}`]}>
            <Menu.Item key="1" ><a href="/">Protofile</a></Menu.Item>
            <Menu.Item key="2"><a  href="/friend">Bình luận</a></Menu.Item>
            <Menu.Item key="4" ><a href="/infor">Trang cá nhân</a></Menu.Item>
            <Menu.Item key="5" onClick={handleLogOut}>Đăng xuất</Menu.Item>
          </Menu>
        </Header>
       
      </Layout>
    );
}

export default index;