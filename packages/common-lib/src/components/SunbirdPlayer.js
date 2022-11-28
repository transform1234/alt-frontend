import React from 'react'
import { H2 } from './layout/HeaderTags'

const SunbirdPlayer = ({
  public_url,
  setTrackData,
  handleExitButton,
  ...props
}) => {
  const { mimeType } = props
  let trackData = []
  const [url, setUrl] = React.useState()
  React.useEffect(() => {
    if (mimeType === 'application/pdf') {
      setUrl(`/pdf`)
    } else if (['video/mp4', 'video/webm'].includes(mimeType)) {
      setUrl(`/video`)
    } else if (['application/vnd.sunbird.questionset'].includes(mimeType)) {
      setUrl(`/quml`)
    } else if (
      [
        'application/vnd.ekstep.ecml-archive',
        'application/vnd.ekstep.html-archive',
        'application/vnd.ekstep.content-collection',
        'application/vnd.ekstep.h5p-archive',
        'video/x-youtube'
      ].includes(mimeType)
    ) {
      setUrl(`/content-player`)
    }
  }, [mimeType])

  React.useEffect(() => {
    if ([`/content-player`, `/quml`, `/pdf`, `/video`].includes(url)) {
      window.addEventListener(
        'message',
        (event) => {
          handleEvent(event)
        },
        false
      )
    }

    return () => {
      if ([`/content-player`, `/quml`, `/pdf`, `/video`].includes(url)) {
        window.removeEventListener('message', (val) => {})
      }
    }
  }, [url])

  const handleEvent = (event) => {
    const data = event?.data
    let telemetry = {}
    if (data && typeof data?.data === 'string') {
      telemetry = JSON.parse(data.data)
    } else if (data && typeof data === 'string') {
      telemetry = JSON.parse(data)
    } else if (data?.eid) {
      telemetry = data
    }
    console.log(trackData)
    if (telemetry?.eid === 'ASSESS') {
      const edata = telemetry?.edata
      if (trackData.find((e) => e?.item?.id === edata?.item?.id)) {
        const filterData = trackData.filter(
          (e) => e?.item?.id !== edata?.item?.id
        )
        trackData = [
          ...filterData,
          {
            ...edata,
            sectionName: props?.children?.find(
              (e) => e?.identifier === telemetry?.edata?.item?.sectionId
            )?.name
          }
        ]
      } else {
        trackData = [
          ...trackData,
          {
            ...edata,
            sectionName: props?.children?.find(
              (e) => e?.identifier === telemetry?.edata?.item?.sectionId
            )?.name
          }
        ]
      }
      // console.log(telemetry, trackData)
    } else if (
      telemetry?.eid === 'INTERACT' &&
      mimeType === 'video/x-youtube'
    ) {
      // const edata = telemetry?.edata
      // trackData = [...trackData, edata]
    } else if (telemetry?.eid === 'END') {
      const summaryData = telemetry?.edata
      if (summaryData?.summary && Array.isArray(summaryData?.summary)) {
        const score = summaryData.summary.find((e) => e['score'])
        if (score?.score) {
          setTrackData({ score: score?.score, trackData })
        } else {
          setTrackData(telemetry?.edata)
          handleExitButton()
        }
      } else {
        setTrackData(telemetry?.edata)
        console.log('summary is not found', telemetry)
      }
    } else if (
      telemetry?.eid === 'IMPRESSION' &&
      telemetry?.edata?.pageid === 'summary_stage_id'
    ) {
      setTrackData(trackData)
    } else if (['INTERACT', 'HEARTBEAT'].includes(telemetry?.eid)) {
      if (
        telemetry?.edata?.id === 'exit' ||
        telemetry?.edata?.type === 'EXIT'
      ) {
        handleExitButton()
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
