# Ultimum DeFi Protocol Documentation [Web App](https://ultimumprotocol.vercel.app) / [Demo Video]()
Ultimum Protocol is a DAO-governed DeFi protocol that seeks to address several issues, including lending and borrowing through its P2P Lending/Borrowing dApp, staking using the time-framing method, swapping using ChainLink oracles, and decentralisation through the Ultimum DAO. Utilising a strong blend of front end, integration, and smart contract technologies, Ultimum offers platform users a smooth experience. 
As a result of our user-first approach, members of the DAO can access a greater range of Ultimum products, participate in the governance process to make decisions, and even get rewards for their contributions to the DAO's governance. With its solutions, such as the time-framing staking mechanism that gives users control over their staked assets (allowing them to stake and unstake at any time within a timeframe of their choosing), Ultimum seeks to revolutionise the DeFi industry. The Ultimum Swap, which allows users to swap their preferred tokens, offers the optimal user experience by integrating with ChainLink oracles. 
In theory, the DAO is in charge of overseeing the swap, meaning that tokens can only be added or deleted with the consent of other DAO members. In terms of finances, Ultimum will keep the Ultimum Treasury afloat by using the trading fees from the Ultimum dApps. The Treasury provides backing for the Ultimum Token (ULT). A DAO-regulated P2P lending and borrowing dApp is also offered by Ultimum Protocol. Ultimum is implemented on the BNB Smart Chain, with an emphasis on gas optimisation. This means that users won't have to worry about gas prices, which are quite minimal (about x10 lower than Ethereum). 
The Ultimum dashboard makes it simple and straightforward to access Ultimum's products as well as, yes, your records and assets on the platform, which are secured and accessible to you only through a wallet or email login. Visit Ultimum to get the most value out of your assets.

## Features of Ultimum Protocol
This protocol features a robust combination of smart contracts and front end and integration tools ranging from a DAO, Swap dApp, Staking dApp, P2P Lending/Borrowing dApp, ChainLink Oracles, a Dashboard, "Live market charts, Live token prices, Blockchain insights integration (using the Trading View API)", wallet and email login (using Web3Modal x Ethers.js), decentralised chat, newsletter (using Nodemailer), blog(with admin sign up, sign in and admin dashboard), documentation, Filebase storage, search functionalities, paginations, flaticons library, and an intuitive interface with a slick responsive design and smooth user experience.

## Tools used to create Ultimum Protocol
### Smart Contract Tools
Solidity, Foundry, ChainLink oracles, OpenZeppelin, ETH aggregator

### Front end and Integration Tools
Web3Modal, Ethers.js, BNB Smart Chain testnet Token Tracker, Next.js, Node.js, JavaScript, Tailwind CSS, Trading View Live API, Filebase storage, PostgreSQL

## The Ultimum Protocol's Products

