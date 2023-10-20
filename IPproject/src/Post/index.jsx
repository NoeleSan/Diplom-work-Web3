import { createGlobalState } from "react-hooks-global-state"

const{setGlobalState, useGlobalState, getGlobalState}=createGlobalState({
    modal:"scale-0",
    disModal:"scale-0",
    chat:0,
    loading:{show:false, msg:''},
    alert:{show:false, msg:'', color:''},
    connectedAccount:'',
    nft:null,
    nfts: [],
    contract:null,
    filter:0,
    transactions:[],
})
const setAlert = (msg, color = 'green') => {
    setGlobalState('loading', false)
    setGlobalState('alert', { show: true, msg, color })
    setTimeout(() => {
      setGlobalState('alert', { show: false, msg: '', color })
    }, 5000)
  }
const setLoadingMsg = (msg) => { 
    setGlobalState('loading',{show:true , msg})
}
const truncate=(text,startChars,endChars,maxLeng)=>{
    if(text.length>maxLeng){
        var start=text.substring(0,startChars)
        var end=text.substring(text.length-endChars,text.length)
        while(start.length+end.length < maxLeng){
            start+='.'
        }
        return start+end
    }
    return text
}

export {useGlobalState, setGlobalState, getGlobalState, setLoadingMsg,setAlert,truncate}