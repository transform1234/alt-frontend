import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import * as courseRegistryService from './courseRegistryService'
import moment from 'moment'
const dateFor = moment().format('YYYY-MM-DD')
export const getLessons = async (id) => {
  const lessonList = await get(
    `${process.env.REACT_APP_API_URL}/course/diksha/hierarchy/courseid?courseId=${id}`,
    {}
  )
  if (lessonList.data) {
    return lessonList.data.data
  }
}

export const getCoursesRule = async (
  { limit, filter, ...params } = {},
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const newParams = {
    board: localStorage.getItem('board'),
    medium: localStorage.getItem('medium'),
    grade: localStorage.getItem('grade'),
    ...params
  }

  const courseIdList = await post(
    `${process.env.REACT_APP_API_URL}/altprogramassociation/altrules`,
    newParams,
    { headers }
  )
  if (courseIdList.data) {
    return await getCourseArray(courseIdList.data.data[0].rules, filter)
  } else {
    return []
  }
}
const getCourseArray = async (programm, filter = {}) => {
  let courseRule = {}
  try {
    courseRule = JSON.parse(programm)
    if (courseRule?.prog) {
      const pdata = courseRule?.prog
        .map(async (el, index) => {
          if (el?.contentId && el?.contentType === 'assessment') {
            return await courseRegistryService.getOne({
              id: el.contentId,
              adapter: 'diksha',
              coreData: true,
              type: 'assessment',
              courseType: index === 0 ? 'baseline' : 'endline',
              ...filter
            })
          } else if (el?.contentId && el?.contentType === 'course') {
            return await courseRegistryService.getOne({
              id: el.contentId,
              adapter: 'diksha',
              coreData: true,
              type: 'course',
              courseType: 'course',
              ...filter
            })
          }
        })
        .filter((e) => e)
      return await Promise.all(pdata)
    }
    return []
  } catch (e) {
    console.log(e.message)
    return []
  }
}

const getCourse = async (IdArray) => {
  const courseList = await get(
    `${process.env.REACT_APP_API_URL}/course/diksha/courseIds?${IdArray}`,
    {}
  )
  if (courseList.data) {
    return courseList.data
  }
}
