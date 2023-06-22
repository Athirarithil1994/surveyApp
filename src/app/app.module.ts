import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CoreService } from './Util/core.service';
import { HomeComponent } from './home/home.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteService } from './Util/sqlite.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewSurveyComponent } from './view-survey/view-survey.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent,HomeComponent,SurveyFormComponent,ViewSurveyComponent],
  imports: [BrowserModule, ReactiveFormsModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CoreService,SQLite, SQLiteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
