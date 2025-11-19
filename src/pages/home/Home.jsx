import { useCallback, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import styles from './Home.module.css';
import { Layout, Button, Menu, Card } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, TableOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export default function Home() {

    const { Sider, Header, Content } = Layout;
    const { Meta } = Card;

    const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
    const cartDetailRef = useRef(); 
    const navigate = useNavigate();

    const [ collapsed, setCollapsed ] = useState(false);
    console.log(collapsed);

    const openCartDetail = (event) => {
        event.stopPropagation();
        cartDetailRef.current.style.display = 'flex';
    }

    const closeCartDetail = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target !== cartDetailRef.current);
        if(!event) return;
        if(event.target !== cartDetailRef.current) {
            cartDetailRef.current.style.display = 'none';
        }
    }

    return (
    <div className={styles.homeContainer}>
        <Layout className={styles.antMainLayout}>
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
            <Layout className={styles.antRightLayout}>
                <Header  
                    className={ styles.header }
                >
                    <div className={styles.headerTextContainer}>
                        <h1 style={{paddingBottom: '16px'}}>FakeStore</h1>
                    </div>
                    <div className={styles.headerCartContainer} onMouseEnter={(event) => openCartDetail(event)}>
                        <ShoppingCartOutlined style={{color: '#f0f0f0'}} />
                        <div className={styles.headerCartIndicator}>
                            {cartProducts.reduce((acc, current) => {
                                return acc += current.count;
                            }, 0)}
                        </div>

                    </div>
                    <div className={styles.cartDetailContainer} ref={cartDetailRef} onMouseLeave={(event) => closeCartDetail(event)}>
                        <Layout
                            className={styles.cartDetailLayout}
                        >
                            {cartProducts.map((product, index) => {
                                return(
                                    <Card 
                                        key={index}
                                        className={styles.cartDetailCard}
                                        cover={
                                            <div className={styles.cartCover}>
                                                <img
                                                    className={styles.cartCoverImg}
                                                    src={product.image}
                                                    alt={product.title}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={product.title}
                                            description={product.count}
                                        />
                                    </Card>
                                );
                            })}
                        </Layout>
                    </div>
                </Header>
                <Content className={ styles.antContent }>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </div>
    );
}