import { Component, OnInit, Renderer2, OnDestroy, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription, Subject, fromEvent } from 'rxjs';
import { map, shareReplay, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user';
import { Theme } from '../models/theme';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { CustomResponse } from '../models/custom-response';
import { TokenService } from '../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { ProjectService } from '../services/project.service';
import { ProjectList } from '../models/project-list';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  items: ProjectList[] = [];
  isSearching = false;
  showMenuMaster = false;
  theme$: Observable<Theme>;
  user$: Observable<User>;
  @ViewChild('drawer', {static: true}) leftsidenav: MatSidenav;
  @ViewChild('searchbar', {static: true}) searchbar: ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private _renderer: Renderer2,
    private _themeService: ThemeService,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _router: Router,
    private _projectService: ProjectService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit() {
    this.theme$ = this._themeService.currentTheme$;
    this.user$ = this._authService.user$;
    this.fetchProject();
    fromEvent(this.searchbar.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this._projectService.getListProject(text).subscribe(
        res => {
          this.isSearching = false;
          this.items = res;
        },
        err => {
          this.isSearching = false;
        }
      );
    });
  }
  ToggleTheme() {
    this._themeService.ToggleTheme(this._renderer);
  }

  logout() {
    this._authService
                                .logout()
                                .subscribe(
                                  (x: CustomResponse<any>) => {
                                    this.leftsidenav.close();
                                    this._tokenService.removeToken();
                                    this._authService.setLoggedUser();
                                    this._router.navigate(['/login'], {replaceUrl: true});
                                  },
                                  (err: HttpErrorResponse) => {
                                  },
                                  () => {
                                    console.log('Form Logout Observer got a complete notification');
                                  }
                                )
                                ;
  }
  toggleMenuMaster() {
    this.showMenuMaster = !this.showMenuMaster;
  }

  clearSearchBar() {
    this.searchbar.nativeElement.value = '';
  }

  fetchProject() {
    let val = this.searchbar.nativeElement.value;
    if (val === null) {
      val = '';
    }
    this._projectService.getListProject(val).subscribe(
      res => this.items = res
    );
  }




}
