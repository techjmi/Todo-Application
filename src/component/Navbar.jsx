import React from 'react'
import "../App.css"
const Navbar = () => {
  return (
   <>
   <nav className="justify-between flex bg-slate-500 py-3 navbar">
    <div className="logo">
      <span className='font-bold text-xl mx-8'>
task
      </span>
    </div>
    <ul className="flex mx-8 gap-6">
      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
    </ul>
   </nav>
   </>
  )
}

export default Navbar
