import { Component, OnInit, Input } from "@angular/core";
import { FormCheckBox } from "src/app/models/detail-data";

@Component({
  selector: "app-form-checkbox",
  templateUrl: "./form-checkbox.component.html",
  styleUrls: ["./form-checkbox.component.scss"],
})
export class FormCheckboxComponent implements OnInit {
  @Input() data: FormCheckBox;
  constructor() {}

  ngOnInit(): void {}
}
