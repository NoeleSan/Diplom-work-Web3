import Identicon from 'react-identicons'
import React from 'react'
import {FaTimes} from 'react-icons/fa'
import logo from '../assets/Logo.jpg'
import {setGlobalState,useGlobalState,getGlobalState, truncate} from '../Post'
import { useEffect } from 'react'
import axios from 'axios'
const IPDis = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [nfts]=useGlobalState('nfts')
    const find = (title) =>{
        for (let i = 0; i < nfts.length; i += 1) {
            if (nfts[i].title == title && nfts[i].nfttype=='2' && nfts[i].owner.toLowerCase() == connectedAccount) {
                console.log('dsadasds')
                return true
            }
          }
        }
        const counting = (title) =>{
            let count =0
            for (let i = 0; i < nfts.length; i += 1) {
                if (nfts[i].title == title && nfts[i].nfttype=='2') {
                    count = count + 1
                }
              }
              return count
            }
    const [modal]=useGlobalState('disModal')
    const [nft]=useGlobalState('nft')
    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
    }
    const closeModal= () => {
        setGlobalState('disModal','scale-0')
    }
    const handleClick = () => {
    try{
        axios.put('https://api.chatengine.io/chats/',
        { "title": nft.id, "is_direct_chat": true, "usernames": [nft.owner.toLowerCase(), connectedAccount]},
        {headers : {"Project-ID": "f7027c30-5fa5-4d18-b960-de3a0dcd7131", "User-Name":connectedAccount, "User-Secret":connectedAccount}})
        closeModal()  
        setGlobalState('chat',1)
    }
 
        catch(e){
            console.log(e)
          alert('Войдите в метамаск')
  
        }
}
const handleClick2 = ()=>{
    window.open(nft.metadataURI);
}

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-slate-700 bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className='bg-white shadow-xl shadow-gray-800 rounded-md w-11/12 md:w-2/5 h-7/12 p-6 border-2 border-slate-800'>

            <form onSubmit={handleSubmit}
            className='flex flex-col' >
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>
                        Информация о IP
                    </p>
                    <button type="button" 
                    onClick={closeModal}
                    className='border-0 focus:outline-none'>
                        <FaTimes/>
                    </button>
                </div>

                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-20 w-20 rounded-xl overflow-hidden'>
                        <img className='h-full w-full object-cover cursor-pointer' src={logo} alt={nft?.title} />
                    </div>
                </div>
                <div className=' flex flex-col justify-start rounded-xl mt-5'>
                    <h4>
                        {nft?.title}
                    </h4>
                    <p className='my-1 text-sm'>
                        {nft?.description}
                    </p>
                    {nft?.owner.toLowerCase()===connectedAccount &&
                    <p className='my-1 text-sm text-lime-600'>
                        Количество проданных лицензий: {counting(nft?.title)}
                    </p>}
                </div>
                <div className='flex mt-2  items-center'>
                    <Identicon string={nft?.owner} size={'50'} className='flex justify-start items-center rounded-xl border-2 border-black'/>
                    <div className='mx-5 flex flex-col items-start'>
                        <p className='text-sm'>Обладатель</p>
                        <small className='  text-red-700'>{nft?.owner}</small>
                    </div>
                </div>
                
                {nft?.owner.toLowerCase()===connectedAccount && 
                <button type='button' onClick={handleClick2}
                className=' flex justify-center items-center bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black mt-5'>
                Скачать файлы патента
                </button>}
                {nft?.owner.toLowerCase()!=connectedAccount && find(nft?.title)!=true ?
                <button type='button' onClick={handleClick}
                className=' flex justify-center items-center bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black mt-5'>
                Написать обладателю
                </button>:false
                }
            </form>
        </div>
    </div>
  )
}
export default IPDis