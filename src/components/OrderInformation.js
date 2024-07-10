import { Table } from "react-bootstrap"
import '../components/OrderInformation.scss'
import { useEffect, useState } from "react"
import { values } from "lodash";
import { fetchAllDistricts, fetchAllProvinces, fetchAllVillages } from "../services/OtherService";

const OrderInformation = ({ check, onOrderInfoChange, order }) => {
    const [listProvinces, setListProvinces] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listVillages, setListVillages] = useState([]);
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [orderInfo, setOrderInfo] = useState({});

    const handleOrderInfo = (e) => {
        setOrderInfo((prevOrderInfo) => {
            if (e.target.name === 'province'){
                const selectedOption = e.target.options[e.target.selectedIndex];
                setProvinceId(selectedOption.dataset.provinceId);
            }
            else if (e.target.name === 'district'){
                const selectedOption = e.target.options[e.target.selectedIndex];
                setDistrictId(selectedOption.dataset.districtId);
            }
            return {
                ...prevOrderInfo,
                [e.target.name]: e.target.value,
            }
        })
    };

    useEffect(() =>{
        const fetchProvinces = async() =>{
            try {
                const res = await fetchAllProvinces();
                if (res.data && res.data.data){
                    setListProvinces(res.data.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchProvinces();
    }, [])

    useEffect(() =>{
        const fetchDistricts = async() =>{
            try {
                const res = await fetchAllDistricts(provinceId);
                if (res.data && res.data.data){
                    
                    setListDistricts(res.data.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        if (provinceId !== ''){
            fetchDistricts();
        }
    }, [provinceId])

    useEffect(() =>{
        const fetchVillages = async() =>{
            console.log("ok" , districtId);
            try {
                const res = await fetchAllVillages(districtId);
                if (res.data && res.data){
                    setListVillages(res.data.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        if (districtId !== ''){
            fetchVillages();
        }
    }, [districtId]);

    useEffect(() => {
        if (typeof onOrderInfoChange === 'function') {
            onOrderInfoChange(orderInfo);
        } else {
            console.error('onOrderInfoChange is not a function');
        }
    }, [orderInfo, onOrderInfoChange])


    return (
        <>
            <div className='form'>
                <p>ORDER INFORMATION</p>
                <Table responsive="lg" className='table-confirmation'>
                    <tbody>
                        <tr>
                            <td>ORDER NOTE</td>
                            <td>
                                <textarea disabled={check} className='form-control' placeholder='Order Note' value={order ? order.note : null}
                                    rows='4' cols='45' name="note" onChange={(e) => handleOrderInfo(e)}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>ADDRESS</td>


                            <td className='address-form'>
                                <select disabled={check} className='form-select province' name="province" onChange={(e) => handleOrderInfo(e)}
                                    value={order && order.shippingAddress ? order.shippingAddress.split(', ')[3] : null}>
                                    <option value='' data-province-id=''>Province/City</option>
                                    {listProvinces && listProvinces.map((province, index) =>{
                                        return (
                                            <option key={index} data-province-id={province.ProvinceID} value={province.ProvinceName}>{province.ProvinceName}</option>
                                        )
                                    })}
                                </select>

                                <select disabled={check} className='district form-select' name="district" onChange={(e) => handleOrderInfo(e)}
                                    value={order && order.shippingAddress ? order.shippingAddress.split(', ')[2] : null}>
                                    <option value='' data-district-id=''>District/Town</option>
                                    {listDistricts && listDistricts.map((district, index) =>{
                                        return (
                                            <option key={index} data-district-id={district.DistrictID} value={district.DistrictName}>{district.DistrictName}</option>
                                        )
                                    })}
                                </select>

                                <select disabled={check} className='village form-select' name="village" onChange={(e) => handleOrderInfo(e)}
                                    value={order && order.shippingAddress ? order.shippingAddress.split(', ')[1] : null}>
                                    <option value='' data-village-id=''>Sub-district/Village</option>
                                    {listVillages && listVillages.map((village, index) =>{
                                        return (
                                            <option key={index} data-village-id={village.WardID} value={village.WardName}>{village.WardName}</option>
                                        )
                                    })}
                                </select>
                                <textarea disabled={check} className='street form-control' rows='2' cols='40'
                                    value={order && order.shippingAddress ? order.shippingAddress.split(', ')[0] : null}
                                    name='street' placeholder='Street Address' onChange={(e) => handleOrderInfo(e)}></textarea>
                            </td>



                        </tr>

                        <tr>
                            <td className='col-3'>SHIPPING METHOD</td>
                            <td className='shipping-methods col-12'>
                                <div className='fast-delivery'>
                                    <input readOnly={check} type='radio' id='fast-delivery' value='FastDelivery' 
                                        checked={order ? (order.shippingMethod === 'FastDelivery' ? true : false) : null}
                                        name='shippingMethod' onClick={(e) => handleOrderInfo(e)}></input>
                                    <label for='fast-delivery'>Fast Delivery</label>
                                </div>

                                <div className='standart-delivery'>
                                    <input readOnly={check} type='radio' id='standart-delivery' value='StandartDelivery'
                                        checked={order ? (order.shippingMethod === 'StandartDelivery' ? true : false) : null}
                                        name='shippingMethod' onClick={(e) => handleOrderInfo(e)}></input>
                                    <label for='standart-delivery'>Standart Delivery</label>
                                </div>

                                <div className='economical-delivery'>
                                    <input readOnly={check} type='radio' id='economical-delivery' value='EconomicalDelivery'
                                        checked={order ? (order.shippingMethod === 'EconomicalDelivery' ? true : false) : null}
                                        name='shippingMethod' onClick={(e) => handleOrderInfo(e)}></input>
                                    <label for='economical-delivery'>Economical Delivery</label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>PHONE</td>
                            <td>
                                <input disabled={check} type='text' className='form-control' value={order ? order.phoneNumber : null}
                                    placeholder='Phone Number' name="phoneNumber" onChange={(e) => handleOrderInfo(e)}></input>
                            </td>
                        </tr>

                        <tr>
                            <td>SHIPPING FEE</td>
                            <td>120,000 dong</td>
                        </tr>

                        <tr>
                            <td>TOTAL</td>
                            <td>120,000 dong</td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default OrderInformation;