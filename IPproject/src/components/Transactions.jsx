import React from 'react'
import { useGlobalState, truncate } from '../Post'
import { MdOpenInNew } from 'react-icons/md'

const Transactions = () => {

  const [nfts] = useGlobalState('nfts')

  
  return (
    <div className='text-3xl flex flex-col justify-between w-4/5 items-center mx-auto'>
          <div className=" flex-row justify-between w-4/5 items-stretch">
          Ваши транзакции
          <div/>

        <div className="grid grid-cols-1 gap-6 py-2.5 border-2 border-slate-200 rounded-xl p-2 m-2 h-64 overflow-scroll">
          {nfts.map((tx, i) => (
            <Trans key={i} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  )
}
const Trans = ({tx}) =>{
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '.' + month + '.' + year + '  ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  const [nfts] = useGlobalState('nfts')

  const find = (title) =>{
    for (let i = 0; i < nfts.length; i += 1) {
        if (nfts[i].title== title && nfts[i].nfttype==='1' && nfts[i].owner.toLowerCase()== connectedAccount) {
            return true
        }
      }
    }
  const [connectedAccount] = useGlobalState('connectedAccount')
  if (tx.owner.toLowerCase()===connectedAccount) {      
    return(    
  <div className="flex flex-row items-stretch justify-between border-2 border-[#A81E00] w-full h-fit shadow-xl rounded-md  my-2 p-3">
              <div>
                <h4 className="text-base">{tx.nfttype==='1'? 'Вы опубликовали патент':'Вы купили лицензию на использование'}</h4>
                <small className="flex flex-row justify-start items-center">
                  <span className="mr-1">"{tx.title}" {tx.nfttype==='1'? '':'патента'}</span>
                </small>
              </div>
              <div className=' p-2 text-base'>
              <p className=''>Дата: {timeConverter(tx.timestamp)}</p>
              <p>Цена: {tx.cost} ETH</p>
              </div>
            </div>)

  } else {
    

    if (tx.nfttype==='2' && find(tx.title)){
    return (
      <div className="flex flex-row items-stretch justify-between border-2 border-[#A81E00] w-full h-fit shadow-xl rounded-md  my-2 p-3">
              <div>
                <h4 className="text-base">У вас купили лицензию на использование</h4>
                <small className="flex flex-row justify-start items-center">
                  <span className="mr-1">"{tx.title}" патента</span>
                </small>
              </div>
              <div className=' p-2 text-base'>
              <p className=''>Дата: {timeConverter(tx.timestamp)}</p>
              <p>Цена: {tx.cost} ETH</p>
              </div>
            </div>)
    } else {return false}
            }

}

export default Transactions