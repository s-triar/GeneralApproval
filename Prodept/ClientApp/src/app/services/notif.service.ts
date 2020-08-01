import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private _http: HttpClient) { }

  AddSubscription(key: string, nik: string, browser: string, device: string, os: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.post(`api/Notification/Add`, {key: key, nik: nik, browser: browser, device: device, os: os  }, {headers: header} );
  }

  Try(): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.get(`api/Notification/Try`, {headers: header} );
  }
}
