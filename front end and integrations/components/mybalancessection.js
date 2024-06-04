import { useState, useEffect } from "react";
import {
    nftContractAddress,
    nftContractABI,
    daoContractAddress,
    daoContractABI,
    stakeContractABI,
    stakeContractAddress,
    tokenContractAddress,
    tokenContractABI,
    treasuryContractABI,
    treasuryContractAddress,
    swapContractABI,
    swapContractAddress,
    lendBorrowContractABI,
    lendBorrowContractAddress,
    usdtContractAddress,
    usdtContractABI,
    daiContractAddress,
    daiContractABI, 
  } from "@/abiAndContractSettings";
    import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
    import { BrowserProvider, Contract, formatUnits } from 'ethers'

    export default function MyBalancesSection({displayComponent, setDisplayComponent, changeBg3, changeBg4, changeBg5, changeBg6, changeBg7}) {
               // wallet connect settings
               const { address, chainId, isConnected } = useWeb3ModalAccount()
               const { walletProvider } = useWeb3ModalProvider()

              // lets read data for the Protocol Metrics section using inbuilt functions and abi related read functions
               const [ultBalance, setultBalance] = useState()
               const [tokenPrice, setTokenPrice] = useState()
               const [stakedTokens, setstakedTokens] = useState([])
               const [userLastActiveTime, setuserLastActiveTime] = useState()
               const [userBNBBalance, setuserBNBBalance] = useState()
   
               useEffect(()=>{
                const getUserData = async() => {
                    if(isConnected){
                    //read settings first
                    const ethersProvider = new BrowserProvider(walletProvider) 
                    const tokenContractReadSettings = new Contract(tokenContractAddress, tokenContractABI, ethersProvider)
                    const stakeContractReadSettings = new Contract(stakeContractAddress, stakeContractABI, ethersProvider)
                    const usdtContractReadSettings = new Contract(usdtContractAddress, usdtContractABI, ethersProvider)
                    const daiContractReadSettings = new Contract(daiContractAddress, daiContractABI, ethersProvider)
                    const daoContractReadSettings = new Contract(daoContractAddress, daoContractABI, ethersProvider)
                  try {
                    const getULTbalance = await tokenContractReadSettings.balanceOf(address)
                    console.log(getULTbalance)
                    setultBalance(getULTbalance.toString() * 10**-18)
                    setTokenPrice(parseFloat(0.0001).toFixed(10))
                    const BNBbalance = await ethersProvider.getBalance(address)   
                    console.log(BNBbalance)
                    setuserBNBBalance(formatUnits(BNBbalance, 18))
                    const memberDetails = await daoContractReadSettings.members(address)
                    const lastActiveTimeEpoch = memberDetails.lastactivetime.toString()
                    const lastActiveTime = new Date(memberDetails.lastactivetime.toString() * 1000).toLocaleString()
                    if (lastActiveTimeEpoch != 0){setuserLastActiveTime(lastActiveTime)}
                    const collectStakeData = []
                    const getStakedTokens = await stakeContractReadSettings.userInfo(address)
                    console.log("staked tokens: " + getStakedTokens)
                    const getStakedTokensArrayLength = getStakedTokens.length.toString()
                    for (let i=0; i < getStakedTokensArrayLength; i++){
                        const anyStakedToken = getStakedTokens.assets[i]
                        if (anyStakedToken != undefined & anyStakedToken.toLowerCase() === tokenContractAddress.toLowerCase()){
                            const token1 = await tokenContractReadSettings.symbol()
                            collectStakeData.push(token1 + " ")}
                        else if (anyStakedToken != undefined & anyStakedToken.toLowerCase() === usdtContractAddress.toLowerCase()){
                            const token2 = await usdtContractReadSettings.symbol()
                            collectStakeData.push(token2 + " ")}   
                        else if (anyStakedToken != undefined & anyStakedToken.toLowerCase() === daiContractAddress.toLowerCase()){
                            const token3 = await daiContractReadSettings.symbol()
                            collectStakeData.push(token3 + " ")} 
                         }
                    console.log(collectStakeData)
                    setstakedTokens(collectStakeData)
                  } catch (error) {
                    console.log(error)
                  }
                }
                }
                getUserData();  
               }, [isConnected, address])
    
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>My Balances</div>
        <div className="text-[#ccc] text-[90%]">Manage all your assets on Ultimum Protocol</div>
        <div className="text-center mt-[0.4cm]">
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Balance</div>
                {ultBalance > 0 ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(parseFloat(ultBalance).toFixed(10))} ULT</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Price</div>
                {tokenPrice ? (<div className="text-[#aaa]">≈ ${tokenPrice}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">BNB Balance</div>
                {userBNBBalance > 0 ? (<div className="text-[#aaa]">{parseFloat(userBNBBalance).toFixed(10)} BNB</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Last active time on DAO</div>
                {userLastActiveTime ? (<div className="text-[#aaa]">{userLastActiveTime}</div>) : (<span>Nil</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Staked Tokens</div>
                {stakedTokens.length > 0 ? (<div className="text-[#aaa] lg:w-[100%] md:w-[100%] w-[7cm] overflow-auto">{stakedTokens}</div>) : (<span>Nil</span>)}
            </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-[1cm]">
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>$ULT</div>
               <div className="text-[#ccc] font-[500] underline">What is ULT?</div>
               <div className="text-[#aaa] text-[90%]">
                ULT is the native token of the Ultimum Protocol. ULT is given as rewards for lending and staking. ULT is also used to reward members of the Ultimum DAO for 
                participating in governance. ULT shall also be used to reward community members in potential airdrops organised by the protocol in the future.
                ULT is backed by the Ultimum treasury. 
               </div>
               <button onClick={(e) => setDisplayComponent("daogovernance") & changeBg3(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Buy ULT</button>
            </div>
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>P2P Lending/Borrowing</div>
                <div className="text-[#ccc] font-[500] underline">What is P2P lending/borrowing?</div>
                <div className="text-[#aaa] text-[90%]">
                Ultimum users are able to participate in unique P2P lending/borrowing activities of supported tokens. 
                Firstly, a loan has to be created by the borrower, then another user (the lender) funds the loan by lending to the borrower. The loan has the 
                following characteristics: loan amount, interest, expiry date, and collateral. Collateral provided by the borrower is locked up by the system until the given loan duration expires.
                 The collateral is sent out to the lender if the borrower fails to repay the loan during the specified time. For a seamless user experience, 
                 a "view all available loans" section with search functionality and pagination and decentralised chat system has been integrated into 
                  the dApp. Participate in Ultimum DAO governance to determine the next supported token/collateral. 
                </div>
                <button onClick={(e) => setDisplayComponent("lend") & changeBg6(e)} className="text-center px-[0.4cm] py-[0.2cm] lg:float-left bg-[#502] lg:w-[49%] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Lend Now</button>
                <button onClick={(e) => setDisplayComponent("borrow") & changeBg7(e)} className="text-center px-[0.4cm] py-[0.2cm] lg:float-right bg-[#502] lg:w-[49%] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Borrow Now</button>
            </div>
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Swap</div>
                <div className="text-[#ccc] font-[500] underline">What is swapping?</div>
                <div className="text-[#aaa] text-[90%]">
                With a ChainLink Oracle integration and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap 
                dApp to swap a variety of supported tokens with low gas fees (10x lower than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. 
                Ensure you have set network to the BNB Smart Chain Testnet network on the wallet connect option above and enjoy a seamless swap experience.
                </div>
                <button onClick={(e) => setDisplayComponent("swaptokens") & changeBg4(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Swap Now</button>
            </div>
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Stake (Time-frame)</div>
                <div className="text-[#ccc] font-[500] underline">What is time-framing?</div>
                <div className="text-[#aaa] text-[90%]">
                    The Ultimum Protocol utilizes a modern technology known as the time-framing method of staking with huge APY. It's a never-before-seen technology only available on the Ultimum 
                    Protocol. Time-framing offers a more flexible approach to staking as users can stake available tokens at their own chosen duration and get rewarded instantly. 
                    Users can stake and unstake at any time. The longer you stake, the bigger your rewards. It's best to unstake after the chosen duration to be fully rewarded. Unstaking before the chosen duration incurs a penalty.
                </div>
                <button onClick={(e) => setDisplayComponent("stake") & changeBg5(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Stake Tokens</button>
            </div>
        </div>
        </div>
    )
}