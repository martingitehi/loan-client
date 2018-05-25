import { NgModule } from '@angular/core';
import { Http, HttpModule, Response, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { API } from '../services/api-services';
import { OrderByPipe } from '../services/orderby.pipe';
import { FilterByPipe } from '../services/filterby.pipe';
import { appRoutes } from '../routes';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from '../services/authService';
import { AuthGuard } from '../services/authGuard.service';
import { ViewerComponent } from './components/streamview/streamview.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterByPipe,
    OrderByPipe,
    HomeComponent,
    LoginComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [API, OrderByPipe, FilterByPipe, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
