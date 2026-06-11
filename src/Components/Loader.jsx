import React from 'react'
import { 
  Loader2, 
} from "lucide-react";

export default function Loader() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#C01014]" />
          <div className="absolute w-8 h-8 bg-[#f9b685] rounded-full animate-ping opacity-40"></div>
        </div>
        <p className="text-[#C01014] font-semibold tracking-widest uppercase text-xs mt-6 animate-pulse">
          Loading Bazaar Experience...
        </p>
      </div>
    </>
  )
}
