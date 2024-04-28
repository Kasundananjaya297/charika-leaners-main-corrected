import React, {useEffect, useState} from 'react';
import TrainerNavBar from "./Common/TrainerNavBar";
import TrainerCard from "./Common/TrainerCard";
import Dropdown from "react-bootstrap/Dropdown";
import {getTrainers} from "../ApiService/api";


function Trainers(props) {
    const [trainersDetails, setTrainersDetails] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default value
    const [feildName, setFeild] = useState("trainerID");
    const [order, setOrder] = useState("DESC");
    const [offset, setOffset] = useState(0);
    const [stdID, setStdID] = useState("");
    const [interrupt , setInterrupt] = useState(false);
    //fetch trainer data
    useEffect(()=>{
       const fetchData = async ()=>{
           const response =await getTrainers(feildName,order,itemsPerPage,offset);
              if(response?.data?.code === "00"){
                setTrainersDetails(response?.data?.content);

              }
           console.log(response?.data);
       }
    fetchData();
    },[feildName,order,order,offset,interrupt,itemsPerPage]);


    const handleItemsPerPageChange = (selectedItemsPerPage) => {
        setItemsPerPage(selectedItemsPerPage);
    };


    return (
        <div className="flex flex-col h-dvh mb-2">
            <div className="bg-neutral-50">
                <TrainerNavBar/>
            </div>
            <div className="flex flex-col overflow-y-scroll  h-full w-overflow-hidden">
                <div className="flex flex-wrap">
                    {trainersDetails?.map((data,i)=>(
                        <div className="pl-20 mt-4 gap-x-16 gap-y-6 mb-9" key={i}>
                            <TrainerCard data={data}/>
                        </div>
                    ))}
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
}

export default Trainers;