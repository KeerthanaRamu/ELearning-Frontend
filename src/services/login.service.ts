import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public urlBase = 'http://localhost:4000/';
    //  public urlBase='https://jpj-dev.i2utors.com:4000/';

    constructor(private http: HttpClient) { }

    getBusinessRule() {
        const uri = this.urlBase + 'login/getBusinessRule';
        return this
            .http
            .get(uri)
            .pipe(map(res => {
                return res;
            }));
    }

    setUserDetails(userData) {
        const uri = this.urlBase + 'login/setUserDetails';
        const obj = { userData: userData };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    getLoginUser(userData) {
        const uri = this.urlBase + 'login/getLoginUser';
        const obj = { userData: userData };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    getUserList() {
        const uri = this.urlBase + 'login/getUserList';
        return this
            .http
            .get(uri)
            .pipe(map(res => {
                return res;
            }));
    }

    getCurrentUser(authToken) {
        const uri = this.urlBase + 'login/getCurrentUser';
        const obj = { authToken: authToken };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    updateProfileInfo(loginInfo) {
        const uri = this.urlBase + 'login/updateProfileInfo';
        const obj = { loginInfo: loginInfo };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    updateProfileImage(profileinfo) {
        const uri = this.urlBase + 'login/updateProfileImage';
        const obj = { profileinfo: profileinfo };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    UpdateEmailAddress(profileinfo) {
        const uri = this.urlBase + 'login/UpdateEmailAddress';
        const obj = { profileinfo: profileinfo };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }

    UpdatePassword(profileinfo) {
        const uri = this.urlBase + 'login/UpdatePassword';
        const obj = { profileinfo: profileinfo };
        return this
            .http
            .post(uri, obj)
            .pipe(map(res => {
                return res;
            }));
    }





}
