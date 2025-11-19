import styles from './Products.module.css';
//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsToStore } from '../../redux/slices/productSlice.js';
import { useEffect } from 'react';
import ProductCard from '../../component/ProductCard.jsx';

export default function Products() {
    
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.productReducer);

    useEffect(() => {
        dispatch(fetchProductsToStore()).then((result) => {
            if(result.payload) {
                // console.log(result.payload);
            } else {
                console.error(result);
            }
        })
    }, [dispatch]);

    if(loading) return(
        <div>
            <h1>Loading...</h1>
        </div>
    );

    if(products === null || products.length === 0) {
        return(
            <div>
                <h1>No products to display</h1>
            </div>
        );
    }

    return( 
        products.map((product, index) => <ProductCard product={product} key={index} />)
    );
}