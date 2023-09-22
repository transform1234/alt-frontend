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
    .required("*Board is required")
    .min(3, "*should not be less than 3 characters"),
  mediumOfInstruction: yup
    .string()
    .required("*medium Of Instruction is required")
    .min(3, "*should not be less than 3 characters"),
  headmaster: yup
    .string()
    .required("*head master is required")
    .min(1, "*should not be empty"), // Updated min to 1 for non-empty string

  headmasterType: yup
    .string()
    .required("*headmaster Type required")
    .min(3, "*should not be less than 3 characters"),
  headmasterMobile: yup
    .string()
    .required("*headmaster Mobile required")
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
    .required("*totalFunctionalComputers is required"),
  noOfBoysToilet: yup.string().required("*noOfBoysToilet income is required"),
  noOfGirlsToilet: yup.string().required("*noOfGirlsToilet name is required"),
  smartBoardFunctionalClass6: yup
    .string()
    .required("*smartBoardFunctionalClass6 is required"),
  smartBoardFunctionalClass7: yup
    .string()
    .required("*smartBoardFunctionalClass7 is required"),
  smartBoardFunctionalClass8: yup
    .string()
    .required("*smartBoardFunctionalClass8 is required"),
  smartBoardFunctionalClass9: yup
    .string()
    .required("*smartBoardFunctionalClass9 is required"),
  smartBoardFunctionalClass10: yup
    .string()
    .required("*smartBoardFunctionalClass10 is required"),
  state: yup
    .string()
    .required("*state is required")
    .min(3, "*should not be less than 3 characters"),
  block: yup
    .string()
    .required("*block is required")
    .min(3, "*should not be less than 3 characters"),

  district: yup
    .string()
    .required("*district is required")
    .min(3, "*should not be less than 3 characters"),
});

export default SchoolSchema;
