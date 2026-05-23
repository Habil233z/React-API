import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce"

export function ProductPriceApp() {
    const [productInput, setProductInput] = useState("")
    const [products, setProduct]: any = useState<{
        product: string,
        price: number,
        category: string
    } | null>(null)
    const [loading, setLoading] = useState(false)
    const debounceProduct = useDebounce(productInput, 500)

    async function fetchProduct(product:string ):Promise <{product: string; price: number; category: string}> {
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
                category: "null"
                })
            } else {
            resolve({
                product: data.name,
                price: data.price,
                category: data.category
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
            <input type="text" placeholder="Enter product name" value={productInput} onChange={handleOnChange}/>
            <div className="searchResult">
            {!loading && !products &&(
                <div>
                <h2>Welcome to Product Price Finder</h2>
                </div> 
            )}

            {loading && <h3>Loading</h3>}

            {products && !loading && products.price > 0 &&(
                <div className="productContainer">
                <h2>{products.product.charAt(0).toUpperCase() + products.product.slice(1)}</h2>
                <p>{products.category}</p>
                <h2>RP {products.price}</h2>
                </div>
            )}

            {products && !loading && products.price === 0 &&(
                <>
                <h2>Product not found</h2>
                </>
            )}
            </div>
        </>
    )
}
