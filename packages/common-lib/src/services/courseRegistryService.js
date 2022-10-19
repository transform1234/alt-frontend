import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
  id: 'courseId',
  name: 'name',
  posterImage: 'posterImage',
  subject: 'subject',
  description: 'description',
  children: 'children'
}

let only = Object.keys(interfaceData)
let baseUrl = process.env.REACT_APP_API_URL

export const getAll = async ({ adapter, ...params } = {}, header = {}) => {
  let headers = {
    ...header,
    headers: {
      ...header.header,
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const result = await get(
    process.env.REACT_APP_API_URL + '/course/' + adapter + '/search',
    null,
    { params, headers }
  )

  if (result.data.data) {
    const newData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    return await getDataWithUser(newData)
  } else {
    return []
  }
}

export const getOne = async ({ id, adapter, coreData, type }, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      baseUrl + '/course/' + adapter + '/hierarchy/contentid',
      {
        params: { courseId: id, type: type },
        headers
      }
    )
    if (result?.data?.data) {
      if (coreData) {
        const trakingData = await courseTrackingSearch({
          courseId: id,
          userId: localStorage.getItem('id')
        })
        return { ...result?.data?.data, trakingData }
      }
      return mapInterfaceData(result.data.data, interfaceData)
    } else {
      return {}
    }
  } catch (e) {
    console.log('course/hierarchy/contentid', e.message)
    return {}
  }
}

export const getContent = async ({ id, adapter }, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await get(
      baseUrl + '/course/' + adapter + '/content/courseid',
      {
        params: {
          courseId: id
        },
        headers
      }
    )
    if (result?.data?.data) {
      return result.data?.data
    } else {
      return {}
    }
  } catch {
    return {}
  }
}

export const coursetracking = async (params, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      baseUrl + '/altlessontracking/altcreatecoursetracking/',
      params,
      {
        headers
      }
    )
    if (result?.data?.data) {
      return result.data?.data
    } else {
      return {}
    }
  } catch {
    return {}
  }
}

export const courseTrackingSearch = async (
  { limit, ...params },
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      baseUrl + '/altlessontracking/search',
      { filters: params, limit },
      {
        headers
      }
    )
    if (result?.data?.data) {
      return result.data?.data
    } else {
      return []
    }
  } catch {
    return []
  }
}

export const courseTrackingRead = async ({ id, ...params }, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await get(
      // baseUrl + '/altlessontracking/search',
      `https://dhruva.shikshalokam.org/api/questionset/v1/read/${id}?fields=instructions`,
      params,
      {
        headers
      }
    )
    if (result?.data?.data) {
      return result.data?.data
    } else {
      return {}
    }
  } catch {
    return {}
  }
}
