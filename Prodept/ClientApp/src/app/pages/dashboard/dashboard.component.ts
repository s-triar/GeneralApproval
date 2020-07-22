import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _httpClient: HttpClient,
    private _swUp: SwUpdate,
    private _swPush: SwPush
  ) { }

  ngOnInit(): void {
    // this.pushSubscription();
  }
  GetNotif() {
    console.log('fafawfa');
    this._httpClient.get('https://localhost:44389/api/Notification/Send');
  }
  ShowSubscription() {
    if (!this._swPush.isEnabled) {
      console.log('Notification is disabled');
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    })
    .then(sub => console.log(JSON.stringify(sub)))
    .catch(err => console.log(err))
    ;
  }

}
