export async function fetchProduct(product:string ):Promise <{product: string; price: number}> {

    const data = ([
        {
            name: "tv",
            price: 80000000
        },
        {
            name: "bike",
            price: 800000
        },
        {
            name: "freezer",
            price: 3000000
        },
        {
            name: "laptop",
            price: 10000000
        }
    ])
    const searchProduct = product.toLowerCase()
    const result: any = data.find(data => data.name == searchProduct)

    if (result === undefined) {
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
                product: result.name,
                price: result.price,
            })
        }, 2000)
    })
    }
}