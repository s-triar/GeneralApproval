import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
  }
  getUserDetail(): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    // header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    // const tokenRaw = this._tokenService.getToken();
    return this._http.get(`api/Auth/GetUserProfile`, {headers: header} );
  }
}
