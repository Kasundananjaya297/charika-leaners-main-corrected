import React, {useEffect, useState} from 'react'
import {Col, Row, Card, Table, InputGroup, Button} from 'react-bootstrap'
import { FaUserEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {IoMdAdd} from "react-icons/io";
import Form from "react-bootstrap/Form";


export default function SessionCard({packeData,setPackgeID}) {
    const nav = useNavigate();
    const packDataEdit=(data) =>{
        nav(`/Packages/editPackage`,{state:data})
    }
    const [packageAndVehicleType,setPackageAndVehicleType] = useState([]);
    const [packageID,setpackageID] = useState();
    const [typeID,setTypeID] = useState();
    const [totalLessons,setTotalLessons] = useState();
    const [extraLessons,setExtraLessons] = useState();
    const [priceForExtraLesson,setPriceForExtraLesson] =useState();
    const [saveData,setSaveData] =useState([]);
    const [ID, setID] = useState("");


    useEffect(() => {
        const saveDataNew = [...saveData];
        saveDataNew[ID] = {}
    }, [ID,packageID]);

  return (
    <div>
         <Row className="flex text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Form>
                <Card style={{ width: "70rem"}}>
                    <div className="flex pl-4 items-center justify-center pt-3 w-wrap h-div" >
                        <Card.Body className="p-1">
                            <div className="flex flex-col w-72 mb-3">
                                <Row className="mb-2">
                                    <Col xs={5}>Package ID:</Col>
                                    <Col xs={4} className="pl-2">
                                        {packeData?.packageID}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs={5}>Package Name:</Col>
                                    <Col xs={4} className="pl-2 font-bold">
                                        {packeData?.packageName}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xs={5}>Package Price:</Col>
                                    <Col xs={4} className="pl-2">
                                        Rs. {packeData?.packagePrice}
                                    </Col>
                                </Row>
                                <Row className="mb-2 flex-row items-center">
                                    <Col xs={5}>Extras Price:</Col>
                                    <Col xs={4} className="pl-2">

                                    </Col>
                                </Row>
                            </div>
                            <Row className='flex items-center justify-center flex-row'>
                                <div className='flex flex-col gap-y-1 h-full'>
                                <div className='pb-4 overflow-auto'>
                                <div class='overflow-hidden border border-gray-200 rounded-lg mr-6'>
                                    <div class='overflow-y-auto  '>
                                        <table class='min-w-full divide-y'>
                                            <thead class='bg-gray-50'>
                                            <tr>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Sessions_Agreed</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Extras</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price_per_Lesson</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Total_Sessions</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Participated</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Remain</th>

                                            </tr>
                                            </thead>
                                            <tbody class='bg-white divide-y divide-gray-200'>
                                                {packeData.packageAndVehicleType?.map((data, i) => (
                                                    <tr key={i}>
                                                        <td className='px-3 py-2 whitespace-nowrap'>{data?.typeID} - {data?.typeName}</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>{data?.autoOrManual}</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>{data?.lessons}</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>
                                                            <input className="w-full h-fit hover:border-0 border-bottom pl-1 outline-none" type='number' defaultValue={data?.extraLessons} min={0} onChange={(e)=> {
                                                                // setID(i);
                                                                // setpackageID(data?.packageID);
                                                                // setTypeID(data?.typeID);
                                                                // setExtraLessons(e.target.value);
                                                            }}/>
                                                        </td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>
                                                            <input
                                                                className="w-full h-fit hover:border-0 border-bottom pl-1 outline-none" defaultValue={data?.priceForExtraLesson} type='number' min={0} onChange={(e)=>setID(i)}/>
                                                        </td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>20000</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>{data?.totalLessons}</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>10</td>
                                                        <td className='px-3 py-2 whitespace-nowrap'>9</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        </Card.Body>
                    </div>
                    <Card.Footer>
                        <Button>Save</Button>
                    </Card.Footer>
                </Card>
                </Form>
            </Col>
         </Row>
    </div>
  )
}
