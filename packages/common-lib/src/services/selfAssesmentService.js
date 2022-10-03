import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

export const getLessons = async (id) => {
  const lessonList = await get(
    'https://alt-shiksha.uniteframework.io/api/v1/course/diksha/hierarchy/courseid?courseId=' +
      id,
    {
      request: {
        filters: {}
      }
    }
  )
  if (lessonList.data) {
    return lessonList.data.data
    // return Promise.all(lessonList.data).then((values) => values)
  }
  // return 'lessonList.data'
}

export const getCoursesRule = async () => {
  const courseIdList = await post(
    'https://alt-shiksha.uniteframework.io/api/v1/self-assessment/fbmgs',
    {
      framework: 'ALT Fw',
      board: 'Haryana',
      medium: 'English',
      grade: '10',
      subject: 'English'
    }
  )
  if (courseIdList.data) {
    return await getCourseArray(courseIdList.data.data[0].AssessProgram.rules)
    // return courseIdList.data
    // return Promise.all(lessonList.data).then((values) => values)
  }
  // return 'lessonList.data'
}

const getCourseArray = async (programm) => {
  const courseRule = JSON.parse(programm)
  var IdArray = ''
  var courseArray = []

  // console.log(courseRule)

  courseRule.prog.forEach((el, index) => {
    // console.log(el)
    IdArray = IdArray + 'courseIds=' + el.courseId + '&'
  })
  // courseArray.push(await getCourse(IdArray))
  return await getCourse(IdArray)
  // console.log('courseArray----', courseArray)
}

const getCourse = async (IdArray) => {
  const courseList = await get(
    'https://sandbox.shikshaplatform.io/api/v1/course/diksha/courseIds?' +
      IdArray,
    {}
  )
  if (courseList.data) {
    return courseList.data.data
  }
}
