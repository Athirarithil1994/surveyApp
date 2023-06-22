import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../Util/sqlite.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss'],
})
export class ViewSurveyComponent  implements OnInit {

  constructor(private router:Router,private databaseService:SQLiteService) { }
  surveylist:any
  ngOnInit() {
    this.loadSurvey();
  
  }
  loadSurvey() {
    this.databaseService.getSurveyList().then((res:any)=>{
   
 this.surveylist = res.values
       
  
 
    
})
  }
 
  backToHome() {
    this.router.navigateByUrl("/home");
  }
}
