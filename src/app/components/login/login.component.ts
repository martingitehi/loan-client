import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../../services/authService';
import { API } from '../../../services/api-services';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: any;
  message: string;
  info: string;
  engaged: boolean = false;
  btnText = 'Sign In';

  constructor(private authService: AuthService,
    private api: API,
    private router: Router) {
    this.user = {} as User
  }


  login(user: any) {
    this.engaged = true;
    this.btnText = 'Signing In...';
    this.api.login(user).then((auth: any) => {
      if (auth.success == true) {
        localStorage.setItem('buffy_token', auth.token)
        this.api.getUserInfo(auth.token).then((res: any) => {
          if (res.success == true) {
            localStorage.setItem('buffy_user', JSON.stringify(res.user));
            this.engaged = false;
            this.btnText = 'Sign In';
            this.router.navigate(['/home'])
          }
          else{
            this.message = res.json().message;
          }
        })
      }
      else {
        this.engaged = false;
        this.btnText = 'Sign In';
        this.message = 'Authentication failed. Wrong username and/or password';
      }
    }).catch(error => {
      this.engaged = false;
      this.btnText = 'Sign In';
      this.message = error.message;
    });
  }
}
