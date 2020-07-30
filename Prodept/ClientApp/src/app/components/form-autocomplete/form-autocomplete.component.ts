import { Component, OnInit, Input, ViewChild, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, ElementRef } from '@angular/core';
import { FormAutoComplete, FormAutoCompleteItem } from 'src/app/models/detail-data';
import { fromEvent, merge } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApprovalService } from 'src/app/services/approval.service';
import { ProjectService } from 'src/app/services/project.service';
import { AutoCompleteRequest } from 'src/app/models/autocomplete-request';
import { CustomResponse } from 'src/app/models/custom-response';
import { map, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss']
})
export class FormAutocompleteComponent implements OnInit {
  @Input() data: FormAutoComplete;
  searching = false;
  filteredOptions: FormAutoCompleteItem[];
  @ViewChild('inputauto', {static: true}) inputauto: ElementRef;
  constructor(
    private _approvalService: ApprovalService,
    private _projectService: ProjectService
    ) {}

  ngOnInit() {
    if (this.data.required === true && this.data.initialValue !== null) {
      this._approvalService.add(this.data.name, this.data.initialValue);
    }
    if (this.data.link !== null && this.data.link !== '') {
      this.fetchData('');
    }
    const ku = fromEvent(this.inputauto.nativeElement, 'keyup');
    const fc = fromEvent(this.inputauto.nativeElement, 'focus');
    merge(ku, fc).pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(async (text: string) => {
      this.searching = true;
      if (this.data.link !== null && this.data.link !== '') {
        this.fetchData(text.toLowerCase());
      } else {
        this.filteredOptions =  this.data.data.filter(option => option.label.toLowerCase().includes(text.toLowerCase()));
        this.searching = false;
      }
    });
  }
  displayFn(d: FormAutoCompleteItem): string {
    return d && d.label ? d.label : '';
  }
  clearText() {
    const p = this.inputauto.nativeElement as MatInput;
    p.value = '';
    this._approvalService.remove(this.data.name);
  }

  select(event: MatAutocompleteSelectedEvent) {
    const p = event.option.value as FormAutoCompleteItem;
    this._approvalService.add(this.data.name, p.data);
  }

  fetchData(search: string) {
    const p: AutoCompleteRequest = {
      link: this.data.link,
      provideFilter: this.data.provideFilter,
      search: search
    };
    this._projectService.getAutoCompleteListData(p)
        .subscribe(
          (x: CustomResponse<FormAutoCompleteItem[]>) => {
            this.filteredOptions = x.data;
            this.searching = false;
          },
          err => {
            this.searching = false;
          }
        );
  }
}
