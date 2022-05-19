import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from 'src/services/auth.service'; 
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public authService:AuthService, public router:Router){

  }

  canActivate():boolean{
    if(this.authService.isUserLoggedIn){
     this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
