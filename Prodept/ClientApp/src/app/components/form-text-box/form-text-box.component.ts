import { Component, OnInit, Input } from '@angular/core';
import { FormTextArea } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';

@Component({
  selector: 'app-form-text-box',
  templateUrl: './form-text-box.component.html',
  styleUrls: ['./form-text-box.component.scss'],
})
export class FormTextBoxComponent implements OnInit {
  @Input() data: FormTextArea;
  constructor(private _approvalService: ApprovalService) {}

  ngOnInit(): void {
    if (this.data.disabled === true && this.data.data !== null) {
      this._approvalService.add(this.data.name, this.data.data);
    }
  }

  changeInput(event) {
    const val = event.target.value;
    const name = this.data.name;
    this._approvalService.add(name, val);
  }
}
