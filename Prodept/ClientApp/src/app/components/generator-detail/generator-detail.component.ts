import { Component, OnInit, Input } from '@angular/core';
import { FormTable, FormCheckBox, FormDate, FormFile, FormInput, FormList, FormRadio, FormSelect, FormTextArea, DetailDataType } from 'src/app/datas/detail-data';

@Component({
  selector: 'app-generator-detail',
  templateUrl: './generator-detail.component.html',
  styleUrls: ['./generator-detail.component.scss']
})
export class GeneratorDetailComponent implements OnInit {
  @Input() datas: (FormTable|FormCheckBox|FormDate|FormFile|FormInput|FormList|FormRadio|FormSelect|FormTextArea)[];
  types = DetailDataType;
  constructor() { }

  ngOnInit(): void {
  }
  isFormList(data) {
    return data === this.types.LIST;
  }
  isFormRadio(data) {
    return data === this.types.RADIO;
  }
  isFormSelect(data) {
    return data === this.types.SELECT;
  }
  isFormTable(data) {
    return data === this.types.TABLE;
  }
  isFormInput(data) {
    return data === this.types.INPUT;
  }
  isFormCheckBox(data) {
    return data === this.types.CHECKBOX;
  }
  isFormDate(data) {
    return data === this.types.DATE;
  }
  isFormFile(data) {
    return data === this.types.FILE;
  }
  isFormTextArea(data) {
    return data === this.types.TEXTAREA;
  }
}
