import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../Util/core.service';
import { SQLiteService } from '../Util/sqlite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(public formBuilder: FormBuilder,private router:Router, private databaseService:SQLiteService) { }
  public loginForm: FormGroup = this.formBuilder.group({
    uname: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.databaseService.init();
  }

  goToSignup() {
    this.router.navigateByUrl("/register");
  }
  goToLogin(){
    this.loadUsers();
  }
  loadUsers() {
    this.databaseService.getProductList().then(res=>{
      var userFlag = false;
      if(res && res.values) {
        let datas = res.values;
        for(var i=0;i<datas.length;i++) {
          if(datas[i].phoneNo == this.loginForm.controls['uname'].value && datas[i].password == this.loginForm.controls['password'].value){
            userFlag = true;
            break;
          
          }
        }
        if(userFlag) {
          this.router.navigateByUrl("/home");
        } else {
          alert("Invalid Credentials");
        }
      }
    });
  }
    
}
