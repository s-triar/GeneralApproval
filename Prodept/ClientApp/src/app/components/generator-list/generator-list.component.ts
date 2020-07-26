import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DataListComponent } from '../data-list/data-list.component';
import { DataTabComponent } from '../data-tab/data-tab.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Daftar } from 'src/app/models/list-data';
import { DaftarDataType } from 'src/app/models/enums/list-data-enum';

@Component({
  selector: 'app-generator-list',
  templateUrl: './generator-list.component.html',
  styleUrls: ['./generator-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorListComponent implements OnInit {
  @Input() data: Daftar;
  dtENUM = DaftarDataType;
  constructor() {}

  ngOnInit(): void {

  }
}
