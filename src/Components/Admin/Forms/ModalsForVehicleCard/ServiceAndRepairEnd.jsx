import React, {useEffect, useState} from 'react';
import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    commonItemsOrServiceOfferdByService,
    getCommonItemsOrServiceOfferdByService,
    uploadFile, VehicleServicesAndRepairEndUpdate
} from "../../../ApiService/api";
import {FaCloudUploadAlt} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import {IoMdAdd} from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

function ServiceAndRepairEnd({interrupts,setInterrupts, show, onHide,data}) {

    //hook for add item modal
    const [showAddItemModal,setaddItemModal] = useState(false);
    //interrupt for updating
    const [interrupt,setInterrupt] = useState(false);

    const [servicesTypes, setServicesTypes] = useState([]);

    //data service items
    const [dataServiceItems, setDataServiceItems] = useState([]);

    //filterd data hook
    const [filterDatatoSave,setfilteredDataToSave] = useState([]);



    //hooks for item & type
    const [itemID, setItemID] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [id,setID] = useState('');

    useEffect(() => {
        const newArray = [...dataServiceItems];
        newArray[id] = {itemID, totalAmount};
        setDataServiceItems(newArray)
    }, [itemID, totalAmount,id])

    useEffect(() => {
        console.log(dataServiceItems)
    }, [dataServiceItems]);


    useEffect(() => {
        const filterData = dataServiceItems.filter((item) => item?.itemID !== undefined);
        setfilteredDataToSave(filterData)
    }, [dataServiceItems]);

    useEffect(()=>{
        console.log(filterDatatoSave)
        saveVehicleServiceDataFormikEnd.setFieldValue("itemsORDones",filterDatatoSave)},[filterDatatoSave])

    //upload vehicle service or repair invoice
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);

    const uploadVehicleServiceInvoice = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation, Id: saveVehicleServiceDataFormikEnd.getFieldProps("registrationNo").value, setUploadProgress, setUploadState, setDownloadURL,setProgressBarVisible,category: "ServiceInvoice"});
            //console.log("url.............." + downloadURL);
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    };
    useEffect(() => {saveVehicleServiceDataFormikEnd.setFieldValue("invoiceUrl", downloadURL);}, [downloadURL])

    useEffect(()=>{
        const fetchVehicleServiceData = async () =>{
            const response = await getCommonItemsOrServiceOfferdByService();
            setServicesTypes(response?.data?.content);
            console.log(response?.data?.content)

        }
        fetchVehicleServiceData();
    },[interrupt])

    const saveVehicleServiceDataFormikEnd = useFormik({
        initialValues:{
            id:data?.vehicleServiceORRepairs[0]?.id,
            invoiceNo:data?.vehicleServiceORRepairs[0]?.invoiceNo,
            milage:data?.vehicleServiceORRepairs[0]?.milage,
            contactNumber:data?.vehicleServiceORRepairs[0]?.contactNumber,
            repairCenter:data?.vehicleServiceORRepairs[0]?.repairCenter,
            servicedDate:data?.vehicleServiceORRepairs[0]?.servicedDate,
            servicedTime:data?.vehicleServiceORRepairs[0]?.servicedTime,
            returnDate:data?.vehicleServiceORRepairs[0]?.returnDate,
            returnTime:"",
            invoiceUrl:"",
            registrationNo:data.registrationNo,
            itemsORDones:[]
        },validationSchema: Yup.object({
            invoiceNo: Yup.string().required("Invoice No is required"),
            returnDate: Yup.date().required("Return Date is required"),
            returnTime: Yup.string().required("Return Time is required"),
            invoiceUrl: Yup.string().required("Invoice upload is required"),
            itemsORDones:Yup.array().min(1,"Required to select item")
        }),onSubmit: async (values) =>{
            console.log(values);

            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to save the changes?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                console.log("values+++++++",values)
                if (result.isConfirmed) {
                    try {
                        const response = await VehicleServicesAndRepairEndUpdate(values);
                        if(response?.data?.code==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Success",
                                text: "Invoice saved Successfully"
                            }).then(()=>{setInterrupts(!interrupts);})
                        }else if(response?.data?.code ==="06"){
                            Swal.fire({
                                icon:"error",
                                title:"Error",
                                text: "Already Exist this name"
                            })
                        }
                    }catch (e){
                        console.error("Error in update vehicle service or repair:", e);
                        Swal.fire({
                            icon:"error",
                            title:"Error",
                            text: "Failed to update"
                        })
                    }

                }
            })
        }

    })

    const formikAddType = useFormik({
        initialValues: {
            itemName: "",
            itemType:"",
        },
        validationSchema: Yup.object({
            itemName: Yup.string().required("Item Name is required"),
            itemType: Yup.string().required("Item Type is required"),
        }),
        onSubmit : async (values) => {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to save the changes?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await commonItemsOrServiceOfferdByService(values);
                        if(response?.data?.code==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Success",
                                text: "Updated Successfully"
                            }).then(()=>{setInterrupt(!interrupt);})
                        }else if(response?.data?.code ==="06"){
                            Swal.fire({
                                icon:"error",
                                title:"Error",
                                text: "Already Exist this name"
                            })
                        }
                    }catch (e){
                        console.error("Error in update vehicle service or repair:", e);
                        Swal.fire({
                            icon:"error",
                            title:"Error",
                            text: "Failed to update"
                        })
                    }

                }

            })
        }
    })

    return (
        <Modal show={show} onHide={onHide} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Vehicle Service and Repair update</Modal.Title>
            </Modal.Header>
            {data?.vehicleServiceORRepairs?.length !== 0 && data?.vehicleServiceORRepairs[0]?.itemsORDones?.length ===0?(
                <Form onSubmit={saveVehicleServiceDataFormikEnd.handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>
                                    Invoice No:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Invoice number"
                                    defaultValue={saveVehicleServiceDataFormikEnd.values.invoiceNo}
                                    {...saveVehicleServiceDataFormikEnd.getFieldProps("invoiceNo")}
                                    disabled={(data?.vehicleServiceORRepairs[0]?.invoiceNo === "" ? false : true)}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {saveVehicleServiceDataFormikEnd.touched.invoiceNo && saveVehicleServiceDataFormikEnd.errors.invoiceNo}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="mb-3">
                                <Form.Label>
                                    Service/Repair End On:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    {...saveVehicleServiceDataFormikEnd.getFieldProps("returnDate")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {saveVehicleServiceDataFormikEnd.touched.returnDate && saveVehicleServiceDataFormikEnd.errors.returnDate}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className='mb-2'>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>
                                    Service/Repair End at:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="Enter Invoice number"
                                    defaultValue={saveVehicleServiceDataFormikEnd.values.returnTime}
                                    {...saveVehicleServiceDataFormikEnd.getFieldProps("returnTime")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {saveVehicleServiceDataFormikEnd.touched.returnTime && saveVehicleServiceDataFormikEnd.errors.returnTime}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>
                                    Upload invoice:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <div className='flex gap-x-2 w-96'>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => {
                                            setFileLocation(e.target.files[0]);
                                            setUploadState(false);
                                        }}
                                        required
                                    />
                                    <Button disabled={uploadState} onClick={() => {
                                        setUploadState(true);
                                        setProgressBarVisible(true);
                                        uploadVehicleServiceInvoice();
                                    }}>
                                        <div className=" flex items-center gap-x-2">
                                            <FaCloudUploadAlt/>
                                            <div>Upload</div>
                                        </div>
                                    </Button>
                                </div>
                                <div className="flex flex-row">
                                    {uploadProgress <= 100 && progressBarVisible && (
                                        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`}
                                                     className="mt-3  w-full"/>
                                    )}
                                </div>
                                <Form.Text className="text-danger">
                                    {saveVehicleServiceDataFormikEnd.touched.invoiceUrl && saveVehicleServiceDataFormikEnd.errors.invoiceUrl}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <div className="mb-0">
                            Details Of leaner permit<span className="text-red-500"> *</span>
                        </div>
                        <Row className="mb-3 pl-4 pr-3 items-center mt-2 overflow-auto h-72">
                            <table className="border-1 ">
                                <tr className="border-1">
                                    <th className="p-2">Id</th>
                                    <th className="p-2">Service or Repair Name</th>
                                    <th className='p-2'>Select</th>
                                    <th className="p-2">Total Price</th>
                                </tr>
                                {servicesTypes?.map((data,i)=>(
                                    <tr>
                                        <td className="p-2">{i+1}</td>
                                        <td className="p-2 pl-4">{data?.itemName}</td>
                                        <td className="p-2">
                                            <Form.Group required>
                                                <Form.Check
                                                    className='pl-4'
                                                    onClick={(e) => {
                                                        setItemID(data?.id);
                                                        setID(i);
                                                    }}/>
                                            </Form.Group>
                                        </td>
                                        <td className="flex w-44 -mr-20 p-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter price"
                                                onChange={(e)=>{setItemID(data?.itemID);setTotalAmount(e.target.value);setID(i)}}
                                            />
                                        </td>
                                    </tr>

                                ))}
                            </table>
                        </Row>
                        <Row className='flex flex-row mt-5 items-center justify-center'>
                            <Button onClick={()=>{setaddItemModal(true)} } className='w-50'>
                                <div className="flex items-center justify-center gap-x-2">
                                    <IoMdAdd/>
                                    <div>Add Item</div>
                                </div>
                            </Button>
                        </Row>
                        <Modal show={showAddItemModal} onHide={()=>{setaddItemModal(false)}} >
                            <div className="shadow-2xl shadow-blue-400  border-4 border-blue-200">
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Add Item
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={formikAddType.handleSubmit}>
                                        <Row>
                                            <Form.Group
                                            >
                                                <Form.Label>
                                                    Service/Repair Name:<span className="text-red-500"> *</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Service/Repair Name"
                                                    required
                                                    {...formikAddType.getFieldProps("itemName")}
                                                />
                                                <Form.Text className="text-danger">
                                                    {formikAddType.touched.itemName && formikAddType.errors.itemName}
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group
                                                className="flex gap-x-4 mt-3"
                                            >
                                                <Form.Label>
                                                    Type:<span className="text-red-500"> *</span>
                                                </Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic" variant='outline-secondary'>
                                                        {(formikAddType.getFieldProps("itemType").value||"Select")}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>{formikAddType.setFieldValue("itemType","Service")}}>Service</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>{formikAddType.setFieldValue("itemType","Repair")}}>Repair</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>{formikAddType.setFieldValue("itemType","Other")}}>Other</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Form.Text className="text-danger">
                                                    {formikAddType.touched.itemType && formikAddType.errors.itemType}
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Modal.Footer className='mt-3'>
                                            <Button type='submit'>Add</Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal.Body>
                            </div>

                        </Modal>
                        <Modal.Footer>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            ):(<Modal.Body>
                Current Service or Repair is completed or not any service is started
            </Modal.Body>)}

        </Modal>
    );
}

export default ServiceAndRepairEnd;