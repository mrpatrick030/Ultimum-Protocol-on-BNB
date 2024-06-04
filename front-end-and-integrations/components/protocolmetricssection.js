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
import BNBChart from "./bnbchart";

export default function ProtocolMetricsSection() {
           // wallet connect settings
           const { address, chainId, isConnected } = useWeb3ModalAccount()
           const { walletProvider } = useWeb3ModalProvider()

          // lets read data for the Protocol Metrics section using inbuilt functions and abi related read functions
           const [totalTokenSupply, settotalTokenSupply] = useState()
           const [tokenPrice, setTokenPrice] = useState()
           const [stakeableTokens, setstakeableTokens] = useState()
           const [BNBamountInTreasury, setBNBamountInTreasury] = useState()
           const [numberOfLoans, setnumberOfLoans] = useState()
           const [maxLoanAmount, setmaxLoanAmount] = useState()
           const [minLoanAmount, setminLoanAmount] = useState()
           const [BNBAmountInSwap, setBNBAmountInSwap] = useState()
           const [numberOfDaoMembers, setnumberOfDaoMembers] = useState()
           const [numberOfProposals, setnumberOfProposals] = useState()
    
           useEffect(()=>{
            const getProtocolData = async() => {
                if(isConnected){
                //read settings first
                const ethersProvider = new BrowserProvider(walletProvider) 
                const tokenContractReadSettings = new Contract(tokenContractAddress, tokenContractABI, ethersProvider)
                const stakeContractReadSettings = new Contract(stakeContractAddress, stakeContractABI, ethersProvider)
                const usdtContractReadSettings = new Contract(usdtContractAddress, usdtContractABI, ethersProvider)
                const daiContractReadSettings = new Contract(daiContractAddress, daiContractABI, ethersProvider)
                const daoContractReadSettings = new Contract(daoContractAddress, daoContractABI, ethersProvider)
                const lendBorrowContractReadSettings = new Contract(lendBorrowContractAddress, lendBorrowContractABI, ethersProvider)
              try {
                const getTotalTokenSupply = await tokenContractReadSettings.totalSupply()
                console.log(getTotalTokenSupply.toString() * 10**-18)
                settotalTokenSupply(getTotalTokenSupply.toString() * 10**-18)
                setTokenPrice(parseFloat(0.001).toFixed(10))
                const stakeableTokensArray = []
                const getStakeableTokens = await stakeContractReadSettings.getStakableTokens()
                const stakeableTokensLength = getStakeableTokens.length
                for (let i=0; i < stakeableTokensLength; i++){
                    const anyStakeableToken = getStakeableTokens[i]
                    if (anyStakeableToken.toLowerCase() === tokenContractAddress.toLowerCase()) {
                        const token1 = await tokenContractReadSettings.symbol()
                        stakeableTokensArray.push(token1 + " ")
                    }
                    else if (anyStakeableToken.toLowerCase() === usdtContractAddress.toLowerCase()) {
                        const token2 = await usdtContractReadSettings.symbol()
                        stakeableTokensArray.push(token2 + " ") 
                    }
                    else if (anyStakeableToken.toLowerCase() === daiContractAddress.toLowerCase()) {
                        const token3 = await daiContractReadSettings.symbol()
                        stakeableTokensArray.push(token3 + " ")
                    }   
                }
                console.log(stakeableTokensArray)
                setstakeableTokens(stakeableTokensArray)
                const getBNBamountInTreasury = await ethersProvider.getBalance(treasuryContractAddress)
                console.log(getBNBamountInTreasury.toString() * 10**-18)
                setBNBamountInTreasury(getBNBamountInTreasury.toString() * 10**-18)
                const getNumberOfLoans = await lendBorrowContractReadSettings.loanCount()
                console.log(getNumberOfLoans.toString())
                setnumberOfLoans(getNumberOfLoans.toString())
                const getMaxLoanAmount = await lendBorrowContractReadSettings.MAX_LOAN_AMOUNT()
                console.log(getMaxLoanAmount.toString() * 10**-18)
                setmaxLoanAmount(getMaxLoanAmount.toString() * 10**-18)
                const getMinLoanAmount = await lendBorrowContractReadSettings.MIN_LOAN_AMOUNT()
                console.log(getMinLoanAmount.toString() * 10**-18)
                setminLoanAmount(getMinLoanAmount.toString() * 10**-18)
                const getBNBAmountInSwap = await ethersProvider.getBalance(swapContractAddress)
                console.log(getBNBAmountInSwap.toString() * 10**-18)
                setBNBAmountInSwap(getBNBAmountInSwap.toString() * 10**-18)
                const getNumberOfDaoMembers = await daoContractReadSettings.memberCount()
                console.log(getNumberOfDaoMembers.toString())
                setnumberOfDaoMembers(getNumberOfDaoMembers.toString())
                const getNumberOfProposals = await daoContractReadSettings.proposalCount()
                console.log(getNumberOfProposals.toString())
                setnumberOfProposals(getNumberOfProposals.toString())
              } catch (error) {
                console.log(error)
              }
            }
            }
            getProtocolData();  
           }, [isConnected, address])

    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Protocol Metrics</div>
        <div className="text-[#ccc] text-[90%]">View status of protocol</div>

        <div className="text-center mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Total Supply</div>
                {totalTokenSupply ? (<div className="text-[#aaa] lg:w-[100%] md:w-[100%] w-[7cm] overflow-auto">{Intl.NumberFormat().format(parseFloat(totalTokenSupply).toFixed(10))} ULT</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Price</div>
                {tokenPrice ? (<div className="text-[#aaa]">≈ ${tokenPrice}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Protocol Blockchain</div>
                <div className="text-[#aaa]">BNB Smart Chain Testnet</div>
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Stakeable Tokens</div>
                {stakeableTokens ? (<div className="text-[#aaa]">{stakeableTokens}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Amount of BNB in Treasury</div>
                {BNBamountInTreasury > 0 ? (<div className="text-[#aaa]">{parseFloat(BNBamountInTreasury).toFixed(10)} BNB</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of Loans</div>
                {numberOfLoans > 0 ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfLoans)}</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Max Loan Amount</div>
                {maxLoanAmount ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(maxLoanAmount)} BNB</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Min Loan Amount</div>
                {minLoanAmount ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(minLoanAmount)} BNB</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}> 
                <div className="font-[500] text-[110%]">Amount of BNB in Swap</div>
                {BNBAmountInSwap > 0 ? (<div className="text-[#aaa]">{parseFloat(BNBAmountInSwap).toFixed(10)} BNB</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of DAO Members</div>
                {numberOfDaoMembers > 0 ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfDaoMembers)}</div>) : (<span>0</span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of DAO Proposals</div>
                {numberOfProposals > 0 ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfProposals)}</div>) : (<span>0</span>)}
            </div>
        </div>

        <div className="mt-[0.5cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>ULT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{tokenContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>DAO Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{daoContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>P2P Lend/Borrow Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{lendBorrowContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Swap Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{swapContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Stake (Time-frame) Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{stakeContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Treasury Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{treasuryContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>NFT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{nftContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>USDT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{usdtContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>DAI Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{daiContractAddress}</div>
            </div>
            </div>
            </div>
        </div>

        <div className="mt-[0.5cm]">
          <BNBChart />
        </div>

        </div>
    )
}