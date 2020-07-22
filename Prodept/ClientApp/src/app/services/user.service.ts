import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
  }
  getUserDetail(payload: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    return this._http.get(`api/Auth/GetUserProfile`, {headers: header, params: {'Kode': payload}});
  }
}
