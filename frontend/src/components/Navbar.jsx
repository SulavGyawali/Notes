
const Navbar = () => {
  return (
    <div className='sticky navbar bg-indigo-950 text-white flex justify-between items-center px-4 py-2 w-[100vw] h-[10vh]'>
        <div className="left flex items-center cursor-pointer hover:text-indigo-200 transition-all 200 ease-in-out">
            <h1 className='font-medium text-2xl pl-2'>Notes App</h1>
        </div>
        <div className="right pr-10">
            <ul className='flex items-center justify-around gap-6 text-lg font-medium text-indigo-200 '>
                <li className='hover:text-white cursor-pointer flex flex-col transition-all 200 ease-in-out group'><p>Log in</p>
                <span className='w-0 h-0.5 bg-red-600 group-hover:w-full transition-all 200 ease-in-out'></span>
                </li>

                <li className='hover:text-white cursor-pointer flex flex-col transition-all 200 ease-in-out group'><p>Sign in</p>
                <span className='w-0 h-0.5 bg-red-600 group-hover:w-full transition-all 200 ease-in-out'></span>
                </li>
            </ul>
        </div>
      
    </div>
  )
}

export default Navbar
