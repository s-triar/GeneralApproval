import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormInput } from "src/app/models/detail-data";

@Component({
  selector: "app-form-input",
  templateUrl: "./form-input.component.html",
  styleUrls: ["./form-input.component.scss"],
})
export class FormInputComponent implements OnInit {
  @Input() data: FormInput;
  @Output() changeData: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  type = "text";
  constructor() {}

  ngOnInit(): void {
    if (typeof this.data.data === "number") {
      this.type = "number";
    } else if (typeof this.data.data === "string") {
      this.type = "text";
    }
  }

  change(event) {
    const d = event.target.value;
    this.changeData.emit(d);
  }
}
