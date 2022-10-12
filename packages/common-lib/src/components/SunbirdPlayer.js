import React from 'react'
import { H2 } from './layout/HeaderTags'

const SunbirdPlayer = ({ public_url, setTrackData, ...props }) => {
  const { mimeType } = props
  let trackData = []
  const [url, setUrl] = React.useState()
  React.useEffect(() => {
    if (mimeType === 'application/pdf') {
      setUrl(`/pdf`)
    } else if (mimeType === 'video/mp4') {
      setUrl(`/video`)
    } else if (['application/vnd.sunbird.questionset'].includes(mimeType)) {
      setUrl(`/quml`)
    } else if (
      [
        'application/vnd.ekstep.ecml-archive',
        'application/vnd.ekstep.html-archive',
        'application/vnd.ekstep.content-collection'
      ].includes(mimeType)
    ) {
      setUrl(`/project-sunbird/content-player`)
    }
  }, [mimeType])

  React.useEffect(() => {
    if (url === `/project-sunbird/content-player`) {
      window.addEventListener(
        'message',
        (event) => {
          handleEvent(event)
        },
        false
      )
    }

    return () => {
      if (url === `/project-sunbird/content-player`) {
        window.removeEventListener('message', (val) => {})
      }
    }
  }, [url])

  const handleEvent = (event) => {
    const data = event?.data?.data
    if (data) {
      if (typeof data === 'string') {
        let telemetry = JSON.parse(data)
        if (telemetry?.eid === 'ASSESS') {
          const edata = telemetry?.edata
          if (!trackData.find((e) => e.index === edata.index)) {
            trackData = [...trackData, edata]
            if (setTrackData && props.totalQuestions === edata.index) {
              setTrackData(trackData)
            }
          }
        }
      }
    }
  }

  if (url) {
    return (
      <iframe
        id='preview'
        height={'100%'}
        width='100%'
        name={JSON.stringify(props)}
        src={`${public_url ? public_url : process.env.PUBLIC_URL}${url}`}
      />
    )
  } else {
    return <H2>{`${mimeType} this mime type not compatible`}</H2>
  }
}

export default React.memo(SunbirdPlayer)
