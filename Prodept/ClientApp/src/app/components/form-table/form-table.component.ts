import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormTable } from "src/app/models/detail-data";

export interface colFilter {
  value: string;
  key: string;
}

@Component({
  selector: "app-form-table",
  templateUrl: "./form-table.component.html",
  styleUrls: ["./form-table.component.scss"],
})
export class FormTableComponent implements OnInit {
  private readonly separator = "=:";
  @Input() data: FormTable;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataFiltering: colFilter[] = [];
  headers: string[] = [];
  headersFilter: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.dataFiltering = this.data.header.map((el) => {
      return { value: "", key: el.key };
    });
    this.headersFilter = this.data.header.map(
      (el) => `search${this.separator}${el.key}`
    );
    this.headers = this.data.header.map((el) => el.key);
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filteringColumn;
  }

  filteringColumn(data: any, filter: string): boolean {
    const datafilters = JSON.parse(filter);
    let decision: boolean = true;
    for (const df of datafilters) {
      if (df.value === "") {
        continue;
      }
      if (!data[df.key].toString().toLowerCase().includes(df.value)) {
        decision = false;
        break;
      }
    }
    return decision;
  }

  applyFilter(event: Event, columnName: String) {
    const actualKey = columnName.split(this.separator)[1];
    const filterValue = (event.target as HTMLInputElement).value;
    const idx = this.dataFiltering.findIndex((x) => x.key == actualKey);
    if (idx != -1) {
      this.dataFiltering[idx].value = filterValue.trim().toLowerCase();
    }
    this.dataSource.filter = JSON.stringify(this.dataFiltering);
  }
}
