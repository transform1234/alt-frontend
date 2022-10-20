import React from 'react'
import { H2 } from './layout/HeaderTags'

const SunbirdPlayer = ({
  public_url,
  setTrackData,
  handleEditButton,
  ...props
}) => {
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
    if ([`/project-sunbird/content-player`, `/quml`].includes(url)) {
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
    const data = event?.data
    let telemetry = {}
    if (data && typeof data?.data === 'string') {
      telemetry = JSON.parse(data)
    } else if (data?.eid) {
      telemetry = data
    }
    if (telemetry?.eid === 'ASSESS') {
      const edata = telemetry?.edata
      if (trackData.find((e) => e?.item?.id === edata?.item?.id)) {
        const filterData = trackData.filter((e) => {
          console.log(e?.item?.id, '===', edata?.item?.id)
          return e?.item?.id !== edata?.item?.id
        })
        trackData = [...filterData, edata]
      } else {
        trackData = [...trackData, edata]
      }
      // console.log(telemetry, trackData)
    } else if (telemetry?.eid === 'END') {
      const summaryData = telemetry?.edata
      if (summaryData?.summary) {
        const { score } = summaryData.summary.find((e) => e['score'])
        setTrackData({ score, trackData })
      } else {
        console.log('summary is not found', telemetry)
      }
    } else if (telemetry?.eid === 'INTERACT') {
      if (telemetry?.edata?.id === 'exit') {
        handleEditButton()
      }
    }
  }

  if (url) {
    return (
      <iframe
        style={{ border: 'none' }}
        id='preview'
        height={'100%'}
        width='100%'
        name={JSON.stringify({
          ...props,
          questionListUrl:
            'https://dhruva.shikshalokam.org/api/question/v1/list'
          // questionListUrl: `${process.env.REACT_APP_API_URL}/course/questionset`
        })}
        src={`${public_url ? public_url : process.env.PUBLIC_URL}${url}`}
      />
    )
  } else {
    return <H2>{`${mimeType} this mime type not compatible`}</H2>
  }
}

export default React.memo(SunbirdPlayer)
