import { DetailDataType } from './enums/detail-data-enum';

export class FormInput {
  index: number;
  type: string = DetailDataType.INPUT;
  disabled: boolean;
  data: string | number;
  label: string;
  name: string;
  required: boolean;
  typeForm: string;
}

export class FormFile {
  index: number;
  type: string = DetailDataType.FILE;
  data: FormFileItem[];
  label: string;
}

export class FormFileItem {
  link: string;
  data: string;
  label: string;
}

export class FormDate {
  index: number;
  type: string = DetailDataType.DATE;
  disabled: boolean;
  data: Date[];
  label: string;
  range: boolean;
  required: boolean;
  name: string;
}

export class FormCheckBox {
  index: number;
  type: string = DetailDataType.CHECKBOX;
  label: string;
  data: FormCheckBoxItem[];
  name: string;
  required: boolean;
}

export class FormCheckBoxItem {
  disabled: boolean;
  checked: boolean;
  label: string;
  data: string;
}

export class FormTextArea {
  index: number;
  type: string = DetailDataType.TEXTAREA;
  disabled: boolean;
  data: string;
  label: string;
  name: string;
  required: boolean;
}

export class FormRadio {
  index: number;
  type: string = DetailDataType.RADIO;
  disabled: boolean;
  data: FormRadioItem[];
  label: string;
  name: string;
  required: boolean;
  initialValue: string;
}
export class FormRadioItem {
  disabled: boolean;
  data: string;
  label: string;
}

export class FormSelect {
  index: number;
  type: string = DetailDataType.SELECT;
  disabled: boolean;
  data: FormSelectItem[];
  label: string;
  name: string;
  required: boolean;
  initialValue: string;
}
export class FormSelectItem {
  disabled: boolean;
  data: string;
  label: string;
}

export class FormList {
  index: number;
  type: string = DetailDataType.LIST;
  data: string[];
  label: string;
}
export class FormTable {
  index: number;
  type: string = DetailDataType.TABLE;
  header: FormTableHeader[];
  data: any[];
  label: string;
}

export class FormTableHeader {
  key: string;
  title: string;
}

export class FormGroup {
  title: string;
  index: number;
  type: string = DetailDataType.FORMGROUP;
}


export class Detail {
  title: string;
  subtitle: string;
  link: string;
  urlProject: string;
  data: (
    | FormTable
    | FormCheckBox
    | FormDate
    | FormFile
    | FormInput
    | FormList
    | FormRadio
    | FormSelect
    | FormTextArea
    | FormGroup
  )[];
}
