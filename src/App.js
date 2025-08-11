import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [selectedKey, setSelectedKey] = useState('home');

  const menuItems = [
    { key: 'home', label: '홈' },
    { key: 'dashboard', label: '대시보드' },
    { key: 'reports', label: '리포트' },
    { key: 'settings', label: '설정' },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'home':
        return <div>환영합니다. 좌측 메뉴를 선택하세요.</div>;
      case 'dashboard':
        return <div>대시보드 콘텐츠</div>;
      case 'reports':
        return <div>리포트 콘텐츠</div>;
      case 'settings':
        return <div>설정 콘텐츠</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#5a827e' }}>
        <div style={{ height: 48, margin: 16 }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(info) => setSelectedKey(info.key)}
          items={menuItems}
          style={{ background: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px' }}>
          <span style={{ fontWeight: 600 }}>
            {menuItems.find((i) => i.key === selectedKey)?.label}
          </span>
        </Header>
        <Content style={{ margin: 16 }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: 8, minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
