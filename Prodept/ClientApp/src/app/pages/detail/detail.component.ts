import { Component, OnInit } from "@angular/core";
import { dataDetail1 } from "src/app/datas/detail-data";
import { Detail } from "src/app/models/detail-data";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  data: Detail = dataDetail1;
  constructor() {}

  ngOnInit(): void {
    // this.data = dataDetail1;
    this.data.data = this.data.data.sort((a, b) =>
      a.index < b.index ? -1 : a.index > b.index ? 1 : 0
    );
  }
}
