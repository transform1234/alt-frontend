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
let baseUrl = 'https://alt-shiksha.uniteframework.io/api/v1' //process.env.REACT_APP_API_URL

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
      if (coreData) return result?.data?.data
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
  console.log(id)
  try {
    const result = await get(
      // baseUrl + '/course/' + adapter + '/content/courseid',
      'https://dhruva.shikshalokam.org/api/content/v1/read/' + id,
      {
        params: {
          courseId: id,
          fields:
            'ageGroup,appIcon,artifactUrl,attributions,attributions,audience,author,badgeAssertions,board,body,channel,code,concepts,contentCredits,contentType,contributors,copyright,copyrightYear,createdBy,createdOn,creator,creators,description,displayScore,domain,editorState,flagReasons,flaggedBy,flags,framework,gradeLevel,identifier,itemSetPreviewUrl,keywords,language,languageCode,lastUpdatedOn,license,mediaType,medium,mimeType,name,originData,osId,owner,pkgVersion,publisher,questions,resourceType,scoreDisplayConfig,status,streamingUrl,subject,template,templateId,totalQuestions,totalScore,versionKey,visibility,year,primaryCategory,additionalCategories,interceptionPoints,interceptionType&orgdetails=orgName,email&licenseDetails=name,description,url'
        },
        headers
      }
    )
    if (result?.data?.result) {
      return result.data?.result?.content
    } else {
      return {}
    }
  } catch {
    return {}
  }
}
