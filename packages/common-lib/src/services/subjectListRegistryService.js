import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import moment from 'moment'
const dateFor = moment().format('YYYY-MM-DD')

export const getProgramId = async (data) => {
  const programID = await post(
    `${process.env.REACT_APP_API_URL}/altprogram/fbmgs`,
    {
      framework: 'ALT new',
      board: localStorage.getItem('board'),
      medium: localStorage.getItem('medium'),
      grade: localStorage.getItem('grade'),
      currentDate: dateFor
    }
  )
  if (programID?.data?.data) {
    return programID?.data?.data[0]
  }
}

export const getSubjectList = async () => {
  const data = await getProgramId()
  if (data?.programId) {
    const subjectList = await post(
      `${process.env.REACT_APP_API_URL}/altprogramassociation/altsubjectlist`,
      {
        framework: 'ALT new',
        board: localStorage.getItem('board'),
        medium: localStorage.getItem('medium'),
        grade: localStorage.getItem('grade'),
        programId: data?.programId
      }
    )
    if (subjectList?.data?.data) {
      return subjectList?.data?.data
    }
  } else {
    return []
  }
}
