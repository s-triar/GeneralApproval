import { Component, OnInit, Input } from "@angular/core";
import { FormList } from "src/app/models/detail-data";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"],
})
export class FormListComponent implements OnInit {
  @Input() data: FormList;
  constructor() {}

  ngOnInit(): void {}
}
