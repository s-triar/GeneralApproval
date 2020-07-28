import { Component, OnInit, Input } from '@angular/core';
import { FormRadio } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
})
export class FormRadioComponent implements OnInit {
  @Input() data: FormRadio;
  constructor(private _approvalService: ApprovalService) {}

  ngOnInit(): void {
    if (this.data.required === true && this.data.initialValue !== null) {
      this._approvalService.add(this.data.name, this.data.initialValue);
    }
  }

  changeInput(event: MatRadioChange) {
    const val = event.source.value;
    const name = this.data.name;
    this._approvalService.add(name, val);
  }
}
