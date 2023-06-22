import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import {ViewSurveyComponent} from './view-survey/view-survey.component';
const routes: Routes = [
  {
    path: '', redirectTo:'login', pathMatch:"full"
   
  },
  {
    path: 'login',component:LoginComponent, pathMatch: 'full'
   
  }, {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {path:'surveyForm',component:SurveyFormComponent},
  {path:'survey-list',component:ViewSurveyComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule, ReactiveFormsModule]
})
export class AppRoutingModule {}
