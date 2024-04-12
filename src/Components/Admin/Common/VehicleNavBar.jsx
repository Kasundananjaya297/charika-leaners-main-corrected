import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { debounce } from "lodash";
import { getPackageByLetter } from "../../ApiService/api";

export default function PackageNavBar({ setfiled, setOrder, setPackageID }) {
  //props for set nav bar selections
  const nav = useNavigate();
  const GotoAddNewVehicle = () => {
    nav("/vehicle/addNewVehicle");
  };
  //search result dropdown
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    console.log(search);
    const fetchData = async () => {
      try {
        if (search !== null && search !== undefined && search !== "") {
          const response = await getPackageByLetter(search);
          console.log(response?.data?.content);
          setSearchData(response?.data?.content);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="p-3 bg-white">
          <Form className="d-flex gap-x-3">
            <DropdownButton
              className="flex"
              id="dropdown-basic-button"
              onSelect={(eventKey, event) => {
                if (eventKey === "stdID_ASC" || eventKey === "stdID_DESC") {
                  // Extract the order (ASC/DESC) from the eventKey
                  const order = eventKey.split("_")[1];
                  setfiled("packagePrice");
                  setOrder(order);
                } else {
                  setfiled(eventKey);
                  setOrder(null); // Assuming there is no specific order for other options
                }
              }}
              title="Filter"
            >
              <Dropdown.Item eventKey="stdID_ASC">A-Z</Dropdown.Item>
              <Dropdown.Item eventKey="stdID_DESC">Z-A</Dropdown.Item>
              <Dropdown.Item eventKey="Registered">Registered</Dropdown.Item>
            </DropdownButton>
            <div className="relative">
              <Form.Control
                type="search"
                placeholder="Enter package....."
                className="me-2"
                aria-label="Search"
                onChange={debounce((e) => {
                  setSearch(e.target.value);
                }, 400)}
              />

              <div className="absolute w-full overflow-visible z-10">
                {search.length > 0 &&
                  searchData.length > 0 &&
                  searchData?.map((data, i) => (
                    <div
                      className="flex flex-col bg-white border rounded-lg"
                      key={i}
                    >
                      <div
                        className="flex flex-col  p-2 text-sm hover:bg-blue-400 w-full h-full rounded-lg"
                        onClick={(e) => {
                          setSearch("");
                          setPackageID(data?.packageID);
                        }}
                      >
                        <div className="flex flex-row justify-between font-semibold w-full">
                          <div>
                            {data?.packageID} 
                          </div>
                          <div>
                          {data?.packageName}
                          </div>
                        </div>
                        <div>{data?.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Form>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <div className="flex flex-row space-x-3">
              <Button variant="outline-success" onClick={GotoAddNewVehicle}>
                Add New Vehicle
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
