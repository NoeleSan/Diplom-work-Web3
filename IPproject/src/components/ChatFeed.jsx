import React from 'react'
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'


const ChatFeed = (props) => {

    const {chats, activeChat, userName, messages}=props;

    const chat=chats && chats[activeChat];
    
    const renderMessages =() => {
        const keys = Object.keys(messages);
        return keys.map((key, index) =>{
            const message = messages[key];
            const lastMessageKey = index ===0? null: keys[index-1]
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{width:'100%'}}>
                    <div className='message-block flex p-1' >
                        {isMyMessage ? <MyMessage message = {message}/>:<TheirMessage message= {message} lastMessage={messages[lastMessageKey]} title={chat?.title} id={activeChat}/>}
                    </div>
                </div>
            )
        })
    }
  return (
    <div className='chat-feed overflow-scroll h-5/6 w-full'>
        <div className='chat-tittle-container'>
            <div className='chat-subtitle'>

            </div>
        </div>
        {renderMessages()}
        <div className='w-full absolute bottom-0 bg-slate-700 p-2'>
            <div className='message-form-container'>
                <MessageForm  {...props} chatId={activeChat} title={chat?.title}/>
            </div>
        </div>
    </div>
  )
}

export default ChatFeed