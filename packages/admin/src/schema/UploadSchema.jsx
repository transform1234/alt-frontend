import * as yup from "yup";

const UploadSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("*first name required")
    .min(3, "*should not be less than 3 characters"),
  gender: yup
    .string()
    .required("*gender is required")
    .min(3, "*should not be less than 3 characters"),

  dob: yup
    .string()
    .required("*dob is required")
    .min(3, "*should not be less than 3 characters"),
  email: yup
    .string()
    .required("*email is required")
    .min(3, "*should not be less than 3 characters"),
  mobile: yup
    .string()
    .required("*mobile number is required")
    .min(3, "*should not be less than 3 characters"),
  udise: yup
    .string()
    .required("*School udise is required")
    .min(3, "*should not be less than 3 characters"),
  grade: yup
    .string()
    .required("*grade is required")
    .min(3, "*should not be less than 3 characters"),
  religion: yup
    .string()
    .required("*religion is required")
    .min(3, "*should not be less than 3 characters"),
  caste: yup
    .string()
    .required("*caste is required")
    .min(3, "*should not be less than 3 characters"),
  annualIncome: yup
    .string()
    .required("*annual income is required")
    .min(3, "*should not be less than 3 characters"),
  motherEducation: yup
    .string()
    .required("*mother education is required")
    .min(3, "*should not be less than 3 characters"),
  fatherEducation: yup
    .string()
    .required("*father education is required")
    .min(3, "*should not be less than 3 characters"),
  motherOccupation: yup
    .string()
    .required("*mother Occupation is required")
    .min(3, "*should not be less than 3 characters"),
  fatherOccupation: yup
    .string()
    .required("*father occupation is required")
    .min(3, "*should not be less than 3 characters"),
  siblings: yup
    .string()
    .required("*siblings is required")
    .min(3, "*should not be less than 3 characters"),
});

export default UploadSchema;
