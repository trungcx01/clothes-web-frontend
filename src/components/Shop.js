import { useEffect, useState } from 'react';
import FilterIcon from '../assets/images/filter.png'
import '../components/Shop.scss'
import { fetchProductsWithPagination, filterByCategory } from '../services/ProductService';
import ProductCard from './ProductCard';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [priceRanges, setPriceRanges] = useState([])
    const [categories, setCategories] = useState([]);
    const [stock, setStock] = useState('');

    const getAllProducts = async () => {
        try {
            const res = await fetchProductsWithPagination(0, 20);
            if (res && res.data) {
                setProducts(res.data.content);
                console.log(res.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const fetchByCategory = async() =>{
        try {
            const res = await filterByCategory(['Underwear']);
            if (res && res.data) {
                console.log('ok' + res.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleSortAndFilter = (e) => {
        if (e.target.name === 'stock') {
            console.log(e.target.value);
            setStock(e.target.value);
        }
        setCategories(prev => {
            if (e.target.name === 'category') {
                if (e.target.checked) {
                    return [...prev,e.target.value]
                }
                else {
                    return prev.filter(x => x !== e.target.value)
                }
            }
            return prev;
            
        })
        setPriceRanges(prev =>{
            if (e.target.name === 'price-range'){
                if (e.target.checked) {
                    return [...prev,e.target.value]
                }
                else {
                    return prev.filter(x => x !== e.target.value)
                }
            }
            return prev;
        })
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
       if (categories){
        fetchByCategory();
       }
    }, [categories]);

    return (
        <>
            <div className="shop">
                <div className="condition">
                    <div className="filter">
                        <img src={FilterIcon} width='30px' height='30px'></img>
                        <span>FILTER BY</span>
                    </div>

                    <div className='line'></div>
                    <div className='availability'>
                        <span>AVAILABILITY</span>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="all" id="all" name='stock' onChange={(e) => handleSortAndFilter(e)} checked={stock === 'all'} />
                            <label class="form-check-label" for="all">
                                All
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="in" id="in-stock" name='stock' onChange={(e) => handleSortAndFilter(e)} checked={stock === 'in'} />
                            <label class="form-check-label" for="in-stock">
                                In Stock
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="out" id="out-of-stock" name='stock' onChange={(e) => handleSortAndFilter(e)} checked={stock === 'out'} />
                            <label class="form-check-label" for="out-of-stock">
                                Out Of Stock
                            </label>
                        </div>
                    </div>
                    <div className='line'></div>
                    <div className='product-type'>
                        <span>PRODUCT TYPE</span>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Shirt" name="category" id="shirt" onChange={(e) => handleSortAndFilter(e)} checked={categories ? categories.includes('Shirt') : false} />
                            <label class="form-check-label" for="shirt">
                                Shirts
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Dress" id="dress" name="category" onChange={(e) => handleSortAndFilter(e)} checked={categories ? categories.includes('Dress') : categories} />
                            <label class="form-check-label" for="dress">
                                Dresses
                            </label>
                        </div>

                        <div class="form-check" >
                            <input class="form-check-input" type="checkbox" value="Pant" id="pant" name="category" onChange={(e) => handleSortAndFilter(e)} checked={categories ? categories.includes('Pant') : false} />
                            <label class="form-check-label" for="pant">
                                Pants
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Underwear" name="category" id="underwear" onChange={(e) => handleSortAndFilter(e)} checked={categories ? categories.includes('Underwear') : false} />
                            <label class="form-check-label" for="underwear">
                                Underwears
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Baby Clothes" name="category" id="baby-clothes" onChange={(e) => handleSortAndFilter(e)} checked={categories ? categories.includes('Baby Clothes') : false} />
                            <label class="form-check-label" for="baby-clothes">
                                Baby Clothes
                            </label>
                        </div>
                    </div>
                    <div className='line'></div>
                    <div className='price'>
                        <span>PRICE</span>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name='price-range' value="0-20000" id="price-range-1" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("0-20000") : false} />
                            <label class="form-check-label" for="price-range-1">
                                0-20,000đ
                            </label>
                        </div>

                        <div class="form-check" >
                            <input class="form-check-input" type="checkbox" name='price-range' value="20000-50000" id="price-range-2" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("20000-50000") : false} />
                            <label class="form-check-label" for="price-range-2">
                                20,000-50,000đ
                            </label>
                        </div>

                        <div class="form-check" >
                            <input class="form-check-input" type="checkbox" name='price-range' value="50000-100000" id="price-range-3" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("50000-100000") : false}/>
                            <label class="form-check-label" for="price-range-3">
                                50,000-100,000đ
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name='price-range' value="100000-200000" id="price-range-4" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("100000-200000") : false}/>
                            <label class="form-check-label" for="price-range-4">
                                100,000-200,000đ
                            </label>
                        </div>

                        <div class="form-check" >
                            <input class="form-check-input" type="checkbox" name='price-range' value="200000-500000" id="price-range-5" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("200000-500000") : false}/>
                            <label class="form-check-label" for="price-range-5">
                                200,000-500,000đ
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name='price-range' value="500000-" id="price-range" onChange={(e) => handleSortAndFilter(e)} checked={priceRanges ? priceRanges.includes("500000-") : false} />
                            <label class="form-check-label" for="price-range">
                                500,000đ+
                            </label>
                        </div>
                    </div>
                </div>

                <div className='products-condition'>
                    <div className='sort-by'>

                        <div className='select-box' >
                            <select id='select-sort'>
                                <option value=''>Default Sorting</option>
                                <option value=''>Default</option>
                                <option value=''>Default</option>
                                <option value=''>Default</option>
                            </select>
                            <label for='select-sort' className='icon-container'>
                                <i class="fa-solid fa-caret-down"></i>
                            </label>
                        </div>

                    </div>
                   
                </div>


            </div>
        </>
    )
}
export default Shop;