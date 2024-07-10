import customizeAxios from './customize-axios';

const addNewOrder = (order) =>{
    return customizeAxios.post('/orders', order);
}

export {addNewOrder};