export async function fetchWeather(city:string ):Promise <{city: string; temperature: number}> {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve({
                city,
                temperature:Math.floor(Math.random() * 30) + 10,
            })
        },)
    })
}