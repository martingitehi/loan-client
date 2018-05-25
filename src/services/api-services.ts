import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable()

export class API {
    url: string;
    authUrl: string;

    constructor(private http: Http) {
        this.url = environment.url;
        this.authUrl = environment.authUrl;
        this.http = http;
    }

    //calculate
    getFiles() {
        let url = `${this.url}/files`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            return this.http.get(url, options)
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

    //download file
    downloadFile(id: string, query: string) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            return this.http.get(`${this.url}/files/${id}${query}`, options)
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

    login(user: User): Promise<any> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })
        return new Promise(resolve => {
            return this.http.post(this.authUrl + '/login', body, options)
                .subscribe((data) => {
                    resolve(data.json())
                })
        })
    }

    getUserInfo(token: string): Promise<any> {
        return new Promise(resolve => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            this.http.get(this.authUrl + '/decode', { headers: headers })
                .subscribe(data => {
                    if (data.json().success) {
                        resolve(data.json());
                    }
                    else {
                        resolve(false);
                    }
                });
        });
    }

    extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        return Observable.throw(error || 'Server error');
    }
}

