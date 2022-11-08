import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import moment from 'moment'
const dateFor = moment().format('YYYY-MM-DD')

export const getProgramId = async (data) => {
  const programID = await post(
    `${process.env.REACT_APP_API_URL}/selfassessment/fbmgs`,
    {
      framework: 'ALT new',
      board: 'Haryana',
      medium: 'English',
      grade: '10',
      currentDate: dateFor
    }
  )
  console.log(programID.data)
  if (programID.data) {
    return programID.data
  }
}

export const getSubjectList = async (data) => {
  const getId = await getProgramId()
  console.log(
    getId.data?.map((val) => {
      return val.programId
    })
  )
  const pid = getId.data?.map((val) => {
    return val.programId
  })
  const PId = [...pid]
  console.log(PId)
  if (PId) {
    const subjectList = await post(
      `${process.env.REACT_APP_API_URL}/altprogramassociation/altsubjectlist`,
      {
        framework: 'ALT new',
        board: 'Haryana',
        medium: 'English',
        grade: '10',
        programId: 'c0c5fdc0-b6cb-4130-8e0c-e5d9426d57ef'
      }
    )
    console.log(subjectList.data)
    if (subjectList.data) {
      return subjectList.data
    }
  }
}
