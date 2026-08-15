import songsData from '../data/songs.json'
import AudioPlayer from './AudioPlayer'

const Hero = ({ isActive = true }) => {
  return (
    <div className='h-screen w-full '>
      <video src="/video/285224.mp4" autoPlay muted loop playsInline disablePictureInPicture className="absolute top-0 left-0 w-full h-full object-cover z-0"> </video>
      <div className='text-white flex justify-center items-end h-screen py-8'>
        <AudioPlayer songs={songsData.songs} isActive={isActive} />
      </div>
    </div>
  )
}

export default Hero