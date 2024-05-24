import React, {useEffect, useState} from 'react';
import TrainerNavBar from "./Common/TrainerNavBar";
import TrainerCard from "./Common/TrainerCard";
import Dropdown from "react-bootstrap/Dropdown";
import {getTrainerByID, getTrainers} from "../ApiService/api";
import Pagination from "react-bootstrap/Pagination";


function Trainers(props) {
    const [trainersDetails, setTrainersDetails] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(3); // Default value
    const [feildName, setFeild] = useState("trainerID");
    const [order, setOrder] = useState("DESC");
    const [offset, setOffset] = useState(0);
    const [trainerID, setTrainerID] = useState("");
    const [interrupt , setInterrupt] = useState(false);

    //pagination
    const [recordCount, setRecordCount] = useState(0);
    const [listOfitemsForPage, setListOfItemsForPage] = useState([]);
    const [itemsStart, setItemsStart] = useState(1);
    const [itemsEnd, setItemsEnd] = useState(4);

    useEffect(() => {
        const pagenumbersCount = Math.ceil(recordCount / itemsPerPage);
        setItemsEnd(Math.min(4, pagenumbersCount));
    }, [recordCount]);


    //fetch trainer data
    useEffect(()=>{
       const fetchData = async ()=>{
           const response =await getTrainers(feildName,order,itemsPerPage,offset);
              if(response?.data?.code === "00"){
                setTrainersDetails(response?.data?.content);
                setRecordCount(response?.data?.recordCount);

              }
           console.log(response?.data);
       }
    fetchData();
    },[feildName,order,order,offset,interrupt,itemsPerPage]);

    //pagination set items for pagination
    let items = [];
    for (let number = itemsStart; number <= Math.min(itemsEnd, Math.ceil(recordCount / itemsPerPage)); number++) {
        items.push(
            <Pagination.Item key={number} active={number === offset + 1} onClick={() => { setOffset(number - 1) }}>
                {number}
            </Pagination.Item>,
        );
    }

    const handleItemsPerPageChange = (selectedItemsPerPage) => {
        setItemsPerPage(selectedItemsPerPage);
        setOffset(0);
        setItemsStart(1);
        setItemsEnd(Math.min(4, Math.ceil(recordCount / selectedItemsPerPage)));
    };

    useEffect(() => {
        let list = [];
        for (let i = 3; i <= recordCount; i += 3) {
            list.push(i);
        }
        setListOfItemsForPage(list);
    }, [recordCount]);

    const lastPage = Math.ceil(recordCount / itemsPerPage);
    //
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(trainerID === null || trainerID === undefined || trainerID === ""){
                    return;
                }
                const response = await getTrainerByID(trainerID);
                if (response?.data?.code === "00") {
                    setTrainersDetails([response?.data?.content]);
                    setRecordCount(response?.data?.recordCount);
                }
                console.log(response?.data);
            }catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [trainerID]);

    useEffect(() => {
        let list = [];
        for (let i = 3; i <= recordCount; i += 3) {
            list.push(i);
        }
        setListOfItemsForPage(list);
    }, [recordCount]);


    return (
        <div className="flex flex-col h-dvh mb-2">
                <TrainerNavBar setTrainerID={setTrainerID} setfiled={setFeild} setOrder={setOrder}/>
            <div className="flex flex-col overflow-y-scroll h-full">
                <div className="">
                <div className="flex flex-wrap">
                    {trainersDetails?.map((data,i)=>(
                        <div className="pl-16 mt-4 gap-x-16 gap-y-4 mb-9" key={i}>
                            <TrainerCard data={data} setInterrupt={setInterrupt} interrupt={interrupt}/>
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
}

export default Trainers;