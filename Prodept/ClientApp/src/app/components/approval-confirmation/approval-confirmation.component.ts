import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Decision } from 'src/app/models/decision';
import { ProjectService } from 'src/app/services/project.service';
import { ApprovalService } from 'src/app/services/approval.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-confirmation',
  templateUrl: './approval-confirmation.component.html',
  styleUrls: ['./approval-confirmation.component.scss']
})
export class ApprovalConfirmationComponent implements OnInit {
  isApprove: boolean;
  constructor(
    public dialogRef: MatDialogRef<ApprovalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Decision,
    private _projectService: ProjectService,
    ) {
    const p = JSON.parse(this.data.data);
    this.isApprove = p.data;
  }

  ngOnInit(): void {
  }

  submitApproval() {
    this._projectService.submitDecision(this.data).subscribe((x) => {
      this.dialogRef.close(true);
    });

  }

}
