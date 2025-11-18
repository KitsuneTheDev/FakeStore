import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import styles from './Home.module.css';
import { Layout, Button, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, TableOutlined } from '@ant-design/icons';

export default function Home() {

    const { Sider, Header, Content } = Layout;

    const navigate = useNavigate();

    const [ collapsed, setCollapsed ] = useState(false);
    console.log(collapsed);
    return (
    <div className={styles.homeContainer}>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className={styles.antSider} >
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '16px', paddingLeft: '16px'}}>
                    <img src="/images/kitsuLogo.png" alt="site logo" width={40} />
                </div>
                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '32px'}} /> : <MenuFoldOutlined style={{ fontSize: '32px'}} /> }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        color: 'white',
                        paddingTop: '48px',
                        paddingLeft: '28px',
                    }}
                />
                <Menu
                    className={styles.menuNavbar}
                    trigger={null} 
                    mode='inline'
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    style={{ paddingTop: '8px', paddingRight: '8px' }}
                    items={[
                        {
                            key: '1',
                            label: collapsed ? <TableOutlined style={{ fontSize: '32px'}} /> : 'Products',
                            onClick: (() => navigate('/')),
                            style:{display: 'flex', alignItems: 'center', justifyContent: 'center'}
                        }, {
                            key: '2',
                            label: collapsed ? <ShoppingCartOutlined style={{ fontSize: '32px'}} /> : 'Cart',
                            onClick: (() => navigate('cart')),
                            style: {display: 'flex', justifyContent: 'center', alignItems: 'center'}
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header  
                    className={ styles.header }
                >
                    <div className={styles.headerTextContainer}>
                        <h1 style={{paddingBottom: '16px'}}>FakeStore</h1>
                    </div>
                </Header>
                <Content className={ styles.content }>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </div>
    );
}