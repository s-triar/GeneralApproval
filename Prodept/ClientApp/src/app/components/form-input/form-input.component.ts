import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormInput } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() data: FormInput;
  constructor(private _approvalService: ApprovalService) {}

  ngOnInit(): void {
    if (this.data.required === true && this.data.data !== null && this.data.data !== 0) {
      this._approvalService.add(this.data.name, this.data.data);
    }
  }

  changeInput(event) {
    const val = event.target.value;
    const name = this.data.name;
    this._approvalService.add(name, val);
  }
}
