import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce"
import { fetchProduct } from "../api/product";

export function ProductPriceApp() {
    const [productInput, setProductInput] = useState("")
    const [products, setProduct]: any = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [filteredData, setFilteredData]: any = useState([])
    const debounceProduct = useDebounce(productInput, 500)

    useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
    setProduct(data.data.name);
    console.log(data.data)
    setFilteredData(data.data);
    })
    .catch(err => console.error(err));
    }, [debounceProduct]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setFilteredData(products)
        setProductInput(e.target.value)
    }

    return (
        <>
            <h1>Product Price App</h1>
            <input type="text" placeholder="enter product name" value={productInput} onChange={handleOnChange}/>
            {loading && <p>Loading</p>}

            {filteredData && !loading && filteredData.price > 0 &&(
                <>
                <h2>{filteredData.name}</h2>
                <h2>RP {filteredData.price}</h2>
                </>
            )}

            {filteredData && !loading && filteredData.price === 0 &&(
                <>
                <h2>Product not found</h2>
                </>
            )}
        </>
    )
}
