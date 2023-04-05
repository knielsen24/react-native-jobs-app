import { useState, useEff } from "react";
import axios from "axios";

const useFetch = () => {
    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)
}
