import { Component, OnInit, Input } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { FormSelect } from "src/app/models/detail-data";

@Component({
  selector: "app-form-select",
  templateUrl: "./form-select.component.html",
  styleUrls: ["./form-select.component.scss"],
})
export class FormSelectComponent implements OnInit {
  @Input() data: FormSelect;
  constructor() {}

  ngOnInit(): void {}

  changeValue(event: MatSelectChange) {
    console.log(event);
    // const val = (event.target as HTMLInputElement).value;
    // console.log(val);
  }
}
