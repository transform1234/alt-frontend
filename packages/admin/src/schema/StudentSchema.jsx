import * as yup from "yup";

const StudentSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("*first name required")
    .min(3, "*should not be less than 3 characters"),
  userName: yup
    .string()
    .required("*username required")
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
  group: yup
    .string()
    .required("*School group is required")
    .min(1, "*should not be empty"), // Updated min to 1 for non-empty string

  role: yup
    .string()
    .required("*role required")
    .min(3, "*should not be less than 3 characters"),
  board: yup
    .string()
    .required("*board required")
    .min(3, "*should not be less than 3 characters"),
  password: yup
    .string()
    .required("*password required")
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
  motherName: yup
    .string()
    .required("*mother name is required")
    .min(3, "*should not be less than 3 characters"),
  fatherName: yup
    .string()
    .required("*father name is required")
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
  uniqueId: yup
    .string()
    .required("*uniqueId is required")
    .min(3, "*should not be less than 3 characters"),
  state: yup
    .string()
    .required("*state is required")
    .min(3, "*should not be less than 3 characters"),
  block: yup
    .string()
    .required("*block is required")
    .min(3, "*should not be less than 3 characters"),
  serialNo: yup
    .string()
    .required("*serialNo is required")
    .min(3, "*should not be less than 3 characters"),
  district: yup
    .string()
    .required("*district is required")
    .min(3, "*should not be less than 3 characters"),
  section: yup
    .string()
    .required("*section is required")
    .min(3, "*should not be less than 3 characters"),
  medium: yup
    .string()
    .required("*medium is required")
    .min(3, "*should not be less than 3 characters"),
  bloodGroup: yup.string().required("*bloodGroup is required"),
  status: yup
    .string()
    .required("*status is required")
    .min(3, "*should not be less than 3 characters"),
  image: yup
    .string()
    .required("*image is required")
    .min(3, "*should not be less than 3 characters"),
});

export default StudentSchema;
