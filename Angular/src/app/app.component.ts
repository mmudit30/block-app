import { Component } from '@angular/core';
import { ContractsService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'block-app';

  constructor(
    private contractService : ContractsService
    ){
      console.log(contractService.getWeb3Instant());      
  }
  ngOnInit() {

  }


}
