import { useState } from "react"
import '../admin/Product.scss'
import Select from "react-select"
import { Table } from "react-bootstrap"


const Product = () => {
    const [category, setCategory] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [previewURL, setPreviewURL] = useState(null);
    const categoryOptions = [
        { value: "Shirt", label: "Shirt" },
        { value: "Pant", label: "Pant" },
        { value: "Dress", label: "Dress" },
        { value: "Underwear", label: "Underwear" },
        { value: "BabyClothes", label: "Baby Clothes" },
    ]

    const handleFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (file) {
            setPreviewURL(URL.createObjectURL(file))
        }
        else setPreviewURL(null)
    }
    return (
        <>
            <div className="product-admin">
                <h3>Products</h3>
                <div className="product-info">
                    <Table className="form" responsive="lg">
                        <tbody>
                            <tr>
                                <td className="col-2">Product Name</td>
                                <td className="col-9 offset-1">
                                    <input className="form-control" type="text" name="product-name"></input>
                                </td>
                            </tr>

                            <tr>
                                <td className="col-2">Category</td>
                                <td className="col-9 offset-1">
                                    <Select placeholder="" options={categoryOptions} value={category}></Select>
                                </td>
                            </tr>

                            <tr>
                                <td className="col-2">Gender</td>
                                <td className="col-9 offset-1">
                                    <div className="gender">
                                        <input type="radio" name="gender" id="male" value='male'></input>
                                        <label for="male" className="form-label">Male</label>

                                        <input type="radio" name="gender" id="female" value='female'></input>
                                        <label for="female" className="form-label">Female</label>

                                        <input type="radio" name="gender" id="unisex" value='unisex'></input>
                                        <label for="unisex" className="form-label">Unisex</label>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="col-2">Age</td>
                                <td className="col-9 offset-1">
                                    <div className="age">
                                        <input type="radio" name="age" id="baby" value='baby'></input>
                                        <label for="male" className="form-label">Male</label>

                                        <input type="radio" name="age" id="adult" value='adult'></input>
                                        <label for="female" className="form-label">Female</label>

                                        <input type="radio" name="age" id="older" value='older'></input>
                                        <label for="unisex" className="form-label">Unisex</label>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="col-2">Supplier</td>
                                <td className="col-9 offset-1">
                                    <Select placeholder="" options={categoryOptions} value={category}></Select>
                                </td>
                            </tr>

                            <tr>
                                <td className="col-2">Description</td>
                                <td className="col-9 offset-1">
                                    <textarea cols='50' rows='3'></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <div className="upload-image">
                        <div className="preview" hidden={!previewURL}>
                            <i class="fa-solid fa-xmark" onClick={() => setPreviewURL(null)}></i>
                            <img src={previewURL}></img>
                        </div>
                        <div className="drop-file" hidden={previewURL}>
                            <input id="file" type="file" accept=".jpg,.png,.pneg" defaultValue={previewURL} onChange={(e) => handleFile(e)}></input>
                            <label for="file" className="title">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                                <span>Drop a file here or click to upload</span>
                            </label>
                        </div>

                        <label for="file" className="btn btn-primary">Upload</label>
                    </div>
                </div>





                {/* <Select placeholder="Enter GenderFor" 
                options={[{value: "Male", label: "Male"},{value: "Female", label: "Female"}, {value: "Unisex", label: "Unisex"}]} value={gender}></Select>
                <Select placeholder="Enter AgeFor" 
                 options={[{value: "Baby", label: "Baby"}, {value: "Adult", label: "Adult"}, {value: "Older", label: "Older"}]} value={age}></Select> */}
            </div>
        </>
    )
}
export default Product;