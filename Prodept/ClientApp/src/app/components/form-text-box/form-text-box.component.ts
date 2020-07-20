import { Component, OnInit, Input } from '@angular/core';
import { FormTextArea } from 'src/app/datas/detail-data';

@Component({
  selector: 'app-form-text-box',
  templateUrl: './form-text-box.component.html',
  styleUrls: ['./form-text-box.component.scss']
})
export class FormTextBoxComponent implements OnInit {
  @Input() data: FormTextArea;
  constructor() { }

  ngOnInit(): void {
  }

}
