import songs1Data from '../data/songs1.json'
import AudioPlayer from './AudioPlayer'

const Study = ({ isActive = false }) => {
  return (
    <div>
      <div className='h-screen w-full '>
        <video src="https://cdn.pixabay.com/video/2026/03/27/342901_large.mp4" autoPlay muted loop playsInline disablePictureInPicture className="absolute top-0 left-0 w-full h-full object-cover z-0"> </video>
        <div className='text-white flex justify-center items-end h-screen py-8'>
          <AudioPlayer songs={songs1Data.songs} isActive={isActive} />
        </div>
      </div>
    </div>
  )
}

export default Study