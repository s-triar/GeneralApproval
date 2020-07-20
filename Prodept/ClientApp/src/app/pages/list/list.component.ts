import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
import { dataList1 } from 'src/app/datas/list-data';
import { GeneratorListComponent } from 'src/app/components/generator-list/generator-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data = dataList1;
  // @ViewChild('content', {read: ViewContainerRef}) content;
  // constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  constructor() {}

  ngOnInit(): void {

  }
  // ngAfterViewInit(): void {
  //   const dataFactory = this.componentFactoryResolver.resolveComponentFactory(GeneratorListComponent);
  //   const comResolv = this.content.createComponent(dataFactory);
  //   comResolv.instance.data = this.data;

  // }

}