### Connect Wallet
To connect wallet, go to our [Web App](https://ultimumprotocol.vercel.app). For desktop, click on the "Connect Wallet" button on the upper right of the screen and choose your login method either with wallet or email. If you don't have a wallet installed already, the wallet connect window has links to download a wallet of your choice on your device's browser (Brave browser, Google Chrome, Opera browser, or Yandex browser all work fine). On mobile, simply download your desired EVM-compatible wallet and use its inbuilt browser to connect to Ultimum. Connect your wallet by clicking on the "Connect wallet" button on the upper right of the screen. Ensure to change network to BNB Smart Chain test network from the wallet connect window. The display on the screen will change after connecting (typically, it shows your BNB balance and a substring of your connected wallet address).

### Get testnet BNB for gas fees payments
With Ultimum Protocol being deployed currently on the testnet of BNB Smart Chain, testnet BNB would definitely be required to pay for gas fees during transactions. Testnet BNB can be obtained from the [BNB testnet faucet](https://www.bnbchain.org/en/testnet-faucet).

### Web app homepage
The homepage of the Ultimum Protocol's web app is the first page you see when you visit the app. It is the gateway to Ultimum's dashboard and features the wallet connect button as well as other important information about the protocol including documentation, social media links, forum, team of developers, blog, newsletter subscription, blockchain insights with Trading View integration and live market chart of your favorite cryptocurrencies.

 ### The Ultimum Protocol Dashboard
This is the most functional part of the Ultimum Protocol. It houses the most important parts of the protocol including User's Balances, Protocol Metrics, DAO Governance,  P2P Lending/Borrowing dApp, Swap dApp, Stake dApp, Wallet connect, decentralised chat, Live market chart, Live token prices etc. 

### User's Balances
This section of the dashboard shows all the balances of a user after logging in. It displays the following info for a user: ULT balance, ULT price, BNB balance, Staked tokens (by token symbols), and last active time on DAO which shows the time of your last activity on the DAO.

### Protocol Metrics
Protocol metrics section shows live updates to the Ultimum protocol including the following: ULT Total Supply, ULT Price, Protocol Deployment Blockchain, Stakeable Tokens (by token symbols), Amount of ULT in Treasury, Number of Loans, Max Loan Amount, Min Loan Amount, Amount of BNB in Swap, Number of DAO Members, Number of DAO Proposals, contract addresses of all contracts used by the protocol and Live market chart.

### DAO Governance
The Ultimum DAO is the powerhouse of the Ultimum protocol. It determines the next direction of the protocol through voting by members of the DAO. Using the DAO as a powerful tool, Ultimum protocol users are able to engage in governance and that includes but not limited to decision making, creation of proposals, view proposal details and voting activities to steer the ecosystem forward. This democratic approach ensures transparency and decentralisation in the protocol. The DAO also decides tokens to be used in the Swap, Staking and Lend and Borrow dApps. The default tokens available as at the time of writing this documentation are: ULT, BNB, USDT and DAI. To enjoy full DAO benefits, become an active member and get rewarded with ULT for your contributions to the governance of the DAO.

### How to Participate in the Governance of the DAO

#### Join DAO
To join the DAO, firstly, a user has to obtain at least 2,000 ULT tokens and stake 1,000 ULT to obtain the Ultimum Soulbound NFT which is sent to your wallet automatically. The NFT gives you access to the DAO. For non-members, the process of obtaining the NFT is the page you will see in the DAO section. After obtaining the NFT, the system automatically redirects you to the governance of the DAO. On the Join DAO tab, you will be required to register a username, then you can click on the "Click to Join DAO" button. Your wallet address will be associated with your chosen username and your membership status will be updated to "member". The Join DAO tab will disappear after your registration is successful.

#### View Proposals
This is the part of the DAO where all proposals made in the DAO are being displayed for all members to see and vote for. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Only the DAO decides which token to add to any of the dApps. The View Proposals section shows the proposal description, the proposer, ID of proposal, date of proposal, status of proposal, number of upvotes, number of downvotes and a "Close Proposal" button which is only visible to the proposer of a particular proposal. Typically, a proposal runs for at least 7 days and can only be closed after 7 days by the proposer (the proposal can be left open for as long as the proposer wants). The system uses the difference in upvotes and downvotes to determine if a proposal will be approved by the community. Obviously, a higher number of upvotes means a proposal will be approved. A search bar and pagination effect have been integrated to help our users navigate between proposals with ease.

#### Create a Proposal
Creation of proposals requires you to input a proposal description. Clearly describe your proposal in simple terms for all members to understand. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Then click on the "Click to Create a Proposal" button to submit your proposal. The system automatically associates your proposal with your wallet address, and as such, you are the only one with the right to close that proposal.

 #### Vote for a Proposal
Voting is being done to determine if a proposal will be accepted or not. Members of the DAO can upvote or downvote a proposal. To vote for a proposal, checkout the "View Proposals" section and click on the green upvote symbol or the red downvote symbol or click on the "Vote for a Proposal" tab, and input ID of proposal and click on either upvote or downvote, then submit vote. Your vote will be associated with your wallet address and it will count on the "View Proposals" page. For transparency in the governance of the DAO, the number of upvotes and downvotes are being displayed. You cannot vote more than once for a proposal. If there is a higher number of upvotes, a proposal will be approved. But if there is a higher number of downvotes, the proposal will be rejected and as such will not be implemented.

### P2P Lend/Borrow dApp
Our users are able to participate in unique P2P lending/borrowing activities of supported tokens. Firstly, a loan has to be created by the borrower using the "Create Loan" button in the Borrow section, then another user (the lender) funds the loan by lending to the borrower using the "Fund Loan" button in the Lend section. The loan has the following characteristics: loan amount, interest, expiry date, and collateral. Collateral provided by the borrower is locked up by the system until the given duration expires, and can be claimed back if there is no lender after the duration of the loan using the "Withdraw Funds" button in the Borrow section of the dApp. Borrowed tokens can also be claimed using the "Withdraw Funds" button. The collateral is sent out to the lender if the borrower fails to repay the loan during the specified time using the "Claim Collateral" button in the Lend section. When you lend on Ultimum, you get rewarded hugely according to the agreed terms of the loan (your funds are secured with our security algorithm). When you borrow from Ultimum P2P, ensure to present a collateral and pay back with interest when you repay the amount using the "Repay Loan" button in the Borrow section. For a better user experience, a "view all available loans section" and "view your loans section" with search functionality and pagination have been integrated into the dApp for lenders to navigate between loans. A decentralised chat has also been integrated for lenders and borrowers to effectively communicate, all while maintaining privacy. Participate in Ultimum DAO governance to determine the next supported token/collateral. 

### Swap dApp
With a ChainLink oracle integration, live token data and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap dApp to swap a variety of supported tokens with low gas fees (10x lesser than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. Ensure you have set network to the BNB Smart Chain test network on the wallet connect and enjoy a seamless swap dApp experience.

### Staking (Time-frame) dApp
Ultimum Protocol is driving the blockchain sector into the self-banking age with actual advancements, and thus lets you earn smart money in a variety of ways. Among them is the time-framing method of staking where you experience full flexibility of your tokens without fear of money being locked up or fear of assets being lost. Time-frame your Ultimum tokens (ULT) over a set period chosen by you to gain instant huge rewards from the ecosystem. Ultimum Protocol will use this new technology to more properly communicate value, allowing you to better control your financial future and capitalize on the value of your money over time. When you stake your tokens, you have the freedom to claim rewards and unstake at anytime, unlike other staking platforms where your assets are locked up without access to them during a time duration predetermined by their systems. The Ultimum staking dApp displays your token balance, amount staked, reward accrued, stake start date, and chosen time duration of stake. Note that unstaking before the chosen time duration incurs a penalty.

### Ultimum Token/Treasury
The Ultimum token (ULT) is the native token of the Ultimum Protocol and is backed by the Ultimum treasury. The Ultimum treasury ensures effective management of the Ultimum token (ULT) and liquidity and minimize risks. This treasury will also optimize financial operations that support product development. If per adventure, ULT goes below 100% of its initial value during the bear market, the treasury acts as a liquidity provider to manage the token price and ensure its stability across all platforms.

### The Ultimum Blog
We want to keep our users updated on the latest improvements and progress of the Ultimum Protocol. For that reason, a blog has been integrated on the Ultimum web app (using PostgreSQL and Filebase storage). Click on the "Blog" button on the homepage to access the blog. It features an "all posts" section, single posts section, a sidebar, a search functionality and a pagination functionality to navigate between posts. To control the blog, admin sign up, admin sign in and an admin dashboard have been created to add, update or delete blog posts.

## Additional Notes
In future upgrades of this project, more dApp features/services and oracles will be integrated. We are also focussed on user experience in the DAO and dApps.

## Team Members (Team Ultimum)
* Patrick Ominisan - Blockchain developer (Web3Bridge)
* Kolapo Goodness - Smart contract developer (Web3Bridge)


# Contract Addresses with BNB Smart Chain Testnet Links


## DAO Contract

✅ [DAO](https://testnet.bscscan.com/address/0x5de93b7d36e1bdeca9438a4b3c0e64e5fb637e76) 🟢
- Address: `0x5de93b7d36e1bdeca9438a4b3c0e64e5fb637e76`

## P2P Lending/Borrowing Contract

✅ [P2PLending](https://testnet.bscscan.com/address/0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2) 🟢
- Address: `0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2`

## Treasury Contract

✅ [Treasury](https://testnet.bscscan.com/address/0x5816ab7fffd3f5c4d1897539240873b29c0f3aec) 🟢
- Address: `0x5816ab7fffd3f5c4d1897539240873b29c0f3aec`

## StakeBEP20 (Time-frame) Contract

✅ [StakBEP20](https://testnet.bscscan.com/address/0x1bfb9a434667ddfe57d6d67d556f5917e6958764) 🟢
- Address: `0x1bfb9a434667ddfe57d6d67d556f5917e6958764`

## Swap Contract

✅ [Swapper](https://testnet.bscscan.com/address/0xe9c49311b81545cced67ab3313c8f4f938ba1920) 🟢
- Address: `0xe9c49311b81545cced67ab3313c8f4f938ba1920`

## Ultimum BEP20 (ULT) Contract

✅ [Ultimum](https://testnet.bscscan.com/address/0xe4d3a364b49f885a95692b2e3d3c95bc15dad4d0) 🟢
- Address: `0xe4d3a364b49f885a95692b2e3d3c95bc15dad4d0`

## Ultimum NFT Contract

✅ [UltNft](https://testnet.bscscan.com/address/0xb5b81a928a20070e5e9e888615f018affebfe8de) 🟢
- Address: `0xb5b81a928a20070e5e9e888615f018affebfe8de`

# Other Tokens

## USDT

- **[USDT](https://testnet.bscscan.com/address/0x0db2a8aa2e2c023cfb61c617d40162cc9f4c27ab)**: 0x0db2a8aa2e2c023cfb61c617d40162cc9f4c27ab

## DAI

- **[DAI](https://testnet.bscscan.com/address/0xadd24771bcb47b28d85cefb641ef469bc9e52cf7)**: 0xadd24771bcb47b28d85cefb641ef469bc9e52cf7
# Ultimum-DeFi-Protocol
