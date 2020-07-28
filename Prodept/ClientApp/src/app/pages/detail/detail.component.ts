import { Component, OnInit } from '@angular/core';
import { dataDetail1, exampleMou } from 'src/app/datas/detail-data';
import { Detail } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { tap } from 'rxjs/operators';
import { Decision } from 'src/app/models/decision';
import { DecisionData } from 'src/app/models/decision-data';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WarningRequiredComponent } from 'src/app/components/warning-required/warning-required.component';
import { DataUpload } from 'src/app/models/data-upload';
import { RequiredWhenType } from 'src/app/models/enums/required-when-type.enum';
import { ProjectService } from 'src/app/services/project.service';
import { RequestList } from 'src/app/models/request-list';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  data: Detail;
  dataUpload: DataUpload[] = [];
  dataDecision: boolean;
  apiName: string;
  id: string;
  projectName: string;
  constructor(
    private _approvalService: ApprovalService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _projectService: ProjectService
    ) {}

  ngOnInit(): void {
    this.apiName = this._activatedRoute.snapshot.params['apiName'];
    this.id = this._activatedRoute.snapshot.params['id'];
    this._approvalService.decision$.subscribe(x => this.dataDecision = x);
    this._approvalService.data$.subscribe(x => this.dataUpload = x);
    this.fetchData();
  }

  sortForm() {
    this.data.data = this.data.data.sort((a, b) =>
      a.index < b.index ? -1 : a.index > b.index ? 1 : 0
    );
  }

  fetchData() {
    const p: RequestList = new RequestList();
    p.nik = this._authService.user.value.nik;
    p.apiName = this.apiName;
    p.id = this.id;
    this._projectService.getDetailRequestProject(p).subscribe((x: RequestList) => {
      const det = JSON.parse(x.detail);
      this.data = det;
      this.projectName = x.projectName;
      this.sortForm();
    });
  }

  generateDataUpload() {
    const p: DecisionData = {
      data: this.dataDecision,
      dataForm: JSON.stringify(this.dataUpload)
    };
    const q: Decision = {
      apiName: this.apiName,
      data: JSON.stringify(p),
      id: this.id,
      nik: this._authService.user.value.nik,
      link: this.data.link
    };
    return q;
  }

  checkDataFormUpload(): boolean {
    console.log(this.dataUpload);
    let safe = true;
    const key = 'required';
    for (const iterator of this.data.data) {
      if (Object.prototype.hasOwnProperty.call(iterator, key) && iterator[key] === true) {
          const c = this.dataUpload.filter(x => {
            if (x.name.includes(':=')) {
              return x.name === `start:=${iterator['name']}` && x.name === `end:=${iterator['name']}`;
            } else {
              return x.name === iterator['name'];
            }
          });
          if (c.length === 0) {
            if (iterator['requiredWhen'] === RequiredWhenType.APPROVE && this.dataDecision === true) {
              safe = false;
              this.openWarningModal(`${iterator['label']} harus diisi!`);
              break;
            } else if (iterator['requiredWhen'] === RequiredWhenType.NOT_APPROVE && this.dataDecision === false) {
              safe = false;
              this.openWarningModal(`${iterator['label']} harus diisi!`);
              break;
            } else {
              safe = false;
              this.openWarningModal(`${iterator['label']} harus diisi!`);
              break;
            }
          }
      }
    }
    return safe;
  }

  approve() {
    this._approvalService.decision.next(true);
    const resCheck = this.checkDataFormUpload();
    if (resCheck) {
      const q = this.generateDataUpload();
      console.log(q);
    }
  }
  notApprove() {
    this._approvalService.decision.next(false);
    const resCheck = this.checkDataFormUpload();
    if (resCheck) {
      const q = this.generateDataUpload();
      console.log(q);
    }
  }
  openWarningModal(message: string) {
    this._dialog.open(WarningRequiredComponent, {
      data: { message: message },
    });
  }
  goToOriginal() {
    let url = this.data.urlProject;
    if (url && url.indexOf('http') === -1) {
      url = `//${url}`;
    }
    window.open('//' + url, '_blank');
  }


}
