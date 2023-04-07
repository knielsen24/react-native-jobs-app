import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = "ca190fed01msh6b17c391bcf8626p1447f3jsn17cce787279f";

export default function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const axios = require("axios");

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
        setIsloading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsloading(false);
        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refecth = () => {
        setIsloading(true);
        fetchData();
    };

    return { data, isloading, error, refecth };
}
