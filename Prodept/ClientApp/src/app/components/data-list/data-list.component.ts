import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataDaftar } from 'src/app/datas/list-data';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnInit {
  @Input() data: DataDaftar[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
