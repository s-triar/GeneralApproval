import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  getListProject(payload: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.get(`api/Internal/GetListProject`, {headers: header, params: {name: payload }} );
  }

  getListRequestProject(payload: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.get(`api/Internal/GetListRequestProject`, {headers: header, params: {name: payload }} );
  }

  getDetailRequestProject(payload: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.get(`api/Internal/GetDetailRequestProject`, {headers: header, params: {name: payload }} );
  }

}
