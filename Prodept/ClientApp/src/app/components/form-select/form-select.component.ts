import { Component, OnInit, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormSelect } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  @Input() data: FormSelect;

  constructor(private _approvalService: ApprovalService) {}

  ngOnInit(): void {
    if (this.data.disabled === false && this.data.initialValue !== null) {
      this._approvalService.add(this.data.name, this.data.initialValue);
    }
  }

  changeValue(event: MatSelectChange) {
    const val = event.source.value;
    const name = this.data.name;
    this._approvalService.add(name, val);
  }

}
