import React from 'react'
import Image from 'next/image'

interface VideoPlayerI {
    url: string
    width: number
    height: number
}

const VideoPlayer = (props: VideoPlayerI) => {
  return (
    <video autoPlay src={props.url} />
  )
}

export default VideoPlayer