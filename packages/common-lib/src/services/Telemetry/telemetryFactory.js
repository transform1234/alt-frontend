import { generateUUID } from '../../components/helper'
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import * as EkTelemetry from '@project-sunbird/telemetry-sdk';
import jQuery from 'jquery'

window.jQuery = jQuery;

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
  uid: 'user-id',
  sid: 'session-id',
  batchsize: 1,
  mode: '',
  host: 'https://3.111.252.243:9001', //TODO: Change this host and endpoint properly
  endpoint: '/v1/telemetry',
  tags: []
}
export const telemetryFactory = {
  init: () => {
  console.log('EkTelemetry', EkTelemetry);
    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({})
      CsTelemetryModule.instance.telemetryService.initTelemetry({
        config: telemetryConfig,
        userOrgDetails: {}
      })
    }
    // CsTelemetryModule.instance.init({});
    // console.log("telemetryInstance", CsTelemetryModule.instance.isInitialised);
  },
  interact: (interactEventInput) => {
    // console.log(CsTelemetryModule.instance.isInitialised)
    // CsTelemetryModule.instance.raiseInteractTelemetry({
    //   options: eventData.options,
    //   edata: eventData.edata
    // })

      const eventData = getEventData(interactEventInput);
      console.log("eventData", eventData);
      CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
        options: eventData.options,
        edata: eventData.edata
      });
    // return {
    //   type: edata?.type,
    //   eid: generateUUID(),
    //   $set: { id: localStorage.getItem('id') },
    //   actor: {
    //     id: localStorage.getItem('id'),
    //     type: 'Teacher'
    //   },
    //   context: {
    //     type: appName ? appName : 'Standalone'
    //   },
    //   edata
    // }
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
