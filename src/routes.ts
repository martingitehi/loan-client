import { Route } from "@angular/router";
import { LoginComponent } from "./app/components/login/login.component";
import { AuthGuard } from "./services/authGuard.service";
import { HomeComponent } from "./app/components/home/home.component";
import { ViewerComponent } from "./app/components/streamview/streamview.component";

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'watch/:id', component: ViewerComponent, canActivate:[AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: '**', component: HomeComponent, pathMatch: 'full' }
]