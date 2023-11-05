import Image from 'next/image'
import NavBar from './navigation/NavBar'



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar currentUser={null}  />
      <h1> Welcome</h1>
    </main>
  )
}
