import React, {useEffect, useState} from 'react';
import {getExtraSessions, saveExtralessonsNotInAgreement} from "../../ApiService/api";
import Swal from "sweetalert2";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {Button, InputGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";


const AddExtraVehicleType = ({stdID,setShowModal,packID}) => {
    const [extraSessions, setExtraSessions] = useState([]);
    const [ID, setID] = useState('');
    const [extraLessons, setExtraLessons] = useState(0);
    const [extraLessonVehicleType, setExtraLessonVehicleType] = useState('');
    const [saveData, setSaveData] = useState([]);
    const [price, setPrice] = useState(0);
    const [extasID, setExtrasID] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const response = await getExtraSessions(stdID);
            if(response.data.code === "00"){
                setExtraSessions(response.data.content);}
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to get Extra Sessions your trial permit vehicle types are selected"
                })
                setShowModal(false);
            }
        }
        console.log(extraSessions)
        fetchData();
    }, [stdID]);
    useEffect(() => {
        const newSaveData = [...saveData];
        newSaveData[ID] = {
            stdID: stdID,
            typeID: extasID,
            packageID: packID,
            extraLessons: extraLessons,
            price: price,
            priceForExtraLesson: price*extraLessons,
            extraLessonVehicleType: extraLessonVehicleType
        }
        setSaveData(newSaveData);
    }, [ID, extraLessons, price, extasID, packID,stdID,extraLessonVehicleType]);
    useEffect(()=>{
        console.log(filteredData)

    },[filteredData])
    useEffect(() => {
        setPrice(saveData[ID]?.price===undefined?0:saveData[ID]?.price);
    }, [ID]);
    useEffect(() => {
        const fileredData = saveData.filter((data) =>
            data?.extraLessons !== 0 &&
            data?.extraLessons !== undefined &&
            data?.extraLessons !== null &&
            data !== undefined
            && data !== null &&
            data?.extraLessonVehicleType !== "--" &&
            data.extraLessonVehicleType !== undefined
        );
        setFilteredData(fileredData);
    }, [saveData]);
    const saveFilteredData = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                icon:"warning",
                title:"Are you sure?",
                text:"Do you want to add these extra lessons?",
                showCancelButton:true,
                confirmButtonText:"Yes",
            }).then(async (result)=> {
                if (result.isConfirmed) {
                    const response = await saveExtralessonsNotInAgreement(filteredData);
                    if (response.data.code === "00") {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Extra lessons added successfully"
                        })
                    } else if (response.data.code === "06") {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Duplicated"
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to add extra lessons"
                        })
                    }
                }
            })
        }catch (e) {
            console.log(e);

    }
    }
    return (
        (extraSessions.length === 0 ? ("Not Available Extra Vehicle Type"): (<div>
            <Form onSubmit={saveFilteredData}>
                <table className='min-w-full divide-y'>
                    <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Extras</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price_per_Lesson</th>
                        <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {extraSessions.map((session, id) => (
                        <tr key={id} className='text-sm'>
                            <td className='px-3 py-2 whitespace-nowrap'>{session.typeID} - {session.typeName}</td>
                            <td className='px-3 py-2 whitespace-nowrap'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                                        {(saveData[id]?.extraLessonVehicleType === undefined ? "Type" : saveData[id]?.extraLessonVehicleType)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {(session?.typeAuto) && (
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setID(id)
                                                    setExtraLessonVehicleType("Auto");
                                                    setPrice(saveData[id]?.price === undefined ? 0 : saveData[id]?.price);
                                                    setExtrasID(session.typeID);
                                                    setExtraLessons(saveData[id]?.extraLessons === undefined ? 0 : saveData[id]?.extraLessons)
                                                }}>Auto
                                            </Dropdown.Item>)}
                                        {(session?.typeManual) && (
                                            <Dropdown.Item
                                                onClick={() => {
                                                    setID(id);
                                                    setExtraLessonVehicleType("Manual");
                                                    setPrice(saveData[id]?.price === undefined ? 0 : saveData[id]?.price);
                                                    setExtrasID(session.typeID);
                                                    setExtraLessons(saveData[id]?.extraLessons === undefined ? 0 : saveData[id]?.extraLessons)
                                                }}
                                            >Manual
                                            </Dropdown.Item>)}
                                        <Dropdown.Item
                                            onClick={() => {
                                                setID(id);
                                                setExtraLessonVehicleType("--");
                                                setPrice(saveData[id]?.price);
                                                setExtrasID(session.typeID);
                                                setExtraLessons(saveData[id]?.extraLessons === undefined ? 0 : saveData[id]?.extraLessons)
                                            }}>--</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td className='px-3 py-2 whitespace-nowrap '>
                                <Form.Group className='w-20'>
                                    <InputGroup>
                                        <Form.Control type="number" placeholder="Extra Lessons"
                                                      onChange={(e) => {
                                                          setID(id);
                                                          setExtraLessonVehicleType(saveData[id]?.extraLessonVehicleType);
                                                          setExtraLessons(e.target.value);
                                                          setPrice(saveData[id]?.price === undefined ? 0 : saveData[id]?.price);
                                                          setExtraLessonVehicleType(saveData[id]?.extraLessonVehicleType)
                                                          setExtrasID(session.typeID);
                                                      }}/>
                                    </InputGroup>
                                </Form.Group>
                            </td>
                            <td className='px-3 py-2 whitespace-nowrap '>
                                <Form.Group className='w-32'>
                                    <InputGroup>
                                        <Form.Control type="number" placeholder="Price"
                                                      onChange={(e) => {
                                                          setID(id);
                                                          setExtraLessonVehicleType(saveData[id]?.extraLessonVehicleType);
                                                          setPrice(e.target.value);
                                                          setExtraLessons(saveData[id]?.extraLessons === undefined ? 0 : saveData[id]?.extraLessons);
                                                          setExtraLessonVehicleType(saveData[id]?.extraLessonVehicleType)
                                                          setExtrasID(session.typeID);
                                                      }}/>
                                    </InputGroup>
                                </Form.Group>
                            </td>
                            <td className='px-3 py-2 whitespace-nowrap'>Rs. {saveData[id]?.priceForExtraLesson}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Row>
                    <Button onClick={(e) => {
                        saveFilteredData(e);
                    }}>Add</Button>
                </Row>
            </Form>

        </div>)))
    ;
};


export default AddExtraVehicleType;