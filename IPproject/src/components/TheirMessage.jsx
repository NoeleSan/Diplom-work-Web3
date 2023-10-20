import React from 'react'
import { buyNFT, mintNFT} from '../Blockchain.services'
import axios from 'axios'
import { setAlert, useGlobalState, setLoadingMsg } from '../Post'
const TheirMessage = ({lastMessage, message, title, id}) => {   
    const[connectedAccount] = useGlobalState('connectedAccount')
    const [nfts]=useGlobalState('nfts')
        const find = () =>{
            for (let i = 0; i < nfts.length; i += 1) {
                if (nfts[i].id == title) {
                    return nfts[i]
                }
              }
            }
    const nft=find()
    const handleClick= async() => {
        try{
            let p = message.text.slice(5)
            let type = '2'
            setLoadingMsg('Покупка IP...')
            console.log(nft.title , nft.description, nft.metadataURI, p, type)
            await mintNFT(nft.title , nft.description, nft.metadataURI, p, type)
            try{
               const r=  await axios.delete(`https://api.chatengine.io/chats/${id}/`,
                {headers : {"Project-ID": "f7027c30-5fa5-4d18-b960-de3a0dcd7131", "User-Name":connectedAccount, "User-Secret":connectedAccount}})
                location.reload();
            } catch(e) {console.log(e)}
            setAlert('Успешно')
        } catch(e){
            setAlert('Покупка не удалась', 'red')
            console.log(e)
        }

    }
    if (message.text.slice(0,5)==='jxcv4') {
        return (
            <div onClick={handleClick} 
            className='message p-1 rounded-full hover:cursor-pointer bg-red-500 hover:bg-opacity-70 ' style={{color:'white', marginLeft: 'auto', marginRight: 'auto'}}>
                Оффер {message.text.slice(5)} Eth
            </div>)
        } 
        else{
            return(
            <div className='message p-1 rounded-md ' style={{backgroundColor: 'mediumblue', color:'white', marginRight: 'auto'}}>
                {message.text}
            </div>)
        }
    
}
export default TheirMessage