import React from 'react'
import { H2 } from './layout/HeaderTags'

const SunbirdPlayer = ({ public_url, ...props }) => {
  const { mimeType } = props
  console.log({ props })
  const [url, setUrl] = React.useState()
  React.useEffect(() => {
    if (mimeType === 'application/pdf') {
      setUrl(`${public_url ? public_url : process.env.PUBLIC_URL}/pdf`)
    } else if (mimeType === 'video/mp4') {
      setUrl(`${public_url ? public_url : process.env.PUBLIC_URL}/video`)
    } else if (['application/vnd.sunbird.questionset'].includes(mimeType)) {
      setUrl(`${public_url ? public_url : process.env.PUBLIC_URL}/quml`)
    } else if (
      [
        'application/vnd.ekstep.ecml-archive',
        'application/vnd.ekstep.html-archive',
        'application/vnd.ekstep.content-collection'
      ].includes(mimeType)
    ) {
      setUrl(
        `${
          public_url ? public_url : process.env.PUBLIC_URL
        }/project-sunbird/content-player`
      )
    }
  }, [mimeType])

  if (url) {
    return (
      <iframe
        id='preview'
        height={'100%'}
        width='100%'
        name={JSON.stringify(props)}
        src={`${url}`}
      />
    )
  } else {
    return <H2>{`${mimeType} this mime type not compatible`}</H2>
  }
}

export default React.memo(SunbirdPlayer)
