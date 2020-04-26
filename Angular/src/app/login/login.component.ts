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
    // console.log("data", form_data);
    console.log(typeof form_data.doctor_unique_id);

    if(this.loginForm.invalid){
      return;
    }
    
    this.contract.methods.signInDoctor('VN-54').call({from: '0xbc5aC9e4bEe4aAE9F0D97F27d9e81B3eBDC8a39a'})
          .then((obj)=>{
            console.log(obj);
          });
 
    // this.submitted=false;
    // this.loginForm.reset();
  }


}
