import { DataDaftar, Daftar } from "../models/list-data";
import { DaftarDataType } from "../models/enums/list-data-enum";

const rl: DataDaftar[] = [];
for (let index = 0; index < Math.floor(Math.random() * 100); index++) {
  const r: DataDaftar = {
    unique: index.toString(),
    id: index.toString(),
    status: "menunggu approval",
    subtitle: "subtitle",
    title: "title " + index.toString(),
  };
  rl.push(r);
}

const rt: Daftar[] = [];
for (let index = 0; index < 4; index++) {
  const rs: DataDaftar[] = [];
  for (let inx = 0; inx < Math.floor(Math.random() * 100); inx++) {
    const r: DataDaftar = {
      unique: inx.toString(),
      id: inx.toString(),
      status: "menunggu approval",
      subtitle: "subtitle",
      title: "title " + inx.toString(),
    };
    rs.push(r);
  }
  const r: Daftar = {
    title: "daftar title " + index.toString(),
    data: rs,
    dataType: DaftarDataType.LIST,
  };
  rt.push(r);
}

export const dataList1: Daftar = {
  title: "Daftar 1",
  dataType: DaftarDataType.TAB,
  data: rt,
};
