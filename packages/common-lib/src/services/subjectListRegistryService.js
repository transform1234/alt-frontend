import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import moment from 'moment'
import { courseRegistryService } from '..'
import { async } from '@firebase/util'
const dateFor = moment().format('YYYY-MM-DD')

export const getProgramId = async (props) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const programID = await post(
    `${process.env.REACT_APP_API_URL}/altprogram/bmgs`,
    {
      board: localStorage.getItem('board'),
      medium: localStorage.getItem('medium'),
      grade: localStorage.getItem('grade'),
      currentDate: dateFor,
      ...props
    },
    { headers }
  )
  if (programID?.data?.data) {
    return programID?.data?.data[0]
  }
}

export const getSubjectList = async () => {
  const data = await getProgramId()
  if (data?.programId) {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
    const subjectList = await post(
      `${process.env.REACT_APP_API_URL}/altprogramassociation/altsubjectlist`,
      {
        board: localStorage.getItem('board'),
        medium: localStorage.getItem('medium'),
        grade: localStorage.getItem('grade'),
        programId: data?.programId
      },
      { headers }
    )
    if (subjectList?.data?.data) {
      return _.sortBy(subjectList?.data?.data, 'rules')
    }
  } else {
    return []
  }
}

export const getOngoingCourses = async (
  { programId, ...filters },
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/altcurrentphase/altgetcurrentphase/${programId}`,
    {
      headers
    }
  )
  if (result?.data?.data) {
    if (Array.isArray(result?.data?.data)) {
      let couses = []
      result?.data?.data.forEach(async (item) => {
        couses = [
          ...couses,
          ...item?.ongoingCourses.map(async (subItem) => {
            return await courseRegistryService.getOne({
              id: subItem?.courseId,
              adapter: 'diksha',
              coreData: 'core'
            })
          })
        ]
      })
      return await Promise.all(couses)
    } else {
      return result?.data?.data
    }
  } else {
    return []
  }
}
