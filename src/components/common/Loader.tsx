import React from 'react'

const Loader = () => {
  return (
      <div className="flex items-center justify-center h-screen">
          <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
                    aspect-square w-12 text-2xl flex justify-center items-center text-yellow-700 delay-100">
              $
          </div>
      </div>
  )
}

export default Loader