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
  FormSelectItem,
  FormFileItem,
  FormRadioItem,
  FormCheckBoxItem,
  Detail,
  FormGroup,
  FormAutoComplete,
} from '../models/detail-data';
import { DetailDataType } from '../models/enums/detail-data-enum';
import { RequiredWhenType } from '../models/enums/required-when-type.enum';

const rs: (
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
  | FormAutoComplete
)[] = [];
const f1: FormInput = {
  index: 1,
  type: DetailDataType.INPUT,
  data:
    'Isi dari form input yiygi oooh oh o o oj oj  ij oo  oo o oo ho hooh oh oho o ohoho',
  disabled: true,
  label: 'Input String',
  name: 'input_string',
  typeForm: 'text',
  required: false,
  requiredWhen: null
};
rs.push(f1);
const f2: FormInput = {
  index: 0,
  type: DetailDataType.INPUT,
  data: 20000,
  disabled: true,
  label: 'Input Number',
  name: 'input_number',
  typeForm: 'number',
  required: false,
  requiredWhen: null
};
rs.push(f2);
const f3: FormDate = {
  index: 3,
  type: DetailDataType.DATE,
  data: [new Date()],
  disabled: true,
  label: 'Input Date',
  name: 'input_date',
  range: false,
  required: true,
  requiredWhen: RequiredWhenType.NOT_APPROVE
};
rs.push(f3);

const f4: FormDate = {
  index: 2,
  type: DetailDataType.DATE,
  data: [new Date(), new Date()],
  disabled: false,
  label: 'Input Date Range',
  name: 'input_date_range',
  range: true,
  required: false,
  requiredWhen: null
};
rs.push(f4);
const f5: FormTextArea = {
  index: 4,
  type: DetailDataType.TEXTAREA,
  data:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellendus natus vel voluptatem delectus ullam eos. Ea voluptate excepturi, nesciunt magni rerum, earum cum natus quam eum quo dicta fugit.',
  disabled: false,
  label: 'Input Text Area',
  name: 'input_text_area',
  required: false,
  requiredWhen: null
};
rs.push(f5);
const f6: FormList = {
  index: 5,
  type: DetailDataType.LIST,
  data: f5.data.split(' '),
  label: 'List data',
};
rs.push(f6);

const f7: FormTable = {
  index: 6,
  type: DetailDataType.TABLE,
  data: [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'geon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'ueon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'peon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'leon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'reon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'eeon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'qeon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'aeon', weight: 20.1797, symbol: 'Ne' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ],
  header: [
    { key: 'position', title: 'Posisi' },
    { key: 'name', title: 'Nama' },
    { key: 'weight', title: 'Bobot' },
    { key: 'symbol', title: 'Simbol' },
  ],
  label: 'Table data',
};
rs.push(f7);

const selDatas: FormSelectItem[] = [];
for (let index = 0; index < 5; index++) {
  const p = new FormSelectItem();
  p.data = 'data' + index;
  p.disabled = false;
  p.label = 'Data ' + index;
  if (index === 3) {
    p.disabled = true;
  }
  selDatas.push(p);
}
const f8: FormSelect = {
  index: 3,
  disabled: false,
  type: DetailDataType.SELECT,
  data: selDatas,
  label: 'Select data',
  name: 'sel_data',
  initialValue: null,
  required: true,
  requiredWhen: null
};
rs.push(f8);

const fildatas: FormFileItem[] = [];
for (let index = 0; index < 7; index++) {
  const p = new FormFileItem();
  p.data = 'fhiahfhfoi';
  p.label = 'File12141.pdf';
  p.link = 'http://192.168.28.61/sewacooler/file/' + p.label;
  fildatas.push(p);
}

const f9: FormFile = {
  index: 4,
  type: DetailDataType.FILE,
  data: fildatas,
  label: 'Download File',
};
rs.push(f9);

const raddatas: FormRadioItem[] = [];
for (let index = 0; index < 4; index++) {
  const p = new FormRadioItem();
  p.data = 'radio' + index;
  p.disabled = false;
  if (index === 2) {
    p.disabled = true;
  }
  p.label = 'Radio - ' + index;
  raddatas.push(p);
}

const f10: FormRadio = {
  index: 8,
  type: DetailDataType.RADIO,
  data: raddatas,
  label: 'Radio items',
  disabled: false,
  initialValue: 'radio2',
  name: 'radiopilihan',
  required: true,
  requiredWhen: RequiredWhenType.BOTH
};
rs.push(f10);
const cbdatas: FormCheckBoxItem[] = [];
for (let index = 0; index < 4; index++) {
  const el = new FormCheckBoxItem();
  el.checked = false;
  el.data = index.toString();
  el.disabled = false;
  el.label = 'Nama ' + index;
  if (index === 1) {
    el.checked = true;
  }
  if (index === 2) {
    el.disabled = true;
  }
  cbdatas.push(el);
}

const f11: FormCheckBox = {
  index: 9,
  type: DetailDataType.CHECKBOX,
  data: cbdatas,
  label: 'Checkbox items',
  name: 'nama',
  required: true,
  requiredWhen: RequiredWhenType.APPROVE
};
rs.push(f11);



export const dataDetail1: Detail = {
  title: 'Detail 1',
  subtitle: 'sub detail perlu approval',
  data: rs,
  urlProject: 'www.google.com',
  link: 'https://cobaapprove.com/approve',
};


const datamou: (
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
  | FormAutoComplete
)[] = [];

const groupMou: FormGroup = {
  title: 'Data MOU',
  index: 0,
  type: DetailDataType.FORMGROUP
};
datamou.push(groupMou);

const katmou: FormInput = {
  label: 'Kategori MOU',
  data: 'MOU Toko Baru',
  disabled: false,
  index: 1,
  name: 'katmou',
  type: DetailDataType.INPUT,
  typeForm: 'text',
  required: false,
  requiredWhen: null
};
datamou.push(katmou);

const tglmou: FormDate = {
  label: 'Tanggal MOU',
  disabled: false,
  index: 2,
  name: 'tangal_mou',
  range: false,
  data: [],
  type: DetailDataType.DATE,
  required: false,
  requiredWhen: null
};
datamou.push(tglmou);

const tglmou2: FormDate = {
  label: 'Tanggal MOU 2',
  disabled: false,
  index: 2,
  name: 'tangal_mou2',
  range: true,
  data: [],
  type: DetailDataType.DATE,
  required: false,
  requiredWhen: null
};
datamou.push(tglmou2);

const fee: FormInput = {
  label: 'Franchise Fee',
  data: 20000000,
  disabled: false,
  index: 3,
  name: 'ffee',
  type: DetailDataType.INPUT,
  typeForm: 'number',
  required: false,
  requiredWhen: null
};
datamou.push(fee);

const inves: FormInput = {
  label: 'Nilai Investasi',
  data: 400000000,
  disabled: true,
  index: 4,
  name: null,
  type: DetailDataType.INPUT,
  typeForm: 'number',
  required: false,
  requiredWhen: null
};
datamou.push(inves);



export const exampleMou: Detail = {
  title: 'Approval MOU',
  subtitle: 'MOU Toko Baru',
  urlProject: 'www.google.com',
  link: 'https://192.168.2.49/mdifapi/approval',
  data: datamou
};
