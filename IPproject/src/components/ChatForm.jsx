import React from 'react'
import { useEffect } from 'react';
import {ChatEngine} from 'react-chat-engine'
import { useGlobalState, setGlobalState } from '../Post';
import Draggable from 'react-draggable';
import ChatFeed from './ChatFeed';
const ChatForm =  () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const[modal]  = useGlobalState('chat')
  //useEffect(async () => {
    //try{
      //await axios.post ('http://localhost:3001/authenticate',
        //{username:connectedAccount})
      //}
       // catch(e){
         // console.error
       // }
 // },[])

  const click = () => {
    setGlobalState('chat', 0)

  }
  if (modal==1) {
    return (
        <Draggable> 
        <div  className='fixed w-2/3 rounded-xl border-4 bg-white border-red-600'>
        <ChatEngine
        projectID="f7027c30-5fa5-4d18-b960-de3a0dcd7131"
        height='35rem'
        userName={connectedAccount}
        userSecret={connectedAccount}
        renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>}
        renderNewChatForm={(creds) => {}}
        renderChatSettings={(chatAppState) => <buttom type='button' onClick={click} className='bg-red-600 float-right rounded-bl-xl p-2 hover:cursor-pointer'>Свернуть</buttom>}
        />
        </div>
      </Draggable>
    )
  } else {return null}
} 

export default ChatForm