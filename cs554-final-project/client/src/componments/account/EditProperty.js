import React, {Component, useContext, useState} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
// import Select from 'react-select';


export default EditProperty = () => {
    const { currentUser } = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false)
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const {data: resData} = await serverController.getWatchlist(currentUser)
                console.log(resData.details)
                setProperties(resData.details)
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    },
    []);

    const editProperty = async (event) => {
        event.preventDefault();
    }
}