import { Directive, HostBinding, Output, EventEmitter, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Directive({
  selector: '[appOpenSidebarOnSwipe]'
})

export class OpenSidebarOnSwipeDirective implements AfterViewInit {
  sidebar: MatSidenav;
  startTime: number;
  startX: number;
  endTime: number;
  endX: number;

@HostBinding('style.width') width;
@Input('sideNav') set sideNav(sideNav: MatSidenav) {
  this.sidebar = sideNav;
}

@Output() setWidth: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }
  ngAfterViewInit() {
    this.setWidth.emit(300);
    this.startOnTouch();
    this.startTouchMove();
    this.touchEnd();
  }
startOnTouch() {
  fromEvent(document, 'touchstart').pipe(
    tap(
        (e: TouchEvent) =>
            e.touches[0].clientX <= 25 && e.touches[0].clientY >= 65 ? (this.sidebar.open(),
            this.startTime = new Date().getTime(),
            this.startX = e.touches[0].clientX ,
            this.setWidth.emit (e.touches[0].clientX)) : ''
        )
  ).subscribe();
}
startTouchMove() {
  fromEvent(document, 'touchmove').pipe(
      debounceTime(0)).subscribe(
        (e: TouchEvent) => {
            this.endTime = new Date().getTime();
            const speed = (Math.abs(e.touches[0].clientX - this.startX) / ((this.endTime - this.startTime) % 10)) / 2 ;
            // console.log(speed);
            this.sidebar._width >= 80 ? this.setWidth.emit(300) : '';
            let w = this.sidebar._width;
            this.sidebar._width <= 300 ? this.setWidth.emit ( w += (0.5 + speed)) : '';
            this.sidebar._width >= 80 ? this.setWidth.emit(300) : '';
        });
}
touchEnd() {
  fromEvent(document, 'touchend').subscribe(() => {
      this.sidebar._width < 80 ? this.sidebar.close() : '';
    } );
}
}
