import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _httpClient: HttpClient,
    private _swUp: SwUpdate,
    private _swPush: SwPush
  ) { }

  ngOnInit(): void {
    // this.pushSubscription();
  }

  pushSubscription() {
    if (!this._swPush.isEnabled) {
      console.log('Notification is disabled');
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    })
    .then(sub => console.log(sub))
    .catch(err => console.log(err))
    ;
  }

}
