import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import * as courseRegistryService from './courseRegistryService'

export const getLessons = async (id) => {
  const lessonList = await get(
    `${process.env.REACT_APP_API_URL}/course/diksha/hierarchy/courseid?courseId=${id}`,
    {}
  )
  if (lessonList.data) {
    return lessonList.data.data
  }
}

export const getCoursesRule = async () => {
  const courseIdList = await post(
    `${process.env.REACT_APP_API_URL}/altprogramassociation/altrules`,
    {
      programId: 'c0c5fdc0-b6cb-4130-8e0c-e5d9426d57ef',
      framework: 'ALT new',
      board: 'Haryana',
      medium: 'English',
      grade: '10',
      subject: 'English'
    }
  )
  if (courseIdList.data) {
    return await getCourseArray(courseIdList.data.data[0].rules)
    // return courseIdList.data
    // return Promise.all(lessonList.data).then((values) => values)
  } else {
    return []
  }
  // return 'lessonList.data'
}

const getCourseArray = async (programm) => {
  const courseRule = JSON.parse(programm)
  const pdata = courseRule?.prog
    .map(async (el, index) => {
      if (el?.contentId && el?.contentType === 'assessment') {
        return await courseRegistryService.getOne({
          id: el.contentId,
          adapter: 'diksha',
          coreData: true,
          type: 'assessment'
        })
      } else if (el?.contentId && el?.contentType === 'course') {
        return await courseRegistryService.getOne({
          id: el.contentId,
          adapter: 'diksha',
          coreData: true,
          type: 'course'
        })
      }
    })
    .filter((e) => e)
  return await Promise.all(pdata)
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
