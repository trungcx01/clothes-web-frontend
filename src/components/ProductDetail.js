import { useEffect, useState } from 'react'
import Clothes from '../assets/images/clothes.png'
import '../components/ProductDetail.scss'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById, fetchTop8BestSeller } from '../services/ProductService'
import Review from './Review'
import ProductCard from './ProductCard'
import Slider from 'react-slick'
const ProductDetail = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [productSize, setProductSize] = useState({});
    const [wishProducts, setWishProducts] = useState(() => JSON.parse(localStorage.getItem("wishList")) || []);
    const isWished = wishProducts.some(item => item.productId === product.productId);
    const [item, setItem] = useState({
        'productSizeId': 0,
        'quantity': 0
    })

    const [press, setPress] = useState(0);

    const [topBestSellers, setTopBestSellers] = useState([])

    const getTopBestSellers = async () => {
        try {
            const res = await fetchTop8BestSeller();
            if (res && res.data) {
                console.log(res.data);
                setTopBestSellers(res.data);
            }
        } catch (error) {
            console.log("Detected error:", error);
        }
    }
    const getProductById = async () => {
        try {
            const res = await fetchProductById(productId);
            console.log(productId)
            if (res && res.data) {
                console.log(res.data);
                setProduct(res.data)
                setProductSize(res.data.productSizes[0])
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const updateWishProducts = (product) => {
        let wishList = [...wishProducts]
        let exists = wishList.find(item => item.productId === product.productId)
        if (exists) {
            wishList = wishList.filter(item => item.productId !== exists.productId);
        }
        else {
            wishList.push(product);
        }
        setWishProducts(wishList);
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }

    const handleQuantity = (cal) => {
        setQuantity(cal === '+' ? (quantity + 1) : ((quantity === 1) ? 1 : (quantity - 1)))
    }

    const handleAddItem = () => {
        const _item = {
            "productSizeId": productSize.productSizeId,
            "quantity": quantity
        };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existsItem = cart.find((i) => i.productSizeId === productSize.productSizeId);
        if (existsItem) {
            cart = cart.filter((i) => i.productSizeId !== productSize.productSizeId);
            _item.quantity += existsItem.quantity;
        }
        cart.push(_item);
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    useEffect(() => {
        getProductById();
        getTopBestSellers();
        console.log("4k" + productId)

    }, [productId])
    return (
        <>
            <div className="product-detail">
                <div className='product'>
                    <div className="product-image">
                        <img src={Clothes}
                            width='100%'
                        ></img>
                    </div>
                    <div className="product-info">
                        <div className='nav'>
                            <Link className="home-link" to={'/'}>Home</Link>
                            <span>/</span>
                            <span>{product.productName}</span>
                        </div>
                        <div className='name-rate child'>
                            <div className='product-name'>{product.productName}</div>
                            <div className='product-rating'>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <span>    (8k+ reviews)</span>
                            </div>
                        </div>
                        <div className='child product-price'>{productSize.price}đ</div>
                        <div className='child product-description'>{product.description}
                            Đứng trên ngọn đồi hoa sim nở tím biếc, em có thể ngắm nhìn toàn cảnh ngôi làng nhỏ - quê ngoại yêu dấu của em. Đây là một ngôi làng nhỏ mang những đặc trưng thân thuộc nhất của một làng quê bắc bộ.
                        </div>
                        <div className='child product-sizes' >
                            <span>Size: </span>
                            {product.productSizes && product.productSizes.map((ps) => {
                                return (
                                    <button className='btn' style={{ 'backgroundColor': productSize.productSizeId === ps.productSizeId ? 'black' : 'white', 'color': productSize.productSizeId === ps.productSizeId ? 'white' : 'black' }}
                                        key={ps.productSizeId}
                                        onClick={() => setProductSize(ps)
                                        }>{ps.size.sizeSymbol}</button>
                                )
                            })}
                        </div>
                        <div className='child rows'>
                            <div className='quantity'>
                                <span onClick={(cal) => handleQuantity('-')}>-</span>
                                <input type='text' className='quantity-input' value={quantity}></input>
                                <span onClick={(cal) => handleQuantity('+')}>+</span>
                            </div>
                            <input onClick={() => handleAddItem()} type='button' className='btn-add' value='Add to cart'></input>
                        </div>

                        <div className='child share-wish'>
                            <div className='wish' onClick={() => updateWishProducts(product)}>
                                <i className={isWished ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                ></i>
                                <span>Add To Wishlist</span>
                            </div>

                            <div className='share'>
                                <i class="fa-solid fa-share-nodes"></i>
                                <span>Share</span>
                            </div>
                        </div>
                        <div className='child product-tag'>
                            <b>Category:</b> <span>{product.category}</span> <br />
                            <b>Age:</b> <span>{product.ageFor}</span> <br />
                            <b>Gender:</b> <span>{product.genderFor}</span> <br />
                        </div>
                    </div>
                </div>
            </div>

            <div className='line'></div>
            <div className='review-and-related'>
                <span style={{ 'backgroundColor': press === 0 ? 'black' : 'white', 'color': press === 0 ? 'white' : 'black' }}
                    onClick={() => setPress(0)}
                >Related Products</span>
                <span style={{ 'backgroundColor': press === 1 ? 'black' : 'white', 'color': press === 1 ? 'white' : 'black' }}
                    onClick={() => setPress(1)}
                >Reviews</span>
            </div>
            <div className='related-products' style={{ 'display': press === 1 ? 'none' : 'block' }}>
                <Slider {...settings} className='slider'>
                    {topBestSellers && topBestSellers.map((product) => {
                        return(
                            <ProductCard show={false} p={product}/>
                        )
                    })}
                </Slider>
            </div>
            <div className='reviews' style={{ 'display': press === 0 ? 'none' : 'block' }}>
                <Review />
            </div>

        </>
    )
}

export default ProductDetail;