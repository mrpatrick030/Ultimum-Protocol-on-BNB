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
  import axios from "axios";

export default function LoanSection({loading, setLoading, setshowLoanSection, lendToken, loanID, setLoanID, loanAmount, setLoanAmount}) {
      // wallet connect settings
      const { address, chainId, isConnected } = useWeb3ModalAccount()
      const { walletProvider } = useWeb3ModalProvider()

    const [loanData, setLoanData] = useState([])
    // show all loans
      useEffect(()=>{
        const readLoansData = async () => {
          if(isConnected){
            //read settings first
            const ethersProvider = new BrowserProvider(walletProvider) 
            const lendBorrowContractReadSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, ethersProvider)
            try {
                const dataArray = []
                const getAllLoannsNumber = await lendBorrowContractReadSettings.loanCount();
                for (let i=0; i < getAllLoannsNumber; i++){
                  const allLoansData = await lendBorrowContractReadSettings.getLoanInfo(i);
                  dataArray.push(allLoansData)
                  console.log(allLoansData)
                }
                dataArray.sort((a, b) => b.loan_id.toString() - a.loan_id.toString())
                setLoanData(dataArray)
            } catch (error) {
                console.log(error)
            }
          }
        }
        readLoansData();
    }, [loanData, address, isConnected])


    // lend to borrower from view loans section
    const fundLoanFromLoanList = async (initialID, initialLoanAmount) => {  
        setLoanID(initialID)  
        setLoanAmount(initialLoanAmount)
        console.log(loanID)
        console.log(loanAmount) 
        lendToken()
    }


    //search loans functionality
    const [searchQuery, setSearchQuery] = useState()
    const [searchData, setSearchData] = useState([])
    const handleSearch = async () => {
      if(isConnected){
        setLoading(true)
        //read settings first
        const ethersProvider = new BrowserProvider(walletProvider) 
        const lendBorrowContractReadSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, ethersProvider)
       try {
        const searchDataArray = []
        const getAllLoansNumber = await lendBorrowContractReadSettings.loanCount();
        for (let i=0; i < getAllLoansNumber; i++){
          const anyLoanData = await lendBorrowContractReadSettings.getLoanInfo(i);
          if (((anyLoanData.lender.toString().toLowerCase()).substring(0, 5) + "..." + (anyLoanData.lender.toString().toLowerCase()).substring(37, 42))  == searchQuery.toLowerCase() || 
           ((anyLoanData.lender.toString().toLowerCase()).substring(0, 5)) == searchQuery.toLowerCase() ||
           ((anyLoanData.lender.toString().toLowerCase()).substring(37, 42)) == searchQuery.toLowerCase() ||
           ((anyLoanData.borrower.toString().toLowerCase()).substring(0, 5) + "..." + (anyLoanData.borrower.toString().toLowerCase()).substring(37, 42))  == searchQuery.toLowerCase() || 
           ((anyLoanData.borrower.toString().toLowerCase()).substring(0, 5)) == searchQuery.toLowerCase() ||
           ((anyLoanData.borrower.toString().toLowerCase()).substring(37, 42)) == searchQuery.toLowerCase() ||
            anyLoanData.loan_id.toString() == searchQuery){
            searchDataArray.push(anyLoanData)  
          }
          searchDataArray.sort((a, b) => b.loan_id.toString() - a.loan_id.toString())
          setSearchData(searchDataArray)      
        }
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
      }
    }


             // pagination
            const [currentPage, setCurrentPage] = useState(1);
            const loansPerPage = 5;
            const indexOfLastLoan = currentPage * loansPerPage;
            const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
            const currentLoans = loanData.slice(indexOfFirstLoan, indexOfLastLoan);
            const searchedLoans = searchData.slice(indexOfFirstLoan, indexOfLastLoan);
            const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            };

            //show the chatbox and blur effect functions
            const [blurEffect, setBlurEffect] = useState()
            const [chatBox, setChatBox] = useState()
            const [currentLoanID, setCurrentLoanID] = useState()
            const [currentLender, setCurrentLender] = useState()
            const [currentBorrower, setCurrentBorrower] = useState()
            const [showChatError, setShowChatError] = useState()

            const showChatBoxAndBlurEffect = (initialLender, initialBorrower, initialLoanID)  => {
              if (initialLender.toLowerCase() == address.toLowerCase() || initialBorrower.toLowerCase() == address.toLowerCase()){
              setBlurEffect("blur(10px)")
              setChatBox(true)
              setCurrentLoanID(initialLoanID)
              setCurrentLender(initialLender)
              setCurrentBorrower(initialBorrower)
              }
              else {
                setBlurEffect("blur(10px)")
                setShowChatError(true)
                setTimeout(()=>{
                 setBlurEffect("blur(0px)")
                 setShowChatError(false)
                }, 3000)
              }
            }

            //hide chatbox and blur effect
            const hideChatBoxAndBlurEffect = ()  => {
              setBlurEffect("blur(0px)")
              setChatBox(false)
            }

            //send the chat messages
            const [values, setValues] = useState({
              message:""
            })

            const handleInput = (event) => {
              const cleanedValue = event.target.value.replace(/["{}]/g, ''); // Remove curly braces and double quotes
              setValues((prev) => ({ ...prev, [event.target.name]: cleanedValue }));
            };

            const sendChat = async (initialMessage, initialLender, initialBorrower, initialSender, initialLoanID, initialDatetime) => {
              setLoading(true)
               try {
                 const request = await axios.post("/api/sendchatapi", {message:initialMessage, lender:initialLender, borrower:initialBorrower,  sender:initialSender, loanid:initialLoanID, datetime:initialDatetime})
                 console.log(request)
                 if (request.status === 200) {
                  setLoading(false)
                  values.message = ""
                 }     
               } catch (error) {
                console.log(error)
                setLoading(false)
               }
                finally {
                  setLoading(false)
                }
            }

            // read the chats
            const [chats, setChats] = useState([])
            useEffect(()=>{
              const getChats = async () => {
                try {
                  const response = await axios.post("/api/getchatsapi", {loanid:currentLoanID})
                  if (response.status === 200){
                    setChats(response.data)
                    console.log(response.data)
                  }
                } catch (error) {
                  console.log(error)
                }
              }
              getChats();
            }, [chats])

                     // delete chat
                       const deleteChat = async () => {
                         try {
                           const request = await axios.post("/api/deletechatapi", {loanid:currentLoanID})
                           if (request.status === 200){
                             console.log("success")
                           }
                         } catch (error) {
                           console.log(error)
                         }
                       }
      
    return (
      <div>

    <div style={{filter:blurEffect}}>
      <div className='text-center mt-[1cm]'>
        <span className='bg-[#000] text-[#fff] px-[0.5cm] py-[0.2cm] rounded-full' style={{border:"2px solid #502"}}>
        <form onSubmit={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}>
        <input type="text" placeholder="Search by ID, lender, or borrower..." onChange={(e) => setSearchQuery(e.target.value)} className='bg-[#000] w-[6cm] placeholder-[#fff] text-[#fff] text-[90%] outline-none' /><img src="images/search.png" width="20" className='ml-[0.2cm] cursor-pointer' onClick={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}/>
        </form>
        </span>
      </div>

     {searchData.length > 0 ? 
      (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #222"}}>
        <div className="m-[-0.5cm] mb-[0.5cm] text-center px-[0.2cm] py-[0.3cm] bg-[#222] font-[500] rounded-t-xl viewloansdiv">Search results <img src="images/cancel.png" onClick={(e) => setshowLoanSection(false)} className="float-right cursor-pointer cancelbutton rounded-[100%]" width="30" style={{display:"inline-block"}} /></div>
        <div className="bg-[#111] viewloansdiv2 p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #502"}}>
            <div className="overflow-auto">
        {searchedLoans.map((data) => (
        <div key={data.loan_id.toString()} className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm] overflow-auto">
        <div>
        <div className="m-[0.2cm]"><span className="bg-[#222] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] font-[500]" style={{border:"2px solid #333"}}>ID: {data.loan_id.toString()}</span><span className="float-right cursor-pointer" onClick={(e) => showChatBoxAndBlurEffect(data.lender.toString(), data.borrower.toString(), data.loan_id.toString())}>Chat <img src="images/chat.png" width="25" style={{display:"inline-block"}} /></span></div>  
        <div className="m-[0.2cm] py-[0.1cm] mt-[0.4cm] overflow-auto"><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Lender</span>{data.lender.toString() == "0x0000000000000000000000000000000000000000" ? (<span className="text-[#ff0]"> No lender yet</span>) : (<span> {data.lender.toString().substring(0, 5)}...{data.lender.toString().substring(37, 42)}</span>)}</div>  
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token to borrow</span> ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount to borrow</span> {parseFloat(data.amount.toString() * 10**-18).toFixed(10)} ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Interest</span> {data.interest.toString()}%</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Repayment amount</span> {parseFloat(data.repaymentAmount.toString() * 10**-18).toFixed(10)} ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan expires</span> {(data.fundingDeadline.toString() >= (new Date().getTime().toString()/1000)) ? (<span>{new Date(data.fundingDeadline.toString() * 1000).toLocaleString()}</span>) : (<span className="text-[#900]">{new Date(data.fundingDeadline.toString() * 1000).toLocaleString()}</span>)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Borrower</span> {data.borrower.toString().substring(0, 5)}...{data.borrower.toString().substring(37, 42)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral</span> 
        {(data.collateral.toString()) == tokenContractAddress && (<span> ULT</span>)} 
        {(data.collateral.toString()) == usdtContractAddress && (<span> USDT</span>)}
        {(data.collateral.toString()) == daiContractAddress && (<span> DAI</span>)}
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral amount</span> {parseFloat(data.collateralAmount.toString() * 10**-18).toFixed(10)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral ERC20 ?</span>
         {(data.isCollateralErc20) == true && (<span> yes</span>)} 
         {(data.isCollateralErc20) == false && (<span> no</span>)} 
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan status</span> 
         {(data.active) == true && (<span className="text-[#0f0]"> open</span>)} 
         {(data.active) == false && (<span className="text-[#900]"> Closed</span>)} 
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan repayment</span> 
         {(data.repaid) == true && (<span className="text-[#0f0]"> Loan has been repaid</span>)} 
         {(data.repaid) == false && (<span className="text-[#ff0]"> Loan has not been repaid</span>)} 
        </div>
        {(((data.active) == true) & ((data.repaid) == false) & (address != (data.borrower.toString())) & (data.fundingDeadline.toString() >= (new Date().getTime().toString()/1000))) ? (<div className="mt-[0.5cm] text-right"><button className="text-[#fff] fa-fade bg-[#040] rounded-md px-[0.3cm] py-[0.05cm] generalbutton4" style={{boxShadow:"1px 1px 1px 2px #ccc", animationDuration:"3s"}} onClick={(e) => fundLoanFromLoanList(data.loan_id.toString(), parseFloat(data.amount.toString() * 10**-18).toFixed(18))}>Fund loan <img src="images/loan.png" className="ml-[0.2cm]" width="20" style={{display:"inline-block"}} /></button></div>) : (<span></span>)}
          </div>        
       </div>
        ))}
        </div>
        <div className='my-[0.5cm]'>
          {Array.from({ length: Math.ceil(searchData.length.toString() / loansPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
       </div>
        </div>
        </div>)
            :
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #222"}}>
        <div className="m-[-0.5cm] mb-[0.5cm] text-center px-[0.2cm] py-[0.3cm] bg-[#222] font-[500] rounded-t-xl viewloansdiv">List of all available loans <img src="images/cancel.png" onClick={(e) => setshowLoanSection(false)} className="float-right cursor-pointer cancelbutton rounded-[100%]" width="30" style={{display:"inline-block"}} /></div>
        <div className="bg-[#111] viewloansdiv2 p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #502"}}>
            <div className="overflow-auto">
        {currentLoans.map((data) => (
        <div key={data.loan_id.toString()} className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm] overflow-auto">
        <div>
        <div className="m-[0.2cm]"><span className="bg-[#222] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] font-[500]" style={{border:"2px solid #333"}}>ID: {data.loan_id.toString()}</span><span className="float-right cursor-pointer" onClick={(e) => showChatBoxAndBlurEffect(data.lender.toString(), data.borrower.toString(), data.loan_id.toString())}>Chat <img src="images/chat.png" width="25" style={{display:"inline-block"}} /></span></div>  
        <div className="m-[0.2cm] py-[0.1cm] mt-[0.4cm] overflow-auto"><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Lender</span>{data.lender.toString() == "0x0000000000000000000000000000000000000000" ? (<span className="text-[#ff0]"> No lender yet</span>) : (<span> {data.lender.toString().substring(0, 5)}...{data.lender.toString().substring(37, 42)}</span>)}</div>  
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token to borrow</span> ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount to borrow</span> {parseFloat(data.amount.toString() * 10**-18).toFixed(10)} ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Interest</span> {data.interest.toString()}%</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Repayment amount</span> {parseFloat(data.repaymentAmount.toString() * 10**-18).toFixed(10)} ETH</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan expires</span> {(data.fundingDeadline.toString() >= (new Date().getTime().toString()/1000)) ? (<span>{new Date(data.fundingDeadline.toString() * 1000).toLocaleString()}</span>) : (<span className="text-[#900]">{new Date(data.fundingDeadline.toString() * 1000).toLocaleString()}</span>)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Borrower</span> <span></span>{data.borrower.toString().substring(0, 5)}...{data.borrower.toString().substring(37, 42)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral</span> 
        {(data.collateral.toString()) == tokenContractAddress && (<span> ULT</span>)} 
        {(data.collateral.toString()) == usdtContractAddress && (<span> USDT</span>)}
        {(data.collateral.toString()) == daiContractAddress && (<span> DAI</span>)}
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral amount</span> {parseFloat(data.collateralAmount.toString() * 10**-18).toFixed(10)}</div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral ERC20 ?</span>
         {(data.isCollateralErc20) == true && (<span> yes</span>)} 
         {(data.isCollateralErc20) == false && (<span> no</span>)} 
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan status</span> 
         {(data.active) == true && (<span className="text-[#0f0]"> open</span>)} 
         {(data.active) == false && (<span className="text-[#900]"> Closed</span>)} 
        </div>
        <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan repayment</span> 
         {(data.repaid) == true && (<span className="text-[#0f0]"> Loan has been repaid</span>)} 
         {(data.repaid) == false && (<span className="text-[#ff0]"> Loan has not been repaid</span>)} 
        </div>
        {(((data.active) == true) & ((data.repaid) == false) & (address != (data.borrower.toString())) & (data.fundingDeadline.toString() >= (new Date().getTime().toString()/1000))) ? (<div className="mt-[0.5cm] text-right"><button className="text-[#fff] fa-fade bg-[#040] rounded-md px-[0.3cm] py-[0.05cm] generalbutton4" style={{boxShadow:"1px 1px 1px 2px #ccc", animationDuration:"3s"}} onClick={(e) => fundLoanFromLoanList(data.loan_id.toString(), parseFloat(data.amount.toString() * 10**-18).toFixed(18))}>Fund loan <img src="images/loan.png" className="ml-[0.2cm]" width="20" style={{display:"inline-block"}} /></button></div>) : (<span></span>)}
          </div>        
       </div>
        ))}
        </div>
        <div className='my-[0.5cm]'>
          {Array.from({ length: Math.ceil(loanData.length.toString() / loansPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
       </div>
        </div>
        </div>)
          }
     </div>

     {chatBox && (<div className="fixed text-center top-0 p-[0.5cm] bg-[rgba(0,0,0,0)] w-[100%] right-0 rounded-xl">
           <div data-aos="fade-right" className="text-left lg:mx-[25%] bg-[#000] rounded-xl mt-[3cm] text-[#000] max-h-[20cm] overflow-auto">
           <div className="chatheader p-[0.5cm] bg-[#fff] text-[#fff] font-[500] rounded-t-md" style={{boxShadow:"0px 2px 2px 0px #000"}}>
              <img src="images/double-arrows.png" className="cursor-pointer" width="30" onClick={(e) => hideChatBoxAndBlurEffect(e)} style={{display:"inline-block"}} />
              <span className="text-[#fff] font-[500] ml-[0.3cm]">Do not send funds to user!</span>
              <img src="images/chat.png" className="float-right" width="30" style={{display:"inline-block"}} />
           </div>
           <div className="p-[0.5cm] bg-[#eee]">
           <div className="mb-[0.2cm] text-[#333]"><span>{currentBorrower.substring(0, 5)}...{currentBorrower.substring(37, 42)}</span> <span className="float-right">{currentLender == "0x0000000000000000000000000000000000000000" ? (<span className="text-[#d7b644]">No lender yet</span>) : (<span>{currentLender.substring(0, 5)}...{currentLender.substring(37, 42)}</span>)}</span></div>
           <div className="mb-[1cm] text-[#333]">Chat with user<span className="float-right"><span className="underline">Loan ID:</span> {currentLoanID}</span></div>
          {chats.map((chat) => (
           <div key={chat.id.toString()}>
           {chat.sender.toLowerCase() == address.toLowerCase() ? 
           (<div className="lg:mb-[1cm] mb-[0.5cm]">
           <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-4 gap-2">
             <div className="grid-cols-1"><img src="images/chatyou.png" width="50" className="rounded-[100%]" /></div>
             <div className="grid-cols-1 lg:col-span-8">
               <div style={{display:"inline-block"}} className="bg-[#200] text-[#fff] p-[0.5cm] rounded-b-2xl rounded-tr-2xl overflow-auto">{chat.message}</div>
               <div><span className="text-[80%] text-[#444]">{new Date(chat.datetime.toString() * 1000).toLocaleString()}</span></div>
             </div>
           </div> 
           </div>) : 
           (<div className="lg:mb-[1cm] mb-[0.5cm]">
           <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-4 gap-2 text-right">
           <div className="grid-cols-1 lg:col-span-8">
           <div className="text-right"><span className="text-[80%] text-[#444]">{new Date(chat.datetime.toString() * 1000).toLocaleString()}</span></div>
           <div style={{display:"inline-block"}} className="bg-[#001] text-[#fff] p-[0.5cm] text-left rounded-b-2xl rounded-tr-2xl mt-[0.2cm]">{chat.message}</div>
             </div>
             <div className="grid-cols-1 text-right"><img src="images/chatuser.png" width="50" className="rounded-[100%] float-right lg:mt-[0.9cm]" /></div>
           </div>
           </div>)
          }
          </div>
          ))}
          <div className="lg:px-[0.5cm] mb-[1cm]">
           <form className="bg-[#000] p-[0.2cm] rounded-xl" style={{boxShadow:"2px 2px 2px 3px #d7b644"}} onSubmit={(e) => {e.preventDefault(); sendChat(values.message, currentLender, currentBorrower, address, currentLoanID, (new Date().getTime()/1000))}}>
             <textarea className="p-[0.3cm] lg:w-[90%] md:w-[90%] w-[85%] outline-none bg-[#000] rounded-xl text-[#fff] placeholder-[#aaa]" name="message" id="message" value={values.message} onChange={handleInput} placeholder="Type your message...." />
             <button type="submit" onClick={(e) => {e.preventDefault(); sendChat(values.message, currentLender, currentBorrower, address, currentLoanID, (new Date().getTime()/1000))}} className="ml-[0.3cm] mt-[0.5cm] absolute" style={{display:"inline-block"}}><img src="images/sendchat.png" width="30" /></button>
           </form>
          </div>
          <div className="text-right px-[1cm]"><button onClick={(e) => {e.preventDefault(); deleteChat(currentLoanID)}} className="rounded-md px-[0.5cm] pr-[1cm] py-[0.2cm] bg-[#333] text-[#fff] generalbutton4" style={{boxShadow:"2px 2px 2px 2px #111"}}>Clear chat <img src="images/bin.png" className="ml-[0.2cm] absolute" width="20" style={{display:"inline-block"}}/></button></div>
           </div>
        </div>
       </div>)}

       {showChatError && 
       (<div className="fixed text-center top-0 p-[0.5cm] bg-[rgba(0,0,0,0)] w-[100%] right-0 rounded-xl">
       <div data-aos="fade-right" className="text-left lg:mx-[25%] bg-[#000] rounded-xl mt-[3cm] text-[#000] max-h-[20cm] overflow-auto">
       <div className="chatheader p-[0.5cm] bg-[#fff] text-[#fff] font-[500] rounded-t-md" style={{boxShadow:"0px 2px 2px 0px #000"}}>
          <img src="images/double-arrows.png" className="cursor-pointer" width="30" onClick={(e) => setShowChatError(false) & setBlurEffect("blur(0px)")} style={{display:"inline-block"}} />
          <span className="text-[#fff] font-[500] ml-[0.3cm]">Do not send funds to user!</span>
          <img src="images/chat.png" className="float-right" width="30" style={{display:"inline-block"}} />
       </div>
       <div className="p-[0.5cm] bg-[#eee] text-center font-[500]">
       <img src="images/disappointment.png" width="30" className="mx-[auto]"/>
        <div className="mt-[0.2cm] text-[#d7b644]">This chat is accessible to only the lender and borrower of this loan.</div>
       </div>
       </div>
       </div>)}

        </div>
    )
}