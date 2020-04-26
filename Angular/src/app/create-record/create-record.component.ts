import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, ContractsService } from '../api.service';

declare let window: any;

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {


  submitted: Boolean = false;
  createRecordForm: FormGroup;
  web3;
  contract;

  constructor( 
    private apiservice : ApiService,
    private contractService : ContractsService
   ) {
    const inst = contractService.getWeb3Instant();
      
    this.web3 = inst.web3
    this.contract = inst.contract;

    this.createRecordForm = new FormGroup({
      patient_id_type: new FormControl('', [Validators.required]),
      patient_id_number: new FormControl('', [Validators.required]),
      patient_full_name: new FormControl('', [Validators.required]),
      patient_antibody_count: new FormControl('', [Validators.required]),
      patient_test_result: new FormControl('', [Validators.required]),
    });

   }

  ngOnInit() {
    

  }

    /**
   * Get form Validation Errors
   */
  get f() {
    return this.createRecordForm.controls;
  }

  /**
   * for adding new tournament
   * @param {object} form_data 
   */
  createRecord(form_data) {
    this.submitted = true;
    console.log("data", form_data);

    if(this.createRecordForm.invalid){
      return
    }

    this.getAccount().then( account =>{
      console.log(account[0]);      
      
      this.contract.methods.addResult(
        form_data.patient_id_number,
        form_data.patient_full_name,
        form_data.patient_id_type,
        // form_data.patient_antibody_count,
        form_data.patient_test_result
        ).send({from: account[0] })
          .then((obj)=>{
            console.log(obj);
          });

    });

    // this.submitted=false;
    // this.createRecordForm.reset();
  }

  async getAccount(){
    return await window.web3.eth.getAccounts();
  }

}
