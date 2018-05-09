import { NgModule } from '@angular/core';
import { Http, HttpModule, Response, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { API } from '../services/api-services';

const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: '', component: AppComponent}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [API],
  bootstrap: [AppComponent]
})
export class AppModule { }
