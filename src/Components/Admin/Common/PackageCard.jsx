import React from 'react'
import { Col, Row ,Card, Table} from 'react-bootstrap'

export default function PackageCard({packeData}) {
  return (
    <div>
         <Row className="flex overflow-hidden text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Card style={{ width: "23rem", height:"20em"}}>
                    <div className="flex pl-4 items-center justify-center pt-3 w-wrap h-div" >
                        <Card.Body className="p-1">
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
                            <Col xs={5}>Specific For:</Col>
                            <Col xs={4} className="pl-2">
                            {packeData?.description}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={5}>Price:</Col>
                            <Col xs={4} className="pl-2">
                             Rs.{packeData?.packagePrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-2'>Lessons: *</Col>
                            <div className='flex flex-col gap-y-1'>
                                <div className='pb-4 overflow-auto'>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr className='text-xs'>
                                                <th>Category</th>
                                                <th>Type</th>
                                                <th>Count</th>
                                            </tr>
                                        </thead>
                                        <tbody className=' overflow-auto'>
                                            {packeData.packageAndVehicleType?.map((data,i)=>(
                                                <tr key={i} className='text-xs bg-slate-300'>
                                                    <td>{data?.typeID} - {data?.typeName}</td>
                                                    <td>{data?.autoOrManual}</td>
                                                    <td>{data?.lessons}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
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
