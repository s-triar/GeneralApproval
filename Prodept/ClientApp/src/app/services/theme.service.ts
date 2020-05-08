import { Injectable, Inject, Renderer2 } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  isInDarkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isInDarkMode$: Observable<boolean> = this.isInDarkMode.asObservable();
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _storage: StorageService
  ) {}

  ToggleTheme(renderer: Renderer2) {
    this.isInDarkMode.next(!this.isInDarkMode.value);
    if (this.isInDarkMode.value) {
      this._storage.setTheme("dark-theme");
      this.ApplyTheme(renderer);
    } else {
      this._storage.setTheme("light-theme");
      this.ApplyTheme(renderer);
    }
  }

  ApplyTheme(renderer: Renderer2) {
    const theme: string = this._storage.getTheme();
    if (theme == "dark-mode") {
      this.isInDarkMode.next(true);
      renderer.addClass(this._document.body, "dark-theme");
    } else {
      this.isInDarkMode.next(false);
      renderer.removeClass(this._document.body, "dark-theme");
    }
  }
}
