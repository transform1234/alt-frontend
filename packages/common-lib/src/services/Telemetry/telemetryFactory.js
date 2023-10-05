import { generateUUID } from '../../components/helper'
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry'
import * as EkTelemetry from '@project-sunbird/telemetry-sdk'
import jQuery from 'jquery'

window.jQuery = jQuery

const telemetryConfig = {
  apislug: '',
  pdata: {
    id: 'alt.portal',
    pid: '0.0.1',
    ver: 'alt.portal'
  },
  env: 'alt.portal',
  channel: '',
  did: 'did',
  authtoken: '',
  studentid: 'student-id',
  uid: 'user-id',
  sid: 'session-id',
  batchsize: 1,
  mode: '',
  host: 'https://alt.uniteframework.io', //TODO: Change this host and endpoint properly
  endpoint: '/telemetry/v1/telemetry',
  tags: []
}
export const telemetryFactory = {
  init: () => {
    console.log('EkTelemetry', EkTelemetry)
    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({})
      CsTelemetryModule.instance.telemetryService.initTelemetry({
        config: telemetryConfig,
        userOrgDetails: {}
      })
    }
  },

  // This API is used to log telemetry of user interactions on the page. For example, search, click, preview, move, resize, configure

  interact: (interactEventInput) => {
    const eventData = getEventData(interactEventInput)
    if (CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
        options: eventData.options,
        edata: eventData.edata
      })
    }
  },

  // This API is used to log telemetry when users visit a specific page.

  impression: (impressionEventInput) => {
    const eventData = getEventData(impressionEventInput)
    console.log('check eventData', eventData)
    if (CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry({
        options: eventData.options,
        edata: eventData.edata
      })
    }
  },

  // This API is used to log telemetry of assessments that have occured when the user is viewing content
  assess: (assessEventInput) => {
    const eventData = getEventData(assessEventInput)
    
    if (CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.telemetryService.raiseAssesTelemetry({
        options: eventData.options,
        edata: eventData.edata
      })
    }
  },

  // This API is used to log telemetry of user response. For example; Responded to assessments.

  response: (responseEventInput) => {
    const eventData = getEventData(responseEventInput)
    
    if (CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.telemetryService.raiseResponseTelemetry({
        
        options: eventData.options,
        edata: eventData.edata
      })
    }
  },

  // This API is used to log telemetry for any interruptions that have occurred when a user is viewing content or playing games. For example; screen lock, incoming call, etc.

  interrupt: (interactEventInput) => {
    const eventData = getEventData(int)
  },

  start: ({ appName, ...edata }) => {
    return {
      type: edata?.type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata
    }
  },

  end: ({ appName, ...edata }) => {
    return {
      type: edata?.type,
      eid: generateUUID(),
      $set: { id: localStorage.getItem('id') },
      actor: {
        id: localStorage.getItem('id'),
        type: 'Teacher'
      },
      context: {
        type: appName ? appName : 'Standalone'
      },
      edata
    }
  }
}

function getEventData(eventInput) {
  const event = {
    edata: eventInput.edata,
    options: {
      context: getEventContext(eventInput),
      object: getEventObject(eventInput),
      tags: []
    }
  }
  return event
}

function getEventObject(eventInput) {
  if (eventInput.object) {
    const eventObjectData = {
      id: eventInput.object.id || '',
      type: eventInput.object.type || '',
      ver: eventInput.object.ver || '',
      rollup: eventInput.object.rollup || {}
    }
    return eventObjectData
  } else {
    return {}
  }
}

function getEventContext(eventInput) {
  const eventContextData = {
    channel: eventInput.edata.channel || telemetryConfig.channel,
    pdata: eventInput.context.pdata || telemetryConfig.pdata,
    env: eventInput.context.env || telemetryConfig.env,
    sid: eventInput.sid || telemetryConfig.sid,
    uid: 'user-id', //user id
    cdata: eventInput.context.cdata || []
  }
  if (telemetryConfig.sid) {
    eventContextData.cdata.push({
      id: telemetryConfig.sid,
      type: 'UserSession'
    })
  }
  eventContextData.cdata.push({
    id: 'uuid',
    type: 'Device'
  })
  return eventContextData
}

function getRollUpData(data = []) {
  const rollUp = {}
  data.forEach((element, index) => (rollUp['l' + (index + 1)] = element))
  return rollUp
}
