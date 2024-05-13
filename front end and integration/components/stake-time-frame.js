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
  import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'

export default function StakeSection() {
            // wallet connect settings
            const { address, chainId, isConnected } = useWeb3ModalAccount()
            const { walletProvider } = useWeb3ModalProvider()

            const [loading, setLoading] = useState()
            const [stakeOption, setStakeOption] = useState(true)
              // lets read data for the Stake section using inbuilt functions and abi related read functions
               const [userULTBalance, setUserULTBalance] = useState()
               const [userUSDTBalance, setUserUSDTBalance] = useState()
               const [userDAIBalance, setUserDAIBalance] = useState()
               const [totalStakingReward, settotalStakingReward] = useState()
               const [tokenA, setTokenA] = useState(tokenContractAddress)
               const [tokenAcapital, settokenAcapital] = useState()
               const [startDateEpoch, setStartDateEpoch] = useState()
               const [tokenAstartDate, settokenAstartDate] = useState()
               const [tokenAduration, settokenAduration] = useState()
               const [tokenArewards, settokenArewards] = useState()
               const [tokenB, setTokenB] = useState(tokenContractAddress)
               const [tokenBcapital, settokenBcapital] = useState()
               const [tokenBrewards, settokenBrewards] = useState()
        
               useEffect(()=>{
                const getTheData = async() => {
                  if(isConnected){
                    //read settings first
                    const ethersProvider = new BrowserProvider(walletProvider) 
                    const tokenContractReadSettings = new Contract(tokenContractAddress, tokenContractABI, ethersProvider)
                    const stakeContractReadSettings = new Contract(stakeContractAddress, stakeContractABI, ethersProvider)
                    const usdtContractReadSettings = new Contract(usdtContractAddress, usdtContractABI, ethersProvider)
                    const daiContractReadSettings = new Contract(daiContractAddress, daiContractABI, ethersProvider)
                    const daoContractReadSettings = new Contract(daoContractAddress, daoContractABI, ethersProvider)
                    const lendBorrowContractReadSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, ethersProvider)
                    const treasuryContractReadSettings = new Contract(treasuryContractAddress, treasuryContractABI, ethersProvider)
                    const swapContractReadSettings = new Contract(swapContractAddress, swapContractABI, ethersProvider)
                    const nftContractReadSettings = new Contract(nftContractAddress, nftContractABI, ethersProvider)
                  try {
                    const ULTbalance = await tokenContractReadSettings.balanceOf(address)
                    const parseULTbalance = parseFloat(formatUnits(ULTbalance, 18)).toFixed(5);
                    console.log(parseULTbalance.toString())
                    setUserULTBalance(parseULTbalance.toString())
                    const USDTbalance = await usdtContractReadSettings.balanceOf(address)
                    const parseUSDTbalance = parseFloat(formatUnits(USDTbalance, 18)).toFixed(5);
                    console.log(parseUSDTbalance.toString())
                    setUserUSDTBalance(parseUSDTbalance.toString())
                    const DAIbalance = await daiContractReadSettings.balanceOf(address)
                    const parseDAIbalance = parseFloat(formatUnits(DAIbalance, 18)).toFixed(5);
                    console.log(parseDAIbalance.toString())
                    setUserDAIBalance(parseDAIbalance.toString())

                    const getTotalStakingReward = await stakeContractReadSettings.user(address)
                    console.log(getTotalStakingReward.toString())
                    settotalStakingReward(parseFloat(formatUnits(getTotalStakingReward, 18).toString()).toFixed(5))
                    const getStakedTokenAdetails = await stakeContractReadSettings.stakeassets(address, tokenA)
                    const tokenacapital = (getStakedTokenAdetails.capital.toString()) *10 **-18
                    settokenAcapital(tokenacapital)
                    const startdateepoch = getStakedTokenAdetails.startTime.toString()
                    setStartDateEpoch(startdateepoch)
                    const tokenastartdate = (new Date((getStakedTokenAdetails.startTime.toString()) * 1000)).toLocaleString()
                    settokenAstartDate(tokenastartdate)
                    const tokenaduration = (getStakedTokenAdetails.duration.toString())/86400
                    settokenAduration(tokenaduration)
                    const tokenarewards = (getStakedTokenAdetails.reward_accured.toString()) *10 **-18
                    settokenArewards(tokenarewards)
                    const getStakedTokenBdetails = await stakeContractReadSettings.stakeassets(address, tokenB)
                    const tokenbcapital = (getStakedTokenBdetails.capital.toString()) *10 **-18
                    settokenBcapital(tokenbcapital)
                    const tokenbrewards = (getStakedTokenBdetails.reward_accured.toString()) *10 **-18
                    settokenBrewards(tokenbrewards)
                  } catch (error) {
                    console.log(error)
                  }
                }
                }
                getTheData();  
               }, [userULTBalance, userUSDTBalance, userDAIBalance, totalStakingReward, tokenArewards, tokenBrewards, address, tokenA, tokenB, loading])
    

    // We have to first approve stake
    const [showApproveStakeButton, setshowApproveStakeButton] = useState(true)
    const [tokenAamount, setTokenAamount] = useState()
    const [tokenBamount, setTokenBamount] = useState()
    const [duration, setDuration] = useState("2592000")
    const approveStakingContractFromTokenContracts = async () => {
      if(isConnected){
        setLoading(true)
        const ethersProvider = new BrowserProvider(walletProvider) 
        const signer = await ethersProvider.getSigner()
       const tokenContractWriteSettings = new Contract(tokenContractAddress, tokenContractABI, signer)
       const usdtContractWriteSettings = new Contract(usdtContractAddress, usdtContractABI, signer)
       const daiContractWriteSettings = new Contract(daiContractAddress, daiContractABI, signer)
       try {
        if (tokenA == tokenContractAddress){const approveStakeContract = await tokenContractWriteSettings.approve(stakeContractAddress, parseUnits(tokenAamount, 18));}
        else if (tokenA == usdtContractAddress){const approveStakeContract = await usdtContractWriteSettings.approve(stakeContractAddress, parseUnits(tokenAamount, 18));}
        else if (tokenA == daiContractAddress){const approveStakeContract = await daiContractWriteSettings.approve(stakeContractAddress, parseUnits(tokenAamount, 18));}
        setshowApproveStakeButton(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
      }
    }

            //Now we are going to write the stake and unstake logics
            const StakeTokens = async () => {
              if(isConnected){
                setLoading(true)
                const ethersProvider = new BrowserProvider(walletProvider) 
                const signer = await ethersProvider.getSigner()
               const stakeContractWriteSettings = new Contract(stakeContractAddress, stakeContractABI, signer)
               try {
                if (tokenAcapital == "0"){const staketokens = await stakeContractWriteSettings.stake(tokenA, parseUnits(tokenAamount, 18), duration)}
                else {const increasestake = await stakeContractWriteSettings.increaseStake(tokenA, parseUnits(tokenAamount, 18))}
                setshowApproveStakeButton(true)
              } catch (error) {
                console.log(error)
                setLoading(false)
               }
               finally {
                setLoading(false)
               }
              }
            }
        
              const unstakeTokens = async () => {
                if(isConnected){
                  setLoading(true)
                  const ethersProvider = new BrowserProvider(walletProvider) 
                  const signer = await ethersProvider.getSigner()
                 const stakeContractWriteSettings = new Contract(stakeContractAddress, stakeContractABI, signer)
                 try {
                  const unstaketokens = await stakeContractWriteSettings.unstake(tokenB)
                } catch (error) {
                  console.log(error)
                  setLoading(false)
                 }
                 finally {
                  setLoading(false)
                 }
                }
                }

                const [disappointment, setDisappointment] = useState()
                const claimRewards = async () => {
                  if(isConnected){
                    setLoading(true)
                    const ethersProvider = new BrowserProvider(walletProvider) 
                    const signer = await ethersProvider.getSigner()
                   const stakeContractWriteSettings = new Contract(stakeContractAddress, stakeContractABI, signer)
                   try {
                    const claimrewards = await stakeContractWriteSettings.claimReward(tokenB)
                  } catch (error) {
                    console.log(error)
                    setLoading(false)
                    setDisappointment(true)
                    setTimeout(()=>{
                      setDisappointment(false)
                    }, 5000)
                   }
                   finally {
                    setLoading(false)
                   }
                  }
                  }
      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Stake (Time-frame)</div>
        <div className="text-[#ccc] text-[90%]">Stake (time-frame) your favorite tokens on Ultimum </div>

       {stakeOption ?
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #00f"}}>
        <div className=" bg-[#002] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #502"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setTokenA(e.target.value)}>
            <option value={tokenContractAddress}>ULT</option>
            <option value={usdtContractAddress}>USDT</option>
            <option value={daiContractAddress}>DAI</option>
          </select>
          <select className="float-right outline-none bg-[#002] text-[#fff] p-[0.1cm]" onChange={(e) => setDuration(e.target.value)}>
            <option value="2592000">30 days</option>
            <option value="5184000">60 days</option>
            <option value="7776000">90 days</option>
            <option value="15552000">180 days</option>
            <option value="31536000">1 year</option>
            <option value="63072000">2 years</option>
            <option value="94608000">3 years</option>
            <option value="157680000">5 years</option>
          </select>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {tokenA == tokenContractAddress && (<span>{userULTBalance}</span>)} {tokenA == usdtContractAddress && (<span>{userUSDTBalance}</span>)} {tokenA == daiContractAddress && (<span>{userDAIBalance}</span>)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-right bg-[#eee] outline-none text-[#000] placeholder-[#502]" type="text" id="tokenAamount" name="tokenAamount" onChange={(e) => setTokenAamount(e.target.value)} placeholder='Amount' />
         </div>
         </div>
        </form>
        </div>
          <div className="mt-[0.5cm]"><img src="images/swapimage.png" onClick={(e) => setStakeOption(false)} className="m-[auto] cursor-pointer switchbutton" width="35" /></div>
          <div className=" bg-[#002] p-[0.5cm] rounded-xl mt-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #502"}}>
         <div className='p-[0.5cm] bg-[#000] text-[#fff] rounded-md'>
          <div className="mb-[0.3cm]"><button className="px-[0.1cm] py-[0.1cm] bg-[#502] rounded-md w-[3.6cm]" style={{boxShadow:"2px 2px 2px 2px #002"}}>Staked amount:</button> &nbsp;{tokenAcapital ? (<span>{Intl.NumberFormat().format(tokenAcapital)}</span>) : (<span>Nil</span>)}</div>
          <div className="mb-[0.3cm]"><button className="px-[0.1cm] py-[0.1cm] bg-[#502] rounded-md w-[3.6cm]" style={{boxShadow:"2px 2px 2px 2px #002"}}>Stake start date:</button> &nbsp;{startDateEpoch != 0 ? (<span>{tokenAstartDate}</span>) : (<span>Nil</span>)}</div>
          <div className="mb-[0.3cm]"><button className="px-[0.1cm] py-[0.1cm] bg-[#502] rounded-md w-[3.6cm]" style={{boxShadow:"2px 2px 2px 2px #002"}}>Stake duration:</button> &nbsp;{tokenAduration ? (<span>{Intl.NumberFormat().format(tokenAduration)} days</span>) : (<span>Nil</span>)}</div>
          <div><button className="px-[0.1cm] py-[0.1cm] bg-[#502] rounded-md w-[3.6cm]" style={{boxShadow:"2px 2px 2px 2px #002"}}>Stake reward:</button> &nbsp;{tokenArewards ? (<span>{Intl.NumberFormat().format(tokenArewards)} ULT</span>) : (<span>Nil</span>)}</div>
         </div>
        </div>
        {showApproveStakeButton ? (<button type="submit" className='text-center py-[0.3cm] bg-[#002] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();approveStakingContractFromTokenContracts(tokenA, tokenAamount)}}>Approve Stake</button>) : (<span></span>)}
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();StakeTokens(tokenA, tokenAamount, duration)}}>Stake(Time-frame) Tokens</button>
        </div>) :
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #00f"}}>
        <form>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #333"}}>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setTokenB(e.target.value)}>
            <option value={tokenContractAddress}>ULT</option>
            <option value={usdtContractAddress}>USDT</option>
            <option value={daiContractAddress}>DAI</option>
          </select>
          <span className='float-right'>Reward</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {tokenB == tokenContractAddress && (<span>{userULTBalance}</span>)} {tokenB == usdtContractAddress && (<span>{userUSDTBalance}</span>)} {tokenB == daiContractAddress && (<span>{userDAIBalance}</span>)}</span>
         <span className="float-right text-[#000]">{tokenBrewards ? (<span>{Intl.NumberFormat().format(tokenBrewards)} ULT</span>) : (<span>0 ULT</span>)}</span>
         </div>
         </div>
        </div>
          <div className="mt-[0.5cm]"><img src="images/swapimage.png" onClick={(e) => setStakeOption(true)} className="m-[auto] cursor-pointer switchbutton2" width="35" /></div>
        <div className="mt-[0.5cm] bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #333"}}>
          <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] clear-both font-[500]'>
          <span className="float-left">You get</span>
          <span className="float-right">Lisk Sepolia</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         {tokenBcapital ? (<span className="float-left text-[#000]">{Intl.NumberFormat().format(tokenBcapital)} + {Intl.NumberFormat().format(tokenBrewards)} ULT</span>) : (<span className="float-left text-[#000]">Amount + Reward</span>)}
         <span className="float-right text-[#000]"></span>
         </div>
         </div> 
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#009] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton3 cursor-pointer' onClick={(e) => {e.preventDefault();unstakeTokens(tokenB)}}>Unstake Tokens</button>
        <div className="text-center mt-[0.5cm] font-[500]">OR</div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#aa0] font-[500] text-[#000] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();claimRewards(tokenB)}}>Claim Rewards</button>
        {disappointment ? (<div className="mt-[0.5cm] text-center">You have not made any reward yet! <img src="images/shocked.png" width="20" style={{display:"inline-block"}} /></div>) : (<span></span>)}
        </form>
        </div>)
          }

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0 rounded-xl' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

        </div>
    )
}