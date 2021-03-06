import { DaftarDataType } from './enums/list-data-enum';

export class DataDaftar {
  id: string;
  title: string;
  status: string;
  subtitle: string;
  displayed: boolean;
}

export class Daftar {
  title: string;
  dataType: DaftarDataType;
  data: DataDaftar[] | Daftar[]; // DataDaftar[] -> datatype=LIST ; Daftar[] -> datatype=TAB ;
}
