import { Component, OnInit } from '@angular/core';
import { dataDetail1, exampleMou } from 'src/app/datas/detail-data';
import { Detail } from 'src/app/models/detail-data';
import { ApprovalService } from 'src/app/services/approval.service';
import { tap } from 'rxjs/operators';
import { Decision } from 'src/app/models/decision';
import { DecisionData } from 'src/app/models/decision-data';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  data: Detail = dataDetail1;
  dataUpload: any;
  dataDecision: boolean;
  apiName: string;
  id: string;
  constructor(
    private _approvalService: ApprovalService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {

    this.data.data = this.data.data.sort((a, b) =>
      a.index < b.index ? -1 : a.index > b.index ? 1 : 0
    );
    this._approvalService.decision$.subscribe(x => this.dataDecision = x);
    this._approvalService.data$.pipe(tap(x => console.log(x))).subscribe(x => this.dataUpload = x);

    this.apiName = this._activatedRoute.snapshot.params['apiName'];
    this.id = this._activatedRoute.snapshot.params['id'];
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

  approve() {
    this._approvalService.decision.next(true);
    const q = this.generateDataUpload();
  }
  notApprove() {
    this._approvalService.decision.next(false);
    const q = this.generateDataUpload();
  }
  goToOriginal() {
    let url = this.data.urlProject;
    if (url && url.indexOf('http') === -1) {
      url = `//${url}`;
    }
    window.open('//' + url, '_blank');
  }


}
