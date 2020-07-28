import { Component, Renderer2, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'General Approval';
  deviceInfo = null;

  constructor(
        private _themeService: ThemeService,
        private _renderer: Renderer2,
        private _authService: AuthService,
        private _swUpdate: SwUpdate,
        private _deviceService: DeviceDetectorService,
        ) {
    this._swUpdate.available.subscribe(event => {
      console.log('New Service Worker update available');
      this.updateToLatest();
    });
    this.epicFunction();
  }

    epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this._deviceService.getDeviceInfo();
      const isMobile = this._deviceService.isMobile();
      const isTablet = this._deviceService.isTablet();
      const isDesktopDevice = this._deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    }

  ngOnInit(): void {
    this._themeService.ApplyTheme(this._renderer);
    this._authService.setLoggedUser();
  }

  checkForUpdate() {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.checkForUpdate().then(() => {
          console.log('Checking for updates...');
      }).catch((err) => {
          console.error('Error when checking for update', err);
      });
    }
  }
  updateToLatest(): void {
    console.log('Updating to latest version.');
    this._swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
