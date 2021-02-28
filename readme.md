# EtherBank

A decentralized bank that allows ERC20 Tokens to be deposited in exchange for an interest payout.

## Front End

The deposit feature calls the deposit function of the dBank contract which transfers the ERC20 token from the user's wallet into the mapping value within the contract.

![deposit](https://github.com/igibliss00/ethereum-bank/blob/master/images/deposit.png)

The withdraw feature calls the withdraw function of the dBank contract which transfers the ERC20 token to the user's wallet along with a newly minted token as an interest.

![withdraw](https://github.com/igibliss00/ethereum-bank/blob/master/images/withdraw.png)

MetaMask activity history showing the deposit and the withdraw history.

![history](https://github.com/igibliss00/ethereum-bank/blob/master/images/activity.png)

Adding the custom token Decentralized Universal Token (DUT) to the wallet

![addDUT](https://github.com/igibliss00/ethereum-bank/blob/master/images/addDUT.png)

Decentralized Universal Token is paid out as an interest for the deposit

![dut](https://github.com/igibliss00/ethereum-bank/blob/master/images/dut.png)


## Installing

First, install Truffle globally.
```
npm i -g truffle@nodeLTS
```
Install the relevant packages:

```
git clone https://github.com/igibliss00/real_estate_erc721_dapp.git
npm install
```

## Running the tests

To run all tests:

```
truffle test
```

## Running the website

1. Download and install Ganache from [here](https://www.trufflesuite.com/ganache).

2. Download and install the MetaMask browser extension from your browser's extension store or from [here](https://metamask.io/download).

3. Migrate the smart contracts to the Ganache's blockchain with `truffle migrate`.

4. Import a MetaMask account by using the private key of one of the Ganache's test accounts.

5. Link your MetaMask to Ganache by registering Ganache's RPC Server and the Network ID to MetaMask's Custom RPC.

6. Start the React app with `npm start`.

7. Now you should be able to deposit and withdraw!

In the case that the Web3 is unable to call the smart contract functions, try `truffle migrate --reset`.
