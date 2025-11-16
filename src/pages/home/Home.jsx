import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import styles from './Home.module.css';
import { Layout, Button, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export default function Home() {

    const { Sider, Header, Content } = Layout;

    const navigate = useNavigate();

    const [ collapsed, setCollapsed ] = useState(false);
    console.log(collapsed);
    return (
    <div className={styles.homeContainer}>
        <Layout className={styles.antHomeLayout}>
            <Sider trigger={null} collapsible collapsed={collapsed} className={styles.antSider} >
                <div>LOGE HERE</div>
                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '32px'}} /> : <MenuFoldOutlined style={{ fontSize: '32px'}} /> }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        color: 'white',
                    }}
                />
                <Menu
                    trigger={null} 
                    mode='inline'
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            label: 'Products',
                            onClick: (() => navigate('/')),
                        }, {
                            key: '2',
                            label: 'Cart',
                            onClick: (() => navigate('cart'))
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header  
                    className={ styles.header }
                >
                    <div>
                        <h1>HEADER HERE</h1>
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