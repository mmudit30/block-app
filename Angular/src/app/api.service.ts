import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Web3 from 'web3';


declare let require: any;
declare let window: any;

let contractAbi = require('../../../ResultSmartContract/build/contracts/Result.json').abi;
@Injectable()
export class ContractsService {
  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = "0x484c12b655e0317a069396b5f110fca457a4226a";
  
  constructor() {
    this.getMetamaskAccount();
  }

  private async getMetamaskAccount(){
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert('Please install MetaMask extension for chrome before using this site');
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://rinkeby.infura.io/v3/ac9126c9073b4e1786b5f7139c5a2b21'
        )
      );
    }
     else {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      
      this._account = await window.web3.eth.getAccounts();
      console.log(this._account);

      this._web3 = new Web3(window.web3.currentProvider);
      // console.log(this._web3.eth);
      // console.log(this._web3.eth.getAccounts());
  
      // console.log(this._web3.eth.Contract(tokenAbi).at(this._tokenContractAddress) );
      // this._tokenContract = new _web3.eth.Contract(
      //   contractAbi,
      //   this._tokenContractAddress
      //   );
    }
  }

  getWeb3Instant = () => {
    const web3 = new Web3(window.web3.givenProvider);
    const contract = new web3.eth.Contract(
      contractAbi,
      '0x484c12b655e0317a069396b5f110fca457a4226a'
    );
    return { web3, contract }; 
  };


  



}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })};

  constructor(private httpClient: HttpClient) { }
  
  registerDoctor(details){
    const doctorData = new FormData();
    for (const key in details) {
      if (details.hasOwnProperty(key)
            ) {
              doctorData.append(key, details[key]);
      }
    }    

    this.httpClient.post<any>('http://localhost:4000/register-doctor' , details)
                    .subscribe(apiData => {
                      console.log(apiData);                      
                    });
  }
  
}
