import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = "ca190fed01msh6b17c391bcf8626p1447f3jsn17cce787279f";

export default function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            "X-RapidAPI-Key":
                "ca190fed01msh6b17c391bcf8626p1447f3jsn17cce787279f",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            console.log(response.data.data);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refecth = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refecth };
}
