import { Component, OnInit, Input } from '@angular/core';
import { FormFile } from 'src/app/datas/detail-data';

@Component({
  selector: 'app-form-file',
  templateUrl: './form-file.component.html',
  styleUrls: ['./form-file.component.scss']
})
export class FormFileComponent implements OnInit {
  @Input() data: FormFile;
  constructor() { }

  ngOnInit(): void {
  }

  download() {

  }

}
