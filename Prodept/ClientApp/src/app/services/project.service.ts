import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestList } from '../models/request-list';
import { QueryStringBuilder } from '../utils/query-string-builder';
import { AutoCompleteRequest } from '../models/autocomplete-request';
import { CustomResponse } from '../models/custom-response';
import { FormAutoCompleteItem } from '../models/detail-data';

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
    return this._http.get<RequestList[]>(`api/Internal/GetListRequestProject`, {params: {name: payload }} );
  }

  getDetailRequestProject(payload: RequestList): Observable<any> {
    const params = QueryStringBuilder.BuildParametersFromSearch<RequestList>(payload);
    return this._http.get<RequestList>(`api/Internal/GetDetailRequestProject?${params}`);
  }
  getAutoCompleteListData(payload: AutoCompleteRequest): Observable<any> {
    const params = QueryStringBuilder.BuildParametersFromSearch<AutoCompleteRequest>(payload);
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    return this._http.get<CustomResponse<FormAutoCompleteItem[]>>(`api/Internal/GetAutoCompleteListData?${params}`, {headers: header});
  }

}
