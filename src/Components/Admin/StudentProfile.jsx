import React, { useState, useEffect } from "react";
import RegisterNavBar from "../Admin/Common/RegisterNavBar";
import ProfileDetailsCard from "./Common/ProfileDetailsCard";
import Dropdown from "react-bootstrap/Dropdown";
import { FetchAllStudnet, findStudentByID } from "../ApiService/api";

export default function StudentProfile() {
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default value
  const [studentDetails, setStudent] = useState([]);
  const [feildName, setFeild] = useState("stdID");
  const [order, setOrder] = useState("DESC");
  const [offset, setOffset] = useState(0);
  const [stdID, setStdID] = useState("");

  useEffect(() => {
    const onFetch = async () => {
      try {
        console.log("onFetch");
        const response = await FetchAllStudnet(
          feildName,
          order,
          itemsPerPage,
          offset
        );

        if (response && response?.data?.code === "00") {
          console.log(response?.data?.content);
          setStudent(response?.data?.content);
        } else {
          console.log("Error fetching data:", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    onFetch();
  }, [feildName, order, itemsPerPage, offset]); //dependency array

  useEffect(() => {
    const fetchStdData = async () => {
      try {
        if (stdID !== null && stdID !== undefined && stdID !== "") {
          const response = await findStudentByID(stdID);
          console.log(stdID);
          console.log(response?.data?.content);
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
  };

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
            <div className="pl-20 mt-4 gap-x-16 gap-y-6 mb-9" key={i}>
              <ProfileDetailsCard studentData={details} />
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
