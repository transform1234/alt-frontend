import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import { classRegistryService } from '..'

const interfaceData = {
  id: 'userId',
  fullName: 'fullName',
  firstName: 'firstName',
  lastName: 'lastName',
  name: 'name',
  email: 'email',
  aadhaar: 'aadhaar',
  cadre: 'cadre',
  compSkills: 'compSkills',
  designation: 'designation',
  image: 'image',
  workingStatus: 'workingStatus',
  birthDate: 'birthDate',
  block: 'block',
  bloodGroup: 'bloodGroup',
  class: 'grade',
  grade: 'grade',
  board: 'board',
  createdAt: 'createdAt',
  disability: 'disability',
  district: 'district',
  employmentType: 'employmentType',
  gender: 'gender',
  homeDistance: 'homeDistance',
  joiningDate: 'joiningDate',
  maritalStatus: 'maritalStatus',
  middleName: 'middleName',
  medium: 'medium',
  phoneNumber: 'phoneNumber',
  pincode: 'pincode',
  profQualification: 'profQualification',
  refId1: 'refId1',
  refId2: 'refId2',
  refId3: 'refId3',
  religion: 'religion',
  reportsTo: 'reportsTo',
  retirementDate: 'retirementDate',
  schoolId: 'schoolId',
  section: 'section',
  socialCategory: 'socialCategory',
  stateId: 'stateId',
  status: 'status',
  subjectIds: 'subjectIds',
  address: 'address',
  updatedAt: 'updatedAt',
  village: 'village',
  fcmToken: 'fcmToken',
  role: 'role',
  mergeParameterWithValue: {
    title: 'fullName'
  }
}

export const getAll = async ({ sortBy, classId, ...params }, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    ContentType: 'application/json',
    Accept: 'application/json',
    ...header
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/group/${classId}/participants`,
    {
      params,
      headers
    }
  ).catch((e) => e)
  if (result?.data?.data && result.data.data.length) {
    const studentData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    if (sortBy && sortBy !== '') {
      return studentData.sort(function (oldItem, newItem) {
        return oldItem[sortBy] === newItem[sortBy]
          ? 0
          : oldItem[sortBy] < newItem[sortBy]
          ? -1
          : 1
      })
    } else {
      return studentData
    }
  }
  return []
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  }
  const result = await get(
    process.env.REACT_APP_API_URL + '/student/' + filters.id,
    {
      headers
    }
  )
  if (result?.data?.data) {
    let resultStudent = mapInterfaceData(result.data.data, interfaceData)
    resultStudent.id = resultStudent.id?.startsWith('1-')
      ? resultStudent.id?.replace('1-', '')
      : resultStudent.id
    return resultStudent
  } else {
    return {}
  }
}

export const update = async (data = {}, headers = {}) => {
  let newInterfaceData = interfaceData
  if (headers?.removeParameter || headers?.onlyParameter) {
    newInterfaceData = {
      ...interfaceData,
      removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
      onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : []
    }
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await coreUpdate(
    process.env.REACT_APP_API_URL + '/student/' + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result?.data) {
    return result
  } else {
    return {}
  }
}

export const getAllStudents = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/student/search',
    { filters },
    {
      headers
    }
  )
  if (result?.data?.data) {
    const studentData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    return studentData
  } else {
    return {}
  }
}

export const setDefaultValue = async (data) => {
  return data.map((e) => mapInterfaceData(e, interfaceData))
}

export const getByTeacher = async () => {
  try {
    const classResult = await classRegistryService.getAll({
      teacherId: localStorage.getItem('id'),
      role: 'teacher'
    })

    if (classResult[0].id) {
     const groupdID =  localStorage.getItem("groupId")
      return {
        class: groupdID,
        data: await getAll({
          classId: groupdID,
          role: 'student'
        })
      }
    }
  } catch (e) {
    console.log('error', e.message)
  }
  return { class: {}, data: [] }
}
