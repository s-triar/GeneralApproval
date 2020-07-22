import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormDate } from "src/app/models/detail-data";

@Component({
  selector: "app-form-date",
  templateUrl: "./form-date.component.html",
  styleUrls: ["./form-date.component.scss"],
})
export class FormDateComponent implements OnInit {
  @Input() data: FormDate;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor() {}

  ngOnInit(): void {
    if (this.data.range === true) {
      this.range.get("start").setValue(this.data.data[0]);
      this.range.get("end").setValue(this.data.data[1]);
    }
  }
}
