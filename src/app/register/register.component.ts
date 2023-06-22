import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../Util/core.service';
import { Router } from '@angular/router';
import { SQLiteService } from '../Util/sqlite.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  constructor(private router:Router, public formBuilder: FormBuilder, public dbService: SQLiteService) { 

  }
  submitAttempt:boolean = false;
  private initPlugin: boolean = false;
  public signupForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phoneNo: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  doRegister() {
    this.submitAttempt = true;
    var obj={
      "name":this.signupForm.controls['name'].value,
      "phoneNo":this.signupForm.controls['phoneNo'].value,
      "email":this.signupForm.controls['email'].value,
      "password":this.signupForm.controls['password'].value
    }
    let array:any[] = [];
    array.push(obj.phoneNo);
    array.push(obj.name);
    array.push(obj.email);
    array.push(obj.phoneNo);
    array.push(obj.password);
    this.dbService.getTables().then(res=>{
      let index = res.values?.indexOf("users");
      if(index && index>=0){
        this.dbService.createUser(array);
      } else {
        this.dbService.createTables("users").then(res=>{
          this.dbService.createUser(array).then(res=>{
            alert("Created user with id " +res.changes?.lastId);
            this.router.navigateByUrl("/login");
          });
        })
      }
    })
  }
  ngOnInit() {
    //this._sqlite.getAllToDos().then(data => console.log(data));
  }

}
