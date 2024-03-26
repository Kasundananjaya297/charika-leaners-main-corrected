import React, {useEffect, useState} from 'react';
import {getPackages} from "../../ApiService/api";
import PackageCard from "../Common/PackageCard";
import PackageCardForModel from "../Common/PackageCardForModel";

const PackageModal = () => {
    const [packages, setPackages] = useState([]);
    const  [packageID, setPackageID] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [feildName, setFeild] = useState("packagePrice");
    const [order, setOrder] = useState("DESC");
    const [offset, setOffset] = useState(0);
    const [stdID, setStdID] = useState("");

    useEffect(() => {
        const onFetch = async () => {
            try {
                console.log("onFetch");
                const response = await getPackages(
                    feildName,
                    order,
                    itemsPerPage,
                    offset
                );
                console.log(response?.data?.content);
                if (response && response?.data?.code === "00") {
                    console.log(response?.data?.content);
                    setPackages(response?.data?.content);
                } else {
                    console.log("Error fetching data:", response);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        onFetch();
    }, [feildName, order, itemsPerPage, offset]);

    return (
        <div>

        </div>
    );
};

export default PackageModal;