export async function promise(data):Promise <{product: string; price: number}> {
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
}