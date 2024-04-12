import React, {useState} from 'react';
import VehicleNavBar from './Common/VehicleNavBar';
import Dropdown from "react-bootstrap/Dropdown";

const Vehicle = () => {
    const handleItemsPerPageChange = (value) => {}
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
        <div className="flex flex-col h-dvh mb-2">
            <VehicleNavBar/>
            <div className="h-full">hiii</div>


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