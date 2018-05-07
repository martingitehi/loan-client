import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable()

export class API {
    url: string;
    constructor(private http:Http) {
        this.url = environment.url;
        this.http = http;
    }

    //calculate
    calculatePmt(pmt: any) {
        let body = JSON.stringify(pmt);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            return this.http.post(this.url + '/api/calculate', body, options)
                .subscribe((data) => {
                    if (data) {
                        resolve(data.json());
                    }
                    else {
                        resolve(data.json().message)
                    }
                })
        })
    }

    //get schedule
    getRepaymentSchedule(pvif: any) {
        let body = JSON.stringify(pvif);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            return this.http.post(this.url + '/api/get-schedule', body, options)
                .subscribe((data) => {
                    if (data) {
                        resolve(data.json());
                    }
                    else {
                        resolve(data.json().message)
                    }
                })
        })
    }


    extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        return Observable.throw(error || 'Server error');
    }
}

