const baseLink = process.env.REACT_APP_API_URL;

export const studentRegister = baseLink + "/student";
export const teacherRegister = baseLink + "/teacher";
export const studentBulk = baseLink + "/student/bulkupload";
export const schoolRegister = baseLink + "/school";
export const schoolBulk = baseLink + "/school/bulkupload";
export const teacherBulk = baseLink + "/teacher/bulkupload";
export const studentReset = baseLink + "/user/reset-password";
export const studentSearch = baseLink + "/student/search";
export const teacherSearch = baseLink + "/teacher/search";
export const schoolSearch = baseLink + "/school/search";export const groupSearch = baseLink + "/group/search";

// Add new endpoints
export const getStateList = baseLink + "/student/getStatesList";
export const getDistrictList = baseLink + "/student/getDistrictList";
export const getBlockList = baseLink + "/student/getBlockList";
export const getSchoolList = baseLink + "/student/getSchoolList";
export const getClassList = baseLink + "/student/getClass";