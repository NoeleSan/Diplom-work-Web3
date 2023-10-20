import React from 'react'
import{useState,useEffect} from 'react'
import logo from '../assets/Logo.jpg'
import { setGlobalState,useGlobalState, truncate} from '../Post'


const Patents = () => {
   const [nfts] = useGlobalState('nfts')
   const[filter] = useGlobalState('filter')
   const [end,setEnd]=useState(8)
   const [count]=useState(8)
   const [collection, setCollection]= useState([])
   const getCollection = () =>{
    return nfts.slice(0,end)
   }


   useEffect(() => {
    
    setCollection(getCollection())
   }, [end])

 const Filter = () =>
{
    setGlobalState('filter', (filter+1)%2)
    console.log(filter)
    console.log(nfts)
}

  return (
    <div  className='text-3xl flex flex-col justify-between w-4/5 items-center pt-20 mx-auto'>
        <div className='flex flex-row justify-between w-4/5 items-stretch'>
        {collection.length>0? 'Зарегистрированые IP':'Реестр пуст'}
        <button onClick={Filter} className='bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] text-base  p-1 rounded-lg shadow-black'> Мои IP</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 border-2 border-slate-200 rounded-xl p-2 m-2'
        >
            {collection.map((nft,i) => (
                <Post key={i} nft={nft} />
          ))}
        </div>
        <div className='text-center my-5'>
        <button onClick={() => setEnd(end+count)}
        className='bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black'>
        Загрузить больше
        </button>
        </div>
    </div>
  )
}
  

const Post =({nft})=> {
    const [filter]=useGlobalState('filter')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const setNft = () => {
        setGlobalState('nft',nft)
        setGlobalState('disModal','scale-100')
    }
    if (nft.nfttype==='1'){
    if (filter==1 && nft.owner.toLowerCase()===connectedAccount){
    return(
    <div className='w-full shadow-xl shadow-orange-100 rounded-md overflow-hidden bg-gray-100 my-2 p-3 border-2 border-[#A81E00]'>
        <img className='h-60% w-30% object-cover shadow-lg shadow-yellow-300 rounded-lg mb-2' src={logo} alt={nft.title} />
        <p className='text-center text-lg'>{nft.title}</p>
        <div className='flex flex-col justify-between items-center mt-3'>
            <div>
                <p className='font-bold text-sm'>Обладатель</p>
                <p className='text-sm'>{truncate(nft.owner,5,5,11)}</p>
            </div>
            <button 
            onClick={setNft}
            className='  bg-slate-500 rounded-md text-base p-2'>Подробности</button>
        </div>
    </div>)
    }else if (filter==0){ 
        return(
        <div className='w-full shadow-xl shadow-orange-100 rounded-md overflow-hidden bg-gray-100 my-2 p-2 border-2 border-[#A81E00]'>
        <img className='h-60% w-30% object-cover shadow-lg shadow-yellow-300 rounded-lg mb-2' src={logo} alt={nft.title} />
        <p className='text-center text-lg'>{nft.title}</p>
        <div className='flex flex-col justify-between items-center mt-3'>
        <div>
            <p className='font-bold text-sm'>Обладатель</p>
            <p className='text-sm'>{truncate(nft.owner,5,5,11)}</p>
        </div>
        <button 
        onClick={setNft}
        className='  bg-slate-500 rounded-md text-base p-2'>Подробности</button>
    </div>
</div>
)
}
else {return false}
    } else {return false}
}
export default Patents