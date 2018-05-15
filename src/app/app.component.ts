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
  months: number = 8;
  amount: number = 250000;
  message = '';

  constructor(private api: API) {
  }

  ngOnInit() {
    this.calculate()
  }

  ngOnChanges() {
    this.calculate()
  }

  ///calculate the PMT value for use in gettting the repayment schedule
  calculatePMT() {
    this.api.calculatePmt({ period: this.months, amount: this.amount, rate: 10 })
      .then((res: any) => {
        if (res.success) {
          this.pmt = res.amount;
          this.message = res.message;
        }
      })
  }

  getSchedule() {
    this.api.getRepaymentSchedule({ period: this.months, amount: this.amount, rate: 10 })
      .then((res: any) => {
        if (res.success) {
          this.schedule = res.schedule;
          console.log(this.schedule)
        }
      })
  }

  calculate(){
    this.calculatePMT()
    this.getSchedule()
  }

}
