import React from 'react'
import {useState} from  'react'
import{sendMessage, isTyping} from 'react-chat-engine'
import { useGlobalState } from '../Post'
const MessageForm = ( props) => {
    const [nfts] = useGlobalState('nfts')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const {chatId, creds, title} = props
    
    const [value, setValue]=useState('')
    const handleSubmit=  (event) => {
        event.preventDefault()
        const text=value.trim()
        if (text.length > 0) sendMessage(creds, chatId, {text})
        setValue('')
    }
    const find = () =>{
    for (let i = 0; i < nfts.length; i += 1) {
        if (nfts[i].id == title) {
            return nfts[i].owner.toLowerCase()
        }
      }
    }


    const handleChange= (event) => {
        setValue (event.target.value)
    }


    const handleClick= (event) => {

        event.preventDefault()
        const text2=value.trim()
        if (!isNaN(text2)){
            
            if (text2.length > 0) { 
                let text='jxcv4'+text2
                sendMessage(creds, chatId, {text})} 
        setValue('')
        }
        else{
            alert('Введите сумму Ethereum')
            setValue('')
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <input className='message-input'
        placeholder='Напишите сообщение...'
        value = {value}
        onChange={handleChange}
        onSubmit={handleSubmit}
        />
         {find()===connectedAccount &&<button  type="button" className='rounded-xl bg-zinc-500 text-white float-right p-1' onClick={handleClick}>
                Оффер
         </button>}

    </form>
  )
}

export default MessageForm