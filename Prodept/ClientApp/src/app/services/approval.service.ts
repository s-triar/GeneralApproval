import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataUpload } from '../models/data-upload';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  decision: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: BehaviorSubject<DataUpload[]> = new BehaviorSubject<DataUpload[]>([]);
  decision$: Observable<boolean> = this.decision.asObservable();
  data$: Observable<DataUpload[]> = this.data.asObservable();
  constructor() { }

  // TODO Check datetime range if they both are filled

  add(name: string, value: any) {
    const d = this.data.getValue();
    const idx = this.checkIfExistName(name);
    if (idx !== -1) {
      d[idx].value = value;
    } else {
      const t: DataUpload = {
        name: name,
        value: value
      };
      d.push(t);
    }
    this.data.next(d);
  }

  addPair(name: string, value: any) {
    const d = this.data.getValue();
    const idx = this.checkIfExistPair(name, value);
    if (idx !== -1) {
      d[idx].value = value;
    } else {
      const t: DataUpload = {
        name: name,
        value: value
      };
      d.push(t);
    }
    this.data.next(d);
  }

  remove(name: string) {
    const d = this.data.getValue();
    const idx = this.checkIfExistName(name);
    if (idx !== -1) {
      d.splice(idx, 1);
      this.data.next(d);
    }
  }

  removePair(name: string, value: any) {
    const d = this.data.getValue();
    const idx = this.checkIfExistPair(name, value);
    if (idx !== -1) {
      d.splice(idx, 1);
      this.data.next(d);
    }
  }

  checkIfExistPair(name: string, value: any): number {
    const d = this.data.getValue();
    return d.findIndex(x => x.name === name && x.value === value);
  }
  checkIfExistName(name: string): number {
    const d = this.data.getValue();
    return d.findIndex(x => x.name === name);
  }

}
