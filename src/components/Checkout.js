import { Table } from 'react-bootstrap';
import '../components/Checkout.scss'
import { useEffect, useState } from 'react';
import { fetchProductSizeById } from '../services/ProductService';
import Clothes1 from '../assets/images/clothes.png'
import CartList from './CartList';
import OrderInformation from './OrderInformation';
import { addNewOrder } from '../services/OrderService';
const Checkout = () => {
    const [isLineVisible, setIsLineVisible] = useState(false);
    const [isCheckOutVisible, setIsCheckOutVisible] = useState(true);
    const [isBillVisible, setIsBillVisible] = useState(false);
    const [order, setOrder] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderInfo, setOrderInfo] = useState(null)
    const handlePlaceOrder = async () => {
        setIsLineVisible(true);
        setIsCheckOutVisible(false);
        setIsBillVisible(true)

        try {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            const order = {
                "items": items,
                "phoneNumber": orderInfo.phoneNumber,
                "shippingAddress": orderInfo.street + ", " + orderInfo.village + ", " + orderInfo.district + ", " + orderInfo.province,
                "shippingMethod": orderInfo.shippingMethod,
                "paymentMethod": paymentMethod,
                "note": orderInfo.note,
            }
            const res = await addNewOrder(order);
            if (res && res.status === 200) {
                console.log("Successfully placed order!", res.data);
                setOrder(res.data);
                localStorage.removeItem('cart');
            }
        } catch (error) {
            console.log("Error placing order!", error);
        }

    }

    const handleOrderInfo = (data) => {
        setOrderInfo(data)
    };

    useEffect(() => {
        console.log(orderInfo);
    }, [orderInfo])

    useEffect(() => {
        console.log(order);
    }, [order])
    return (
        <>
            <div className="checkout-page">
                <div className="title">
                    <div className='checkout-title' >
                        <h4>
                            <span>01</span>
                            <span>Checkout cart</span>
                        </h4>
                        <p>Manage and checkout your cart</p>
                        <div className='line'></div>
                    </div>
                    <div className='bill-title'>
                        <h4>
                            <span>02</span>
                            <span>Order Detail</span>
                        </h4>
                        <p>Review and follow your order</p>
                        <div className='line' style={isLineVisible ? { backgroundColor: 'black' } : { backgroundColor: '#e6e2e2' }}></div>
                    </div>
                </div>

                <div className='checkout-cart' style={isCheckOutVisible ? { display: 'grid' } : { display: 'none' }}>
                    <CartList check={true}></CartList>
                    <div className='cart-info'>
                        <OrderInformation check={false} onOrderInfoChange={handleOrderInfo} />
                        <div className='payment-method'>
                            <div className='method'>
                                <div className='bank-transfer'>
                                    <input type='radio' id='bank-transfer' name='payment-method' onClick={() => setPaymentMethod('BankTransfer')}></input>
                                    <label for='bank-transfer'>Bank Transfer</label>
                                </div>
                                <div className='detail'>Make your payment directly into our bank account. Please use your Order ID as the payment reference.Your order will not be shipped until the funds have cleared in our account.</div>
                            </div>
                            <div className='method'>
                                <div className='cash'>
                                    <input type='radio' id='cash' name='payment-method' onClick={() => setPaymentMethod('Cash')}></input>
                                    <label for='cash'>Cash</label>
                                </div>
                                <div className='detail'>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</div>
                            </div>
                            <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                        </div>

                        <div className='place-order' onClick={() => handlePlaceOrder()}>
                            PLACE ORDER
                        </div>
                    </div>


                </div>

                <div className='bill-detail' style={isBillVisible ? { display: 'block' } : { display: 'none' }}>
                    <div className='thank-you'>
                        <i className="fa-solid fa-circle-check"></i>
                        <span>Your order is completed!</span>
                        <span className='detail'>Thank you. Your order has been received.</span>
                    </div>

                    <div className='bill'>
                        <div className='bill-info'>
                            <div className='order-id'>
                                <p>Order ID</p>
                                <p className='value'>{order.orderId}</p>
                            </div>
                            <div className='date'>
                                <p>Date</p>
                                <p className='value'>{order.createdAt}</p>
                            </div>
                            <div className='payment-method'>
                                <p>Payment Method</p>
                                <p className='value'>{order.paymentMethod}</p>
                            </div>
                            <div className='order-status'>
                                <p>Order Status</p>
                                <p className='value'>{order.orderStatus}</p>
                            </div>
                        </div>

                        <div className='cart-list-bill'>
                            <CartList check={false} className='cart-list'></CartList>
                        </div>
                        <div className='order-info'>
                            <OrderInformation check={true} order={order}></OrderInformation>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
export default Checkout;