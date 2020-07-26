import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from 'src/app/models/detail-data';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
  @Input() data: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
