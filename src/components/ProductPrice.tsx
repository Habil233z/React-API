import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce"
import { fetchProduct } from "../api/product";

export function ProductPriceApp() {
    const [productInput, setProductInput] = useState("")
    const [productData, setProductData] = useState<{
        product: string,
        price: number
    } | null>(null)
    const [loading, setLoading] = useState(false)

    const debounceProduct = useDebounce(productInput, 500)

    useEffect(()=> {
        if (debounceProduct) {
            setLoading(true)
            fetchProduct(debounceProduct)
            .then((data)=> setProductData(data))
            .finally(()=> setLoading(false))
        }
    }, [debounceProduct] )
    

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductInput(e.target.value)
    }

    return (
        <>
            <h1>Product Price App</h1>
            <input type="text" placeholder="enter product name" value={productInput} onChange={handleOnChange}/>
            {loading && <p>Loading</p>}

            {productData && !loading && productData.price > 0 &&(
                <>
                <h2>{productData.product}</h2>
                <h2>RP {productData.price}</h2>
                </>
            )}

            {productData && !loading && productData.price === 0 &&(
                <>
                <h2>Product not found</h2>
                </>
            )}
        </>
    )
}
