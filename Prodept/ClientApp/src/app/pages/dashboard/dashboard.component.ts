import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { NotifService } from 'src/app/services/notif.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _swUp: SwUpdate,
    private _swPush: SwPush,
    private _authService: AuthService,
    private _notifService: NotifService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.AddSubscription();
  }
  GetNotif() {
    this._notifService.Try();
  }
  AddSubscription() {
    if (!this._swPush.isEnabled) {
      this._snackBar.open('Notification Dimatikan!', null, {
        duration: 2000,
      });
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    })
    .then(sub => {
      const key = JSON.stringify(sub);
      const nik = this._authService.user.getValue().nik;
      this._notifService.AddSubscription(key, nik);
     })
    .catch(err => console.log(err))
    ;
  }

}
