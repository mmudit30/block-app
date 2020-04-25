import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {

  submitted: Boolean = false;
  createRecordForm: FormGroup;

  constructor() {
    this.createRecordForm = new FormGroup({
      unique_id_type: new FormControl('', [Validators.required]),
      unique_id_number: new FormControl('', [Validators.required]),
      full_name: new FormControl('', [Validators.required]),
      test_result: new FormControl('', [Validators.required]),
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

    // this.submitted=false;
    // this.addTournamentForm.reset();
  }


}
