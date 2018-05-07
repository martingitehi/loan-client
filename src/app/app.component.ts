import { Component, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';
import { API } from '../services/api-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Loan Amortizer';

  pmt: Number = 0;
  schedule: any[] = [];
  months: number = 14;
  amount: number = 245000;
  message = '';
  showSchedule: boolean = false;

  constructor(private api: API) {

  }

  ngOnInit() {
    this.calculatePMT()
  }

  ngOnChanges() {
    this.calculatePMT()
  }

  ///calculate the PMT value for use in gettting the repayment schedule
  calculatePMT() {
    this.api.calculatePmt({ period: this.months, amount: this.amount, rate: 10 })
      .then((res: any) => {
        if (res.success) {
          this.pmt = res.amount;
          this.message = this.message;
        }
      })
  }

  getSchedule() {
    this.api.getRepaymentSchedule({ period: this.months, amount: this.amount, rate: 10 })
      .then((res: any) => {
        if (res.success) {
          this.showSchedule = true;
          this.schedule = res.schedule;
        }
      })
  }

  toggleView() {
    this.showSchedule == false ? this.showSchedule = true : this.showSchedule = false;
  }

}
