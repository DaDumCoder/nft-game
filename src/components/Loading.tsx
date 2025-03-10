import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50"></div>
      
      <div className="relative w-full h-full bg-[#6d5ceb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <div className="text-white text-xl font-bold">Loading wallet...</div>
        </div>
      </div>
      
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
    </div>
  </div>
  )
}

export default Loading