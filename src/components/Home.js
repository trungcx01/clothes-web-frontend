import Banner from '../assets/images/banner.jpg'
import Shirt from '../assets/images/shirt.png'
import Pant from '../assets/images/pant.png'
import Dress from '../assets/images/dress.png'
import Underwear from '../assets/images/underwear.png'
import BabyClothes from '../assets/images/babyclothes.png'

import '../components/Home.scss';
import { useEffect, useState } from 'react'
import { fetchTop8BestSeller, fetchTop8NewProduct } from '../services/ProductService'
import ProductCard from './ProductCard'

const Home = () => {
    const [topBestSellers, setTopBestSellers] = useState([])
    const [topNewProducts, setTopNewProducts] = useState([])
    const [isShowModalAddCart, setIsShowModalAddCart] = useState(false);

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

    const getTopNewProducts = async () => {
        try {
            const res = await fetchTop8NewProduct();
            console.log(res);
            if (res && res.data) {
                console.log(res.data);
                setTopNewProducts(res.data);
            }
        } catch (error) {
            console.log("Detected error:", error);
        }
    }


    useEffect(() => {
        getTopBestSellers();
        getTopNewProducts();
    }, [])
    return (
        <>
            <div className='homepage mt-3'>
                <div className='banner d-flex'>
                    <img src={Banner} alt='banner' />
                </div>

                <div className='featured-categories'>
                    <div className='title'>
                        Feature Category
                    </div>
                    <div className='categories'>
                        <div className='category'>
                            <img src={Shirt} width="90px" height="90px" alt='' />
                            <span>Shirt</span>
                        </div>

                        <div className='category'>
                            <img src={Pant} width="90px" height="90px" alt='' />
                            <span>Pant</span>
                        </div>

                        <div className='category'>
                            <img src={Dress} width="90px" height="90px" alt='' />
                            <span>Dress</span>
                        </div>

                        <div className='category'>
                            <img src={Underwear} width="90px" height="90px" alt='' />
                            <span>Underwear</span>
                        </div>

                        <div className='category'>
                            <img src={BabyClothes} width="90px" height="90px" alt='' />
                            <span>Baby Clothes</span>
                        </div>
                    </div>
                </div>


                <div className='new-product'>
                    <div className='title'>
                        New Product
                    </div>
                    <div className='products_'>
                        {topNewProducts && topNewProducts.map((p, index) => {
                            return (
                                <ProductCard key={index} p={p} show={true} />
                            );
                        })}
                    </div>
                </div>


                <div className='top-product'>
                    <div className='title'>
                        Top Product
                    </div>
                    <div className='products_'>
                        {topBestSellers && topBestSellers.map((p, index) => {
                            return (
                                <ProductCard key={index} p={p} show={true} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;