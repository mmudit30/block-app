import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted: Boolean = false;
  registerForm: FormGroup;

  constructor(
    private apiservice : ApiService
  ) {
    this.registerForm = new FormGroup({
      doctor_ethereum_address: new FormControl('', [Validators.required]),
      doctor_unique_id: new FormControl('', [Validators.required]),
      doctor_full_name: new FormControl('', [Validators.required]),
      doctor_lab_id: new FormControl('', [Validators.required])
    });

   }

  ngOnInit() {
  }

    /**
   * Get form Validation Errors
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * for adding new tournament
   * @param {object} form_data 
   */
  doRegister(form_data) {
    this.submitted = true;
    console.log("data from form", form_data);

    if(this.registerForm.invalid){
      return;
    }
    this.apiservice.registerDoctor(form_data);

    // this.submitted=false;
    // this.registerForm.reset();
  }


}
