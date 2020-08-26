import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/auth';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user_roles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  user$: Observable<User> = this.user.asObservable();
  user_roles$: Observable<string[]> = this.user_roles.asObservable();

  constructor(private _router: Router, private _http: HttpClient, private _tokenService: TokenService, private _userService: UserService) {
  }

  login(payload: Login): Observable<any> {
    return this._http.post<any>('api/Auth/Login', payload);
  }

  logout(nik: string, browser: string, device: string, os: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('reqnoloadingdialog', 'true');
    header = header.set('reqnonotify', 'true');
    return this._http.post('api/Auth/Logout', {nik: nik, browser: browser, device: device, os: os  },  {headers: header} );
  }

  setLoggedUser() {

    const u = this._tokenService.getUserInfo();
    if (u) {
      // const username = u['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
      this._userService.getUserDetail().subscribe(
        x => this.user.next(x.data)
      );
      const rolesData = u['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.user_roles.next(rolesData);
    } else {
      this.user.next(new User());
      this.user_roles.next([]);
    }
  }

  clearStateUser() {
    this._tokenService.removeToken();
    this.setLoggedUser();
    this._router.navigate(['/login'], {replaceUrl: true});
  }
}
