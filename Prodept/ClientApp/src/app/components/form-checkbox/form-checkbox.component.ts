import { Component, OnInit, Input } from '@angular/core';
import { FormCheckBox } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
})
export class FormCheckboxComponent implements OnInit {
  @Input() data: FormCheckBox;

  constructor(private _approvalService: ApprovalService) {}

  ngOnInit(): void {
    if (this.data.required === true) {
      for (const item of this.data.data) {
        if (item.checkSign) {
          this._approvalService.addPair(this.data.name, item.data);
        }
      }
    }

  }

  checkStatus(event: MatCheckboxChange) {
    const checked = event.checked;
    const name = this.data.name;
    const val = event.source.value;
    if (checked) {
      this._approvalService.addPair(name, val);
    } else {
      this._approvalService.removePair(name, val);
    }
  }
}
