import { Component, OnInit, Renderer2 } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { User } from "../models/user";
import { DOCUMENT } from "@angular/common";
import { ThemeService } from "../services/theme.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent implements OnInit {
  user: User = {
    Nik: "2015169765",
    Email: "sulaimantriarjo@indomaret.co.id",
    Name: "Sulaiman Triarjo",
    Phone: "085755519123",
    Url: "assets/defaults/user-default.png",
  };
  isInDarkMode$: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isInDarkMode$ = this.themeService.isInDarkMode$;
  }

  ToggleTheme() {
    this.themeService.ToggleTheme(this.renderer);
  }
}
