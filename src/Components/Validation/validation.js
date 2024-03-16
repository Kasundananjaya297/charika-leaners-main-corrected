import * as Yup from "yup";

export const validateName = (data) => {
  return Yup.string()
    .max(30, "allowed 30 letters")
    .min(2, "minimum 2 characters")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .required(`${data} is required`);
};
export const validateEmail = () => {
  return Yup.string().email("Invalid Email").required("Email is required");
};
export const validateTelephone = () => {
  return Yup.string()
    .required("Phone is required")
    .max(9, "cannot exceed 10 digits")
    .min(9, "cannot less than 10 digits");
};
export const validateNIC = () => {
  return Yup.string()
    .required("NIC is required")
    .min(10, "at least 10 characters")
    .max(12, "at most 12 digits")
    .matches(/^\d{12}$|\d{9}[vVxX]/, "invalid format");
};
export const ValidateNonRequiredName = () => {
  return Yup.string()
    .notRequired()
    .max(30, "allowed 30 letters")
    .min(2, "minimum 2 characters")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed");
};
