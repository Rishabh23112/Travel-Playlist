import React from 'react'
import AudioPlayer from './AudioPlayer'


const Hero = () => {
  return (
    <div  className='h-screen w-full'>
        <video src="/video/travelvid.mp4" autoPlay muted loop playsInline className="absolute object-cover z-0"> <source src=''/></video>
        <div className='text-white flex justify-center items-end h-screen py-8'>
            <AudioPlayer/>
        </div>
    </div>
  )
}

export default Hero