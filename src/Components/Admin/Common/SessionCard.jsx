import React from 'react'
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
  return (
    <div>
         <Row className="flex text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Card style={{ width: "50rem"}}>
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
                                        <Form onSubmit={""} className='-mb-2'>
                                            <div className="flex flex-row items-center text-danger">
                                                <div>
                                                    Rs.
                                                </div>
                                                <input
                                                    defaultValue={(packeData?.discount)}
                                                    min={0}
                                                    max={parseFloat(packeData?.packagePrice)}
                                                    type="number"
                                                    placeholder="Discount..."
                                                    className="w-32 h-fit hover:border-0 border-bottom pl-1 outline-none"
                                                    required
                                                    onChange={(e) => {

                                                    }}
                                                    onClick={()=>{}}
                                                />
                                                <div>
                                                    <Button type='submit' className='ml-4'><IoMdAdd/></Button>
                                                </div>

                                            </div>
                                        </Form>
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
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Participated</th>
                                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Remain</th>

                                            </tr>
                                            </thead>
                                            <tbody class='bg-white divide-y divide-gray-200'>
                                                {packeData.packageAndVehicleType?.map((data, i) => (
                                                <tr key={i}>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.typeID} - {data?.typeName}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.autoOrManual}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.lessons}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>

                                                    </td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.total}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.participated}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.remain}</td>

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
                </Card>
            </Col>
         </Row>
    </div>
  )
}
