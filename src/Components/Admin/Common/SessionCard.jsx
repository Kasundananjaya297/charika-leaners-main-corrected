import React, {useEffect, useState} from 'react'
import {Col, Row, Card, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoRefreshCircle } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import {updateExtraSession, updateExtraSessionsTotalAmount} from "../../ApiService/api";



export default function SessionCard({packeData,setPackgeID,stdID, interrupt,setInterrupt}) {
    const nav = useNavigate();
    const packDataEdit=(data) =>{
        nav(`/Packages/editPackage`,{state:data})
    }
    const [filteredDataToSave,setFilteredDataToSave] = useState(packeData.packageAndVehicleType)
    const [price,setPrice] = useState(0);
    const [packageID,setpackageID] = useState();
    const [typeID,setTypeID] = useState();
    const [totalLessons,setTotalLessons] = useState();
    const [extraLessons,setExtraLessons] = useState();
    const [priceForExtraLesson,setPriceForExtraLesson] =useState(0);
    const [saveData,setSaveData] =useState(packeData.packageAndVehicleType);
    const [ID, setID] = useState("");
    const [totalPriceOfExtraSession,setTotalPriceOfExtraSession] =useState();
    const [totalPirceRealTime,setTotalPriceRealTime] = useState(0);
    const [saveButtonState, setSaveButtonState] = useState(true);
    const[priceDisabled,setPriceDisabled] = useState(true);

console.log(packeData)
    useEffect(()=>{
        let totalPrice = 0;
        for(let i = 0; i<filteredDataToSave?.length;i++){
            totalPrice = totalPrice + filteredDataToSave[i]?.priceForExtraLesson;
        }
        setTotalPriceOfExtraSession(totalPrice);
        if(totalPrice>0||filteredDataToSave.length>0){
            setSaveButtonState(false);
        }else {setSaveButtonState(true)}
        },[filteredDataToSave]);
    useEffect(() => {
        const filteredData = saveData.filter(item =>
            item?.extraLessons !==0 &&
            item?.extraLessons !== undefined &&
            item?.extraLessons !==null &&
            item?.stdID !==null&&
            item?.stdID !==undefined

        )
        setFilteredDataToSave(filteredData)
    }, [saveData]);
    useEffect(() => {
        console.log("Filtered Data",filteredDataToSave)
    },[filteredDataToSave]);

    useEffect(() => {
        const saveDataNew = [...saveData];
        saveDataNew[ID] = {price,stdID,packageID,totalLessons:((parseInt(extraLessons===undefined?0:extraLessons)+parseInt(totalLessons===undefined?0:totalLessons))),
            typeID,priceDisabled,extraLessons,priceForExtraLesson:(parseFloat(extraLessons===undefined?0:extraLessons)*parseFloat(price===undefined?0:price))};
        setSaveData(saveDataNew)
    }, [packageID,typeID,extraLessons,priceForExtraLesson,price,totalLessons,ID]);

    useEffect(() => {
        setPrice(saveData[ID]?.price===undefined?0:saveData[ID]?.price);
    }, [ID]);

    useEffect(() => {
        let total=0;
        for(let i=0;i<saveData.length;i++){
            total = total + saveData[i]?.priceForExtraLesson;
        }
        setTotalPriceOfExtraSession(total);
    });
    const UpdatePackage = async (e) =>{
        e.preventDefault();
        console.log("Filtered Data",filteredDataToSave)
        Swal.fire({
            icon:"warning",
            title:"Are you sure?",
            text:"Ready to update Extra Sessions"
        }).then(async ()=>{
            try {
                const response2 = await updateExtraSessionsTotalAmount({stdID,packageID,totalAmountToPay:totalPriceOfExtraSession})
                const response = await updateExtraSession(filteredDataToSave);
                console.log(response)
                if(response?.data?.code==="00"){
                    Swal.fire({
                        icon:"success",
                        title:"Success",
                        text: "Updated Successfully"
                    }).then(()=>{setInterrupt(!interrupt)})
                }else if(response?.data?.code ==="01"){
                    Swal.fire({
                        icon:"error",
                        title:"Error",
                        text: "Failed to update"
                    })
                }
            }catch (e){
                console.log(e)
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text: "Axios Error"
                })
            }
        })

    }
  return (
    <div>
        <Row className="flex text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Form onSubmit={UpdatePackage}>
                    <Card style={{width: "70rem"}}>
                        <div className="flex p-4 items-center justify-center pt-0 w-wrap h-div">
                            <Card.Body className="p-4">
                                <div className="flex flex-col w-96 mb-3">
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
                                    <Row className="mb-2 flex-row items-center text-success">
                                        <Col xs={5}>Extras Total Price:</Col>
                                        <Col xs={4} className="pl-2">
                                            Rs. {(totalPriceOfExtraSession)}
                                        </Col>
                                    </Row>
                                    <Row className="mb-2 flex-row items-center font-bold">
                                        <Col xs={5}>Total Price:</Col>
                                        <Col xs={4} className="pl-2">
                                                Rs. {parseFloat(totalPriceOfExtraSession) + parseFloat(packeData?.packagePrice)}
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
                                                                    <input
                                                                        className="w-full h-fit hover:border-0 border-bottom pl-1 outline-none"
                                                                        type='number' defaultValue={saveData[i]?.extraLessons}
                                                                        min={0} onChange={(e) => {
                                                                        setID(i);
                                                                        setpackageID(data?.packageID);
                                                                        setTypeID(data?.typeID);
                                                                        setExtraLessons(e.target.value===''?saveData[i]?.extraLessons:e.target.value);
                                                                        setTotalLessons(data?.lessons)

                                                                    }}/>
                                                                </td>
                                                                <td className='px-3 py-2 whitespace-nowrap'>
                                                                    <input
                                                                        className="w-full h-fit hover:border-0 border-bottom pl-1 outline-none"
                                                                        defaultValue={saveData[i]?.price}
                                                                        type='number'
                                                                        min={0}
                                                                        onChange={(e) => {
                                                                            setID(i);
                                                                            setExtraLessons(saveData[i]?.extraLessons);
                                                                            setpackageID(data?.packageID);
                                                                            setTypeID(data?.typeID);
                                                                            setTotalLessons(data?.lessons);
                                                                            setPrice(e.target.value===''?saveData[i]?.price:e.target.value);
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className='px-3 py-2 whitespace-nowrap'>{(saveData[i]?.priceForExtraLesson === undefined ? data?.priceForExtraLesson : saveData[i]?.priceForExtraLesson)}</td>
                                                                <td className='px-3 py-2 whitespace-nowrap'>{(saveData[i]?.totalLessons===undefined? data?.totalLessons:saveData[i].totalLessons)}</td>
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
                        <Card.Footer className="flex items-end justify-end">
                            <Button type='submit' disabled={saveButtonState}>Save</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
        </Row>
    </div>
  )
}
