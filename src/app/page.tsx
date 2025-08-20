import AudioRecoder from '@/components/AudioRecoder'
import AudioRecorders from '@/components/AudioRecoder'
import ChatWindow from '@/components/ChatWindow'
import NavBar from '@/components/NavBar'

export default function Home () {
  return (
    <main className='flex flex-col items-center p-10 min-h-screen bg-gray-100'>
      <NavBar />
      <ChatWindow />
      <AudioRecoder />
    </main>
  )
}
