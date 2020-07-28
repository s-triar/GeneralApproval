import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestList } from '../models/request-list';
import { QueryStringBuilder } from '../utils/query-string-builder';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  getListProject(payload: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    return this._http.get(`api/Internal/GetListProject`, {headers: header, params: {name: payload }} );
  }

  getListRequestProject(payload: string): Observable<RequestList[]> {
    // let header: HttpHeaders = new HttpHeaders();
    // header = header.set('reqnoloadingdialog', 'true');
    return this._http.get<RequestList[]>(`api/Internal/GetListRequestProject`, {params: {name: payload }} );
  }

  getDetailRequestProject(payload: RequestList): Observable<any> {
    const params = QueryStringBuilder.BuildParametersFromSearch<RequestList>(payload);
    // let header: HttpHeaders = new HttpHeaders();
    // header = header.set('reqnoloadingdialog', 'true');
    // header = header.set('reqnonotify', 'true');
    return this._http.get<RequestList>(`api/Internal/GetDetailRequestProject?${params}`);
  }

}
