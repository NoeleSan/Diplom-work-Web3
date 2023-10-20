import Web3 from 'web3'
import { setGlobalState, getGlobalState, setAlert } from './Post'
import abi from './abis/TimelessNFT.json'
import axios from 'axios'

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = abi.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address)
      return contract
    } else {
      return null
    }
  } else {
    return getGlobalState('contract')
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Установите Метамаск расширение')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])

  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async (props) => {
  try {
    if (!ethereum) return alert('Установите Метамаск расширение')
    
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
      await axios.post ('http://localhost:3001/authenticate',
        {username:accounts[0]})
      location.reload()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
      await axios.post ('http://localhost:3001/authenticate',
      {username:accounts[0]})

    } else {
      alert('Пожалуйста подключите кошелек')
      console.log('Не найденно акаутнов')
    }
  } catch (error) {
    
  }
}

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner,
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      nfttype: nft.nfttype,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

const getAllNFTs = async () => {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const nfts = await contract.methods.getAllNFTs().call()
    const transactions = await contract.methods.getAllTransactions().call()
    console.log(transactions)
    setGlobalState('nfts', structuredNfts(nfts))
    setGlobalState('transactions', structuredNfts(transactions))
}
         
const mintNFT = async ( title, description, metadataURI, price, nfttype ) => {

    const mintPrice = window.web3.utils.toWei(price.toString(), 'ether')
    price = window.web3.utils.toWei(price.toString(), 'ether')
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')


    const resp = await contract.methods.payToMint(title, description, metadataURI, nfttype, price).send({ from: account, value: mintPrice })
    console.log(resp.transactionHash)
    return true

}

const buyNFT = async ({ id, cost }) => {
  console.log(id, cost)
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods
      .payToBuy(Number(id))
      .send({ from: buyer, value: cost })

    return true
  } catch (error) {
    reportError(error)
  }
}

const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  setAlert(JSON.stringify(error), 'red')
  throw new Error('No ethereum object.')
}

export {
  getAllNFTs,
  connectWallet,
  mintNFT,
  buyNFT,
  updateNFT,
  isWallectConnected,
}