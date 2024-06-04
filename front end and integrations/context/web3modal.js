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

const BNBsmartchainTestnet = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'tBNB',
  explorerUrl: 'https://testnet.bscscan.com/',
  rpcUrl: 'https://public.stackup.sh/api/v1/node/bsc-testnet'
}

// 3. Create a metadata object
const metadata = {
  name: 'Ultimum Protocol',
  description: 'The most efficient protocol on BNB Smart Chain featuring a DAO, swap dApp, Staking dApp, token, treasury, lending/borrowing',
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
  defaultChainId: 1, // used for the Coinbase SDK
  enableEmail: true
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, BNBsmartchainTestnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--w3m-z-index': 9999,
    '--w3m-accent': '#00f'
  },
  defaultChain: mainnet,
  chainImages: {
    97: 'https://ipfs.filebase.io/ipfs/QmeNL7GHomheB7fTXTrTVJ2F7s366tnVeDS1tnE1KamtP7'
  }
})

export function Web3Modal({ children }) {
  return children
}


