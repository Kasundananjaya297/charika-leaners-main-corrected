import AxiosInstance from "./AxiosInstance";
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,deleteObject} from "firebase/storage";
import Swal from "sweetalert2";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCvDeVEEK2AaHjIfl6SeJ13bM-nVBfOZ1g",
  authDomain: "charikaleaners.firebaseapp.com",
  projectId: "charikaleaners",
  storageBucket: "charikaleaners.appspot.com",
  messagingSenderId: "26678943785",
  appId: "1:26678943785:web:a44af8f1d9945c3c343c38",
  measurementId: "G-N7BBJSL5VP"
};

/* old method I tried */

// const generateHeaders = (token) => {
//   return {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   };
// };

export const ValidateUser = (userData) => {
  return axios.post("http://127.0.0.1:8080/api/authentication/ValidateUser", userData);
};
// export const ValidateUser = (userData) => {
//   return axios.post("http://172.16.16.130:8080/api/authentication/ValidateUser", userData);
// };

export const SaveStudent = (stdData) => {
  // const headers = generateHeaders(token);
  return AxiosInstance.post("admin/registerStudent", stdData);
};
export const FetchAllStudnet = (field, order, pageSize, offset) => {
  // const headers = generateHeaders(token);
  return AxiosInstance.get(
      `admin/getStudent/${field}/${order}/${pageSize}/${offset}`
  );
};
export const findStudentByAnyfield = (detail) => {
  return AxiosInstance.get(`admin/getStudentBasic/${detail}`);
};
export const findStudentByID = (stdID) => {
  return AxiosInstance.get(`admin/getStudentByID/${stdID}`);
};
export const saveTrailPermit = (permitData) => {
  return AxiosInstance.post("admin/saveTrailPermitEfficient", permitData);
};
export const getTrailPermit = (stdID) =>{
  return AxiosInstance.get(`admin/getTrialPermit/${stdID}`);
}
export  const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadFile = ({ Type,fileLocation, Id, setUploadProgress, setUploadState, setDownloadURL,setProgressBarVisible,category }) => {
 // console.log(fileLocation);
  if (!fileLocation) {
    return;
  }

  const storageRef = ref(storage, `${Type}/${Id}/${category}/${fileLocation.name}`);

  const uploadTask = uploadBytesResumable(storageRef, fileLocation);
  // Set up event listeners for the upload task
  uploadTask.on("state_changed",
      // Progress callback
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Upload Error",
          text: error.message
        });
      },
      // Completion callback
      () => {
        // Define a function to get the download URL
        const getDownloadUrlWithRetry = (retryCount = 0) => {
          if (retryCount > 3) {
            // Maximum retries reached, show an error message
            Swal.fire({
              icon: "error",
              title: "Download URL Error",
              text: "Failed to get download URL. Please try again later."
            });
            return;
          }
          getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadUrl) => {
                console.log(downloadUrl);
                setUploadState(true);
                setDownloadURL(downloadUrl);
                Swal.fire({
                  icon: "success",
                  title: "Uploaded Successfully"
                }).then(setProgressBarVisible(false));
              })
              .catch((error) => {
                console.log(error);
                // Retry getting the download URL after a delay
                setTimeout(() => {
                  getDownloadUrlWithRetry(retryCount + 1);
                }, 3000);
              });
        };
        getDownloadUrlWithRetry();
      }
  );
};
export const getVehicleType = () =>{
  return AxiosInstance.get('admin/getVehicleType');
}
export const saveVehicleType = (vehicleData) =>{
  return AxiosInstance.post('admin/saveVehicleType',vehicleData);
}
export const UpdateStudent = (studentData) =>{
  return AxiosInstance.post('admin/UpdateStudentData',studentData);
}
export const UpdateTrailPermit = (trailData) =>{
  return AxiosInstance.post('admin/UpdateTrialPermit',trailData);
}
export const UpdateVehicleTypes = (vehicleData) =>{
  return AxiosInstance.post('admin/UpdateVehicleType',vehicleData);
}
export const AddMedicalReport=(data)=>{
  return AxiosInstance.post('admin/saveMedicalReport',data);
}
export const checkMedicalExpired=(stdID)=>{
  return AxiosInstance.get(`admin/checkMedicalExpired/${stdID}`);
}
export const checkeTrailExpired=(stdID)=>{
  return AxiosInstance.get(`admin/checkTrialPermitExpired/${stdID}`);
}
export const getMedicalReport=(stdID)=>{
  return AxiosInstance.get(`admin/getMedicalReport/${stdID}`);
}
export const updateMedicalReport=(data)=>{
  return AxiosInstance.post('admin/updateMedicalReport',data);
}
export const AddPackage = (data)=>{
  return AxiosInstance.post('admin/AddPackage',data);
}
export const getPackages = (field,order,pageSize,offset)=>{
  return AxiosInstance.get(`admin/getAllPackage/${field}/${order}/${pageSize}/${offset}`);
}
export const upDatePackage = (data)=>{
  return AxiosInstance.post('admin/updatePackage',data);
}
export const getPackageByLetter = (data)=>{
  return AxiosInstance.get(`admin/getPackage/${data}`);
}
export const getPackgeByID = (data)=>{
  return AxiosInstance.get(`admin/getPackageByID/${data}`);
}
export const saveAgreement = (data) => {
  return AxiosInstance.post("admin/saveAgreement",data);
}
export const checkCurrentAgreementIsExpired = (stdID) =>{
  return AxiosInstance.get(`admin/checkCurrentAgreement/${stdID}`)
}
export const getAgreement = (stdID) =>{
  return AxiosInstance.get(`admin/getAgreement/${stdID}`);
}
export const getPackagesPerStudent = (stdID,order,itemsPerPage,offset) =>{
  return AxiosInstance.get(`admin/getPackagesForStudent/${stdID}/${order}/${itemsPerPage}/${offset}`);
}
export const updateAgreementDiscount = (data)=>{
  return AxiosInstance.put('admin/updateAgreementDiscount',data);
}
export const deleteAgreement = (stdID,packID)=>{
  return AxiosInstance.delete(`admin/deleteAgreement/${stdID}/${packID}`);
}
export const updateExtraSession = (data) =>{
  return AxiosInstance.put("admin/UpdateExtraSession",data)
}
export const updateExtraSessionsTotalAmount = (data)=>{
  return AxiosInstance.put("admin/UpdateTotalAmountToPay",data);
}
export const savePayments = (data) =>{
    return AxiosInstance.post("admin/savePayment",data);
}
export const getPaymentDetails =(stdID,packageID) =>{
  return AxiosInstance.get(`admin/getPayments/${stdID}/${packageID}`)
}
export const getExtraSessions = (stdID) =>{
    return AxiosInstance.get(`admin/getVehicleTypesForExtras/${stdID}`);
}
export const saveExtralessonsNotInAgreement =(data)=>{
  console.log(data);
    return AxiosInstance.post("admin/saveExtraSession",data);
}
export const getExtraSessionNotInAgreement = (stdID,packID) =>{
    return AxiosInstance.get(`admin/getExtraSessionNotINAgreement/${stdID}/${packID}`);
}
export const updateExtraSessionNotInAgreement = (data) =>{
    return AxiosInstance.put("admin/updateExtraSessionNotInAgreement",data);
}
export const getFuelType=()=>{
    return AxiosInstance.get('admin/getFuelTypes');
}
export const saveFuelType=(data)=>{
    return AxiosInstance.post('admin/saveFuelType',data);
}
export const saveNewVehicle =(data) =>{
    return AxiosInstance.post('admin/saveVehicle',data);
}
export const getVehicles = (field,order,pageSize,offset) =>{
    return AxiosInstance.get(`admin/getVehicles/${field}/${order}/${pageSize}/${offset}`);
}
export const updateUrlBook = (data) =>{
    return AxiosInstance.put('admin/updateVehicleBook',data);
}
export const saveVehicleLicense =(data) =>{
    return AxiosInstance.post('admin/saveVehicleLicense',data);
}
export const saveNewVehicleInsuranceType =(data) =>{
    return AxiosInstance.post('admin/saveNewVehicleInsuranceType',data);
}
export const getVehicleInsuranceTypes = () =>{
    return AxiosInstance.get('admin/getInsuranceTypes');
}
export const saveInsurance = (data) =>{
    return AxiosInstance.post('admin/saveInsurance',data);
}
export const saveEmissionTest =(data)=>{
    return AxiosInstance.post('admin/saveEmissionTest',data);
}
export const saveVehicleServiceOrRepair =(data) =>{
    return AxiosInstance.post('admin/saveVehicleServiceOrRepair',data);
}
export const commonItemsOrServiceOfferdByService =(data) =>{
    return AxiosInstance.post('admin/commonItemsOrServiceOfferdByService',data);
}
export const getCommonItemsOrServiceOfferdByService =()=>{
    return AxiosInstance.get('admin/getCommonItemsOrServiceOfferdByService');
}
export const VehicleServicesAndRepairEndUpdate = (data) =>{
    return AxiosInstance.put('admin/updateCommonItemsOrServiceOfferdByServiceEnd',data);
}
export const saveTrainer = (data) =>{
    return AxiosInstance.post('admin/saveTrainer',data);
}
export const getTrainers = (field,order,pageSize,offset) =>{
    return AxiosInstance.get(`admin/getAllTrainers/${field}/${order}/${pageSize}/${offset}`);
}
export const saveTrainerLicence = (data) =>{
    return AxiosInstance.post('admin/saveTrainerDrivingLicence',data);
}
export const saveTrainerPermit = (data) =>{
    return AxiosInstance.post('admin/saveTrainerPermit',data);
}