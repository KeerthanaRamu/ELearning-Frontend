import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isStateChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);


}
