import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

export const getLessons = async () => {
  const lessonList = await get(
    'https://alt-shiksha.uniteframework.io/api/v1/course/diksha/hierarchy/courseid?courseId=do_3134227917801553921241',
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
