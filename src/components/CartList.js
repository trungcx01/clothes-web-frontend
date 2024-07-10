import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchProductSizeById } from "../services/ProductService";
import Clothes1 from '../assets/images/clothes.png'
import '../components/CartList.scss'
import '../components/Checkout.scss'

const CartList = ({check, order}) => {
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem("cart")));
    const [items, setItems] = useState([]);

    const fetchProductSizes = async (cart) => {
        const _items = []
        for (const item of cart) {
            const _item = {
                "productSize": {},
                "quantity": item.quantity
            }
            try {
                const res = await fetchProductSizeById(item.productSizeId);
                if (res && res.data) {
                    _item.productSize = res.data;
                }
            } catch (error) {
                console.log("Error: ", error);
            }
            _items.push(_item);
        }
        setItems(_items);
    }

    const handleQuantity = (cal, item) => {
        const new_cart = [...cart];
        const cart_index = new_cart.findIndex(i => i.productSizeId === item.productSize.productSizeId);
        new_cart[cart_index].quantity = (cal === '+' ? (item.quantity + 1) : Math.max(1, item.quantity - 1));
        setCart(new_cart);
        localStorage.setItem("cart", JSON.stringify(new_cart));
    }

    const handleDeleteItem = (item) => {
        const new_cart = [...cart].filter(i => i.productSizeId !== item.productSize.productSizeId);
        setCart(new_cart);
        localStorage.setItem("cart", JSON.stringify(new_cart));
    }
    useEffect(() => {
        if (cart) {
            fetchProductSizes(cart);
        }
    }, [cart]);


    return (
        <>
            <div className='cart-list'>
                <Table className='cart' responsive="lg">
                    <tbody>
                        <tr>
                            <th className='col-6'>Product</th>
                            <th className='col-2'>Price</th>
                            <th className='col-2'>Quantity</th>
                            <th className='col-2'>Subtotal</th>
                            <th></th>
                        </tr>
                        {items && items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='productSize'>
                                        <div className='productSize-img'>
                                            <img src={Clothes1} height="150px" width="130px" alt={item.productSize.product.productName}></img>
                                        </div>
                                        <div className='productSize-detail'>
                                            <span>{item.productSize.product.productName}</span>
                                            <span>Size: {item.productSize.size.sizeSymbol}</span>
                                        </div>
                                    </td>
                                    <td>{item.productSize.price}</td>
                                    <td>
                                        <div className='quantity'>
                                            <span onClick={check ? () => handleQuantity('-', item) : null}>-</span>
                                            <input type='text' className='quantity-input' value={item.quantity}></input>
                                            <span onClick={check ? () => handleQuantity('+', item) : null}>+</span>
                                        </div>
                                    </td>
                                    <td>{item.quantity * item.productSize.price}</td>
                                    <td><i style={!check ? {display: 'none'} : {} } className="fa-solid fa-xmark" onClick={() => handleDeleteItem(item)}></i></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <div className='subtotal' style={check ? {} : {display: 'none'}}>
                    <div className='subtotal-title'>
                        <span>SUBTOTAL</span>
                    </div>
                    <div className='subtotal-value'>
                        <span>120,000 dong</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartList;