import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      if (accounts.length > 0) {
        this.getData(accounts[0], netId, web3)

      } else {
        this.setState({ hasMetaMask: "not logged in" })
      }
    } else {
      this.setState({ hasMetaMask: "no" })
      window.alert("You are currently visiting a blockchain website. Please install the MetaMask browser extension to continue.")
    } 
  }

  async getData(account, netId, web3) {
    const balance = await web3.eth.getBalance(account)
    this.setState({ 
      account: account,
      balance: balance,
      web3: web3,
      hasMetaMask: "yes" 
    })

    try {
      const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
      const dBankAddress = dBank.networks[netId].address
      
      this.setState({
        token: token,
        dbank: dbank,
        dBankAddress: dBankAddress
      })
    } catch(e) {
      console.log("error", e)
      window.alert("Contracts not deployed to the current network")
    }
  }

  async deposit(amount) {
    if(this.state.dbank !== "undefined") {
      try {
        await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account})
      } catch(e) {
        console.log("Error, depsoit: ", e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if(this.state.dbank != "undefined") {
      try {
        await this.state.dbank.methods.withdraw().send({ from: this.state.account })

      } catch(e) {
        console.log("Error, withdraw: ", e)
      }
    }
  }

  async enableEthereum() {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    this.getData(account, netId, web3)
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
      hasMetaMask: "no" 
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
        <img src={dbank} className="App-logo" alt="logo" height="32"/>
          <b>EtherBank</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to EtherBank</h1>
          <h2>{this.state.account}</h2>
          <br></br>
          <div className="row">
          { this.state.hasMetaMask == "yes" ?
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                    <br></br>
                    How much would you like to deposit?
                    <br></br>
                    (min. amount is 0.01 ETH)
                    <br></br>
                    (maximum 1 deposit)
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmount.value
                      amount = amount * 10**18 // convert to wei
                      this.deposit(amount)
                    }}>
                      <div className="form-group mr-sm-2">
                        <br></br>
                        <input 
                          id="depositAmount"
                          step="0.01"
                          type="number"
                          className="form-control form-control-md"
                          placeholder="amount"
                          required
                          ref={(input) => { this.depositAmount = input }}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">DEPOSIT</button>
                    </form>
                  </div>
                </Tab>
                <Tab eventKey="withdraw" title="Withdraw">
                  <br></br>
                  Would you like to withdraw + take interest?
                  <br></br>
                  <br></br>
                  <div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                  </div>
                </Tab>
              </Tabs>
              </div>
            </main>
            : this.state.hasMetaMask == "not logged in" ?
            <main role="main" className="col-lg-12 d-flex text-center">
              <button class="enableEthereumButton" onClick={() => this.enableEthereum()}>Enable Ethereum</button>
            </main>
            :
            <main></main>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;