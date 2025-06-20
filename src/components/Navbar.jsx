import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around  bg-gray-100  ' >
        <div className="title font-bold text-2xl p-2">
           <span className='text-teal-400'>&lt; </span>Pass<span className='text-teal-400'>Pocket /&gt;</span>
        </div>
        <div className='hidden sm:block'> 
          <button className='flex items-center gap-2 bg-teal-200 p-2 rounded-3xl cursor-pointer m-2 hover:underline'>
              <img src="/public/github.svg" alt="" width={35} height={35} />
              <span >GitHub</span>
          </button>
        </div>
    </nav>
  )
}

export default Navbar
