import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import moment from 'moment'
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
      return subjectList?.data?.data
    }
  } else {
    return []
  }
}
