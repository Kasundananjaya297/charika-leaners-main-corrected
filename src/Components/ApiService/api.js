import AxiosInstance from "./AxiosInstance";

/* old method I tried */

// const generateHeaders = (token) => {
//   return {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   };
// };

export const ValidateUser = (userData) => {
  return AxiosInstance.post("authentication/ValidateUser", userData);
};

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
  return AxiosInstance.post("admin/SaveTrialPermit", permitData);
};
export const getTrailPermit = (stdID) =>{
  return AxiosInstance.get(`admin/getTrialPermit/${stdID}`);
}
