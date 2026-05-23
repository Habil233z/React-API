import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce"

export function ProductPriceApp() {
    const [productInput, setProductInput] = useState("")
    const [products, setProduct]: any = useState<{
        product: string,
        price: number
    } | null>(null)
    const [loading, setLoading] = useState(false)
    const debounceProduct = useDebounce(productInput, 500)

    async function fetchProduct(product:string ):Promise <{product: string; price: number}> {
        let data: any = []
        const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/products")

            if (!response.ok) {
            throw new Error(`Fail to Fetch. Status: ${response.status}`)
            }

        const result = await response.json();
        const array = result.data
        const searchProduct = product.toLowerCase()
        data= array.find((data: { name: string; }) => data.name == searchProduct)
        } catch (err) {
            console.log(err)
        }
        };

        fetchData();
        return new Promise((resolve) => {
            setTimeout(()=> {
            console.log(data)
            if (data === undefined) {
                resolve({
                product: "test",
                price: 0,
                })
            } else {
            resolve({
                product: data.name,
                price: data.price,
                })
            }}, 2000)
            })}

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
                <h2>{products.product}</h2>
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
