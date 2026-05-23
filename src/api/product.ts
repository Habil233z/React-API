import { promise } from "./promise";

export async function fetchProduct(product:string ) {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

    const result = await response.json();
    const array = result.data
    const searchProduct = product.toLowerCase()
    const data: any = array.find(data => data.name == searchProduct)
    
    promise(data)

      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
}