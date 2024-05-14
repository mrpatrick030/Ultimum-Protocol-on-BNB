import '@/styles/globals.css'
import { Web3Modal } from '@/context/web3modal';
export const metadata = {
  title: 'Ultimum Protocol',
  description: 'The most efficient protocol on Lisk featuring a DAO, lending/borrowing dApp, swap dApp, Staking dApp, token, treasury'
}

export default function App({ Component, pageProps }) {
  return  <Web3Modal> <Component {...pageProps} /> </Web3Modal>
}
