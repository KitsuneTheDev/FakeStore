import { MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.css';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/slices/cartSlice.js';

export default function ProductCard({ product }) {

    const { Meta } = Card;
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
    return(
        <Card 
            className={styles.productCard}
            cover={
                <div className={styles.cardCoverCustom}>
                    <img
                        className={styles.cardImage}
                        draggable={false}
                        alt={product.title}
                        src={product.image}
                    />
                </div>}
                actions={[
                    <div className={styles.antCardActionsCustom}>
                        <MinusCircleOutlined style={{ fontSize: 24 }} key="decrease" onClick={() => dispatch(deleteFromCart(product))} />
                        {cartProducts.find(p => p.id === product.id)?.count || '0'}
                        <PlusCircleOutlined style={{ fontSize: 24 }} key="increase" onClick={() => dispatch(addToCart(product))} />
                    </div>
                ]}
                
            >
                <Meta
                    title={product.title}
                    description={product.description}
                    className={styles.antCardTitle}
                />
        </Card>
    );
}