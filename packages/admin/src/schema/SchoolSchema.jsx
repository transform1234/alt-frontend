import * as yup from "yup";

const SchoolSchema = yup.object().shape({
  udiseCode: yup
    .string()
    .required("*udiseCode required")
    .min(3, "*should not be less than 3 characters"),
  name: yup
    .string()
    .required("*name required")
    .min(3, "*should not be less than 3 characters"),
  location: yup
    .string()
    .required("*location is required")
    .min(3, "*should not be less than 3 characters"),

  management: yup
    .string()
    .required("*management is required")
    .min(3, "*should not be less than 3 characters"),
  composition: yup
    .string()
    .required("*composition is required")
    .min(3, "*should not be less than 3 characters"),
  board: yup
    .string()
    .required("*board is required")
    .min(3, "*should not be less than 3 characters"),
  mediumOfInstruction: yup
    .string()
    .required("*mediumOfInstruction  is required")
    .min(3, "*should not be less than 3 characters"),
  headmaster: yup
    .string()
    .required("*headmaster is required")
    .min(1, "*should not be empty"), // Updated min to 1 for non-empty string

  headmasterMobile: yup
    .string()
    .required("*headmasterMobile required")
    .min(3, "*should not be less than 3 characters"),
  upperPrimaryTeachersSanctioned: yup
    .string()
    .required("*upperPrimaryTeachersSanctioned required")
    .min(3, "*should not be less than 3 characters"),
  secondaryTeachersSanctioned: yup
    .string()
    .required("*secondaryTeachersSanctioned required")
    .min(3, "*should not be less than 3 characters"),
  libraryFunctional: yup
    .string()
    .required("*libraryFunctional is required")
    .min(3, "*should not be less than 3 characters"),
  computerLabFunctional: yup
    .string()
    .required("*computerLabFunctional is required")
    .min(3, "*should not be less than 3 characters"),
  totalFunctionalComputers: yup
    .string()
    .required("*totalFunctionalComputers is required")
    .min(3, "*should not be less than 3 characters"),
  noOfBoysToilet: yup
    .string()
    .required("*noOfBoysToilet is required")
    .min(3, "*should not be less than 3 characters"),
  noOfGirlsToilet: yup
    .string()
    .required("*noOfGirlsToilet is required")
    .min(3, "*should not be less than 3 characters"),
  smartBoardFunctionalClass6: yup
    .string()
    .required("*smartBoardFunctionalClass6 is required")
    .min(3, "*should not be less than 3 characters"),
  smartBoardFunctionalClass7: yup
    .string()
    .required("*smartBoardFunctionalClass7 is required")
    .min(3, "*should not be less than 3 characters"),
  smartBoardFunctionalClass8: yup
    .string()
    .required("*smartBoardFunctionalClass8 is required")
    .min(3, "*should not be less than 3 characters"),
  motherOccupation: yup
    .string()
    .required("*motherOccupation is required")
    .min(3, "*should not be less than 3 characters"),
  fatherOccupation: yup
    .string()
    .required("*fatherOccupation is required")
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
  bloodGroup: yup
    .string()
    .required("*bloodGroup is required")
    .min(3, "*should not be less than 3 characters"),
  status: yup
    .string()
    .required("*status is required")
    .min(3, "*should not be less than 3 characters"),
  image: yup
    .string()
    .required("*image is required")
    .min(3, "*should not be less than 3 characters"),
});

export default SchoolSchema;
