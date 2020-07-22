import { DaftarDataType } from "./enums/list-data-enum";

export class DataDaftar {
  unique: string;
  id: string;
  title: string;
  status: string;
  subtitle: string;
}

export class Daftar {
  title: string;
  dataType: DaftarDataType;
  data: DataDaftar[] | Daftar[]; // DataDaftar[] -> datatype=LIST ; Daftar[] -> datatype=TAB ;
}
