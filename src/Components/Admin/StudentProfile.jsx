import React, { useState, useEffect } from "react";
import RegisterNavBar from "../Admin/Common/RegisterNavBar";
import ProfileDetailsCard from "./Common/ProfileDetailsCard";
import Dropdown from "react-bootstrap/Dropdown";
import { FetchAllStudnet, findStudentByID } from "../ApiService/api";
import Pagination from 'react-bootstrap/Pagination';

export default function StudentProfile() {
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default value
  const [studentDetails, setStudent] = useState([]);
  const [feildName, setFeild] = useState("stdID");
  const [order, setOrder] = useState("DESC");
  const [offset, setOffset] = useState(0);
  const [stdID, setStdID] = useState("");
  const [interrupt, setInterrupt] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [listOfitemsForPage, setListOfItemsForPage] = useState([]);
  const [itemsStart, setItemsStart] = useState(1);
  const [itemsEnd, setItemsEnd] = useState(4);

  useEffect(() => {
    const pagenumbersCount = Math.ceil(recordCount / itemsPerPage);
    setItemsEnd(Math.min(4, pagenumbersCount));
  }, [recordCount]);

  useEffect(() => {
    const onFetch = async () => {
      try {
        const response = await FetchAllStudnet(feildName, order, itemsPerPage, offset);
        if (response && response?.data?.code === "00") {
          setStudent(response?.data?.content);
          if (recordCount < response?.data?.recordCount) {
            setRecordCount(response?.data?.recordCount);
          }
        } else {
          console.log("Error fetching data:", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    onFetch();
  }, [feildName, order, itemsPerPage, offset, interrupt]);

  let items = [];
  for (let number = itemsStart; number <= Math.min(itemsEnd, Math.ceil(recordCount / itemsPerPage)); number++) {
    items.push(
        <Pagination.Item key={number} active={number === offset + 1} onClick={() => { setOffset(number - 1) }}>
          {number}
        </Pagination.Item>,
    );
  }

  useEffect(() => {
    const fetchStdData = async () => {
      try {
        if (stdID !== null && stdID !== undefined && stdID !== "") {
          const response = await findStudentByID(stdID);
          setStudent([response?.data?.content]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchStdData();
  }, [stdID]);

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

  useEffect(() => {
    let list = [];
    for (let i = 3; i <= recordCount; i += 3) {
      list.push(i);
    }
    setListOfItemsForPage(list);
  }, [recordCount]);

  return (
      <div className="flex flex-col h-dvh mb-2">
        <div className="bg-neutral-50">
          <RegisterNavBar
              setfiled={setFeild}
              setOrder={setOrder}
              setStudentID={setStdID}
          />
        </div>
        <div className="flex flex-col overflow-y-scroll h-full">
          <div className="flex flex-wrap">
            {studentDetails?.map((details, i) => (
                <div className="pl-20 mt-2 gap-x-16 gap-y-6 mb-9" key={i}>
                  <ProfileDetailsCard studentData={details} setInterrupt={setInterrupt} interrupt={interrupt} />
                </div>
            ))}
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
                }} disabled={offset === 0} />
                <Pagination.Prev onClick={() => {
                  if (offset > 0) {
                    setOffset(offset - 1);
                    if (offset < itemsStart - 1) {
                      setItemsStart(itemsStart - 1);
                      setItemsEnd(itemsEnd - 1);
                    }
                  }
                }} disabled={offset === 0} />
                {items}
                <Pagination.Ellipsis onClick={() => {
                  if (itemsEnd < lastPage) {
                    setItemsStart(itemsStart + 1);
                    setItemsEnd(itemsEnd + 1);
                  }
                }} disabled={itemsEnd >= lastPage} />
                <Pagination.Next onClick={() => {
                  if (offset + 1 < lastPage) {
                    setOffset(offset + 1);
                    if (offset + 1 >= itemsEnd) {
                      setItemsStart(itemsStart + 1);
                      setItemsEnd(itemsEnd + 1);
                    }
                  }
                }} disabled={offset + 1 >= lastPage} />
                <Pagination.Last onClick={() => {
                  setOffset(lastPage - 1);
                  setItemsStart(lastPage - 3 >= 1 ? lastPage - 3 : 1);
                  setItemsEnd(lastPage);
                }} disabled={offset + 1 >= lastPage} />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
  );
}
