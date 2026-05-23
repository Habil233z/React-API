import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce"
import { fetchProduct } from "../api/product";

export function ProductPriceApp() {
    const [productInput, setProductInput] = useState("")
    const [products, setProduct]: any = useState<{
        product: string,
        price: number
    } | null>(null)
    const [loading, setLoading] = useState(false)
    const debounceProduct = useDebounce(productInput, 500)

    useEffect(() => {
    if (debounceProduct) {
        setLoading(true)
        fetchProduct(debounceProduct)
        .then((data)=> setProduct(data))
        .finally(()=> setLoading(false))
    }
    }, [debounceProduct]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductInput(e.target.value)
    }

    return (
        <>
            <h1>Product Price App</h1>
            <input type="text" placeholder="enter product name" value={productInput} onChange={handleOnChange}/>
            {loading && <p>Loading</p>}

            {products && !loading && products.price > 0 &&(
                <>
                <h2>{products.name}</h2>
                <h2>RP {products.price}</h2>
                </>
            )}

            {products && !loading && products.price === 0 &&(
                <>
                <h2>Product not found</h2>
                </>
            )}
        </>
    )
}
