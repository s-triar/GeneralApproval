import { Component, OnInit, Input } from '@angular/core';
import { Daftar, DaftarDataType } from 'src/app/datas/list-data';

@Component({
  selector: 'app-data-tab',
  templateUrl: './data-tab.component.html',
  styleUrls: ['./data-tab.component.scss']
})
export class DataTabComponent implements OnInit {
  @Input() data: Daftar[];
  dtENUM = DaftarDataType;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
