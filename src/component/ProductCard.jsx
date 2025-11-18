import { MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.css';
import { Card } from 'antd';

export default function ProductCard({ product }) {

    const { Meta } = Card;

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
                    <div className={styles.cardActionsCustom}>
                        <MinusCircleOutlined style={{ fontSize: 24 }} key="decrease" />
                        <ShoppingCartOutlined style={{ fontSize: 24 }} key="add" />
                        <PlusCircleOutlined style={{ fontSize: 24 }} key="increase" />
                    </div>
                ]}
                
            >
                <Meta
                    title={product.title}
                    description={product.description}
                />
        </Card>
    );
}