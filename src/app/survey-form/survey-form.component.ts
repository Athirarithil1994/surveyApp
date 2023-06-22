import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLiteService } from '../Util/sqlite.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
})
export class SurveyFormComponent  implements OnInit {

  isFutureCustomer:string = "on";
  constructor(public formBuilder: FormBuilder, private router:Router,public dbService: SQLiteService)  { 
    
  }

  changeFutureCustomerStatus(status:any) {
    console.log(status.target.value);
    this.isFutureCustomer = status.target.value;
  }

  public surveyForm: FormGroup = this.formBuilder.group({
    product: ['', Validators.required],
    yearsOfUsage: ['', Validators.required],
    rate: ['', Validators.required],
    isFutureCustomer: ['', Validators.required]
  });
  ngOnInit() {


  }
  backToHome() {
    this.router.navigateByUrl("/home");
  }

  submit(){
    var obj={
      "product":this.surveyForm.controls['product'].value,
      "yearsOfUsage":this.surveyForm.controls['yearsOfUsage'].value,
      "rate":this.surveyForm.controls['rate'].value,
      "isFutureCustomer":this.isFutureCustomer
    }
    
    let array:any[] = [];
    array.push(new Date().getTime());
    array.push(obj.product);
    array.push(obj.yearsOfUsage);
    array.push(obj.rate);
    array.push(obj.isFutureCustomer);
      this.dbService.getTables().then(res=>{
        let index = res.values?.indexOf("surveys");
        if(index && index>=0){
          this.dbService.createSurveys(array);
        } else {
          this.dbService.createSurveyTables("surveys").then((res:any)=>{
            this.dbService.createSurveys(array).then((res:any)=>{
              alert("Created survey with id " +res.changes?.lastId);
              //this.router.navigateByUrl("/login");
            });
          })
        }
      })
    



  }
 

}
