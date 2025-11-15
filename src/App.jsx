import { useEffect, useState } from 'react';
import './App.css'
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchProductsToStore } from './redux/slices/productSlice.js';

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
      <div>
        <h1>DEMO</h1>
      </div>
    );
  }
}

export default App
