"use client";
import Welcome from '@/components/Welcome/Welcome'
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const handleLogout = async()=>{
    try{
      const res = await axios("/api/users/logout")
      if(res && res?.data.success){
        router.refresh();
      }
    }catch(e){
      console.log(e)
    }
  }
  return (
    <main className="home__section min-h-screen relative">
      <Welcome/>
      <header className='hero__section h-screen relative z-10'>
        <button onClick = {handleLogout}>Logout</button>
      </header>
    </main>
  )
}
