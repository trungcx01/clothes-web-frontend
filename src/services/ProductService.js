import customizeAxios from './customize-axios';
const fetchTop8NewProduct = () =>{
    return customizeAxios.get(`/products/top-new`);
}

const fetchTop8BestSeller = () =>{
    return customizeAxios.get(`/products/top-seller`);
}

const fetchProductsWithPagination = (page, size) =>{
    return customizeAxios.get(`/products`, {
        'params':{
            'size': size,
            'page': page
        }
    });
}

const fetchProductById = (productId) =>{
    return customizeAxios.get(`/products/${productId}`);
}

const fetchProductSizeById = (productSizeId) =>{
    return customizeAxios.get(`/products/productSizes/${productSizeId}`);
}

const filterByCategory = (categories) =>{
    return customizeAxios.get(`/products/filter`, {
        'params':{
            'categories': categories
        }
    });
}
export {fetchTop8NewProduct, fetchTop8BestSeller, fetchProductById, fetchProductSizeById, fetchProductsWithPagination, filterByCategory};