import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  surveySelection:boolean=true;
  data:any
  constructor(private router:Router,) { }

  ngOnInit() {}
  survey(data:string){
  if(data=='rep')
  {
    this.surveySelection=false

  }
  if(data=='sur'){
    this.surveySelection=true
  }
}

surveyFormNavigation(){
  this.router.navigateByUrl("/surveyForm");
}
surveyList(){
  this.router.navigateByUrl("/survey-list"); 
}

}
