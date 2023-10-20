import Patents from "./components/Patents"
import Discription from "./components/Discription"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PostIP from "./components/PostIP"
import IPDis from "./components/IPDis"
import Loading from "./components/Loading"
import Alert from "./components/Alert"
import ChatForm from "./components/ChatForm"
import {useEffect} from "react"
import { isWallectConnected } from "./Blockchain.services"
import Moralis from 'moralis'
import { getAllNFTs } from "./Blockchain.services"
import { useGlobalState} from "./Post"
import axios from "axios"
import Transactions from "./components/Transactions"
import Rights from "./components/Rights"
const App = () => {
  const[connectedAccount] = useGlobalState ('connectedAccount')
  useEffect(async () => {
    try{
    await isWallectConnected()
    } catch{
    }
    try{
      await getAllNFTs()
    } catch{
    }
    if (!Moralis.Core.isStarted){
    await Moralis.start ({
      apiKey: '128JdoQbP8siuXIjQm6klWruAG3GZZuke2s0f4kZVw3xvxlvYXdTVHfa5IL9xnUI',
  })
}
  },[])
  return (
    <div className=" bg-slate-800 min-h-full">
    <div className="min-h-screen  ml-20 mr-20 border-r-8 border-l-8 border-slate-400 bg-slate-100">
      <div> 
      <Header />
      </div>
      <Discription/>
      {connectedAccount.length>3 && <ChatForm/>}
      <Patents/>
      <Rights/>
      <PostIP/>
      <Loading/>
      <IPDis/>
      <Alert/>
      <Transactions/>
      <Footer/>
    </div>
    </div>
  )
}
export default App
