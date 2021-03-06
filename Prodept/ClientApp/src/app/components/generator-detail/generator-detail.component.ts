import { Component, OnInit, Input } from '@angular/core';
import {
  FormTable,
  FormCheckBox,
  FormDate,
  FormFile,
  FormInput,
  FormList,
  FormRadio,
  FormSelect,
  FormTextArea,
  FormAutoComplete,
} from 'src/app/models/detail-data';
import { DetailDataType } from 'src/app/models/enums/detail-data-enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generator-detail',
  templateUrl: './generator-detail.component.html',
  styleUrls: ['./generator-detail.component.scss'],
})
export class GeneratorDetailComponent implements OnInit {
  @Input() datas: any;
  types = DetailDataType;
  constructor() {}

  ngOnInit(): void {
  }
  isFormGroup(data) {
    return data === this.types.FORMGROUP;
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
  isFormCheckbox(data) {
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
  isFormAutoComplete(data) {
    return data === this.types.AUTOCOMPLETE;
  }
  isFormImage(data) {
    return data === this.types.IMAGE;
  }
}
