import { FaRegTimesCircle } from "react-icons/fa"
import {BsCheck2Circle } from "react-icons/bs"
import { useGlobalState } from "../Post"


const Alert = () => {
  const [alert] =useGlobalState('alert')

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-slate-700 bg-opacity-50 transform transition-transform duration-300 ${alert.show? 'scale-100':'scale-0'}`}>
        <div className='bg-white shadow-xl shadow-gray-800 rounded-md min-w-min p-3 border-2 border-slate-800'>

            <div className='flex flex-col items-center' action="">
{
  alert.color =='red'? (
    <FaRegTimesCircle className="text-red-500 text-3xl"/>
        ):(
          <BsCheck2Circle className="text-green-500 text-3xl"/>
        )}
        <p>{alert.msg}</p>
            </div>
        </div>
    </div>
  )
}


export default Alert