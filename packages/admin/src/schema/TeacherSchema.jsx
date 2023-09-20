import * as yup from "yup";

const TeacherSchema = yup.object().shape({
  name: yup
    .string()
    .required("*first name required")
    .min(3, "*should not be less than 3 characters"),
  username: yup
    .string()
    .required("*username required")
    .min(3, "*should not be less than 3 characters"),
  gender: yup
    .string()
    .required("*gender is required")
    .min(3, "*should not be less than 3 characters"),

  dateOfBirth: yup
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
  schoolUdise: yup
    .string()
    .required("*School udise is required")
    .min(3, "*should not be less than 3 characters"),
  currentRole: yup
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
  educationalQualification: yup
    .string()
    .required("*educational Qualification is required")
    .min(3, "*should not be less than 3 characters"),
  status: yup
    .string()
    .required("*current Role is required")
    .min(3, "*should not be less than 3 characters"),
  natureOfAppointment: yup
    .string()
    .required("*nature Of appointment is required")
    .min(3, "*should not be less than 3 characters"),
  appointedPost: yup
    .string()
    .required("*appointed Post Name is required")
    .min(3, "*should not be less than 3 characters"),
  totalTeachingExperience: yup
    .string()
    .required("*total Experience In Teaching is required")
    .min(3, "*should not be less than 3 characters"),
  totalHeadteacherExperience: yup
    .string()
    .required("* total Experience As Head is required")
    .min(3, "*should not be less than 3 characters"),
  classesTaught: yup
    .string()
    .required("*class Taught is required")
    .min(1, "*should not be less than 1 characters"),
  coreSubjectTaught: yup
    .string()
    .required("*core Subject Taught is required")
    .min(3, "*should not be less than 3 characters"),
  attendedInserviceTraining: yup
    .string()
    .required("*attended In Service Training is required")
    .min(3, "*should not be less than 3 characters"),
  lastTrainingAttendedTopic: yup
    .string()
    .required("*last Training Attended Topic is required")
    .min(3, "*should not be less than 3 characters"),
  lastTrainingAttendedYear: yup
    .string()
    .required("*last Training Attended Year is required")
    .min(3, "*should not be less than 3 characters"),
  trainedInComputerDigitalteaching: yup
    .string()
    .required("*Trained in Use of Computer And Digital Teaching is required")
    .min(3, "*should not be less than 3 characters"),
});

export default TeacherSchema;
