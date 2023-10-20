import React from 'react'

const MyMessage = ({message}) => {
    if (message.text.slice(0,5)==='jxcv4') {
        return (
            <div 
            className='message p-1 rounded-full ' style={{backgroundColor: 'red', color:'white', marginLeft: 'auto', marginRight: 'auto'}}>
               Ваш оффер {message.text.slice(5)} Eth
            </div>)
    } else {
  return (
    <div className='message p-1 rounded-md' style={{marginLeft:'auto', marginRight:'5px', color: 'white',backgroundColor: '#D43816'}}>
        {message.text}
        </div>
  )
    }
}

export default MyMessage