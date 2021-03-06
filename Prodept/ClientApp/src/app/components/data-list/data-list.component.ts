import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataDaftar } from 'src/app/models/list-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnInit {
  @Input() data: DataDaftar[];
  apiname: string;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.apiname = this._activatedRoute.snapshot.params['apiName'];
  }

  goToDetail(id) {

    this._router.navigate(['/detail', this.apiname, id]);
  }
}
