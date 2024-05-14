import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '4ae4f912d4e7629aeeccff8fb3804be4'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}
 
const LiskSepolia = {
  chainId: 4202,
  name: 'Lisk Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-blockscout.lisk.com/',
  rpcUrl: 'https://rpc.sepolia-api.lisk.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'Ultimum Protocol',
  description: 'The most efficient protocol on Lisk featuring a DAO, swap dApp, Staking dApp, token, treasury, lending/borrowing',
  url: 'localhost:3000', // origin must match your domain & subdomain
  icons: ['https://ipfs.filebase.io/ipfs/QmTWz2iPDqP7kCywpnWrsmzGUPq7wE6R7cVYkEaks5eyPV']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 4202, // used for the Coinbase SDK
  enableEmail: true
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, LiskSepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--w3m-z-index': 9999,
    '--w3m-accent': '#502'
  },
  defaultChain: LiskSepolia,
  chainImages: {
    4202: 'https://ipfs.filebase.io/ipfs/QmVNJLurFEfHTDFTsnpErDJ8z7trj6t7woMVoTDwwX72Li'
  }
})

export function Web3Modal({ children }) {
  return children
}


