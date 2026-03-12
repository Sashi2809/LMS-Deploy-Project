import { Loader } from 'lucide-react'
import React from 'react'
import { RingLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <RingLoader size={40} />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
    </div>
  )
}

export default LoadingSpinner