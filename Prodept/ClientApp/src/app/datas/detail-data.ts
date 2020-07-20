export enum DetailDataType {
    INPUT = 'INPUT',
    FILE = 'FILE',
    DATE = 'DATE',
    CHECKBOX = 'CHECKBOX',
    TEXTAREA = 'TEXTAREA',
    RADIO = 'RADIO',
    SELECT = 'SELECT',
    LIST = 'LIST',
    TABLE = 'TABLE'
}


export class FormInput {
    index: number;
    type: string = DetailDataType.INPUT;
    disabled: boolean;
    data: string|number;
    label: string;
    name: string;
}

export class FormFile {
    index: number;
    type: string = DetailDataType.FILE;
    link: string;
    data: string;
    label: string;
    name: string;
}

export class FormDate {
    index: number;
    type: string = DetailDataType.DATE;
    disabled: boolean;
    data: Date[];
    label: string;
    range: boolean;
    name: string;
}

export class FormCheckBox {
    index: number;
    type: string = DetailDataType.CHECKBOX;
    disabled: boolean;
    label: string;
    data: FormCheckBoxItem[];
    name: string;
}

export class FormCheckBoxItem {
    disabled: boolean;
    checked: boolean;
    label: string;
    data: string;
    name: string;
}

export class FormTextArea {
    index: number;
    type: string = DetailDataType.TEXTAREA;
    disabled: boolean;
    data: string;
    label: string;
    name: string;
}

export class FormRadio {
    index: number;
    type: string = DetailDataType.RADIO;
    disabled: boolean;
    data: FormRadioItem[];
    label: string;
    name: string;
}
export class FormRadioItem {
    disabled: boolean;
    data: string;
    label: string;
    name: string;
}

export class FormSelect {
    index: number;
    type: string = DetailDataType.SELECT;
    disabled: boolean;
    data: FormSelectItem[];
    label: string;
    name: string;
}
export class FormSelectItem {
    disabled: boolean;
    data: string;
    label: string;
    name: string;
}

export class FormList {
    index: number;
    type: string = DetailDataType.LIST;
    data: string[];
    label: string;
    name: string;
}
export class FormTable {
    index: number;
    type: string = DetailDataType.TABLE;
    header: string[];
    data: any[];
    label: string;
    name: string;
}

export class Detail {
    title: string;
    subtitle: string;
    link: string;
    data: (FormTable|FormCheckBox|FormDate|FormFile|FormInput|FormList|FormRadio|FormSelect|FormTextArea)[];
}

export class DataDetail {
    dataForm: FormTable|FormCheckBox|FormDate|FormFile|FormInput|FormList|FormRadio|FormSelect|FormTextArea;
}


const rs: (FormTable|FormCheckBox|FormDate|FormFile|FormInput|FormList|FormRadio|FormSelect|FormTextArea)[] = [];
const f1: FormInput = {
    index: 1,
    type: DetailDataType.INPUT,
    data: 'Isi dari form input yiygi oooh oh o o oj oj  ij oo  oo o oo ho hooh oh oho o ohoho',
    disabled: true,
    label: 'Input String',
    name: 'input_string'
};
rs.push(f1);
const f2: FormInput = {
    index: 0,
    type: DetailDataType.INPUT,
    data: 200,
    disabled: true,
    label: 'Input Number',
    name: 'input_number'
};
rs.push(f2);
const f3: FormDate = {
    index: 3,
    type: DetailDataType.DATE,
    data: [new Date()],
    disabled: true,
    label: 'Input Date',
    name: 'input_date',
    range: false
};
rs.push(f3);

const f4: FormDate = {
    index: 2,
    type: DetailDataType.DATE,
    data: [new Date(), (new Date())],
    disabled: false,
    label: 'Input Date Range',
    name: 'input_date_range',
    range: true
};
rs.push(f4);
const f5: FormTextArea = {
    index: 4,
    type: DetailDataType.TEXTAREA,
    data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellendus natus vel voluptatem delectus ullam eos. Ea voluptate excepturi, nesciunt magni rerum, earum cum natus quam eum quo dicta fugit.',
    disabled: false,
    label: 'Input Text Area',
    name: 'input_text_area',
};
rs.push(f5);
const f6: FormList = {
    index: 5,
    type: DetailDataType.LIST,
    data: f5.data.split(' '),
    label: 'List data',
    name: 'list_data',
};
rs.push(f6);

const f7: FormTable = {
    index: 6,
    type: DetailDataType.TABLE,
    data: [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ],
    header: ['position', 'name', 'weight', 'symbol'],
    label: 'List data',
    name: 'list_data',
};
rs.push(f7);

export const dataDetail1: Detail = {
    title: 'Detail 1',
    subtitle : 'sub detail perlu approval',
    data: rs,
    link: 'https://cobaapprove.com/approve'
};
