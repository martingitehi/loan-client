import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'streamview',
    templateUrl: './streamview.component.html',
    styleUrls: ['./streamview.component.css']
})
export class ViewerComponent implements OnInit {
   fileId:string;
   fileInfo:any;

    constructor( private route:ActivatedRoute) {
        this.fileId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
    }
}