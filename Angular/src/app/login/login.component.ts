import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, ContractsService, AuthService } from '../api.service';

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: Boolean = false;
  loginForm: FormGroup;
  web3;
  contract;

  constructor(
    private contractService : ContractsService,
    private authService : AuthService

    ){
      const inst = contractService.getWeb3Instant();
      
      this.web3 = inst.web3
      this.contract = inst.contract;
      
      this.loginForm = new FormGroup({
        doctor_unique_id: new FormControl('', [Validators.required])
      });

   }
   
  ngOnInit() {
  }

    /**
   * Get form Validation Errors
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * for adding new tournament
   * @param {object} form_data 
   */
  doLogin(form_data) {
    this.submitted = true;
    console.log(typeof form_data.doctor_unique_id);

    if(this.loginForm.invalid){
      return;
    }
    
    this.getAccount().then( account =>{
      console.log(account[0]);      

      this.contract.methods.signInDoctor(form_data.doctor_unique_id)
            .call({from: account[0]})
            .then((obj)=>{
              console.log(obj);
              if(obj)
              this.authService.logged=true;
            });
    }); 
    this.submitted=false;
    this.loginForm.reset();
  }

  async getAccount(){
    return await window.web3.eth.getAccounts();
  }


}
