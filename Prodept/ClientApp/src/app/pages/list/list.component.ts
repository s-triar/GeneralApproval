import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
import { dataList1, coba } from 'src/app/datas/list-data';
import { GeneratorListComponent } from 'src/app/components/generator-list/generator-list.component';
import { Daftar, DataDaftar } from 'src/app/models/list-data';
import { DaftarDataType } from 'src/app/models/enums/list-data-enum';
import { Router, NavigationStart, NavigationEnd, RouterState, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { filter, map, tap, groupBy, reduce, mergeMap, combineAll, toArray, concatAll, mergeAll, concatMap } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';
import { RequestList } from 'src/app/models/request-list';
import { of, from, zip, combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  apiName = null;
  data_ = dataList1;
  data: Daftar = {
    title: '',
    dataType: DaftarDataType.TAB,
    data: [],
  };
  coba: RequestList[] = coba;
  // @ViewChild('content', {read: ViewContainerRef}) content;
  // constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService
    ) {}

  ngOnInit(): void {
    this.apiName = this._activatedRoute.snapshot.params['apiName'];
    this.data.title = this._activatedRoute.snapshot.params['projectName'];
    this.fetchData();
  }

  fetchData() {
    this._projectService.getListRequestProject(this.apiName)
        .pipe(
          mergeMap(res => res),
          groupBy(p => p.category),
          mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
          map(x => {
            const p: Daftar = {
              title: x[0],
              dataType: DaftarDataType.LIST,
              data: x[1].map(y => {
                const p: DataDaftar = {
                  id: y.id,
                  title: y.title,
                  status: y.status,
                  subtitle: y.subTitle
                };
                return p;
              })
            };
            return p;
          }),
          toArray(),
          map(x => x.sort((a, b) => (a.title > b.title) ? 1 : -1))
        )
        .subscribe(x => this.data.data = x);
  }

  percobaan () {
    const p = of(this.coba);
    p.pipe(
      mergeMap(res => res), // <- use concatMap() if you care about the order
      groupBy(p => p.category),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      map(x => {
        const p: Daftar = {
          title: x[0],
          dataType: DaftarDataType.LIST,
          data: x[1].map(y => {
            const p: DataDaftar = {
              id: y.id,
              title: y.title,
              status: y.status,
              subtitle: y.subTitle
            };
            return p;
          })
        };
        return p;
      }),
      toArray(),
      map(x => x.sort((a, b) => (a.title > b.title) ? 1 : -1))
    )
    .subscribe(x => {
      console.log(x);
      // if (x.length === 1) {
      //   this.data.dataType = DaftarDataType.LIST;
      //   this.data.data = x[0].data;
      //   this.data.subtitle = x[0].title;
      // } else {
      //   this.data.dataType = DaftarDataType.TAB;
      //   this.data.data = x;
      //   this.data.subtitle = null;
      // }
    });
  }
}

