import { useState, useEffect } from "react";
import DaoStakingAndNFT from "./daostakingandnft";
import DAOgovernance from "./daogovernance";
import Help from "./help";
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

export default function UltimumDAOSection({displayComponent}) {
      // wallet connect settings
      const { address, chainId, isConnected } = useWeb3ModalAccount()
      const { walletProvider } = useWeb3ModalProvider()

      //loading state
      const [loading, setLoading] = useState()

      //help section
      const [help, setHelp] = useState()
      const [instruction1, setInstruction1] = useState()
      const [instruction2, setInstruction2] = useState()
      const [instruction3, setInstruction3] = useState()
      const [instruction4, setInstruction4] = useState()
      const [instruction5, setInstruction5] = useState()

      // lets read data for the DAO section using inbuilt functions and abi related read functions
       const [userBNBBalance, setuserBNBBalance] = useState()
       const [userULTBalance, setUserULTBalance] = useState()
       const [userNFTBalance, setUserNFTBalance] = useState()
       const [stakedTokenCapital, setStakedTokenCapital] = useState()
       const [showDAO, setShowDAO] = useState(true)

       useEffect(()=>{
        const getTheData = async() => {
          if(isConnected){
             //read settings first
             const ethersProvider = new BrowserProvider(walletProvider) 
             const tokenContractReadSettings = new Contract(tokenContractAddress, tokenContractABI, ethersProvider)
             const stakeContractReadSettings = new Contract(stakeContractAddress, stakeContractABI, ethersProvider)
             const nftContractReadSettings = new Contract(nftContractAddress, nftContractABI, ethersProvider)       
           try {
            const BNBbalance = await ethersProvider.getBalance(address)
            const parseBNBbalance = formatUnits(BNBbalance, 18);
            console.log(parseBNBbalance)
            setuserBNBBalance(parseBNBbalance)
            const ULTbalance = await tokenContractReadSettings.balanceOf(address)
            const parseULTbalance = formatUnits(ULTbalance, 18);
            console.log(parseULTbalance)
            setUserULTBalance(parseULTbalance)
            const NFTbalance = await nftContractReadSettings.balanceOf(address)
            console.log(NFTbalance.toString())
            setUserNFTBalance(NFTbalance.toString())
            if (NFTbalance.toString() < 1){
              setShowDAO(false)
            }
            else if (NFTbalance.toString() > 0){
              setShowDAO(true)
            }
            const getStakedTokenDetails = await stakeContractReadSettings.stakeassets(address, tokenContractAddress)
            const tokencapital = (getStakedTokenDetails.capital.toString()) *10 **-18
            setStakedTokenCapital(tokencapital)
          } catch (error) {
            console.log(error)
          }
        }
        }
        getTheData();  
       }, [displayComponent, isConnected, userBNBBalance, userULTBalance, userNFTBalance, stakedTokenCapital, address, showDAO, loading])



    //Now we are going to write to Treasury contract to buy ULT before we mint NFT
    const [BNBamount, setBNBamount] = useState()
    const buyULT = async () => {
      if(isConnected){
       setLoading(true)
       const ethersProvider = new BrowserProvider(walletProvider) 
       const signer = await ethersProvider.getSigner()
       const treasuryContractWriteSettings = new Contract(treasuryContractAddress, treasuryContractABI, signer)
       try {
        const buyult = await treasuryContractWriteSettings.buyTokens({value:parseUnits(BNBamount, 18)})
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
      }
    }

    // consecutive functions to mint nft
    const uri = 'https://ipfs.filebase.io/ipfs/QmbtQv3yoefpiNPsu38FXKstoFF82v1N2bcsQRphqcje4g'
    const [showApproveStakeButton, setshowApproveStakeButton] = useState(true)
    const [showStakeButton, setshowStakeButton] = useState(true)
    const approveStakingContractFromTokenContract = async () => {
      if(isConnected){
       setLoading(true) 
       const ethersProvider = new BrowserProvider(walletProvider) 
       const signer = await ethersProvider.getSigner()
       const tokenContractWriteSettings = new Contract(tokenContractAddress, tokenContractABI, signer)
       try {
        const approveStakeContract = await tokenContractWriteSettings.approve(stakeContractAddress, parseUnits('1000', 18));
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

    const stakeULTtokensToMint = async () => {
      if(isConnected){
       setLoading(true)
       const ethersProvider = new BrowserProvider(walletProvider) 
       const signer = await ethersProvider.getSigner()
       const stakeContractWriteSettings = new Contract(stakeContractAddress, stakeContractABI, signer)
       try {
        if(stakedTokenCapital == "0"){const stakeULTtokens = await stakeContractWriteSettings.stake(tokenContractAddress, parseUnits('1000', 18), "300680000");}
        else {const increaseULTstake = await stakeContractWriteSettings.increaseStake(tokenContractAddress, parseUnits('1000', 18))}
        setshowStakeButton(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
      }
    }

    const mintNFT = async () => {
      if(isConnected){
       setLoading(true)
       const ethersProvider = new BrowserProvider(walletProvider) 
       const signer = await ethersProvider.getSigner()
       const daoContractWriteSettings = new Contract(daoContractAddress, daoContractABI, signer)
       try {
        const mintnft = await daoContractWriteSettings.mintNft(uri);
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
      }
    }

 

      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>DAO Governance</div>
        <div className="text-[#ccc] text-[90%]">Participate in the governance of Ultimum DAO</div>
        
        {help ? 
        ( <div className='Help bg-[rgba(0,0,0,1)] rounded-xl w-[100%] h-[100%] top-0 left-0 right-0' style={{position:"absolute", zIndex:"9999"}}>
          <div data-aos="zoom-out" className='lg:mx-[20%] md:mx-[10%] mx-[5%]'>
          <img src="images/cancel.png" width="40" className='m-[auto] mt-[10%] cursor-pointer cancelbutton rounded-[100%]' onClick={(e) => setHelp(false)} />
          <Help setHelp={setHelp} instruction1={instruction1} instruction2={instruction2} setInstruction1={setInstruction1} setInstruction2={setInstruction2} instruction3={instruction3} instruction4={instruction4} setInstruction3={setInstruction3} setInstruction4={setInstruction4} instruction5={instruction5} setInstruction5={setInstruction5}/>
         </div>
        </div>) : 
        (<div className="text-right font-[500] mt-[0.5cm]"><span className="cursor-pointer" onClick={(e) => setHelp(true)}>Help <img src="images/add.png" className="ml-[0.2cm]" width="17" style={{display:"inline-block"}} /></span></div>)
        }

          <div>
         {showDAO ?
          (<div className="mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <DAOgovernance />
          </div>) 
          :
        (<div className="mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
           <DaoStakingAndNFT address={address} BNBamount={BNBamount} setBNBamount={setBNBamount} buyULT={buyULT} showApproveStakeButton={showApproveStakeButton} showStakeButton={showStakeButton} approveStakingContractFromTokenContract={approveStakingContractFromTokenContract} stakeULTtokensToMint={stakeULTtokensToMint} mintNFT={mintNFT} userULTBalance={userULTBalance} userNFTBalance={userNFTBalance} userBNBBalance={userBNBBalance} stakedTokenCapital={stakedTokenCapital} />
        </div>)}
        </div>

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

        </div>
    )
}