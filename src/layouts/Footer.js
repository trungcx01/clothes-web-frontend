import '../layouts/Footer.scss'
import ShopeeIcon from '../assets/images/shopee.png'
const Footer = () => {
    return (
        <>
            <div className='footer-page'>
                <div className='email'>
                    <div className='received-message container'>
                        <div className='social-media'>
                            <div className='media'>
                                <i class="fa-brands fa-facebook-f fa-lg"></i>
                            </div>
                            <div className='media'>
                                <i class="fa-brands fa-instagram fa-lg"></i>
                            </div>
                            <div className='media'>
                                <i class="fa-brands fa-tiktok fa-lg"></i>
                            </div>
                            <div className='media'>
                                <img src={ShopeeIcon} width='19px' height='19px'></img>
                            </div>
                        </div>
                        <div className='noti-title'>
                            <b>NHẬN THÔNG TIN KHUYẾN MÃI TỪ CHÚNG TÔI</b>
                        </div>
                        <div className='fill-email'>
                            <input className='form-control' type='text' placeholder='Nhập email để nhận ưu đãi..'></input>
                            <a className='btn btn-success' >Đăng kí</a>
                        </div>
                    </div>
                </div>
                <div className='footer-line'>
                    <div className="footer container">
                        <div className="info company">
                            <div className="title">Company</div>
                            <div className="line"></div>
                            <div className="link">About us</div>
                            <div className="link">Our Service</div>
                            <div className="link">Privacy Policy</div>
                            <div className="link">Affiliate</div>
                        </div>

                        <div className="info get-help">
                            <div className="title">Get Help</div>
                            <div className="line"></div>
                            <div className="link">FAQ</div>
                            <div className="link">Shipping</div>
                            <div className="link">Order Status</div>
                            <div className="link">Payment Options</div>
                            <div className="link">Returns</div>
                        </div>

                        <div className="info online-shop">
                            <div className="title">Products</div>
                            <div className="line"></div>
                            <div className="link">Shirts</div>
                            <div className="link">Pants</div>
                            <div className="link">Dresses</div>
                        </div>

                        <div className="info follow-us">
                            <div className="title">Follow Us</div>
                            <div className="line"></div>
                            <div className="social-media">
                                <div className="icon">
                                    <i class="fa-brands fa-facebook"></i>
                                </div>
                                <div className="icon">
                                    <i class="fa-brands fa-instagram"></i>
                                </div>
                                <div className="icon">
                                    <i class="fa-brands fa-twitter"></i>
                                </div>
                                <div className="icon">
                                    <i class="fa-brands fa-telegram"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='copyright'>
                    Copyright ⓒ 2024 Living Trunk || All Rights Reversed
                </div>

            </div>
        </>
    )
}

export default Footer;