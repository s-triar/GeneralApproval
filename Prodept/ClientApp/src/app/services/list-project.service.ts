import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProjectService {
  trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  trigger$: Observable<boolean> = this.trigger.asObservable();
  constructor() {
    this.trigger$ = this.trigger.asObservable();
  }
}
