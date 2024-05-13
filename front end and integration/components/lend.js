import { useState, useEffect } from "react";
import LoanSection from "./viewloans";
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

export default function LendSection() {
     // wallet connect settings
    const { address, chainId, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

  //loading state
  const [loading, setLoading] = useState()

 // let's read data for the Lending section using inbuilt functions and abi related read functions
 const [token, setToken] = useState("ETH")
 const [userETHBalance, setuserETHBalance] = useState()
 const [userULTBalance, setUserULTBalance] = useState()
 const [userUSDTBalance, setUserUSDTBalance] = useState()
 const [userDAIBalance, setUserDAIBalance] = useState()

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
      const ETHbalance = await ethersProvider.getBalance(address)
      const parseETHbalance = formatUnits(ETHbalance, 18);
      console.log(parseETHbalance)
      setuserETHBalance(parseFloat(parseETHbalance.toString()).toFixed(5))
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
    } catch (error) {
      console.log(error)
    }
  }
  }
  getTheData();  
 }, [userETHBalance, userULTBalance, userUSDTBalance, userDAIBalance, loading])


      //Now let us lend to user by funding the loan
       const [loanID, setLoanID] = useState()
       const [loanAmount, setLoanAmount] = useState()
       const lendToken = async () => {
        if(isConnected){
          setLoading(true)
          const ethersProvider = new BrowserProvider(walletProvider) 
          const signer = await ethersProvider.getSigner()
         const lendBorrowContractWriteSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, signer)
         try {
            const lendtoken = await lendBorrowContractWriteSettings.fundLoan(loanID, {value:parseUnits(loanAmount, 18)})
        } catch (error) {
          console.log(error)
          setLoading(false)
         }
         finally {
          setLoading(false)
         }
        }
      }

      //this is for user to claim collateral if a borrower fails to pay back loan
        const claimCollateral = async () => {
          if(isConnected){
            setLoading(true)
            const ethersProvider = new BrowserProvider(walletProvider) 
            const signer = await ethersProvider.getSigner()
         const lendBorrowContractWriteSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, signer)
         try {
            const claimcollateral = await lendBorrowContractWriteSettings.claimCollateral(loanID)
        } catch (error) {
          console.log(error)
          setLoading(false)
         }
         finally {
          setLoading(false)
         }
        }
      }

      //state to show available loans
    const [showLoanSection, setshowLoanSection] = useState(false)
      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Lend</div>
        <div className="text-[#ccc] text-[90%]">Lend to Ultimum Protocol to enjoy huge rewards (P2P)</div>
        {showLoanSection === false && (<div className="text-right font-[500] mt-[0.5cm]"><span className="cursor-pointer" onClick={(e) => setshowLoanSection(true)}>View available loans <img src="images/loan.png" className="ml-[0.2cm]" width="30" style={{display:"inline-block"}} /></span></div>)}

        {!showLoanSection ? (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <div className="mb-[0.5cm] text-center">To lend, view available loans and fund a loan. (P2P)</div>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
         <span className="float-left text-[#000]">Loan ETH Amount</span>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <input style={{display:"inline-block"}} className="w-[30%] float-left text-[120%] bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanAmount" name="loanAmount" onChange={(e) => setLoanAmount(e.target.value)} placeholder='0' />
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();lendToken(loanID)}}>Fund Loan</button>
        <div className="mt-[0.5cm] text-center">OR</div>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl mt-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
         <span className="float-left text-[#000]">Collateral</span>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className="float-left text-[#000]">Only lender</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#222] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();claimCollateral(loanID)}}>Claim Collateral</button>
        <div className="text-[90%] mt-[0.3cm]">You can only claim collateral if your borrower fails to pay within the specified duration of a loan!</div>
        </div>)
           :
        (<LoanSection loading={loading} setLoading={setLoading} showLoanSection={showLoanSection} setshowLoanSection={setshowLoanSection} address={address} lendToken={lendToken} loanID={loanID} setLoanID={setLoanID} loanAmount={loanAmount} setLoanAmount={setLoanAmount} />)}

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0 rounded-xl' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[10%] md:mt-[30%] mt-[40%]'></div>
      </div>) : (<span></span>)  
     }
     
        </div>
    )
}