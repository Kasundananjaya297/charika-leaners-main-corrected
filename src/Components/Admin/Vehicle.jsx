import React, {useEffect, useState} from 'react';
import VehicleNavBar from './Common/VehicleNavBar';
import Dropdown from "react-bootstrap/Dropdown";
import {getVehicleByID, getVehicles} from "../ApiService/api";
import VehicleCard from "./Common/VehicleCard";
import Pagination from "react-bootstrap/Pagination";

const Vehicle = () => {
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [vehicleData, setVehicleData] = useState([]);
    const [order, setOrder] = useState('DESC');
    const [field, setField] = useState('registrationNo');
    const [vehicleID, setVehicleID] = useState('');
    const [offset, setOffset] = useState(0);

    //pagination
    const [recordCount, setRecordCount] = useState(0);
    const [listOfitemsForPage, setListOfItemsForPage] = useState([]);
    const [itemsStart, setItemsStart] = useState(1);
    const [itemsEnd, setItemsEnd] = useState(4);

    useEffect(() => {
        const pagenumbersCount = Math.ceil(recordCount / itemsPerPage);
        setItemsEnd(Math.min(4, pagenumbersCount));
    }, [recordCount]);

    //interrupts to api calling
    const [interrupt, setInterrupt] = useState(true);

    useEffect(() => {
        const onFetch = async () => {
            try {
                const response = await getVehicles("registrationNo", "DESC", itemsPerPage, offset);
                if (response && response?.data?.code === "00") {
                    setVehicleData(response?.data?.content);
                    setRecordCount(response?.data?.recordCount);
                    console.log("+++++++++++",response?.data?.recordCount)
                } else {
                    console.log("Error fetching data:", response);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        onFetch();
    }, [interrupt,offset,itemsPerPage]);

    useEffect(() => {
        const fetch = async () => {
            try {
                if(vehicleID === '') return setVehicleData([]);
                const response = await getVehicleByID(vehicleID);
                if (response && response?.data?.code === "00") {
                    setVehicleData([response?.data?.content]);
                    setRecordCount(response?.data?.recordCount);
                } else {
                    console.log("Error fetching data:", response);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        fetch();
    }, [vehicleID]);

    //pagination set items for pagination
    let items = [];
    for (let number = itemsStart; number <= Math.min(itemsEnd, Math.ceil(recordCount / itemsPerPage)); number++) {
        items.push(
            <Pagination.Item key={number} active={number === offset + 1} onClick={() => { setOffset(number - 1) }}>
                {number}
            </Pagination.Item>,
        );
    }
    const lastPage = Math.ceil(recordCount / itemsPerPage);

    const handleItemsPerPageChange = (selectedItemsPerPage) => {
        setItemsPerPage(selectedItemsPerPage);
        setOffset(0);
        setItemsStart(1);
        setItemsEnd(Math.min(4, Math.ceil(recordCount / selectedItemsPerPage)));
    };
    //list of items for page
    useEffect(() => {
        let list = [];
        for (let i = 3; i <= recordCount; i += 3) {
            list.push(i);
        }
        setListOfItemsForPage(list);
    }, [recordCount]);

    return (
        <div className="flex flex-col h-dvh mb-2">
            <VehicleNavBar VehicleID={setVehicleID} setOrder={setOrder} setfiled={setField}/>
            <div className="flex flex-col overflow-y-scroll h-full">
                <div className="">
                    <div className="flex flex-wrap">
                        {vehicleData.map((data, i) => (
                            <div className="pl-16 mt-4 gap-x-16 gap-y-4 mb-9" key={i}>
                                <VehicleCard vehicleData={data} setInterrupt={setInterrupt} interrupt={interrupt}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="flex-1 flex-row items-center">
                <div className="flex bg-white h-16 items-center justify-between p-4 gap-x-4">
                    <div className='flex items-center gap-x-4'>
                        <div className="text-gray-400">Items per Page</div>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                {itemsPerPage == recordCount ? "All" : itemsPerPage}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {listOfitemsForPage.map((item, i) => (
                                    <Dropdown.Item
                                        key={i}
                                        onClick={() => handleItemsPerPageChange(item)}
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Item onClick={() => handleItemsPerPageChange(recordCount)}>
                                    All
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='flex flex-row items-center h-full mt-3 justify-end'>
                        <Pagination>
                            <Pagination.First onClick={() => {
                                setOffset(0);
                                setItemsStart(1);
                                setItemsEnd(Math.min(4, lastPage));
                            }} disabled={offset === 0}/>
                            <Pagination.Prev onClick={() => {
                                if (offset > 0) {
                                    setOffset(offset - 1);
                                    if (offset < itemsStart - 1) {
                                        setItemsStart(itemsStart - 1);
                                        setItemsEnd(itemsEnd - 1);
                                    }
                                }
                            }} disabled={offset === 0}/>
                            {items}
                            <Pagination.Ellipsis onClick={() => {
                                if (itemsEnd < lastPage) {
                                    setItemsStart(itemsStart + 1);
                                    setItemsEnd(itemsEnd + 1);
                                }
                            }} disabled={itemsEnd >= lastPage}/>
                            <Pagination.Next onClick={() => {
                                if (offset + 1 < lastPage) {
                                    setOffset(offset + 1);
                                    if (offset + 1 >= itemsEnd) {
                                        setItemsStart(itemsStart + 1);
                                        setItemsEnd(itemsEnd + 1);
                                    }
                                }
                            }} disabled={offset + 1 >= lastPage}/>
                            <Pagination.Last onClick={() => {
                                setOffset(lastPage - 1);
                                setItemsStart(lastPage - 3 >= 1 ? lastPage - 3 : 1);
                                setItemsEnd(lastPage);
                            }} disabled={offset + 1 >= lastPage}/>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;