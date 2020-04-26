import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, ContractsService } from '../api.service';

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
    private contractService : ContractsService
    ){
      const inst = contractService.getWeb3Instant();
      
      this.web3 = inst.web3
      this.contract = inst.contract;
      
      this.loginForm = new FormGroup({
        doctor_unique_id: new FormControl('', [Validators.required])
      });


      // console.log(this.web3);
      // console.log(this.contract);

      // this.contract.methods.getDoctorInfo('VN-54').call().then((obj)=>{
      //   console.log(obj);
        
      // });

   }
   
  //  async getAccount(){
  //   const account = await window.web3.eth.getAccounts();
  //   console.log(account);

  //   this.contract.methods.addAddress().call({from: account})
  //                .once('receipt', receipt => console.log("SUCCESS") );

  //  }

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
    // console.log("data", form_data);
    console.log(typeof form_data.doctor_unique_id);

    if(this.loginForm.invalid){
      return;
    }
    
    this.contract.methods.signInDoctor('VN-54').call().then((obj)=>{
      console.log(obj);
    });
    
  // console.log(this.contract.getDoctorInfo('mudit'));

    // this.contract.signInDoctor(form_data.doctor_unique_id);

    // this.submitted=false;
    // this.loginForm.reset();
  }


}
