import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/ProductCard.scss'

const ProductCard = ({ p, show }) => {
    const [wishProducts, setWishProducts] = useState(JSON.parse(localStorage.getItem("wishList")) || []);
    const [isWished, setIsWished] = useState(wishProducts.some(item => item.productId === p.productId));
    const updateWishProducts = (product) => {
        let wishList = [...wishProducts];
        let exists = wishList.find(item => item.productId === product.productId)
        if (exists) {
            wishList = wishList.filter(item => item.productId !== exists.productId);
        }
        else {
            wishList.push(product);
        }
        localStorage.setItem("wishList", JSON.stringify(wishList));
        setWishProducts(wishList);
    }

    
    return (
        <>
            <div className='product-item' >
                <Link className="link" to={'/products/' + p.productId}>
                    <div className="image">
                        <img src='https://pos.nvncdn.com/8d4112-8686/ps/20230526_mGoGB5Zeji.jpeg' alt=''></img>
                    </div>
                </Link>
                <span className='product-name'>{p.productName}</span>
                <span className='product-price'>33,000đ</span>
                <div className='product-rating'>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
                <div className='command-line' style={{ 'display': show ? 'flex' : 'none' }}>
                    <a href='/products' className='detail btn'>SHOW MORE </a>
                    <i className={isWished ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        onClick={() => updateWishProducts(p)}></i>
                </div>
            </div>
        </>
    )
}

export default ProductCard;