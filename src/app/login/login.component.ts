import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: Boolean = false;
  loginForm: FormGroup;

  constructor(
    private apiservice : ApiService
  ) {
    this.loginForm = new FormGroup({
      unique_address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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
    console.log("data", form_data);

    if(this.loginForm.invalid){
      return;
    }

    this.submitted=false;
    this.loginForm.reset();
  }


}
