import React from 'react'
import logo from '../assets/Logo.jpg'
import {connectWallet} from '../Blockchain.services.jsx'
import { useGlobalState,truncate} from '../Post'
const Header = () => {
   const[connectedAccount] = useGlobalState ('connectedAccount')
    return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
        <div style={{ borderRight:'none' }} className=' flex items-center border-4 border-[#B27A6E] rounded-lg mr-14 whitespace-nowrap'>
        <img className="h-16 w-auto cursor-pointer" src={logo}/>
        <span>Реестр учета IP</span>
        </div>
        <ul className='md:flex-[0.5] md:flex hidden list-none flex-row justify-between '>
            <li  className='mx-4 cursor-pointer bg-[#B27A6E] bg-opacity-70 hover:bg-opacity-100 rounded-md text-center text-white p-2'>О проекте</li>
        </ul>
        { connectedAccount ?(
            <button 
            onClick={connectWallet}
            className='bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black'>
                {truncate(connectedAccount,4,4,11)}
            </button>
        ):(
            <button 
            onClick={connectWallet}
            className='bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black'>
                Войти
            </button>
          )
        }
    </div>  
  )
}
export default Header