import React from 'react'
import { useGlobalState } from '../Post'

const Loading = () => {
    const [loading] = useGlobalState('loading')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-slate-700 bg-opacity-50 transform transition-transform duration-300 ${loading.show ? 'scale-100':'scale-0'}`}>
        <div className='bg-white shadow-xl shadow-gray-800 rounded-md w-10/12 md:w-2/5 h-7/12 p-3 border-2 border-slate-800'>

            <div className='flex flex-col items-center whitespace-nowrap' action="">
            <div className="lds-dual-ring"></div>
                {loading.msg}
            </div>
        </div>
    </div>
  )
}


export default Loading