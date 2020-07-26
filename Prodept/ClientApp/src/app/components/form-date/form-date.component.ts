import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormDate } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { MatCalendarCellCssClasses, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDateComponent implements OnInit {
  @Input() data: FormDate;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  dateClass = (d): MatCalendarCellCssClasses => {
    const date = d.day();
    return (date === 0 || date === 6) ? 'weekend' : '';
  }

  constructor(private _approvalService: ApprovalService) {}



  ngOnInit(): void {
    if (this.data.range === true) {
      this.range.get('start').setValue(this.data.data[0]);
      this.range.get('end').setValue(this.data.data[1]);
      if (this.data.disabled === false && this.data.data.length === 2) {
        const name = this.data.name;
        const start = new Date(this.data.data[0].valueOf());
        this._approvalService.add(`start:=${name}`, start);
        const end = new Date(this.data.data[1].valueOf());
        this._approvalService.add(`end:=${name}`, end);
      }
    } else {
      if (this.data.disabled === false && this.data.data.length === 1) {
        const name = this.data.name;
        const d = new Date(this.data.data[0].valueOf());
        this._approvalService.add(`${name}`, d);
      }
    }
  }
  changeDate(prefix: string, event: MatDatepickerInputEvent<Date>) {
    const name = this.data.name;
    if (prefix === 'start:=') {
      this._approvalService.remove(`end:=${name}`);
    }
    try {
      const val = event.value;
      const value = new Date(val.valueOf());
      this._approvalService.add(`${prefix}${name}`, value);
    } catch (error) {
    }
  }
}
