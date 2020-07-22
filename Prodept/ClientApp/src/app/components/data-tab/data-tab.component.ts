import { Component, OnInit, Input } from "@angular/core";
import { Daftar } from "src/app/models/list-data";
import { DaftarDataType } from "src/app/models/enums/list-data-enum";

@Component({
  selector: "app-data-tab",
  templateUrl: "./data-tab.component.html",
  styleUrls: ["./data-tab.component.scss"],
})
export class DataTabComponent implements OnInit {
  @Input() data: Daftar[];
  dtENUM = DaftarDataType;
  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
