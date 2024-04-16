import React, {useEffect, useState} from 'react';
import VehicleNavBar from './Common/VehicleNavBar';
import Dropdown from "react-bootstrap/Dropdown";
import {getVehicles} from "../ApiService/api";
import VehicleCard from "./Common/VehicleCard";

const Vehicle = () => {
    const handleItemsPerPageChange = (value) => {}
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [vehicleData, setVehicleData] = useState([]);

    //interrupts to api calling
    const [interrupt, setInterrupt] = useState(true);

    useEffect(() => {
        const onFetch = async () => {
            try {
                const response = await getVehicles("registrationNo", "DESC", itemsPerPage, 0);
                if (response && response?.data?.code === "00") {
                    setVehicleData(response?.data?.content);
                } else {
                    console.log("Error fetching data:", response);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        onFetch();
    }, [interrupt]);

    return (
        <div className="flex flex-col h-dvh mb-2">
            <VehicleNavBar/>
            <div className="flex flex-col overflow-y-scroll h-full">
                <div className="">
                    <div className="flex flex-wrap">
                        {vehicleData.map((data,i) => (
                            <div className="pl-16 mt-4 gap-x-16 gap-y-4 mb-9" key={i}>
                                <VehicleCard vehicleData={data} setInterrupt={setInterrupt} interrupt={interrupt}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


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
    );
};

export default Vehicle;