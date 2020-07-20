import { Component, OnInit, Input } from '@angular/core';
import { FormTable } from 'src/app/datas/detail-data';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss']
})
export class FormTableComponent implements OnInit {
  @Input() data: FormTable;
  
  constructor() { }

  ngOnInit(): void {
  }

}
