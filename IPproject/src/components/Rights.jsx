import React from 'react'
import{useState,useEffect} from 'react'
import logo from '../assets/Logo.jpg'
import { setGlobalState,useGlobalState, truncate} from '../Post'


const Rigths = () => {
   const [nfts] = useGlobalState('nfts')
  return (
    <div  className='text-3xl flex flex-col justify-between w-4/5 items-center pt-20 mx-auto'>
        <div className='flex flex-row justify-between w-4/5 items-stretch'>
        Купленные лицензии
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 border-2 border-slate-200 rounded-xl p-2 m-2'
        >
            {nfts.map((nft,i) => (
                <Post key={i} nft={nft} />
          ))}
        </div>
        <div className='text-center my-5'>
        </div>
    </div>
  )
}
  

const Post =({nft})=> {
    const [connectedAccount] = useGlobalState('connectedAccount')
    const handleClick2 = ()=>{
        window.open(nft.metadataURI);
    }
    const setNft = () => {
        setGlobalState('nft',nft)
        setGlobalState('disModal','scale-100')
    }
    if (nft.nfttype==='2'){
    if (nft.owner.toLowerCase()===connectedAccount){
    return(
    <div className='w-full shadow-xl shadow-orange-100 rounded-md overflow-hidden bg-gray-100 my-2 p-3 border-2 border-[#A81E00]'>
        <img className='h-60% w-30% object-cover shadow-lg shadow-yellow-300 rounded-lg mb-2' src={logo} alt={nft.title} />
        <p className='text-center text-lg'>{nft.title}</p>
        <div className='flex flex-col justify-between items-center mt-3'>
            <button  type='button'
            onClick={handleClick2}
            className='  bg-slate-500 rounded-md text-base p-2'>Выгрузить патент</button>
        </div>
    </div>)
    }else {return false}
    } else {return false}
}
export default Rigths