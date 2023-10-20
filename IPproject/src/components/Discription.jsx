import React from 'react'
import {setGlobalState,useGlobalState,getGlobalState} from '../Post'

const Discription = () => {
  return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
        <div className='md:w-3/6 w-full'>
            <p className="text-lg text-gray-600 ">Зарегистрируйте свою интеллектуальную собственность (IP) в защищеном IPFS хранилище с получением NFT-токена как подтвержение о обладании данной собственностью</p>

            <button onClick={()=>setGlobalState('chat','1')}
        className=" bg-red-700 rounded-md p-2 text-white">
            Открыть чат
        </button>
        </div>
        <button onClick={()=>setGlobalState('modal','scale-100')}
        className=" bg-red-700 rounded-md p-2 text-white">
            Зарегистрировать свою IP
        </button>
        
    </div>

  )
}

export default Discription