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

export const getOne = async (
  { id, adapter, coreData, type, userId, courseType },
  header = {}
) => {
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
        if (coreData === 'withLesonFilter') {
          const { children } = result?.data?.data
          if (children) {
            const childrenTracking = await Promise.all(
              children.map(async (item) => {
                const resultData = await getDataWithTracking(
                  item?.children,
                  userId
                )
                return { ...item, children: resultData }
              })
            )
            return {
              ...result?.data?.data,
              children: childrenTracking,
              courseType
            }
          }
          return { ...result?.data?.data, courseType }
        } else {
          const trakingData = await courseTrackingSearch({
            courseId: id,
            lessonId: id,
            userId: userId ? userId : localStorage.getItem('id')
          })
          return { ...result?.data?.data, trakingData, courseType }
        }
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
      // `https://dhruva.shikshalokam.org/api/content/v1/read/${id}?fields=ageGroup,appIcon,artifactUrl,attributions,attributions,audience,author,badgeAssertions,board,body,channel,code,concepts,contentCredits,contentType,contributors,copyright,copyrightYear,createdBy,createdOn,creator,creators,description,displayScore,domain,editorState,flagReasons,flaggedBy,flags,framework,gradeLevel,identifier,itemSetPreviewUrl,keywords,language,languageCode,lastUpdatedOn,license,mediaType,medium,mimeType,name,originData,osId,owner,pkgVersion,publisher,questions,resourceType,scoreDisplayConfig,status,streamingUrl,subject,template,templateId,totalQuestions,totalScore,versionKey,visibility,year,primaryCategory,additionalCategories,interceptionPoints,interceptionType&licenseDetails=name,description,url`,
      {
        params: {
          courseId: id
        },
        headers
      }
    )
    if (result?.data?.data) {
      return result.data?.data
    } else if (result?.data?.result) {
      return result.data?.result?.content
    } else {
      return {}
    }
  } catch {
    return {}
  }
}

export const lessontracking = async (
  { program, subject, ...params },
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      baseUrl + '/altlessontracking/altcheckandaddlessontracking',
      params,
      { params: { program, subject }, headers }
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

export const getLessontracking = async ({ userId, ...params }, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      `${baseUrl}/altlessontracking/search/${userId}`,
      { filters: params },
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

export const coursetracking = async (params, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      baseUrl + '/alt-course-tracking/altcreatecoursetracking',
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

export const getDataWithTracking = async (data, userId) => {
  if (Array.isArray(data)) {
    return await Promise.all(
      data.map(async (item) => {
        const trakingData = await courseTrackingSearch({
          lessonId: item?.identifier,
          userId: userId ? userId : localStorage.getItem('id')
        })
        return { ...item, trakingData }
      })
    )
  } else {
    return []
  }
}

export const courseTrackingSearch = async (
  { limit, userId, ...params },
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      `${baseUrl}/altlessontracking/search/${userId}`,
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

export const moduleTracking = async (
  { limit, userId, ...params } = {},
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      `${baseUrl}/altmoduletracking/search/${userId}`,
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
    const result = await get(baseUrl + '/course/{questionset}/questionsetid', {
      params: { questionsetId: id },
      headers
    })
    if (result?.data?.data) {
      return result.data?.data
    } else {
      return {}
    }
  } catch {
    return {}
  }
}

export const courseStatus = async (params, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  try {
    const result = await post(
      baseUrl + '/altusereligibility/altuserprogrameligibility',
      params,
      { params, headers }
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
