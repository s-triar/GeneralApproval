import { Component, OnInit, Input } from "@angular/core";
import { FormRadio } from "src/app/models/detail-data";

@Component({
  selector: "app-form-radio",
  templateUrl: "./form-radio.component.html",
  styleUrls: ["./form-radio.component.scss"],
})
export class FormRadioComponent implements OnInit {
  @Input() data: FormRadio;
  constructor() {}

  ngOnInit(): void {}
}
