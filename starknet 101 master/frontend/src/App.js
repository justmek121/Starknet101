import './App.css';
import { useState, useEffect } from "react"
import { connect } from "get-starknet"
import { cairo,CallData } from "starknet"
import { processData } from './utils/utils'

function App() {
  const [provider, setProvider] = useState('')
  const [address, setAddress] = useState('')
  const [contractAddress, setContract] = useState('')
  const [listAddress, setListAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    try {
      // let the user choose a starknet wallet
      const starknet = await connect()
      // connect to the user-chosen wallet
      await starknet?.enable({ starknetVersion: "v4" })
      // set account provider
      
      if(starknet.account.provider.chainId === '0x534e5f4d41494e'){
        setContract('0x0754c5af64caa782982eeaed850b0af6e71ad84b0f130bf38a836485ecec6b64')
      }else {
        setContract('0x04fa0bdda5f4e50538943d9f4b5a9e8ef52266ad615796cc824559be25385409')
      }
      console.log(contractAddress)
      setProvider(starknet.account)
      // set user address
      setAddress(starknet.selectedAddress)
      // set connection status
      setIsConnected(true)
      
    }
    catch (error) {
      alert(error.message)
    }
  }

  // persist state on reload
  useEffect(() => {
    connectWallet()
  }, [])

  const sendEth = async () => {
    try {
      // convert string to felt
      var listData = processData(listAddress);
      if (listData !== undefined) {

        // make contract call
        const multiCall = await provider.execute(
          [
            // Calling the first contract
            {
              contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
              entrypoint: "approve",
              // approve 1 wei for bridge
              calldata: CallData.compile({
                spender: contractAddress,
                amount: cairo.uint256(listData.total),
              })
            },
            // Calling the second contract
            {
              contractAddress: contractAddress,
              entrypoint: "sendEth",
              // transfer 1 wei to the contract address
              calldata: CallData.compile({
                total: cairo.uint256(listData.total),
                array_amount: listData.amountList,
                array_address: listData.addressList
              })
            }
          ]
        )
        await provider.waitForTransaction(multiCall.transaction_hash);
        alert("Your ETH successfully sent!");
      } else {
        alert("Wrong Data Format!")
      }

    }
    catch (error) {
      alert(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
          
          <h1 className="title">
            Starknet<a href="#"> 101</a>
          </h1>
          {
            isConnected ?
              <button className="connect">{address.slice(0, 5)}...{address.slice(60)}</button> :
              <button className="connect" onClick={() => connectWallet()}>Connect wallet</button>
          }

          <p className="description">
            This app use to distribute ETH to multiple addresses.
          </p>

          <div className="grid">
            <div href="#" className="card">
              <h2>recipients and amounts &rarr;</h2>
              <p>enter one address and amount in ETH on each line. supports any format.</p>
              <div className="cardForm">
                <textarea className='listAddress' placeholder="0x653................................6b876 3.141592
              0x896................................ea42e,2.7182
              0x273................................8f097=1.41421" onChange={(e) => setListAddress(e.target.value)}></textarea><br></br>
              </div>
              <div className="cardForm">


                <input type="submit" className="button" value="Send ETH" onClick={() => sendEth()} />
              </div>
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
