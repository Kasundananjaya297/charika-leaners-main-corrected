import React,{useEffect,useState} from 'react'
import PackageNavBar from './Common/PackageNavBar'
import PackageCard from './Common/PackageCard'
import {FetchAllStudnet, getPackages, getPackgeByID} from '../ApiService/api'
import Dropdown from "react-bootstrap/Dropdown";

export default function () {
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

    useEffect(() =>{
        const fetchPackages = async () =>{
            try{
                const response = await getPackages();
                console.log(response.data);
                setPackages(response.data?.content);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchPackages();
    },[])
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
    const handleItemsPerPageChange = (selectedItemsPerPage) => {
        setItemsPerPage(selectedItemsPerPage);
    };
  return (
      <div className="flex flex-col h-dvh mb-2">
          <div className="bg-neutral-50">
              <PackageNavBar setPackageID={setPackageID} setOrder={setOrder} setfiled={setFeild}/>
          </div>

          <div className="flex flex-col overflow-y-scroll">
              <div className="flex flex-wrap">
                  {packages?.map((data, i) => (
                      <div className="pl-16 mt-4 gap-x-16 gap-y-4 mb-9" key={i}>
                          <PackageCard packeData={data} setPackgeID={setPackageID}/>
                      </div>)
                  )}

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
  )
}
