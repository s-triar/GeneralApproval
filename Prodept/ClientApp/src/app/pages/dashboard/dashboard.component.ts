import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush, SwRegistrationOptions } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { NotifService } from 'src/app/services/notif.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { tap } from 'rxjs/operators';
import { CustomResponse } from 'src/app/models/custom-response';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User = new User();
  constructor(
    private _swUp: SwUpdate,
    private _swPush: SwPush,
    private _tokenService: TokenService,
    private _notifService: NotifService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _deviceService: DeviceDetectorService,
  ) { }

  ngOnInit(): void {
    this.AddSubscription();
    this.GetUser();
  }

  GetUser() {
    this._userService.getUserDetail().subscribe((x: CustomResponse<User>) => this.user = x.data);
  }

  GetNotif() {
    this._notifService.Try().subscribe();
  }
  AddSubscription() {
    if (!this._swPush.isEnabled) {
      this._snackBar.open('Notification Dimatikan/Diblock!', null, {
        duration: 2000,
      });
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    })
    .then(sub => {
      const key = JSON.stringify(sub);
      const nik = this._tokenService.getNik();
      const deviceInfo = this._deviceService.getDeviceInfo();
      if (nik !== null) {
        this._notifService.AddSubscription(key, nik, deviceInfo.browser, deviceInfo.device, deviceInfo.os).subscribe();
      }
     })
    .catch(err => console.log(err))
    ;
  }

}
