import React from 'react'
import {FaTimes} from 'react-icons/fa'
import logo from '../assets/Logo.jpg'
import {setGlobalState,useGlobalState,getGlobalState, setAlert, setLoadingMsg} from '../Post'
import Moralis from 'moralis'
import { mintNFT,getAllNFTs } from '../Blockchain.services'
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
const PostIP = () => {
    const [modal]=useGlobalState('modal')
    const [patentName, setPatentName] = React.useState('')
    const [patentDis, setPatentDis] = React.useState('')
    const [imgBase64, setImgBase64] = React.useState(null)
    const [fileUrl, setFileUrl] = React.useState('')

    const handleSubmit =async  (e) => {
        e.preventDefault()
        if(!patentName || !patentDis)return
        setGlobalState('modal','scale-0')
        setLoadingMsg('Загружается в хранилище...')
        try{
            const filesUp = [
                {
                  path: makeid(20)+'.zip',
                  content: imgBase64,
                },
              ];
            const {jsonResponse} = await Moralis.EvmApi.ipfs.uploadFolder({ abi:filesUp });
            const price =0.1
            const type = '1'
            const response = jsonResponse[0].path
            await mintNFT(patentName , patentDis, response, price, type)

            closeModal()
            setAlert('Регистрация завершена...')
            getAllNFTs()
            
        }catch(error) {
            console.log(error)
            setAlert('Не удалось загрузить в хранилище', 'red')
        }
    }
    const closeModal= () => {
        setGlobalState('modal','scale-0') 
        resetForm()
    }
    const changeImage = async (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
    reader.onload = (readerEvent) => {setImgBase64(reader.result)
     const file =readerEvent.target.result.split(',')[1];
     setImgBase64(file)
     setFileUrl(e.target.files[0])
    }
    console.log(e.target.files[0])
    }
    const resetForm = () => {
        setPatentDis('')
        setPatentName('')
        setImgBase64(null)
        setFileUrl('')
    }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-slate-700 bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className='bg-white shadow-xl shadow-gray-800 rounded-md w-11/12 md:w-2/5 h-7/12 p-6 border-2 border-slate-800'>

            <form onSubmit={handleSubmit}
            className='flex flex-col' action="">
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>
                        Зарегистрировать IP
                    </p>
                    <button type="button" 
                    onClick={closeModal}
                    className='border-0 focus:outline-none'>
                        <FaTimes/>
                    </button>
                </div>

                <div className='flex justify-center items-center rounded-xl mt-5'>
                    <div className='shrink-0 h-20 w-20 rounded-xl overflow-hidden'>
                        <img className='h-full w-full object-cover cursor-pointer' src={logo} alt="Photo" />
                    </div>
                </div>
                <div className='flex justify-between items-center rounded-xl mt-5'>
                        <input type="text" name='patentName' placeholder='Название патента' required
                        onChange={(e)=>setPatentName(e.target.value)}
                        value={patentName} 
                        className='block w-full text-sm focus:outline-none cursor-pointer focus:ring-0'/>
                </div>
                <div className='flex justify-between items-center rounded-xl mt-5'>
                        <textarea type="text" name='patentDis' placeholder='Описание' required 
                        onChange={(e)=>setPatentDis(e.target.value)}
                        value={patentDis} 
                        className='resize-none block w-full text-sm focus:outline-none cursor-pointer focus:ring-0 h-15'/>
                </div>
                <div className='flex justify-between items-center rounded-xl mt-5'>
                    <label className='block'>
                        <span className='sr-only'>Выберите файлы патента</span>
                        <input type="file" required multiple
                        onChange={changeImage}
                        className='block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full
                         hover:file:bg-slate-700 cursor-pointer focus:ring-0 rounded-full border-2 border-gray-500'/>
                    </label>
                </div>
                <button className=' flex justify-center items-center bg-[#A81E00] hover:bg-[#D43816] text-[#FFEAE5] md:text-xl p-2 rounded-lg shadow-black mt-5'>
                Зарегистрировать
                </button>
            </form>
        </div>
    </div>
  )
}
export default PostIP