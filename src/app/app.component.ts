import { Component } from '@angular/core';
import { API } from '../services/api-services';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie Buff';
  user?: any;
  files: string[] = [];
  message = '';
  type = 'jpg';

  constructor(private api:API) {
    this.user = localStorage.getItem('buffy_user') ? JSON.parse(localStorage.getItem('buffy_user')) : null;
  }

  
  //get the files
  getFiles() {
    this.api.getFiles()
      .then((res: any) => {
        if (res.success) {
          this.files = res.files;
          this.message = `${res.records} ${this.type.toLocaleUpperCase()} files found.`;
        }
      })
  }

}
