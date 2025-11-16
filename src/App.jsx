import { useEffect, useState } from 'react';
//router imports
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchProductsToStore } from './redux/slices/productSlice.js';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Products from './pages/Products/Products.jsx';

function App() {

  const [savedProducts, setSavedProducts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsToStore()).then((result) => {
      if(result.payload) {
        console.log(result.payload);
        setSavedProducts(result.payload);
      } else {
        console.error(result);
      }
    });
  }, [dispatch])

  const { loading, products, error } = useSelector((state) => state.productReducer);

  if(loading){
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if(error) {
    return(
      <div>
        <h1>{error}</h1>
      </div>
    );
  } else {
    console.log(savedProducts);
    return( 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route index element={<Products />} />
            <Route path='cart' element={<Cart />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
  }
}

export default App
