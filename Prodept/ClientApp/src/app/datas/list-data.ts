import { DataDaftar, Daftar } from '../models/list-data';
import { DaftarDataType } from '../models/enums/list-data-enum';
import { RequestList } from '../models/request-list';

const rl: DataDaftar[] = [];
for (let index = 0; index < Math.floor(Math.random() * 100); index++) {
  const r: DataDaftar = {
    displayed: false,
    id: index.toString(),
    status: 'menunggu approval',
    subtitle: 'subtitle',
    title: 'title ' + index.toString(),
  };
  rl.push(r);
}

const rt: Daftar[] = [];
for (let index = 0; index < 4; index++) {
  const rs: DataDaftar[] = [];
  for (let inx = 0; inx < Math.floor(Math.random() * 100); inx++) {
    const r: DataDaftar = {
      displayed: false,
      id: inx.toString(),
      status: 'menunggu approval',
      subtitle: 'subtitle',
      title: 'title ' + inx.toString(),
    };
    rs.push(r);
  }
  const r: Daftar = {
    title: 'daftar title ' + index.toString(),
    data: rs,
    dataType: DaftarDataType.LIST,
  };
  rt.push(r);
}

export const dataList1: Daftar = {
  title: 'Daftar 1',
  dataType: DaftarDataType.TAB,
  data: rt,
};


export const coba: RequestList[] = [];
for (let index = 0; index < 20; index++) {
  let cat: string = null;
  if (index % 2 === 0) {
    cat = '1';
  } else if (index % 3 === 0) {
    cat = '2';
  }
  const p: RequestList = new RequestList();
  p.nik = '000';
  p.apiName = 'qweasd';
  p.id = index.toString();
  p.category = cat === null ? null : cat.toString();
  p.title = `title - ${index}`;
  p.subTitle = `sub title dari title - ${index}`;
  p.status = `st ${index}`;
  coba.push(p);

}
