import React from 'react'
import { LoaderCircle } from 'lucide-react'



export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-10">
       <LoaderCircle size={40} className='animate-spin m-auto'/>
    </div>
  )
}

