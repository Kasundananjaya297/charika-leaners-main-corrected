import React, {useEffect, useState} from 'react';
import {checkCurrentAgreementIsExpired, getPackages, getPackgeByID} from "../../ApiService/api";
import PackageCardForModel from "../Common/PackageCardForModel";
import PackageNavBar from "../Common/PackageNavBar";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

export const SelectPackage = ({stdID, sethidePackModal}) => {
    const [packages, setPackages] = useState([]);
    const  [packageID, setPackageID] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [feildName, setFeild] = useState("packagePrice");
    const [order, setOrder] = useState("DESC");
    const [offset, setOffset] = useState(0);
    const [dataToSave,setDataToSave] = useState([]);
    useEffect(() => {
        const check = async () => {
            const response = await checkCurrentAgreementIsExpired(stdID);
            if (response?.data?.code !== "00") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Not Expired current Agreement",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    sethidePackModal(false);
                });
            }
        };
        check();
    }, []);

    useEffect(()=>{
        const getchPacks = async () =>{
            try{
                const response = await getPackgeByID(packageID);
                console.log(response.data);
                setPackages([response?.data?.content]);
            }catch(error){
                console.log(error);
            }
        }
        getchPacks();
    },[packageID])

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
    const handleItemsPerPageChange = (selectedItemsPerPage) => {
        setItemsPerPage(selectedItemsPerPage);
    };
    return (
        <div className="flex-1 flex flex-row">
            <div className="flex flex-row items-center justify-center mt-2 w-100">
                <div className="flex flex-col max-h-dvh w-full">
                    <div className="w-full absolute flex-row mb-3 pr-8">
                        <PackageNavBar setPackageID={setPackageID} setOrder={setOrder} setfiled={setFeild}/>
                    </div>
                    <div className="flex flex-col overflow-y-scroll mt-24 max-h-[450px]">
                        <div className="flex flex-wrap flex-row h-screen">
                            {packages?.map((data, i) => (
                                <div className="flex flex-row pl-28 pb-4" key={i}>
                                    <PackageCardForModel packeData={data} setPackgeID={setPackageID} stdID = {stdID}/>
                                </div>)
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex-1">
                            <div className="flex bg-white h-16 items-center justify-end p-4 gap-x-4">
                                <div className="text-gray-400">Items per Page</div>
                                <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                        {itemsPerPage}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>
                                            5
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>
                                            10
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>
                                            20
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
