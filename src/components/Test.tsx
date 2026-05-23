import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce";

export function weatherApp() {
    const [cityInput, setCityInput] = useState("")
    const [weatherData, setWeatherData] = useState<{
        city: string
        temperature:number
    } | null>(null)
    const [loading, setLoading] = useState(false)
    const debouncecity = useDebounce(cityInput, 500)

    useEffect(()=> {
        if(debouncecity) {
            setLoading(true)
            
            .then
            .finaly
        }
    })
}
    