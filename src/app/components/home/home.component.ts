import { Component, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';
import { API } from '../../../services/api-services';
import { Router } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  title = 'Movie Buff';
  files: string[] = [];
  message = '';
  type = 'mp4';
  filter='';

  constructor(private api: API, private router: Router) {
  }

  ngOnInit() {
    this.getFiles()
  }

  ngOnChanges() {
    this.getFiles()
  }

  //get the files
  getFiles() {
    this.api.getFiles()
      .then((res: any) => {
        if (res.success) {
          this.files = res.files;
          this.message = Number.parseInt(res.records) > 0 ? `${res.records} ${this.type.toLocaleUpperCase()} files found.` : 'Sorry, no matching files found';
        }
      })
  }

  toggleType(type:string){
    this.filter = type;
    this.type = type;
  }

  downloadFile(id: string, type: string) {
    this.api.downloadFile(id, `?type=${type}`);
  }

  watchVideo(video: any) {
    this.router.navigate(['watch', video.short_name])
  }
}