import ApiClient from "../utils/ApiClient.util"

const getAllProducts = async () => {
    const api = new ApiClient(`https://fakestoreapi.com/`);
    const response = await api.get('products');
    return response; 
}

export { getAllProducts };