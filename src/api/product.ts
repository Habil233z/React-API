export async function fetchProduct(product:string ):Promise <{product: string; price: number}> {
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
    console.log(data)

    if (data === undefined) {
        return new Promise((resolve) => {
        setTimeout(()=> {
            resolve({
                product: "test",
                price: 0,
            })
        }, 2000)
    })
    } else {
        return new Promise((resolve) => {
        setTimeout(()=> {
            resolve({
                product: data.name,
                price: data.price,
            })
        }, 2000)
    })
    }
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();

}