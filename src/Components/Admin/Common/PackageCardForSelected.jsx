import React,{useState} from 'react'
import {Col, Row, Card, Table, Button} from 'react-bootstrap'
import { FaUserEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import Form from "react-bootstrap/Form";
import {updateAgreementDiscount} from "../../ApiService/api";
import Swal from "sweetalert2";


export default function PackageCardForSelected({packeData,setPackgeID}) {
    const nav = useNavigate();
    const [discount,setDiscount] =useState(0)
    const[buttonState, setButtonState]=useState(true)
    const packDataEdit=(data) =>{
        nav(`/Packages/editPackage`,{state:data})
    }
    const addDiscount = async (e) => {
        e.preventDefault()
        Swal.fire({
            icon:"warning",
            title:"Are you sure to add Discount",
            html:"Discount deducted from package Price"
        }).then(async (result)=>{
            if(result.isConfirmed){
                const data = {stdID:packeData?.stdID,packageID:packeData?.packageID,discount:discount,packagePrice:packeData?.packagePrice}
                try {
                    const response = await updateAgreementDiscount(data);
                    if(response?.data?.code === "00"){
                        Swal.fire({
                            icon:"success",
                            title:"Success",
                            text:"Discount added successfully"
                        })
                    }else{
                        Swal.fire({
                            icon:"error",
                            title:"Error",
                            text:"Failed to add discount"
                        })
                    }
                }catch (error) {
                    console.error("An error occurred:", error);
                    Swal.fire({
                        icon:"error",
                        title:"Error",
                        text:error
                    })
                }
            }
        })

    }
  return (
    <div>
         <Row className="flex text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Card style={{ width: "25rem", height:"25em"}}>
                <div className="flex  justify-between pr-1 pl-5 pt-3 w-wrap h-wrap mb-2 " >
                <FaUserEdit size={24} onClick={() => packDataEdit(packeData)}/>
                </div>
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
                            <Col xs={5}>Package Price:</Col>
                            <Col xs={4} className="pl-2">
                             Rs.{packeData?.packagePrice}
                            </Col>
                        </Row>
                            <Row className="mb-2">
                                <Col xs={5}>Discount:</Col>
                                <Col xs={4} className="pl-2">
                                    <Form onSubmit={addDiscount} className='-mb-2'>
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
                                                    setDiscount(e.target.value);
                                                }}
                                                onClick={()=>setButtonState(false)}
                                            />
                                            <Button type='submit' className='ml-4' disabled={buttonState}><IoMdAdd/></Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className='flex items-center justify-center flex-row'>
                                <Col className='mb-2 flex justify-between flex-row items-center'>
                                    <div>Sessions:</div>
                                </Col>
                                <div className='flex flex-col gap-y-1 h-32'>
                                <div className='pb-4 overflow-auto'>
                                <div class='overflow-hidden border border-gray-200 rounded-lg mr-6'>
                                    <div class='overflow-y-auto h-24'>
                                        <table class='min-w-full divide-y'>
                                            <thead class='bg-gray-50'>
                                                <tr>
                                                    <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                                                    <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                                    <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Count</th>
                                                </tr>
                                            </thead>
                                            <tbody class='bg-white divide-y divide-gray-200'>
                                                {packeData.packageAndVehicleType?.map((data, i) => (
                                                <tr key={i}>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.typeID} - {data?.typeName}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.autoOrManual}</td>
                                                    <td class='px-3 py-2 whitespace-nowrap'>{data?.lessons}</td>
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
